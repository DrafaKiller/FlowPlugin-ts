import { Request, Action } from '../api';
import { Actions, Query } from '../api/types/standard';
import { FlowBuilder } from './builder';
import { PromiseOr } from '../utils/types';
import { FlowResponseError } from '../error';
import { AvailableResponse, AvailableResult } from '../api/types/extended';

export class FlowMethodHandler<T extends string = string> {
  constructor(public readonly method: T, private readonly callback: FlowMethodHandler.All<T>) {}

  /* -= Basic Methods =- */

  public async call(request: Request) {
    if (request.method !== this.method && this.method !== 'any') return;
    return this.execute(request);
  }

  private async execute(request: Request) {
    if (request.method === 'query') return this.executeResponse(request as Query);
    return this.executeAction(request);
  }

  /* -= Methods =- */

  private async executeResponse(request: Query) {
    const callback = this.callback as FlowMethodHandler.Response;
    const builder = new FlowBuilder();
    const result = await callback(
      {
        ...(request as Query),
        prompt: request.parameters[0] as string,
      },
      {
        send: builder.send,
        add: builder.add,
      }
    );
    if (result) builder.send(result);
    return builder.response;
  }

  private async executeAction(request: Request) {
    function send(action: Action) {
      if (sent) throw new FlowResponseError();
      sent = action;
    }

    const callback = this.callback as FlowMethodHandler.Action;
    var sent: Action | undefined;

    const result = await callback(request, { send: send });
    if (result) send(result);
    return sent;
  }
}

/* -= Type Definitions =- */

import * as api from '../api';

export namespace FlowMethodHandler {
  export type All<T extends string = any> = T extends 'query' ? Response : Action;

  export type Response = (
    request: Query & { prompt: string },
    response: {
      send: (...responses: AvailableResponse[]) => void;
      add: (...result: AvailableResult[]) => void;
    }
  ) => PromiseOr<void | AvailableResponse>;

  export type Action = (
    request: Request,
    response: {
      send: (action: Actions) => void;
    }
  ) => PromiseOr<void | Actions>;
}
