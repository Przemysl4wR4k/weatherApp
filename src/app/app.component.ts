import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, Subject, forkJoin, interval, throwError } from 'rxjs';
import { catchError, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';


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
export class AppComponent implements  OnDestroy {

  selectedCities: string[] = []
  destroy$ = new Subject<void>()

  constructor (private httpClient: HttpClient) {

  }

  startFetching(): void {
    interval(60000).pipe(
      startWith(0),
      tap(() => this.selectCities()),
      catchError((error: HttpErrorResponse) => throwError(() => error)),
      takeUntil(this.destroy$)
    ).subscribe()

    interval(10000).pipe(
      switchMap(() => this.getData()),
      catchError((error: HttpErrorResponse) => throwError(() => error)),
      takeUntil(this.destroy$)
    ).subscribe()
  }
  
  selectCities(): void {
    this.selectedCities = CITIES.sort(() => Math.random() - 0.5).slice(0,3)
    console.log(this.selectedCities)
  }

  getData(): Observable<any> {
    return forkJoin(this.selectedCities.map(city => this.getWeatherByCity(city)))
  }

  getWeatherByCity(city: string): Observable<any> {
    const params = {
      q: city,
      appid: API_KEY,
      units: 'metric', 
    }
    return this.httpClient.get(API_URL, { params }).pipe(tap((response: any) => console.log(response.name)))
  }

  ngOnDestroy(): void {
      this.destroy$.next()
      this.destroy$.complete()
  }

  title = 'weather-app'
}
