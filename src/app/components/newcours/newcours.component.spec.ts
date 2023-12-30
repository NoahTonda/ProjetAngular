import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcoursComponent } from './newcours.component';

describe('NewcoursComponent', () => {
  let component: NewcoursComponent;
  let fixture: ComponentFixture<NewcoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewcoursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
