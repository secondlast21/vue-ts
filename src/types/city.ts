import { type BaseResponse } from './common'

export type CityRequest = {
  skip?: number
  limit?: number
}

export type CityMutateRequest = {
  name: string
  country: string
}

export type CityMutateData = {
  _id: string
  name: string
  created_at: Date
  updated_at: Date
  __v: number
}

export type CityInfo = {
  _id: string
  name: string
  created_at: Date
  updated_at: Date
  __v: number
}

export type CityData = {
  count: number
  data: CityInfo[]
}

export type CityResponse = BaseResponse<CityData>
export type CityMutateResponse = BaseResponse<CityMutateData>
