import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: Task;
  showTaskFormDialog = false;
  showDeleteDialog = false;
  isEditTask = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.refreshTaskList();
  }

  refreshTaskList() {
    this.tasks = this.taskService.getTasks();
    this.selectedTask = { id: 0, title: '', description: '' };
    this.showTaskFormDialog = false;
    this.showDeleteDialog = false;
  }

  openNewTaskDialog() {
    this.selectedTask = { id: 0, title: '', description: '' }; // Reset form
    this.showTaskFormDialog = true;
    this.isEditTask = false;
  }

  openEditDialog(task: Task) {
    this.isEditTask = true;
    this.selectedTask = { ...task };
    this.showTaskFormDialog = true;
  }

  closeTaskFormDialog() {
    this.showTaskFormDialog = false;
  }

  openDeleteDialog(task: Task) {
    this.selectedTask = task;
    this.showDeleteDialog = true;
  }

  closeDeleteDialog() {
    this.showDeleteDialog = false;
  }

  deleteTask(id: number): void {
    if (this.tasks?.length === 1) {
      localStorage.clear();
    } else {
      this.tasks = this.tasks?.filter((item) => item?.id !== id);
      this.taskService.saveAndUpdateTasks(null, this.tasks);
    }
    this.refreshTaskList();
    this.showDeleteDialog = false;
  }
}
