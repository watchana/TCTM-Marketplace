// ** React Imports
import React, { useEffect, useState, useRef } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

const DialogPost = ({ open, handleClose }) => {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <Paper sx={{ width: '100%', height: '100%' }}>
          <Box sx={{ width: '100%', padding: 4 }}>
            <Typography variant='h4' fontSize={'36 bold'}>
              Create post
            </Typography>
          </Box>
          <Box sx={{ width: '600px', padding: 4 }}>
            <TextField
              fullWidth
              label='Title'
              variant='outlined'
              InputProps={{
                style: {
                  borderRadius: '7px'
                }
              }}
            />
          </Box>
          <Box sx={{ width: '600px', paddingX: 4 }}>
            <TextField
              fullWidth
              multiline
              rows={5}
              label='Description'
              variant='outlined'
              InputProps={{
                style: {
                  borderRadius: '7px'
                }
              }}
            />
          </Box>
          <Box sx={{ width: '600px', padding: 4 }}>
            <TextField
              fullWidth
              label='Desired Price'
              variant='outlined'
              InputProps={{
                style: {
                  borderRadius: '7px'
                }
              }}
            />
          </Box>
          <Box sx={{ width: '100%', padding: 4, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Button variant='contained' color='primary' sx={{ marginRight: 4 }}>
              POST
            </Button>
            <Button variant='outlined' color='secondary' onClick={handleClose}>
              CANCEL
            </Button>
          </Box>
        </Paper>
      </Dialog>
    </div>
  )
}

export default DialogPost
