import { Action } from '../api';
import * as standard from '../api/types/standard';

function action<T extends Action>(
  method: T['method'],
  parameters?: T['parameters'],
  options: { dontHideAfterAction?: T['dontHideAfterAction'] } = {}
) {
  return {
    method: method,
    parameters: parameters ?? [],
    dontHideAfterAction: options.dontHideAfterAction ?? false,
  } as T;
}

export function changeQuery(
  query: string,
  options: { requery?: boolean; dontHideAfterAction?: boolean } = {}
): standard.ChangeQuery {
  return action('Flow.Launcher.ChangeQuery', [query, options.requery ?? false], options);
}

export function restartApp(): standard.RestartApp {
  return action('Flow.Launcher.RestartApp');
}

export function shellRun(
  cmd: string,
  options: { filename?: string; dontHideAfterAction?: boolean } = {}
): standard.ShellRun {
  return action('Flow.Launcher.ShellRun', [cmd, options.filename ?? 'cmd.exe'], options);
}

export function copyToClipboard(
  text: string,
  options: { dontHideAfterAction?: boolean } = {}
): standard.CopyToClipboard {
  return action('Flow.Launcher.CopyToClipboard', [text], options);
}

export function saveAppAllSettings(options: { dontHideAfterAction?: boolean } = {}): standard.SaveAppAllSettings {
  return action('Flow.Launcher.SaveAppAllSettings', [], options);
}

export function savePluginSettings(options: { dontHideAfterAction?: boolean } = {}): standard.SavePluginSettings {
  return action('Flow.Launcher.SavePluginSettings', [], options);
}

export function reloadAllPluginData(options: { dontHideAfterAction?: boolean } = {}): standard.ReloadAllPluginData {
  return action('Flow.Launcher.ReloadAllPluginData', [], options);
}

export function checkForNewUpdate(options: { dontHideAfterAction?: boolean } = {}): standard.CheckForNewUpdate {
  return action('Flow.Launcher.CheckForNewUpdate', [], options);
}

export function showMsgError(
  title: string,
  options: { subTitle?: string; dontHideAfterAction?: boolean } = {}
): standard.ShowMsgError {
  return action('Flow.Launcher.ShowMsgError', [title, options.subTitle ?? ''], options);
}

export function showMainWindow(options: { dontHideAfterAction?: boolean } = {}): standard.ShowMainWindow {
  return action('Flow.Launcher.ShowMainWindow', [], options);
}

export function showMsg(
  title: string,
  options: {
    subTitle?: string;
    iconPath?: string;
    dontHideAfterAction?: boolean;
  } = {}
): standard.ShowMsg {
  return action('Flow.Launcher.ShowMsg', [title, options.subTitle ?? '', options.iconPath ?? ''], options);
}

export function openSettingDialog(options: { dontHideAfterAction?: boolean } = {}): standard.OpenSettingDialog {
  return action('Flow.Launcher.OpenSettingDialog', [], options);
}

export function httpDownloadAsync(
  url: string,
  path: string,
  options: { token?: string; dontHideAfterAction?: boolean } = {}
): standard.HttpDownloadAsync {
  return action('Flow.Launcher.HttpDownloadAsync', [url, path, options.token ?? undefined], options);
}

export function addActionKeyword(
  pluginId: string,
  actionKeyword: string,
  options: { dontHideAfterAction?: boolean } = {}
): standard.AddActionKeyword {
  return action('Flow.Launcher.AddActionKeyword', [pluginId, actionKeyword], options);
}

export function removeActionKeyword(
  pluginId: string,
  actionKeyword: string,
  options: { dontHideAfterAction?: boolean } = {}
): standard.RemoveActionKeyword {
  return action('Flow.Launcher.RemoveActionKeyword', [pluginId, actionKeyword], options);
}

export function actionKeywordAssigned(
  actionKeyword: string,
  options: { dontHideAfterAction?: boolean } = {}
): standard.ActionKeywordAssigned {
  return action('Flow.Launcher.ActionKeywordAssigned', [actionKeyword], options);
}

export function loadSettingJsonStorage(
  options: { dontHideAfterAction?: boolean } = {}
): standard.LoadSettingJsonStorage {
  return action('Flow.Launcher.LoadSettingJsonStorage', [], options);
}

export function saveSettingJsonStorage(
  options: { dontHideAfterAction?: boolean } = {}
): standard.SaveSettingJsonStorage {
  return action('Flow.Launcher.SaveSettingJsonStorage', [], options);
}

export function openDirectory(
  path: string,
  options: { file?: string; dontHideAfterAction?: boolean } = {}
): standard.OpenDirectory {
  return action('Flow.Launcher.OpenDirectory', [path, options.file ?? undefined], options);
}

export function openUrl(
  url: string,
  options: { inPrivate?: boolean; dontHideAfterAction?: boolean } = {}
): standard.OpenUrl {
  return action('Flow.Launcher.OpenUrl', [url, options.inPrivate ?? false], options);
}

export function openAppUri(appUri: string, options: { dontHideAfterAction?: boolean } = {}): standard.OpenAppUri {
  return action('Flow.Launcher.OpenAppUri', [appUri], options);
}

export { action as custom };
export default action;
