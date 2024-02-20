import React from 'react'
import { Helmet } from 'react-helmet'
import themeConfig from 'src/configs/themeConfig'
import Head from 'next/head'

const MySeo = ({ title, details, description, keywords, content }) => {
  return (
    <div>
      {/* <Helmet></Helmet> */}

      <Head>
        {!title ? <title>{'TCTM - '}</title> : <title>{`TCTM - ${title}`}</title>}
        <meta name='description' content={`${description}`} />

        {/* ถ้า title ไม่มีค่าจะแสดงข้อมูลข้างล่าง หาก title มีข้อมูล จะแสดงข้างส่วนข้างบน */}

        {!title ? (
          <meta name='keywords' content={`${keywords}`} />
        ) : (
          <meta name='keywords' content={`${keywords} ${title}`} />
        )}

        <meta name='content' content={`${content}`} />
        {/* ถ้า detail มีค่าให้แสดง */}
        {details && <meta name='content' content={`${details}`} />}
        <meta name='post' content={title} />
      </Head>
    </div>
  )
}

export default MySeo
