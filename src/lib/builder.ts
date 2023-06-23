import { sendResponse } from '../api';
import { Response, Result } from '../api/types/communication';
import { merge } from './utils/string';

export class FlowBuilder {
  constructor(public response?: Response) {
    this.add = this.add.bind(this);
    this.send = this.send.bind(this);
    this.run = this.run.bind(this);
  }

  /* -= Methods =- */

  public add(...results: Result[]): void {
    this.send({ result: results });
  }

  public send(...responses: Response[]): void {
    for (const response of responses) {
      if (this.response === undefined) {
        this.response = response;
        continue;
      }
      this.response = merge(this.response, response);
    }
  }

  public run(): void {
    if (this.response !== undefined) sendResponse(this.response);
  }
}
