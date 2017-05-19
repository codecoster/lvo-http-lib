import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { LoggingModule } from '@lvo/logging';
import { AppComponent } from './app.component';
import { HttpService } from './core/http.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LoggingModule
  ],
  providers: [ {provide: Http, useClass: HttpService}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
