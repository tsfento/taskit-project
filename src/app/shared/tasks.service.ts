import { EventEmitter } from "@angular/core";
import { Task } from "./task.model";

declare var window;

export class TasksService {
  tasks: Task[] = [
    new Task(1, 'Delete Me', 'Try to delete me.', 'Oct 5th, 2023', 'High', 'In Progress', '2023-10-05'),
    // new Task(0, '', '', '', 'Low', '', ''),
    // new Task(0, '', '', '', 'Low', '', ''),
    // new Task(0, '', '', '', 'Low', '', ''),
    // new Task(0, '', '', '', 'Low', '', ''),
    // new Task(0, '', '', '', 'Low', '', ''),
    // new Task(0, '', '', '', 'Low', '', ''),
    // new Task(0, '', '', '', 'Low', '', ''),
    // new Task(0, '', '', '', 'Low', '', ''),
    // new Task(0, '', '', '', 'Low', '', ''),
    // new Task(0, '', '', '', 'Low', '', ''),
    // new Task(0, '', '', '', 'Low', '', ''),
    // new Task(0, '', '', '', 'Low', '', ''),
    // new Task(0, '', '', '', 'Low', '', ''),
    // new Task(0, '', '', '', 'Low', '', ''),
    // new Task(0, '', '', '', 'Low', '', ''),
    // new Task(0, '', '', '', 'Low', '', ''),
    // new Task(0, '', '', '', 'Low', '', ''),
    // new Task(0, '', '', '', 'Low', '', ''),
  ];
  taskIndex: number;

  tasksChanged = new EventEmitter<Task[]>();
  changePage = new EventEmitter<number>();

  getTasks() {
    return this.tasks.slice();
  }

  showTaskModal(modalType: string, index?: number) {
    const taskModal = new window.bootstrap.Modal(document.getElementById(modalType));

    if (index !== undefined) {
      if (modalType === 'editTaskModal') {
        this.fillModal('Edit', index);
      } else if (modalType === 'viewTaskModal') {
        this.fillModal('View', index);
      } else if (modalType === 'deleteTaskModal') {
        this.deleteTask(index);
      }
    }

    taskModal.show();
  }

  resetForm(formType) {
    const taskForm: HTMLFormElement = document.querySelector(formType);
    taskForm.reset();
  }

  fillModal(modalType: string, index: number) {
    if (modalType === 'Edit') {
      const form: HTMLFormElement = document.querySelector(`#${modalType.toLowerCase()}TaskForm`);
      const taskName: HTMLInputElement = document.querySelector(`#input${modalType}TaskName`);
      const taskDetails: HTMLInputElement = document.querySelector(`#input${modalType}Details`);
      const taskDueDate: HTMLInputElement = document.querySelector(`#input${modalType}DueDate`);
      const taskPriority: HTMLInputElement = document.querySelector(`#input${modalType}Priority`);
      const taskStatus: HTMLInputElement = document.querySelector(`#input${modalType}Status`);

      this.taskIndex = index;
      taskName.value = this.tasks[index].title;
      taskDetails.value = this.tasks[index].details;
      taskDueDate.value = this.tasks[index].unformattedDate;
      taskPriority.value = this.tasks[index].priority;
      taskStatus.value = this.tasks[index].status;
    } else if (modalType === 'View') {

    }
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
}