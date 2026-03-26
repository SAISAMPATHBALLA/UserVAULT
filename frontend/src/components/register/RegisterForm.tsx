import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
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
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useNavigate } from 'react-router-dom'
import { useRegisterUserMutation } from '../../apis/authApi'
const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Must contain at least one number'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterForm() {
  const [registerUser, { isLoading }] = useRegisterUserMutation()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null)
    try {
      const res = await registerUser({ name: data.name, email: data.email, password: data.password }).unwrap()
      if (res.success) {
        navigate('/login')
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
        label="Full Name"
        autoComplete="name"
        autoFocus
        margin="normal"
        error={!!errors.name}
        helperText={errors.name?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonOutlineIcon sx={{ color: '#9ca3af' }} />
            </InputAdornment>
          ),
        }}
        sx={fieldStyles}
        {...register('name')}
      />

      <TextField
        fullWidth
        label="Email Address"
        type="email"
        autoComplete="email"
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
        autoComplete="new-password"
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

      <TextField
        fullWidth
        label="Confirm Password"
        type={showConfirm ? 'text' : 'password'}
        autoComplete="new-password"
        margin="normal"
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockOutlinedIcon sx={{ color: '#9ca3af' }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowConfirm((v) => !v)}
                edge="end"
                size="small"
                tabIndex={-1}
              >
                {showConfirm ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={fieldStyles}
        {...register('confirmPassword')}
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
        {isLoading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Create Account'}
      </Button>

      <Divider sx={{ my: 2 }}>
        <Typography variant="caption" sx={{ color: '#9ca3af' }}>
          Already have an account?
        </Typography>
      </Divider>

      <Button
        fullWidth
        variant="outlined"
        href="/login"
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
        Sign in instead
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
