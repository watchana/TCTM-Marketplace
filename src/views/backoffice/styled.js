import { styled } from '@mui/system';
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { DataGrid } from '@mui/x-data-grid';

    const StyledTable = styled(Table)`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
  `;
  
  const StyledTableRow = styled(TableRow)`
    && {
      &:nth-of-type(even) {
        background-color: #f5f5f5; /* สีเทาอ่อนสำหรับแถวคู่ */
      }
  
      &:last-child td,
      &:last-child th {
        border: 0; /* ไม่แสดงเส้นขอบสำหรับเซลล์และหัวตารางในแถวสุดท้าย */
      }
    }
  `;

  const StyledTableRow2 = styled(TableRow)`
  && {
    &:nth-of-type(odd) {
      background-color: #f5f5f5; /* สีเทาอ่อนสำหรับแถวคู่ */
    }

    &:last-child td,
    &:last-child th {
      border: 0; /* ไม่แสดงเส้นขอบสำหรับเซลล์และหัวตารางในแถวสุดท้าย */
    }
  }
`;
  
  const CustomTableCell = styled(TableCell)`
    && {
      padding: 10px; /* ปรับขนาดของเซลล์ตาราง */
      text-align: center;
      white-space: nowrap; /* ไม่ขึ้นบรรทัดใหม่เมื่อเนื้อหายาวเกินไป */
      overflow: hidden; /* ซ่อนเนื้อหาที่เกินขนาดเซลล์ตาราง */
      text-overflow: ellipsis; /* แสดงเครื่องหมาย ... เมื่อเนื้อหาเกินขนาดเซลล์ตาราง */
    }
  `;

  const StyledDataGrid = styled(DataGrid)`
  .MuiDataGrid-root {
    border: none;
    border-radius: 4px;
  }
`;

export  {StyledTable, StyledTableRow, CustomTableCell, StyledTableRow2, StyledDataGrid};