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

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
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
    <Box sx={{width:'100%'}} component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {serverError && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2, background: 'rgba(239,68,68,0.1)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.2)', '& .MuiAlert-icon': { color: '#f87171' } }}>
          {serverError}
        </Alert>
      )}

      <TextField
        fullWidth label="Full Name" autoComplete="name" autoFocus margin="normal"
        error={!!errors.name} helperText={errors.name?.message}
        InputProps={{
          startAdornment: <InputAdornment position="start"><PersonOutlineIcon sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '1.1rem' }} /></InputAdornment>,
        }}
        sx={fieldStyles}
        {...register('name')}
      />

      <TextField
        fullWidth label="Email Address" type="email" autoComplete="email" margin="normal"
        error={!!errors.email} helperText={errors.email?.message}
        InputProps={{
          startAdornment: <InputAdornment position="start"><EmailOutlinedIcon sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '1.1rem' }} /></InputAdornment>,
        }}
        sx={fieldStyles}
        {...register('email')}
      />

      <TextField
        fullWidth label="Password"
        type={showPassword ? 'text' : 'password'}
        autoComplete="new-password" margin="normal"
        error={!!errors.password} helperText={errors.password?.message}
        InputProps={{
          startAdornment: <InputAdornment position="start"><LockOutlinedIcon sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '1.1rem' }} /></InputAdornment>,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(v => !v)} edge="end" size="small" tabIndex={-1}
                sx={{ color: 'rgba(255,255,255,0.35)', '&:hover': { color: '#a78bfa' } }}>
                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={fieldStyles}
        {...register('password')}
      />

      <TextField
        fullWidth label="Confirm Password"
        type={showConfirm ? 'text' : 'password'}
        autoComplete="new-password" margin="normal"
        error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message}
        InputProps={{
          startAdornment: <InputAdornment position="start"><LockOutlinedIcon sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '1.1rem' }} /></InputAdornment>,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowConfirm(v => !v)} edge="end" size="small" tabIndex={-1}
                sx={{ color: 'rgba(255,255,255,0.35)', '&:hover': { color: '#a78bfa' } }}>
                {showConfirm ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={fieldStyles}
        {...register('confirmPassword')}
      />

      <Button type="submit" fullWidth variant="contained" disabled={isLoading}
        sx={{
          mt: 3, mb: 1, py: 1.4, borderRadius: 2,
          fontWeight: 600, fontSize: '0.95rem', textTransform: 'none',
          background: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
          boxShadow: '0 4px 15px rgba(167,139,250,0.35)',
          '&:hover': { background: 'linear-gradient(135deg, #c4b5fd 0%, #a78bfa 100%)', boxShadow: '0 6px 20px rgba(167,139,250,0.5)' },
          '&:disabled': { opacity: 0.6 },
        }}
      >
        {isLoading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Create Account'}
      </Button>

      <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.08)' }}>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', px: 1 }}>
          Already have an account?
        </Typography>
      </Divider>

      <Button fullWidth variant="outlined" href="/login"
        sx={{
          py: 1.2, borderRadius: 2, fontWeight: 600, textTransform: 'none',
          borderColor: 'rgba(167,139,250,0.25)', color: '#c4b5fd',
          '&:hover': { borderColor: '#a78bfa', color: '#a78bfa', background: 'rgba(167,139,250,0.08)' },
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
    color: '#e2e8f0',
    background: 'rgba(255,255,255,0.05)',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
    '&:hover fieldset': { borderColor: 'rgba(167,139,250,0.4)' },
    '&.Mui-focused fieldset': { borderColor: '#a78bfa' },
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' },
  '& label.Mui-focused': { color: '#a78bfa' },
  '& .MuiFormHelperText-root': { color: '#f87171' },
}
