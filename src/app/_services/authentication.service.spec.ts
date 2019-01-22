import { TestBed, getTestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthenticationService } from './authentication.service';

const happyPathUsername = 'username';
const happyPathPassword = 'password';
const apiUrl = 'http://localhost:3000/api/';

fdescribe('Authentication Service', () => {
    let authenticationService: AuthenticationService;
    let injector: TestBed;
    let httpMock: HttpTestingController; 
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService]
    });
    injector = getTestBed();
    authenticationService = injector.get(AuthenticationService);
    httpMock = injector.get(HttpTestingController);
    let store = {};
    const mockLocalStorage = {
        getItem: (key: string): string => {
            return key in store ? store[key] : null;
        },
        setItem: (key: string, value: string) => {
            store[key] = `${value}`;
        },
        removeItem: (key: string) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        }
    }
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
  });

  afterEach(() => {
      httpMock.verify();
  });

  it('should make a POST call on login', () => {
      authenticationService.login(happyPathUsername, happyPathPassword).subscribe(response =>
        expect(response).toContain('user')
      );

      const req = httpMock.expectOne(apiUrl + 'user/authenticate');
      expect(req.request.method).toEqual('POST');
  });

//   it('should store the token in localStorage', () => {
//     this.mockLocalStorage.setAccessToken('sometoken');
//     authenticationService.login(happyPathUsername, happyPathPassword).subscribe(response => {
//         expect(this.mockLocalStorage.getAccessToken().toEqual('sometoken'));
//     }); 
//   });

  it('should check the stored token for truthiness', () => {
      localStorage.setItem('user', 'sometoken');      
      console.log(localStorage);
      expect(authenticationService.isLoggedIn()).toBeTruthy();
  });
});
