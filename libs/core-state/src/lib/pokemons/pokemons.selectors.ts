import { createFeatureSelector, createSelector } from '@ngrx/store';
import { emptyPokemon } from '@pokemon-angular/api-interfaces';
import {
  POKEMONS_FEATURE_KEY,
  PokemonsState,
  pokemonsAdapter,
} from './pokemons.reducer';

// Lookup the 'Pokemons' feature state managed by NgRx
export const getPokemonsState = createFeatureSelector<PokemonsState>(
  POKEMONS_FEATURE_KEY
);

const { selectAll, selectEntities } = pokemonsAdapter.getSelectors();

export const getPokemonsLoaded = createSelector(
  getPokemonsState,
  (state: PokemonsState) => state.loaded
);

export const getPokemonsError = createSelector(
  getPokemonsState,
  (state: PokemonsState) => state.error
);

export const getAllPokemons = createSelector(
  getPokemonsState,
  (state: PokemonsState) => selectAll(state)
);

export const getPokemonsEntities = createSelector(
  getPokemonsState,
  (state: PokemonsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getPokemonsState,
  (state: PokemonsState) => state.selectedId
);

export const getSelectedPokemon = createSelector(
  getPokemonsEntities,
  getSelectedId,
  (entities, selectedPokemonId) =>
    (selectedPokemonId && entities[selectedPokemonId]) || emptyPokemon
);
