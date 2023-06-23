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

## Usage

Here's a simple example of how to use this package, and just like that you can create your own plugin for Flow Launcher.

Add Flow Launcher's results by using the `add` method, and listen for queries with the `on` method.

It provides an easy-to-use API to create your plugin, and it also provides a type definition file to help you develop your plugin.

```ts
import Flow from 'flow-plugin';

const flow = new Flow();

flow.add({
  title: 'Welcome to Flow!',
  subtitle: 'Create your own plugin with Typescript!',
  icoPath: 'app.png',
});

flow.on('query', (request, response) => {
  const query = request.parameters[0];

  response.add({
    title: 'Hello World!',
    subtitle: `You searched for "${query}"`,
    icoPath: 'app.png',
  });
});
```

This is the result of the example above:

![Usage Result](https://raw.githubusercontent.com/DrafaKiller/FlowPlugin-ts/main/assets/welcome.png)

## Contributing

Contributions are welcome! Please open an [issue](https://github.com/DrafaKiller/FlowPlugin-ts/issues) or [pull request](https://github.com/DrafaKiller/FlowPlugin-ts/pulls) if you find a bug or have a feature request.