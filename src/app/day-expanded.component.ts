import { Component, Input } from '@angular/core';

import { ForecastService } from './forecast.service';
import { Phenomena } from './phenomena';

@Component({
  selector: 'day-expanded',
  templateUrl: './day-expanded.component.html',
  styleUrls: ['../assets/css/weather-icons.min.css']
})
export class DayExpandedComponent {
  @Input()
  public weather: Phenomena;

  constructor(private forecastService: ForecastService) { }

  public getDayName(date: string) {
    return this.forecastService.getMnDayName(date);
  }

  public getWeatherIcon(phenoId: number, isDay: boolean = true) {
    let icon = this.forecastService.getWeatherIcon(phenoId);
    return icon ? (isDay ? icon.dayTime : icon.nightTime) : null;
  }
}
