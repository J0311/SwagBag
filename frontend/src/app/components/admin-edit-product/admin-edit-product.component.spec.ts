import { AdminEditProductComponent } from './admin-edit-product.component';
describe('AdminEditProductComponent', () => {
  let fixture: AdminEditProductComponent;
  let productServiceMock: any = {
    getSingleProduct: jest.fn(),
    updateProduct: jest.fn(),
  };
  let s3ServiceMock: any = {
    generateUploadUrl: jest.fn(),
    uploadImage: jest.fn(),
  };
  let routerMock: any = {
    navigate: jest.fn(),
  };
  let activatedRouteMock: any = {
    params: {
      subscribe: jest.fn(),
    },
  };
  window.alert = jest.fn();

  beforeEach(() => {
    fixture = new AdminEditProductComponent(
      productServiceMock,
      s3ServiceMock,
      activatedRouteMock,
      routerMock
    );

    fixture.productId = 1;
    fixture.productInfo = {
      id: 1,
      name: 'test',
      description: 'test',
      image: 'test',
      quantity: 1,
      price: 1,
    };
  });

  describe('Setup component', () => {
    describe('editProductForm', () => {
      it('should be defined', () => {
        expect(fixture.editProductForm).toBeDefined();
      });
    });

    describe('url', () => {
      it('should be defined', () => {
        expect(fixture.url).toBeDefined();
      });
    });

    describe('file', () => {
      it('should be defined', () => {
        expect(fixture.file).toBeUndefined();
      });
    });
  });

  describe('ngOnInit', () => {
    it('should call getSingleProduct', () => {
      activatedRouteMock.params.subscribe.mockImplementationOnce(
        (fn: (arg0: { id: number }) => any) => fn({ id: 1 })
      );

      jest.spyOn(productServiceMock, 'getSingleProduct').mockReturnValue({
        subscribe: jest.fn(),
      });

      fixture.ngOnInit();
      expect(productServiceMock.getSingleProduct).toHaveBeenCalled();
    });

    it('should call getSingleProduct and set productInfo', () => {
      activatedRouteMock.params.subscribe.mockImplementationOnce(
        (fn: (arg0: { id: number }) => any) => fn({ id: 1 })
      );

      jest.spyOn(productServiceMock, 'getSingleProduct').mockReturnValue({
        subscribe: jest.fn((fn) => fn(fixture.productInfo)),
      });

      fixture.ngOnInit();
      expect(fixture.productInfo).toEqual(fixture.productInfo);
    });

    // test if the form is set correctly
    it('should call getSingleProduct and set editProductForm', () => {
      activatedRouteMock.params.subscribe.mockImplementationOnce(
        (fn: (arg0: { id: number }) => any) => fn({ id: 1 })
      );

      jest.spyOn(productServiceMock, 'getSingleProduct').mockReturnValue({
        subscribe: jest.fn((fn) => fn(fixture.productInfo)),
      });

      fixture.ngOnInit();
      expect(fixture.editProductForm.get('name')?.value).toEqual(
        fixture.productInfo.name
      );

      expect(fixture.editProductForm.get('description')?.value).toEqual(
        fixture.productInfo.description
      );

      expect(fixture.editProductForm.get('quantity')?.value).toEqual(
        fixture.productInfo.quantity
      );

      expect(fixture.editProductForm.get('image')?.value).toEqual(
        fixture.productInfo.image
      );

      expect(fixture.editProductForm.get('price')?.value).toEqual(
        fixture.productInfo.price
      );
    });
  });

  describe('onFileChange', () => {
    it('should set file', () => {
      const mockFile = new File(['test'], 'test.png', { type: 'image/png' });
      const mockEvent = {
        target: {
          files: [mockFile],
        },
      };

      jest.spyOn(s3ServiceMock, 'generateUploadUrl').mockReturnValue('test?');

      fixture.onFileChange(mockEvent);
      expect(fixture.file).toEqual(mockFile);
    });

    it('should set url', () => {
      const mockFile = new File(['test'], 'test.png', { type: 'image/png' });
      const mockEvent = {
        target: {
          files: [mockFile],
        },
      };

      const mockUrl = 'test';
      jest.spyOn(s3ServiceMock, 'generateUploadUrl').mockReturnValue(mockUrl);

      fixture.onFileChange(mockEvent);
      expect(fixture.url).toEqual(mockUrl);
    });

    it('should set image in form', () => {
      const mockFile = new File(['test'], 'test.png', { type: 'image/png' });
      const mockEvent = {
        target: {
          files: [mockFile],
        },
      };
      const mockUrl = 'test';
      jest.spyOn(s3ServiceMock, 'generateUploadUrl').mockReturnValue(mockUrl);
      fixture.onFileChange(mockEvent);
      expect(fixture.editProductForm.get('image')?.value).toEqual(mockUrl);
    });
  });

  describe('onSubmit', () => {
    describe('when form is invalid', () => {
      it('should call alert', () => {
        fixture.editProductForm.markAllAsTouched();
        fixture.onSubmit();
        expect(window.alert).toHaveBeenCalled();
      });
    });

    describe('when form is valid', () => {
      describe('when file is defined', () => {
        beforeEach(() => {
          fixture.editProductForm.markAllAsTouched();
          fixture.editProductForm.setValue({
            name: 'test',
            description: 'test',
            quantity: 1,
            image: 'test',
            price: 1,
          });
          fixture.file = new File(['test'], 'test.png', { type: 'image/png' });
        });

        it('should call uploadImage and updateProduct', () => {
          jest.spyOn(s3ServiceMock, 'uploadImage').mockReturnValue({
            subscribe: jest.fn((callback) => {
              jest.spyOn(productServiceMock, 'updateProduct').mockReturnValue({
                subscribe: jest.fn((callback) => {
                  callback();
                }),
              });
              callback();
            }),
          });

          fixture.onSubmit();
          expect(s3ServiceMock.uploadImage).toHaveBeenCalled();
          expect(productServiceMock.updateProduct).toHaveBeenCalled();
        });

        it('should call uploadImage and updateProduct and navigate to admin/', () => {
          jest.spyOn(s3ServiceMock, 'uploadImage').mockReturnValue({
            subscribe: jest.fn(),
          });

          jest.spyOn(productServiceMock, 'updateProduct').mockReturnValue({
            subscribe: jest.fn(),
          });

          fixture.onSubmit();
          expect(routerMock.navigate).toHaveBeenCalledWith(['/admin']);
        });
      });

      describe('when file is not defined', () => {
        beforeEach(() => {
          fixture.editProductForm.markAllAsTouched();
          fixture.editProductForm.setValue({
            name: 'test',
            description: 'test',
            quantity: 1,
            image: 'test',
            price: 1,
          });
        });

        it('should call updateProduct', () => {
          jest.spyOn(productServiceMock, 'updateProduct').mockReturnValue({
            subscribe: jest.fn((callback) => callback()),
          });

          fixture.onSubmit();
          expect(productServiceMock.updateProduct).toHaveBeenCalled();
        });

        it('should call updateProduct and navigate to admin/', () => {
          jest.spyOn(productServiceMock, 'updateProduct').mockReturnValue({
            subscribe: jest.fn(),
          });

          fixture.onSubmit();
          expect(routerMock.navigate).toHaveBeenCalledWith(['/admin']);
        });
      });
    });
  });
});
