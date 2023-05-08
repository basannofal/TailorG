const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path')
const port = process.env.PORT || 8000;
const bodyparser = require('body-parser');
const getschema = require('./db/schema')

require('./db/conn')
app.use(express.json())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));




// ******************************* API *******************************************

app.get('/getdata', async (req, res) => {
    try {
        const userdata = await getschema.find();
        res.status(201).json(userdata);
    } catch (error) {
        res.send(error)
    }

})


// ******************************* Ragister *******************************************


app.post('/ragister', async (req, res) => {
    const { sname, name, phone, email, pass } = req.body;

    console.log(req.body.sname);
    try {
        const userexist = await getschema.findOne({ email: email })

        if (userexist) {
            return res.status(400).json({ error: ' email already exists' })
        } else {
            const user = new getschema({
                sname, name, phone, email, pass,
                cltpart: [
                    {
                        cltpartname: "Neak",
                        isselected: false,
                    },
                    {
                        cltpartname: "Sleeve",
                        isselected: false,
                    },
                    {
                        cltpartname: "Sholder",
                        isselected: false,
                    },
                    {
                        cltpartname: "Chest",
                        isselected: false,
                    },
                    {
                        cltpartname: "Waist",
                        isselected: false,
                    },
                    {
                        cltpartname: "Length",
                        isselected: false,
                    },
                    {
                        cltpartname: "Bicep",
                        isselected: false,
                    },
                    {
                        cltpartname: "Wrist",
                        isselected: false,
                    },
                ],
                ctype: [
                    {
                    clname: "Shirt",
                    dvalue: "250",
                    gender: "male",
                    cltype: [
                        {
                            cltpartname: "Neak",
                            isselected: false,
                            _id: "63943446b477cb3681613196",
                            id: "1670678651582",
                            selected: true
                        },
                        {
                            cltpartname: "Sleeve",
                            isselected: false,
                            _id: "63943446b477cb3681613296",
                            id: "1670678651752",
                            selected: true
                        },
                        {
                            cltpartname: "Sholder",
                            isselected: false,
                            _id: "63943446b477cb3681613396",
                            id: "1670678651952",
                            selected: true
                        },
                        {
                            cltpartname: "Chest",
                            isselected: false,
                            _id: "63943446b477cb3681613496",
                            id: "1670678652102",
                            selected: true
                        },
                        {
                            cltpartname: "Waist",
                            isselected: false,
                            _id: "63943446b477cb3681613596",
                            id: "1670681663683",
                            selected: true
                        },
                        {
                            cltpartname: "Length",
                            isselected: false,
                            _id: "63943446b477cb3681613696",
                            id: "1670681661510",
                            selected: true
                        },
                        {
                            cltpartname: "Bicep",
                            isselected: false,
                            _id: "63943446b477cb3681613796",
                            id: "1670681661817",
                            selected: true
                        },
                        {
                            cltpartname: "Wrist",
                            isselected: false,
                            _id: "63943446b477cb3681613896",
                            id: "1670681661265",
                            selected: true
                        },
                    ],
                    }
                    ],
            })

            await user.save();
            res.json({ message: "user Ragistrate Successfully" })
        }
    } catch (error) {
        console.log(error);
    }

})



//***************************** LOGIN ***********************************8 */

app.post('/login', async (req, res) => {
    try {
        const { email, pass } = req.body;
        console.log("reached");
        const userava = await getschema.findOne({ email: email });

        if (userava) {
            if (userava.pass === pass) {
                res.json(userava)
            }
            else {

                res.status(400).json("invalid");
            }
        }
        else {
            res.status(400).json("invalid email")
        }
    } catch (error) {
        console.log(error);
    }
})


// *******************************  ALL DATA GET ******************************************


app.get('/getdata', async (req, res) => {
    try {
        const userdata = await getschema.find();
        res.status(201).json(userdata);
    } catch (error) {
        res.send(error)
    }

})



// ************************** GET DATA FOR PERTICULER USER ********************************


