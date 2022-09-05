import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { Product } from "../../models/product";
import { ProductService } from "../../services/product.service";
import { DisplayProductsComponent } from "./display-products.component";

describe('DisplayProductsComponent', () => {
    let fixture: ComponentFixture<DisplayProductsComponent>;
    let comp: DisplayProductsComponent;
    let productServiceMock: Partial<ProductService>;
    let products: Product[];

    beforeEach(() => {
        products = [
            new Product(0, "Bag", 12, "", 1.99, ""),
            new Product(1, "Baseball Cap", 25, "", 12.99, ""),
            new Product(2, "Mug", 50, "", 4.95, "")
        ];
        productServiceMock = {
            getAllProducts: jest.fn().mockReturnValue(of(products)),
            getProductsByQuery: jest.fn().mockReturnValue(of(products[0], products[2]))
        };
        TestBed.configureTestingModule({
            declarations: [DisplayProductsComponent],
            providers: [ { provide: ProductService, useValue: productServiceMock }],
        });
        fixture = TestBed.createComponent(DisplayProductsComponent);
        comp = fixture.componentInstance;

        
    })
});