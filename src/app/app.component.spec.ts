import { async, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { Http } from '@angular/http';
import { HttpService } from './core/http.service';
import { LoggingModule } from '@lvo/logging';
import { HttpServiceModule } from './core/http.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LoggingModule, HttpServiceModule],
      providers: [{provide: Http, useClass: HttpService}],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));


  it('should http-get user with name Pan', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const comp = fixture.componentInstance;

    comp.getUser('assets/user.json').subscribe(user => {
      expect(user).toBeTruthy();
      expect(user.name).toBe('Pan');
    });

  }));


  it('should http-get user with error 404', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const comp = fixture.componentInstance;


    comp.getUser('assets/user1.json').subscribe(
      x => {
        console.log('onNext: %s', x)
        fail('expected error');
      },
      e => {
        expect(e.status).toBe(404);
        console.log('onError: %s', e)
      },
      () => {
        console.log('onCompleted');
        fail('expected error');
      });
  }))

});


