import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation  } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';  
import { catchError, map } from 'rxjs/operators';  
import { Transactions } from './transactions';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UploadComponent implements OnInit {

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
  files  = [];
  displayedColumns: string[] = ['reference', 'description', 'reason', 'isInvalidRecord'];
  isUploadDisabled = false;  
  transactions: Transactions[];

  constructor(private uploadService: UploadService) { }

  ngOnInit(): void {
  }

  uploadFile(file) {  
    const formData = new FormData();  
    formData.append('file', file.data);  
    file.inProgress = true;  
    this.uploadService.upload(formData).pipe(  
      map(event => {  
        return this.getEvent(event, file);  
      }),  
      catchError((error: HttpErrorResponse) => {  
        file.inProgress = false;  
        return of(`${file.data.name} upload failed.`);  
      })).subscribe((event: any) => {  
        if (typeof (event) === 'object') { 
          this.isUploadDisabled = true; 
          this.transactions = event.body as Transactions[];
        }  
      });  
  }

  private getEvent(event, file: any) {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        file.progress = Math.round(event.loaded * 100 / event.total);
        break;
      case HttpEventType.Response:
        return event;
    }
  }

  private uploadFiles() {  
    this.fileUpload.nativeElement.value = '';  
    this.files.forEach(file => {  
      this.uploadFile(file);  
    });  
}

onClick() {  
  const fileUpload = this.fileUpload.nativeElement;
  fileUpload.onchange = () => {  
  for (let index = 0; index < fileUpload.files.length; index++)  
  {  
   const file = fileUpload.files[index];  
   this.files.push({ data: file, inProgress: false, progress: 0});  
  }  
    this.uploadFiles();  
  };  
  fileUpload.click();  
}

}
