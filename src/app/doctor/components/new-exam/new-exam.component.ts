import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../serveises/doctor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-exam',
  standalone: true,
  imports: [
    SharedModule,
    CommonModule
  ],
  templateUrl: './new-exam.component.html',
  styleUrl: './new-exam.component.css'
})
export class NewExamComponent {

  name = new FormControl("");
  questionForm!:FormGroup;
  questions:any[]=[];
  correctId:any;
  subjectNAme:any ="";
  strppreIndex =0;
  startAdd:boolean = false;
  preview:boolean = false;
  id:any;


  constructor(private fb:FormBuilder , private toster:ToastrService ,private ser:DoctorService){}
   
  ngOnInit(): void {
    this.CreateForm();
    
  }

  CreateForm(){
    this.questionForm = this.fb.group({
      questin:['' , [Validators.required]],
      answer1:['' , [Validators.required]],
      answer2:['' , [Validators.required]],
      answer3:['' , [Validators.required]],
      answer4:['' , [Validators.required]],
    });
  }


  createQuestions(){
       if(this.correctId){
        const model ={
          question:this.questionForm.value.questin,
          answer1:this.questionForm.value.answer1,
          answer2:this.questionForm.value.answer2,
          answer3:this.questionForm.value.answer3,
          answer4:this.questionForm.value.answer4,
          correctAnswer:this.questionForm.value[this.correctId]
        }
        this.questions.push(model);
        this.questionForm.reset();
       }else{
          this.toster.error('please select correct answer',"",{
            timeOut:3000,
            progressBar:true,
            progressAnimation:'increasing',
            positionClass:'toast-buttom-right'
          })
       }
       
  }

   

  getCorrect(event:any){
    this.correctId= event.value
  }


 
  start(){
     if(this.name.value == ""){
         this.toster.error('please enter exam name',"",{
           timeOut:3000,
           progressBar:true,
           progressAnimation:'increasing',
           positionClass:'toast-buttom-right'
         })
     }else{
       this.startAdd =true;
       this.subjectNAme = this.name.value;
     }
    if(this.startAdd){
       this.strppreIndex=1
    }
  }

  resetForm(){
    this.questionForm.reset();
  }

  cancel(){
    this.questionForm.reset();
    this.questions =[];
    this.subjectNAme="";
    this.name.reset();
    this.startAdd =false;
    this.strppreIndex=0;
  }

  submit(){
    const model={
      name:this.subjectNAme,
      questions:this.questions
    }
    if(this.preview){
       this.strppreIndex= 2;
    }else{
      this.ser.creatSubjects(model).subscribe((ser:any)=>{
        this.preview=true;
        this.id = ser.id;
        this.toster.success('success',"",{
          timeOut:3000,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-buttom-right'
        })
      })
    }
    
  }


 


  delet(index:number){
    this.questions.splice(index,1);
    const model={
      name:this.subjectNAme,
      questions:this.questions
    }
    this.ser.updateSubjects(model, this.id).subscribe(ser =>{

      this.toster.success('success',"",{
        timeOut:3000,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-buttom-right'
      })
    })
  }
}
