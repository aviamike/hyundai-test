import { success, notFound } from "../../services/response/";
import { Cars } from ".";

export const create = ({ bodymen: { body } }, res, next) =>
  Cars.create(body)
    .then(cars => cars.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Cars.find(query, select, cursor)
    .then(cars => cars.map(cars => cars.view()))
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Cars.findById(params.id)
    .then(notFound(res))
    .then(cars => (cars ? cars.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  Cars.findById(params.id)
    .then(notFound(res))
    .then(async cars => {
      if (cars) {
        Object.assign(cars, body);
        cars.reservations = cars.reservations[0].split(",");
        return await cars.save();
      } else {
        return null;
      }
    })
    .then(cars => (cars ? cars.view(true) : null))
    .then(success(res))
    .catch(next);

// export const update = async ({ bodymen: { body }, params }, res, next) => {
//   try {
//     let car = await Cars.findById(params.id);
//     body.reservations = await body.reservations.split(",");

//     car = { ...car, ...body };
//     console.log(car.reservations);
//     await car.save();
//   } catch (error) {
//     console.log(error);
//   }
// };

export const destroy = ({ params }, res, next) =>
  Cars.findById(params.id)
    .then(notFound(res))
    .then(cars => (cars ? cars.remove() : null))
    .then(success(res, 204))
    .catch(next);
