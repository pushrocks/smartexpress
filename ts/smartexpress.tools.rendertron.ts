import * as plugins from './smartexpress.plugins';
import { Server } from './smartexpress.classes.server';

export const setupRendertron = async (smartexpressInstance: Server) => {
  const botUserAgents = [
    // Baidu
    'baiduspider',
    'embedly',

    // Facebook
    'facebookexternalhit',

    // Google
    // 'Googlebot', // -> the default Google Bot
    // 'Mediapartners-Google', // the Bot Agent used by AdSense

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

  smartexpressInstance.expressAppInstance.use(
    plugins.rendertronMiddleWare.makeMiddleware({
      proxyUrl: smartexpressInstance.options.renderTronUrl,
      userAgentPattern: new RegExp(botUserAgents.join('|'), 'i')
    })
  );
};
