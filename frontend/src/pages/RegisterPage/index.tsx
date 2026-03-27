import { Box, Container } from '@mui/material'
import RegisterHeader from '../../components/register/RegisterHeader'
import RegisterForm from '../../components/register/RegisterForm'
import BrandMark from '../../components/ui/BrandMark'
import { useGetUserDetailsQuery } from '../../apis/getUserDetails'

export default function RegisterPage() {
  useGetUserDetailsQuery()

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
      <Container maxWidth="xs">
        <BrandMark />
        <Box
          sx={{
            maxWidth: { xs: '100%', sm: 420, md: 500 },
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 4,
            p: { xs: 3, sm: 4 },
            boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
          }}
        >
          <RegisterHeader />
          <RegisterForm />
        </Box>
      </Container>
    </Box>
  )
}
