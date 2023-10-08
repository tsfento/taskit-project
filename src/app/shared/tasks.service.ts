import { Task } from "./task.model";

declare var window;

export class TasksService {
  tasks: Task[] = [
    new Task(0, 'Delete Me', 'Try to delete me.', '10/5/23', 'High', 'In Progress'),
  ];

  showTaskModal(modalType: string, id?: number) {
    const taskModal = new window.bootstrap.Modal(document.getElementById(modalType));
    taskModal.show();
  }

  resetForm(formType) {
    const taskForm: HTMLFormElement = document.querySelector(formType);
    taskForm.reset();
  }

  addTask(sentTask: Task) {
    this.tasks.push(sentTask);
    console.log(this.tasks);
  }

  editTask(editedTask: Task) {
    // const editForm: HTMLFormElement = document.querySelector('#editTaskForm');
    // const taskEditName: HTMLInputElement = document.querySelector('#inputEditTaskName');
    // const taskEditDetails: HTMLInputElement = document.querySelector('#inputEditDetails');
    // const taskEditDueDate: HTMLInputElement = document.querySelector('#inputEditDueDate');
    // const taskEditPriority: HTMLInputElement = document.querySelector('#inputEditPriority');
    // const taskEditStatus: HTMLInputElement = document.querySelector('#inputEditStatus');

    // taskEditName.value = editedTask.title;
    // taskEditDetails.value = editedTask.details;
    // taskEditDueDate.value = editedTask.dueDate;
    // taskEditPriority.value = editedTask.priority;

    // this.tasks.push(editedTask) don't push figure out edit specific task
  }
}