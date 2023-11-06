import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { User } from './user.model';
import { UserInfo } from './userinfo.model';
import { FormGroup } from '@angular/forms';

const API_KEY = environment.apiUrl;
const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
const LOGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

export interface IRequestData {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface IResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = new BehaviorSubject<User | null>(null);
  sendUserInfo = new Subject<UserInfo>;
  userInfo = new UserInfo('', '', '');

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  signUp(requestData) {


    return this.http.post<IResponseData>(
        SIGNUP_URL, {
          email: requestData.email,
          password: requestData.password,
          returnSecureToken: true
        }).pipe(tap((response) => {
          // console.log(response);
          this.handleAuthentication(
            requestData.firstName,
            requestData.lastName,
            response.localId,
            requestData.email,
            response.idToken,
            +response.expiresIn
          );
        }));
  }

  logIn(requestData: IRequestData) {
  }

  private handleAuthentication(
    firstName: string,
    lastName: string,
    userId: string,
    email: string,
    token: string,
    expiresIn: number,
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    const loggedInUser = new User(firstName, lastName, userId, email, token, expirationDate);

    this.userInfo.name = `${firstName} ${lastName}`;
    this.userInfo.email = email;
    this.userInfo.image = './assets/images/blank-profile-picture_640.png';

    this.sendUserInfo.next(this.userInfo);

    this.currentUser.next(loggedInUser);
  }

  routeToUser() {
    this.router.navigate(['user'], { relativeTo: this.route });
  }
}