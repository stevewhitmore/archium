import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

@Component({
  "selector": "app-toolbar",
  "template": "<div></div>"
})
export class FakeAppToolbarComponent {}

@Component({
  "selector": "ngx-toasta",
  "template": "<div></div>"
})
export class FakeToastaComponent {}

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        FakeAppToolbarComponent,
        FakeToastaComponent
      ]
    })
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
