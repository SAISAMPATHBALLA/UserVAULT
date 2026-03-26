import { Box, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

export default function RegisterHeader() {
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
        <LockOutlinedIcon sx={{ color: '#fff', fontSize: 28 }} />
      </Box>

      <Typography
        component="h1"
        variant="h5"
        sx={{ fontWeight: 700, color: '#1a1a2e', letterSpacing: '-0.5px' }}
      >
        Create your account
      </Typography>

      <Typography variant="body2" sx={{ color: '#6b7280', mt: 0.5 }}>
        Fill in the details below to get started
      </Typography>
    </Box>
  )
}
