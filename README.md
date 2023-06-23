<h1 align="center">Flow Launcher - Plugin</h1>

[![npm package](https://img.shields.io/badge/npm-flow--plugin-blue?logo=npm)](https://npmjs.com/package/flow-plugin)
[![GitHub repository](https://img.shields.io/badge/GitHub-FlowPlugin--ts-blue?logo=github)](https://github.com/DrafaKiller/FlowPlugin-ts)

<p align="center">A package to help you create plugins for Flow Launcher with Typescript</p>

## Installation

```bash
npm install flow-plugin
```

## Usage

```ts
import { Flow } from "flow-plugin";

const flow = new Flow();

flow.add({
	title: 'Welcome to Flow!',
	subtitle: 'Create your own plugin with Typescript!',
});

flow.on('query', (request, response) => {
	const query = request.parameters[0];

	response.add({
		title: 'Hello World!',
		subtitle: `You searched for "${query}"`,
	});
});
```