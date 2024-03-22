import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  
  private API_KEY = 'baeb4b74ccba157a14abf14eadaf3eb3' //normally this should've been stored in some other file, one that will not be pushed to git repo
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather'

  constructor (private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    const params = {
      q: 'Warsaw',
      appid: this.API_KEY,
      units: 'metric', 
    }
    this.httpClient.get(this.apiUrl, { params }).pipe(tap(response => console.log(response))).subscribe()
  }
  
  title = 'weather-app'
}
