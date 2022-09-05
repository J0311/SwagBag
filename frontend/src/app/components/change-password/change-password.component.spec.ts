import { ComponentFixture,TestBed } from "@angular/core/testing";
import { AuthService } from "../../services/auth.service";
import { ChangePasswordComponent } from "./change-password.component";
import { NavbarComponent } from '../navbar/navbar.component';

describe('ChangePasswordComponent',()=>{
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  

  let authServiceMock: any;

  beforeEach(async()=>{

    authServiceMock={
      changePassword: jest.fn()
    }
    await TestBed.configureTestingModule({
      declarations: [ChangePasswordComponent, NavbarComponent],

      
      providers:[
        {
          provide:AuthService, useValue:authServiceMock

      }
    ]
    })
    .compileComponents();
  });

  beforeEach(()=>{
    fixture=TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    //component = fixture.debugElement.componentInstance
    fixture.detectChanges;
  });

  it('should create',()=>{
    expect(component).toBeTruthy();
  });

  // it('should render title in a h1 tag', async() => {
  //      // const fixture = TestBed.createComponent(ChangePasswordComponent);
  //      // fixture.detectChanges();
  //       const compiled = fixture.debugElement.nativeElement;
  //       expect(
  //         compiled.querySelector('label[for=inputOldPassword]').textContent
  //       ).toContain('Old Password');
  //     });
});





