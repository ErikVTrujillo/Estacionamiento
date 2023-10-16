import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ownAccountModify } from "../models/ownAccountModify";
import { Observable, delay, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CuentaService{
    API_URI = 'http://localhost:3000/api';

    sendContactMessage(formData: any): Observable<boolean> {

        return of(true).pipe(delay(2000));
      }
}