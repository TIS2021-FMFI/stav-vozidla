import {Service} from "./service";

export interface Order{
  orderId: number
  vin: string
  dateOfCreation: Date
  dateOfUpdate: Date
  vehicleName: string
  finishedServices: number
  unfinishedServices: number
  services: Service[]
}
