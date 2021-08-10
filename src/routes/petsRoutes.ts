import { Router } from 'express'
import PetController from '../controllers/petController'

const router = Router()
const controller = new PetController()

router.get('/', controller.get)

router.get('/:id', controller.getById)

router.post('/', controller.post)

router.patch('/:id', controller.patch)

router.delete('/:id', controller.delete)

export default router
