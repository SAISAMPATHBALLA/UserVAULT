import { useState } from 'react'
import { Box, Typography, Divider, IconButton, Tooltip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import WifiIcon from '@mui/icons-material/Wifi'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import type { BankCardProps } from '../../types/props'
import { DarkInfoRow } from '../ui/modalComponents'

export default function BankCard({ bank, userName, onClose }: BankCardProps) {
  const [numberVisible, setNumberVisible] = useState(false)

  const rawNumber = bank.cardNumber.replace(/\s/g, '')
  const last4 = rawNumber.slice(-4)
  const displayNumber = numberVisible
    ? bank.cardNumber  // show as-is from API (may have spaces)
    : `•••• •••• •••• ${last4}`

  return (
    <Box
      sx={{
        background: 'rgba(8,4,20,0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(167,139,250,0.2)',
        borderRadius: '16px',
        p: 2,
        boxShadow: '0 25px 50px rgba(0,0,0,0.7)',
      }}
    >
      {/* Panel header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Typography sx={{ color: '#a78bfa', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: 1 }}>
          Bank Details
        </Typography>
        <IconButton size="small" onClick={onClose}
          sx={{ color: 'rgba(255,255,255,0.45)', p: 0.5, '&:hover': { color: '#fff', background: 'rgba(255,255,255,0.08)' } }}>
          <CloseIcon sx={{ fontSize: '1rem' }} />
        </IconButton>
      </Box>

      {/* Card visual */}
      <Box sx={{
        position: 'relative',
        width: '100%',
        height: 200,
        borderRadius: '12px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #1a0533 0%, #4c1d95 55%, #1a1a4e 100%)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
      }}>
        {/* Gloss */}
        <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 20%, rgba(255,255,255,0.08), transparent 60%)' }} />

        {/* Decorative circles */}
        <Box sx={{ position: 'absolute', top: -60, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(167,139,250,0.07)' }} />
        <Box sx={{ position: 'absolute', bottom: -70, left: -50, width: 220, height: 220, borderRadius: '50%', background: 'rgba(124,58,237,0.08)' }} />

        {/* EMV Chip */}
        <Box sx={{
          position: 'absolute', top: 20, left: 20,
          width: 44, height: 34, borderRadius: '6px',
          background: 'linear-gradient(135deg, #c8a732 0%, #f5d876 40%, #c8a732 70%, #e8c84a 100%)',
          border: '1px solid rgba(200,167,50,0.5)',
          boxShadow: 'inset 14px 0 0 -13px rgba(0,0,0,0.25), inset 0 11px 0 -10px rgba(0,0,0,0.25)',
        }} />

        {/* Contactless icon */}
        <Tooltip title="Contactless" placement="left">
          <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
            <WifiIcon sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.4rem', transform: 'rotate(90deg)' }} />
          </Box>
        </Tooltip>

        {/* Card number + toggle */}
        <Box sx={{ position: 'absolute', top: 72, left: 20, right: 16, display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography sx={{
            fontFamily: '"Courier New", monospace',
            fontSize: numberVisible ? '0.82rem' : '1.05rem',
            letterSpacing: numberVisible ? '1.5px' : '3px',
            color: '#fff', fontWeight: 600, flex: 1,
            transition: 'font-size 0.2s',
          }}>
            {displayNumber}
          </Typography>
          <IconButton
            size="small"
            onClick={() => setNumberVisible((p) => !p)}
            sx={{ p: 0.3, color: 'rgba(255,255,255,0.55)', flexShrink: 0, '&:hover': { color: '#fff', background: 'rgba(255,255,255,0.12)' } }}
          >
            {numberVisible
              ? <VisibilityOffIcon sx={{ fontSize: '0.85rem' }} />
              : <VisibilityIcon sx={{ fontSize: '0.85rem' }} />}
          </IconButton>
        </Box>

        {/* Bottom row */}
        <Box sx={{ position: 'absolute', bottom: 16, left: 20, right: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Box>
            <Typography sx={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
              Card Holder
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#fff', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
              {userName.length > 18 ? userName.slice(0, 18) + '…' : userName}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
              Expires
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#fff', fontWeight: 600, letterSpacing: '1px' }}>
              {bank.cardExpire}
            </Typography>
          </Box>
          <Box sx={{ px: 1, py: 0.3, border: '1px solid rgba(255,255,255,0.25)', borderRadius: '4px', background: 'rgba(255,255,255,0.1)' }}>
            <Typography sx={{ fontSize: '0.7rem', color: '#fff', fontStyle: 'italic', fontWeight: 700, letterSpacing: '0.5px' }}>
              {bank.cardType}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Below-card info */}
      <Divider sx={{ my: 1.5, borderColor: 'rgba(167,139,250,0.15)' }} />
      <DarkInfoRow icon={<AccountBalanceIcon sx={{ fontSize: '1rem' }} />} label="IBAN" value={bank.iban} />
      <DarkInfoRow icon={<CurrencyExchangeIcon sx={{ fontSize: '1rem' }} />} label="Currency" value={bank.currency} />
    </Box>
  )
}
