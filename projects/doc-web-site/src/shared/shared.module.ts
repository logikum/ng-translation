import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  MatToolbarModule, MatCardModule, MatButtonModule, MatExpansionModule
} from '@angular/material';
import { ExcerptComponent } from './excerpt/excerpt.component';
import { HighlightCodeDirective } from './excerpt/highlight-code.directive';

@NgModule( {
  imports: [
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule
  ],
  declarations: [
    ExcerptComponent,
    HighlightCodeDirective
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    ExcerptComponent
  ]
} )
export class SharedModule { }
