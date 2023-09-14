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
  Link,
  OutlinedInput,
  Switch,
  TextField,
  Typography
} from '@mui/material'

// ** Import Next components
import { useRouter } from 'next/router'
import { withAuth } from '../@core/utils/AuthCheck'

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
      </Box>
    </Container>
  )
}

export default withAuth(Dashboard)