app.get('/getuser/:id', async (req, res) => {
    try {
        const { id } = req.params
        console.log(id);
        const peruserdata = await getschema.findById(id);
        res.status(201).json(peruserdata);
    } catch (error) {
        res.send(error)
    }

})



// ************************** GET DATA FOR PERTICULER CUSTOMER OF ANY USER ********************************


app.get('/getuser/:id/:obid', async (req, res) => {
    try {
        const id = req.params.id
        const obid = req.params.obid
        console.log(id);
        const peruserdata = await getschema.find({ 'costomer._id': obid },
            { "_id": obid, costomer: { $elemMatch: { _id: obid } } });
        res.status(201).json(peruserdata);
    } catch (error) {
        res.send(error)
    }

})


// *************** GET DATA FOR PERTICULER ORDER OF PERTICULAR CUSTOMER OF ANY USER ********************************


app.get('/getuser/:id/:obid/:orid', async (req, res) => {
    try {
        const id = req.params.id
        const obid = req.params.obid
        const orid = req.params.orid
        console.log(id);
        const peruserdata = await getschema.find({ 'costomer.corder': orid },
            { "_id": orid, "costomer.$.corder": { $elemMatch: { "_id": orid } } });
        res.status(201).json(peruserdata);
    } catch (error) {
        console.log(error);
        res.send(error)
    }

})



// ********************************* ADD NEW COSTOMER *******************************


app.patch('/Newcustomer/:id', async (req, res) => {
    const { cname, cphone, ccity, caddress, cemail, gender } = req.body;


    const _id = req.params.id;

    getschema.findByIdAndUpdate(_id, {
        $push: {
            costomer:
            {
                cname: req.body.cname,
                cphone: req.body.cphone,
                optcphone : req.body.optcphone,
                ccity: req.body.ccity,
                caddress: req.body.caddress,
                cemail: req.body.cemail,
                gender: req.body.checked
            },
        }
    })
        .then(data => {
            res.status(201).json(data);
        }).catch(err => {
            console.log(err);
        })
})



// ********************************* ADD NEW CLOTH TYPE PART *******************************


app.patch('/Addnewclothtypepart/:id', async (req, res) => {


    const _id = req.params.id;

    getschema.findByIdAndUpdate(_id, {
        $push: {
            cltpart:
            {

                cltpartname: req.body.cltpartname,
                isselected: false,

            },
        }
    })
        .then(data => {
            res.status(201).json(data);
        }).catch(err => {
            console.log(err);
        })
})



// ********************************* NEW CLOTH TYPE PART DELETE  *******************************



app.patch('/clothtypepartdelete/:id/:cid', async (req, res) => {

    const cid = req.params.cid;
    const id = req.params.id
    const id_in_string = cid.toString();

    getschema.findOneAndUpdate({ _id: id, "cltpart._id": cid }, {

        $pull: {
            "cltpart": {

                '_id': id_in_string
            }
        }
    }, { new: true })
        .then(data => {
            if (!data) {
                console.log('something went wrong');
            } else {
                res.status(201).json(data)
                console.log("delete success");
            }
        }).catch(err => {
            console.log(err);
        })
})









// ********************************* ADD NEW CLOTH TYPE *******************************


app.patch('/Addnewclothtype/:id', async (req, res) => {


    const _id = req.params.id;

    getschema.findByIdAndUpdate(_id, {
        $push: {
            ctype:
            {
                gender: req.body.gender,
                clname: req.body.clothname,
                cltype: req.body.newArray,
                dvalue : req.body.dvalue,
                imgurl : req.body.imgmeasurment
            },
        }
    })
        .then(data => {
            res.status(201).json(data);
        }).catch(err => {
            console.log(err);
        })
})




// ********************************* NEW CLOTH TYPE DELETE  *******************************



