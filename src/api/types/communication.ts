/*
	-= Official API Documentation - v1.15.0 =-
  
  Defined:
    - https://github.com/Flow-Launcher/Flow.Launcher/blob/v1.15.0/Flow.Launcher.Core/Plugin/JsonPRCModel.cs
    - https://github.com/Flow-Launcher/Flow.Launcher/blob/v1.15.0/Flow.Launcher.Plugin/Result.cs

  Implemented:
    - https://github.com/Flow-Launcher/Flow.Launcher/blob/v1.15.0/Flow.Launcher.Core/Plugin/JsonRPCPlugin.cs
*/

/* -= Basic =- */

export interface Response {
  result: Result[];
  settingsChange?: Record<string, unknown>;
  debugMessage?: string;
}

export interface Result {
  title: string;
  subtitle?: string;
  icoPath?: string;
  score?: number;

  copyText?: string;
  autoCompleteText?: string;

  progressBar?: number;
  progressBarColor?: string;

  titleToolTip?: string;
  subtitleToolTip?: string;

  jsonRPCAction?: Partial<Action>;
  settingsChange?: Record<string, unknown>;
}

export interface Request {
  method: string;
  parameters: unknown[];
  settings?: Record<string, unknown>;
}

export interface Action extends Request {
  dontHideAfterAction?: boolean;
}
