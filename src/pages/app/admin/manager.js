// ** React Imports
import React from 'react'

// ** MUI Imports
import { Box, Tab, Card } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'

// ** Components
import MemberTable from 'src/views/admin/manager/MemberTable'
import SupplierTable from 'src/views/admin/manager/SupplierTable'

const ManagerPage = () => {
  const [value, setValue] = React.useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Card>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label='lab API tabs example'>
              <Tab label='Customer' value='1' />
              <Tab label='Supplier' value='2' />
            </TabList>
          </Box>
          <TabPanel value='1'>
            <MemberTable />
          </TabPanel>
          <TabPanel value='2'>
            <SupplierTable />
          </TabPanel>
        </TabContext>
      </Card>
    </Box>
  )
}

export default ManagerPage