app.patch('/clothtypedelete/:id/:cid', async (req, res) => {

    const cid = req.params.cid;
    const id = req.params.id
    const id_in_string = cid.toString();

    getschema.findOneAndUpdate({ _id: id, "ctype._id": cid }, {

        $pull: {
            "ctype": {

                '_id': id_in_string
            }
        }
    }, { new: true })
        .then(data => {
            if (!data) {
                console.log('something went wrong');
            } else {
                res.status(201).json(data)
                console.log("delete success");
            }
        }).catch(err => {
            console.log(err);
        })
})





// ********************************* ADD MEASURMENT  *******************************


app.patch('/addmeasurment/:id/:obid', async (req, res) => {


    const _id = req.params.id;
    const obid = req.params.obid
    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();


    var date = day + "/" + month + "/" + year;

    console.log(req.body.neak);

    getschema.findOneAndUpdate({ "_id": _id, "costomer._id": obid }, {
        $push: {
            "costomer.$.cmeasure":
            {
                clothtype: req.body.Ordertype,
                clmesurement: req.body.clmesurement,
                neak: req.body.inputs,
                isselected: false,
                date: date,
                impnote : req.body.impnote,
                imgurl : req.body.imgurl

            },
        }
    })
        .then(data => {
            res.status(201).json(data);
        }).catch(err => {
            console.log(err);
        })
})




// ********************************* ADD ORDERS  *******************************


app.patch('/Addorder/:id/:obid', async (req, res) => {


    const _id = req.params.id;
    const obid = req.params.obid
    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();

    var date = day + "/" + month + "/" + year;


    getschema.findOneAndUpdate({ "_id": _id, "costomer._id": obid }, {
        $push: {
            "costomer.$.corder":
            {

                clothType: req.body.Ordertype,
                clmesurement: req.body.Measurment,
                specialNote: req.body.specialNote,
                prize: req.body.prize,
                deliveryDate: req.body.ddate,
                deliveryMonth: req.body.dmonth,
                deliveryYear: req.body.dyear,
                orderUrgent: req.body.checked,
                date: date,
                status: true,
                isselected: false,
                dvalue : req.body.dvalue,
                mid : req.body.mtid
            },
        }
    })
        .then(data => {
            res.status(201).json(data);
        }).catch(err => {
            console.log(err);
        })
})






// ********************************* CLOTH TYPE DELETE  *******************************



app.patch('/cltypedelete/:id/:cltypeid', async (req, res) => {

    const cltypeid = req.params.cltypeid;
    const id = req.params.id
    const id_in_string = cltypeid.toString();

    getschema.findOneAndUpdate({ _id: id, "ctype._id": cltypeid }, {

        $pull: {
            "ctype": {

                '_id': id_in_string
            }
        }
    }, { new: true })
        .then(data => {
            if (!data) {
                console.log('something went wrong');
            } else {
                res.status(201).json(data)
                console.log("delete success");
            }
        }).catch(err => {
            console.log(err);
        })
})





// ********************************* CUSTOMER DELETE  *******************************



app.patch('/customerdelete/:id/:cid', async (req, res) => {

    const cid = req.params.cid;
    const id = req.params.id
    const id_in_string = cid.toString();

    getschema.findOneAndUpdate({ _id: id, "costomer._id": cid }, {

        $pull: {
            "costomer": {

                '_id': id_in_string
            }
        }
    }, { new: true })
        .then(data => {
            if (!data) {
                console.log('something went wrong');
            } else {
                res.status(201).json(data)
                console.log("delete success");
            }
        }).catch(err => {
            console.log(err);
        })
})







// ********************************* CUSTOMER ORDERS DELETE  *******************************



app.patch('/orderdelete/:id/:oid', async (req, res) => {

    const oid = req.params.oid;
    const id = req.params.id
    const id_in_string = oid.toString();

    getschema.findOneAndUpdate({ _id: id, "costomer.corder._id": oid }, {

        $pull: {
            "costomer.$.corder": {

                '_id': id_in_string
            }
        }
    }, { new: true })
        .then(data => {
            if (!data) {
                console.log('something went wrong');
            } else {
                res.status(201).json(data)
                console.log("delete success");
            }
        }).catch(err => {
            console.log(err);
        })
})





