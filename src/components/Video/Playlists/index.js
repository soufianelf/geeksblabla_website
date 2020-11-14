import React from "react"
import { StaticQuery, graphql } from "gatsby"
import PlaylistItem from "../PlaylistItem"
import "./index.scss"

export default ({ selectedPlaylist }) => (
  <StaticQuery
    query={graphql`
      {
        allMdx(filter: { frontmatter: { published: { eq: true } } }) {
          group(field: frontmatter___playlist) {
            playlist: fieldValue
            totalCount
          }
        }
      }
    `}
    render={({ allMdx }) => (
      <ul className="playlists-list">
        {allMdx.group
          .sort((a, b) => b.totalCount - a.totalCount)
          .map(({ playlist, totalCount }) => (
            <PlaylistItem
              active={selectedPlaylist === playlist}
              key={playlist}
              playlist={playlist}
              totalCount={totalCount}
            />
          ))}
      </ul>
    )}
  />
)
