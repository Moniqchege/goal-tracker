import { Component } from '@angular/core';
import { Reminder } from '../../models/reminder.model';
import { ReminderService } from '../../services/reminder.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-reminders',
  imports: [FormsModule, CommonModule],
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css'],
})
export class RemindersComponent {
  reminders: Reminder[] = [];
  selectedReminder: Reminder = { id: '', title: '', datetime: '', notes: '' };
  isEditing = false;

  constructor(private reminderService: ReminderService) {}

  ngOnInit(): void {
    this.loadReminders();
  }

  loadReminders() {
    this.reminders = this.reminderService.getReminders();
  }

  openNewModal() {
    this.selectedReminder = { id: '', title: '', datetime: '', notes: '' };
    this.isEditing = false;
    const modal = new bootstrap.Modal(document.getElementById('reminderModal'));
    modal.show();
  }

  openEditModal(reminder: Reminder) {
    this.selectedReminder = { ...reminder };
    this.isEditing = true;
    const modal = new bootstrap.Modal(document.getElementById('reminderModal'));
    modal.show();
  }

  saveReminder() {
    if (!this.selectedReminder.title || !this.selectedReminder.datetime) return;

    if (this.isEditing) {
      this.reminderService.updateReminder(this.selectedReminder);
    } else {
      const { id, ...data } = this.selectedReminder;
      this.reminderService.addReminder(data);
    }

    this.closeModal();
    this.loadReminders();
  }

  deleteReminder(id: string) {
    this.reminderService.deleteReminder(id);
    this.loadReminders();
  }

  closeModalOnSelect() {
    setTimeout(() => {
      this.closeModal();
    }, 800);
  }

  closeModal() {
    const modalEl = document.getElementById('reminderModal');
    if (modalEl) bootstrap.Modal.getInstance(modalEl)?.hide();
  }
}
