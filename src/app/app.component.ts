import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'goal-tracker';
  @ViewChild("loginModal") loginModal!: ElementRef;

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
}
