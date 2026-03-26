export type hair = {
    color: string
    type: string
  }

export type address = {
    address: string
    city: string
    state: string
    stateCode: string
    postalCode: string
    coordinates: {
      lat: number
      lng: number
    }
    country: string
  }

export type bank =  {
    cardExpire: string
    cardNumber: string
    cardType: string
    currency: string
    iban: string
  }

export type company = {
    department: string
    name: string
    title: string
    address: address
  }

export interface User {
  id: number
  firstName: string
  lastName: string
  maidenName: string
  age: number
  gender: string
  email: string
  phone: string
  username: string
  password: string
  birthDate: string
  image: string
  bloodGroup: string
  height: number
  weight: number
  eyeColor: string
  hair: hair
  ip: string
  address: address
  macAddress: string
  university: string
  bank:bank
  company: company
  ein: string
  ssn: string
  userAgent: string
  crypto: {
    coin: string
    wallet: string
    network: string
  }

  role: string
}

export interface Users {
      users : User[]
}

export interface UsersResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}