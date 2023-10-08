import { EventEmitter } from "@angular/core";
import { Task } from "./task.model";

declare var window;

export class TasksService {
  tasks: Task[] = [
    new Task(0, 'Delete Me', 'Try to delete me.', '10/5/23', 'High', 'In Progress'),
    new Task(0, '', '', '', '', ''),
    new Task(0, '', '', '', '', ''),
    new Task(0, '', '', '', '', ''),
    new Task(0, '', '', '', '', ''),
    new Task(0, '', '', '', '', ''),
    new Task(0, '', '', '', '', ''),
    new Task(0, '', '', '', '', ''),
  ];
  taskIndex: number;

  showTaskModal(modalType: string, id?: number) {
    const taskModal = new window.bootstrap.Modal(document.getElementById(modalType));

    if (id !== undefined) {
      if (modalType === 'editTaskModal') {
        this.fillForm('Edit', id);
      } else if (modalType === 'viewTaskModal') {
        this.fillForm('View', id);
      }
    }

    taskModal.show();
  }

  resetForm(formType) {
    const taskForm: HTMLFormElement = document.querySelector(formType);
    taskForm.reset();
  }

  fillForm(formType: string, id: number) {
    const editForm: HTMLFormElement = document.querySelector(`#${formType.toLowerCase()}TaskForm`);
    const taskName: HTMLInputElement = document.querySelector(`#input${formType}TaskName`);
    const taskDetails: HTMLInputElement = document.querySelector(`#input${formType}Details`);
    const taskDueDate: HTMLInputElement = document.querySelector(`#input${formType}DueDate`);
    const taskPriority: HTMLInputElement = document.querySelector(`#input${formType}Priority`);
    const taskStatus: HTMLInputElement = document.querySelector(`#input${formType}Status`);
    this.taskIndex = this.tasks.findIndex(i => i.id === id);

    taskName.value = this.tasks[this.taskIndex].title;
    taskDetails.value = this.tasks[this.taskIndex].details;
    taskDueDate.value = this.tasks[this.taskIndex].dueDate;
    taskPriority.value = this.tasks[this.taskIndex].priority;
    taskStatus.value = this.tasks[this.taskIndex].status;
  }

  addTask(sentTask: Task) {
    this.tasks.push(sentTask);
  }

  editTask(editedTask: Task, index: number) {
    this.tasks[index].id = editedTask.id;
    this.tasks[index].title = editedTask.title;
    this.tasks[index].details = editedTask.details;
    this.tasks[index].dueDate = editedTask.dueDate;
    this.tasks[index].priority = editedTask.priority;
    this.tasks[index].status = editedTask.status;
  }

  deleteTask(id: number) {
    this.taskIndex = this.tasks.findIndex(i => i.id === id);
    this.tasks.splice(this.taskIndex, 1);
  }
}