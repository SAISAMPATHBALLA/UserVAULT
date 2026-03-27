import UserCard from './UserCard'
import type { UserGridProps } from '../../types/props'
import { GridSkeleton } from '../ui/modalComponents'
import { Box, Grid, Alert } from '@mui/material'

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
