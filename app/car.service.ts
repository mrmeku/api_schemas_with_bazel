import {Http, ResponseContentType} from '@angular/http';
import * as Schema from 'api_schemas_with_bazel/schema/car_ts_proto';
import {bindNodeCallback, Observable} from 'rxjs';

/**
 * A wrapper around the generated Schema.GetCarsRequest which transforms the generated
 * NodeCallbackServiceMethods to ObservableServiceMethods.
 * #ObservablesRule
 */
export class CarService {
  readonly getCars: ObservableServiceMethod<Schema.GetCarsRequest, Schema.GetCarsResponse> =
      this.toObservableServiceMethod('getCars', ({getCars}) => getCars);

  constructor(private readonly http: Http) {}

  // Converts a method which takes a NodeJS style callback into one which returns an observable.
  private toObservableServiceMethod<Request, Response>(
      methodName: string,
      getNodeCallbackServiceMethod:
          (s: Schema.CarService) => NodeCallbackServiceMethod<Request, Response>):
      ObservableServiceMethod<Request, Response> {
    const generatedCarService: Schema.CarService = this.generateCarService(methodName);

    const nodeCallbackServiceMethod: NodeCallbackServiceMethod<Request, Response> =
        getNodeCallbackServiceMethod(generatedCarService);

    // Take the node js style callback function provided and makes it into an Observable.
    return bindNodeCallback<Request, Response>(nodeCallbackServiceMethod)
        // By default, bindNodeCallback binds this in the callback to the current class.
        .bind(generatedCarService);
  }

  // Create a car service for a particular endpoint.
  private generateCarService(methodName: string): Schema.CarService {
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

// A method which takes a Request object and a NodeJS style callback to recieve the Response.
type NodeCallbackServiceMethod<Request, Response> =
    (request: Request, callback: (error: (Error|null), response?: Response) => void) => void;

// A method which takes a Request object and returns an Observable of the Response.
export type ObservableServiceMethod<Request, Response> = (request: Request) => Observable<Response>;