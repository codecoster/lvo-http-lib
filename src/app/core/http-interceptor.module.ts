import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LoggingModule } from '@lvo/logging';
import { LvoHttpInterceptor } from './http-interceptor.service';


@NgModule({
  declarations: [],
  imports: [
    LoggingModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LvoHttpInterceptor,
    multi: true,
  }],
  exports: []

})
export class LvoHttpInterceptorModule {

}
