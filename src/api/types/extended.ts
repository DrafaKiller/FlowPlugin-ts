import { Modify } from '../../utils/types';
import { Response, Request, Result, Action } from './core';
import { Requests, Actions } from './standard';

export type AvailableResponse = Modify<Response, { result: AvailableResult[] }>;

export type AvailableRequest = Modify<Request, { method: Requests['method'] | (string & {}) }>;

export type AvailableResult = Modify<Result, { jsonRPCAction?: AvailableAction }>;

export type AvailableAction = Modify<Action, { method: Actions['method'] | (string & {}) }>;
