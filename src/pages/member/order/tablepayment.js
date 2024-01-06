import React, { useState, useRef } from 'react'
import { Container, Grid, Typography, Card, CardContent, Button, Box } from '@mui/material'

const TablePayment = ({ productData }) => {

const uniqueProductData = Array.from(new Set(productData.map(item => item.sub_bank_name)))
    .map(sub_bank_name => {
      return productData.find(item => item.sub_bank_name === sub_bank_name);
    });

  return (
    <Card variant='outlined' sx={{ width: '100%', boxShadow: 3, marginBottom: 4 }}>
      {uniqueProductData.map((dataItem, index) => (
      <CardContent key={index}>
        <div
          style={{
            marginTop: '15px',
            marginLeft: '15px',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography variant='subtitle1' gutterBottom>
            Transfer money to pay for products via bank to your bank account.
          </Typography>
          <table style={{ borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ border: '1px solid black', padding: '8px' }}>Account name.</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{dataItem.sub_bank_name}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid black', padding: '8px' }}>Savings account number</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{dataItem.sub_bank_number}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid black', padding: '8px' }}>Siam Commercial Bank</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{dataItem.sub_book_bank_name}</td>
              </tr>
            </tbody>
          </table>
          <Typography variant='subtitle1' gutterBottom sx={{ p: '10px 0px -0px' }}>
            Pay for products via PromptPay.
          </Typography>
          <table style={{ borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ border: '1px solid black', padding: '8px' }}>Account name.</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{dataItem.sub_pay_name}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid black', padding: '8px' }}>Tax identification number</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{dataItem.sub_pay_number}</td>
              </tr>
            </tbody>
          </table>
          <Typography variant='body1' sx={{ p: '10px 0px 10px' }} gutterBottom>
            Scan QR Code to pay for products.
          </Typography>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <img
              src='https://www.paymentscardsandmobile.com/wp-content/uploads/2020/05/PayPal-QR-code.png'
              alt='QR Code'
              style={{ maxWidth: '40%' }}
            />
          </div>
        </div>
      </CardContent>
      ))}
    </Card>
  )
}

export default TablePayment
