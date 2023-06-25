import { Action, Request, Response, getRequest, sendAction, sendResponse } from '../api';
import { FlowBuilder } from './builder';
import { FlowScope } from './scope';
import { FlowMethodHandler } from './handler';
import { FlowResponseError } from '../error';
import { AvailableRequest, AvailableResponse, AvailableResult } from '../api/types/extended';

export interface FlowOptions {
  readonly autoRun?: boolean;
  icon?: string;
  keepOrder?: boolean;
}

export class Flow {
  constructor(public readonly options: FlowOptions = {}) {
    if (options.autoRun ?? true) Promise.resolve().then(() => this.run());

    this.read = this.read.bind(this);
    this.add = this.add.bind(this);
    this.send = this.send.bind(this);
    this.on = this.on.bind(this);
    this.run = this.run.bind(this);
  }

  /* -= Properties =- */

  private readonly builder = new FlowBuilder();
  private readonly scope = new FlowScope();

  private response?: Promise<Response | Action>;

  /* -= Basic Methods =- */

  public read() {
    return getRequest();
  }

  public add(...results: AvailableResult[]) {
    this.builder.add(...results);
    return this;
  }

  public send(...responses: AvailableResponse[]) {
    this.builder.send(...responses);
    return this;
  }

  public on<T extends AvailableRequest['method']>(method: T, handler: FlowMethodHandler.All<T>) {
    this.scope.on(method, handler);
    return this;
  }

  /* -= Methods =- */

  private async execute(request: Request) {
    const scopeResponse = await this.scope.run(request);
    const builder = new FlowBuilder(undefined, true);

    if (scopeResponse) {
      if ('method' in scopeResponse) return scopeResponse;
      builder.send(scopeResponse);
    }

    if (this.builder.response) builder.send(this.builder.response);
    const response = builder.response ?? { result: [] };

    var score = response.result.length;
    for (const result of response.result.sort((a, b) => (b.score ?? 0) - (a.score ?? 0))) {
      result.icoPath ??= this.options.icon;
      if (this.options.keepOrder) result.score = (score-- + (result.score ?? 0)) * 100;
    }

    return response;
  }

  public run(request?: Request) {
    if (this.response !== undefined) throw new FlowResponseError();
    this.response = this.execute(request ?? this.read());

    this.response.then((response) => {
      if ('method' in response) sendAction(response);
      else sendResponse(response);
    });

    return this.response;
  }
}

/* -= Exports =- */

import * as api from '../api';
import * as request from '../api/types/standard';

export namespace Flow {
  export const Builder = FlowBuilder;
  export const Scope = FlowScope;

  export type Request = api.Request;
  export type Response = api.Response;
  export type Result = api.Result;
  export type Action = api.Action;

  export namespace Launcher {
    export type Requests = request.Requests;
    export type Actions = request.Actions;

    export type Query = request.Query;
    export type ChangeQuery = request.ChangeQuery;
    export type RestartApp = request.RestartApp;
    export type ShellRun = request.ShellRun;
    export type CopyToClipboard = request.CopyToClipboard;
    export type SaveAppAllSettings = request.SaveAppAllSettings;
    export type SavePluginSettings = request.SavePluginSettings;
    export type ReloadAllPluginData = request.ReloadAllPluginData;
    export type CheckForNewUpdate = request.CheckForNewUpdate;
    export type ShowMsgError = request.ShowMsgError;
    export type ShowMainWindow = request.ShowMainWindow;
    export type ShowMsg = request.ShowMsg;
    export type OpenSettingDialog = request.OpenSettingDialog;
    export type HttpDownloadAsync = request.HttpDownloadAsync;
    export type AddActionKeyword = request.AddActionKeyword;
    export type RemoveActionKeyword = request.RemoveActionKeyword;
    export type ActionKeywordAssigned = request.ActionKeywordAssigned;
    export type LogDebug = request.LogDebug;
    export type LogInfo = request.LogInfo;
    export type LogWarn = request.LogWarn;
    export type LogException = request.LogException;
    export type LoadSettingJsonStorage = request.LoadSettingJsonStorage;
    export type SaveSettingJsonStorage = request.SaveSettingJsonStorage;
    export type OpenDirectory = request.OpenDirectory;
    export type OpenUrl = request.OpenUrl;
    export type OpenAppUri = request.OpenAppUri;
  }
}
