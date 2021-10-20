import tynt  from 'tynt'
import express from 'express'
import dotenv from 'dotenv'

import router from '@start/routes'

dotenv.config()
const application = express()

application.use(express.json())
application.use(router)

application.listen(process.env.PORT, () => {
  const log = `
${tynt.Green('Server is running')}

This server is running on ${tynt.Blue(process.env.PORT)}

  Local:               https://localhost:${process.env.PORT}
  With url like ip:    https://127.0.0.1:${process.env.PORT}

Note: Project was make by meluiz.com
`
  console.clear()
  console.log(log)
})

