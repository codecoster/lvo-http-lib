import { inject, TestBed } from '@angular/core/testing';

import { LvoHttpInterceptor } from './http-interceptor.service';

describe('HttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LvoHttpInterceptor
      ]
    });
  });

  it('Http Service should be injectable', inject([LvoHttpInterceptor], (service: LvoHttpInterceptor) => {
    expect(service).toBeTruthy();
  }));

});
