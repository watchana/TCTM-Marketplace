// ** Material UI Imports
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  CardMedia,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Hidden,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  styled,
  OutlinedInput,
  Switch,
  TextField,
  Typography
} from '@mui/material'

// ** Material Icons Imports
import PaymentIcon from '@mui/icons-material/Payment'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

// ** Material Design Icons Imports
import Truck from 'mdi-material-ui/Truck'

const Category = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Box sx={{ width: '185px', height: '200px', borderRadius: '3px', bgcolor: '#aaa', ml: 10 }}>ยัง</Box>
      <Box sx={{ width: '185px', height: '200px', borderRadius: '3px', bgcolor: '#da1', ml: 10 }}>ไม่</Box>
      <Box sx={{ width: '185px', height: '200px', borderRadius: '3px', bgcolor: '#fca', ml: 10 }}>ได้</Box>
      <Box sx={{ width: '185px', height: '200px', borderRadius: '3px', bgcolor: '#986', ml: 10 }}>ทำ</Box>
      <Box sx={{ width: '185px', height: '200px', borderRadius: '3px', bgcolor: '#195', ml: 10 }}>Image </Box>
      <Box sx={{ width: '185px', height: '200px', borderRadius: '3px', bgcolor: '#bca', ml: 10 }}>Slider</Box>
    </Box>
  )
}

export default Category
