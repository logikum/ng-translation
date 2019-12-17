import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import {
  MatToolbarModule, MatCardModule, MatButtonModule, MatExpansionModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { UsageComponent } from './usage/usage.component';
import { SelectionListComponent } from './selection-list/selection-list.component';
import { TextListComponent } from './text-list/text-list.component';
import { ApiComponent } from './api/api.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'configuration', component: ConfigurationComponent },
  { path: 'usage', component: UsageComponent },
  { path: 'selection-list', component: SelectionListComponent },
  { path: 'text-list', component: TextListComponent },
  { path: 'api', component: ApiComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ConfigurationComponent,
    UsageComponent,
    SelectionListComponent,
    TextListComponent,
    ApiComponent
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
