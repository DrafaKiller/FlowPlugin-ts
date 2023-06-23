/*
	-= Official API Documentation - v1.15.0 =-
  
  Defined: https://github.com/Flow-Launcher/Flow.Launcher/blob/v1.15.0/Flow.Launcher.Plugin/Interfaces/IPublicAPI.cs
*/

import { Action, Request } from './communication';

export type Requests = Query;

export type Actions =
  | ChangeQuery
  | CheckForNewUpdate
  | CloseApp
  | CopyToClipboard
  | HideApp
  | OpenAppUri
  | OpenDirectory
  | OpenSettingDialog
  | OpenUrl
  | ReloadAllPluginData
  | RestartApp
  | SaveAppAllSettings
  | SavePluginSettings
  | ShellRun
  | ShowApp
  | ShowLoadingBar
  | ShowMainWindow
  | ShowMsg
  | ShowMsgError
  | StartLoadingBar
  | StopLoadingBar;

/* -= Requests =- */

export interface Query extends Request {
  method: 'query';
  parameters: [string];
}

/* -= Actions =- */

export interface ChangeQuery extends Action {
  method: 'Flow.Launcher.ChangeQuery';
  parameters: [string, boolean?];
}

export interface CheckForNewUpdate extends Action {
  method: 'Flow.Launcher.CheckForNewUpdate';
  parameters: [];
}

export interface CloseApp extends Action {
  method: 'Flow.Launcher.CloseApp';
  parameters: [];
}

export interface CopyToClipboard extends Action {
  method: 'Flow.Launcher.CopyToClipboard';
  parameters: [string];
}

export interface HideApp extends Action {
  method: 'Flow.Launcher.HideApp';
  parameters: [];
}

export interface OpenAppUri extends Action {
  method: 'Flow.Launcher.OpenAppUri';
  parameters: [string];
}

export interface OpenDirectory extends Action {
  method: 'Flow.Launcher.OpenDirectory';
  parameters: [string, string?];
}

export interface OpenSettingDialog extends Action {
  method: 'Flow.Launcher.OpenSettingDialog';
  parameters: [];
}

export interface OpenUrl extends Action {
  method: 'Flow.Launcher.OpenUrl';
  parameters: [string, boolean?];
}

export interface ReloadAllPluginData extends Action {
  method: 'Flow.Launcher.ReloadAllPluginData';
  parameters: [];
}

export interface RestartApp extends Action {
  method: 'Flow.Launcher.RestartApp';
  parameters: [];
}

export interface SaveAppAllSettings extends Action {
  method: 'Flow.Launcher.SaveAppAllSettings';
  parameters: [];
}

export interface SavePluginSettings extends Action {
  method: 'Flow.Launcher.SavePluginSettings';
  parameters: [];
}

export interface ShellRun extends Action {
  method: 'Flow.Launcher.ShellRun';
  parameters: [string, string?];
}

export interface ShowApp extends Action {
  method: 'Flow.Launcher.ShowApp';
  parameters: [];
}

export interface ShowLoadingBar extends Action {
  method: 'Flow.Launcher.ShowLoadingBar';
  parameters: [];
}

export interface ShowMainWindow extends Action {
  method: 'Flow.Launcher.ShowMainWindow';
  parameters: [];
}

export interface ShowMsg extends Action {
  method: 'Flow.Launcher.ShowMsg';
  parameters: [string, string?, string?];
}

export interface ShowMsgError extends Action {
  method: 'Flow.Launcher.ShowMsgError';
  parameters: [string, string?];
}

export interface StartLoadingBar extends Action {
  method: 'Flow.Launcher.StartLoadingBar';
  parameters: [];
}

export interface StopLoadingBar extends Action {
  method: 'Flow.Launcher.StopLoadingBar';
  parameters: [];
}
