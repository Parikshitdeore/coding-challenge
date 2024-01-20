const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate")

const transactionSchema = new mongoose.Schema(
    {
        id:{
            type:Number,
            unique:true,
            required:true
        },
        title:{
            type:String,
            required:true
        },
        price: { 
            type: Number, 
            required: true 
        },
        description: { 
            type: String 
        },
        category: { 
            type: String 
        },
        image: { 
            type: String 
        },
        sold: { 
            type: Boolean, 
            default: false 
        },
        dateOfSale: { 
            type: Date 
        }
    }
)

const Transaction = mongoose.model("Transaction",transactionSchema)

module.exports = Transaction;