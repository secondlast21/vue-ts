import api from '@/services/api'
import { type getAllPokemonTypes, type PokemonListResponse } from '@/types/pokemon-list'

export const getPokemon = async (param: getAllPokemonTypes): Promise<PokemonListResponse> =>
  await api.get('/pokemon', {
    params: {
      ...param,
    },
  })
