import { type Category } from '@prisma/client'

export interface ICategoryDTO {
  id:number
  name:string
  color:string
  icon:string
  createdAt:Date
  updatedAt?:Date |null
}

export type CategoryCreate = {
  name:string
  color:string
  icon:string
}

export type CategoryUpdate = {
  name?:string
  color?:string
  icon?:string
}

export const CategoryParser = (data:Category): ICategoryDTO => {
  return {
    id: data.id,
    name: data.name,
    color: data.color,
    icon: data.icon,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}   