import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from './user.model';

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

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  signUp(requestData: IRequestData) {


    return this.http.post<IRequestData>(
        SIGNUP_URL, {
          email: requestData.email,
          password: requestData.password,
          returnSecureToken: true
        }).pipe(tap((response) => {
          console.log(response);
        }));
  }

  logIn(requestData: IRequestData) {
  }

  handleAuthentication(
    firstName: string,
    lastName: string,
    userId: string,
    email: string,
    token: string,
    expiresIn: number,
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    const loggedInUser = new User(firstName, lastName, userId, email, token, expirationDate);

    this.currentUser.next(loggedInUser);
  }

  routeToUser() {
    this.router.navigate(['user'], { relativeTo: this.route });
  }
}