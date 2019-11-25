import { Cars } from '.'

let cars

beforeEach(async () => {
  cars = await Cars.create({ model: 'test', license: 'test', reservations: ['test'] })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = cars.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(cars.id)
    expect(view.model).toBe(cars.model)
    expect(view.license).toBe(cars.license)
    expect(view.reservations).toBe(cars.reservations)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = cars.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(cars.id)
    expect(view.model).toBe(cars.model)
    expect(view.license).toBe(cars.license)
    expect(view.reservations).toBe(cars.reservations)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
