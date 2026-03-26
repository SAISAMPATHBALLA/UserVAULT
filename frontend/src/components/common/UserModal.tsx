import {
  Dialog,
  DialogContent,
  DialogActions,
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
} from '@mui/material'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import CloseIcon from '@mui/icons-material/Close'
import { useGetUserByIdQuery } from '../../apis/getUserDetails'
import { formatAddress, formatBirthDate, getInitials } from '../../utils/userFormatters'

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
      <Box>
        <Typography sx={{ fontSize: '0.7rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4 }}>
          {label}
        </Typography>
        <Typography sx={{ fontSize: '0.9rem', color: '#1a1a2e', fontWeight: 500, mt: 0.1 }}>
          {value}
        </Typography>
      </Box>
    </Box>
  )
}

export default function UserModal({ userId, open, onClose }: UserModalProps) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const { data: user, isLoading, isError } = useGetUserByIdQuery(userId ?? 0, {
    skip: userId === null,
  })

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          borderRadius: fullScreen ? 0 : 3,
          overflow: 'hidden',
        },
      }}
    >
      {/* Loading state */}
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
          <CircularProgress sx={{ color: '#667eea' }} />
        </Box>
      )}

      {/* Error state */}
      {isError && !isLoading && (
        <Box sx={{ p: 3 }}>
          <Alert severity="error" sx={{ borderRadius: 2 }}>
            Failed to load user details. Please try again.
          </Alert>
          <DialogActions sx={{ pt: 2, px: 0 }}>
            <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2, textTransform: 'none' }}>
              Close
            </Button>
          </DialogActions>
        </Box>
      )}

      {/* Content */}
      {user && !isLoading && (
        <>
          {/* Header with gradient */}
          <Box
            sx={{
              background: 'linear-gradient(135deg, #1a0533 0%, #302b63 100%)',
              px: 3,
              pt: 3,
              pb: 4,
              position: 'relative',
            }}
          >
            <Button
              onClick={onClose}
              size="small"
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                minWidth: 0,
                p: 0.75,
                borderRadius: 2,
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
                sx={{
                  width: 72,
                  height: 72,
                  border: '3px solid rgba(255,255,255,0.5)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  background: 'rgba(255,255,255,0.2)',
                }}
              >
                {getInitials(user.firstName, user.lastName)}
              </Avatar>
              <Box>
                <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.25rem', lineHeight: 1.2 }}>
                  {user.firstName} {user.lastName}
                  {user.maidenName ? ` (${user.maidenName})` : ''}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
                  <Chip
                    label={`@${user.username}`}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: '0.72rem',
                      background: 'rgba(255,255,255,0.2)',
                      color: '#fff',
                      fontWeight: 600,
                    }}
                  />
                  <Chip
                    label={user.role}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: '0.72rem',
                      background: 'rgba(255,255,255,0.15)',
                      color: 'rgba(255,255,255,0.9)',
                      textTransform: 'capitalize',
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          <DialogContent sx={{ px: 3, py: 0, pb: 1 }}>
            {/* Contact */}
            <SectionLabel label="Contact" />
            <InfoRow
              icon={<EmailOutlinedIcon sx={{ fontSize: '1rem' }} />}
              label="Email"
              value={user.email}
            />
            <InfoRow
              icon={<PhoneOutlinedIcon sx={{ fontSize: '1rem' }} />}
              label="Phone"
              value={user.phone}
            />
            <InfoRow
              icon={<LocationOnOutlinedIcon sx={{ fontSize: '1rem' }} />}
              label="Address"
              value={formatAddress(user.address)}
            />

            {/* Personal */}
            <SectionLabel label="Personal" />
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
              <InfoRow
                icon={<PersonOutlineIcon sx={{ fontSize: '1rem' }} />}
                label="Age"
                value={`${user.age} years`}
              />
              <InfoRow
                icon={<PersonOutlineIcon sx={{ fontSize: '1rem' }} />}
                label="Gender"
                value={user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
              />
              <InfoRow
                icon={<PersonOutlineIcon sx={{ fontSize: '1rem' }} />}
                label="Birthday"
                value={formatBirthDate(user.birthDate)}
              />
              <InfoRow
                icon={<PersonOutlineIcon sx={{ fontSize: '1rem' }} />}
                label="Blood Group"
                value={user.bloodGroup}
              />
              <InfoRow
                icon={<PersonOutlineIcon sx={{ fontSize: '1rem' }} />}
                label="Height"
                value={`${user.height} cm`}
              />
              <InfoRow
                icon={<PersonOutlineIcon sx={{ fontSize: '1rem' }} />}
                label="Weight"
                value={`${user.weight} kg`}
              />
            </Box>

            {/* Company */}
            <SectionLabel label="Company" />
            <InfoRow
              icon={<WorkOutlineIcon sx={{ fontSize: '1rem' }} />}
              label="Company"
              value={user.company.name}
            />
            <InfoRow
              icon={<WorkOutlineIcon sx={{ fontSize: '1rem' }} />}
              label="Job Title"
              value={user.company.title}
            />
            <InfoRow
              icon={<WorkOutlineIcon sx={{ fontSize: '1rem' }} />}
              label="Department"
              value={user.company.department}
            />

            {/* Education */}
            <SectionLabel label="Education" />
            <InfoRow
              icon={<SchoolOutlinedIcon sx={{ fontSize: '1rem' }} />}
              label="University"
              value={user.university}
            />
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid #f3f4f6' }}>
            <Button
              onClick={onClose}
              variant="contained"
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
                background: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
                boxShadow: '0 4px 15px rgba(167,139,250,0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #c4b5fd 0%, #a78bfa 100%)',
                },
              }}
            >
              Close
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}
