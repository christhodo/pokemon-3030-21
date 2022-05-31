import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Pokemon } from '@pokemon-angular/api-interfaces';

@Component({
  selector: 'pokemon-angular-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss'],
})
export class PokemonsListComponent {
  @Input() pokemons: Pokemon[] | null;
  @Input() readonly = false;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
  @Output() pokemonViewed = new EventEmitter();
}
