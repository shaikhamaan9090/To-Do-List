import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksConstants } from 'src/app/shared/constants/task-constants';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit, AfterViewInit {
  @Input() task: Task;
  @Input() isEditMode: boolean;
  @Output() taskSaved = new EventEmitter<void>(); // Event emitted when task is saved
  @Output() closeDialog = new EventEmitter<void>(); // Event emitted to close the dialog

  taskForm: FormGroup;
  userList = TasksConstants.users;
  priorityList = TasksConstants.priority;
  statusList = TasksConstants.status;
  selectedTask: Task;

  constructor(private fb: FormBuilder, private taskService: TaskService) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngAfterViewInit(): void {
    const taskList = this.taskService.getTasks();
    const task = taskList?.find((item) => item?.id === this.task.id);

    if (task) {
      this.selectedTask = task;
      this.patchDataToForm(task);
    }
    if (!this.task.id) {
      this.taskForm?.reset();
    }
  }

  createForm(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      assignedToUser: [''],
      status: [''],
      dueDate: [''],
      priority: [''],
    });
  }

  patchDataToForm(selectedTask: Task): void {
    this.taskForm?.patchValue({
      title: selectedTask?.title,
      description: selectedTask?.description,
      assignedToUser: selectedTask?.assignedToUser,
      status: selectedTask?.status,
      dueDate: selectedTask?.dueDate,
      priority: selectedTask?.priority,
    });
  }

  onSubmit(): void {
    if (this.task.id) {
      const taskList = this.taskService.getTasks();
      for (let i = 0; i < taskList?.length; i++) {
        if (taskList[i]?.id === this.task.id) {
          let taskObject = {
            id: taskList[i]?.id,
            ...this.taskForm?.value,
          };
          taskList[i] = taskObject;
        }
      }
      this.taskService.saveAndUpdateTasks(null, taskList);
    } else {
      this.taskService.saveAndUpdateTasks(this.taskForm?.value);
    }
    this.taskSaved.emit();
    this.closeDialog.emit();
  }

  closeDialogBox() {
    this.closeDialog.emit();
  }
}
