import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';  
import { map } from  'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) { }

  public upload(formData) {

    return this.httpClient.post<any>(environment.apiUrl, formData, {  
        reportProgress: true,  
        observe: 'events'  
      });  
  }
}
