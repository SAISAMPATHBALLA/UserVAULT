import { Box, Typography } from '@mui/material'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'

export default function LoginHeader() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
      <Box sx={{
        width: 48, height: 48, borderRadius: '14px',
        background: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        mb: 2, boxShadow: '0 6px 20px rgba(167,139,250,0.4)',
      }}>
        <LockOpenOutlinedIcon sx={{ color: '#fff', fontSize: 24 }} />
      </Box>

      <Typography component="h1" variant="h5"
        sx={{ fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>
        Welcome back
      </Typography>

      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.45)', mt: 0.5 }}>
        Sign in to continue to UserVault
      </Typography>
    </Box>
  )
}
