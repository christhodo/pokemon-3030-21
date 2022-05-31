import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Pokemon } from '@pokemon-angular/api-interfaces';
import * as PokemonsActions from './pokemons.actions';

export const POKEMONS_FEATURE_KEY = 'pokemons';

export interface PokemonsState extends EntityState<Pokemon> {
  selectedId?: string | number;
  loaded: boolean;
  error?: string | null;
}

export interface PokemonPartialState {
  readonly [POKEMONS_FEATURE_KEY]: PokemonsState;
}

export const pokemonsAdapter: EntityAdapter<Pokemon> = createEntityAdapter<
  Pokemon
>({ selectId: (poke) => poke.url });

export const initialPokemonsState: PokemonsState = pokemonsAdapter.getInitialState(
  {
    loaded: false,
  }
);

const onFailed = (state, { error }): PokemonsState => ({ ...state, error });

const onDispatch = (state, action): PokemonsState => ({
  ...state,
  loaded: false,
  error: null,
});

const _pokemonsReducer = createReducer(
  initialPokemonsState,
  on(
    PokemonsActions.loadPokemonFailed,
    PokemonsActions.loadPokemonsFailed,
    PokemonsActions.createPokemonFailed,
    PokemonsActions.updatePokemonFailed,
    PokemonsActions.deletePokemonFailed,
    onFailed
  ),
  on(
    PokemonsActions.loadPokemon,
    PokemonsActions.loadPokemons,
    PokemonsActions.createPokemon,
    PokemonsActions.updatePokemon,
    PokemonsActions.deletePokemon,
    onDispatch
  ),
  on(PokemonsActions.loadPokemonSuccess, (state, { pokemon }) =>
    pokemonsAdapter.upsertOne(pokemon, { ...state, loaded: true })
  ),
  on(PokemonsActions.selectPokemon, (state, { pokemonId }) => ({
    ...state,
    selectedId: pokemonId,
  })),
  on(PokemonsActions.loadPokemonsSuccess, (state, { pokemons }) =>
    pokemonsAdapter.setAll(pokemons, { ...state, loaded: true })
  ),
  on(PokemonsActions.deletePokemonSuccess, (state, { pokemon }) =>
    pokemonsAdapter.removeOne(pokemon.id, { ...state, loaded: true })
  ),
  on(PokemonsActions.updatePokemonSuccess, (state, { pokemon }) =>
    pokemonsAdapter.updateOne(
      { id: pokemon.id, changes: pokemon },
      { ...state, loaded: true }
    )
  ),
  on(PokemonsActions.createPokemonSuccess, (state, { pokemon }) =>
    pokemonsAdapter.addOne(pokemon, { ...state, loaded: true })
  )
);

export function pokemonsReducer(
  state: PokemonsState | undefined,
  action: Action
) {
  return _pokemonsReducer(state, action);
}
