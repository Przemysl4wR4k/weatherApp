import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-city-weather',
  standalone: true,
  imports: [],
  templateUrl: './city-weather.component.html',
  styleUrl: './city-weather.component.scss'
})
export class CityWeatherComponent {
  @Input() cityName!: string
}