// ********************************* CUSTOMER MEASURMENT DELETE  *******************************



app.patch('/measurdelete/:id/:mid', async (req, res) => {

    const mid = req.params.mid;
    const id = req.params.id
    const id_in_string = mid.toString();

    getschema.findOneAndUpdate({ _id: id, "costomer.cmeasure._id": mid }, {

        $pull: {
            "costomer.$.cmeasure": {

                '_id': id_in_string
            }
        }
    }, { new: true })
        .then(data => {
            if (!data) {
                console.log('something went wrong');
            } else {
                res.status(201).json(data)
                console.log("delete success");
            }
        }).catch(err => {
            console.log(err);
        })
})





//************************************ UPDATE  SHOP OWNER DATA ********************************* */


app.patch('/editProfil/:id', async (req, res) => {
    try {
        const { id } = req.params
        console.log(id);
        const updateuser = await getschema.findByIdAndUpdate(id, {
            sname: req.body.sname,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
        }, {
            new: true
        }).then(data => {
            if (!data) {
                console.log('something went wrong');
            } else {
                res.status(201).json(data)
                console.log("Profile Update success");
            }
        }).catch(err => {
            console.log(err);
        })
    } catch (error) {
        res.send(error)
    }

})







//************************************ UPDATE CUSTOMER PROFILE DATA ********************************* */


app.patch('/editProfil/:id/:obid', async (req, res) => {
    try {





        const id = req.params.id
        const obid = req.params.obid
        console.log(obid);
        const updateuser = await getschema.updateOne(
            {
              
            
                        "costomer._id":obid
                
            },
            { "$set": { 
                "costomer.$[outer].cname": req.body.cname,
                "costomer.$[outer].cphone": req.body.cphone,
                "costomer.$[outer].optcphone": req.body.optcphone,
                "costomer.$[outer].ccity": req.body.ccity,
                "costomer.$[outer].caddress": req.body.caddress,
                "costomer.$[outer].cemail": req.body.cemail,

                } 
            },
            { "arrayFilters": [
                { "outer._id": obid }
                ] 
            },).then(data => {
                if (!data) {
                    console.log('something went wrong');
                } else {
                    console.log(data);
                    res.status(201).json(data)
                    console.log("Profile Update success");
                }
            }).catch(err => {
                console.log(err);
            })
    } catch (error) {
        res.send(error)
    }

})



//************************************ UPDATE STATUS ********************************* */


app.patch('/editStatus/:id/:obid/:orid', async (req, res) => {
    try {

        const id = req.params.id
        const obid = req.params.obid
        const orid = req.params.orid

        console.log("hello");
        let x = new mongoose.Types.ObjectId(id)
        
        const updateuser = await getschema.updateOne(
        {
            "_id":id,
            "costomer": {
                $elemMatch : {
                    obid, "corder._id":orid
                }
            },
        },
        { "$set": { 
            "costomer.$[outer].corder.$[inner].status": req.body.x,
            } 
        },
        { "arrayFilters": [
            { "outer._id": obid },
            { "inner._id": orid }
            ] 
        },
        ).then(data => {
            if (!data) {
                console.log('something went wrong');
            } else {
                console.log(data);
                res.status(201).json(data)
                console.log("Profile Update success");
            }
        }).catch(err => {
            console.log(err);
        })

       
    } catch (error) {
        res.send(error)
    }

})





// ********************************* ADD DRESS TYPE PART  *******************************


app.patch('/addclparttype/:id/:obid', async (req, res) => {


    const _id = req.params.id;
    const obid = req.params.obid

    const date = Date.now()
    const stringdate = date.toString()
    console.log(stringdate);
    getschema.findOneAndUpdate({ "_id": _id, "ctype._id": obid }, {
        $push: {
            "ctype.$.cltype":
            {

                cltpartname: req.body.clothname,
                id  : stringdate,
                _id  : stringdate
            },
        }
    })
        .then(data => {
            res.status(201).json(data);
        }).catch(err => {
            console.log(err);
        })
})






