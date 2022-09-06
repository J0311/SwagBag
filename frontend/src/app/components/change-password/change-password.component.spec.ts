import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from './change-password.component';

describe('ChangePasswordComponent', () => {
  let fixture: ChangePasswordComponent;
  let changePasswordServiceMock: any = {
    changePassword: jest.fn(),
  };
  const routerMock: Router = {
    navigate: jest.fn(),
  } as any;

  beforeEach(() => {
    fixture = new ChangePasswordComponent(
      changePasswordServiceMock,
      routerMock
    );
  });

  describe('Setup component', () => {
    describe('changePasswordForm', () => {
      it('should be defined', () => {
        expect(fixture.changePasswordForm).toBeDefined();
      });
    });

    describe('message', () => {
      it('should be empty', () => {
        expect(fixture.message).toBe('');
      });
    });

    describe('ngOnInit', () => {
      it('should be defined', () => {
        expect(fixture.ngOnInit).toBeDefined();
      });
    });
  });

  describe('ngOnInit', () => {
    it('should be called', () => {
      const ngOnInitSpy = jest.spyOn(fixture, 'ngOnInit');

      fixture.ngOnInit();

      expect(ngOnInitSpy).toHaveBeenCalled();
    });
  });

  describe('onSubmit', () => {
    describe('when oldPassword, newPassword and confirmPassword are empty', () => {
      it('should set message to Please fill in all fields', () => {
        // Arrange
        fixture.changePasswordForm.controls.oldPassword.setValue('');
        fixture.changePasswordForm.controls.newPassword.setValue('');
        fixture.changePasswordForm.controls.confirmPassword.setValue('');

        // Act
        fixture.onSubmit();

        // Assert
        expect(fixture.message).toBe('Please fill in all fields');
      });
    });

    describe('when newPassword is less than 6 characters', () => {
      it('should set message to The password is too short', () => {
        fixture.changePasswordForm.controls.oldPassword.setValue('123456');
        fixture.changePasswordForm.controls.newPassword.setValue('12345');
        fixture.changePasswordForm.controls.confirmPassword.setValue('12345');

        fixture.onSubmit();

        expect(fixture.message).toBe('The password is too short');
      });
    });

    describe('when newPassword does not match confirmPassword', () => {
      it('should set message to The new password does not match confirm password', () => {
        fixture.changePasswordForm.controls.oldPassword.setValue('123456');
        fixture.changePasswordForm.controls.newPassword.setValue('123456');
        fixture.changePasswordForm.controls.confirmPassword.setValue('1234567');

        fixture.onSubmit();

        expect(fixture.message).toBe(
          'The new password does not match confirm password'
        );
      });
    });

    describe('when oldPassword, newPassword and confirmPassword are valid', () => {
      it('should call authService.changePassword', () => {
        fixture.changePasswordForm.controls.oldPassword.setValue('123456');
        fixture.changePasswordForm.controls.newPassword.setValue('123456');
        fixture.changePasswordForm.controls.confirmPassword.setValue('123456');

        jest
          .spyOn(changePasswordServiceMock, 'changePassword')
          .mockImplementation(() => {
            return of({
              subscribe: jest.fn(),
            });
          });

        fixture.onSubmit();

        expect(changePasswordServiceMock.changePassword).toHaveBeenCalled();
      });
    });

    describe('when authService.changePassword returns an error', () => {
      it('should set message to the error', () => {
        fixture.changePasswordForm.controls.oldPassword.setValue('123456');
        fixture.changePasswordForm.controls.newPassword.setValue('123456');
        fixture.changePasswordForm.controls.confirmPassword.setValue('123456');

        jest
          .spyOn(changePasswordServiceMock, 'changePassword')
          .mockImplementation(() => {
            return throwError({
              error: 'test error',
            });
          });

        fixture.onSubmit();

        expect(fixture.message).toBe('test error');
      });
    });
  });
});
