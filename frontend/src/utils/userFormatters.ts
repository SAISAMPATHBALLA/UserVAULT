import { format, parseISO } from 'date-fns'
import type { User, address } from '../types/Users'

export function formatFullName(user: User): string {
  return `${user.firstName} ${user.lastName}`
}

export function formatAddress(addr: address): string {
  return `${addr.address}, ${addr.city}, ${addr.state} ${addr.postalCode}, ${addr.country}`
}

export function formatBirthDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), 'MMM d, yyyy')
  } catch {
    return dateStr
  }
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}
