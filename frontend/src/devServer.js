const express = require('express');
const path = require('path');
const esbuild = require('esbuild');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/api', createProxyMiddleware({
  target: 'http://backend:5000',
  changeOrigin: true
}));

app.use(express.static(path.join(__dirname, '../public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

async function start() {
  const ctx = await esbuild.context({
    entryPoints: [path.join(__dirname, 'index.js')],
    bundle: true,
    outfile: path.join(__dirname, '../public/bundle.js'),
    loader: { '.js': 'jsx' },
    jsx: 'automatic',
    define: { 'process.env.NODE_ENV': '"development"' },
    sourcemap: true,
    logLevel: 'info'
  });

  await ctx.watch();

  const port = 3000;
  app.listen(port, () => {
    console.log('Frontend dev server listening on port', port);
  });
}

start();
