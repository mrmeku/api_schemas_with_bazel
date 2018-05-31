import {Http, ResponseContentType} from '@angular/http';
import {bindNodeCallback, Observable} from 'rxjs';

// A method which takes a Request object and a NodeJS style callback to recieve the Response.
export type NodeCallbackServiceMethod<Request, Response> =
    (request: Request, callback: (error: (Error|null), response?: Response) => void) => void;


/**
 * Wraos a generated NodeCallbackServiceMethods to one which returns an Observable.
 * #ObservablesRule
 */
export function toObservableServiceMethod<Service, Request, Response>(
    service: Service,
    getNodeCallbackServiceMethod: (s: Service) =>
        NodeCallbackServiceMethod<Request, Response>): (request: Request) => Observable<Response> {
  const nodeCallbackServiceMethod: NodeCallbackServiceMethod<Request, Response> =
      getNodeCallbackServiceMethod(service);

  // Take the node js style callback function provided and makes it into an Observable.
  return bindNodeCallback<Request, Response>(nodeCallbackServiceMethod)
      // By default, bindNodeCallback binds this in the callback to the current class.
      .bind(service);
}