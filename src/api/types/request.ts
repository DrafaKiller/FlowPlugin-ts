/*
	-= Official API Documentation - v1.15.0 =-
  
  Defined: https://github.com/Flow-Launcher/Flow.Launcher/blob/v1.15.0/Flow.Launcher.Plugin/Interfaces/IPublicAPI.cs
*/

import { Request } from './communication';

export type FlowRequest<Method extends FlowRequest.Methods = any> = FlowRequest.Get<Method>;

export namespace FlowRequest {
  export type All =
    | Query
    | ChangeQuery
    | RestartApp
    | SaveAppAllSettings
    | CheckForNewUpdate
    | ShellRun
    | CloseApp
    | HideApp
    | ShowApp
    | ShowMsg
    | GetTranslation
    | OpenSettingDialog
    | GetAllPlugins
    | StartLoadingBar
    | StopLoadingBar
    | ReloadAllPluginData;

  export type Methods = ExtractName<All['method']>;

  export type Get<Method extends Methods> = Extract<All, { method: `Flow.Launcher.${Method}` | Method }>;

  /* -= Utilities =- */

  export type MethodsOr<Name extends string> = Methods | (Name & {});

  export type GetAny<Method extends string> = Method extends Methods ? Get<Method> : Request & { method: Method };

  type ExtractName<T extends string> = T extends `Flow.Launcher.${infer name}` ? name : T;

  /* -= Basic Methods =- */

  export interface Query extends Request {
    method: 'query';
    parameters: [string];
  }

  export interface ChangeQuery extends Request {
    method: 'Flow.Launcher.ChangeQuery';
    parameters: [string, boolean?];
  }

  export interface RestartApp extends Request {
    method: 'Flow.Launcher.RestartApp';
    parameters: [string, boolean?, boolean?];
  }

  export interface SaveAppAllSettings extends Request {
    method: 'Flow.Launcher.SaveAppAllSettings';
    parameters: [];
  }

  export interface CheckForNewUpdate extends Request {
    method: 'Flow.Launcher.CheckForNewUpdate';
    parameters: [];
  }

  export interface ShellRun extends Request {
    method: 'Flow.Launcher.ShellRun';
    parameters: [string, string?];
  }

  export interface CloseApp extends Request {
    method: 'Flow.Launcher.CloseApp';
    parameters: [];
  }

  export interface HideApp extends Request {
    method: 'Flow.Launcher.HideApp';
    parameters: [];
  }

  export interface ShowApp extends Request {
    method: 'Flow.Launcher.ShowApp';
    parameters: [];
  }

  export interface ShowMsg extends Request {
    method: 'Flow.Launcher.ShowMsg';
    parameters: [string, string?];
  }

  export interface GetTranslation extends Request {
    method: 'Flow.Launcher.GetTranslation';
    parameters: [string];
  }

  export interface OpenSettingDialog extends Request {
    method: 'Flow.Launcher.OpenSettingDialog';
    parameters: [];
  }

  export interface GetAllPlugins extends Request {
    method: 'Flow.Launcher.GetAllPlugins';
    parameters: [];
  }

  export interface StartLoadingBar extends Request {
    method: 'Flow.Launcher.StartLoadingBar';
    parameters: [];
  }

  export interface StopLoadingBar extends Request {
    method: 'Flow.Launcher.StopLoadingBar';
    parameters: [];
  }

  export interface ReloadAllPluginData extends Request {
    method: 'Flow.Launcher.ReloadAllPluginData';
    parameters: [];
  }
}
