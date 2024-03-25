import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, forkJoin, tap } from "rxjs";

const API_KEY = 'baeb4b74ccba157a14abf14eadaf3eb3'
const API_URL = 'https://api.openweathermap.org/data/2.5/weather'
const CITIES = ['Lodz', 'Warsaw', 'Berlin', 'New York', 'London']

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private httpClient: HttpClient) {

    }
    selectCities(): string[] {
        return CITIES.sort(() => Math.random() - 0.5).slice(0,3)
    }

    getWeatherData(selectedCities: string[]): Observable<WeatherData[]> {
        return forkJoin(selectedCities.map(city => this.getWeatherByCity(city)))
    }

    getWeatherByCity(city: string): Observable<WeatherData> {
        const params = {
          q: city,
          appid: API_KEY,
          units: 'metric',
        }
        return this.httpClient.get<WeatherData>(API_URL, { params })
      }
}

export interface WeatherData {
    id: number
    name: string,
    main: {
      temp: number
    }
    weather: [{
      icon: string
      description: string
    }]
}