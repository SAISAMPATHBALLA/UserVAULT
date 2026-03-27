import { useNavigate } from 'react-router-dom'
import { Navbar, Nav, Button } from 'rsuite'
import { Box, Avatar, Typography, IconButton, Tooltip } from '@mui/material'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import ViewListIcon from '@mui/icons-material/ViewList'
import LogoutIcon from '@mui/icons-material/Logout'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'

interface AppNavProps {
  currentPage: 'home' | 'dashboard'
  userName: string
  onLogout: () => void
  layoutMode?: 'grid' | 'list'
  onLayoutToggle?: (mode: 'grid' | 'list') => void
}

const navbarStyle: React.CSSProperties = {
  background: 'rgba(0,0,0,0.4)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  borderBottom: '1px solid rgba(167,139,250,0.18)',
  position: 'sticky',
  top: 0,
  zIndex: 1100,
  paddingLeft: 8,
  paddingRight: 8,
}

export default function AppNav({ currentPage, userName, onLogout, layoutMode, onLayoutToggle }: AppNavProps) {
  const navigate = useNavigate()
  const initial = userName?.[0]?.toUpperCase() ?? 'U'

  return (
    <Navbar style={navbarStyle}>
      <Navbar.Brand onClick={() => navigate('/home')} style={{ cursor: 'pointer', padding: '14px 16px' }}>
        <span style={{
          fontWeight: 800,
          fontSize: '1.18rem',
          letterSpacing: '-0.5px',
          background: 'linear-gradient(135deg, #a78bfa 0%, #c4b5fd 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          UserVault
        </span>
      </Navbar.Brand>

      <Nav appearance="subtle">
        <Nav.Item
          active={currentPage === 'home'}
          onClick={() => navigate('/home')}
          icon={<HomeOutlinedIcon style={{ fontSize: '1rem', verticalAlign: 'middle', marginRight: 4 }} />}
          style={{ color: currentPage === 'home' ? '#a78bfa' : 'rgba(255,255,255,0.55)', fontWeight: 600 }}
        >
          Home
        </Nav.Item>
        <Nav.Item
          active={currentPage === 'dashboard'}
          onClick={() => navigate('/dashboard')}
          icon={<BarChartOutlinedIcon style={{ fontSize: '1rem', verticalAlign: 'middle', marginRight: 4 }} />}
          style={{ color: currentPage === 'dashboard' ? '#a78bfa' : 'rgba(255,255,255,0.55)', fontWeight: 600 }}
        >
          Dashboard
        </Nav.Item>
      </Nav>

      {layoutMode && onLayoutToggle && (
        <Nav appearance="subtle" style={{ display: window.innerWidth < 480 ? 'none' : undefined }}>
          <Nav.Item panel style={{ padding: '8px 6px' }}>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Tooltip title="Grid view">
                <IconButton
                  onClick={() => onLayoutToggle('grid')}
                  size="small"
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
                  size="small"
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
          </Nav.Item>
        </Nav>
      )}

      <Nav pullRight appearance="subtle">
        <Nav.Item panel style={{ padding: '8px 8px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
            <Avatar sx={{
              width: 30, height: 30, fontSize: '0.78rem', fontWeight: 700,
              background: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
              color: '#fff', border: '2px solid rgba(167,139,250,0.4)',
            }}>
              {initial}
            </Avatar>
            <Typography sx={{
              color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: '0.85rem',
              display: { xs: 'none', sm: 'block' },
              maxWidth: 130, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {userName}
            </Typography>
            <Button
              appearance="subtle"
              size="sm"
              onClick={onLogout}
              style={{ fontWeight: 600, fontSize: '0.8rem', padding: '5px 10px' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <LogoutIcon sx={{ fontSize: '0.9rem' }} />
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Logout</Box>
              </Box>
            </Button>
          </Box>
        </Nav.Item>
      </Nav>
    </Navbar>
  )
}
