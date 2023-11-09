import { Injectable } from "@angular/core";
import { Task } from "./task.model";
import { Subject } from "rxjs";
import { TasksStorageService } from "./tasks-storage.service";

declare var window;
type taskChange = { tasks: Task[]; task: Task; action: string; }

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  // tasks: Task[] = [
    // new Task(1, 'Delete Me', 'Try to delete me.', 'Oct 5th, 2023', 'High', 'In Progress', '2023-10-05', 3, 2),
    // new Task(1, 'Move Me', 'Try to move me.', 'Oct 4th, 2023', 'Low', 'To Do', '2023-10-04', 1, 1),
    // new Task(0, '', '', '', 'Low', '', '', 0, 0),
    // new Task(0, '', '', '', 'Low', '', '', 0, 0),
    // new Task(0, '', '', '', 'Low', '', '', 0, 0),
    // new Task(0, '', '', '', 'Low', '', '', 0, 0),
    // new Task(0, '', '', '', 'Low', '', '', 0, 0),
    // new Task(0, '', '', '', 'Low', '', '', 0, 0),
    // new Task(0, '', '', '', 'Low', '', '', 0, 0),
    // new Task(0, '', '', '', 'Low', '', '', 0, 0),
    // new Task(0, '', '', '', 'Low', '', '', 0, 0),
    // new Task(0, '', '', '', 'Low', '', '', 0, 0),
    // new Task(0, '', '', '', 'Low', '', '', 0, 0),
    // new Task(0, '', '', '', 'Low', '', '', 0, 0),
    // new Task(0, '', '', '', 'Low', '', '', 0, 0),
    // new Task(0, '', '', '', 'Low', '', '', 0, 0),
    // new Task(0, '', '', '', 'Low', '', '', 0, 0),
    // new Task(0, '', '', '', 'Low', '', '', 0, 0),
    // new Task(0, '', '', '', 'Low', '', '', 0, 0),
    // new Task(0, '', '', '', 'Low', '', '', 0, 0),
  // ];
  tasks: Task[] = [];
  taskIndex: number;

  tasksChanged = new Subject<taskChange>();
  changePage = new Subject<number>();
  isEditing = new Subject<boolean>();

  constructor(private tasksStorageService: TasksStorageService) {}

  getTasks() {
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
    this.tasksStorageService.storeTasks(this.tasks.slice());
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