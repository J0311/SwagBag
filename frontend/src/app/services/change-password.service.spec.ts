import { ChangePasswordService } from './change-password.service';

describe('ChangePasswordService', () => {
  let service: ChangePasswordService;
  let httpClientMock: any = {
    patch: jest.fn(),
  };

  beforeEach(() => {
    service = new ChangePasswordService(httpClientMock);
  });

  describe('Setup service', () => {
    describe('userUrl', () => {
      it('should be defined', () => {
        expect(service.userUrl).toBeDefined();
      });
    });

    describe('changePassword', () => {
      it('should be defined', () => {
        expect(service.changePassword).toBeDefined();
      });
    });
  });

  describe('changePassword', () => {
    it('should be called', () => {
      // Arrange
      const changePasswordSpy = jest.spyOn(service, 'changePassword');

      // Act
      service.changePassword({
        oldPassword: 'oldPassword',
        newPassword: 'newPassword',
        confirmPassword: 'confirmPassword',
      });

      // Assert
      expect(changePasswordSpy).toHaveBeenCalled();
    });
  });
});
