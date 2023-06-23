import { getRequest, sendResponse } from '../api';
import { Request, Response, Result } from '../api/types/communication';
import { Launcher } from '../api/types/request';
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

  public on<T extends Flow.Launcher.Requests['method'] | (string & {})>(
    method: T,
    handler: FlowHandler<Flow.Launcher.Requests & { method: T } & Request>
  ): this {
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

import * as eCommunication from '../api/types/communication';
import * as eLauncher from '../api/types/request';
import { Or, Weak } from './utils/types';

export namespace Flow {
  export const builder = FlowBuilder;
  export const scope = FlowScope;

  export type Request = eCommunication.Request;
  export type Response = eCommunication.Response;
  export type Result = eCommunication.Result;
  export type Action = eCommunication.Action;

  export namespace Launcher {
    export type Requests = eLauncher.Requests;
    export type Actions = eLauncher.Actions;

    export type Query = eLauncher.Query;
    export type ChangeQuery = eLauncher.ChangeQuery;
    export type CheckForNewUpdate = eLauncher.CheckForNewUpdate;
    export type CloseApp = eLauncher.CloseApp;
    export type CopyToClipboard = eLauncher.CopyToClipboard;
    export type HideApp = eLauncher.HideApp;
    export type OpenAppUri = eLauncher.OpenAppUri;
    export type OpenDirectory = eLauncher.OpenDirectory;
    export type OpenSettingDialog = eLauncher.OpenSettingDialog;
    export type OpenUrl = eLauncher.OpenUrl;
    export type ReloadAllPluginData = eLauncher.ReloadAllPluginData;
    export type RestartApp = eLauncher.RestartApp;
    export type SaveAppAllSettings = eLauncher.SaveAppAllSettings;
    export type SavePluginSettings = eLauncher.SavePluginSettings;
    export type ShellRun = eLauncher.ShellRun;
    export type ShowApp = eLauncher.ShowApp;
    export type ShowLoadingBar = eLauncher.ShowLoadingBar;
    export type ShowMainWindow = eLauncher.ShowMainWindow;
    export type ShowMsg = eLauncher.ShowMsg;
    export type ShowMsgError = eLauncher.ShowMsgError;
    export type StartLoadingBar = eLauncher.StartLoadingBar;
    export type StopLoadingBar = eLauncher.StopLoadingBar;
  }
}
