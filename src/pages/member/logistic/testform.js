import React, { useState } from 'react'
import { TextField, Button, Grid, Container, Typography } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

function DynamicForm() {
  const [formDataDynamic, setFormDataDynamic] = useState([{ company: '', date_from: dayjs() }])

  const addField = () => {
    setFormDataDynamic([...formDataDynamic, { company: '', date_from: dayjs() }])
  }

  const handleFieldChange = (index, field, value) => {
    const updatedFormDataDynamic = [...formDataDynamic]
    updatedFormDataDynamic[index][field] = value
    setFormDataDynamic(updatedFormDataDynamic)
  }

  return (
    <Container>
      <form>
        {formDataDynamic.map((field, index) => (
          <Grid container spacing={2} key={index} mt={5}>
            <Grid item xs={4}>
              <Typography fontSize={20}>Company</Typography>
              <TextField
                placeholder='Company'
                fullWidth
                value={field.company_add}
                onChange={e => handleFieldChange(index, 'company', e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography fontSize={20}>From</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={2}>
              <Typography fontSize={20}>To</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={3}>
              <Typography fontSize={20}>Position</Typography>
              <TextField
                placeholder='Position'
                fullWidth
                value={field.email}
                onChange={e => handleFieldChange(index, 'email', e.target.value)}
              />
            </Grid>

            <Grid item xs={5}>
              <Typography fontSize={20}>Job description</Typography>
              <TextField
                placeholder='Job description'
                fullWidth
                value={field.email}
                onChange={e => handleFieldChange(index, 'email', e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography fontSize={20}>Salary</Typography>
              <TextField
                placeholder='Salary'
                fullWidth
                value={field.email}
                onChange={e => handleFieldChange(index, 'email', e.target.value)}
              />
            </Grid>
            <Grid item xs={5}>
              <Typography fontSize={20}>Reasons of resignation</Typography>
              <TextField
                placeholder='Reasons of resignation'
                fullWidth
                value={field.email}
                onChange={e => handleFieldChange(index, 'email', e.target.value)}
              />
            </Grid>
          </Grid>
        ))}
        <Grid item textAlign={'right'} m={3}>
          <Button variant='contained' color='primary' onClick={addField}>
            Add More
          </Button>
        </Grid>
      </form>
    </Container>
  )
}

export default DynamicForm
