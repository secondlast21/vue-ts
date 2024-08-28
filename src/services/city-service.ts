import type { CityMutateRequest, CityMutateResponse, CityRequest, CityResponse } from '@/types/city'
import type { BaseResponse } from '@/types/common'

import api from './api'

// Cities
export const getCitiesService = async (param?: CityRequest): Promise<CityResponse> =>
  await api.get('/cities', {
    params: {
      ...param,
    },
  })

export const addCitiesService = async (body: CityMutateRequest): Promise<CityMutateResponse> =>
  await api.post('/city', body)

export const editCitiesService = async (id: string, body: CityMutateRequest): Promise<CityMutateResponse> =>
  await api.put(`/city/${id}`, body)

export const deleteCitiesService = async (id: string): Promise<BaseResponse> => await api.delete(`/city/${id}`)
