import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }



  creatSubjects(model:any) : Observable<any>{
    return this.http.post(environment.apiUrl + 'subjects',model);
  }



  updateSubjects(model:any , id:number) : Observable<any>{
    return this.http.put(environment.apiUrl + 'subjects/' + id,model);
  }



  GetAllSubjects(): Observable<any>{
    return this.http.get(environment.apiUrl + 'subjects');
  }

  GetSubjects(id:any): Observable<any>{
    return this.http.get(environment.apiUrl + 'subjects/' + id);
  }


  deletSubjet(id:number) : Observable<any>{
    return this.http.delete(environment.apiUrl + 'subjects/' + id);
  }

}
