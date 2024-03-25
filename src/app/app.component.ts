import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject, interval, throwError } from 'rxjs';
import { catchError, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { CityWeatherComponent } from './city-weather/city-weather.component';
import { LoaderComponent } from './loader/loader.component';
import { AppService, WeatherData } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CityWeatherComponent, LoaderComponent],
  providers: [AppService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements  OnDestroy {

  selectedCities: string[] = []
  destroy$ = new Subject<void>()
  citiesData: WeatherData[] = []
  started: boolean = false

  constructor (private appService: AppService) {
  }

  startFetching(): void {
    this.started = true

    interval(60000).pipe(
      startWith(0),
      tap(() => this.selectedCities = this.appService.selectCities()),
      catchError((error: HttpErrorResponse) => throwError(() => error)),
      takeUntil(this.destroy$)
    ).subscribe()

    interval(10000).pipe(
      startWith(0),
      switchMap(() => this.appService.getWeatherData(this.selectedCities)),
      tap((citiesData: WeatherData[]) => this.citiesData = citiesData),
      catchError((error: HttpErrorResponse) => throwError(() => error)),
      takeUntil(this.destroy$)
    ).subscribe()
  }

  ngOnDestroy(): void {
      this.destroy$.next()
      this.destroy$.complete()
  }

  title = 'weather-app'
}