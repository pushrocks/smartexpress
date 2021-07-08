// node native
import * as http from 'http';
import * as https from 'https';
import * as net from 'net';
import * as path from 'path';

export { http, https, net, path };

// apiglobal
import * as typedrequest from '@apiglobal/typedrequest';

export { typedrequest };

// pushrocks scope
import * as lik from '@pushrocks/lik';
import * as smartfeed from '@pushrocks/smartfeed';
import * as smartfile from '@pushrocks/smartfile';
import * as smartmanifest from '@pushrocks/smartmanifest';
import * as smartmime from '@pushrocks/smartmime';
import * as smartpromise from '@pushrocks/smartpromise';
import * as smartrequest from '@pushrocks/smartrequest';
import * as smartsitemap from '@pushrocks/smartsitemap';
import * as smarttime from '@pushrocks/smarttime';

export {
  lik,
  smartfeed,
  smartfile,
  smartmanifest,
  smartmime,
  smartpromise,
  smartrequest,
  smartsitemap,
  smarttime,
};

// @tsclass scope
import * as tsclass from '@tsclass/tsclass';

export { tsclass };

// express
import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
// @ts-ignore
import expressForceSsl from 'express-force-ssl';
import helmet from 'helmet';

export { bodyParser, cors, express, expressForceSsl, helmet };
