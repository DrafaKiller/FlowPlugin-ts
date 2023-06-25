import { sendResponse } from '../api';
import { Response, Result } from '../api/types/core';
import { AvailableResult } from '../api/types/extended';
import { merge } from '../utils/string';

/**
 * A builder used to create a response for Flow Launcher.
 *
 * Makes it easier to add results and merge responses to the final response.
 *
 * - **Result** is a single item that can be displayed in the launcher.
 * - **Response** is a collection of results that can be displayed in the launcher.
 */
export class FlowBuilder {
  constructor(public response?: Response, public reverse: boolean = false) {
    this.add = this.add.bind(this);
    this.send = this.send.bind(this);
    this.run = this.run.bind(this);
  }

  /**
   * Adds one or more results to the response.
   *
   * **Result** is a single item that can be displayed in the launcher.
   */
  public add(...results: AvailableResult[]): void {
    this.send({ result: results });
  }

  /**
   * Adds one or more responses to the response.
   *
   * If the response already has a response, the new response will be merged with the existing one.
   *
   * **Response** is a collection of results that can be displayed in the launcher.
   */
  public send(...responses: Response[]): void {
    for (const response of responses) {
      if (this.response === undefined) {
        this.response = response;
        continue;
      }
      this.response = this.reverse ? merge(response, this.response) : merge(this.response, response);
    }
  }

  /**
   * Sends the response to the launcher.
   */
  public run(): void {
    if (this.response !== undefined) sendResponse(this.response);
  }
}
