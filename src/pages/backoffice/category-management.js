import React, { useState, useEffect } from 'react'
import { Grid, Hidden, Box, Card, CardContent, Typography, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

// ** Material Design Icons Imports
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'

// ** Import custom components
import InsertCategory from 'src/views/backoffice/InsertCategory'
import EditCategory from 'src/views/backoffice/EditCategory'

import axios from 'axios'
import { withAuth } from 'src/@core/utils/AuthCheck'

// Responsive image
import { useMediaQuery } from '@mui/material'

// SEO
import MySeo from '../seo'
import { SeoCategoryManagementpage } from 'src/seo/homepage'

const CategoryManager = () => {
  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')

  // ตัวแปรเก็บข้อมูล
  const [categorysdata, setCategorysData] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState(null) // เก็บค่า category Id
  const [selectedCategoryName, setSelectedCategoryName] = useState('') // เก็บค่า category Name

  // ตัวแปรควบคุม State Dialog
  const [openIns, setOpenIns] = React.useState(false)
  const [openEdit, setOpenEdit] = React.useState(false)

  // ฟังก์ชันควบคุม Dialog Ins
  const handleOpenInsDialog = () => {
    setOpenIns(true)
  }

  const handleCloseInsDialog = () => {
    setOpenIns(false)
  }

  // ฟังชันควบคุม Dialog Edit
  const handleOpenEditModal = (categoryId, categoryName) => {
    setSelectedCategoryId(categoryId)
    setSelectedCategoryName(categoryName)
    setOpenEdit(true)
  }

  const handleCloseEdit = () => {
    setOpenEdit(false)
  }

  // เก็บค่าข้อมูลจาก Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.product_category.allcategorys`, {
          headers: {
            Authorization: 'token 76dc8ec5e14d19c:a644317879022f2'
          }
        })

        // console.log('product data', response.data.message.Data)
        setCategorysData(response.data.message.Data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  // เก็บข้อมูลอัปเดท
  const handleUpdateData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.product_category.allcategorys`, {
        headers: {
          Authorization: 'token 76dc8ec5e14d19c:a644317879022f2'
        }
      })

      setCategorysData(response.data.message.Data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  // ฟังชันลบข้อมูล
  const handleDelSubmit = id => {
    Swal.fire({
      title: 'คุณต้องการลบข้อมูลนี้หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ยกเลิก',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        const data = {
          category_id: id
        }

        axios
          .post(`${process.env.NEXT_PUBLIC_API}TCTM.product_category.deletecategory`, data)
          .then(response => {
            console.log(response)
            Swal.fire({
              icon: 'success',
              title: 'ลบข้อมูลแล้วเสร็จ'
            })
            handleUpdateData() // อัปเดตข้อมูลหลังจากลบ
          })
          .catch(error => {
            console.log(error)
          })
      }
    })
  }

  // ** header table
  const columns = [
    { field: 'category_id', headerName: 'Category Id', width: 130 },
    { field: 'category_name', headerName: 'Category Name', width: 300 },
    {
      field: 'Edit',
      headerName: 'Edit',
      sortable: false,
      renderCell: params => {
        return (
          <Button
            variant='contained'
            color='warning'
            onClick={() => handleOpenEditModal(params.row.category_id, params.row.category_name)}
          >
            Edit
          </Button>
        )
      }
    },
    {
      field: 'Delete',
      headerName: 'Delete',
      sortable: false,
      renderCell: params => {
        return (
          <Button variant='contained' color='error' onClick={() => handleDelSubmit(params.row.category_id)}>
            Delete
          </Button>
        )
      }
    }
  ]

  const isSmallScreen = useMediaQuery('(max-width: 700px)') // ปรับขนาดตามขอบเขตของหน้าจอที่คุณต้องการ

  return (
    <>
      <MySeo
        title={'Category - Management'}
        description={SeoCategoryManagementpage.description}
        keywords={SeoCategoryManagementpage.keywords}
        content={SeoCategoryManagementpage.content}
      />
      <Box sx={{ width: '100%' }}>
        <Card
          sx={{
            height: isSmallScreen ? '80px' : '90px',
            marginBottom: '30px',
            padding: '15px 25px 20px',
            backgroundColor: '#2d2e81',
            border: '1px solid #primary.main'
          }}
        >
          <Grid container alignItems='center'>
            <Grid item xs={12} sm={8} md={8}>
              <Typography
                color='#fff'
                variant='h5'
                sx={{ fontWeight: 'bold', fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.6rem' } }}
              >
                Admin Management
              </Typography>
            </Grid>
            <Hidden smDown>
              <Grid item sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ManageAccountsIcon sx={{ fontSize: 50, color: '#fff' }} />
              </Grid>
            </Hidden>
          </Grid>
        </Card>
      </Box>

      <Card variant='outlined' sx={{ width: '100%' }}>
        <CardContent>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <Typography color='#000' variant='h6' fontSize='21px'>
              Category Management
            </Typography>
            <Button variant='contained' color='success' onClick={handleOpenInsDialog}>
              Insert
            </Button>
          </Box>
          <Box>
            {categorysdata && categorysdata.length > 0 ? (
              <DataGrid
                sx={{ paddingX: '10px' }}
                rows={categorysdata}
                columns={columns}
                getRowId={row => row.category_id}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 20
                    }
                  }
                }}
                pageSizeOptions={[20]}
                disableRowSelectionOnClick
              />
            ) : (
              <Typography variant='body1' fontSize='1.0rem' color='#000'>
                No data
              </Typography>
            )}
          </Box>
          <InsertCategory open={openIns} onClose={handleCloseInsDialog} updateData={handleUpdateData} />
          <EditCategory
            open={openEdit}
            onClose={handleCloseEdit}
            initialCategoryName={selectedCategoryName}
            categoryId={selectedCategoryId}
            updateData={handleUpdateData}
          />
        </CardContent>
      </Card>
    </>
  )
}

export default withAuth(CategoryManager)
