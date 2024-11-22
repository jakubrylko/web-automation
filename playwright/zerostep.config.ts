import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../.env') })

export default {
  TOKEN: process.env.ZEROSTEP_TOKEN
}

// App: https://app.zerostep.com
// Docs: https://github.com/zerostep-ai/zerostep
