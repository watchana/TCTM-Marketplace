// ** React Imports
import { React, useState } from 'react'

// ** Material UI Imports
import { Container } from '@mui/material'

import themeConfig from 'src/configs/themeConfig'

// ** custom components
import Billboard from 'src/views/homepage/Billboard'
import NameMarket from 'src/views/homepage/NameMarket'
import ShowProducts from 'src/views/homepage/ShowProducts'
import ShowProducts2 from 'src/views/homepage/ShowProducts2'
import ShowPost from './postinformation/Showpost'
import { SeoHomepage } from 'src/seo/homepage'

{
  SeoHomepage.map(item => {
    themeConfig.templateName = item.templateName
    themeConfig.meta.description = item.description
    themeConfig.meta.keywords = item.keywords
    themeConfig.meta.content = item.content

    return null
  })
}

console.log(SeoHomepage)

const Dashboard = () => {
  return (
    <Container maxWidth='xl' style={{ userSelect: 'none' }}>
      {/* ---------- Billboard ---------- */}
      <Billboard />
      {/* ---------- Category ---------- */}
      <NameMarket />
      {/* ---------- Show Products ---------- */}
      <ShowProducts />
      {/* ---------- Show Products2 ---------- */}
      <ShowProducts2 />
      {/* ---------- Knowledge Of Product ---------- */}
      <ShowPost />
    </Container>
  )
}

export default Dashboard
