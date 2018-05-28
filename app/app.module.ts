import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {CarService} from './car.service';

@NgModule({
  imports: [BrowserModule, CommonModule, HttpModule],
  providers: [CarService],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
}
