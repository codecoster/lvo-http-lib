import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';

import { Logger, LogManager } from '@lvo/logging';
import { UUID } from 'angular2-uuid';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class LvoHttpInterceptor implements HttpInterceptor {

  private logger: Logger;

  public handleError = (error: Observable<HttpResponse<any>>) => {
    // Do messaging and error handling here
    this.logger.error('HTTP-Error', error);
    return Observable.throw(error);
  }

  constructor( @Optional() logManager: LogManager) {
    if (logManager) {
      this.logger = logManager.getLogger(this);
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const uuid: string = UUID.UUID();
    const startDate = new Date();

    this.logRequest(uuid, startDate, req);


    return next.handle(req)
      .do(event => { // intercept chain an log the responses
        if (event instanceof HttpResponse) {
          this.logResponse(event, uuid, startDate.getTime());
        }
      }
      ).catch(this.handleError);
  }

  private logRequest(uuid: string, startDate: Date, req: HttpRequest<any>): void {
    if (this.logger) {
      try {
        this.logger.info(`[cid=${uuid}]`, `[start=${startDate.toLocaleTimeString()}]`, req.method, '-->', req.url);
      } catch (e) {
        this.logger.error('Fehler beim Versuch Request Metriken zu loggen', e);
      }

    }
  }


  private logResponse(r: HttpResponse<any>, uuid: string, startTime: number): void {
    if (this.logger) {

      try {
        const endDate = new Date();
        const endTime = endDate.getTime();
        let size: any = r.headers.get('content-length');

        const payload = JSON.stringify(r.body);
        if (!size) {
          size = payload.length;
        }

        this.logger.info(`[cid=${uuid}]`, `[ende=${endDate.toLocaleTimeString()}]`,
          `[response=${r.toString()}]`, `[payload=${payload}]`, `[time=${endTime - startTime} ms]`, `[size=${size} bytes]`);
      } catch (e) {
        this.logger.error('Error occured, when trying to log the Response metrics', e);
      }
    }
  }
}

