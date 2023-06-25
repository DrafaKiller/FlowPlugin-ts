import { Response, Request, Result, Action } from './types/core';
export { Response, Request, Result, Action };

export function getRequest(): Request {
  return JSON.parse(process.argv[2]);
}

export function sendResponse(response: Response): void {
  console.log(JSON.stringify(response));
}

export function sendResult(...results: Result[]): void {
  sendResponse({ result: results });
}

export function sendAction(action: Action): void {
  console.log(JSON.stringify(action));
}
