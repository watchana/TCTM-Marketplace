// ** React Imports
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function InsertCategory({ open, onClose, updateData }) {
  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')
  const router = useRouter() // router สร้าง path

  // ตัวแปรเก็บค่าข้อมูล
  const [categoryname, setCategoryName] = useState('')

  // เคลียร์ค่า categoryname เมื่อ Modal ถูกเปิด
  useEffect(() => {
    if (open) {
      setCategoryName('')
    }
  }, [open])

  // ฟังก์ชันเก็บค่า Input
  const handleCategoryChange = event => {
    setCategoryName(event.target.value)
  }

  // ฟังก์ชันส่งค่า Category
  const handleInsertSubmit = e => {
    e.preventDefault()

    // ตรวจสอบค่าว่างใน TextField
    if (!categoryname) {
      onClose()
      Swal.fire({
        icon: 'error',
        title: 'คุณกรอกข้อมูลไม่ครบ...',
        text: 'กรุณาระบุข้อมูลให้ครบถ้วน!'
      })

      return
    }

    const data = {
      category_name: categoryname
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API}DIGITAL.product_category.addcategory`, data)
      .then(response => {})
      .catch(error => {
        console.log(error)
      })
    Swal.fire({
      icon: 'success',
      title: 'เพิ่มข้อมูลแล้วเสร็จ'
    })
    updateData() // อัปเดตข้อมูลหลังจากบันทึก
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby='alert-dialog-title'>
      <DialogTitle id='alert-dialog-title'>{'Insert Data Category'}</DialogTitle>
      <DialogContent>
        <DialogContentText>Please enter the details for the new category:</DialogContentText>
        <TextField
          autoFocus
          fullWidth
          id='categoryName'
          label='Category Name'
          variant='outlined'
          value={categoryname}
          onChange={handleCategoryChange}
          sx={{ marginBottom: 3 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='outlined' color='error'>
          Cancel
        </Button>
        <Button onClick={handleInsertSubmit} variant='contained' color='success' autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
