import { TestBed } from '@angular/core/testing';

import { UploadService } from './upload.service';
import {HttpEvent, HttpEventType, HttpErrorResponse} from '@angular/common/http';
import {HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing';

describe('UploadService', () => {
  let service: UploadService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[UploadService]
    });
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(UploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


it('be able to retrieve transactions from the API via POST', () => {
  const dummyTransactions = [
    { reference: '121313', 'accountNumber': '12344', 'description':'description' },
    { reference: '121313', 'accountNumber': '12344', 'description':'description' }
  ];

let response: any;
let errResponse: any;
const formData = new FormData();
  service.upload(formData).subscribe(res => response = res);
  const req = httpMock.expectOne('http://localhost:8080/v1/statement/upload');
  expect(req.request.method).toBe("POST");
  req.flush(dummyTransactions);
  
});

afterEach(() => {
  httpMock.verify();
});

});
