import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreDataModule } from '@pokemon-angular/core-data';
import { CoreStateModule } from '@pokemon-angular/core-state';
import { EnvironmentModule } from '@pokemon-angular/environment';
import { MaterialModule } from '@pokemon-angular/material';
import { UiLoginModule } from '@pokemon-angular/ui-login';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PokemonDetailsComponent } from './pokemons/pokemon-details/pokemon-details.component';
import { PokemonsListComponent } from './pokemons/pokemons-list/pokemons-list.component';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { RoutingModule } from './routing.module';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PokemonsComponent,
    PokemonsListComponent,
    PokemonDetailsComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreDataModule,
    CoreStateModule,
    MaterialModule,
    UiLoginModule,
    EnvironmentModule.withEnvironment(environment),
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
