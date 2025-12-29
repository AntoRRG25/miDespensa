import { type Request, type Response } from 'express'
import { BaseController } from "./BaseController.js";
import { type BaseService } from '../Services/BaseService.js'

export class CustomController<TDTO, TCreate, TUpdate> extends BaseController<TDTO, TCreate, TUpdate> {
 protected service: BaseService<TDTO, TCreate, TUpdate>
  constructor(service: BaseService<TDTO, TCreate, TUpdate>) {
    super(service);
    this.service = service;
  }
  getById = async(req: Request, res: Response) => {
    const { id } = req.params
    const { message, results } = await this.service.getById(Number(id))
    BaseController.responder(res, 200, true, message, results)
  }

  update = async(req: Request, res: Response) => {
    const { id } = req.params
    const data = req.body
    const { message, results } = await this.service.update(Number(id), data)
    BaseController.responder(res, 200, true, message, results)
  }

  delete = async(req: Request, res: Response) => {
    const { id } = req.params
    const { message, results } = await this.service.delete(Number(id))
    BaseController.responder(res, 200, true, message, results)
  }
}