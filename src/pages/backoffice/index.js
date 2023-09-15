// ** React imports
import React, { useState } from 'react'

// ** MUI Imports
import { Button, AppBar, Toolbar, Tab, Tabs } from '@mui/material'

// ** Import custom components
import User from 'src/views/backoffice/user'
import Market from 'src/views/backoffice/market'
import Product from 'src/views/backoffice/product'
import Billboard from 'src/views/backoffice/billboard'

// ** Auth Check import
import { withAuth } from 'src/@core/utils/AuthCheck'

const BackOffice = () => {
  const [activeTab, setActiveTab] = useState('user')

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <div>
      <AppBar position='static' style={{ background: '##dedede', color: '##3c3c3c' }}>
        <Toolbar>
          <Tabs value={activeTab} onChange={handleTabChange} indicatorColor='#d7e2ea'>
            <Tab label='User' value='user' style={{ color: '#d7e2ea' }} />
            <Tab label='Market' value='market' style={{ color: '#d7e2ea' }} />
            <Tab label='Product' value='product' style={{ color: '#d7e2ea' }} />
            <Tab label='Billboard' value='billboard' style={{ color: '#d7e2ea' }} />
          </Tabs>
        </Toolbar>
      </AppBar>

      {activeTab === 'user' && <User />}
      {activeTab === 'market' && <Market />}
      {activeTab === 'product' && <Product />}
      {activeTab === 'billboard' && <Billboard />}
    </div>
  )
}

export default withAuth(BackOffice)
