import {Http, ResponseContentType} from '@angular/http';
import * as Schema from 'api_schemas_with_bazel/schema/car_ts_proto';
import {bindNodeCallback, Observable} from 'rxjs';

import {toObservableServiceMethod} from './observable-service-method';

export class CarService {
  readonly getCars: (request: Schema.GetCarsRequest) => Observable<Schema.GetCarsResponse> =
      toObservableServiceMethod(this.createCarServiceForMethod('getCars'), ({getCars}) => getCars);

  constructor(private readonly http: Http) {}

  private createCarServiceForMethod(methodName: string): Schema.CarService {
    return Schema.CarService.create((_, requestData, callback) => {
      const binaryBlob = new Blob([requestData]);  // Ensure our request is sent as binary.

      this.http
          .post(
              `http://localhost:8080/cars?method=${methodName}`, binaryBlob,
              {responseType: ResponseContentType.ArrayBuffer})
          .subscribe(
              response => callback(null, new Uint8Array(response.arrayBuffer())),
              error => callback(error));
    });
  }
}