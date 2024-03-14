import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import axios from 'axios'

export default function EditCategory({ open, onClose, initialCategoryName, categoryId, updateData }) {
  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')
  const [categoryName, setCategoryName] = useState('')

  const handleCategoryChange = event => {
    setCategoryName(event.target.value)
  }

  // เซตค่า categoryname เมื่อ Modal ถูกเปิด
  useEffect(() => {
    if (open) {
      setCategoryName(initialCategoryName)
    }
  }, [open, initialCategoryName])

  // ฟังก์ชันแก้ไขค่า Category
  const handleEditSubmit = e => {
    e.preventDefault()

    // ตรวจสอบค่าว่างใน TextField
    if (!categoryName) {
      onClose()
      Swal.fire({
        icon: 'error',
        title: 'คุณกรอกข้อมูลไม่ครบ...',
        text: 'กรุณาระบุข้อมูลให้ครบถ้วน!'
      })

      return
    }

    const data = {
      category_id: categoryId,
      category_name: categoryName
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API}DIGITAL.product_category.editcategory`, data)
      .then(response => {})
      .catch(error => {
        console.log(error)
      })
    Swal.fire({
      icon: 'success',
      title: 'เเก้ไขข้อมูลแล้วเสร็จ'
    })
    updateData() // อัปเดตข้อมูลหลังจากบันทึก
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby='alert-dialog-title'>
      <DialogTitle id='alert-dialog-title'>{'Edit Data Category'}</DialogTitle>
      <DialogContent>
        <DialogContentText>Please edit the details for the category:</DialogContentText>
        <TextField
          autoFocus
          fullWidth
          id='categoryName'
          label='Category Name'
          variant='outlined'
          value={categoryName}
          onChange={handleCategoryChange}
          sx={{ marginBottom: 3 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='outlined' color='error'>
          Cancel
        </Button>
        <Button onClick={handleEditSubmit} variant='contained' color='success' autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
