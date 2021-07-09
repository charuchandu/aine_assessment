import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerloginComponent } from './seekerlogin.component';

describe('SeekerloginComponent', () => {
  let component: SeekerloginComponent;
  let fixture: ComponentFixture<SeekerloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeekerloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekerloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
