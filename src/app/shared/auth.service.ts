import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { User } from './user.model';
import { StorageService } from './storage.service';

const API_KEY = environment.apiUrl;
const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
const LOGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

export interface IUserData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

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
  private tokenExpirationTimer: any;
  userToast = new Subject<string>();

  constructor(private http: HttpClient, private router: Router, private storageService: StorageService) {}

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

  autoLogin() {
    const userData: {
      firstName: string;
      lastName: string;
      id: string;
      email: string;
      _token: string;
      _tokenExpDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.firstName,
      userData.lastName,
      userData.id,
      userData.email,
      userData._token,
      new Date(userData._tokenExpDate)
    );

    const authData: IAuthData = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      userId: userData.id,
      email: userData.email,
      token: userData._token,
      expiresIn: new Date(userData._tokenExpDate).getTime() - new Date().getTime()
    }

    if (loadedUser.token) {
      this.currentUser.next(loadedUser);
      this.autoLogout(authData.expiresIn);
      this.storageService.fetchUserDetails(authData);
      this.navigateToUserPage();
    }
  }

  logout() {
    this.currentUser.next(null);
    this.userToast.next('Session over. Please login to continue.');
    this.router.navigate(['/']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(authData: IAuthData, loggingIn: boolean) {
    const expirationDate = new Date(new Date().getTime() + authData.expiresIn * 1000);

    const loggedInUser = new User(
      '',
      '',
      authData.userId,
      authData.email,
      authData.token,
      expirationDate
    );

    this.currentUser.next(loggedInUser);
    this.autoLogout(authData.expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(loggedInUser));

    if (loggingIn) {
      this.storageService.fetchUserDetails(authData);
    } else {
      this.storageService.storeUserDetails(authData);
    }
  }

  navigateToUserPage() {
    this.router.navigate(['user']);
  }
}