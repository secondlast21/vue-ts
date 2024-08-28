import { type BaseResponse } from './common'

export type Gallery = {
  makkah_img: string[]
  madinah_img: string[]
  other_img: string[]
}

export type Article = {
  img: string
  status: string
  no?: string
}

export type RejectingReason = {
  general_information: Account
  attachment: Account
  account: Account
}

export type Account = {
  flag: boolean
  corrections: Correction[]
}

export type Correction = {
  date: Date
  description: string
  _id: string
}

export type Bank = {
  bank_name?: string
  no_account?: string
  name_account?: string
  bank_cover_img?: string
  type: number
  status: string
  _id: string
  procuration?: string
}

export type User = {
  _id: string
  role: number
  forget_pass_token: string
  email_activation: boolean
  status: string
  email: string
  phone_number: string
  password: string
  created_at: Date
  updated_at: Date
  __v: number
}

export type BiroTravel = {
  gallery: Gallery
  identity: Article
  license: Article
  tax: Article
  legal: Article
  article: Article
  rejecting_reason: RejectingReason
  _id: string
  operator: string[]
  packages: string[]
  status: string
  biro_status: string
  last_biro_status: string
  user: User
  travel_name: string
  telephone: string
  reff_id: string
  banks: Bank[]
  created_at: Date
  updated_at: Date
  __v: number
  about_us?: string
  address?: string
  director_name?: string
  img_travel?: string
}

export type BiroData = {
  total_rows: number
  birotravels: BiroTravel[]
}

export type BiroTravelRequest = {
  offset?: number
  limit?: number
  travel_name?: string
  sort?: string
  data_status?: string
  biro_status?: string
  start_date?: string
  finish_date?: string
}

export type BiroTravelResponse = BaseResponse<BiroData>
