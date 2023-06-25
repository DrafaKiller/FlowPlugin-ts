export class FlowResponseError extends Error {
  constructor() {
    super('Flow has already sent a response');
  }
}
