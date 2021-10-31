import { Server } from 'socket.io'
import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import tynt  from 'tynt'
import cors from 'cors'

import router from '@start/routes'

dotenv.config()

const application = express()
const server = http.createServer(application)

application.use(cors)
application.use(express.json())
application.use(router)

export const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  console.log(`User connected with successfully. ID: ${socket.id}`)
})

server.listen(process.env.PORT, () => {
  const log = `
${tynt.Green('Server is running')}

This server is running on ${tynt.Blue(process.env.PORT)}

  Local:               https://localhost:${process.env.PORT}
  With url like ip:    https://127.0.0.1:${process.env.PORT}

Note: Project was make by meluiz.com
`
  console.log(log)
})


