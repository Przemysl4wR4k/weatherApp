import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { interval } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';


const API_KEY = 'baeb4b74ccba157a14abf14eadaf3eb3' //normally this should've been stored in some other file, one that will not be pushed to git repo
const API_URL = 'https://api.openweathermap.org/data/2.5/weather'
const CITIES = ['Lodz', 'Warsaw', 'Berlin', 'New York', 'London']

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  selectedCities: string[] = []  

  constructor (private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    interval(60000).pipe(
      tap(() => this.selectRandomCities())
    ).subscribe()

    const params = {
      q: 'Warsaw',
      appid: API_KEY,
      units: 'metric', 
    }
    this.httpClient.get(API_URL, { params }).pipe(tap(response => console.log(response))).subscribe()
  }
  
  selectRandomCities() {
    this.selectedCities = CITIES.sort(() => Math.random() - 0.5).slice(0,3)
    console.log(this.selectedCities)
  }
  
  title = 'weather-app'
}
