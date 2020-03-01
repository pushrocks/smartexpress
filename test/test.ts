// tslint:disable-next-line:no-implicit-dependencies
import { expect, tap } from '@pushrocks/tapbundle';

// helper dependencies
// tslint:disable-next-line:no-implicit-dependencies
import nodeFetch from 'node-fetch';
import * as smartrequest from '@pushrocks/smartrequest';

import * as smartexpress from '../ts/index';

let testServer: smartexpress.Server;
let testRoute: smartexpress.Route;
let testRoute2: smartexpress.Route;
let testHandler: smartexpress.Handler;

// =================
// Test class Server
// =================

tap.test('should create a valid Server', async () => {
  testServer = new smartexpress.Server({
    cors: true,
    domain: 'testing.git.zone',
    forceSsl: false,
    manifest: {
      name: 'Test App',
      short_name: 'testapp'
    },
    robots: 'standard'
  });
  expect(testServer).to.be.instanceof(smartexpress.Server);
});

// ================
// Test class Route
// ================

tap.test('should create a valid Route', async () => {
  testRoute = testServer.addRoute('/someroute');
  testRoute2 = testServer.addRoute('/someroute/*');
  expect(testRoute).to.be.instanceof(smartexpress.Route);
});

// ==================
// Test class Handler
// ==================

tap.test('should produce a valid handler', async () => {
  testHandler = new smartexpress.Handler('POST', (request, response) => {
    console.log('request body is:');
    console.log(request.body);
    response.send('hi');
  });
  expect(testHandler).to.be.instanceOf(smartexpress.Handler);
});

tap.test('should add handler to route', async () => {
  testRoute.addHandler(testHandler);
});

tap.test('should create a valid StaticHandler', async () => {
  testRoute2.addHandler(new smartexpress.HandlerStatic(__dirname));
});

// =====================
// start the server and test the configuration
// =====================

tap.test('should start the server allright', async () => {
  await testServer.start(3000);
  console.log('Yay Test Start successfull!');
});

// see if a demo request holds up
tap.test('should issue a request', async tools => {
  const response = await smartrequest.postJson('http://localhost:3000/someroute', {
    headers: {
      'X-Forwarded-Proto': 'https'
    },
    requestBody: {
      someprop: 'hi'
    }
  });
  console.log(response.body);
});

tap.test('should get a file from disk', async () => {
  const response = await nodeFetch('http://localhost:3000/someroute/testresponse.js');
  console.log(response.status);
  console.log(response.headers);
});

// ========
// clean up
// ========

tap.test('should stop the server', async () => {
  await testServer.stop();
});

tap.start();
