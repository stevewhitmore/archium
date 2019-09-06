// import { Injectable } from '@angular/core';
// import { HttpInterceptor, 
//          HttpHandler, 
//          HttpRequest
// } from '@angular/common/http';

// import { AuthenticationService } from './authentication.service';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//   constructor(private authenticationService: AuthenticationService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     const re = 'http://localhost/services/login/api.php';
//     console.log(req.url.search(re));
//     // Exclude interceptor for login request:
//     if (req.url.search(re) === -1 ) {
//         const authToken = this.authenticationService.getAuthToken();

//         const authReq = req.clone({ setHeaders: { Authorization: authToken } });

//         // send cloned request with header to the next handler.
//         return next.handle(authReq);
//     }
//   }
// }
