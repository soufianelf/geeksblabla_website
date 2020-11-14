import React from "react"
import VideoItem from "../VideoItem"
import kebabCase from "lodash/kebabCase"

/**
 * This component maps over the filtered videos and makes a new slug
 * The slug is constructed by converting the playlist and title to kebab-case
 * We then override the slug we get from mdx by the new slug.
 * This is done so that we can fully reuse the VideoItem component, which eventually renders a Link component...
 * ... with the slug as its `to` prop.
 * Other fields like the title, date, duration, etc. are passed down as well.
 */

export default ({ filteredVideos, selectedVideo, playlist }) =>
  filteredVideos.edges.map(({ node }) => {
    const newSlug = `${kebabCase(playlist)}/${kebabCase(node.fields.title)}`
    const newFields = { ...node.fields, slug: newSlug }
    return (
      <VideoItem
        {...newFields}
        key={node.id}
        active={selectedVideo === node.id}
      />
    )
  })
