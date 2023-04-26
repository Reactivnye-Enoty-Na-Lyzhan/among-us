import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { CLIENT_PACKAGE_PATH } from '../utils/constants';

export const ssrProductionHandler = async (
  req: Request,
  res: Response,
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
    const { renderedHtml } = await render(url);

    const html = template.replace(`<!--ssr-outlet-->`, renderedHtml);
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (e) {
    next(e);
  }
};
