import * as plugins from './smartexpress.plugins';
import * as smartexpress from './index';

export const redirectFrom80To443 = async () => {
  const smartexpressInstance = new smartexpress.Server({
    cors: true,
    forceSsl: true,
    port: 80,
  });

  smartexpressInstance.addRoute(
    '*',
    new smartexpress.Handler('ALL', async (req, res) => {
      res.redirect('https://' + req.headers.host + req.url);
    })
  );

  await smartexpressInstance.start();

  return smartexpressInstance;
};
