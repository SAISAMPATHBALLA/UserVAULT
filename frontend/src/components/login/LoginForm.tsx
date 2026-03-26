import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  Divider,
  Typography,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useLoginUserMutation } from '../../apis/authApi'
import { useDispatch } from 'react-redux'
import { setUserDetails } from '../../store/MainSlice'
const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginForm() {
  const [loginUser, { isLoading }] = useLoginUserMutation()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const navigate = useNavigate()
 const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null)
    try {
      const res = await loginUser({ email: data.email, password: data.password }).unwrap()
      if (res.success && res.data) {
        localStorage.setItem('user', JSON.stringify(res.data));
        dispatch(setUserDetails(res.data));

        console.log('Login successful:', res.data.name);

        navigate('/home')
      } else {
        setServerError(res.message)
      }
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {serverError && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
          {serverError}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Email Address"
        type="email"
        autoComplete="email"
        autoFocus
        margin="normal"
        error={!!errors.email}
        helperText={errors.email?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailOutlinedIcon sx={{ color: '#9ca3af' }} />
            </InputAdornment>
          ),
        }}
        sx={fieldStyles}
        {...register('email')}
      />

      <TextField
        fullWidth
        label="Password"
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
        margin="normal"
        error={!!errors.password}
        helperText={errors.password?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockOutlinedIcon sx={{ color: '#9ca3af' }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((v) => !v)}
                edge="end"
                size="small"
                tabIndex={-1}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={fieldStyles}
        {...register('password')}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={isLoading}
        sx={{
          mt: 3,
          mb: 1,
          py: 1.5,
          borderRadius: 2,
          fontWeight: 600,
          fontSize: '1rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
          textTransform: 'none',
          '&:hover': {
            background: 'linear-gradient(135deg, #5a6fd6 0%, #6a4292 100%)',
            boxShadow: '0 6px 20px rgba(102, 126, 234, 0.5)',
          },
          '&:disabled': { opacity: 0.7 },
        }}
      >
        {isLoading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Sign In'}
      </Button>

      <Divider sx={{ my: 2 }}>
        <Typography variant="caption" sx={{ color: '#9ca3af' }}>
          Don't have an account?
        </Typography>
      </Divider>

      <Button
        fullWidth
        variant="outlined"
        href="/register"
        sx={{
          py: 1.2,
          borderRadius: 2,
          fontWeight: 600,
          textTransform: 'none',
          borderColor: '#e5e7eb',
          color: '#374151',
          '&:hover': { borderColor: '#667eea', color: '#667eea', background: '#f5f3ff' },
        }}
      >
        Create account
      </Button>
    </Box>
  )
}

const fieldStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    '&:hover fieldset': { borderColor: '#667eea' },
    '&.Mui-focused fieldset': { borderColor: '#667eea' },
  },
  '& label.Mui-focused': { color: '#667eea' },
}
