import * as plugins from './smartexpress.plugins';
import { Server } from './smartexpress.classes.server';
import { Handler } from './smartexpress.classes.handler';

export const setupRobots = async (
  smartexpressRefArg: Server,
  domainArg: string
) => {
  smartexpressRefArg.addRouteBefore('/robots.txt', new Handler('GET', async (req, res) => {
    res.type('text/plain');
    res.send(`
User-agent: Googlebot-News
Disallow: /account
Disallow: /login

User-agent: *
Disallow: /account
Disallow: /login

${smartexpressRefArg.options.blockWaybackMachine ? `
User-Agent: ia_archiver
Disallow: /
` : null}

Sitemap: https://${domainArg}/sitemap
Sitemap: https://${domainArg}/sitemap-news
`);
  }));
};
