import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { Task } from 'src/app/shared/task.model';
import { FormatDatePipe } from 'src/app/shared/pipes/format-date.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/shared/storage.service';

declare var window;

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  taskIndex: number;
  isEditing: boolean;
  tasksFetchedSub: Subscription;
  tasksChangedSub: Subscription;
  editingSub: Subscription;
  taskForm: FormGroup;
  formatDatePipe = new FormatDatePipe();

  constructor(private storageService: StorageService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.tasks = this.storageService.fetchTasks();

    this.tasksFetchedSub = this.storageService.tasksFetched.subscribe(
      (fetchedTasks) => {
        this.tasks = fetchedTasks;
      }
    )

    this.tasksChangedSub = this.storageService.tasksChanged.subscribe(
      (changedTasks) => {
        this.tasks = changedTasks.tasks;
      });

      this.taskForm = new FormGroup({
        title: new FormControl(null, Validators.required),
        details: new FormControl(null, Validators.required),
        dueDate: new FormControl(this.getTodaysDate(), [Validators.required, CustomValidators.invalidDueDate]),
        priority: new FormControl('Low-1', Validators.required),
        status: new FormControl('To Do-1', Validators.required),
      });
  }

  ngOnDestroy() {
    this.tasksFetchedSub.unsubscribe();
    this.tasksChangedSub.unsubscribe();
  }

  onSubmitForm() {
    if (this.isEditing) {
      const splitPriority = this.taskForm.get('priority').value.split('-');
      const splitStatus = this.taskForm.get('status').value.split('-');

      const editedTask: Task = new Task(this.tasks[this.taskIndex].id, this.taskForm.get('title').value, this.taskForm.get('details').value, this.taskForm.get('dueDate').value, splitPriority[0], splitStatus[0], this.taskForm.get('dueDate').value, +splitPriority[1], +splitStatus[1]);

      editedTask.dueDate = this.formatDatePipe.transform(editedTask.dueDate);

      this.storageService.editTask(editedTask, this.taskIndex);
    } else {
      const splitPriority = this.taskForm.get('priority').value.split('-');
      const splitStatus = this.taskForm.get('status').value.split('-');

      const task: Task = new Task(Date.now(), this.taskForm.get('title').value, this.taskForm.get('details').value, this.taskForm.get('dueDate').value, splitPriority[0], splitStatus[0], this.taskForm.get('dueDate').value, +splitPriority[1], +splitStatus[1]);

      task.dueDate = this.formatDatePipe.transform(task.dueDate);

      this.storageService.addTask(task);
      this.router.navigate(['../', 'tasks-list'], { relativeTo: this.route});
    }

    this.resetForm();
  }

  showModal(index?: number) {
    if (index === undefined) {
      this.isEditing = false;
    } else if (index !== undefined ) {
      this.isEditing = true;
      this.taskIndex = index;
      this.fillForm(index);
    }

    const taskModal = new window.bootstrap.Modal(document.getElementById('taskModal'));

    taskModal.show();
  }

  fillForm(index: number) {
    const taskToFill = this.tasks[index];

    this.taskForm.setValue({
      title: taskToFill.title,
      details: taskToFill.details,
      dueDate: taskToFill.unformattedDate,
      priority: taskToFill.priority + '-' + taskToFill.priorityNumber,
      status: taskToFill.status + '-' + taskToFill.statusNumber,
    });
  }

  addBoredTask(boredDetails: string) {
    this.taskForm.patchValue({
      details: boredDetails,
    });

    this.showModal();
  }

  resetForm() {
    this.taskForm.reset();
    this.taskForm.patchValue({
      dueDate: this.getTodaysDate(),
      priority: 'Low-1',
      status: 'To Do-1',
    })
  }

  getTodaysDate() {
    const todaysDate: Date = new Date();
    const year: string = todaysDate.getFullYear().toString();
    let month: string = String(todaysDate.getMonth() + 1);
    let day: string = todaysDate.getDate().toString();

    if (Number(month) < 10) {
      month = '0' + month;
    }

    if (Number(day) < 10) {
      day = '0' + day;
    }

    return `${year}-${month}-${day}`;
  }
}