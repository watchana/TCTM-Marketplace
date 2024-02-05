// FormComponent.js
import React, { useState } from 'react'

const FormComponent = ({ onFormDataChange }) => {
  const [formData, setFormData] = useState({
    field1: '',
    field2: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })

    // ส่งข้อมูลที่เปลี่ยนแปลงไปยัง form หลัก
    onFormDataChange(formData)
  }

  return (
    <form>
      <input type='text' name='field1' value={formData.field1} onChange={handleChange} />
      <textarea name='field2' value={formData.field2} onChange={handleChange} />
    </form>
  )
}

export default FormComponent
