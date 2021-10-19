import express from 'express'
import dotenv from 'dotenv'

import router from '@start/routes'

dotenv.config()
const application = express()

application.use(express.json())
application.use(router)

application.listen(process.env.PORT, () => console.log(`🎉 Woow! Server is running on PORT ${process.env.PORT}`))

