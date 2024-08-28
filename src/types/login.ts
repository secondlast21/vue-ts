import { type BaseResponse } from './common'

export type UserData = {
  id: string
  email: string
  email_activation: boolean
}

export type LoginData = {
  token: string
  user: UserData
}

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = BaseResponse<LoginData>
