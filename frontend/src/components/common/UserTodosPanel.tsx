import {
  Box,
  Typography,
  Divider,
  CircularProgress,
  Alert,
  IconButton,
  Chip,
  Checkbox,
} from '@mui/material'
import ChecklistIcon from '@mui/icons-material/Checklist'
import CloseIcon from '@mui/icons-material/Close'
import { useGetUserTodosByIdQuery } from '../../apis/getUserDetails'
import type { UserTodosPanelProps } from '../../types/UserTodos'

export default function UserTodosPanel({ userId, enabled, onClose }: UserTodosPanelProps) {
  const { data, isLoading, isError } = useGetUserTodosByIdQuery(userId, { skip: !enabled })

  const pending = data?.todos.filter((t) => !t.completed) ?? []
  const completed = data?.todos.filter((t) => t.completed) ?? []

  return (
    <Box
      sx={{
        width: 340,
        background: 'rgba(10,5,25,0.92)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(167,139,250,0.2)',
        borderRadius: '16px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.6)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 'calc(90vh / 2.5)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5, flexShrink: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ChecklistIcon sx={{ color: '#a78bfa', fontSize: '1rem' }} />
          <Typography sx={{ color: '#a78bfa', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 1 }}>
            Todos
          </Typography>
          {data && (
            <Chip
              label={`${completed.length}/${data.todos.length}`}
              size="small"
              sx={{ height: 18, fontSize: '0.65rem', background: 'rgba(167,139,250,0.2)', color: '#a78bfa' }}
            />
          )}
        </Box>
        <IconButton size="small" onClick={onClose}
          sx={{ color: 'rgba(255,255,255,0.5)', p: 0.5, '&:hover': { color: '#fff', background: 'rgba(255,255,255,0.1)' } }}>
          <CloseIcon sx={{ fontSize: '1rem' }} />
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: 'rgba(167,139,250,0.15)', flexShrink: 0 }} />

      <Box sx={{ overflowY: 'auto', flex: 1, px: 1.5, py: 1,
        '&::-webkit-scrollbar': { width: 4 },
        '&::-webkit-scrollbar-thumb': { background: 'rgba(167,139,250,0.3)', borderRadius: 2 },
      }}>
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress size={24} sx={{ color: '#a78bfa' }} />
          </Box>
        )}

        {isError && (
          <Alert severity="error" sx={{ borderRadius: 2, fontSize: '0.75rem' }}>
            Failed to load todos.
          </Alert>
        )}

        {data && data.todos.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <ChecklistIcon sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '2rem' }} />
            <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', mt: 1 }}>No todos found</Typography>
          </Box>
        )}

        {pending.length > 0 && (
          <>
            <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, px: 0.5, mb: 0.5 }}>
              Pending
            </Typography>
            {pending.map((todo) => (
              <Box key={todo.id} sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5, mb: 0.25 }}>
                <Checkbox
                  disabled
                  checked={false}
                  size="small"
                  sx={{ p: 0.5, color: 'rgba(167,139,250,0.4)', '&.Mui-disabled': { color: 'rgba(167,139,250,0.3)' } }}
                />
                <Typography sx={{ color: '#e2e8f0', fontSize: '0.75rem', lineHeight: 1.5, pt: 0.6 }}>
                  {todo.todo}
                </Typography>
              </Box>
            ))}
          </>
        )}

        {completed.length > 0 && (
          <>
            {pending.length > 0 && <Divider sx={{ my: 1, borderColor: 'rgba(167,139,250,0.1)' }} />}
            <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, px: 0.5, mb: 0.5 }}>
              Completed
            </Typography>
            {completed.map((todo) => (
              <Box key={todo.id} sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5, mb: 0.25 }}>
                <Checkbox
                  disabled
                  checked
                  size="small"
                  sx={{ p: 0.5, '&.Mui-disabled': { color: 'rgba(167,139,250,0.5)' } }}
                />
                <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', lineHeight: 1.5, pt: 0.6, textDecoration: 'line-through' }}>
                  {todo.todo}
                </Typography>
              </Box>
            ))}
          </>
        )}
      </Box>
    </Box>
  )
}
