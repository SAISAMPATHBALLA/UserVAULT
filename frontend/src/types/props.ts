import type { bank, User } from "./Users"
export interface BankCardProps {
  bank: bank
  userName: string
  onClose: () => void
}
export interface UserModalProps {
  userId: number | null
  open: boolean
  onClose: () => void
}
export interface PaginationBarProps {
  total: number
  limit: number
  skip: number
  onChange: (newSkip: number) => void
  hidden: boolean
}
export interface HomeHeaderProps {
  layoutMode: 'grid' | 'list'
  onLayoutToggle: (mode: 'grid' | 'list') => void
  onLogout: () => void
  userName: string
}
export interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}
export interface UserCardProps {
  user: User
  mode: 'grid' | 'list'
  onClick: () => void
  index: number
}

export interface UserGridProps {
  users: User[]
  mode: 'grid' | 'list'
  onUserClick: (id: number) => void
  isFetching: boolean
  isError: boolean
}
