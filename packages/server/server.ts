import createServer from './app';

const port = Number(process.env.SERVER_PORT) || 3001;

createServer().then(({ app }) => {
  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
});
