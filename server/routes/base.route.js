import express from 'express'
import version1Router from './v1/v1.route.js'

const appRouter = express.Router()


appRouter.use('/v1', version1Router)

export default appRouter