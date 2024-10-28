const order = require('../Modal/OrderModal')

const handleCreateOrder = async (req, res) => {
    try {
        if (!req.body) return res.status(400).json({ error: "Body Can Not Be Empty" });
        const data = req.body
        const result = await order.create({
            name : data.name,
            phonenumber : data.phonenumber,
            gmail : data.gmail,
            pincode : data.pincode,
            city : data.city,
            service : data.service,
            servicetype : data.servicetype,
            address : data.address,
            houseNo : data.houseNo,
            landmark : data.landmark
        })

        return res.status(201).json({ message: "Ordered Sucessfully", result })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ error: "All Field are Required" });
    }
}

const handleGetOrder = async (req, res) => {
    try {
        const result = await order.find({status : 'Pending'});
        return res.status(200).json(result)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: 'internal Server Error' });
    }
}

const handleupdateorder =async (req , res)=>{
    try{
        id = req.params.id
        if(!id) return res.status(400).json({ error: "ID not found" });
        const result = await order.findByIdAndUpdate(id , {status : 'Connected'})
        if(!result) res.status(404).json({error : "Element Not Found"});
        console.log("updated sucessfully");
        return res.status(200).json({ message: "Updated SucessFully"})
    }catch(e){
        console.log(e)
        return res.status(500).json({ error: 'internal Server Error' });
    }
}


module.exports = { handleCreateOrder,handleGetOrder , handleupdateorder}

