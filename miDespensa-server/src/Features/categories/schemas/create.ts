import type { Schema } from 'req-valid-express'

const create: Schema = {
  name: {
    type: 'string',
    sanitize: {
      trim: true
    }
  },
  color: {
    type: 'string',
    sanitize: {
      trim: true
    }
  },
  icon: {
    type: 'string',
    sanitize: {
      trim: true
    }
  }
}

export default create
