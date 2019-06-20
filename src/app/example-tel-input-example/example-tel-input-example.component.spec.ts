import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleTelInputExampleComponent } from './example-tel-input-example.component';

describe('ExampleTelInputExampleComponent', () => {
  let component: ExampleTelInputExampleComponent;
  let fixture: ComponentFixture<ExampleTelInputExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleTelInputExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleTelInputExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
