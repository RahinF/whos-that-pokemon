import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';
import { graphql } from '@/gql/index';

const LIMIT: number = 151;
const OFFSET: number = 0;

const GET_ALL_POKEMON = graphql(`
  query GetAllPokemon($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      results {
        id
        name
        artwork
      }
    }
  }
`);

const fetchAllPokemon = async (limit: number, offset: number) =>
  await request({
    url: 'https://graphql-pokeapi.vercel.app/api/graphql',
    document: GET_ALL_POKEMON,
    variables: { limit, offset },
  });

const usePokemon = (limit: number, offset: number) => {
  return useQuery({
    queryKey: ['pokemon'],
    queryFn: () => fetchAllPokemon(limit, offset),
  });
};

export { LIMIT, OFFSET, GET_ALL_POKEMON, usePokemon, fetchAllPokemon };
