import React from "react"

import Layout from "components/Layout"
import {
  Hero,
  Statistics,
  VideosTypes,
  TopVideos,
  Reviews,
} from "components/Home"
import SEO from "components/SEO"

const IndexPage = () => {
  return (
    <Layout>
      <SEO />
      <Hero />
      <Statistics />
      <VideosTypes />
      <TopVideos />
      <Reviews />
    </Layout>
  )
}

export default IndexPage
