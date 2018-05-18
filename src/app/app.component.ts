import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ForecastService } from './forecast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isReady: boolean = false;
  public hasError: boolean = false;
  public cities: string[];
  public activeIndex: number = 0;
  public selectedWeather: any = {
    city: null,
    weather: null
  };
  public imageUrl: string = 'assets/images/img1_opt.jpg';
  private imageIndex: number = 1;
  private weather: any;

  constructor(private forecastService: ForecastService) { }

  public ngOnInit(): void {
    this.initData('https://cors-anywhere.herokuapp.com/');
    Observable.timer(1000, 30000).subscribe((x) => {
      if (!this.imageIndex || this.imageIndex > 6) {
        this.imageIndex = 1;
      }
      this.imageUrl = 'assets/images/img' + this.imageIndex++ + '_opt.jpg';
    });
  }

  public initData(cors: string) {
    this.isReady = false;
    this.hasError = false;
    this.forecastService.getAllForecast(cors).then((forecasts) => {
      this.weather = forecasts;
      this.cities = [];
      this.weather.map((forecast) => this.cities.push(forecast.city));
      if (this.cities.length) {
        this.setCity('Улаанбаатар');
        this.cities.splice(this.cities.indexOf(this.selectedWeather.city), 1);
        this.cities.sort();
        this.cities.unshift(this.selectedWeather.city);
        this.isReady = true;
      }
    }).catch(() => this.hasError = true);
  }

  public setCity(city: string) {
    let filtered = this.weather.filter((weather) => {
      return city === weather.city;
    });
    if (filtered.length) {
      this.selectedWeather = filtered[0];
    }
  }

  public setActive(event) {
    this.activeIndex = event;
  }
}
