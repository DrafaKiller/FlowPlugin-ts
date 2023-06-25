<h1 align="center">Flow Launcher - Plugin Helper</h1>

<p align="center">
  <a href="https://npmjs.com/package/flow-plugin"><img src="https://img.shields.io/badge/npm-flow--plugin-blue?logo=npm" alt="NPM package"></a>
  <a href="https://github.com/DrafaKiller/FlowPlugin-ts"><img src="https://img.shields.io/badge/GitHub-FlowPlugin--ts-blue?logo=github" alt="GitHub repository"></a>
</p>

<p align="center">A package to help you create plugins for Flow Launcher with Typescript</p>

## Getting Started

**Flow Launcher** is a productivity tool for Windows that allows you to quickly launch applications, search files and folders, and perform web searches. With Flow Launcher, you can create your own plugins to extend its functionality and customize it to your needs.

You can learn more about [Flow Launcher](https://www.flowlauncher.com/).

## Installation

```bash
npm install flow-plugin
```

## Features

- Easy to use
- Type-safe API with type definitions
- Append items to the final result
- Reply to custom actions
- Asynchronous actions

## Usage

Here's a simple example of how to use this package, and just like that you can create your own plugin for Flow Launcher.

Add Flow Launcher's results by using the `add` method, and listen for queries with the `on` method.

It provides an easy-to-use API to create your plugin, and it also provides a type definition file to help you develop your plugin.

```ts
import { Flow } from 'flow-plugin';

const flow = new Flow({ keepOrder: true, icon: 'app.png' });

flow.add({
  title: 'Welcome to Flow Launcher!',
  subtitle: 'Create your own plugin with Typescript!',
  jsonRPCAction: {
    method: 'Flow.Launcher.ChangeQuery',
    parameters: ['- Hello World!', false],
    dontHideAfterAction: true,
  },
});

flow.on('query', ({ prompt }, response) => {
  response.add({
    title: 'Hello World!',
    subtitle: `You searched for "${prompt}"`,
  });
});
```

This is the result of the example above:

<p align="center">
  <img src="https://raw.githubusercontent.com/DrafaKiller/FlowPlugin-ts/v1.0.0/assets/welcome.png" alt="Usage Result">
</p>

<p align="center">Check for more <a href="https://github.com/DrafaKiller/FlowPlugin-ts/tree/v1.0.0/example">examples</a></p>

## Type-safe API

This package provides a type definition file to help you develop your plugin.

If you want to make sure that your plugin is working properly, you can use the `Flow.Launcher.*` interface to check if your plugin is sending the correct actions.

```ts
flow.add({
  title: 'Copy to clipboard',
  jsonRPCAction: {
    method: 'Flow.Launcher.CopyToClipboard',
    parameters: ['Hello World!'],
  } satisfies Flow.Launcher.CopyToClipboard,
});
```

That way you will know exactly what parameters your plugin should send.

Read more about what actions are available and their parameters in the [type definition](https://github.com/DrafaKiller/FlowPlugin-ts/blob/v1.0.0/src/api/types/standard.ts#L50-L177).

## Custom Actions

Actions can be used to perform custom actions when clicking on an item, and support asynchronous operations.

When adding an item, you can specify an action to be executed when the item is clicked, using the `jsonRPCAction` property.

```ts
flow.add({
  title: 'Copy to clipboard',
  jsonRPCAction: {
    method: 'my_custom_action',
    parameters: ['Hello World!'],
  },
});
```

When clicking on an item, you can then listen for the action in the `on` method and reply using a standard action.

```ts
flow.on('my_custom_action', ({ parameters: [ my_value ] }, response) => {
  if (typeof my_value !== 'string') return;

  response.send({
    method: 'Flow.Launcher.CopyToClipboard',
    parameters: [my_value],
  });
});
```

You can only reply <u>once</u>, to actions that are <u>recognized by the launcher</u>, otherwise the launcher will display an error message.

## Definitions & Protocol

- **Request** is a command sent by the launcher to the plugin.
- **Action** is a command sent by the plugin to the launcher.
- **Response** is a collection of results that can be displayed in the launcher.
- **Result** is a single item that can be displayed in the launcher.

When Query is changed:
```
Flow Launcher ---------- [Request] ----------> Plugin
Flow Launcher <--------  [Response] ---------- Plugin
```

When clicking on an item with an Action, if the Action is not recognized:
```
Flow Launcher ---------- [Request] ----------> Plugin
Flow Launcher <--------- [Action] ------------ Plugin
```

## Why use this package?

The goal of this package is to provide a simple yet powerful and complete API to create plugins for Flow Launcher with Typescript.
Ensuring that the type definitions are always up to date and that the API is always working properly.

For the future, this package will also provide a widget-like API to create more complex but seamless plugins.

If you are looking for different solutions, check the following packages:

- [flow-launcher-helper](https://www.npmjs.com/package/flow-launcher-helper) - A simple library to help build plugins for Flow Launcher with Javascript or Typescript.

## Contributing

Contributions are welcome! Please open an [issue](https://github.com/DrafaKiller/FlowPlugin-ts/issues) or [pull request](https://github.com/DrafaKiller/FlowPlugin-ts/pulls) if you find a bug or have a feature request.