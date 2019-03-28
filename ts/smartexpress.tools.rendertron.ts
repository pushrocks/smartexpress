import * as plugins from './smartexpress.plugins';

export const setupRendertron = async (expressAppInstanceArg: plugins.express.Application) => {
  const botUserAgents = [
    // Baidu
    'baiduspider',
    'embedly',

    // Facebook
    'facebookexternalhit',

    // Google
    'Googlebot', // -> the default Google Bot
    'Mediapartners-Google', // the Bot Agent used by AdSense

    // Microsoft
    'bingbot',
    'linkedinbot',
    'msnbot',
    'outbrain',
    'pinterest',
    'quora link preview',
    'rogerbot',
    'showyoubot',
    'slackbot',
    'TelegramBot',

    // Twitter
    'twitterbot',
    'vkShare',
    'W3C_Validator',

    // WhatsApp
    'whatsapp'
  ];

  expressAppInstanceArg.use(
    plugins.rendertronMiddleWare.makeMiddleware({
      proxyUrl: this.options.renderTronUrl,
      userAgentPattern: new RegExp(botUserAgents.join('|'), 'i')
    })
  );
};
