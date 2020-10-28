import * as plugins from './smartexpress.plugins';

export const setupRobots = async (
  expressAppInstanceArg: plugins.express.Application,
  domainArg: string
) => {
  expressAppInstanceArg.get('/robots.txt', async (req, res) => {
    res.type('text/plain');
    res.send(`
User-agent: Googlebot-News
Disallow: /account
Disallow: /login

User-agent: *
Disallow: /account
Disallow: /login

Sitemap: https://${domainArg}/sitemap
Sitemap: https://${domainArg}/sitemap-news
`);
  });
};
