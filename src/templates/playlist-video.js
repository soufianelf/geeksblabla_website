import React from "react"
import { graphql } from "gatsby"
import SEO from "components/SEO"
import Layout from "components/Layout"
import { Video, VideosMenu, Playlists } from "components/Video"

/**
 * This component serves as a template for pages under the route: `/${playlist}/${videoTitle}/
 */

export default ({ data: { mdx, allMdx }, pageContext: { playlist } }) => {
  const { fields, body, excerpt } = mdx
  return (
    <Layout withNextVideo>
      <div className="container playlists">
        <Playlists selectedPlaylist={playlist} />
      </div>
      <div className="container videos">
        <SEO
          tags={fields.tags}
          isVideo
          title={fields.title}
          //leave the original slug
          postUrl={fields.slug}
          description={excerpt}
        />
        <VideosMenu playlist={playlist} filteredVideos={allMdx} />
        <Video {...fields} description={body} excerpt={excerpt} />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!, $playlist: String) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { published: { eq: true }, playlist: { eq: $playlist } }
      }
    ) {
      edges {
        node {
          excerpt(pruneLength: 200)
          id
          fields {
            title
            slug
            date(formatString: "MMMM DD, YYYY")
            duration
            url
            video
            repoLink
            audio
          }
          body
        }
      }
    }
    mdx(fields: { id: { eq: $id } }) {
      excerpt(pruneLength: 200)
      id
      fields {
        title
        slug
        date(formatString: "MMMM DD, YYYY")
        duration
        url
        video
        repoLink
        audio
        tags
        playlist
      }
      body
    }
  }
`
