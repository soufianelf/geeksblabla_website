import React from "react"
import AllVideosMenu from "../AllVideosMenu"
import FilteredVideos from "../FilteredVideos"
import "./index.scss"

/**
 * The VideosMenu is now only responsible for making one of the two decisions:
 * 1. Render the FilteredVideos component that contains the list of "filtered" videos based on the playlist selected by the user
 * 2. Render the AllVideosMenu component that makes a static GraphQL query to fetch all videos and display them ...
 * ...(just like it was implemented before supporting playlists).
 * The above decision is made based on whether the component receives a `playlist` prop.
 * The idea is to reuse both the markup and styles of the VideosMenu component, because in both cases, video items have...
 * ...the same styling and markup.
 */

export default (props) => (
  <ul className="videos-list">
    {props.playlist ? (
      <FilteredVideos {...props} />
    ) : (
      <AllVideosMenu {...props} />
    )}
  </ul>
)
