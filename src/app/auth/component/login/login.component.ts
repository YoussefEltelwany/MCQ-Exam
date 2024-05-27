import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../serveises/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  LoginForm!:FormGroup ;
  users:any []=[];
  type:any = 'students'


  constructor(
   private fb:FormBuilder ,
    private ser:AuthService ,
    private router:Router, 
    private toster:ToastrService) {}

  ngOnInit(): void {
    this.CreatForm();
    this.getUsers();
  }
  
  CreatForm(){
    this.LoginForm= this.fb.group({
      type: [this.type],
      email:['',[Validators.required , Validators.email]],
      password:['',[Validators.required]],
    })
  }
   

   getRole(evevt:any){
    this.type = evevt.value;
    this.getUsers();
  }

  getUsers(){
    this.ser.getUser(this.type).subscribe((res:any)=>{
      this.users=res;
      
    })
   }



   submit(){
    let index = this.users.findIndex(item => item.email == this.LoginForm.value.email && item.password == this.LoginForm.value.password)
    if(index == -1){
      this.toster.error('الايميل او كلمه السر غير صيحه',"",{
        disableTimeOut:false,
        titleClass:"toster-title",
        messageClass:"toster-message",
        positionClass: 'toast-bottom-right',
        timeOut:5000,
        closeButton:true
      })
    }else{
      const model ={
        username:this.users[index].username,
        role:this.type,
        UserId:this.users[index].id
      }
      this.ser.login(model).subscribe(res =>{
        this.ser.user.next(res)
        this.toster.success('success') ,"" , {
          disableTimeOut:false,
          titleClass:"toster-title",
          messageClass:"toster-message",
          positionClass: 'toast-bottom-right',
          timeOut:5000,
          closeButton:true
        }
        this.router.navigate(['/subjects'])
       })
    }
      
  }



 
}
