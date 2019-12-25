import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AppService } from './services/app.service';

const routes: Routes = [
  { path: '', redirectTo: 'v2.0', pathMatch: 'full' },
  { path: 'v2.0', loadChildren: '../v2-0/v2-0.module#V20Module' },
  { path: 'v1.1', loadChildren: '../v1-1/v1-1.module#V11Module' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
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
