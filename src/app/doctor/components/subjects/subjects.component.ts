import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { DoctorService } from '../../serveises/doctor.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/serveises/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [
    SharedModule,
    CommonModule
  ],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css'
})
export class SubjectsComponent {

   user:any = {};
  subjects:any []=[];

  constructor( private ser:DoctorService ,private authSer:AuthService ,private toster:ToastrService) { }


  ngOnInit(): void {
   this.GetSubjects();
   this.GetUserInfo();
  }


 GetSubjects(){
  this.ser.GetAllSubjects().subscribe((res:any) =>{
    this.subjects = res;
    
  })
 }


 GetUserInfo(){
   this.authSer.getRole().subscribe((res:any) => {
    this.user=res
   })
 }

 

 deletSub(index:number){
let id = this.subjects[index].id;
  this.subjects.splice( index , 1);
  this.ser.deletSubjet(id).subscribe((res:any) =>{
         this.toster.success('تم حذف الماده بنجاح',"",{
           timeOut:3000,
           progressBar:true,
           progressAnimation:'increasing',
           positionClass:'toast-buttom-right'
          })
  })
 }




}
