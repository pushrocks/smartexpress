import { expect, tap } from 'tapbundle'
import * as smartrequest from 'smartrequest'

import * as smartexpress from '../ts/index'

let testServer: smartexpress.Server
let testRoute: smartexpress.Route
let testHandler: smartexpress.Handler

// =================
// Test class Server
// =================

tap.test('should create a valid Server', async () => {
  testServer = new smartexpress.Server({
    cors: true,
    forceSsl: false
  })
  expect(testServer).to.be.instanceof(smartexpress.Server)
})

// ================
// Test class Route
// ================

tap.test('should create a valid Route', async () => {
  testRoute = new smartexpress.Route(testServer, '/someroute')
  expect(testRoute).to.be.instanceof(smartexpress.Route)
})

tap.test('should accept a new Route', async () => {
  testServer.addRoute(testRoute)
})

// ==================
// Test class Handler
// ==================

tap.test('should produce a valid handler', async () => {
  testHandler = new smartexpress.Handler('POST', (request, response) => {
    console.log('request body is:')
    console.log(request.body)
    response.send('hi')
  })
  expect(testHandler).to.be.instanceOf(smartexpress.Handler)
})

tap.test('should add handler to route', async () => {
  testRoute.addHandler(testHandler)
})

// =====================
// start the server and test the configuration
// =====================

tap.test('should start the server allright', async () => {
  await testServer.start(3000)
  console.log('Yay Test Start successfull!')
})

// see if a demo request holds up
tap.test('should issue a request', async (tools) => {
  let response = await smartrequest.post('http://localhost:3000/someroute', {
    headers: {
      'Content-Type': 'application/json'
    },
    requestBody: {
      'someprop': 'hi'
    }
  })
  console.log(response.body)
})

// ========
// clean up
// ========

tap.test('should stop the server', async () => {
  await testServer.stop()
})

tap.start()
