import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../../../doctor/serveises/doctor.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth/serveises/auth.service';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [
    SharedModule,
    CommonModule
  ],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css'
})
export class ExamComponent {
  id:any;
  user:any;
  subject:any;
  total:number=0;
  studentInfo:any;
  userSubject:any[]=[];
  validExam:boolean=true;
  showResult:boolean=false;

  constructor(private route:ActivatedRoute, private serv:DoctorService ,private toster:ToastrService ,private authSer:AuthService) { 
    this.id = this.route.snapshot.paramMap.get('id');
    this.getSubject();
    this.GetLogedInUers();
  }

 ngOnInit(): void {
  
 }


 getSubject(){
  this.serv.GetSubjects(this.id).subscribe(res=>{
    this.subject=res
  })
 }
 GetLogedInUers(){
  this.authSer.getRole().subscribe((res:any) => {
   this.user=res;
   this.GetUserData();
  })
}


GetUserData(){
  this.authSer.getStudents(this.user.UserId).subscribe(res=>{
    this.studentInfo = res
    let updatedUserSubjects = res.subjects ? res.subjects : []; 
    this.userSubject = updatedUserSubjects
    this.checkValidExam();
  })
}

getAnswer(event:any){
  let value = event.value,
   questionsIndex = event.source.name
    this.subject.questions[questionsIndex].studentAnswer = value
}

checkValidExam(){
  for(let x in this.userSubject){
      if(this.userSubject[x].id == this.id){
        this.total =this.userSubject[x].degree
            this.validExam = false;
            this.toster.warning("لقد انجزت هذا الاختبار مسبقا","",{
              timeOut:3000,
              progressBar:true,
              progressAnimation:'increasing',
              positionClass:'toast-buttom-right'
            })
      }
  }
}

 delet(index:number){
  this. subject.questions.splice(index,1);
  const model={
    name:this.subject.name,
    questions: this.subject.questions
  }
  this.serv.updateSubjects(model, this.id).subscribe(ser =>{

    this.toster.success('success',"",{
      timeOut:3000,
      progressBar:true,
      progressAnimation:'increasing',
      positionClass:'toast-buttom-right'
    })
  })
}




result(){
  
  this.total=0;
  for( let x in this.subject.questions){
        if(this.subject.questions[x].studentAnswer == this.subject.questions[x].correctAnswer){
           this.total++
        }
  }
  this.showResult=true;
  this.userSubject.push({
      name:this.subject.name,
      id:this.id,
      degree:this.total
    });
 
   const model ={
    username:this.studentInfo.username,
    email: this.studentInfo.email,
    password: this.studentInfo.password,
    subjects: this.userSubject
   }
   this.authSer.upDateStudent(this.user.UserId , model).subscribe(res =>{
    this.toster.success('تم تسجيل النتيجه بنجاح',"",{
      timeOut:3000,
      progressBar:true,
      progressAnimation:'increasing',
      positionClass:'toast-buttom-right'
    })
   })
   
}

}
