import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  daily = { buy: 3, pay: 2 };
  selected = [ 'Jackie Chan', 20 ];
  lasts = 4;

  constructor() { }

  ngOnInit() { }
}
