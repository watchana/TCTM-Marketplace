import React, { useState, useEffect } from 'react'
import { Card, Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

const ShowResults = ({ columnsData, rowsData }) => {
  const [columns, setColumns] = useState([])
  const [rows, setRows] = useState([])

  useEffect(() => {
    // Generate columns based on columnsData
    const generatedColumns = columnsData.map(option => ({
      field: option.optionName,
      headerName: option.optionName,
      width: 300
    }))

    // Add additional static columns
    generatedColumns.push(
      { field: 'optionGroupQuantity', headerName: 'Quantity', width: 150 },
      { field: 'optionGroupPrice', headerName: 'Price', width: 150 }
    )

    generatedColumns.unshift({ field: 'optionGroupId', headerName: 'Id', width: 150 })

    setColumns(generatedColumns)

    // Transform rows
    const transformedRows = rowsData.map(item => {
      const transformedItem = {}
      columnsData.forEach((option, index) => {
        transformedItem[option.optionName] = item[`optionGroupColumn${option.optionId}`]
      })

      transformedItem['optionGroupQuantity'] = item.optionGroupQuantity
      transformedItem['optionGroupPrice'] = item.optionGroupPrice
      transformedItem['optionGroupId'] = item.optionGroupId

      return transformedItem
    })

    setRows(transformedRows)
  }, [columnsData, rowsData])

  if (rowsData.length === 0) {
    return <div>There are no results</div>
  }

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Show Results
      </Typography>
      <Card sx={{ p: 8, marginBlock: 5 }}>
        <DataGrid rows={rows} columns={columns} getRowId={row => row.optionGroupId} />
      </Card>
    </Box>
  )
}

export default ShowResults
