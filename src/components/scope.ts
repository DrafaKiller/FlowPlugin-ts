import { getRequest, Action, Request, Response } from '../api';
import { AvailableRequest } from '../api/types/extended';
import { FlowBuilder } from './builder';
import { FlowMethodHandler } from './handler';

export class FlowScope {
  public readonly handlers: FlowMethodHandler[] = [];

  /* -= Basic Methods =- */

  public get<T extends string>(method: T) {
    return this.handlers.filter((handler) => handler.method === method) as FlowMethodHandler<T>[];
  }

  public on<T extends AvailableRequest['method']>(method: T, handler: FlowMethodHandler.All<T>) {
    this.handlers.push(new FlowMethodHandler(method, handler));
    return this;
  }

  /* -= Methods =- */

  public async run(request?: Request) {
    request ??= getRequest();

    const builder = new FlowBuilder();
    const handlers = this.get(request.method);

    for (const handler of handlers) {
      const response = await handler.call(request);
      if (response) {
        if (request.method !== 'query') return response as Action;
        builder.send(response as Response);
      }
    }

    return builder.response;
  }
}
