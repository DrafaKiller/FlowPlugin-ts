import { Flow } from '../src';

const flow = new Flow({ keepOrder: true, icon: 'app.png' });

flow.add({
  title: 'Welcome to Flow Launcher!',
  subtitle: 'Create your own plugin with Typescript!',
});

flow.on('query', ({ prompt }, response) => {
  response.add({
    title: 'Click me to search!',
    subtitle: `You're searching for "${prompt}"`,
    jsonRPCAction: {
      method: 'my_custom_action',
      parameters: [prompt],
      dontHideAfterAction: true,
    },
  });

  response.add({
    title: 'Flow Launcher - Plugin Helper',
    subtitle: 'npm install flow-plugin',
  });
});

flow.on('my_custom_action', ({ parameters: [prompt] }, response) => {
  if (typeof prompt !== 'string') return;

  response.reply({
    method: 'Flow.Launcher.ChangeQuery',
    parameters: [`Searching for "${prompt}"`, false],
  });
});
