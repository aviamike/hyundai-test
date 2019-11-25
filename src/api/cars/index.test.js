import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Cars } from '.'

const app = () => express(apiRoot, routes)

let cars

beforeEach(async () => {
  cars = await Cars.create({})
})

test('POST /cars 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ model: 'test', license: 'test', reservations: ['test'] })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.model).toEqual('test')
  expect(body.license).toEqual('test')
  expect(body.reservations).toEqual(['test'])
})

test('GET /cars 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /cars/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${cars.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(cars.id)
})

test('GET /cars/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /cars/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${cars.id}`)
    .send({ model: 'test', license: 'test', reservations: ['test'] })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(cars.id)
  expect(body.model).toEqual('test')
  expect(body.license).toEqual('test')
  expect(body.reservations).toEqual(['test'])
})

test('PUT /cars/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ model: 'test', license: 'test', reservations: ['test'] })
  expect(status).toBe(404)
})

test('DELETE /cars/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${cars.id}`)
  expect(status).toBe(204)
})

test('DELETE /cars/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
