import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Http, RequestOptions } from '@angular/http';


import { Logger, LogManager } from '@lvo/logging';
import { User } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  private _logger: Logger;

  title = 'app works!';

  public user: User;

  public error: Response;

  public errorMessage = '';


  constructor(private http: Http,
              private _logManager: LogManager) {
    this._logger = _logManager.getLogger(this);
    this._logger.debug('construction');
  }



  subscribeToUser(uri): void {
    this.reset();

    this.getUser(uri).subscribe(user => {
      this.user = user;
      this._logger.info('user received: ', this.user);
    });


  }

  reset() {
    this.user = null;
    this.error = null;
    this.errorMessage = null;
  }


  getUser(uri): Observable<User> {

    return this.http
      .get(uri)
      .map(response => response.json())
      .do(response => {
        this._logger.debug('do check response status code', response);

        if (!response.status){
          if (response.messages){
            this.errorMessage =
              `This is a hacky validation message: Unfortunately something went wrong: [code=${response.messages[0].text}] [Text=${response.messages[0].code}]`;
          }
        }


      }).catch(this.handleError);

  }


  testSuccess(){
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
    this._logger.error('HTTP-Error', error);
    this.error = error;

    return Observable.throw(error);
  }

}



