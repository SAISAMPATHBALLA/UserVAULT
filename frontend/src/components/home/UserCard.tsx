import {
  Card,
  CardActionArea,
  Avatar,
  Box,
  Typography,
  Chip,
} from '@mui/material'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import { getInitials } from '../../utils/userFormatters'
import type { UserCardProps } from '../../types/props'
import { fadeSlideUp } from '../../styles/butonStyles'


export default function UserCard({ user, mode, onClick, index }: UserCardProps) {
  const initials = getInitials(user.firstName, user.lastName)
  const animDelay = `${Math.min(index * 50, 600)}ms`

  if (mode === 'list') {
    return (
      <Card
        elevation={0}
        sx={{
          ...fadeSlideUp,
          mb: 1,
          borderLeft: '3px solid rgba(167,139,250,0.5)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 2,
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(20px)',
          opacity: 0,
          animation: 'fadeSlideUp 0.45s ease forwards',
          animationDelay: animDelay,
          transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
          '&:hover': {
            transform: 'translateX(6px)',
            boxShadow: '0 4px 24px rgba(167,139,250,0.18)',
            borderColor: 'rgba(167,139,250,0.4)',
          },
        }}
      >
        <CardActionArea onClick={onClick} sx={{ p: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', px: 2.5, py: 1.5, gap: 2 }}>
            <Avatar
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              sx={{
                width: 44,
                height: 44,
                background: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
                fontWeight: 700,
                fontSize: '0.9rem',
                flexShrink: 0,
                border: '2px solid rgba(167,139,250,0.3)',
              }}
            >
              {initials}
            </Avatar>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{ fontWeight: 700, fontSize: '0.93rem', color: '#fff', lineHeight: 1.3 }}
              >
                {user.firstName} {user.lastName}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.2 }}>
                <WorkOutlineIcon sx={{ fontSize: '0.72rem', color: '#a78bfa' }} />
                <Typography sx={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.55)' }}>
                  {user.company.title} · {user.company.department}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  alignItems: 'center',
                  gap: 0.5,
                  mt: 0.2,
                }}
              >
                <EmailOutlinedIcon sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)' }} />
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.35)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {user.email}
                </Typography>
              </Box>
            </Box>

            <ChevronRightIcon sx={{ color: 'rgba(255,255,255,0.25)', flexShrink: 0 }} />
          </Box>
        </CardActionArea>
      </Card>
    )
  }

  return (
    <Card
      elevation={0}
      sx={{
        ...fadeSlideUp,
        height: '100%',
        borderLeft: '3px solid rgba(167,139,250,0.55)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 2.5,
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(20px)',
        opacity: 0,
        animation: 'fadeSlideUp 0.45s ease forwards',
        animationDelay: animDelay,
        transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 32px rgba(167,139,250,0.25)',
          borderColor: 'rgba(167,139,250,0.45)',
        },
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          p: 0,
        }}
      >
        {/* Top section: avatar + name/title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, pt: 2, pb: 1.5 }}>
          <Avatar
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            sx={{
              width: 52,
              height: 52,
              flexShrink: 0,
              background: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
              fontWeight: 700,
              fontSize: '1.1rem',
              border: '2px solid rgba(167,139,250,0.35)',
            }}
          >
            {initials}
          </Avatar>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '0.93rem',
                color: '#fff',
                lineHeight: 1.3,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {user.firstName} {user.lastName}
            </Typography>
            <Typography
              sx={{
                fontSize: '0.76rem',
                color: 'rgba(255,255,255,0.5)',
                mt: 0.2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {user.company.title}
            </Typography>
          </Box>
        </Box>

        {/* Divider */}
        <Box sx={{ height: '1px', background: 'rgba(255,255,255,0.07)', mx: 2 }} />

        {/* Bottom section: dept + email */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1.25,
            gap: 1,
          }}
        >
          <Chip
            label={user.company.department}
            size="small"
            sx={{
              height: 20,
              fontSize: '0.66rem',
              fontWeight: 600,
              background: 'rgba(167,139,250,0.15)',
              color: '#c4b5fd',
              border: '1px solid rgba(167,139,250,0.25)',
              maxWidth: '55%',
              '& .MuiChip-label': {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              },
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4, minWidth: 0 }}>
            <EmailOutlinedIcon sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
            <Typography
              sx={{
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.32)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {user.email}
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  )
}
