import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgTranslationComponent } from './ng-translation.component';

describe('NgTranslationComponent', () => {
  let component: NgTranslationComponent;
  let fixture: ComponentFixture<NgTranslationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgTranslationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
