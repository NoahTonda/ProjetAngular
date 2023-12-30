import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsessioncoursComponent } from './newsessioncours.component';

describe('NewsessioncoursComponent', () => {
  let component: NewsessioncoursComponent;
  let fixture: ComponentFixture<NewsessioncoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsessioncoursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsessioncoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
