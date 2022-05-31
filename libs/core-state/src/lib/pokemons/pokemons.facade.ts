import { Injectable } from '@angular/core';
import { Pokemon } from '@pokemon-angular/api-interfaces';
import { select, Store, Action, ActionsSubject } from '@ngrx/store';
import { map, filter } from 'rxjs/operators';
import * as fromPokemons from './pokemons.reducer';
import * as PokemonsActions from './pokemons.actions';
import * as PokemonsSelectors from './pokemons.selectors';

@Injectable({
  providedIn: 'root',
})
export class PokemonsFacade {
  allPokemons$ = this.store.pipe(
    map((state) => PokemonsSelectors.getAllPokemons(state))
  );
  selectedPokemons$ = this.store.pipe(
    select(PokemonsSelectors.getSelectedPokemon)
  );
  loaded$ = this.store.pipe(select(PokemonsSelectors.getPokemonsLoaded));

  mutations$ = this.actions$.pipe(
    filter(
      (action: Action) =>
        action.type === PokemonsActions.createPokemon({} as any).type ||
        action.type === PokemonsActions.updatePokemon({} as any).type ||
        action.type === PokemonsActions.deletePokemon({} as any).type
    )
  );

  selectPokemon(pokemonId: string) {
    this.dispatch(PokemonsActions.selectPokemon({ pokemonId }));
  }

  loadPokemons() {
    this.dispatch(PokemonsActions.loadPokemons());
  }

  loadPokemon(pokemonId: string) {
    this.dispatch(PokemonsActions.loadPokemon({ pokemonId }));
  }

  savePokemon(pokemon: Pokemon) {
    pokemon.url ? this.updatePokemon(pokemon) : this.createPokemon(pokemon);
  }

  createPokemon(pokemon: Pokemon) {
    this.dispatch(PokemonsActions.createPokemon({ pokemon }));
  }

  updatePokemon(pokemon: Pokemon) {
    this.dispatch(PokemonsActions.updatePokemon({ pokemon }));
  }

  deletePokemon(pokemon: Pokemon) {
    this.dispatch(PokemonsActions.deletePokemon({ pokemon }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  constructor(
    private store: Store<fromPokemons.PokemonPartialState>,
    private actions$: ActionsSubject
  ) {}
}
