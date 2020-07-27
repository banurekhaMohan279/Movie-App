import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForthComingMoviesComponent } from './forth-coming-movies.component';

describe('ForthComingMoviesComponent', () => {
  let component: ForthComingMoviesComponent;
  let fixture: ComponentFixture<ForthComingMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForthComingMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForthComingMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
