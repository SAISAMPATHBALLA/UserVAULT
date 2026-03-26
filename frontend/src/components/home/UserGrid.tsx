import { Box, Grid, Skeleton, Alert, Card } from '@mui/material'
import type { User } from '../../types/Users'
import UserCard from './UserCard'

interface UserGridProps {
  users: User[]
  mode: 'grid' | 'list'
  onUserClick: (id: number) => void
  isFetching: boolean
  isError: boolean
}

const SKELETON_COUNT = 12

function GridSkeleton({ mode }: { mode: 'grid' | 'list' }) {
  if (mode === 'list') {
    return (
      <Box>
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <Card
            key={i}
            elevation={0}
            sx={{
              mb: 1,
              border: '1px solid rgba(255,255,255,0.08)',
              borderLeft: '3px solid rgba(167,139,250,0.25)',
              borderRadius: 2,
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(20px)',
              p: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Skeleton variant="circular" width={44} height={44} sx={{ bgcolor: 'rgba(255,255,255,0.08)' }} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="40%" height={18} sx={{ bgcolor: 'rgba(255,255,255,0.08)' }} />
              <Skeleton variant="text" width="60%" height={14} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
            </Box>
          </Card>
        ))}
      </Box>
    )
  }

  return (
    <Grid container spacing={2}>
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={i}>
          <Card
            elevation={0}
            sx={{
              border: '1px solid rgba(255,255,255,0.08)',
              borderLeft: '3px solid rgba(167,139,250,0.25)',
              borderRadius: 2.5,
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(20px)',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, pt: 2, pb: 1.5 }}>
              <Skeleton variant="circular" width={52} height={52} sx={{ bgcolor: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Skeleton variant="text" width="70%" height={18} sx={{ bgcolor: 'rgba(255,255,255,0.08)' }} />
                <Skeleton variant="text" width="50%" height={14} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
              </Box>
            </Box>
            <Box sx={{ height: '1px', background: 'rgba(255,255,255,0.07)', mx: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.25 }}>
              <Skeleton variant="rounded" width={70} height={20} sx={{ bgcolor: 'rgba(255,255,255,0.06)', borderRadius: 5 }} />
              <Skeleton variant="text" width="35%" height={14} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default function UserGrid({ users, mode, onUserClick, isFetching, isError }: UserGridProps) {
  if (isFetching) {
    return <GridSkeleton mode={mode} />
  }

  if (isError) {
    return (
      <Alert
        severity="error"
        sx={{
          borderRadius: 2,
          mt: 2,
          background: 'rgba(239,68,68,0.12)',
          border: '1px solid rgba(239,68,68,0.25)',
          color: '#fca5a5',
          '& .MuiAlert-icon': { color: '#f87171' },
        }}
      >
        Failed to load users. Please check your connection and try again.
      </Alert>
    )
  }

  if (users.length === 0) {
    return (
      <Alert
        severity="info"
        sx={{
          borderRadius: 2,
          mt: 2,
          background: 'rgba(167,139,250,0.1)',
          border: '1px solid rgba(167,139,250,0.25)',
          color: '#c4b5fd',
          '& .MuiAlert-icon': { color: '#a78bfa' },
        }}
      >
        No users found matching your search.
      </Alert>
    )
  }

  return (
    <Box>
      {mode === 'list' ? (
        <Box>
          {users.map((user, i) => (
            <UserCard
              key={user.id}
              user={user}
              mode="list"
              onClick={() => onUserClick(user.id)}
              index={i}
            />
          ))}
        </Box>
      ) : (
        <Grid container spacing={2}>
          {users.map((user, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={user.id}>
              <UserCard
                user={user}
                mode="grid"
                onClick={() => onUserClick(user.id)}
                index={i}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}
