import { EventEmitter, Injectable } from "@angular/core";
import { Task } from "./task.model";
import { Subject } from "rxjs";

declare var window;

@Injectable({
  providedIn: 'root'
})

export class TasksService {
  tasks: Task[] = [
    new Task(1, 'Delete Me', 'Try to delete me.', 'Oct 5th, 2023', 'High', 'In Progress', '2023-10-05', 3, 2),
    new Task(1, 'Move Me', 'Try to move me.', 'Oct 4th, 2023', 'Low', 'To Do', '2023-10-04', 1, 1),
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
  ];
  taskIndex: number;

  tasksChanged = new EventEmitter<Task[]>();
  changePage = new EventEmitter<number>();
  isEditing = new Subject<boolean>();

  getTasks() {
    return this.tasks.slice();
  }

  showTaskModal(modalType: string, index?: number) {
    if (index === undefined) {
      this.isEditing.next(false);
    }

    if (index !== undefined) {
      if (modalType === 'taskModal') {
        this.isEditing.next(true);
        this.fillModal(index);
      } else if (modalType === 'deleteTaskModal') {
        // this.deleteTask(index);
      }
    }

    const taskModal = new window.bootstrap.Modal(document.getElementById(modalType));

    taskModal.show();
  }

  resetForm(formType) {
    const taskForm: HTMLFormElement = document.querySelector(formType);
    taskForm.reset();
  }

  fillModal(index: number) {
    const taskName: HTMLInputElement = document.querySelector('#inputTaskName');
    const taskDetails: HTMLInputElement = document.querySelector('#inputDetails');
    const taskDueDate: HTMLInputElement = document.querySelector('#inputDueDate');
    const taskPriority: HTMLSelectElement = document.querySelector('#inputPriority');
    const taskStatus: HTMLSelectElement = document.querySelector('#inputStatus');

    this.taskIndex = index;
    taskName.value = this.tasks[index].title;
    taskDetails.value = this.tasks[index].details;
    taskDueDate.value = this.tasks[index].unformattedDate;
    taskPriority.value = this.tasks[index].priority + '-' + this.tasks[index].priorityNumber;
    taskStatus.value = this.tasks[index].status + '-' + this.tasks[index].statusNumber;
  }

  addTask(sentTask: Task) {
    this.tasks.push(sentTask);
    this.tasksChanged.emit(this.tasks.slice());
    this.changePage.emit(Math.ceil(this.tasks.length / 15));
  }

  editTask(editedTask: Task, index: number) {
    this.tasks[index].id = editedTask.id;
    this.tasks[index].title = editedTask.title;
    this.tasks[index].details = editedTask.details;
    this.tasks[index].dueDate = editedTask.dueDate;
    this.tasks[index].priority = editedTask.priority;
    this.tasks[index].status = editedTask.status;
  }

  // Change to ngFor index
  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.tasksChanged.emit(this.tasks.slice());
  }

  formatDate(date: string) {
    const dateFormat: string[] = date.split('-');

    const month: string[] = [
      'Jan', 'Feb', 'Mar', 'Apr',
      'Jun', 'May', 'Jul', 'Aug',
      'Sep', 'Oct', 'Nov', 'Dec'
    ];

    if (Number(dateFormat[2]) < 10) {
      const removeZero: string[] = dateFormat[2].split('');
      dateFormat[2] = removeZero[1];
    }

    function addOrdinal(day: string) {
      if (Number(day) >= 11 && Number(day) <= 13) {
        return day + 'th';
      }

      switch(Number(day) % 10) {
        case 1: return day + 'st';
        case 2: return day + 'nd';
        case 3: return day + 'rd';
        default: return day + 'th';
      }
    }

    return `${month[Number(dateFormat[1]) - 1]} ${addOrdinal(dateFormat[2])}, ${dateFormat[0]}`;
  }

  changeStatus(status: string, index: number) {
    const splitStatus = status.split('-');

    this.tasks[index].status = splitStatus[0];
    this.tasks[index].statusNumber = +splitStatus[1];

    this.tasksChanged.emit(this.tasks.slice());
  }
}