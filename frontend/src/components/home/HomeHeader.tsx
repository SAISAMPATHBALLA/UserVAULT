import {
  Box,
  Typography,
  Avatar,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import ViewListIcon from '@mui/icons-material/ViewList'
import LogoutIcon from '@mui/icons-material/Logout'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import type { HomeHeaderProps } from '../../types/props'


export default function HomeHeader({ layoutMode, onLayoutToggle, onLogout, userName, onDashboard }: HomeHeaderProps) {
  const initial = userName ? userName.charAt(0).toUpperCase() : 'U'

  return (
    <Box
      sx={{
        background: 'rgba(0,0,0,0.35)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(167,139,250,0.18)',
        px: { xs: 2, sm: 3, md: 4 },
        py: 1.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 800,
          letterSpacing: '-0.5px',
          userSelect: 'none',
          background: 'linear-gradient(135deg, #a78bfa 0%, #c4b5fd 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        UserVault
      </Typography>

      <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
        {onDashboard && (
          <Button
            startIcon={<BarChartOutlinedIcon sx={{ fontSize: '0.95rem' }} />}
            onClick={onDashboard}
            size="small"
            sx={{
              color: 'rgba(255,255,255,0.55)', textTransform: 'none', fontWeight: 600,
              fontSize: '0.82rem', px: 1.5, borderRadius: 2,
              '&:hover': { background: 'rgba(167,139,250,0.12)', color: 'rgba(255,255,255,0.9)' },
            }}
          >
            Dashboard
          </Button>
        )}
      </Box>

      <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 0.5 }}>
        <Tooltip title="Grid view">
          <IconButton
            onClick={() => onLayoutToggle('grid')}
            sx={{
              color: layoutMode === 'grid' ? '#a78bfa' : 'rgba(255,255,255,0.35)',
              background: layoutMode === 'grid' ? 'rgba(167,139,250,0.15)' : 'transparent',
              borderRadius: 1.5,
              '&:hover': { background: 'rgba(167,139,250,0.2)', color: '#c4b5fd' },
            }}
          >
            <ViewModuleIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="List view">
          <IconButton
            onClick={() => onLayoutToggle('list')}
            sx={{
              color: layoutMode === 'list' ? '#a78bfa' : 'rgba(255,255,255,0.35)',
              background: layoutMode === 'list' ? 'rgba(167,139,250,0.15)' : 'transparent',
              borderRadius: 1.5,
              '&:hover': { background: 'rgba(167,139,250,0.2)', color: '#c4b5fd' },
            }}
          >
            <ViewListIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar
          sx={{
            width: 32,
            height: 32,
            fontSize: '0.8rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
            color: '#fff',
            border: '2px solid rgba(167,139,250,0.4)',
          }}
        >
          {initial}
        </Avatar>
        <Typography
          sx={{
            color: 'rgba(255,255,255,0.8)',
            fontWeight: 600,
            fontSize: '0.88rem',
            display: { xs: 'none', sm: 'block' },
            maxWidth: 160,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {userName}
        </Typography>
        <Button
          onClick={onLogout}
          startIcon={<LogoutIcon sx={{ fontSize: '0.9rem' }} />}
          size="small"
          sx={{
            color: 'rgba(255,255,255,0.5)',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.8rem',
            px: 1.5,
            borderRadius: 2,
            '&:hover': {
              background: 'rgba(167,139,250,0.12)',
              color: 'rgba(255,255,255,0.85)',
            },
          }}
        >
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
            Logout
          </Box>
        </Button>
      </Box>
    </Box>
  )
}
