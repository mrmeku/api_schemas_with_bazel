import {Component} from '@angular/core';
import {GetCarsRequest, GetCarsResponse, Manufacturer} from 'api_schemas_with_bazel/schema/car_ts_proto';
import {Observable} from 'rxjs';
import {CarService} from './car.service';

@Component({
  selector: 'app-component',
  template: `
    <h3>Lets see some cars!</h3>

    <b>Toyotas:</b> <pre>{{ toyotas | async | json }}</pre>
    <b>Hondas: </b> <pre>{{ hondas  | async | json }}</pre>
  `
})
export class AppComponent {
  readonly toyotas: Observable<GetCarsResponse> =
      this.carService.getCars(GetCarsRequest.create({manufacturer: Manufacturer.TOYOTA}));

  readonly hondas: Observable<GetCarsResponse> =
      this.carService.getCars(GetCarsRequest.create({manufacturer: Manufacturer.HONDA}));

  constructor(private readonly carService: CarService) {}
}
