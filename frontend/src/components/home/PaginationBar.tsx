import { Box, Pagination } from '@mui/material'

interface PaginationBarProps {
  total: number
  limit: number
  skip: number
  onChange: (newSkip: number) => void
  hidden: boolean
}

export default function PaginationBar({ total, limit, skip, onChange, hidden }: PaginationBarProps) {
  if (hidden || total === 0) return null

  const currentPage = Math.floor(skip / limit) + 1
  const totalPages = Math.ceil(total / limit)

  if (totalPages <= 1) return null

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, pb: 4 }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onChange((page - 1) * limit)}
        shape="rounded"
        sx={{
          '& .MuiPaginationItem-root': {
            color: 'rgba(255,255,255,0.5)',
            borderColor: 'rgba(255,255,255,0.12)',
            '&:hover': {
              background: 'rgba(167,139,250,0.18)',
              color: '#c4b5fd',
              borderColor: 'rgba(167,139,250,0.3)',
            },
          },
          '& .MuiPaginationItem-root.Mui-selected': {
            background: 'rgba(167,139,250,0.85)',
            color: '#fff',
            fontWeight: 700,
            borderColor: 'transparent',
            '&:hover': {
              background: '#a78bfa',
            },
          },
        }}
      />
    </Box>
  )
}
