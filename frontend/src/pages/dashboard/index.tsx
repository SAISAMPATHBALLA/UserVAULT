import { useNavigate } from 'react-router-dom'
import { Box, Typography, Button, Paper, Avatar } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'

export default function DashboardPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') ?? '{}');
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eaf6 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(255,255,255,0.8)',
          background: '#ffffff',
          textAlign: 'center',
          minWidth: 320,
        }}
      >
        <Avatar
          sx={{
            width: 72,
            height: 72,
            mx: 'auto',
            mb: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          {user.name?.[0]?.toUpperCase() ?? '?'}
        </Avatar>

        <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a2e' }}>
          {user.name ?? 'User'}
        </Typography>

        <Typography variant="body2" sx={{ color: '#6b7280', mt: 0.5 }}>
          {user.email ?? ''}
        </Typography>

        <Typography variant="caption" sx={{ color: '#9ca3af', display: 'block', mt: 1 }}>
          Member since {user.created_at ? new Date(user.created_at).toLocaleDateString() : '—'}
        </Typography>

        <Button
          variant="outlined"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            mt: 4,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            borderColor: '#e5e7eb',
            color: '#374151',
            '&:hover': { borderColor: '#ef4444', color: '#ef4444', background: '#fef2f2' },
          }}
        >
          Logout
        </Button>
      </Paper>
    </Box>
  )
}
