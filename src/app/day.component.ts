import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ForecastService } from './forecast.service';
import { Phenomena } from './phenomena';

@Component({
  selector: 'day',
  templateUrl: './day.component.html',
  styleUrls: ['../assets/css/weather-icons.min.css']
})
export class DayComponent {
  @Input()
  public weather: Phenomena;
  @Output()
  public changeActive: EventEmitter<number> = new EventEmitter<number>();
  @Input()
  private index: number;

  constructor(private forecastService: ForecastService) { }

  public getDayName(date: string) {
    return this.forecastService.getMnDayName(date);
  }

  public getWeatherIcon(phenoId: number, isDay: boolean = true) {
    let icon = this.forecastService.getWeatherIcon(phenoId);
    return icon ? (isDay ? icon.dayTime : icon.nightTime) : null;
  }

  public setActive() {
    this.changeActive.emit(this.index);
  }
}
