import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found-component.html',
  styleUrls: ['./not-found-component.css']
})
export class NotFoundComponent {
  countdown: number = 10;
  intervalId!: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.countdown--;
      
      if (this.countdown === 0) {
       clearInterval(this.intervalId);
        this.router.navigate(['/']);
      }
    }, 1000);
  }

  goHome() {
    clearInterval(this.intervalId);
    this.router.navigate(['/']);
  }
    
}
