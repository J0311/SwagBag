import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductService } from '../../services/product.service';

import { ProductDetailsComponent } from './product-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

// Our mocked product service
let MockProductService = {
    getSingleProduct: (id: number) => {
        return of({
            description: "A nice pair of headphones",
            id: 1,
            image: "https://i.insider.com/54eb437f6bb3f7697f85da71?width=1000&format=jpeg&auto=webp",
            name: "Headphones",
            price: 20,
            quantity: 10
        });
    },
    getCart: () => {
        return of({
            // Intentionally left blank
        });
    }
  }

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailsComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [
        {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                paramMap: { get: (key: string) => { return 1; } },
              },
            },
          },
          {
            provide: ProductService, useValue: MockProductService
          },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component holds the correct product id', () => {
    expect(component.productId).toEqual(1);
  });

  it('component contains correct productInfo name', () => {
    expect(component.productInfo.name).toEqual("Headphones");
  });

  it('html correctly rendered product information', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.details h5')?.textContent).toContain('Headphones');
    expect(compiled.querySelector('.details p')?.textContent).toContain('A nice pair of headphones');
  });
});
