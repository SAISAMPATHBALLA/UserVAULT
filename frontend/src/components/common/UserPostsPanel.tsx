import {
  Box,
  Typography,
  Divider,
  CircularProgress,
  Alert,
  IconButton,
  Chip,
} from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import CloseIcon from '@mui/icons-material/Close'
import { useGetUserPostsByIdQuery } from '../../apis/getUserDetails'
import type { UserPostsPanelProps } from '../../types/UserPosts'


export default function UserPostsPanel({ userId, enabled, onClose }: UserPostsPanelProps) {
  const { data, isLoading, isError } = useGetUserPostsByIdQuery(userId, { skip: !enabled })

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
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5, flexShrink: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ArticleIcon sx={{ color: '#a78bfa', fontSize: '1rem' }} />
          <Typography sx={{ color: '#a78bfa', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 1 }}>
            Posts
          </Typography>
          {data && (
            <Chip
              label={data.total}
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

      {/* Content */}
      <Box sx={{ overflowY: 'auto', flex: 1, px: 2, py: 1.5,
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
            Failed to load posts.
          </Alert>
        )}

        {data && data.posts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <ArticleIcon sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '2rem' }} />
            <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', mt: 1 }}>No posts found</Typography>
          </Box>
        )}

        {data && data.posts.map((post, idx) => (
          <Box key={post.id} sx={{ mb: 2 }}>
            {/* Title */}
            <Typography sx={{ color: '#e2e8f0', fontSize: '0.8rem', fontWeight: 700, lineHeight: 1.4, mb: 0.5 }}>
              {post.title}
            </Typography>

            {/* Body preview */}
            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', lineHeight: 1.5, mb: 1 }}>
              {post.body.length > 90 ? post.body.slice(0, 90) + '…' : post.body}
            </Typography>

            {/* Tags */}
            {post.tags.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                {post.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={`#${tag}`}
                    size="small"
                    sx={{ height: 16, fontSize: '0.6rem', background: 'rgba(167,139,250,0.12)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.2)' }}
                  />
                ))}
              </Box>
            )}

            {/* Reactions + views */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                <ThumbUpOutlinedIcon sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }} />
                <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.65rem' }}>{post.reactions.likes}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                <ThumbDownOutlinedIcon sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }} />
                <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.65rem' }}>{post.reactions.dislikes}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                <VisibilityOutlinedIcon sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }} />
                <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.65rem' }}>{post.views}</Typography>
              </Box>
            </Box>

            {idx < data.posts.length - 1 && (
              <Divider sx={{ mt: 1.5, borderColor: 'rgba(167,139,250,0.1)' }} />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  )
}
