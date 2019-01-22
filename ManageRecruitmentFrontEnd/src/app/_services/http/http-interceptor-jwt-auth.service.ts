import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { JWTAuthServicesService } from 'src/app/_services/jwtauth-services.service';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorJwtAuthService {
  constructor(
    private jwtuthenticationService : JWTAuthServicesService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler){
    // let username = 'in28minutes'
    // let password = 'dummy'
    //let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    let basicAuthHeaderString = this.jwtuthenticationService.getAuthenticatedToken();
    let username = this.jwtuthenticationService.getAuthenticatedUser()

    if(basicAuthHeaderString && username) { 
      request = request.clone({
        setHeaders : {
            Authorization : basicAuthHeaderString
          }
        }) 
    }
    return next.handle(request);
  }
}
