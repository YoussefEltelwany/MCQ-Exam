import { Component, model } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { AuthService } from '../../../auth/serveises/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
   user:any =null;
  
   constructor(private ser:AuthService){}
   ngOnInit(): void {
    this.ser.user.subscribe((res:any) =>{
      if(res.role){
        this.user = res
      }
    })
   }


   logout(){
    const model ={}
    this.ser.login(model).subscribe(res=>{
      this.user=null
      this.ser.user.next(res)
    })
   }
}
