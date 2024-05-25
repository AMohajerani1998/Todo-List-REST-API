const mongodb = require('mongodb')
const db = require('../data/database')

class Todo {
    constructor (task, status = 'incomplete', id){
        this.task = task;
        this.status = status
        this.id = id
    }

    static async fetchAllTodos(){
        const result = await db.getDb().collection('todos').find().toArray();
        return result.map(function(todo){
            return new Todo(todo.task, todo.status, todo.id)
        })
    }

    saveTodo(){
        if (this.id){
            return db.getDb().collection('todos').updateOne({_id: new mongodb.ObjectId(this.id)}, {$set: {task: this.task, status: this.status}})
        }
        return db.getDb().collection('todos').insertOne({task: this.task, status: this.status})
    }

    deleteTodo(){
        if (!this.id){
            throw new Error ('Trying to delete a todo without an ID')
        }
        return db.getDb().collection('todos').deleteOne({_id: new mongodb.ObjectId(this.id)})
    }
}

module.exports = Todo;