import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../task.model';

@Pipe({
  name: 'generatePages'
})
export class GeneratePagesPipe implements PipeTransform {
  transform(taskArray: Task[]): Task[] {
    const blankTask: Task = new Task(0, '', '', '', '', '', '', 0, 0);
    let totalPages: number = 1;
    let pageNum: number = 1;

    totalPages = Math.ceil(taskArray.length / 15);

    if (taskArray.length === 0) {
      while (taskArray.length < 15) {
        taskArray.push(blankTask);
      }
    }

    while (taskArray.length < totalPages * 15) {
      taskArray.push(blankTask);
    }

    return taskArray;
  }
}