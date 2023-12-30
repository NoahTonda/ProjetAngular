import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcoursComponent } from './editcours.component';

describe('EditcoursComponent', () => {
  let component: EditcoursComponent;
  let fixture: ComponentFixture<EditcoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditcoursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
