const contactlist = require('../Modal/ContactModal')

const handleCreateContact = async (req, res) => {
    try {
        if (!req.body) return res.status(400).json({ error: "Body Can Not Be Empty" });
        const result = await contactlist.create({
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            message: req.body.message,
        })

        return res.status(201).json({ message: "Connection created SucessFully", result })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ error: "All Field are Required" });
    }
}

const handleGetContact = async (req, res) => {
    try {
        const result = await contactlist.find({status : 'Pending'});
        return res.status(200).json(result)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: 'internal Server Error' });
    }
}

const handleCallBackRequest = async (req,res)=>{
    try{
        // const result = await sendMailOfCallBack(req.body.name, req.body.phoneNumber, req.body.instituteName)
        return res.status(200).json({message : 'Sent sucessfully'})
    }catch(e){
        return res.status(200).json({e : e});
    }
}

const handleupdatecontact =async (req , res)=>{
    try{
        id = req.params.id
        if(!id) return res.status(400).json({ error: "ID not found" });
        const result = await contactlist.findByIdAndUpdate(id , {status : 'Connected'})
        if(!result) res.status(404).json({error : "Element Not Found"})
        console.log("updated sucessfully")
        return res.status(200).json({ message: "Updated SucessFully"})
    }catch(e){
        console.log(e)
        return res.status(500).json({ error: 'internal Server Error' });
    }
}

module.exports = {
    handleCreateContact,
    handleGetContact,
    handleCallBackRequest,
    handleupdatecontact
}

