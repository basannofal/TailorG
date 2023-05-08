const mongoose = require('mongoose')

const owner = mongoose.Schema({

    sname: String,
    name: String,
    phone: {
        type: Number,
    },
    email: {
        type: String,
    },
    pass: String,


    cltpart : [{
        cltpartname  :String,
        isselected : String,
    }],


        ctype: [
        {   
            clname:{
                type: String,
                default: "Pents",
            } ,
            dvalue : String,
            gender:String,
            cltype:[
                {},
            ],
            imgurl:String
        },
        ],
    //costomer array

    costomer: [{
        cname: String,
        cphone: Number,
        optcphone : Number,
        ccity: String,
        caddress: String,
        cemail: String,
        gender: String,




        // costomer order array

        corder: [{
            clothType: String,
            specialNote: String,
            prize: Number,
            deliveryDate: String,
            deliveryMonth: String,
            deliveryYear: String,
            orderUrgent: String,
            date: String,
            status: String,
            clmesurement : String,
            isselected : String,
            dvalue : String,
            mid : String,
        }],

        cmeasure: [{
            clothtype: String,
            clmesurement : String,
            neak :[] ,
            isselected : String,
            date: String,
            impnote : String,
            imgurl:String,
        }],


        cmeasure1: [{
            clothType: String,
            clmesurement : [{
                
            }]
        }],

       


    }]
})

const shareowner = mongoose.model('signup', owner)

module.exports = shareowner;