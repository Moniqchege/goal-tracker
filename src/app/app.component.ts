import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, signal, ViewChild, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'goal-tracker';
  @ViewChild("loginModal") loginModal!: ElementRef;
  isLoginFormVisible = signal<boolean>(true);

  registerObj:any = {
    "userId": 0,
    "emailId": '',
    "password": '',
    "confirmPassword": '', 
    "fullName": '',
    "mobileNo": ''
  }

  http = inject(HttpClient);

  toggleForm() {
    this.isLoginFormVisible.set(!this.isLoginFormVisible())
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
    debugger
    this.http.post("https://freeapi.miniprojectideas.com/api/Goals/createNewUser", this.registerObj).subscribe((res:any) => {
      debugger
      alert("Registration Successful")
    }, error=>{
     })
  }
}
