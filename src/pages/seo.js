import React from 'react'
import { Helmet } from 'react-helmet'
import themeConfig from 'src/configs/themeConfig'
import Head from 'next/head'

const MySeo = ({ title, details }) => {
  console.log(details)

  return (
    <div>
      <Helmet>
        <title>{`TCTM - ${title}`}</title>
      </Helmet>

      <Head>
        <title>{title}</title>
        <meta name='description' content={themeConfig.description} />
        <meta name='keywords' content={`${themeConfig.keywords}   NameProduct ${title}`} />
        <meta name='content' content={`${details}`} />
        <meta name='post' content={title} />
      </Head>
    </div>
  )
}

export default MySeo
