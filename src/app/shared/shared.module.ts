import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatrialModule } from  './matrial.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  
  declarations: [],
  imports: [
    MatrialModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule, 
    
    
  ],
  exports:[
    HttpClientModule, 
    RouterModule,
    MatrialModule,
    ReactiveFormsModule,
    
  ]
})
export class SharedModule { }
