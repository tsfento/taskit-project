import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { IAuthData } from "./auth.service";
import { Subject } from "rxjs";
import { UserInfo } from "./userinfo.model";
import { Task } from "./task.model";

const API_KEY = environment.apiUrl;
const UPDATE_USER_URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;
const LOOKUP_USER_URL = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`;

type taskChange = { tasks: Task[]; task: Task; action: string; }

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
export class StorageService {
  sendUserInfo = new Subject<UserInfo>();
  userInfo: UserInfo;
  sendUserId = new Subject<string>();
  userId: string;
  tasks: Task[] = [];
  taskIndex: number;

  tasksChanged = new Subject<taskChange>();
  tasksFetched = new Subject<Task[]>();
  changePage = new Subject<number>();
  isEditing = new Subject<boolean>();

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

  storeTasks(tasks: Task[]) {
    this.http.put<Task[]>(
      `https://taskit-project-default-rtdb.firebaseio.com/${this.userId}.json`,
      tasks
    ).subscribe(response => {
      // console.log(response);
    })
  }

  fetchTasks() {
    // localStorage fallback for autoLogin
    if (this.userId === undefined) {
      const userData: {
        firstName: string;
        lastName: string;
        id: string;
        email: string;
        _token: string;
        _tokenExpDate: string;
      } = JSON.parse(localStorage.getItem('userData'));

      this.userId = userData.id;
    }

    this.http.get<Task[]>(
      `https://taskit-project-default-rtdb.firebaseio.com/${this.userId}.json`,
    ).subscribe(response => {
      if (response !== null) {
        this.tasks = response;
        this.tasksFetched.next(this.tasks.slice());
      }
    });

    return this.tasks.slice();
  }

  addTask(sentTask: Task) {
    this.tasks.push(sentTask);
    this.tasksChanged.next({
      tasks: this.tasks.slice(),
      task: sentTask,
      action: 'added',
    });
    this.changePage.next(Math.ceil(this.tasks.length / 15));
    this.storeTasks(this.tasks.slice());
  }

  editTask(editedTask: Task, index: number) {
    this.tasks[index].id = editedTask.id;
    this.tasks[index].title = editedTask.title;
    this.tasks[index].details = editedTask.details;
    this.tasks[index].dueDate = editedTask.dueDate;
    this.tasks[index].priority = editedTask.priority;
    this.tasks[index].status = editedTask.status;
    this.tasksChanged.next({
      tasks: this.tasks.slice(),
      task: this.tasks[index],
      action: 'edited',
    });
  }

  deleteTask(index: number) {
    const tempTask = this.tasks[index];
    this.tasks.splice(index, 1);
    this.tasksChanged.next({
      tasks: this.tasks.slice(),
      task: tempTask,
      action: 'deleted',
    });
    this.storeTasks(this.tasks.slice());
  }

  findTaskIndex(taskId: number) {
    return this.tasks.findIndex(a => a.id === taskId);
  }

  changeStatus(status: string, index: number) {
    const splitStatus = status.split('-');

    this.tasks[index].status = splitStatus[0];
    this.tasks[index].statusNumber = +splitStatus[1];

    this.tasksChanged.next({
      tasks: this.tasks.slice(),
      task: this.tasks[index],
      action: 'status changed',
    });
  }
}