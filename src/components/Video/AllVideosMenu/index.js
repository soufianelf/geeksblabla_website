import React from "react"
import { StaticQuery, graphql } from "gatsby"
import VideoItem from "../VideoItem"

/**
 * This component behaves the same as the old VideosMenu
 * Check the VideosMenu.js file for an explanation why this component exists.
 */

export default ({ selectedVideo }) => (
  <StaticQuery
    query={graphql`
      {
        allMdx(
          filter: {
            frontmatter: { published: { eq: true }, isNext: { eq: false } }
          }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              id
              fields {
                title
                slug
                date(formatString: "MMMM DD, YYYY")
                duration
              }
            }
          }
        }
      }
    `}
    render={({ allMdx }) =>
      allMdx.edges.map(({ node }) => (
        <VideoItem
          {...node.fields}
          key={node.id}
          active={selectedVideo === node.id}
        />
      ))
    }
  />
)
