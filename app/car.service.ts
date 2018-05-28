import {Headers, Http, ResponseContentType} from '@angular/http';
import * as Schema from 'api_schemas_with_bazel/schema/car_ts_proto';
import {bindNodeCallback, Observable, Subject} from 'rxjs';

type ServiceMethod<Request, Response> =
    (request: Request, callback: (error: (Error|null), response?: Response) => void) => void;

export class CarService {
  readonly getCars: (request: Schema.GetCarsRequest) => Observable<Schema.GetCarsResponse> =
      this.wrapCarServiceMethod('getCars', ({getCars}) => getCars);

  constructor(private readonly http: Http) {}

  private wrapCarServiceMethod<Request, Response>(
      methodName: string,
      getServiceMethod: (s: Schema.CarService) => ServiceMethod<Request, Response>):
      (request: Request) => Observable<Response> {
    const carService = Schema.CarService.create((_, requestData, callback) => {
      const headers = new Headers();
      headers.set('Content-Type', 'application/x-protobuf');

      this.http
          .post(
              `/cars?method=${methodName}`, new Blob([requestData]),
              {headers, responseType: ResponseContentType.ArrayBuffer})
          .subscribe(
              response => callback(null, new Uint8Array(response.arrayBuffer())),
              error => callback(error));
    });

    return bindNodeCallback<Request, Response>(getServiceMethod(carService)).bind(carService);
  }
}
