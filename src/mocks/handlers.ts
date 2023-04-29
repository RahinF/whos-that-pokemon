import { graphql } from 'msw';
import { GetAllPokemonQuery } from '../gql/graphql';

const pokemons = [...Array(4)].map((_, index)=> ({
  // __typename: 'PokemonItem',
  id: index + 1,
  name: `pokemon ${index +1}`,
  artwork:
    'https://raw.githubusercontent.com/PokeAPI/sprites/…ster/sprites/pokemon/other/official-artwork/1.png',
}))

const pokemonData: GetAllPokemonQuery | undefined = {
  __typename: 'Query',
  pokemons: {
    __typename: 'PokemonList',
    results: [...pokemons],
  },
};

export const handlers = [
  graphql.query('GetAllPokemon', (request, response, context) => {
    return response(context.data(pokemonData));
  }),
];
