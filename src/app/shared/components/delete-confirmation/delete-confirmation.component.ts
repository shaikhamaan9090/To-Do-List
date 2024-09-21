import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss'],
})
export class DeleteConfirmationComponent {
  @Input() task!: Task; // Task to be deleted
  @Output() confirmDelete = new EventEmitter<void>(); // Emit event on confirm
  @Output() cancelDelete = new EventEmitter<void>(); // Emit event on cancel

  // Called when the user clicks the 'No' button
  onCancel() {
    this.cancelDelete.emit(); // Emit cancel event to parent component
  }

  // Called when the user clicks the 'Yes' button
  onConfirm() {
    this.confirmDelete.emit(); // Emit confirm event to parent component
  }
}
