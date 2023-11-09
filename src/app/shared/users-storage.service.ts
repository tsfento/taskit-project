import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { IAuthData } from "./auth.service";
import { Subject } from "rxjs";
import { UserInfo } from "./userinfo.model";

const API_KEY = environment.apiUrl;
const UPDATE_USER_URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;
const LOOKUP_USER_URL = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`

interface IStoreUserResponseData {
  localId: string;
  email: string;
  displayName: string;
  photoUrl: string;
  passwordHash: string;
  providerUserInfo: any;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
}

interface IFetchUserResponseData {
  kind: string;
  users: [{
    localId: string;
    email: string;
    emailVerified: boolean;
    displayName: string;
    providerUserInfo: any;
    photoUrl: string;
    passwordHash: string;
    passwordUpdatedAt: number;
    validSince: string;
    disabled: boolean;
    lastLoginAt: string;
    createdAt: string;
    customAuth: boolean;
  }]
}

@Injectable({
  providedIn: 'root'
})
export class UsersStorageService {
  sendUserInfo = new Subject<UserInfo>();
  userInfo: UserInfo;
  sendUserId = new Subject<string>();
  userId: string;

  constructor(private http: HttpClient) {}

  storeUserDetails(authData: IAuthData) {
    this.http.post(
      UPDATE_USER_URL,
      {
        'idToken': authData.token,
        'displayName': `${authData.firstName} ${authData.lastName}`,
        'photoUrl': '',
        'returnSecureToken': true

      }
    ).subscribe((res: IStoreUserResponseData) => {
      this.userInfo = new UserInfo(
        res.displayName,
        res.email,
        './assets/images/blank-profile-picture_640.png'
      );
      this.userId = res.localId;

      this.sendUserInfo.next(this.userInfo);
      this.sendUserId.next(this.userId);
    })
  }

  fetchUserDetails(authData: IAuthData) {
    this.http.post(
      LOOKUP_USER_URL,
      {
        'idToken': authData.token
      }
    ).subscribe((res: IFetchUserResponseData) => {
      this.userInfo = new UserInfo(
        res.users[0].displayName,
        res.users[0].email,
        './assets/images/blank-profile-picture_640.png'
      );
      this.userId = res.users[0].localId;

      this.sendUserInfo.next(this.userInfo);
      this.sendUserId.next(this.userId);
    });
  }
}