import { ModuleWithProviders, NgModule } from '@angular/core';
import { PokemonEnvironment } from './pokemon.model';
import { POKEMON_ENVIRONMENT } from './pokemon.token';

@NgModule({})
export class EnvironmentModule {
  static withEnvironment(
    environment: PokemonEnvironment
  ): ModuleWithProviders<EnvironmentModule> {
    return {
      ngModule: EnvironmentModule,
      providers: [
        {
          provide: POKEMON_ENVIRONMENT,
          useValue: environment,
        },
      ],
    };
  }
}
