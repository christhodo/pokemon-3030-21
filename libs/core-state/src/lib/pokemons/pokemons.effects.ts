import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { Pokemon } from '@pokemon-angular/api-interfaces';
import { PokemonsService } from '@pokemon-angular/core-data';
import * as PokemonsActions from './pokemons.actions';
import { map, tap } from 'rxjs/operators';
import { Observable, pipe, UnaryFunction } from 'rxjs';

const streamLogger = (): UnaryFunction<Observable<any>, Observable<any>> =>
  pipe(
    tap(
      (res) => console.log(`Next: `, res),
      (err) => console.log(`Err: `, err),
      () => console.log('completed')
    )
  );

@Injectable()
export class PokemonsEffects {
  loadPokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonsActions.loadPokemon),
      fetch({
        run: (action) =>
          this.pokemonsService
            .getOne(action.pokemonId)
            .pipe(
              map((pokemon: Pokemon) =>
                PokemonsActions.loadPokemonSuccess({ pokemon })
              )
            ),
        onError: (action, error) =>
          PokemonsActions.loadPokemonFailed({ error }),
      })
    )
  );
  loadPokemons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonsActions.loadPokemons),
      fetch({
        run: () =>
          this.pokemonsService
            .getAll()
            .pipe(
              map((pokemons: Pokemon[]) =>
                PokemonsActions.loadPokemonsSuccess({ pokemons })
              )
            ),
        onError: (action, error) =>
          PokemonsActions.loadPokemonsFailed({ error }),
      })
    )
  );

  constructor(
    private actions$: Actions,
    private pokemonsService: PokemonsService
  ) {}
}
