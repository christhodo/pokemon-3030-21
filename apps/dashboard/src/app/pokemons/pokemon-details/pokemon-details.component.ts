import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Pokemon } from '@pokemon-angular/api-interfaces';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'pokemon-angular-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent {
  currentPokemon: Pokemon;
  originalTitle: string;

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();
  @Input() set pokemon(value) {
    if (value) this.originalTitle = value.name;
    this.currentPokemon = { ...value };
  }

  @Input() form: FormGroup;

  save(formDirective: FormGroupDirective) {
    this.saved.emit(formDirective.value);
    formDirective.resetForm();
  }

  cancel() {
    this.cancelled.emit();
  }
}
