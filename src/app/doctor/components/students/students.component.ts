import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { AuthService } from '../../../auth/serveises/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    SharedModule,
    CommonModule
  ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {
  
  dataSource:any;
  dataTable:any;
  displayedColumns:any;
  
  constructor( private ser:AuthService) {
    this.displayedColumns = ['position', 'name', 'subjectName', 'degree']; 
   }

 ngOnInit(): void {
  this.getstudents();
 }


 getstudents(){
  this.ser.getUser('students').subscribe(res =>{
      this.dataSource = res?.map((student:any)=>{

        if(student?.subjects){
          return student?.subjects?.map((sub:any)=>{
            return {
              name:student.username,
              subjectName:sub.name,
              degree:sub.degree
            }
          })
        }else{
          return [{
            name:student.username,
            subjectName:"-",
            degree:"-"
          }]
        }
        
      })
      this.dataTable=[]
      this.dataSource.forEach((item:any) => {
        item.forEach((subItem:any)=>{
          this.dataTable.push(
            {
              name:subItem.name,
              subjectName:subItem.subjectName,
              degree:subItem.degree
            }
          )
        })
      });
  
    })
 }
}
