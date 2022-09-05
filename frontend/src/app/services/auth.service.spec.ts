import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import {of,throwError} from 'rxjs';
import { Router } from "@angular/router";

describe('AuthService', ()=> {
    let service: AuthService;
    let httpClientSpy: any;
    let router: Router
    

    beforeEach(()=> {
        httpClientSpy = {
            get: jest.fn(),
            post: jest.fn(),
            patch: jest.fn()
        }
        service= new AuthService(httpClientSpy,router);
    });

    it('should be created',()=>{
        expect(service).toBeTruthy();

    });

    it('should test changePassword()',()=>{
        const res = 'test';
        const command = {
            oldPassword: 'password',
            newPassword:'passpass',
            confirmPassword:'passpass'
        };
        const url= 'http://localhost:8080/api/user/change-password';
        jest.spyOn(httpClientSpy, 'patch').mockReturnValue(of(res));
        service.changePassword(command);
        expect(httpClientSpy.patch).toBeCalledTimes(1);

    });
});