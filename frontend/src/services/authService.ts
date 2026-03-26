const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  message: string
  data?: {
    token: string
    user: {
      id: string
      name: string
      email: string
    }
  }
}

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
