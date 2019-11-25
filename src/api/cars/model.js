import mongoose, { Schema } from 'mongoose'

const carsSchema = new Schema({
  _id: {
    type: String
  },
  model: {
    type: String
  },
  license: {
    type: String
  },
  reservations: {
    type: Array
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

carsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      model: this.model,
      license: this.license,
      reservations: this.reservations,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Cars', carsSchema)

export const schema = model.schema
export default model
