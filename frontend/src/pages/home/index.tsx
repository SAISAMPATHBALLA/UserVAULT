import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Container, Typography } from '@mui/material'
import { useGetUsersQuery, useSearchUsersQuery } from '../../apis/getUserDetails'
import { useDebounce } from '../../hooks/useDebounce'
import HomeHeader from '../../components/home/HomeHeader'
import SearchBar from '../../components/home/SearchBar'
import UserGrid from '../../components/home/UserGrid'
import PaginationBar from '../../components/home/PaginationBar'
import UserModal from '../../components/common/UserModal'

const LIMIT = 12

export default function HomePage() {
  const navigate = useNavigate()
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid')
  const [rawSearch, setRawSearch] = useState('')
  const [skip, setSkip] = useState(0)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  const debouncedSearch = useDebounce(rawSearch, 400)
  const isSearching = debouncedSearch.trim().length > 0

  // Reset pagination when search changes
  useEffect(() => {
    setSkip(0)
  }, [debouncedSearch])

  const paginatedResult = useGetUsersQuery(
    { limit: LIMIT, skip },
    { skip: isSearching }
  )

  const searchResult = useSearchUsersQuery(debouncedSearch, {
    skip: !isSearching,
  })

  const { data, isFetching, isError } = isSearching ? searchResult : paginatedResult

  const users = data?.users ?? []
  const total = data?.total ?? 0

  const storedUser = localStorage.getItem('user')
  const userName: string = storedUser ? (JSON.parse(storedUser)?.name ?? '') : ''

  function handleLogout() {
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 60%, #24243e 100%)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <HomeHeader
        layoutMode={layoutMode}
        onLayoutToggle={setLayoutMode}
        onLogout={handleLogout}
        userName={userName}
      />

      <Container maxWidth="xl" sx={{ flex: 1, py: 3, px: { xs: 2, sm: 3 } }}>
        {/* Page title */}
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography
            variant="h4"
            sx={{
              color: '#fff',
              fontWeight: 800,
              letterSpacing: '-0.5px',
              mb: 0.5,
            }}
          >
            User Directory
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem' }}>
            {isSearching
              ? `Showing results for "${debouncedSearch}"`
              : total > 0
              ? `${total} users across the organization`
              : ''}
          </Typography>
        </Box>

        <SearchBar value={rawSearch} onChange={setRawSearch} />

        <UserGrid
          users={users}
          mode={layoutMode}
          onUserClick={setSelectedUserId}
          isFetching={isFetching}
          isError={isError}
        />

        <PaginationBar
          total={total}
          limit={LIMIT}
          skip={skip}
          onChange={setSkip}
          hidden={isSearching}
        />
      </Container>

      <UserModal
        userId={selectedUserId}
        open={selectedUserId !== null}
        onClose={() => setSelectedUserId(null)}
      />
    </Box>
  )
}
