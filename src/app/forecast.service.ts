import { Injectable} from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';
import { Parser } from 'xml2js'

import { WeatherIcon } from './weather-icon';
import { Phenomena } from './phenomena';

const WEATHER_ICONS = [
  new WeatherIcon(3, 'wi wi-cloudy', 'wi wi-cloudy', 'Үүлэрхэг'),
  new WeatherIcon(5, 'wi wi-day-sunny-overcast', 'wi wi-night-partly-cloudy', 'Багавтар үүлтэй'),
  new WeatherIcon(7, 'wi wi-day-sunny-overcast', 'wi wi-night-partly-cloudy', 'Багавтар үүлтэй'),
  new WeatherIcon(9, 'wi wi-day-cloudy-windy', 'wi wi-night-alt-cloudy-windy', 'Үүлшинэ'),
  new WeatherIcon(10, 'wi wi-day-cloudy-windy', 'wi wi-night-alt-cloudy-windy', 'Үүлшинэ'),
  new WeatherIcon(20, 'wi wi-day-cloudy-high', 'wi wi-night-alt-cloudy-high', 'Үүл багаснa'),
  new WeatherIcon(21, 'wi wi-day-showers', 'wi wi-night-showers', 'Бороо шиврэнэ'),
  new WeatherIcon(22, 'wi wi-day-showers', 'wi wi-night-showers', 'Бороо шиврэнэ'),
  new WeatherIcon(23, 'wi wi-day-snow', 'wi wi-night-alt-snow', 'Ялимгүй цас'),
  new WeatherIcon(24, 'wi wi-day-snow', 'wi wi-night-alt-snow', 'Ялимгүй цас'),
  new WeatherIcon(27, 'wi wi-day-sleet', 'wi wi-night-alt-sleet', 'Ялимгүй хур тунадас'),
  new WeatherIcon(28, 'wi wi-day-sleet', 'wi wi-night-alt-sleet', 'Ялимгүй хур тунадас'),
  new WeatherIcon(60, 'wi wi-day-rain', 'wi wi-night-alt-rain', 'Бага зэргийн бороо'),
  new WeatherIcon(61, 'wi wi-day-rain', 'wi wi-night-alt-rain', 'Бороо'),
  new WeatherIcon(63, 'wi wi-day-rain', 'wi wi-night-alt-rain', 'Их бороо'),
  new WeatherIcon(64, 'wi wi-day-sleet', 'wi wi-night-alt-sleet', 'Бага зэргийн хур тунадас'),
  new WeatherIcon(65, 'wi wi-day-sleet', 'wi wi-night-alt-sleet', 'Хур тунадас'),
  new WeatherIcon(70, 'wi wi-day-snow', 'wi wi-night-alt-snow', 'Бага зэргийн цас'),
  new WeatherIcon(71, 'wi wi-day-snow', 'wi wi-night-alt-snow', 'Цас'),
  new WeatherIcon(73, 'wi wi-day-snow', 'wi wi-night-alt-snow', 'Их цас'),
  new WeatherIcon(75, 'wi wi-day-snow-thunderstorm', 'wi wi-night-alt-snow-thunderstorm', 'Аадар их цас'),
  new WeatherIcon(80, 'wi wi-day-thunderstorm', 'wi wi-night-alt-thunderstorm', 'Хүчтэй аадар бороо'),
  new WeatherIcon(90, 'wi wi-day-rain', 'wi wi-night-alt-rain', 'Түр зуурын бороо'),
  new WeatherIcon(95, 'wi wi-day-sleet-storm', 'wi wi-night-alt-sleet-storm', 'Аадар хур тунадас')
];

const DAYS = {
  sunday: 'Ням',
  monday: 'Даваа',
  tuesday: 'Мягмар',
  wednesday: 'Лхагва',
  thursday: 'Пүрэв',
  friday: 'Баасан',
  saturday: 'Бямба'
};

const URL_API = 'http://tsag-agaar.gov.mn/forecast_xml';

@Injectable()
export class ForecastService {
  private parser: Parser;

  constructor(private http: Http) {
    this.parser = new Parser({trim: true, explicitArray: false});
  }

  public getAllForecast(): Promise<any[]> {
    return this.http.get(URL_API).toPromise()
      .then((response) => {
        let body = response.text();
        let list = [];
        let parsedData = this.parser.parseString(body, (err, result) => {
          if (!err && result && result.xml) {
            let forecasts = result.xml.forecast5day;
            if (forecasts) {
              forecasts.map((forecast) => list.push({
                city: forecast.city,
                weather: forecast.data.weather.map((weather) => {
                  return new Phenomena(
                    weather.date,
                    weather.phenoIdDay,
                    weather.phenoIdNight,
                    weather.phenoDay,
                    weather.phenoNight,
                    weather.temperatureDay,
                    weather.temperatureNight,
                    weather.windDay,
                    weather.windNight
                  );
                })
              }));
            }
          }
        });
        return list;
      })
      .catch(this.handleError);
  }

  public getMnDayName(date: string) {
    return DAYS[moment(date, 'YYYY-MM-DD').format('dddd').toLowerCase()];
  }

  public getWeatherIcon(phenoId: number): WeatherIcon {
    let weatherIcon = WEATHER_ICONS.filter(
      (icon) => Number(icon.phenoId) === Number(phenoId)
    );
    if (weatherIcon.length) {
      return weatherIcon[0];
    }
    return null;
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
