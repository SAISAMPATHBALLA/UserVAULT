import { Box, Container, Paper } from '@mui/material'
import LoginHeader from '../../components/login/LoginHeader'
import LoginForm from '../../components/login/LoginForm'

export default function LoginPage() {
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
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(255,255,255,0.8)',
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
