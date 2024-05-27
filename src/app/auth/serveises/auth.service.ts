import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }
    
  user = new Subject()

  createUsers(model:any ):Observable<any>{
    return this.http.post(environment.apiUrl + 'students' , model)
  }

   login(model:any):Observable<any>{
     return this.http.put(environment.apiUrl + 'login/1' , model)
   }
  getUser(type:string):Observable<any>{
    return this.http.get(environment.apiUrl + type)
  }

  getStudents(id : number):Observable<any>{
    return this.http.get(environment.apiUrl +'students/' +id )
  }

  upDateStudent(id : number,model :any):Observable<any>{
    return this.http.put(environment.apiUrl +'students/' +id , model )
  }

  getRole():Observable<any>{
    return this.http.get(environment.apiUrl +'login/1')
  }
  
}
