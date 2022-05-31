import { ActionReducerMap } from '@ngrx/store';
import * as fromPokemon from './pokemons/pokemons.reducer';

export interface AppState {
  [fromPokemon.POKEMONS_FEATURE_KEY]: fromPokemon.PokemonsState;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromPokemon.POKEMONS_FEATURE_KEY]: fromPokemon.pokemonsReducer,
};
