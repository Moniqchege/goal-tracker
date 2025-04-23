import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GoalListComponent } from './pages/goal-list/goal-list.component';
import { NewGoalComponent } from './pages/new-goal/new-goal.component';
import { RemindersComponent } from './pages/reminders/reminders.component';
import { TaskListComponent } from './pages/task-list/task-list.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'goal-list',
        component: GoalListComponent
    },
    {
        path: 'new-goal',
        component: NewGoalComponent
    },
    {
        path: 'reminders',
        component: RemindersComponent
    },
    {
        path: 'task-list',
        component: TaskListComponent
    }
];
