import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { TypeaheadModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { DayComponent } from './day.component';
import { DayExpandedComponent } from './day-expanded.component';
import { ForecastService } from './forecast.service'

@NgModule({
  declarations: [
    AppComponent,
    DayComponent,
    DayExpandedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TypeaheadModule.forRoot()
  ],
  providers: [ForecastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
