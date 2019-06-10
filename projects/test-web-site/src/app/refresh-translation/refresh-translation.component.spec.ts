import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshTranslationComponent } from './refresh-translation.component';

describe('RefreshTranslationComponent', () => {
  let component: RefreshTranslationComponent;
  let fixture: ComponentFixture<RefreshTranslationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefreshTranslationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreshTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
