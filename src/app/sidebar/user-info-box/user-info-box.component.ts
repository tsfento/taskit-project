import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { UserInfo } from 'src/app/shared/userinfo.model';
import { UsersStorageService } from 'src/app/shared/users-storage.service';

@Component({
  selector: 'app-user-info-box',
  templateUrl: './user-info-box.component.html',
  styleUrls: ['./user-info-box.component.css']
})
export class UserInfoBoxComponent implements OnInit, OnDestroy {
  userInfoSub: Subscription;
  user = new UserInfo('', '', '');

  constructor(private usersStorageService: UsersStorageService, private authService: AuthService) {}

  ngOnInit() {
    // this.user = this.usersStorageService.userInfo;

    this.userInfoSub = this.usersStorageService.sendUserInfo.subscribe(userInfo => {
      this.user = userInfo;
    });
  }

  ngOnDestroy() {
    this.userInfoSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
