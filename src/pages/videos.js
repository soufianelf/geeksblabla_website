import React from "react"
import { graphql } from "gatsby"
import SEO from "components/SEO"
import Layout from "components/Layout"
import { Video, VideosMenu, Playlists } from "components/Video"

export default ({ data: { allMdx } }) => {
  const lastVideo = allMdx.edges[0].node
  return (
    <Layout>
      <SEO />
      <div className="container playlists">
        <Playlists />
      </div>
      <div className="container videos">
        <VideosMenu selectedVideo={lastVideo.id} />
        <Video {...lastVideo.fields} description={lastVideo.body} />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
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
  }
`
