import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

const ENV_FILE = {
  production: '.env'
} as const

type Environment = 'production' | 'development' | 'test'

const NODE_ENV: Environment =
  (process.env.NODE_ENV as Environment) ?? 'production'

/**
 * Fuente de configuración
 * - production → process.env
 * - dev/test → config.json
 */
let source: Record<string, string | undefined> = {}

if (NODE_ENV === 'production') {
  dotenv.config({ path: ENV_FILE.production })
  source = process.env
} else {
  const raw = fs.readFileSync(
    path.resolve('config.json'),
    'utf-8'
  )

  const parsed = JSON.parse(raw)

  if (!parsed[NODE_ENV]) {
    throw new Error(`Missing config for environment: ${NODE_ENV}`)
  }

  source = parsed[NODE_ENV]
}

/**
 * Helpers (idénticos a los tuyos, solo cambia la fuente)
 */
const getNumberEnv = (key: string, defaultValue: number): number => {
  const parsed = Number(source[key])
  return isNaN(parsed) ? defaultValue : parsed
}

const getStringEnv = (key: string, defaultValue = ''): string => {
  return source[key] ?? defaultValue
}

/**
 * Config final (API estable)
 */
const envConfig = {
  Port: getNumberEnv('PORT', 3000),
  Status: NODE_ENV,
  DatabaseUrl: getStringEnv('DATABASE_URL','')
}

export default envConfig

// import dotenv from 'dotenv'

// const ENV_FILE = {
//   production: '.env',
//   development: '.env.development',
//   test: '.env.test'
// } as const
// type Environment = keyof typeof ENV_FILE
// const NODE_ENV = (process.env.NODE_ENV as Environment) ?? 'production'

// dotenv.config({ path: ENV_FILE[NODE_ENV] })

// const getNumberEnv = (key: string, defaultValue: number): number => {
//   const parsed = Number(process.env[key])
//   return isNaN(parsed) ? defaultValue : parsed
// }
// const getStringEnv = (key: string, defaultValue: string): string => {
//   return process.env[key] ?? defaultValue
// }
// const envConfig = {
//   Port: getNumberEnv('PORT', 3000),
//   Status: NODE_ENV,
//   GmailUser: getStringEnv('GMAIL_USER', ''),
//   GmailPass : getStringEnv('GMAIL_APP_PASS', '')
    

// }
// export default envConfig