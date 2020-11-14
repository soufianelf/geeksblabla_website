import React from "react"
import { useTheme } from "../../Theme/ThemeContext"
import { Link, graphql, useStaticQuery } from "gatsby"
import PlayIcon from "assets/play.svg"
import "./index.scss"

const channelQuery = graphql`
  {
    channel {
      channelName
      header
      subheader
      channelUrl
      heroImageLight
      heroImage
      heroImageMobile
      heroImageMobileLight
    }
  }
`

export default () => {
  const { dark } = useTheme()

  const data = useStaticQuery(channelQuery)
  const channel = data.channel
  return (
    <div className="container hero">
      <div className="description">
        <h1>{channel.header}</h1>
        <p>{channel.subheader}</p>
        <div className="actions">
          <Link to="/videos" className="button left">
            <PlayIcon /> Start Watching
          </Link>
          {/* <Link to="/suggest-new-episode" className="button outline">
            Suggest a topic
          </Link> */}
        </div>
      </div>
      {dark ? (
        <>
          <img
            alt="hero"
            style={{ width: "50vw" }}
            src={channel.heroImage}
            className="crea desktop-only"
          />
          <img
            alt="hero Mobile"
            src={channel.heroImageMobile}
            className="crea mobile-only"
          />
        </>
      ) : (
        <>
          <img
            alt="hero Light"
            style={{ width: "50vw" }}
            src={channel.heroImageLight}
            className="crea desktop-only"
          />
          <img
            alt="hero Mobile Light"
            src={channel.heroImageMobileLight}
            className="crea mobile-only"
          />
        </>
      )}
    </div>
  )
}
