import { success, notFound } from '../../services/response/'
import { Cars } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Cars.create(body)
    .then((cars) => cars.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Cars.find(query, select, cursor)
    .then((cars) => cars.map((cars) => cars.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Cars.findById(params.id)
    .then(notFound(res))
    .then((cars) => cars ? cars.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Cars.findById(params.id)
    .then(notFound(res))
    .then((cars) => cars ? Object.assign(cars, body).save() : null)
    .then((cars) => cars ? cars.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Cars.findById(params.id)
    .then(notFound(res))
    .then((cars) => cars ? cars.remove() : null)
    .then(success(res, 204))
    .catch(next)
