const mongoose = require('mongoose')
const {Schema} = mongoose


//DEFINO UN ES QUEMA EN MI BASE DE DATOS
const TaskSchema = new Schema({

    title:{type:String , require:true},
    description:{type: String , require:true}

})
module.exports= mongoose.model('task', TaskSchema)
