import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

const getEnvKeysFromFile = () => {
  const envFileContent = fs.readFileSync('.env', 'utf-8')
  return envFileContent
    .split('\n')
    .map((env) => env.split('=')[0].trim())
    .filter((key) => key && !key.startsWith('#'))
}

export const getEnvVariables = () => {
  const envKeys = getEnvKeysFromFile()
  return envKeys.reduce<Record<string, string | undefined>>((env, key) => {
    env[key] = process.env[key]
    return env
  }, {})
}
