import express from 'express';
import { signUp, signIn, signOut, updateUser, findUser, deleteUser } from '../../controllers/voter.controller.js';
import { registerCandidate, findCandidate } from '../../controllers/candidateAuth.controller.js';

const version1Router = express.Router()

version1Router.post('/voter/signUp', signUp)
version1Router.post('/voter/signIn', signIn)
version1Router.post('/voter/signOut', signOut)
version1Router.put('/voter/update/:id', updateUser)
version1Router.get('/voter/find/:id', findUser)
version1Router.delete('/voter/update/:id', deleteUser)

version1Router.post('/candidate/register',registerCandidate)
version1Router.post('/candidate/find', findCandidate)

export default version1Router