import { Component, Input } from '@angular/core';
import { WeatherData } from '../app.service';

@Component({
  selector: 'app-city-weather',
  standalone: true,
  imports: [],
  templateUrl: './city-weather.component.html',
  styleUrl: './city-weather.component.scss'
})
export class CityWeatherComponent {
  @Input() data!: WeatherData

  redirectToOpenWeatherMap(): void {
    const url = `https://openweathermap.org/city/${this.data.id}`;
    window.open(url, '_blank');
  }
}
