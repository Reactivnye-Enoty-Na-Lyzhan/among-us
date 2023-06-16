import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { CLIENT_PACKAGE_PATH } from '../utils/constants';

interface IResponse extends Response {
  locals: {
    cspNonce?: string;
  };
}

export const ssrProductionHandler = async (
  req: Request,
  res: IResponse,
  next: NextFunction
) => {
  const url = req.originalUrl;

  try {
    const template = fs.readFileSync(
      path.join(CLIENT_PACKAGE_PATH, './dist/index.html'),
      'utf-8'
    );

    const { render } = await import(
      path.join(CLIENT_PACKAGE_PATH, './dist-ssr/ssr-entry.cjs')
    );
    const { renderedHtml, initialState } = await render(url);
    const initStateSerialized = JSON.stringify(initialState);
    const nonce = res.locals?.cspNonce || '';
    const scriptWithNonce = `<script nonce="${nonce}"`;

    const html = template
      .replace(`<!--ssr-outlet-->`, renderedHtml)
      .replace('<!--store-data-->', initStateSerialized)
      .replace(/<script/g, scriptWithNonce);
    res
      .status(200)
      .set({
        'Content-Type': 'text/html',
      })
      .end(html);
  } catch (e) {
    next(e);
  }
};
