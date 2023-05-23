// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Car, CarData, CarPatch, CarQuery, CarService } from './cars.class'

export type { Car, CarData, CarPatch, CarQuery }

export type CarClientService = Pick<CarService<Params<CarQuery>>, (typeof carMethods)[number]>

export const carPath = 'cars'

export const carMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const carClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(carPath, connection.service(carPath), {
    methods: carMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [carPath]: CarClientService
  }
}
