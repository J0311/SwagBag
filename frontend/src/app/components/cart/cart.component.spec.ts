import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import {Product} from "../../models/product";


describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call RemoveFromCart and return cart products quantity', () => {
   let Product=
    {
      id: 1,
      name: 'hat',
      quantity: 10,
      price: 1,
      description: 'green hat',
      image: 'hat pic',
    }


    component.removeFromCart(Product,3)
    expect(component.removeFromCart).toEqual(1);
  });

});
