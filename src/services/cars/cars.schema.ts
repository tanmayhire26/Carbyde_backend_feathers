// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const carSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    model: Type.String(),
    brand: Type.String(),
    variant: Type.String(),
    fuelType : Type.String(),
    specifications : Type.Object({
      engine: Type.Object({
        volume : Type.String(),
        strokes : Type.String(),
        maxTorque : Type.String(),
        maxPower : Type.String(),

      }),
      comfort : Type.Object({
        sunroof : Type.Boolean(),
        seats : Type.String()
      }),
      safety : Type.Object({
        rating : Type.Number(),
        airbags : Type.Number(),
        reverseCamera : Type.Boolean(),
        adas : Type.Boolean()
      })
    }),
    category : Type.String(),
    active : Type.Boolean(),
    files : Type.Array(Type.Object({
      originalname : Type.String(),
      filepath : Type.String(),
      fileSize : Type.Number(),

  }))
  },
  { $id: 'Car', additionalProperties: false }
)
export type Car = Static<typeof carSchema>
export const carValidator = getValidator(carSchema, dataValidator)
export const carResolver = resolve<Car, HookContext>({})

export const carExternalResolver = resolve<Car, HookContext>({})

// Schema for creating new entries
export const carDataSchema = Type.Pick(carSchema, ['model', 'brand', 'variant', 'category', 'fuelType'], {
  $id: 'CarData'
})
export type CarData = Static<typeof carDataSchema>
export const carDataValidator = getValidator(carDataSchema, dataValidator)
export const carDataResolver = resolve<Car, HookContext>({})

// Schema for updating existing entries
export const carPatchSchema = Type.Partial(carSchema, {
  $id: 'CarPatch'
})
export type CarPatch = Static<typeof carPatchSchema>
export const carPatchValidator = getValidator(carPatchSchema, dataValidator)
export const carPatchResolver = resolve<Car, HookContext>({})

// Schema for allowed query properties
export const carQueryProperties = Type.Pick(carSchema, ['_id', 'model', 'brand', 'variant', 'category', 'active', 'fuelType'])
export const carQuerySchema = Type.Intersect(
  [
    querySyntax(carQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type CarQuery = Static<typeof carQuerySchema>
export const carQueryValidator = getValidator(carQuerySchema, queryValidator)
export const carQueryResolver = resolve<CarQuery, HookContext>({})
