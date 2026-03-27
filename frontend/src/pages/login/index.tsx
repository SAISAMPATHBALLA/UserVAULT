import { Box, Container, Paper } from '@mui/material'
import LoginHeader from '../../components/login/LoginHeader'
import LoginForm from '../../components/login/LoginForm'

export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #5d2424 0%, #010000 60%, #303031 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255,255,255,0.12)',
            background: '#ffffff',
          }}
        >
          <LoginHeader />
          <LoginForm />
        </Paper>
      </Container>
    </Box>
  )
}
