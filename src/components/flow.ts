import { Action, Request, Response, getRequest, sendAction, sendResponse } from '../api';
import { AvailableRequest, AvailableResponse, AvailableResult } from '../api/types/extended';
import { FlowResponseError } from '../error';
import { FlowBuilder } from './builder';
import { FlowScope } from './scope';
import { FlowMethodHandler } from './handler';

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

  public run(request?: Request) {
    if (this.response !== undefined) throw new FlowResponseError();
    this.response = this.execute(request ?? this.read());

    this.response.then((response) => {
      if ('method' in response) sendAction(response);
      else sendResponse(response);
    });

    return this.response;
  }

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
}

/* -= Exports =- */

import * as api from '../api';
import * as standard from '../api/types/standard';
import * as actions from './action';

export namespace Flow {
  export const Builder = FlowBuilder;
  export const Scope = FlowScope;

  export type Request = api.Request;
  export type Response = api.Response;
  export type Result = api.Result;
  export type Action = api.Action;

  export const Actions = actions;

  export namespace Launcher {
    export type Requests = standard.Requests;
    export type Actions = standard.Actions;

    export type Query = standard.Query;
    export type ChangeQuery = standard.ChangeQuery;
    export type RestartApp = standard.RestartApp;
    export type ShellRun = standard.ShellRun;
    export type CopyToClipboard = standard.CopyToClipboard;
    export type SaveAppAllSettings = standard.SaveAppAllSettings;
    export type SavePluginSettings = standard.SavePluginSettings;
    export type ReloadAllPluginData = standard.ReloadAllPluginData;
    export type CheckForNewUpdate = standard.CheckForNewUpdate;
    export type ShowMsgError = standard.ShowMsgError;
    export type ShowMainWindow = standard.ShowMainWindow;
    export type ShowMsg = standard.ShowMsg;
    export type OpenSettingDialog = standard.OpenSettingDialog;
    export type HttpDownloadAsync = standard.HttpDownloadAsync;
    export type AddActionKeyword = standard.AddActionKeyword;
    export type RemoveActionKeyword = standard.RemoveActionKeyword;
    export type ActionKeywordAssigned = standard.ActionKeywordAssigned;
    export type LogDebug = standard.LogDebug;
    export type LogInfo = standard.LogInfo;
    export type LogWarn = standard.LogWarn;
    export type LogException = standard.LogException;
    export type LoadSettingJsonStorage = standard.LoadSettingJsonStorage;
    export type SaveSettingJsonStorage = standard.SaveSettingJsonStorage;
    export type OpenDirectory = standard.OpenDirectory;
    export type OpenUrl = standard.OpenUrl;
    export type OpenAppUri = standard.OpenAppUri;
  }
}
