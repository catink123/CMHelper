import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasteryCardComponent } from './mastery-card.component';

describe('MasteryCardComponent', () => {
  let component: MasteryCardComponent;
  let fixture: ComponentFixture<MasteryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasteryCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasteryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
