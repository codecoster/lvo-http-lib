import { TestBed, inject, tick, async } from '@angular/core/testing';

import { HttpService } from './http.service';
import { Http } from '@angular/http';
import { LoggingModule } from '@lvo/logging';
import { HttpServiceModule } from './http.module';

describe('HttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoggingModule, HttpServiceModule],
      providers: [{provide: Http, useClass: HttpService}]
    });
  });

  it('Http Service should be injectable', inject([HttpService], (service: HttpService) => {
    expect(service).toBeTruthy();
  }));


});
