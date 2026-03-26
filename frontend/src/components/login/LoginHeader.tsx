import { Box, Typography } from '@mui/material'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'

export default function LoginHeader() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
        }}
      >
        <LockOpenOutlinedIcon sx={{ color: '#fff', fontSize: 28 }} />
      </Box>

      <Typography
        component="h1"
        variant="h5"
        sx={{ fontWeight: 700, color: '#1a1a2e', letterSpacing: '-0.5px' }}
      >
        Welcome back
      </Typography>

      <Typography variant="body2" sx={{ color: '#6b7280', mt: 0.5 }}>
        Sign in to your account
      </Typography>
    </Box>
  )
}
