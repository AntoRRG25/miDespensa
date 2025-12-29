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
  checked:{
    type: 'boolean'
  }
}

export { create, update }
