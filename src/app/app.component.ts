import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedModule } from "./shared/shared.module";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { AuthService } from './auth/serveises/auth.service';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        RouterOutlet,
        MatSlideToggleModule,
        SharedModule,
        NavbarComponent
    ]
})
export class AppComponent {
  title = 'MCQ-Exam';

    constructor(private ser:AuthService){}
   
    ngOnInit():void {
       this.getUserData();
    }


    getUserData(){
      this.ser.getRole().subscribe(res=>{
         this.ser.user.next(res)
      })
    }



}
