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
    this.authService.currentUser.subscribe(currentUser => {
      this.user.name = `${currentUser.firstName} ${currentUser.lastName}`;
      this.user.email = currentUser.email;
      this.user.image = './assets/images/blank-profile-picture_640.png';
    });
  }
}
