/*
	-= Official API Documentation - v1.15.0 =-
  
  Defined: https://github.com/Flow-Launcher/Flow.Launcher/blob/v1.15.0/Flow.Launcher.Plugin/Interfaces/IPublicAPI.cs
*/

import { Action, Request } from './core';

export type Requests = Query | ContextMenu;

export type Actions =
  | ChangeQuery
  | RestartApp
  | ShellRun
  | CopyToClipboard
  | SaveAppAllSettings
  | SavePluginSettings
  | ReloadAllPluginData
  | CheckForNewUpdate
  | ShowMsgError
  | ShowMainWindow
  | ShowMsg
  | OpenSettingDialog
  | HttpDownloadAsync
  | AddActionKeyword
  | RemoveActionKeyword
  | ActionKeywordAssigned
  | LogDebug
  | LogInfo
  | LogWarn
  | LogException
  | LoadSettingJsonStorage
  | SaveSettingJsonStorage
  | OpenDirectory
  | OpenUrl
  | OpenAppUri;

/* -= Requests =- */

export interface Query extends Request {
  method: 'query';
  parameters: [prompt: string];
}

export interface ContextMenu extends Request {
  method: 'context_menu';
  parameters: unknown[];
}

/* -= Actions =- */

export interface ChangeQuery extends Action {
  method: 'Flow.Launcher.ChangeQuery';
  parameters: [query: string, requery?: boolean];
}

export interface RestartApp extends Action {
  method: 'Flow.Launcher.RestartApp';
  parameters: [];
}

export interface ShellRun extends Action {
  method: 'Flow.Launcher.ShellRun';
  parameters: [cmd: string, filename?: string];
}

export interface CopyToClipboard extends Action {
  method: 'Flow.Launcher.CopyToClipboard';
  parameters: [text: string];
}

export interface SaveAppAllSettings extends Action {
  method: 'Flow.Launcher.SaveAppAllSettings';
  parameters: [];
}

export interface SavePluginSettings extends Action {
  method: 'Flow.Launcher.SavePluginSettings';
  parameters: [];
}

export interface ReloadAllPluginData extends Action {
  method: 'Flow.Launcher.ReloadAllPluginData';
  parameters: [];
}

export interface CheckForNewUpdate extends Action {
  method: 'Flow.Launcher.CheckForNewUpdate';
  parameters: [];
}

export interface ShowMsgError extends Action {
  method: 'Flow.Launcher.ShowMsgError';
  parameters: [title: string, subTitle?: string];
}

export interface ShowMainWindow extends Action {
  method: 'Flow.Launcher.ShowMainWindow';
  parameters: [];
}

export interface ShowMsg extends Action {
  method: 'Flow.Launcher.ShowMsg';
  parameters:
    | [title: string, subTitle?: string, iconPath?: string]
    | [title: string, subTitle?: string, iconPath?: string, useMainWindowAsOwner?: boolean];
}

export interface OpenSettingDialog extends Action {
  method: 'Flow.Launcher.OpenSettingDialog';
  parameters: [];
}

export interface HttpDownloadAsync extends Action {
  method: 'Flow.Launcher.HttpDownloadAsync';
  parameters: [url: string, filePath: string, token?: string];
}

export interface AddActionKeyword extends Action {
  method: 'Flow.Launcher.AddActionKeyword';
  parameters: [pluginId: string, newActionKeyword: string];
}

export interface RemoveActionKeyword extends Action {
  method: 'Flow.Launcher.RemoveActionKeyword';
  parameters: [pluginId: string, oldActionKeyword: string];
}

export interface ActionKeywordAssigned extends Action {
  method: 'Flow.Launcher.ActionKeywordAssigned';
  parameters: [actionKeyword: string];
}

export interface LogDebug extends Action {
  method: 'Flow.Launcher.LogDebug';
  parameters: [className: string, message: string, methodName?: string];
}

export interface LogInfo extends Action {
  method: 'Flow.Launcher.LogInfo';
  parameters: [className: string, message: string, methodName?: string];
}

export interface LogWarn extends Action {
  method: 'Flow.Launcher.LogWarn';
  parameters: [className: string, message: string, methodName?: string];
}

export interface LogException extends Action {
  method: 'Flow.Launcher.LogException';
  parameters: [className: string, message: string, error: Error, methodName?: string];
}

export interface LoadSettingJsonStorage extends Action {
  method: 'Flow.Launcher.LoadSettingJsonStorage';
  parameters: [];
}

export interface SaveSettingJsonStorage extends Action {
  method: 'Flow.Launcher.SaveSettingJsonStorage';
  parameters: [];
}

export interface OpenDirectory extends Action {
  method: 'Flow.Launcher.OpenDirectory';
  parameters: [directoryPath: string, fileNameOrFilePath?: string];
}

export interface OpenUrl extends Action {
  method: 'Flow.Launcher.OpenUrl';
  parameters: [url: string, inPrivate?: boolean];
}

export interface OpenAppUri extends Action {
  method: 'Flow.Launcher.OpenAppUri';
  parameters: [appUri: string];
}
