import {
  type AirportMutateRequest,
  type AirportMutateResponse,
  type AirportRequest,
  type AirportResponse,
} from '@/types/airports'
import type { BaseResponse } from '@/types/common'

import api from './api'

// Airports
export const getAirportsService = async (param: AirportRequest): Promise<AirportResponse> =>
  await api.get('/airports', {
    params: {
      ...param,
    },
  })

export const addAirportsService = async (body: AirportMutateRequest): Promise<AirportMutateResponse> =>
  await api.post('/airport', body)

export const editAirportsService = async (id: string, body: AirportMutateRequest): Promise<AirportMutateResponse> =>
  await api.put(`/airport/${id}`, body)

export const deleteAirportsService = async (id: string): Promise<BaseResponse> => await api.delete(`/airport/${id}`)
