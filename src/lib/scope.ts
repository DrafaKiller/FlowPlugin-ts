import { getRequest } from '../api';
import { Request, Response, Result } from '../api/types/communication';
import { FlowRequest } from '../api/types/request';
import { FlowBuilder } from './builder';
import { PromiseOr, awaitOr } from './utils/async';

export class FlowScope {
  constructor(public readonly methods: Record<string, FlowHandler> = {}) {
    this.on = this.on.bind(this);
    this.run = this.run.bind(this);
  }

  /* -= Methods =- */

  public on<T extends FlowRequest.MethodsOr<string>>(method: T, handler: FlowHandler<FlowRequest.GetAny<T>>): this {
    this.methods[method] = handler as FlowHandler;
    return this;
  }

  public run({ request, builder }: { request?: Request; builder?: FlowBuilder }): PromiseOr<Response | undefined> {
    request ??= getRequest();
    builder ??= new FlowBuilder();

    const handler = this.methods[request.method];

    const result = handler?.(request, {
      add: builder.add,
      send: builder.send,
    });

    return awaitOr(result, () => builder!.response);
  }
}

/* -= Type Definitions =- */

export type FlowHandler<T extends Request = Request> = (
  request: T,
  response: FlowHandlerControl
) => PromiseOr<Response | void>;

export type FlowHandlerControl = {
  send: (...responses: Response[]) => void;
  add: (...result: Result[]) => void;
};
