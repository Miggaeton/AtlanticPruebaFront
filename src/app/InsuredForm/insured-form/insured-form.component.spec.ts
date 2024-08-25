import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuredFormComponent } from './insured-form.component';



describe('InsuredFormComponent', () => {
  let component: InsuredFormComponent;
  let fixture: ComponentFixture<InsuredFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsuredFormComponent]
    });
    fixture = TestBed.createComponent(InsuredFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
