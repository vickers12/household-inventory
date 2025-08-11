import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInventory } from './create-inventory';

describe('CreateInventory', () => {
  let component: CreateInventory;
  let fixture: ComponentFixture<CreateInventory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInventory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateInventory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
