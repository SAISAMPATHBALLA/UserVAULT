export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}
export interface data{
  id: string
  name: string
  email: string
  created_at: string

}
export interface AuthResponse {
  success: boolean
  message: string
  data?: data
}