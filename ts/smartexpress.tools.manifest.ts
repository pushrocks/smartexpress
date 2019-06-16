import * as plugins from './smartexpress.plugins';

export const setupManifest = async (expressInstanceArg: plugins.express.Application, manifestArg: plugins.smartmanifest.ISmartManifestConstructorOptions) => {
  const smartmanifestInstance = new plugins.smartmanifest.SmartManifest(manifestArg);
  expressInstanceArg.get('/manifest.json', async (req,res) => {
    res.status(200);
    res.write(smartmanifestInstance.jsonString());
    res.end();
  });
}