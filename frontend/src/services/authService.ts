import type { RegisterPayload, LoginPayload, AuthResponse } from "../types/AuthService"
import { API_BACKEND_URL } from "../constants/authConstants"

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const response = await fetch(`${API_BACKEND_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })
  const data: AuthResponse = await response.json()
  console.log(data)
  if (!response.ok) throw new Error(data.message ?? 'Registration failed')
  return data
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const response = await fetch(`${API_BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })
  const data: AuthResponse = await response.json()
  console.log(data)
  if (!response.ok) throw new Error(data.message ?? 'Login failed')
  return data
}
