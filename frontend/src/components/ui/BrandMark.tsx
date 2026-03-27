import { Box, Typography } from '@mui/material'
import SecurityIcon from '@mui/icons-material/Security'

export default function BrandMark() {
  return (
    <Box sx={{ textAlign: 'center', mb: 3 }}>
      <Box sx={{
        width: 52, height: 52, borderRadius: '16px',
        background: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        mx: 'auto', mb: 1.5,
        boxShadow: '0 8px 25px rgba(167,139,250,0.4)',
      }}>
        <SecurityIcon sx={{ color: '#fff', fontSize: 28 }} />
      </Box>
      <Typography sx={{
        fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.5px',
        background: 'linear-gradient(135deg, #a78bfa 0%, #c4b5fd 100%)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>
        UserVault
      </Typography>
    </Box>
  )
}
