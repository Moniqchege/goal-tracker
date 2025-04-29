import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports:[FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stats = [
    { icon: 'fas fa-tasks', title: 'Total Tasks', value: 12, note: '4 completed', color: 'text-primary' },
    { icon: 'fas fa-flag', title: 'Active Goals', value: 3, note: '2 in progress', color: 'text-success' },
    { icon: 'fas fa-bell', title: 'Reminders', value: 5, note: '2 upcoming', color: 'text-warning' },
    { icon: 'fas fa-chart-line', title: 'Completion Rate', value: '75%', note: 'This week', color: 'text-info' }
  ];

  tasks = [
    {
      name: 'Morning Exercise',
      icon: 'bi-bicycle',
      days: [true, true, false, false, false, false, false]
    },
    {
      name: 'Read 30 Minutes',
      icon: 'bi-book',
      days: [true, false, false, false, false, false, false]
    },
    {
      name: 'Meditation',
      icon: 'bi-peace',
      days: [true, true, true, false, false, false, false]
    },
    {
      name: 'Study Programming',
      icon: 'bi-code-slash',
      days: [false, false, false, false, false, false, false]
    },
    {
      name: 'Water Plants',
      icon: 'bi-flower1',
      days: [false, false, false, false, false, false, false]
    }
  ];

  recentActivities = [
    { title: 'Completed task: Morning Exercise', time: '3 hours ago' },
    { title: 'New goal created: Learn Web Development', time: 'Yesterday' },
    { title: 'Added reminder: Team Meeting', time: '2 days ago' }
  ];

  ngOnInit(): void {}

  toggleDay(taskIndex: number, dayIndex: number): void {
    this.tasks[taskIndex].days[dayIndex] = !this.tasks[taskIndex].days[dayIndex];
  }
}
