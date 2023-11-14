import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { UserInfo } from 'src/app/shared/userinfo.model';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-user-info-box',
  templateUrl: './user-info-box.component.html',
  styleUrls: ['./user-info-box.component.css']
})
export class UserInfoBoxComponent implements OnInit, OnDestroy {
  userInfoSub: Subscription;
  user = new UserInfo('', '', '');

  constructor(private storageService: StorageService, private authService: AuthService) {}

  ngOnInit() {
    // this.user = this.usersStorageService.userInfo;

    this.userInfoSub = this.storageService.sendUserInfo.subscribe(userInfo => {
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
