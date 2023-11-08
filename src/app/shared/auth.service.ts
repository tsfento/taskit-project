import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from './user.model';
import { IUserData } from '../landing/landing.component';
import { UsersStorageService } from './users-storage.service';

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

export interface IAuthData {
  firstName: string;
  lastName: string;
  userId: string;
  email: string;
  token: string;
  expiresIn: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private usersStoragService: UsersStorageService) {}

  signUpOrLogin(requestData: IUserData, loggingIn: boolean) {
    const url = loggingIn ? LOGIN_URL : SIGNUP_URL;

    return this.http.post<IResponseData>(
      url, {
        email: requestData.email,
        password: requestData.password,
        returnSecureToken: true
      }).pipe(tap((response) => {
        const authData: IAuthData = {
          firstName: requestData.firstName,
          lastName: requestData.lastName,
          userId: response.localId,
          email: requestData.email,
          token: response.idToken,
          expiresIn: +response.expiresIn
        }

        this.handleAuthentication(authData, loggingIn);
    }));
  }

  private handleAuthentication(authData: IAuthData, loggingIn: boolean) {
    const expirationDate = new Date(new Date().getTime() + authData.expiresIn * 1000);

    const loggedInUser = new User(
      authData.firstName,
      authData.lastName,
      authData.userId,
      authData.email,
      authData.token,
      expirationDate
    );

    this.currentUser.next(loggedInUser);

    if (loggingIn) {
      this.usersStoragService.fetchUserDetails(authData);
    } else {
      this.usersStoragService.storeUserDetails(authData);
    }
  }

  logout() {
    this.currentUser.next(null);
    this.router.navigate(['/']);
  }

  routeToUser() {
    this.router.navigate(['user'], { relativeTo: this.route });
  }
}