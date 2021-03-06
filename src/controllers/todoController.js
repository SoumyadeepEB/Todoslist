const jwt = require('jsonwebtoken')
const Todos = require('../models/todoModel')

exports.home = (req, res) => {
    res.json({
        project: 'Todo List',
        author: 'Soumyadeep Ghosh',
        language: 'Nodejs',
        version: '1.0'
    })
}

exports.list = (req, res) => {
    if(req.headers && req.headers.authorization == `Bearer ${process.env.TOKEN}`){
        Todos.find((err, data) => {
            if(!err){
                if(data.length > 0){
                    res.status(200).json({
                        status: 'success',
                        data: data
                    })
                }else{
                    res.status(200).json({
                        status: 'success',
                        message: 'No record found'
                    })
                }
            }else{
                res.status(400).json({
                    status: 'error',
                    message: 'Something is going wrong'
                })
            }
        })
    }else{
        res.status(401).json({
            status: 'error',
            message: 'Authentication failed'
        })
    }
}

exports.listone = (req, res) => {
    if(req.headers && req.headers.authorization == `Bearer ${process.env.TOKEN}`){
        let id = req.params.id
        Todos.findOne({_id: id}, (err, data) => {
            if(!err){
                if(data){
                    res.status(200).json({
                        status: 'success',
                        data: data
                    })
                }else{
                    res.status(200).json({
                        status: 'success',
                        message: 'No record found'
                    })
                }
            }else{
                res.status(400).json({
                    status: 'error',
                    message: 'Something is going wrong'
                })
            }
        })
    }else{
        res.status(401).json({
            status: 'error',
            message: 'Authentication failed'
        })
    }
}

exports.add = (req, res) => {
    if(req.headers && req.headers.authorization == `Bearer ${process.env.TOKEN}`){
        if(req.body.name === null && req.body.desc === null){
            res.status(400).json({
                status: 'error',
                message: 'Todo name or description cannot be empty'
            })
        }else{
            const todo = new Todos({
                name: req.body.name,
                description: req.body.desc
            })
            todo.save((err, data) => {
                if(!err){
                    res.status(201).json({
                        status: 'success',
                        message: 'Todo inserted successfully'
                    })
                }else{
                    res.status(500).json({
                        status: 'error',
                        message: 'Something is going wrong'
                    })
                }
            })
        }
    }else{
        res.status(401).json({
            status: 'error',
            message: 'Authentication failed'
        })
    }
}

exports.edit = (req, res) => {
    if(req.headers && req.headers.authorization == `Bearer ${process.env.TOKEN}`){
        let id = req.params.id
        if(req.body.name === null && req.body.desc === null){
            res.status(400).json({
                status: 'error',
                message: 'Todo name or description cannot be empty'
            })
        }else{
            Todos.findByIdAndUpdate({_id: id}, {
                name: req.body.name,
                description: req.body.desc,
            }, {returnOriginal: false},
            (err, data) => {
                if(!err){
                    res.status(200).json({
                        status: 'success',
                        message: 'Todo updated successfully'
                    })
                }else{
                    res.status(500).json({
                        status: 'error',
                        message: 'Something is going wrong'
                    })
                }
            })
        }
    }else{
        res.status(401).json({
            status: 'error',
            message: 'Authentication failed'
        })
    }
}

exports.change = (req, res) => {
    if(req.headers && req.headers.authorization == `Bearer ${process.env.TOKEN}`){
        let id = req.params.id
        if(req.body.status === null || isNaN(req.body.status)){
            res.status(500).json({
                status: 'error',
                message: 'Status should be numeric'
            })
        }else{
            let status = req.body.status == 1 ? true : false
            Todos.findByIdAndUpdate({_id: id}, {status: status}, {returnOriginal: false},
            (err, data) => {
                if(!err){
                    res.status(200).json({
                        status: 'success',
                        message: 'Todo status changed'
                    })
                }else{
                    res.status(500).json({
                        status: 'error',
                        message: 'Something is going wrong'
                    })
                }
            })
        }
    }else{
        res.status(401).json({
            status: 'error',
            message: 'Authentication failed'
        })
    }
}

exports.delete = (req, res) => {
    if(req.headers && req.headers.authorization == `Bearer ${process.env.TOKEN}`){
        let id = req.params.id
        Todos.findOneAndDelete({_id: id}, (err, data) => {
            if(!err){
                res.status(200).json({
                    status: 'success',
                    message: 'Todo deleted successfully'
                })
            }else{
                res.status(500).json({
                    status: 'error',
                    message: 'Something is going wrong'
                })
            }
        })
    }else{
        res.status(401).json({
            status: 'error',
            message: 'Authentication failed'
        })
    }
}

exports.login = (req, res) => {
    const email = 'soumyadeep@gmail.com'
    const password = 'Hello@123'
    if(req.body.email == email && req.body.password == password){
        const token = jwt.sign({name: 'Soumyadeep Ghosh', exp: Math.floor(Date.now()/1000)+3600}, process.env.TOKEN)
        res.status(200).json({
            status: 'success',
            token: token
        })
    }else{
        res.status(200).json({
            status: 'error',
            code: '400',
            message: 'Wrong cridential'
        })
    }
}

exports.error = (req, res) => {
    res.json({
        message: 'Content not found'
    })
}