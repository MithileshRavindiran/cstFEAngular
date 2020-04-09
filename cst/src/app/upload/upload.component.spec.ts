import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing';

import { UploadComponent } from './upload.component';
import { UploadService } from '../upload.service';
import { Observable, Observer } from 'rxjs';
import { Transactions } from './transactions';

const dummyTransactions : Transactions[] = [
  { reference: '121313', 'accountNumber': '12344', 'description':'description', 'startBalance':123,'mutation':45 , 'endBalance':168 , 'isInvalidRecord' : true, 'reason': 'reason'},
  { reference: '121313', 'accountNumber': '12344', 'description':'description' , 'startBalance':123,'mutation':45 , 'endBalance':168 , 'isInvalidRecord' : true, 'reason': 'reason'}
];

class MockUploadService {
  upload(url) {
    return Observable.create((observer: Observer<Transactions[]>) => {
      observer.next(dummyTransactions);
    });
  }
}


describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;
  let httpMock: HttpTestingController;
  let service: UploadService;
  

  beforeEach(async(() => {
    
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ UploadComponent ],
      providers:[{provide:UploadService, userClass:MockUploadService}]
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(UploadService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
