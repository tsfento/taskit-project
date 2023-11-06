import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { UserInfo } from 'src/app/shared/userinfo.model';

@Component({
  selector: 'app-user-info-box',
  templateUrl: './user-info-box.component.html',
  styleUrls: ['./user-info-box.component.css']
})
export class UserInfoBoxComponent implements OnInit {
  user = new UserInfo('', '', '');

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.userInfo;

    this.authService.sendUserInfo.subscribe(userInfo => {
      this.user = userInfo;
    });
  }
}
