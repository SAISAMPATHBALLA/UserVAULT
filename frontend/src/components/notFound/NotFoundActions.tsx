import { Box, Button } from '@mui/material'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'

export default function NotFoundActions() {
  const navigate = useNavigate()

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
      <Button
        variant="contained"
        startIcon={<HomeOutlinedIcon />}
        onClick={() => navigate('/register')}
        sx={{
          py: 1.3,
          px: 3,
          borderRadius: 2,
          fontWeight: 600,
          textTransform: 'none',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #5a6fd6 0%, #6a4292 100%)',
            boxShadow: '0 6px 20px rgba(102, 126, 234, 0.5)',
          },
        }}
      >
        Go to Home
      </Button>

      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{
          py: 1.3,
          px: 3,
          borderRadius: 2,
          fontWeight: 600,
          textTransform: 'none',
          borderColor: '#e5e7eb',
          color: '#374151',
          '&:hover': { borderColor: '#667eea', color: '#667eea', background: '#f5f3ff' },
        }}
      >
        Go Back
      </Button>
    </Box>
  )
}
