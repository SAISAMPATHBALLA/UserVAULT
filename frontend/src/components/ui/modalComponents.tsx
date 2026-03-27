import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import {
  Modal,
  Avatar,
  Box,
  Typography,
  Button,
  Chip,
  CircularProgress,
  Alert,
  useMediaQuery,
  useTheme,
  Tooltip,
  IconButton,
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

export function DarkInfoRow  ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5 }}>
      <Box sx={{
        color: '#a78bfa', flexShrink: 0,
        width: 28, height: 28, borderRadius: '8px',
        background: 'rgba(167,139,250,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {icon}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontSize: '0.63rem', color: 'rgba(255,255,255,0.38)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          {label}
        </Typography>
        <Typography sx={{ fontSize: '0.82rem', color: '#e2e8f0', fontWeight: 500, mt: 0.1, wordBreak: 'break-all' }}>
          {value}
        </Typography>
      </Box>
    </Box>
  )
}

export function SectionLabel({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 2 }}>
      <Box sx={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.25))' }} />
      <Box sx={{
        display: 'flex', alignItems: 'center', gap: 0.6,
        background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)',
        borderRadius: '20px', px: 1.2, py: 0.3,
      }}>
        <Box sx={{ color: '#a78bfa', display: 'flex', fontSize: '0.75rem' }}>{icon}</Box>
        <Typography sx={{ fontSize: '0.6rem', color: '#a78bfa', fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase' }}>
          {label}
        </Typography>
      </Box>
      <Box sx={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, rgba(167,139,250,0.25), transparent)' }} />
    </Box>
  )
}

// ─── Section card wrapper ─────────────────────────────────────────────────────
export function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '12px',
      p: 2,
      mb: 0.5,
    }}>
      {children}
    </Box>
  )
}

// ─── Info row (dark theme) ────────────────────────────────────────────────────
export function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5, '&:last-child': { mb: 0 } }}>
      <Box sx={{
        color: '#a78bfa', flexShrink: 0,
        width: 28, height: 28, borderRadius: '8px',
        background: 'rgba(167,139,250,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {icon}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          {label}
        </Typography>
        <Typography sx={{ fontSize: '0.88rem', color: '#e2e8f0', fontWeight: 500, mt: 0.1, wordBreak: 'break-word' }}>
          {value}
        </Typography>
      </Box>
    </Box>
  )
}

// ─── Truncated row with tooltip ───────────────────────────────────────────────
export function TruncatedInfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5, '&:last-child': { mb: 0 } }}>
      <Box sx={{
        color: '#a78bfa', flexShrink: 0,
        width: 28, height: 28, borderRadius: '8px',
        background: 'rgba(167,139,250,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {icon}
      </Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography sx={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          {label}
        </Typography>
        <Tooltip title={value} placement="top">
          <Typography sx={{ fontSize: '0.88rem', color: '#e2e8f0', fontWeight: 500, mt: 0.1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'default' }}>
            {value}
          </Typography>
        </Tooltip>
      </Box>
    </Box>
  )
}

// ─── Masked row with reveal toggle ───────────────────────────────────────────
export function MaskedInfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  const [revealed, setRevealed] = useState(false)
  const display = revealed ? value : value.replace(/^\d{3}-\d{2}-/, '•••-••-')

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 0 }}>
      <Box sx={{
        color: '#a78bfa', flexShrink: 0,
        width: 28, height: 28, borderRadius: '8px',
        background: 'rgba(167,139,250,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {icon}
      </Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography sx={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {label}
          </Typography>
          <Chip label="sensitive" size="small" sx={{ height: 14, fontSize: '0.52rem', background: 'rgba(251,191,36,0.12)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.2)' }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography sx={{ fontSize: '0.88rem', color: '#e2e8f0', fontWeight: 500, mt: 0.1, fontFamily: revealed ? 'inherit' : '"Courier New", monospace' }}>
            {display}
          </Typography>
          <IconButton size="small" onClick={() => setRevealed((p) => !p)}
            sx={{ p: 0.2, color: 'rgba(255,255,255,0.3)', '&:hover': { color: '#a78bfa' } }}>
            {revealed ? <VisibilityOffIcon sx={{ fontSize: '0.8rem' }} /> : <VisibilityIcon sx={{ fontSize: '0.8rem' }} />}
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}