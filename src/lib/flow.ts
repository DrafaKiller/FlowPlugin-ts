import { getRequest, sendResponse } from '../api';
import { Request, Response, Result } from '../api/types/communication';
import { FlowRequest } from '../api/types/request';
import { FlowBuilder } from './builder';
import { FlowHandler, FlowScope } from './scope';
import { PromiseOr, awaitOr } from './utils/async';

export interface FlowOptions {
  autoRun?: boolean;
}

export class Flow {
  constructor(options?: FlowOptions) {
    if (options?.autoRun ?? true) Promise.resolve().then(() => this.run());

    this.add = this.add.bind(this);
    this.send = this.send.bind(this);
    this.on = this.on.bind(this);
    this.run = this.run.bind(this);
  }

  /* -= Properties =- */

  private readonly builder = new FlowBuilder();
  private readonly scope = new FlowScope();

  private response?: PromiseOr<Response | undefined>;

  /* -= Methods =- */

  public read(): Request {
    return getRequest();
  }

  public add(...results: Result[]): this {
    this.builder.add(...results);
    return this;
  }

  public send(...responses: Response[]): this {
    this.builder.send(...responses);
    return this;
  }

  public on<T extends FlowRequest.MethodsOr<string>>(method: T, handler: FlowHandler<FlowRequest.GetAny<T>>): this {
    this.scope.on(method, handler);
    return this;
  }

  public run(request?: Request): PromiseOr<Response | undefined> {
    if (this.response !== undefined) throw new Error('Flow has already sent a response');

    this.response = this.scope.run({ request: request, builder: this.builder });

    return awaitOr(this.response, (response) => {
      if (response !== undefined) sendResponse(response);
      return response;
    });
  }
}

/* -= Exports =- */

import { Request as eRequest, Response as eResponse, Result as eResult } from '../api/types/communication';

export namespace Flow {
  export const builder = FlowBuilder;
  export const scope = FlowScope;

  export interface Request extends eRequest {}
  export interface Response extends eResponse {}
  export interface Result extends eResult {}
}
