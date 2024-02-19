import React from 'react'
import { Helmet } from 'react-helmet'
import themeConfig from 'src/configs/themeConfig'

const MySeo = ({ title, description, keywords }) => {
  themeConfig.meta_name = keywords
  themeConfig.meta_content = description

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        {/* Add more meta tags as needed */}
      </Helmet>

      {/* Your component content goes here */}
    </div>
  )
}

export default MySeo
