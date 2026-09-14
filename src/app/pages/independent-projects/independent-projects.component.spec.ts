import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndependentProjectsComponent } from './independent-projects.component';

describe('IndependentProjectsComponent', () => {
  let component: IndependentProjectsComponent;
  let fixture: ComponentFixture<IndependentProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndependentProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndependentProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
