import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Container, Typography } from '@mui/material'
import {
  useGetUsersQuery,
  useSearchUsersQuery,
  useUsersByHairColorQuery,
} from '../../apis/getUserDetails'
import { useDebounce } from '../../hooks/useDebounce'
import AppNav from '../../components/ui/AppNav'
import SearchBar from '../../components/home/SearchBar'
import UserGrid from '../../components/home/UserGrid'
import PaginationBar from '../../components/home/PaginationBar'
import HairColorFilter from '../../components/home/HairColorFilter'
import UserModal from '../../components/common/UserModal'
import { USER_FETCH_LIMIT_IN_SINGLE_CALL } from '../../constants/authConstants'

const LIMIT = USER_FETCH_LIMIT_IN_SINGLE_CALL

export default function HomePage() {
  const navigate = useNavigate()
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid')
  const [rawSearch, setRawSearch] = useState('')
  const [skip, setSkip] = useState(0)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [hairColorFilter, setHairColorFilter] = useState<string | null>(null)

  const debouncedSearch = useDebounce(rawSearch, 400)
  const isSearching = debouncedSearch.trim().length > 0
  const isFilteringByHair = hairColorFilter !== null && !isSearching

  // Reset pagination when debounced search changes
  useEffect(() => { setSkip(0) }, [debouncedSearch])

  function handleHairColorChange(color: string | null) {
    setHairColorFilter(color)
    setSkip(0)
  }

  const paginatedResult = useGetUsersQuery(
    { limit: LIMIT, skip },
    { skip: isSearching || isFilteringByHair }
  )

  const searchResult = useSearchUsersQuery(debouncedSearch, {
    skip: !isSearching,
  })

  const hairFilterResult = useUsersByHairColorQuery(hairColorFilter ?? '', {
    skip: !isFilteringByHair,
  })

  const { data, isFetching, isError } =
    isSearching ? searchResult : isFilteringByHair ? hairFilterResult : paginatedResult

  const users = data?.users ?? []
  const total = data?.total ?? 0

  const storedUser = localStorage.getItem('user')
  const userName: string = storedUser ? (JSON.parse(storedUser)?.name ?? '') : ''

  function handleLogout() {
    localStorage.removeItem('user')
    navigate('/login')
  }

  // Subtitle text
  const subtitle = isSearching
    ? `Showing results for "${debouncedSearch}"`
    : isFilteringByHair
    ? `${total} user${total !== 1 ? 's' : ''} with ${hairColorFilter} hair`
    : total > 0
    ? `${total} users across the organization`
    : ''

  return (
    <Box sx={{
      margin: 0,
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #5d2424 0%, #010000 60%, #303031 100%)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <AppNav
        currentPage="home"
        userName={userName}
        onLogout={handleLogout}
        layoutMode={layoutMode}
        onLayoutToggle={setLayoutMode}
      />

      <Container maxWidth="xl" sx={{ flex: 1, py: 3, px: { xs: 2, sm: 3 } }}>
        {/* Page title */}
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, letterSpacing: '-0.5px', mb: 0.5 }}>
            User Directory
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
            {subtitle}
          </Typography>
        </Box>

        <SearchBar value={rawSearch} onChange={setRawSearch} />

        <HairColorFilter
          selected={hairColorFilter}
          onChange={handleHairColorChange}
          disabled={isSearching}
        />

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
          hidden={isSearching || isFilteringByHair}
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
