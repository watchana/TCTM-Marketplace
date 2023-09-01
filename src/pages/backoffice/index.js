import React, { useState } from 'react'
import { Button, AppBar, Toolbar, Tab, Tabs } from '@mui/material'
import User from './user'
import Market from './market'
import Product from './product'
import Billboard from './billboard'

const Backoffice = () => {
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

export default Backoffice
