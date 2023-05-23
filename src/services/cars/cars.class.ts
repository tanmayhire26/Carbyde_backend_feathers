// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Car, CarData, CarPatch, CarQuery } from './cars.schema'

export type { Car, CarData, CarPatch, CarQuery }

export interface CarParams extends MongoDBAdapterParams<CarQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class CarService<ServiceParams extends Params = CarParams> extends MongoDBService<
  Car,
  CarData,
  CarParams,
  CarPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('cars'))
  }
}
