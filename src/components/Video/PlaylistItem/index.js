import React from "react"
import { Link } from "gatsby"
import "./index.scss"
import kebabCase from "lodash/kebabCase"

export default ({ playlist, active, totalCount }) => {
  return (
    <Link
      to={`/${kebabCase(playlist)}`}
      activeClassName="playlist-item active"
      className={active ? "playlist-item active" : "playlist-item"}
      aria-label="Filter by playlist"
    >
      <div>
        <p>
          {playlist}
          <span>{totalCount}</span>
        </p>
      </div>
    </Link>
  )
}
