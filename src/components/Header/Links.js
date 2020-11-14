// import { ToggleMode } from "components/Mode"
import React from "react"
import ThemeToggle from "components/Theme/ThemeToggle"
import { Link } from "gatsby"

export default ({ id }) => (
  <>
    <Link
      to="/"
      activeClassName="active"
      aria-label="View Home page"
      className="item"
    >
      Home
    </Link>
    <Link
      to="/videos"
      activeClassName="active"
      className="item"
      aria-label="View videos page"
    >
      Videos
    </Link>
    {/* <ToggleMode id={id} /> */}
    <ThemeToggle />
  </>
)
