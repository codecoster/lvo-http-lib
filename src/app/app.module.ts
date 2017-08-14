import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoggingModule } from '@lvo/logging';
import { AppComponent } from './app.component';
import { LvoHttpInterceptorModule } from './core/http-interceptor.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LvoHttpInterceptorModule,
    LoggingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
