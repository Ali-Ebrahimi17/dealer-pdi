import { ZodIssue } from 'zod'
import { Types, Document, PopulatedDoc } from 'mongoose'

type ActionResult<T> = { status: 'success'; data: T } | { status: 'error'; error: string | ZodIssue[] }

// Subdocument definition
interface IDivision {
  name: string
  roles: string[]
}
interface ITop5Fault {
  _id: string
  count: Number
}

export interface IUser extends Document {
  email: string
  password: string
  name: string
  app: string
  divisions: IDivision[]
  emailVerified: boolean
  emailVerifiedAt?: Date
  varificationToken?: string
  varificationTokenExpires?: Date
  resetToken?: string
  resetTokenExpires?: string
  lastActive: Date
  canUpload: boolean
  // common
  _id: string
  createdAt: Date
  updatedAt: Date
}
export interface IInspection extends Document {
  bay: string
  serialNumber: string
  dealer: string
  model: string
  buildNumber: string
  countryName: string
  countryFlag: string
  intFaults: Number
  started: Date
  top5Internalfaults: ITop5Fault[]
  top5DoaClaims: ITop5Fault[]
  // common
  _id: string
  createdAt: Date
  updatedAt: Date
}
