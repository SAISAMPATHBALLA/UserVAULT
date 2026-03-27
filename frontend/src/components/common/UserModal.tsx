import { useState } from 'react'
import {
  Modal,
  Avatar,
  Box,
  Typography,
  Button,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  useMediaQuery,
  useTheme,
  Tooltip,
  IconButton,
} from '@mui/material'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import CloseIcon from '@mui/icons-material/Close'
import RouterIcon from '@mui/icons-material/Router'
import LaptopIcon from '@mui/icons-material/Laptop'
import BadgeIcon from '@mui/icons-material/Badge'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin'
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined'
import BusinessIcon from '@mui/icons-material/Business'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ArticleIcon from '@mui/icons-material/Article'
import ChecklistIcon from '@mui/icons-material/Checklist'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useGetUserByIdQuery } from '../../apis/getUserDetails'
import { formatAddress, formatBirthDate, getInitials } from '../../utils/userFormatters'
import BankCard from './BankCard'
import UserCartsPanel from './UserCartsPanel'
import UserPostsPanel from './UserPostsPanel'
import UserTodosPanel from './UserTodosPanel'

interface UserModalProps {
  userId: number | null
  open: boolean
  onClose: () => void
}

function SectionLabel({ label }: { label: string }) {
  return (
    <Divider sx={{ my: 2 }}>
      <Typography variant="caption" sx={{ color: '#9ca3af', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', fontSize: '0.68rem' }}>
        {label}
      </Typography>
    </Divider>
  )
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5 }}>
      <Box sx={{ color: '#667eea', mt: 0.2, flexShrink: 0 }}>{icon}</Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontSize: '0.7rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4 }}>
          {label}
        </Typography>
        <Typography sx={{ fontSize: '0.9rem', color: '#1a1a2e', fontWeight: 500, mt: 0.1, wordBreak: 'break-word' }}>
          {value}
        </Typography>
      </Box>
    </Box>
  )
}

function TruncatedInfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5 }}>
      <Box sx={{ color: '#667eea', mt: 0.2, flexShrink: 0 }}>{icon}</Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography sx={{ fontSize: '0.7rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4 }}>
          {label}
        </Typography>
        <Tooltip title={value} placement="top">
          <Typography sx={{ fontSize: '0.9rem', color: '#1a1a2e', fontWeight: 500, mt: 0.1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'default' }}>
            {value}
          </Typography>
        </Tooltip>
      </Box>
    </Box>
  )
}

function MaskedInfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  const [revealed, setRevealed] = useState(false)
  const masked = value.replace(/^\d{3}-\d{2}-/, '•••-••-')
  const display = revealed ? value : masked

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5 }}>
      <Box sx={{ color: '#667eea', mt: 0.2, flexShrink: 0 }}>{icon}</Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography sx={{ fontSize: '0.7rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4 }}>
            {label}
          </Typography>
          <Chip label="sensitive" size="small" sx={{ height: 14, fontSize: '0.55rem', background: '#fef3c7', color: '#92400e', ml: 0.5 }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography sx={{ fontSize: '0.9rem', color: '#1a1a2e', fontWeight: 500, mt: 0.1, fontFamily: revealed ? 'inherit' : '"Courier New", monospace' }}>
            {display}
          </Typography>
          <IconButton size="small" onClick={() => setRevealed((p) => !p)} sx={{ p: 0.25, color: '#9ca3af', '&:hover': { color: '#667eea' } }}>
            {revealed ? <VisibilityOffIcon sx={{ fontSize: '0.85rem' }} /> : <VisibilityIcon sx={{ fontSize: '0.85rem' }} />}
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

const activeButtonSx = {
  background: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
  color: '#fff',
  boxShadow: '0 4px 12px rgba(167,139,250,0.35)',
  '&:hover': { background: 'linear-gradient(135deg, #c4b5fd 0%, #a78bfa 100%)' },
}

const inactiveButtonSx = {
  borderColor: 'rgba(167,139,250,0.4)',
  color: '#7c3aed',
  '&:hover': { borderColor: '#a78bfa', background: 'rgba(167,139,250,0.06)' },
}

export default function UserModal({ userId, open, onClose }: UserModalProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [showBank, setShowBank] = useState(false)
  const [showCarts, setShowCarts] = useState(false)
  const [showPosts, setShowPosts] = useState(false)
  const [showTodos, setShowTodos] = useState(false)

  const { data: user, isLoading, isError } = useGetUserByIdQuery(userId ?? 0, {
    skip: userId === null,
  })

  function handleClose() {
    setShowBank(false)
    setShowCarts(false)
    setShowPosts(false)
    setShowTodos(false)
    onClose()
  }

  const hasRightPanels = showCarts || showPosts || showTodos

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ overflow: 'auto' }}
    >
      {/* Outer flex row — three columns */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'flex-start',
          justifyContent: 'center',
          minHeight: '100%',
          gap: 2,
          py: isMobile ? 0 : 3,
          px: isMobile ? 0 : 1,
          outline: 'none',
        }}
      >
        {/* LEFT slot — BankCard (always rendered on desktop to hold center position) */}
        <Box
          sx={{
            width: 340,
            flexShrink: 0,
            alignSelf: 'flex-start',
            visibility: showBank ? 'visible' : 'hidden',
            display: isMobile ? 'none' : 'block',
          }}
        >
          {showBank && user && (
            <BankCard
              bank={user.bank}
              userName={`${user.firstName} ${user.lastName}`}
              onClose={() => setShowBank(false)}
            />
          )}
        </Box>

        {/* CENTER — main modal paper */}
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            width: isMobile ? '100%' : 560,
            flexShrink: 0,
            maxHeight: isMobile ? '100dvh' : '90vh',
            overflowY: 'auto',
            background: '#fff',
            borderRadius: isMobile ? 0 : 3,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 50px rgba(0,0,0,0.35)',
            '&::-webkit-scrollbar': { width: 6 },
            '&::-webkit-scrollbar-thumb': { background: 'rgba(167,139,250,0.35)', borderRadius: 3 },
          }}
        >
          {/* Loading */}
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
              <CircularProgress sx={{ color: '#667eea' }} />
            </Box>
          )}

          {/* Error */}
          {isError && !isLoading && (
            <Box sx={{ p: 3 }}>
              <Alert severity="error" sx={{ borderRadius: 2 }}>Failed to load user details. Please try again.</Alert>
              <Box sx={{ pt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={handleClose} variant="outlined" sx={{ borderRadius: 2, textTransform: 'none' }}>Close</Button>
              </Box>
            </Box>
          )}

          {user && !isLoading && (
            <>
              {/* Sticky gradient header */}
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #1a0533 0%, #302b63 100%)',
                  px: 3,
                  pt: 3,
                  pb: 4,
                  position: 'sticky',
                  top: 0,
                  zIndex: 1,
                }}
              >
                <Button
                  onClick={handleClose}
                  size="small"
                  sx={{
                    position: 'absolute', top: 12, right: 12,
                    minWidth: 0, p: 0.75, borderRadius: 2,
                    color: 'rgba(255,255,255,0.8)',
                    '&:hover': { background: 'rgba(255,255,255,0.2)', color: '#fff' },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </Button>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                    sx={{ width: 72, height: 72, border: '3px solid rgba(255,255,255,0.5)', fontSize: '1.5rem', fontWeight: 700, background: 'rgba(255,255,255,0.2)' }}
                  >
                    {getInitials(user.firstName, user.lastName)}
                  </Avatar>
                  <Box>
                    <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.25rem', lineHeight: 1.2 }}>
                      {user.firstName} {user.lastName}
                      {user.maidenName ? ` (${user.maidenName})` : ''}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
                      <Chip label={`@${user.username}`} size="small"
                        sx={{ height: 20, fontSize: '0.72rem', background: 'rgba(255,255,255,0.2)', color: '#fff', fontWeight: 600 }} />
                      <Chip label={user.role} size="small"
                        sx={{ height: 20, fontSize: '0.72rem', background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)', textTransform: 'capitalize' }} />
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Scrollable content */}
              <Box sx={{ px: 3, py: 0, pb: 1 }}>

                {/* Contact */}
                <SectionLabel label="Contact" />
                <InfoRow icon={<EmailOutlinedIcon sx={{ fontSize: '1rem' }} />} label="Email" value={user.email} />
                <InfoRow icon={<PhoneOutlinedIcon sx={{ fontSize: '1rem' }} />} label="Phone" value={user.phone} />
                <InfoRow icon={<LocationOnOutlinedIcon sx={{ fontSize: '1rem' }} />} label="Address" value={formatAddress(user.address)} />

                {/* Personal */}
                <SectionLabel label="Personal" />
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                  <InfoRow icon={<PersonOutlineIcon sx={{ fontSize: '1rem' }} />} label="Age" value={`${user.age} years`} />
                  <InfoRow icon={<PersonOutlineIcon sx={{ fontSize: '1rem' }} />} label="Gender" value={user.gender.charAt(0).toUpperCase() + user.gender.slice(1)} />
                  <InfoRow icon={<PersonOutlineIcon sx={{ fontSize: '1rem' }} />} label="Birthday" value={formatBirthDate(user.birthDate)} />
                  <InfoRow icon={<PersonOutlineIcon sx={{ fontSize: '1rem' }} />} label="Blood Group" value={user.bloodGroup} />
                  <InfoRow icon={<PersonOutlineIcon sx={{ fontSize: '1rem' }} />} label="Height" value={`${user.height} cm`} />
                  <InfoRow icon={<PersonOutlineIcon sx={{ fontSize: '1rem' }} />} label="Weight" value={`${user.weight} kg`} />
                  <InfoRow icon={<PaletteOutlinedIcon sx={{ fontSize: '1rem' }} />} label="Eye Color" value={user.eyeColor} />
                  <InfoRow icon={<PaletteOutlinedIcon sx={{ fontSize: '1rem' }} />} label="Hair" value={`${user.hair.color}, ${user.hair.type}`} />
                </Box>

                {/* Company */}
                <SectionLabel label="Company" />
                <InfoRow icon={<WorkOutlineIcon sx={{ fontSize: '1rem' }} />} label="Company" value={user.company.name} />
                <InfoRow icon={<WorkOutlineIcon sx={{ fontSize: '1rem' }} />} label="Job Title" value={user.company.title} />
                <InfoRow icon={<WorkOutlineIcon sx={{ fontSize: '1rem' }} />} label="Department" value={user.company.department} />
                <InfoRow icon={<BusinessIcon sx={{ fontSize: '1rem' }} />} label="Office Address" value={formatAddress(user.company.address)} />

                {/* Education */}
                <SectionLabel label="Education" />
                <InfoRow icon={<SchoolOutlinedIcon sx={{ fontSize: '1rem' }} />} label="University" value={user.university} />

                {/* Network & Device */}
                <SectionLabel label="Network & Device" />
                <InfoRow icon={<RouterIcon sx={{ fontSize: '1rem' }} />} label="IP Address" value={user.ip} />
                <InfoRow icon={<RouterIcon sx={{ fontSize: '1rem' }} />} label="MAC Address" value={user.macAddress} />
                <TruncatedInfoRow icon={<LaptopIcon sx={{ fontSize: '1rem' }} />} label="User Agent" value={user.userAgent} />

                {/* Identity */}
                <SectionLabel label="Identity" />
                <InfoRow icon={<BadgeIcon sx={{ fontSize: '1rem' }} />} label="EIN" value={user.ein} />
                <MaskedInfoRow icon={<LockOutlinedIcon sx={{ fontSize: '1rem' }} />} label="SSN" value={user.ssn} />

                {/* Crypto */}
                <SectionLabel label="Crypto" />
                <InfoRow icon={<CurrencyBitcoinIcon sx={{ fontSize: '1rem' }} />} label="Coin" value={user.crypto.coin} />
                <InfoRow icon={<CurrencyBitcoinIcon sx={{ fontSize: '1rem' }} />} label="Network" value={user.crypto.network} />
                <TruncatedInfoRow icon={<CurrencyBitcoinIcon sx={{ fontSize: '1rem' }} />} label="Wallet" value={user.crypto.wallet} />
              </Box>

              {/* Mobile panels — stacked below content */}
              {isMobile && showBank && (
                <Box sx={{ mx: 2, mb: 2 }}>
                  <BankCard bank={user.bank} userName={`${user.firstName} ${user.lastName}`} onClose={() => setShowBank(false)} />
                </Box>
              )}
              {isMobile && showCarts && userId && (
                <Box sx={{ mx: 2, mb: 2 }}>
                  <UserCartsPanel userId={userId} enabled={showCarts} onClose={() => setShowCarts(false)} />
                </Box>
              )}
              {isMobile && showPosts && userId && (
                <Box sx={{ mx: 2, mb: 2 }}>
                  <UserPostsPanel userId={userId} enabled={showPosts} onClose={() => setShowPosts(false)} />
                </Box>
              )}
              {isMobile && showTodos && userId && (
                <Box sx={{ mx: 2, mb: 2 }}>
                  <UserTodosPanel userId={userId} enabled={showTodos} onClose={() => setShowTodos(false)} />
                </Box>
              )}

              {/* Sticky footer with toggle buttons */}
              <Box
                sx={{
                  position: 'sticky',
                  bottom: 0,
                  zIndex: 1,
                  borderTop: '1px solid #f3f4f6',
                  px: 2,
                  py: 1.5,
                  background: '#fff',
                  display: 'flex',
                  gap: 1,
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}
              >
                <Button
                  size="small"
                  variant={showBank ? 'contained' : 'outlined'}
                  startIcon={<CreditCardIcon sx={{ fontSize: '0.85rem !important' }} />}
                  onClick={() => setShowBank((p) => !p)}
                  sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, fontSize: '0.75rem', px: 1.5,
                    ...(showBank ? activeButtonSx : inactiveButtonSx) }}
                >
                  Bank
                </Button>
                <Button
                  size="small"
                  variant={showCarts ? 'contained' : 'outlined'}
                  startIcon={<ShoppingCartIcon sx={{ fontSize: '0.85rem !important' }} />}
                  onClick={() => setShowCarts((p) => !p)}
                  sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, fontSize: '0.75rem', px: 1.5,
                    ...(showCarts ? activeButtonSx : inactiveButtonSx) }}
                >
                  Cart
                </Button>
                <Button
                  size="small"
                  variant={showPosts ? 'contained' : 'outlined'}
                  startIcon={<ArticleIcon sx={{ fontSize: '0.85rem !important' }} />}
                  onClick={() => setShowPosts((p) => !p)}
                  sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, fontSize: '0.75rem', px: 1.5,
                    ...(showPosts ? activeButtonSx : inactiveButtonSx) }}
                >
                  Posts
                </Button>
                <Button
                  size="small"
                  variant={showTodos ? 'contained' : 'outlined'}
                  startIcon={<ChecklistIcon sx={{ fontSize: '0.85rem !important' }} />}
                  onClick={() => setShowTodos((p) => !p)}
                  sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, fontSize: '0.75rem', px: 1.5,
                    ...(showTodos ? activeButtonSx : inactiveButtonSx) }}
                >
                  Todos
                </Button>
                <Button
                  size="small"
                  onClick={handleClose}
                  variant="contained"
                  sx={{
                    ml: 'auto',
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    px: 2,
                    background: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
                    boxShadow: '0 4px 15px rgba(167,139,250,0.3)',
                    '&:hover': { background: 'linear-gradient(135deg, #c4b5fd 0%, #a78bfa 100%)' },
                  }}
                >
                  Close
                </Button>
              </Box>
            </>
          )}
        </Box>

        {/* RIGHT column — Cart / Posts / Todos panels */}
        <Box
          sx={{
            width: 340,
            flexShrink: 0,
            alignSelf: 'flex-start',
            visibility: hasRightPanels ? 'visible' : 'hidden',
            display: isMobile ? 'none' : 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {showCarts && userId && (
            <UserCartsPanel userId={userId} enabled={showCarts} onClose={() => setShowCarts(false)} />
          )}
          {showPosts && userId && (
            <UserPostsPanel userId={userId} enabled={showPosts} onClose={() => setShowPosts(false)} />
          )}
          {showTodos && userId && (
            <UserTodosPanel userId={userId} enabled={showTodos} onClose={() => setShowTodos(false)} />
          )}
        </Box>
      </Box>
    </Modal>
  )
}
