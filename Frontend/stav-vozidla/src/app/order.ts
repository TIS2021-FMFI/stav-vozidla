import {Service} from "./service";

export interface Order{
  id: number
  vin: string
  dateOfCreation: Date
  dateOfUpdate: Date
  vehicleName: string
  finishedServices: number
  unfinishedServices: number
  finished: boolean
  services: Service[]
}
