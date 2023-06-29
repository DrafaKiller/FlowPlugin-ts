import { Request } from '../api';
import { Query } from '../api/types/standard';
import { FlowBuilder } from './builder';

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
    const callback = this.callback as FlowMethodHandler.Action;
    const response = new FlowActionResponse();

    const result = await callback(request, response);
    if (result) response.reply(result);
    return response.action;
  }
}

/* -= Type Definitions =- */

import { PromiseOr } from '../utils/types';
import { Actions } from '../api/types/standard';
import { AvailableResponse } from '../api/types/extended';
import { FlowQuery } from './query';
import { FlowActionResponse, FlowResponse } from './response';

export namespace FlowMethodHandler {
  export type All<T extends string = any> = T extends 'query' ? Response : Action;

  export type Response = (request: FlowQuery, response: FlowResponse) => PromiseOr<void | AvailableResponse>;

  export type Action = (request: Request, response: FlowActionResponse) => PromiseOr<void | Actions>;
}
