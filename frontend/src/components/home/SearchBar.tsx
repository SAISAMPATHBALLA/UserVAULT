import { Box, TextField, InputAdornment, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import type { SearchBarProps } from '../../types/props'

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mb: 3,
      }}
    >
      <TextField
        placeholder="Search by name, email, username…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size="small"
        sx={{
          width: { xs: '100%', sm: '70%', md: '50%' },
          '& .MuiOutlinedInput-root': {
            borderRadius: 2.5,
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(12px)',
            fontSize: '0.9rem',
            color: '#fff',
            transition: 'box-shadow 0.2s ease',
            '& fieldset': {
              borderColor: 'rgba(255,255,255,0.15)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(167,139,250,0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#a78bfa',
              borderWidth: '1px',
            },
            '&.Mui-focused': {
              boxShadow: '0 0 0 3px rgba(167,139,250,0.18)',
            },
          },
          '& .MuiInputBase-input::placeholder': {
            color: 'rgba(255,255,255,0.35)',
            opacity: 1,
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '1.05rem' }} />
            </InputAdornment>
          ),
          endAdornment: value ? (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => onChange('')} edge="end" tabIndex={-1}>
                <ClearIcon sx={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.35)' }} />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
      />
    </Box>
  )
}
