import { expect, tap } from 'tapbundle'
import * as smartexpress from '../ts/index'

let testServer: smartexpress.Server
let testRoute: smartexpress.Route

tap.test('should create a valid Server', async () => {
  testServer = new smartexpress.Server()
  expect(testServer).to.be.instanceof(smartexpress.Server)
})

tap.test('should create a valid Route', async () => {
  testRoute = new smartexpress.Route()
  expect(testRoute).to.be.instanceof(smartexpress.Route)
})

tap.test('should start the server allright', async () => {
  await testServer.start(3000)
})

tap.test('should stop the server', async () => {
  await testServer.stop()
})

tap.start()
