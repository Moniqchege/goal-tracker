import { Component } from '@angular/core';
import { Reminder } from '../../models/reminder.model';
import { ReminderService } from '../../services/reminder.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reminders',
  imports: [FormsModule, CommonModule],
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css'],
})
export class RemindersComponent {
  reminders: Reminder[] = [];
  newReminder: Partial<Reminder> = {};

  constructor(private reminderService: ReminderService) {}

  ngOnInit() {
    this.loadReminders();
  }

  loadReminders() {
    this.reminders = this.reminderService.getReminders();
  }

  createReminder() {
    if (!this.newReminder.title || !this.newReminder.dateTime) return;
    this.reminderService.addReminder(this.newReminder as Omit<Reminder, 'id'>);
    this.newReminder = {};
    this.loadReminders();
    (document.getElementById('reminderModalClose') as HTMLElement)?.click();
  }

  deleteReminder(id: string) {
    this.reminderService.deleteReminder(id);
    this.loadReminders();
  }
}
