import { Flow } from '../src';

const flow = new Flow();

flow.add({
  title: '1 - Add results the smoothest way possible',
  subtitle: "It doens't matter where or when",
});

flow.on('query', async (request, response) => {
  response.add({
    title: '2 - Reply to Flow methods',
    subtitle: 'Like the "query" method',
  });

  await new Promise((resolve) => setTimeout(resolve, 200));

  response.add({
    title: '3 - It can even be asyncronous',
    subtitle: 'This one was delayed by 200ms',
  });
});
