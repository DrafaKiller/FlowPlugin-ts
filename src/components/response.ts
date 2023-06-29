import { Action } from '../api';
import { AvailableResponse, AvailableResult } from '../api/types/extended';
import { Actions } from '../api/types/standard';
import { FlowResponseError } from '../error';
import * as FlowActions from './action';

export interface FlowResponse {
  send(...responses: AvailableResponse[]): void;
  add(...result: AvailableResult[]): void;
}

export class FlowActionResponse {
  public action?: Action;

  public reply(action: Actions): void {
    if (this.action !== undefined) throw new FlowResponseError();
    this.action = action;
  }

  /* -= Actions =- */

  public changeQuery(...parameters: Parameters<typeof FlowActions.changeQuery>) {
    return this.reply(FlowActions.changeQuery(...parameters));
  }

  public restartApp(...parameters: Parameters<typeof FlowActions.restartApp>) {
    return this.reply(FlowActions.restartApp(...parameters));
  }

  public shellRun(...parameters: Parameters<typeof FlowActions.shellRun>) {
    return this.reply(FlowActions.shellRun(...parameters));
  }

  public copyToClipboard(...parameters: Parameters<typeof FlowActions.copyToClipboard>) {
    return this.reply(FlowActions.copyToClipboard(...parameters));
  }

  public saveAppAllSettings(...parameters: Parameters<typeof FlowActions.saveAppAllSettings>) {
    return this.reply(FlowActions.saveAppAllSettings(...parameters));
  }

  public savePluginSettings(...parameters: Parameters<typeof FlowActions.savePluginSettings>) {
    return this.reply(FlowActions.savePluginSettings(...parameters));
  }

  public reloadAllPluginData(...parameters: Parameters<typeof FlowActions.reloadAllPluginData>) {
    return this.reply(FlowActions.reloadAllPluginData(...parameters));
  }

  public checkForNewUpdate(...parameters: Parameters<typeof FlowActions.checkForNewUpdate>) {
    return this.reply(FlowActions.checkForNewUpdate(...parameters));
  }

  public showMsgError(...parameters: Parameters<typeof FlowActions.showMsgError>) {
    return this.reply(FlowActions.showMsgError(...parameters));
  }

  public showMainWindow(...parameters: Parameters<typeof FlowActions.showMainWindow>) {
    return this.reply(FlowActions.showMainWindow(...parameters));
  }

  public showMsg(...parameters: Parameters<typeof FlowActions.showMsg>) {
    return this.reply(FlowActions.showMsg(...parameters));
  }

  public openSettingDialog(...parameters: Parameters<typeof FlowActions.openSettingDialog>) {
    return this.reply(FlowActions.openSettingDialog(...parameters));
  }

  public httpDownloadAsync(...parameters: Parameters<typeof FlowActions.httpDownloadAsync>) {
    return this.reply(FlowActions.httpDownloadAsync(...parameters));
  }

  public addActionKeyword(...parameters: Parameters<typeof FlowActions.addActionKeyword>) {
    return this.reply(FlowActions.addActionKeyword(...parameters));
  }

  public removeActionKeyword(...parameters: Parameters<typeof FlowActions.removeActionKeyword>) {
    return this.reply(FlowActions.removeActionKeyword(...parameters));
  }

  public actionKeywordAssigned(...parameters: Parameters<typeof FlowActions.actionKeywordAssigned>) {
    return this.reply(FlowActions.actionKeywordAssigned(...parameters));
  }

  public loadSettingJsonStorage(...parameters: Parameters<typeof FlowActions.loadSettingJsonStorage>) {
    return this.reply(FlowActions.loadSettingJsonStorage(...parameters));
  }

  public saveSettingJsonStorage(...parameters: Parameters<typeof FlowActions.saveSettingJsonStorage>) {
    return this.reply(FlowActions.saveSettingJsonStorage(...parameters));
  }

  public openDirectory(...parameters: Parameters<typeof FlowActions.openDirectory>) {
    return this.reply(FlowActions.openDirectory(...parameters));
  }

  public openUrl(...parameters: Parameters<typeof FlowActions.openUrl>) {
    return this.reply(FlowActions.openUrl(...parameters));
  }

  public openAppUri(...parameters: Parameters<typeof FlowActions.openAppUri>) {
    return this.reply(FlowActions.openAppUri(...parameters));
  }
}
