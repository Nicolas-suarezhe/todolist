const express = require('express')
const path = require('path')
const fs = require('fs/promises')

const app = express()

app.use(express.json())//convierte a JSON lo que se trae del body

const jsonPath = path.resolve('./file/tasks.json')


//traer los usuarios
app.get('/tasks', async ( req , res )=>{
    const jsonFile = await fs.readFile(jsonPath, 'utf8' )
    res.send(jsonFile)
})

//creación de un usuario
app.post('/tasks', async (req,res)=>{
    //acá recibimos la información por medio del body
    const toDo = req.body
    const toDosArray = JSON.parse(await fs.readFile(jsonPath, 'utf8'))
    const lastIndex = toDosArray.length -1
    const newId = toDosArray[lastIndex].id + 1
    toDosArray.push({id: newId, ...toDo,})
    await fs.writeFile(jsonPath,JSON.stringify(toDosArray))
    res.end()
})

app.put('/tasks', async (req,res)=>{
    const toDosArray = JSON.parse(await fs.readFile(jsonPath, 'utf8'))
    const {id, title, description, completed} = req.body
    const toDoIndex = toDosArray.findIndex(toDo => toDo.id === id)
    if(toDoIndex >= 0 ){
        toDosArray[userIndex].title = title
        toDosArray[userIndex].description = description
        toDosArray[userIndex].completed = completed
    }
    await fs.writeFile(jsonPath, JSON.stringify(toDosArray))
    res.send('To do updated')
})

app.delete('/tasks', async (req,res)=>{
    const toDosArray = JSON.parse(await fs.readFile(jsonPath, 'utf8'))
    const { id } = req.body
    const toDoIndex = toDosArray.findIndex(toDo => toDo.id === id)
    toDosArray.splice( toDoIndex, 1 )
    await fs.writeFile(jsonPath, JSON.stringify(toDosArray))
    res.end()
})

const PORT = 700

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}` )
})