import { useState } from 'react'
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
  useTheme
} from '@mui/material'
import { SectionLabel, SectionCard,InfoRow, MaskedInfoRow, TruncatedInfoRow } from '../ui/modalComponents'
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
import { useGetUserByIdQuery } from '../../apis/getUserDetails'
import { formatAddress, formatBirthDate, getInitials } from '../../utils/userFormatters'
import BankCard from './BankCard'
import UserCartsPanel from './UserCartsPanel'
import UserPostsPanel from './UserPostsPanel'
import UserTodosPanel from './UserTodosPanel'
import type { UserModalProps } from '../../types/props'
import { activeBtn, inactiveBtn } from '../../styles/butonStyles'
// ─── Main component ───────────────────────────────────────────────────────────
export default function UserModal({ userId, open, onClose }: UserModalProps) {
  const theme = useTheme()

  // <600px  → fullscreen, panels inside paper
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  // 600-899px → compact two-column
  const isSmBreak = useMediaQuery(theme.breakpoints.between('md', 'lg'))
  // ≥1300px → wide three-column (bank left | modal center | panels right)
  const isWide = useMediaQuery('(min-width: 1300px)')

  const [showBank, setShowBank] = useState(false)
  const [showCarts, setShowCarts] = useState(false)
  const [showPosts, setShowPosts] = useState(false)
  const [showTodos, setShowTodos] = useState(false)

  const { data: user, isLoading, isError } = useGetUserByIdQuery(userId ?? 0, { skip: userId === null })

  function handleClose() {
    setShowBank(false); setShowCarts(false); setShowPosts(false); setShowTodos(false)
    onClose()
  }

  const hasRightPanels = showCarts || showPosts || showTodos
  const hasAnyPanel = showBank || hasRightPanels

  // Panel column width per breakpoint
  const panelColWidth = isWide ? 380 : isSmBreak ? 340 : 280

  // Whether panels go in the right column vs inside the paper
  const panelsInPaper = isMobile

  return (
    <Modal open={open} onClose={handleClose} sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
      {/* ── Outer flex container ─────────────────────────────────────────── */}
      <Box sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'stretch' : 'flex-start',
        justifyContent: isWide ? 'center' : 'flex-start',
        minHeight: '100%',
        gap: isMobile ? 0 : 2,
        py: isMobile ? 0 : 1.5,
        px: isMobile ? 0 : (isSmBreak ? 1 : 1.5),
        outline: 'none',
        overflowX: 'hidden',
      }}>

        {/* ── LEFT: Bank (wide three-col only) ─────────────────────────── */}
        {isWide && (
          <Box sx={{ width: 340, flexShrink: 0, alignSelf: 'flex-start', visibility: showBank ? 'visible' : 'hidden' }}>
            {showBank && user && (
              <BankCard bank={user.bank} userName={`${user.firstName} ${user.lastName}`} onClose={() => setShowBank(false)} />
            )}
          </Box>
        )}

        {/* ── CENTER/LEFT: Modal paper ──────────────────────────────────── */}
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            // Wide: fixed 560px. Mobile: 100%. Medium: flex:1 with cap.
            width: isWide ? 560 : isMobile ? '100%' : undefined,
            flex: (!isWide && !isMobile) ? 1 : undefined,
            maxWidth: (!isWide && !isMobile) ? 520 : undefined,
            flexShrink: 0,
            maxHeight: isMobile ? '100dvh' : '94vh',
            overflowY: 'auto',
            background: '#0d0d1a',
            borderRadius: isMobile ? 0 : 3,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
            '&::-webkit-scrollbar': { width: 5 },
            '&::-webkit-scrollbar-thumb': { background: 'rgba(167,139,250,0.3)', borderRadius: 3 },
          }}
        >
          {/* Loading */}
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
              <CircularProgress sx={{ color: '#a78bfa' }} />
            </Box>
          )}

          {/* Error */}
          {isError && !isLoading && (
            <Box sx={{ p: 3 }}>
              <Alert severity="error" sx={{ borderRadius: 2 }}>Failed to load user details.</Alert>
              <Box sx={{ pt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={handleClose} variant="outlined" sx={{ borderRadius: 2, textTransform: 'none', borderColor: 'rgba(255,255,255,0.2)', color: '#e2e8f0' }}>Close</Button>
              </Box>
            </Box>
          )}

          {user && !isLoading && (
            <>
              {/* ── Sticky gradient header ──────────────────────────────── */}
              <Box sx={{
                background: 'linear-gradient(135deg, #1a0533 0%, #2d1b69 60%, #0f0a1e 100%)',
                px: 3, pt: 3, pb: 5,
                position: 'sticky', top: 0, zIndex: 2,
                borderBottom: '1px solid rgba(167,139,250,0.1)',
              }}>
                <Button onClick={handleClose} size="small" sx={{
                  position: 'absolute', top: 12, right: 12,
                  minWidth: 0, p: 0.75, borderRadius: 2,
                  color: 'rgba(255,255,255,0.6)',
                  '&:hover': { background: 'rgba(255,255,255,0.1)', color: '#fff' },
                }}>
                  <CloseIcon fontSize="small" />
                </Button>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ position: 'relative' }}>
                    <Avatar src={user.image} alt={`${user.firstName} ${user.lastName}`}
                      sx={{ width: 72, height: 72, border: '2px solid rgba(167,139,250,0.5)', fontSize: '1.5rem', fontWeight: 700, background: 'rgba(167,139,250,0.2)' }}>
                      {getInitials(user.firstName, user.lastName)}
                    </Avatar>
                    {/* Online dot */}
                    <Box sx={{ position: 'absolute', bottom: 3, right: 3, width: 12, height: 12, borderRadius: '50%', background: '#22c55e', border: '2px solid #1a0533' }} />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.2rem', lineHeight: 1.2 }}>
                      {user.firstName} {user.lastName}
                      {user.maidenName ? <Typography component="span" sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', fontWeight: 400, ml: 0.5 }}>({user.maidenName})</Typography> : null}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.75, flexWrap: 'wrap' }}>
                      <Chip label={`@${user.username}`} size="small"
                        sx={{ height: 20, fontSize: '0.7rem', background: 'rgba(167,139,250,0.2)', color: '#c4b5fd', fontWeight: 600, border: '1px solid rgba(167,139,250,0.3)' }} />
                      <Chip label={user.role} size="small"
                        sx={{ height: 20, fontSize: '0.7rem', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', textTransform: 'capitalize' }} />
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* ── Content sections ────────────────────────────────────── */}
              <Box sx={{ px: 2.5, pt: 1, pb: 1, flex: 1 }}>

                {/* Contact */}
                <SectionLabel label="Contact" icon={<EmailOutlinedIcon sx={{ fontSize: '0.9rem' }} />} />
                <SectionCard>
                  <InfoRow icon={<EmailOutlinedIcon sx={{ fontSize: '0.9rem' }} />} label="Email" value={user.email} />
                  <InfoRow icon={<PhoneOutlinedIcon sx={{ fontSize: '0.9rem' }} />} label="Phone" value={user.phone} />
                  <InfoRow icon={<LocationOnOutlinedIcon sx={{ fontSize: '0.9rem' }} />} label="Address" value={formatAddress(user.address)} />
                </SectionCard>

                {/* Personal */}
                <SectionLabel label="Personal" icon={<PersonOutlineIcon sx={{ fontSize: '0.9rem' }} />} />
                <SectionCard>
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 8px' }}>
                    <InfoRow icon={<PersonOutlineIcon sx={{ fontSize: '0.9rem' }} />} label="Age" value={`${user.age} yrs`} />
                    <InfoRow icon={<PersonOutlineIcon sx={{ fontSize: '0.9rem' }} />} label="Gender" value={user.gender.charAt(0).toUpperCase() + user.gender.slice(1)} />
                    <InfoRow icon={<PersonOutlineIcon sx={{ fontSize: '0.9rem' }} />} label="Birthday" value={formatBirthDate(user.birthDate)} />
                    <InfoRow icon={<PersonOutlineIcon sx={{ fontSize: '0.9rem' }} />} label="Blood Group" value={user.bloodGroup} />
                    <InfoRow icon={<PersonOutlineIcon sx={{ fontSize: '0.9rem' }} />} label="Height" value={`${user.height} cm`} />
                    <InfoRow icon={<PersonOutlineIcon sx={{ fontSize: '0.9rem' }} />} label="Weight" value={`${user.weight} kg`} />
                    <InfoRow icon={<PaletteOutlinedIcon sx={{ fontSize: '0.9rem' }} />} label="Eye Color" value={user.eyeColor} />
                    <InfoRow icon={<PaletteOutlinedIcon sx={{ fontSize: '0.9rem' }} />} label="Hair" value={`${user.hair.color}, ${user.hair.type}`} />
                  </Box>
                </SectionCard>

                {/* Company */}
                <SectionLabel label="Company" icon={<WorkOutlineIcon sx={{ fontSize: '0.9rem' }} />} />
                <SectionCard>
                  <InfoRow icon={<WorkOutlineIcon sx={{ fontSize: '0.9rem' }} />} label="Company" value={user.company.name} />
                  <InfoRow icon={<WorkOutlineIcon sx={{ fontSize: '0.9rem' }} />} label="Job Title" value={user.company.title} />
                  <InfoRow icon={<WorkOutlineIcon sx={{ fontSize: '0.9rem' }} />} label="Department" value={user.company.department} />
                  <InfoRow icon={<BusinessIcon sx={{ fontSize: '0.9rem' }} />} label="Office Address" value={formatAddress(user.company.address)} />
                </SectionCard>

                {/* Education */}
                <SectionLabel label="Education" icon={<SchoolOutlinedIcon sx={{ fontSize: '0.9rem' }} />} />
                <SectionCard>
                  <InfoRow icon={<SchoolOutlinedIcon sx={{ fontSize: '0.9rem' }} />} label="University" value={user.university} />
                </SectionCard>

                {/* Network */}
                <SectionLabel label="Network & Device" icon={<RouterIcon sx={{ fontSize: '0.9rem' }} />} />
                <SectionCard>
                  <InfoRow icon={<RouterIcon sx={{ fontSize: '0.9rem' }} />} label="IP Address" value={user.ip} />
                  <InfoRow icon={<RouterIcon sx={{ fontSize: '0.9rem' }} />} label="MAC Address" value={user.macAddress} />
                  <TruncatedInfoRow icon={<LaptopIcon sx={{ fontSize: '0.9rem' }} />} label="User Agent" value={user.userAgent} />
                </SectionCard>

                {/* Identity */}
                <SectionLabel label="Identity" icon={<BadgeIcon sx={{ fontSize: '0.9rem' }} />} />
                <SectionCard>
                  <InfoRow icon={<BadgeIcon sx={{ fontSize: '0.9rem' }} />} label="EIN" value={user.ein} />
                  <MaskedInfoRow icon={<LockOutlinedIcon sx={{ fontSize: '0.9rem' }} />} label="SSN" value={user.ssn} />
                </SectionCard>

                {/* Crypto */}
                <SectionLabel label="Crypto" icon={<CurrencyBitcoinIcon sx={{ fontSize: '0.9rem' }} />} />
                <SectionCard>
                  <InfoRow icon={<CurrencyBitcoinIcon sx={{ fontSize: '0.9rem' }} />} label="Coin" value={user.crypto.coin} />
                  <InfoRow icon={<CurrencyBitcoinIcon sx={{ fontSize: '0.9rem' }} />} label="Network" value={user.crypto.network} />
                  <TruncatedInfoRow icon={<CurrencyBitcoinIcon sx={{ fontSize: '0.9rem' }} />} label="Wallet" value={user.crypto.wallet} />
                </SectionCard>
              </Box>

              {/* Panels inside paper — mobile only */}
              {panelsInPaper && hasAnyPanel && (
                <Box sx={{ px: 2, pb: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {showBank && <BankCard bank={user.bank} userName={`${user.firstName} ${user.lastName}`} onClose={() => setShowBank(false)} />}
                  {showCarts && userId && <UserCartsPanel userId={userId} enabled={showCarts} onClose={() => setShowCarts(false)} />}
                  {showPosts && userId && <UserPostsPanel userId={userId} enabled={showPosts} onClose={() => setShowPosts(false)} />}
                  {showTodos && userId && <UserTodosPanel userId={userId} enabled={showTodos} onClose={() => setShowTodos(false)} />}
                </Box>
              )}

              {/* ── Sticky footer ───────────────────────────────────────── */}
              <Box sx={{
                position: 'sticky', bottom: 0, zIndex: 2,
                borderTop: '1px solid rgba(255,255,255,0.06)',
                px: 2, py: 1.5,
                background: 'rgba(8,4,20,0.95)',
                backdropFilter: 'blur(12px)',
                display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center',
              }}>
                {[
                  { label: 'Bank', icon: <CreditCardIcon sx={{ fontSize: '0.85rem !important' }} />, active: showBank, toggle: () => setShowBank(p => !p) },
                  { label: 'Cart', icon: <ShoppingCartIcon sx={{ fontSize: '0.85rem !important' }} />, active: showCarts, toggle: () => setShowCarts(p => !p) },
                  { label: 'Posts', icon: <ArticleIcon sx={{ fontSize: '0.85rem !important' }} />, active: showPosts, toggle: () => setShowPosts(p => !p) },
                  { label: 'Todos', icon: <ChecklistIcon sx={{ fontSize: '0.85rem !important' }} />, active: showTodos, toggle: () => setShowTodos(p => !p) },
                ].map(({ label, icon, active, toggle }) => (
                  <Button key={label} size="small" variant={active ? 'contained' : 'outlined'}
                    startIcon={icon} onClick={toggle}
                    sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, fontSize: '0.74rem', px: 1.5, ...(active ? activeBtn : inactiveBtn) }}>
                    {label}
                  </Button>
                ))}
                <Button size="small" onClick={handleClose} variant="contained" sx={{
                  ml: 'auto', borderRadius: 2, textTransform: 'none', fontWeight: 600, fontSize: '0.74rem', px: 2,
                  background: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
                  boxShadow: '0 4px 15px rgba(167,139,250,0.3)',
                  '&:hover': { background: 'linear-gradient(135deg, #c4b5fd 0%, #a78bfa 100%)' },
                }}>
                  Close
                </Button>
              </Box>
            </>
          )}
        </Box>

        {/* ── RIGHT: Panels column (non-mobile) ─────────────────────────── */}
        {!isMobile && (
          <Box sx={{
            width: panelColWidth,
            flexShrink: 0,
            alignSelf: 'flex-start',
            // Medium screens: all panels go here (including bank).
            // Wide: only cart/posts/todos (bank is left column).
            visibility: (isWide ? hasRightPanels : hasAnyPanel) ? 'visible' : 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            maxHeight: '94vh',
            overflowY: 'auto',
            '&::-webkit-scrollbar': { width: 4 },
            '&::-webkit-scrollbar-thumb': { background: 'rgba(167,139,250,0.25)', borderRadius: 2 },
          }}>
            {/* Bank goes in this column on medium screens */}
            {!isWide && showBank && user && (
              <BankCard bank={user.bank} userName={`${user.firstName} ${user.lastName}`} onClose={() => setShowBank(false)} />
            )}
            {showCarts && userId && <UserCartsPanel userId={userId} enabled={showCarts} onClose={() => setShowCarts(false)} />}
            {showPosts && userId && <UserPostsPanel userId={userId} enabled={showPosts} onClose={() => setShowPosts(false)} />}
            {showTodos && userId && <UserTodosPanel userId={userId} enabled={showTodos} onClose={() => setShowTodos(false)} />}
          </Box>
        )}
      </Box>
    </Modal>
  )
}
