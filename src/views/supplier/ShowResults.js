// *** React Import
import React, { useState, useEffect } from 'react'

// ** Material UI Imports
import { Box, Card, Typography } from '@mui/material'

// ** MUI X Imports
import { DataGrid } from '@mui/x-data-grid'

const ShowResults = ({ columnsData, rowsData }) => {
  const [columns, setColumns] = useState([])
  const [rows, setRows] = useState([])

  useEffect(() => {
    // Generate columns based on columnsData
    const generatedColumns = columnsData.map(option => ({
      field: option.optionName,
      headerName: 'Product options',
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
      <Card variant='outlined' sx={{ p: 8, marginBlock: 5 }}>
        <Typography variant='h4' gutterBottom>
          Show Results
        </Typography>
        <DataGrid rows={rows} columns={columns} getRowId={row => row.optionGroupId} />
      </Card>
    </Box>
  )
}

export default ShowResults
