import type { Schema } from 'req-valid-express'

const create: Schema = {
  name: {
    type: 'string',
   
    sanitize: {
      trim: true
    }
  },
  quantity: {
    type: 'int'
  },
  categoryId: {
    type: 'int'
 
  }
}

const update: Schema = {
  name: {
    type: 'string',
   
    sanitize: {
      trim: true
    }
  },
  quantity: {
    type: 'int'
  },
  expiresAt: {
    type: 'string' // Assuming date comes as string from JSON
   },
  categoryId: {
    type: 'int'
 
  }
}


export {
  create,
  update
}
