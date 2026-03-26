import { Box, Typography } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

export default function NotFoundIllustration() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
      <Box sx={{ position: 'relative', mb: 2 }}>
        <Typography
          sx={{
            fontSize: { xs: '7rem', sm: '10rem' },
            fontWeight: 900,
            lineHeight: 1,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-4px',
            userSelect: 'none',
          }}
        >
          404
        </Typography>

        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(102, 126, 234, 0.45)',
          }}
        >
          <ErrorOutlineIcon sx={{ color: '#fff', fontSize: 30 }} />
        </Box>
      </Box>

      <Typography
        variant="h5"
        sx={{ fontWeight: 700, color: '#1a1a2e', letterSpacing: '-0.5px', mb: 1 }}
      >
        Page Not Found
      </Typography>

      <Typography
        variant="body1"
        sx={{ color: '#6b7280', textAlign: 'center', maxWidth: 340, lineHeight: 1.7 }}
      >
        The page you're looking for doesn't exist or has been moved.
      </Typography>
    </Box>
  )
}
