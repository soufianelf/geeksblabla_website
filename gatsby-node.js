const path = require("path")

const _ = require("lodash")
//const paginate = require("gatsby-awesome-pagination")
//const PAGINATION_OFFSET = 7
const fs = require("fs")
//const contributers = require("./.all-contributorsrc")

const createPosts = (createPage, createRedirect, edges) => {
  edges.forEach(({ node }, i) => {
    const prev = i === 0 ? null : edges[i - 1].node
    const next = i === edges.length - 1 ? null : edges[i + 1].node

    const pagePath = node.fields.slug

    if (node.fields.redirects) {
      node.fields.redirects.forEach((fromPath) => {
        createRedirect({
          fromPath,
          toPath: pagePath,
          redirectInBrowser: true,
          isPermanent: true,
        })
      })
    }

    createPage({
      path: pagePath,
      component: path.resolve(`./src/templates/video.js`),
      context: {
        id: node.id,
        prev,
        next,
      },
    })
  })
}

/**
 * Inspired from the createPosts method, the below method creates pages for each playlist.
 * Furthermore, it also creates video pages under each playlist i.e: `/${playlist}/${videoTitle}/`
 */
const createPlaylists = (createPage, group) => {
  group.forEach(({ playlist, edges }) => {
    const pagePath = `/${_.kebabCase(playlist)}`

    createPage({
      path: pagePath,
      component: path.resolve(`./src/templates/playlist.js`),
      context: {
        playlist,
        slug: pagePath,
      },
    })

    edges.forEach(({ node }) => {
      const videoUnderPlaylistPath = `${pagePath}/${_.kebabCase(
        node.fields.title
      )}`
      createPage({
        path: videoUnderPlaylistPath,
        component: path.resolve(`./src/templates/playlist-video.js`),
        context: {
          id: node.id,
          playlist,
        },
      })
    })
  })
}

exports.createPages = async ({ actions, graphql }) => {
  const result = await graphql(
    `
      {
        videos: allMdx(
          filter: { frontmatter: { published: { ne: false } } }
          sort: { order: DESC, fields: [frontmatter___date] }
        ) {
          edges {
            node {
              id
              fileAbsolutePath
              parent {
                ... on File {
                  name
                  sourceInstanceName
                }
              }
              excerpt(pruneLength: 250)
              fields {
                title
                slug
                date
              }
            }
          }
        }
        playlists: allMdx {
          group(field: frontmatter___playlist) {
            playlist: fieldValue
            edges {
              node {
                id
                fileAbsolutePath
                parent {
                  ... on File {
                    name
                    sourceInstanceName
                  }
                }
                excerpt(pruneLength: 250)
                fields {
                  title
                  slug
                  date
                }
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const {
    videos: { edges },
    playlists: { group },
  } = result.data
  const { createRedirect, createPage } = actions

  createPosts(createPage, createRedirect, edges)
  createPlaylists(createPage, group)
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent)
    const titleSlugged = _.join(_.drop(parent.name.split("-"), 3), "-")

    const slug = "channel/videos/" + _.kebabCase(node.frontmatter.title)

    createNodeField({
      name: "id",
      node,
      value: node.id,
    })

    createNodeField({
      name: "published",
      node,
      value: node.frontmatter.published,
    })

    createNodeField({
      name: "title",
      node,
      value: node.frontmatter.title,
    })

    createNodeField({
      name: "slug",
      node,
      value: slug,
    })

    createNodeField({
      name: "date",
      node,
      value: node.frontmatter.date ? node.frontmatter.date.split(" ")[0] : "",
    })
    createNodeField({
      name: "duration",
      node,
      value: node.frontmatter.duration ? node.frontmatter.duration : "01:00",
    })

    createNodeField({
      name: "tags",
      node,
      value: node.frontmatter.tags || [],
    })
    createNodeField({
      name: "playlist",
      node,
      value: node.frontmatter.playlist || "",
    })
    createNodeField({
      name: "featured",
      node,
      value: node.frontmatter.featured || false,
    })
    const path =
      node.fileAbsolutePath.substring(
        node.fileAbsolutePath.indexOf(
          "/",
          node.fileAbsolutePath.indexOf("videos")
        )
      ) || ""

    createNodeField({
      name: "repoLink",
      node,
      value: `https://github.com/DevC-Casa/geeksblabla.com/tree/master/videos${path}`,
    })
    createNodeField({
      name: "url",
      node,
      value:
        node.frontmatter.url ||
        "https://www.facebook.com/groups/DevC.Casablanca/",
    })
    createNodeField({
      name: "video",
      node,
      value: node.frontmatter.video || "",
    })
    createNodeField({
      name: "audio",
      node,
      value: node.frontmatter.audio || "",
    })
  }
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    /*
     * During the build step, `auth0-js` will break because it relies on
     * browser-specific APIs. Fortunately, we don’t need it during the build.
     * Using Webpack’s null loader, we’re able to effectively ignore `auth0-js`
     * during the build. (See `src/utils/auth.js` to see how we prevent this
     * from breaking the app.)
     */

    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /auth0-js/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      alias: {
        $components: path.resolve(__dirname, "src/components"),
      },
    },
  })
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  let data = JSON.parse(fs.readFileSync("./channel/channel.json", "utf-8"))

  const node = {
    ...data,
    id: createNodeId(`contributor-${data.name}`),
    internal: {
      type: "channel",
      contentDigest: createContentDigest(data),
    },
  }

  actions.createNode(node)
}
