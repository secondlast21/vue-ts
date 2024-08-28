import { type LoginRequest, type LoginResponse } from '@/types/login'

import api from './api'

export const loginService = async (body: LoginRequest): Promise<LoginResponse> => await api.post('/login', body)
