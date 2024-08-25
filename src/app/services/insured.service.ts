import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Insured } from '../interfaces/insured';

@Injectable({providedIn: 'root'})

@Injectable({
  providedIn: 'root'
})
export class InsuredService {
  private endPoint: string  = environment.endPoint;
  private apiURL: string = this.endPoint +"api/Insured/"

  constructor(private http:HttpClient) { }

  getInsured(id?:number):Observable<Insured[]>{
    return id ? this.http.get<Insured[]>(`${this.apiURL}GetInsured/?id=${id}`) 
              : this.http.get<Insured[]>(`${this.apiURL}GetInsured/`);
  }

  addInsured(insured: Insured):Observable<Insured>{
    return this.http.post<Insured>(`${this.apiURL}AddInsured`, insured);
  }

  updateInsured(id: number, insured: Insured):Observable<Insured>{
    return this.http.patch<Insured>(`${this.apiURL}UpdateInsured/${id}`, insured);
  }

  deleteInsured(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiURL}DeleteInsured/${id}`);
  }

  

}
