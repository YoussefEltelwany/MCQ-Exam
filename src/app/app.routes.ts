import { Routes } from '@angular/router';
import { RouterModule,  } from '@angular/router';
import { LoginComponent } from './auth/component/login/login.component';
import { RegisterComponent } from './auth/component/register/register.component';
import { NewExamComponent } from './doctor/components/new-exam/new-exam.component';
import { StudentsComponent } from './doctor/components/students/students.component';
import { SubjectsComponent } from './doctor/components/subjects/subjects.component';
import { ExamComponent } from './student/components/exam/exam.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
    {path:'login' , component:LoginComponent},
  {path:'register' , component:RegisterComponent},
  {path:'exam/:id' , component:ExamComponent},
  {path:'students' , component:StudentsComponent},
  {path:'subjects' , component:SubjectsComponent},
  {path:'new-exam' , component:NewExamComponent},
  {path:'**' , redirectTo:'exam' , pathMatch:'full'}
];
