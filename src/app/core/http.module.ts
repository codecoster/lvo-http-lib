import { NgModule } from '@angular/core';
import { LoggingModule } from '@lvo/logging';
import { HttpModule } from '@angular/http';
import { HttpService } from './http.service';


@NgModule({
  declarations: [],
  imports: [LoggingModule, HttpModule],
  providers: [HttpService],
  exports: []

})
export class HttpServiceModule {

}
