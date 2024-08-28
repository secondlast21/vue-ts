export type BaseResponse<D = undefined> = {
  status: number
  iserror: boolean
  message: string
  data?: D
}

export type BaseErrorResponse = {
  err_code: string
  err_message: string
  err_message_en: string
}

export interface CustomError extends Error {
  status?: number
}
