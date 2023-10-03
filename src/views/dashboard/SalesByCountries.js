// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import DotsVertical from 'mdi-material-ui/DotsVertical'

// const data = [
//   {
//     sales: 'Number of each state',
//     title: 'Name status',
//     avatarText: '',
//     avatarColor: 'success'
//   },
//   {
//     sales: 'Number of each state',
//     title: 'Name status',
//     avatarText: '',
//     avatarColor: 'error'
//   },
//   {
//     sales: 'Number of each state',
//     title: 'Name status',
//     avatarText: '',
//     avatarColor: 'warning'
//   },
//   {
//     sales: 'Number of each state',
//     title: 'Name status',
//     avatarText: '',
//     avatarColor: 'primary'
//   },
//   {
//     sales: 'Number of each state',
//     title: 'Name status',
//     avatarText: '',
//     avatarColor: 'secondary'
//   }
// ]

const SalesByCountries = ({ Data }) => {
  // keep data
  const userStatus = Data.all_member_in_system

  return (
    <Card>
      <CardHeader
        title='User status'
        titleTypographyProps={{ sx: { lineHeight: '1.2 !important', letterSpacing: '0.31px !important' } }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
        {userStatus &&
          userStatus.map((item, index) => {
            return (
              <Box
                key={item.title}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ...(index !== userStatus.length - 1 ? { mb: 5.875 } : {})
                }}
              >
                <Avatar
                  sx={{
                    width: 38,
                    height: 38,
                    marginRight: 3,
                    fontSize: '1rem',
                    color: 'common.white',
                    backgroundColor: 'success'
                  }}
                >
                  {item.avatarText}
                </Avatar>

                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex' }}>
                      <Typography sx={{ mr: 0.5, fontWeight: 600, letterSpacing: '0.25px' }}>{item.title}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {item.user_status === '0' ? (
                          <Typography>User Band</Typography>
                        ) : item.user_status === '1' ? (
                          <Typography>Normal User</Typography>
                        ) : item.user_status === '2' ? (
                          <Typography>Market User</Typography>
                        ) : item.user_status === 'All User in system' ? (
                          <Typography>All User in system</Typography>
                        ) : (
                          <Typography>Unknown</Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', textAlign: 'end', flexDirection: 'column' }}>
                    <Typography
                      sx={{ fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.72, letterSpacing: '0.22px' }}
                    >
                      Count : {item.member_id_id_count}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )
          })}
      </CardContent>
    </Card>
  )
}

export default SalesByCountries
