import type { RegisterPayload, AuthResponse } from "../types/AuthService"
import { API_BASE_URL } from "../constants/authConstants"


export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data: AuthResponse = await response.json()

  if (!response.ok) {
    throw new Error(data.message ?? 'Registration failed')
  }

  return data
}
