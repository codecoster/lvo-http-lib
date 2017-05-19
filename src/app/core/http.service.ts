import { Injectable } from '@angular/core';

import {
  Headers,
  Http,
  Request,
  RequestMethod,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  XHRBackend
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Logger, LogManager } from '@lvo/logging';
import { UUID } from 'angular2-uuid';


@Injectable()
export class HttpService extends Http {

  private logger: Logger;

  constructor(backend: XHRBackend, defaultOptions: RequestOptions, private logManager?: LogManager) {
    super(backend, defaultOptions);
    if (logManager) {
      this.logger = logManager.getLogger(this);
    }
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {

    const uuid: string = UUID.UUID();
    const startDate = new Date();

    this.logRequest(uuid, startDate, url);

    return super.request(url, options)
      .do( // intercept chain an log the responses
        r =>
          this.logResponse(r, uuid, startDate.getTime())
      ).catch(this.handleError);
  }


  getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    options.headers.append('Content-Type', 'application/json');
    return options;
  }

  private logRequest(uuid: string, startDate: Date, url: string | Request): void {
    if (this.logger) {
      try {
        if (typeof url === 'string') {
          this.logger.info(`[cid=${uuid}]`, `[start=${startDate.getTime()}]`, url);
        } else if (url instanceof Request) {
          this.logger.info(`[cid=${uuid}]`, `[start=${startDate.toLocaleTimeString()}]`, RequestMethod[url.method], '-->', url.url);
        }
      } catch (e) {
        this.logger.error('Fehler beim Versuch Request Metriken zu loggen', e);
      }

    }
  }


  private logResponse(r: Response, uuid: string, startTime: number): void {
    if (this.logger) {


      try {
        const endDate = new Date();
        const endTime = endDate.getTime();
        let size: any = r.headers.get('content-length');

        const payload = r.text();
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

  public handleError = (error: Response) => {
    // Do messaging and error handling here
    this.logger.error('HTTP-Error', error);
    return Observable.throw(error);
  }


}

