import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Pokemon, emptyPokemon } from '@pokemon-angular/api-interfaces';
import { PokemonsFacade } from '@pokemon-angular/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'pokemon-angular-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit {
  allPokemons$: Observable<Pokemon[]> = this.pokemonsFacade.allPokemons$;
  selectedPokemon$: Observable<Pokemon> = this.pokemonsFacade.selectedPokemons$;

  form: FormGroup;

  constructor(
    private pokemonsFacade: PokemonsFacade,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.pokemonsFacade.mutations$.subscribe((_) => this.resetPokemon());
  }

  ngOnInit() {
    this.initForm();
    this.pokemonsFacade.loadPokemons();
    this.resetPokemon();

    const pokemonRouteId = this.route.snapshot.params['id'];

    if (pokemonRouteId) {
      this.loadPokemon(pokemonRouteId);
    }
  }

  viewPokemon(pokemonId: string) {
    this.router.navigate(['pokemons', pokemonId]);
  }

  loadPokemon(pokemonId: string) {
    this.pokemonsFacade.selectPokemon(pokemonId);
    this.pokemonsFacade.loadPokemon(pokemonId);
  }

  selectPokemon(pokemon: Pokemon) {
    this.pokemonsFacade.selectPokemon(pokemon.id);
    this.form.patchValue(pokemon);
  }

  savePokemon(pokemon: Pokemon) {
    this.pokemonsFacade.savePokemon(pokemon);
  }

  deletePokemon(pokemon: Pokemon) {
    this.pokemonsFacade.deletePokemon(pokemon);
  }

  resetPokemon() {
    this.form.reset();
    this.selectPokemon(emptyPokemon);
  }

  private initForm() {
    this.form = this.formBuilder.group({
      id: [''],
      name: [''],
      url: [''],
    });
  }
}
