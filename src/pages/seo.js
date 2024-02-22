import React from 'react'
import themeConfig from 'src/configs/themeConfig'
import Head from 'next/head'

const MySeo = ({ title, details, description, keywords, content, ogimg, url }) => {
  return (
    <div>
      {/* <Helmet></Helmet> */}

      <Head>
        {!title ? <title>{'TCTM'}</title> : <title>{` ${title} - TCTM `}</title>}
        <meta name='description' content={`${description}`} />

        {/* ถ้า title ไม่มีค่าจะแสดงข้อมูลข้างล่าง หาก title มีข้อมูล จะแสดงข้างส่วนข้างบน */}

        {!title ? (
          <meta name='keywords' content={`${keywords}`} />
        ) : (
          <meta name='keywords' content={`${keywords} ${title}`} />
        )}

        {/* ถ้า detail มีค่าให้แสดง */}
        {content && <meta name='content' content={`${content}`} />}
        {details && <meta name='content' content={`${details}`} />}
        {title && <meta property='og:title' content={` ${title} - TCTM `} />}
        {ogimg && <meta property='og:image' content={ogimg} />}
        {ogimg && <meta property='og:image:type' content='image/png' />}
        {ogimg && <meta property='og:image:width' content='436' />}
        {ogimg && <meta property='og:image:height' content='228' />}
        <meta property='og:description' content={`${description}`} />
        {url && <meta property='og:url' content={url} />}
        <meta name='author' content='TCTM'></meta>
      </Head>
    </div>
  )
}

export default MySeo
