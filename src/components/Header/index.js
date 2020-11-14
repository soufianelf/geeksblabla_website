import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import MobileNav from "./MobileNav"
import Links from "./Links"
import "./index.scss"

const channelQuery = graphql`
  {
    channel {
      logoImage
    }
  }
`
const Header = () => {
  const data = useStaticQuery(channelQuery)
  const channel = data.channel

  return (
    <header className="container header">
      <div className="header-container">
        <Link to="/">
          <img src={channel.logoImage} className="logo" alt="Logo" />
        </Link>
        <div className="menu">
          <Links />
        </div>
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
