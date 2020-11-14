import React from "react"
import { graphql } from "gatsby"
import SEO from "components/SEO"
import Layout from "components/Layout"
import { Video, VideosMenu, Playlists } from "components/Video"

export default ({ data: { mdx } }) => {
  const { fields, body, excerpt } = mdx
  return (
    <Layout withNextVideo>
      <div className="container playlists">
        <Playlists />
      </div>
      <div className="container videos">
        <SEO
          tags={fields.tags}
          isVideo
          title={fields.title}
          postUrl={fields.slug}
          description={excerpt}
        />
        <VideosMenu />
        <Video {...fields} description={body} excerpt={excerpt} />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
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
