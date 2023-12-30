import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsessioncoursComponent } from './editsessioncours.component';

describe('EditsessioncoursComponent', () => {
  let component: EditsessioncoursComponent;
  let fixture: ComponentFixture<EditsessioncoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditsessioncoursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditsessioncoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
