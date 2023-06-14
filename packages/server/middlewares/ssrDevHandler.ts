import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { CLIENT_PACKAGE_PATH } from '../utils/constants';
import { nonce } from '../utils/securityData/nonceSettings';
import type { ViteDevServer } from 'vite';

export const ssrDevHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
  vite: ViteDevServer
) => {
  const url = req.originalUrl;

  try {
    let template = fs.readFileSync(
      path.resolve(CLIENT_PACKAGE_PATH, 'index.html'),
      'utf-8'
    );

    template = await vite.transformIndexHtml(url, template);

    const { render } = await vite.ssrLoadModule(
      path.resolve(CLIENT_PACKAGE_PATH, './src/ssr-entry.tsx')
    );
    const { renderedHtml, initialState } = await render(url);
    const initStateSerialized = JSON.stringify(initialState);
    const scriptWithNonce = `<script nonce="${nonce}"`;

    const html = template
      .replace(`<!--ssr-outlet-->`, renderedHtml)
      .replace('<!--store-data-->', initStateSerialized)
      .replace(/<script/g, scriptWithNonce);
    res.status(200).set({ 'Content-Type': 'text/html', 'Content-Security-Policy': `script-src 'self' 'nonce-${nonce}'` }).end(html);
  } catch (e) {
    vite.ssrFixStacktrace(e as Error);
    next(e);
  }
};
