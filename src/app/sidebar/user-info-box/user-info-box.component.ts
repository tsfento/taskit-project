import { Component } from '@angular/core';
import { UserInfo } from 'src/app/shared/userinfo.model';

@Component({
  selector: 'app-user-info-box',
  templateUrl: './user-info-box.component.html',
  styleUrls: ['./user-info-box.component.css']
})
export class UserInfoBoxComponent {
  user = new UserInfo('Tyler', 'user@email.com','./assets/images/blank-profile-picture_640.png');
}
