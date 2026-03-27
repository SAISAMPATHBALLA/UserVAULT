import { Box, Typography } from '@mui/material'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined'

export default function RegisterHeader() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
      <Box sx={{
        width: 48, height: 48, borderRadius: '14px',
        background: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        mb: 2, boxShadow: '0 6px 20px rgba(167,139,250,0.4)',
      }}>
        <PersonAddOutlinedIcon sx={{ color: '#fff', fontSize: 24 }} />
      </Box>

      <Typography component="h1" variant="h5"
        sx={{ fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>
        Create your account
      </Typography>

      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.45)', mt: 0.5 }}>
        Join UserVault today
      </Typography>
    </Box>
  )
}
