import { AdminNewProductComponent } from './admin-new-product.component';

describe('AdminNewProductComponent', () => {
  let fixture: AdminNewProductComponent;
  let productServiceMock: any = {
    addNewProduct: jest.fn(),
  };
  let s3ServiceMock: any = {
    generateUploadUrl: jest.fn(),
    uploadImage: jest.fn(),
  };
  let routerMock: any = {
    navigate: jest.fn(),
  };

  window.alert = jest.fn();

  beforeEach(() => {
    fixture = new AdminNewProductComponent(
      productServiceMock,
      s3ServiceMock,
      routerMock
    );
  });

  describe('Setup component', () => {
    describe('addProductForm', () => {
      it('should be defined', () => {
        expect(fixture.addProductForm).toBeDefined();
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
    it('should call ngOnInit', () => {
      fixture.ngOnInit();
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
      expect(fixture.addProductForm.get('image')?.value).toEqual(mockUrl);
    });
  });

  describe('onSubmit', () => {
    describe('when form is not valid', () => {
      it('should call alert if form is invalid', () => {
        fixture.onSubmit();
        expect(window.alert).toHaveBeenCalledWith('Please fill out all fields');
      });
    });

    describe('when form is valid', () => {
      beforeEach(() => {
        fixture.addProductForm.setValue({
          name: 'test',
          quantity: 1,
          price: '1.99',
          description: 'test',
          image: 'test',
        });
      });

      it('should call uploadImage', () => {
        jest.spyOn(s3ServiceMock, 'uploadImage').mockReturnValue({
          subscribe: jest.fn(),
        });

        fixture.onSubmit();
        expect(s3ServiceMock.uploadImage).toHaveBeenCalled();
      });

      it('should parse (string) price to float', () => {
        jest.spyOn(s3ServiceMock, 'uploadImage').mockReturnValue({
          subscribe: jest.fn((callback) => {
            jest.spyOn(productServiceMock, 'addNewProduct').mockReturnValue({
              subscribe: jest.fn(),
            });
            callback();
          }),
        });

        fixture.onSubmit();
        expect(fixture.addProductForm.get('price')?.value).toEqual(1.99);
      });

      it('should call addNewProduct and test logic after successful return', () => {
        jest.spyOn(s3ServiceMock, 'uploadImage').mockReturnValue({
          subscribe: jest.fn((callback) => {
            jest.spyOn(productServiceMock, 'addNewProduct').mockReturnValue({
              subscribe: jest.fn((callback) => {
                callback();
              }),
            });
            callback();
          }),
        });

        fixture.onSubmit();
        expect(fixture.addProductForm.value).toEqual({
          name: null,
          quantity: null,
          price: null,
          description: null,
          image: null,
        });
        expect(routerMock.navigate).toHaveBeenCalledWith(['/admin']);
      });

      it('should call addNewProduct and test logic after failed return', () => {
        jest.spyOn(s3ServiceMock, 'uploadImage').mockReturnValue({
          subscribe: jest.fn((callback) => {
            jest.spyOn(productServiceMock, 'addNewProduct').mockReturnValue({
              subscribe: jest.fn((callback, error) => {
                error('test error');
              }),
            });
            callback();
          }),
        });
        const consoleSpy = jest.spyOn(console, 'log');

        fixture.onSubmit();
        expect(consoleSpy).toHaveBeenCalledWith('test error');
      });
    });
  });
});
