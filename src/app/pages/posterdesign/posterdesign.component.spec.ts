import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosterdesignComponent } from './posterdesign.component';

describe('PosterdesignComponent', () => {
  let component: PosterdesignComponent;
  let fixture: ComponentFixture<PosterdesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosterdesignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosterdesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
