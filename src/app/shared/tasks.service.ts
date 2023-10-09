import { EventEmitter } from "@angular/core";
import { Task } from "./task.model";

declare var window;

export class TasksService {
  tasks: Task[] = [
    new Task(1, 'Delete Me', 'Try to delete me.', '10/5/23', 'High', 'In Progress'),
    // new Task(0, '', '', '', '', ''),
    // new Task(0, '', '', '', '', ''),
    // new Task(0, '', '', '', '', ''),
    // new Task(0, '', '', '', '', ''),
    // new Task(0, '', '', '', '', ''),
    // new Task(0, '', '', '', '', ''),
    // new Task(0, '', '', '', '', ''),
    // new Task(0, '', '', '', '', ''),
    // new Task(0, '', '', '', '', ''),
    // new Task(0, '', '', '', '', ''),
    // new Task(0, '', '', '', '', ''),
    // new Task(0, '', '', '', '', ''),
    // new Task(0, '', '', '', '', ''),
    // new Task(0, '', '', '', '', ''),
  ];
  taskIndex: number;

  tasksChanged = new EventEmitter<Task[]>();

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
        console.log('delete', index);
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
      taskDueDate.value = this.tasks[index].dueDate;
      taskPriority.value = this.tasks[index].priority;
      taskStatus.value = this.tasks[index].status;
    } else if (modalType === 'View') {

    }
  }

  addTask(sentTask: Task) {
    this.tasks.push(sentTask);
    this.tasksChanged.emit(this.tasks.slice());
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
}