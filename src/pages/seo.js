import React from 'react'
import { Helmet } from 'react-helmet'
import themeConfig from 'src/configs/themeConfig'
import Head from 'next/head'

const MySeo = ({ title, details }) => {
  // themeConfig.title = title

  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <Head>
        <title>{`${themeConfig.templateName} `}</title>
        <meta name='description' content={themeConfig.description} />
        <meta name='keywords' content={`${themeConfig.keywords} ${title}`} />
        <meta name='content' content={themeConfig.content} />
        <meta name='post' content={title} />
      </Head>
    </div>
  )
}

export default MySeo
