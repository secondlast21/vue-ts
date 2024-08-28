import { type BaseResponse } from './common'

export type AirportRequest = {
  skip?: number
  limit?: number
}

export type AirportMutateRequest = {
  name: string
  city: string
  iata_code: string
}

export type AirportMutateData = {
  _id: string
  name: string
  city: string
  iata_code: string
  created_at: Date
  updated_at: Date
  __v: number
}

export type AirportCity = {
  _id: string
  name: string
}

export type AirportInfo = {
  _id: string
  name: string
  city: AirportCity
  iata_code: string
  created_at: Date
  updated_at: Date
  __v: number
}

export type AirportData = {
  count: number
  data: AirportInfo[]
}

export type AirportResponse = BaseResponse<AirportData>
export type AirportMutateResponse = BaseResponse<AirportMutateData>
