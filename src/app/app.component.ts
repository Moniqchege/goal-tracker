import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, signal, ViewChild, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { loginUser, RegisterUser } from './models/user.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'goal-tracker';
  @ViewChild("loginModal") loginModal!: ElementRef;
  @ViewChild('navbarNav') navbarNav!: ElementRef;
  isLoginFormVisible = signal<boolean>(true);

  registerObj:RegisterUser = {
    userId: 0,
    email: '',
    password: '',
    confirmPassword: '', 
    fullName: '',
    mobileNo: ''
  }

  loginObj: loginUser = {
    email: '',
    password: ''
  }

  http = inject(HttpClient);

  constructor(
    private router: Router
  ){
    localStorage.removeItem('users');
    localStorage.removeItem('loggedInUser');
  }

  toggleForm() {
    this.isLoginFormVisible.set(!this.isLoginFormVisible())
  }

  closeNavbar() {
    const navbar = this.navbarNav?.nativeElement;
    if(navbar?.classList.contains('show')) {
      navbar.classList.remove('show');
    }
  }

  openModal() {
    if(this.loginModal) {
      this.loginModal.nativeElement.style.display = 'block';
    }
  }

  closeModal() {
    if(this.loginModal) {
      this.loginModal.nativeElement.style.display = 'none';
    }
  }

  onRegister(){
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

    const userExists = existingUsers.some((user: any) => user.email === this.registerObj.email);
    if (userExists) {
      alert('User email already exists');
      return;
    }

    existingUsers.push(this.registerObj);

    localStorage.setItem('users', JSON.stringify(existingUsers));
    alert('Registration Successful');
    this.isLoginFormVisible.set(true);

    // this.registerObj = {RegisterUser};
  }

  onLogin(){
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

    const user = existingUsers.find((u:any)=>u.email === this.loginObj.email && u.password === this.loginObj.password);
    if(user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));

      this.closeModal();
      this.router.navigate(['/dashboard'])
    }else{
      alert('Invalid email or password')
    }
  }
}
