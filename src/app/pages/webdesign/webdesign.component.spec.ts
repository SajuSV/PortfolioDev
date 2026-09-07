import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebdesignComponent } from './webdesign.component';

describe('WebdesignComponent', () => {
  let component: WebdesignComponent;
  let fixture: ComponentFixture<WebdesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebdesignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebdesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
