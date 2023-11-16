import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../task.model';

@Pipe({
  name: 'filterTasks'
})
export class FilterTasksPipe implements PipeTransform {
  transform(taskArray: Task[], dueDate?: string, priority?: number, status?: number): Task[] {
    let filters = {
      unformattedDate: dueDate,
      priorityNumber: priority,
      statusNumber: status
    };
    const blankTask: Task = new Task(0, '', '', '', '', '', '', 0, 0);

    taskArray = taskArray.filter((task) => {
      let statusMatch = true,
        priorityMatch = true,
        dateMatch = true;

      if (dueDate) {
        dateMatch = task.unformattedDate === dueDate;
      }

      if (priority) {
        priorityMatch = task.priorityNumber === priority;
      }

      if (status) {
        statusMatch = task.statusNumber === status;
      }

      return statusMatch && priorityMatch && dateMatch;
    });

    if (taskArray.length < 15) {
      while (taskArray.length < 15) {
        taskArray.push(blankTask);
      }
    }

    return taskArray;
  }
}