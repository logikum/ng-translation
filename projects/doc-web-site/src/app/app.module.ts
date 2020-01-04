import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { AppComponent } from './app.component';
import { AppService } from './services/app.service';

const routes: Routes = [
  { path: '', redirectTo: 'v2.0', pathMatch: 'full' },
  { path: 'v2.0', loadChildren: () => import('../v2-0/v2-0.module').then(m => m.V20Module) },
  { path: 'v1.0', loadChildren: () => import('../v1-0/v1-0.module').then(m => m.V10Module) },
  { path: '**', redirectTo: '' }
];

@NgModule( {
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot( routes ),
    SharedModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    AppService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
