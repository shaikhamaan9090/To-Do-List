import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { TasksConstants } from '../shared/constants/task-constants';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks: Task[] = [];

  getTasks(): Task[] {
    const tasks = localStorage.getItem(TasksConstants.tasks);
    return tasks ? JSON.parse(tasks) : [];
  }

  saveAndUpdateTasks(task: Task | null, allTasks?: Task[]): void {
    if (allTasks) {
      localStorage.setItem(TasksConstants.tasks, JSON.stringify(allTasks));
    } else if (task) {
      const taskList = this.getTasks();
      task.id = taskList.length + 1;
      taskList.push(task);
      localStorage.setItem(TasksConstants.tasks, JSON.stringify(taskList));
    }
  }
}
