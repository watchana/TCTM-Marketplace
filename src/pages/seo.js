import React from 'react'
import Head from 'next/head'

const MySeo = ({ title, details, description, keywords, content, ogimg, url }) => {
  return (
    
      <Head>
        {!title ? <title>{'Shop.Digital2day.com'}</title> : <title>{`${title} - Shop.Digital2day.com`}</title>}
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
        {title && <meta property='og:title' content={` ${title} - digital2day.com `} />}
        {ogimg && <meta property='og:image' content={'https://shop.digital2day.com'+ogimg} />}
        {ogimg && <meta property='og:image:type' content='image/png' />}
        {ogimg && <meta property='og:image:width' content='300' />}
        {ogimg && <meta property='og:image:height' content='400' />}
        <meta property='og:description' content={`${description}`} />
        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:site" content="@DigitalAccess"/>
        <meta name="twitter:title" content={!title?'Shop.Digital2day.com':` ${title} - Shop.Digital2day.com `}/>
        <meta name="twitter:description" content={`${description}`}/>
         {ogimg &&<meta name="twitter:image" content={'https://shop.digital2day.com'+ogimg}/>}
         {ogimg && <meta property='twitter:image:width' content='300' />}
        {ogimg && <meta property='twitter:image:height' content='400' />}
        {url && <meta property='og:url' content={url} />}
        <meta name='author' content='Digital2day'/>
        <meta name='og:type' content='website'/>
        <meta name="google-site-verification" content="Adbv0vHr76VzOrSbqd7h7Jv5MHM0PmsFK1YLs-Xwtpo" />
        <meta name="theme-color" content="#fff"/>
      </Head>

  )
}

export default MySeo
