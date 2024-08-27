import { type BaseResponse } from './common'

export interface getAllPokemonTypes {
  limit: number
  offset: number
}

export interface Result {
  name: string
  url: string
}

export type PokemonListResponse = BaseResponse<Result[]>
