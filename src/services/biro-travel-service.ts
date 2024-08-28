import { type BiroTravelRequest, type BiroTravelResponse } from '@/types/biro-travel'
import { setupEndpoint } from '@/utils/stringFormatter'

import api from './api'

export const getTravelsService = async (param: BiroTravelRequest): Promise<BiroTravelResponse> =>
  await api.get('/travels', {
    params: {
      ...param,
    },
  })

export const getTravelDetail = async (id: string) => await api.get(`/travels/${id}`)

export const getDetailData = async (link: string) =>
  await api.get(setupEndpoint(link), {
    responseType: 'blob',
  })
