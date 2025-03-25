import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedLayoutComponent } from './fixed-layout.component';

describe('FixedLayoutComponent', () => {
  let component: FixedLayoutComponent;
  let fixture: ComponentFixture<FixedLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixedLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixedLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
