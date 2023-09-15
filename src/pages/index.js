// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** Utils Imports
import { withAuth } from '../@core/utils/AuthCheck'

// ** Material UI Imports
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Hidden,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Switch,
  TextField,
  Typography
} from '@mui/material'

// ** custom components
import Billboard from 'src/views/homepage/Billboard'
import Category from 'src/views/homepage/Category'
import SlideshowWithCards from 'src/views/homepage/SlideBillboard'
import SlideshowWithProduct from 'src/views/homepage/SlideProduct'
import SlideRecommended from 'src/views/homepage/SlideRecommended'

// ** Import Cookies
import Cookies from 'js-cookie'

const Dashboard = () => {
  const router = useRouter()

  return (
    <Container maxWidth='xl'>
      {/* ---------- Billboard ---------- */}
      <Box sx={{ width: '100%' }}>
        <Billboard />
        <Category />
        <Link href='/category' passHref>
          <h1>Category</h1>
        </Link>
      </Box>
    </Container>
  )
}

export default withAuth(Dashboard)
