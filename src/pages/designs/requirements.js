// ** React Imports
import React, { useEffect, useState, useRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ButtonBase from '@mui/material/ButtonBase'
import Breadcrumbs from '@mui/material/Breadcrumbs'

// ** Icons MUI Imports
import DeleteIcon from '@mui/icons-material/Delete'

// ** Icons MDI Imports
import Send from 'mdi-material-ui/Send'
import MessageText from 'mdi-material-ui/MessageText'
import ChevronRight from 'mdi-material-ui/ChevronRight'

// ** Imports components 📨
import DialogPost from './components/dialogPost'

const Requirements = () => {
  const [openDialogPost, setOpenDialogPost] = useState(false)

  return (
    <Container maxWidth='xl'>
      <Box>
        {/* แทบไปหน้าต่างๆ */}
        <Box sx={{ width: '100%', marginBottom: '29px' }}>
          <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb'>
            <Link underline='hover' color='inherit' href='/'>
              Home
            </Link>
            <Link underline='hover' color='inherit' href='/designs/requirements/'>
              My Requirements
            </Link>
          </Breadcrumbs>
        </Box>

        {/* ชื่อหน้า */}
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Typography variant='h4' fontSize={36}>
            My Requirements
          </Typography>
          {/* ปุ่ม POST */}
          <Button variant='contained' color='primary' endIcon={<Send />} onClick={() => setOpenDialogPost(true)}>
            POST
          </Button>
        </Box>

        {/* เนื้อหา */}
        <Box sx={{ width: '100%', marginY: 4 }}>
          <Grid container spacing={10}>
            {/* map ตรงนี้ */}
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <Box sx={{ width: '100%', height: '150px', bgcolor: '#fff', borderRadius: '10px' }}>
                {/* ลิงค์ไปอีกหน้า */}
                <ButtonBase href='/designs/requirementsDetail' sx={{ width: '100%', height: '120px' }}>
                  <Box sx={{ width: '100%', height: '120px' }}>
                    <Box sx={{ width: '100%', height: '50px', padding: 2 }}>
                      {/* หัวข้อ */}
                      <Typography
                        variant='h4'
                        align='start'
                        fontSize={36}
                        sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                      >
                        Title
                      </Typography>
                    </Box>
                    <Box sx={{ width: '100%', height: '70px', paddingY: 6, paddingX: 3 }}>
                      {/* เนื้อหา */}
                      <Typography
                        variant='body2'
                        noWrap
                        sx={{
                          wordWrap: 'break-word'
                        }}
                      >
                        body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde
                        suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                      </Typography>
                    </Box>
                  </Box>
                </ButtonBase>
                <Box
                  sx={{
                    width: '100%',
                    height: '30px',
                    paddingX: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignContent: 'flex-start'
                  }}
                >
                  <IconButton>
                    {/* ปุ่มลบ */}
                    <DeleteIcon />
                  </IconButton>
                  <MessageText />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* 📨📨 Props 📨📨 */}
      <DialogPost open={openDialogPost} handleClose={() => setOpenDialogPost(false)} />
      {/* 📨📨 Props 📨📨 */}
    </Container>
  )
}

export default Requirements
