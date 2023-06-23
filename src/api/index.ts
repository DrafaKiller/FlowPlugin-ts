import { Response, Request, Result } from './types/communication';

export function getRequest(): Request {
  return JSON.parse(process.argv[2]);
}

export function sendResponse(response: Response): void {
  console.log(JSON.stringify(response));
}

export function sendResult(...results: Result[]): void {
  sendResponse({ result: results });
}
