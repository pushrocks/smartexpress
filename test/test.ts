import { expect, tap } from 'tapbundle'
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
    forceSsl: true
  })
  expect(testServer).to.be.instanceof(smartexpress.Server)
})

// ================
// Test class Route
// ================

tap.test('should create a valid Route', async () => {
  testRoute = new smartexpress.Route('someroute/')
  expect(testRoute).to.be.instanceof(smartexpress.Route)
})

tap.test('should accept a new Route', async () => {
  testServer.addRoute(testRoute)
})

// ==================
// Test class Handler
// ==================

tap.test('should produce a valid handler', async () => {
  testHandler = new smartexpress.Handler((request, response) => {
    
  })
})

// start the server and test the configuration

tap.test('should start the server allright', async () => {
  await testServer.start(3000)
})

tap.test('should stop the server', async () => {
  await testServer.stop()
})

tap.start()
