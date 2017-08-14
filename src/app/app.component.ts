import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Logger, LogManager } from '@lvo/logging';
import { User } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  private logger: Logger;

  title = 'app works!';

  public user: User;

  public error: Response;

  public errorMessage = '';


  constructor(private http: HttpClient,
    logManager: LogManager) {
    this.logger = logManager.getLogger(this);
    this.logger.debug('construction');
  }


  subscribeToUser(uri): void {
    this.reset();

    this.getUser(uri).subscribe(user => {
      this.user = user;
      this.logger.info('user received: ', this.user);
    });


  }

  reset() {
    this.user = null;
    this.error = null;
    this.errorMessage = null;
  }


  getUser(uri): Observable<User> {

    return this.http
      .get<User>(uri, { observe: 'response' })
      .do(response => {
        this.logger.debug('do check response status code', response);
        this.errorMessage =
          `This is a hacky validation message:
              Unfortunately something went wrong: [code=${response.statusText}] [Text=${response.status}]`;
      })
      .map(response => response.body)
      .catch(this.handleError);

  }


  testSuccess() {
    this.subscribeToUser('assets/user.json');
  }

  test404Error() {
    this.subscribeToUser('assets/user1.json');
  }

  testValidationError() {
    this.subscribeToUser('assets/userError.json');
  }


  private handleError = (error: Response) => {
    // Do messaging and error handling here
    this.logger.error('HTTP-Error', error);
    this.error = error;

    return Observable.throw(error);
  }

}



