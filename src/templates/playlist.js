import React from "react"
import { graphql } from "gatsby"
import SEO from "components/SEO"
import Layout from "components/Layout"
import { Video, Playlists, VideosMenu } from "components/Video"

/**
 * Page created for each playlist.
 * This is the page that gets rendered when you hit a route like the following: /mss/
 * One thing to note is that we pass the playlist we get from pageContext to the VideosMenu component
 * VideosMenu will use this playlist to know whether it should render a menu that renders all videos using StaticQuery ...
 * ... or if it should render a menu with the filtered videos we get from the below query.
 * The idea is to be able to use the VideosMenu component in both cases and let the VideosMenu make the decision.
 */

export default ({ data: { allMdx }, pageContext: { playlist } }) => {
  const lastVideo = allMdx.edges[0].node
  return (
    <Layout>
      <SEO />
      <div className="container playlists">
        <Playlists />
      </div>
      <div className="container videos">
        <VideosMenu
          playlist={playlist}
          filteredVideos={allMdx}
          selectedVideo={lastVideo.id}
        />
        <Video {...lastVideo.fields} description={lastVideo.body} />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($playlist: String) {
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
            playlist
            audio
          }
          body
        }
      }
    }
  }
`
