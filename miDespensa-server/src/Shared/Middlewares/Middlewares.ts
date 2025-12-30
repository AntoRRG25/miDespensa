import { type Request, type Response, type NextFunction } from 'express'
import { middError } from '../../Configs/errorHandlers.js'

export type Rules = Record<any, string[]>

export class Middlewares{
  static allowedQueryValuesByRules = ( rules:Rules ) => {
    return (req:Request, res: Response, next: NextFunction) => {
      const query = req.context?.query ?? {}

      for (const field in rules) {
        const allowed = rules[field]
        const value = query[field]

        if (value !== undefined && !allowed.includes(String(value))) {
          return next(middError(`Invalid value for '${field}'`, 400))
        }
      }
      next()
    }
  }
  static allowedBodyValuesByRules = ( rules: Rules ) => {
    return (req:Request, res: Response, next: NextFunction) => {
      const body = req.body ?? {}

      for (const field in rules) {
        const allowed = rules[field]
        const value = body[field]

        if (value !== undefined && !allowed.includes(String(value))) {
          return next(middError(`Invalid value for '${field}'`, 400))
        }
      }
      next()
    }
  }
  // static paramNumId(fieldName: string) {
  //     return (req:Request, res: Response, next: NextFunction) => {
  //           const id = req.params[fieldName];
  //           if (!id) {
  //               next(middError(`Missing ${fieldName}`, 400));
  //               return;
  //           }
  //           const INT: RegExp = /^\d+$/ // Solo enteros positivos
  //           const isValid = INT.test(id);
  //           const parserValue = parseInt(id, 10);
  //           if (!isValid) {
  //               next(middError('Invalid parameters', 400));
  //               return;
  //           }
  //               req.context = req.context || {};
  //               req.context.params = parserValue
  //           next();
  //       };
  //   }

}