// ********************************* DELETE DRESS TYPE PART  *******************************



app.patch('/dldresstypepart/:id/:oid', async (req, res) => {

    const oid = req.params.oid;
    const id = req.params.id
    const id_in_string = oid.toString();

    getschema.findOneAndUpdate({ _id: id, "ctype.cltype.id": oid }, {

        $pull: {
            "ctype.$.cltype": {

                'id': id_in_string
            }
        }
    }, { new: true })
        .then(data => {
            if (!data) {
                console.log('something went wrong');
            } else {
                res.status(201).json(data)
                console.log("delete success");
            }
        }).catch(err => {
            console.log(err);
        })
})




//************************************ UPDATE MESURMENT OF CUSTOEMR ********************************* */


app.patch('/editmeasurment/:id/:obid/:orid', async (req, res) => {
    try {

        const id = req.params.id
        const obid = req.params.obid
        const orid = req.params.orid
        console.log(id);
        console.log(obid);
        console.log(orid);

        
        const updateuser = await getschema.updateOne(
        {
            "_id":id,
            "costomer": {
                $elemMatch : {
                    obid, "cmeasure._id":orid
                }
            },
        },
        { "$set": { 
            "costomer.$[outer].cmeasure.$[inner].neak": req.body.inputs,
            "costomer.$[outer].cmeasure.$[inner].clmesurement": req.body.clmesurement,
            "costomer.$[outer].cmeasure.$[inner].impnote": req.body.impnote

            } 
        },
        { "arrayFilters": [
            { "outer._id": obid },
            { "inner._id": orid }
            ] 
        },
        ).then(data => {
            if (!data) {
                console.log('something went wrong');
            } else {
                console.log(data);
                res.status(201).json(data)
                console.log("Profile Update success");
            }
        }).catch(err => {
            console.log(err);
        })

       
    } catch (error) {
        res.send(error)
    }

})




//************************************ UPDATE ORDER OF CUSTOEMR ********************************* */


app.patch('/editorder/:id/:obid/:orid', async (req, res) => {
    try {

        const id = req.params.id
        const obid = req.params.obid
        const orid = req.params.orid
        console.log(id);
        console.log(obid);
        console.log(orid);

        
        const updateuser = await getschema.updateOne(
        {
            "_id":id,
            "costomer": {
                $elemMatch : {
                    obid, "corder._id":orid
                }
            },
        },
        { "$set": { 
            "costomer.$[outer].corder.$[inner].specialNote": req.body.specialNote,
            "costomer.$[outer].corder.$[inner].prize": req.body.prize,
            "costomer.$[outer].corder.$[inner].deliveryDate": req.body.ddate,
            "costomer.$[outer].corder.$[inner].deliveryMonth": req.body.dmonth,
            "costomer.$[outer].corder.$[inner].deliveryYear": req.body.dyear,
            "costomer.$[outer].corder.$[inner].orderUrgent": req.body.checked,
            
            } 
        },
        { "arrayFilters": [
            { "outer._id": obid },
            { "inner._id": orid }
            ] 
        },
        ).then(data => {
            if (!data) {
                console.log('something went wrong');
            } else {
                console.log(data);
                res.status(201).json(data)
                console.log("Profile Update success");
            }
        }).catch(err => {
            console.log(err);
        })

       
    } catch (error) {
        res.send(error)
    }

})














app.patch('/check/:id', (req, res) => {

    const id = req.params.id;
    console.log(id);

    getschema.findByIdAndUpdate(id, {

        $push: {
            ctype: {

                clname: req.body.clname
            }
        }

    })
        .then(data => {

            console.log(data);
            // res.status(201).json(data);

        }).catch(err => {
            console.log(err);
        })
})


app.listen(port, () => {
    console.log('server created');
})


