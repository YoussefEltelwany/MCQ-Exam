import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../serveises/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    SharedModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

     Userform!:FormGroup
     students:any []=[];

     constructor(
      private fb:FormBuilder , private ser:AuthService ,private router:Router  , private toster:ToastrService) {}

     ngOnInit():void {
        this.CreatForm();
        this.getStudents();
     }


     CreatForm(){
       this.Userform= this.fb.group({
         username:['',[Validators.required]],
         email:['',[Validators.required , Validators.email]],
         password:['',[Validators.required]],
         confirmPassword:['',[Validators.required]]
       })
     }
     
     getStudents(){
      this.ser.getUser('students').subscribe((res:any)=>{
        this.students=res;
      })
     }
     
     submit(){
      const model ={
        username:this.Userform.value.username,
        email:this.Userform.value.email,
        password:this.Userform.value.password,
        id :this.Userform.value.id
      }
      let index = this.students.findIndex(item => item.email == this.Userform.value.email)
      if(index !== -1){
        this.toster.error('this email is exist',"",{
          disableTimeOut:false,
          titleClass:"toster-title",
          messageClass:"toster-message",
          positionClass: 'toast-bottom-right',
          timeOut:5000,
          closeButton:true
        })
      }else{
         this.ser.createUsers(model).subscribe((res:any) =>{
          this.toster.success('success') ,"" , {
            disableTimeOut:false,
            titleClass:"toster-title",
            messageClass:"toster-message",
            positionClass: 'toast-bottom-right',
            timeOut:5000,
            closeButton:true
          }
          const model ={
            username:res.username,
            role:"students",
            UserId:res.id
          }
          this.ser.login(model).subscribe(res =>{
            this.ser.user.next(res)
           })
           this.router.navigate(['/subjects'])
         })
      }
     
    }

    

}
