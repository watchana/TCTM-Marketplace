import React, { useState } from 'react'
import { Button, AppBar, Toolbar, Tab, Tabs } from '@mui/material'
import User from './user'
import Market from './market'
import Product from './product'

const Backoffice = () => {
  const [activeTab, setActiveTab] = useState('user')

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <div>
      <AppBar position='static' style={{ background: '#f5f5f5', color: '#333' }}>
        <Toolbar>
          <Tabs value={activeTab} onChange={handleTabChange} indicatorColor='primary'>
            <Tab label='User' value='user' style={{ color: '#333' }} />
            <Tab label='Market' value='market' style={{ color: '#333' }} />
            <Tab label='Product' value='product' style={{ color: '#333' }} />
          </Tabs>
        </Toolbar>
      </AppBar>

      {activeTab === 'user' && <User />}
      {activeTab === 'market' && <Market />}
      {activeTab === 'product' && <Product />}
    </div>
  )
}

export default Backoffice
