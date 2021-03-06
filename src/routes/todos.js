const express = require('express')
const todoController = require('../controllers/todoController')

const router = express.Router()

router.get('/', todoController.home)
router.get('/todos', todoController.list)
router.get('/todo/:id', todoController.listone)
router.post('/addtodo', todoController.add)
router.put('/edittodo/:id', todoController.edit)
router.patch('/todostatus/:id', todoController.change)
router.delete('/deletetodo/:id', todoController.delete)
router.post('/login', todoController.login)
router.get('*', todoController.error)

module.exports = router