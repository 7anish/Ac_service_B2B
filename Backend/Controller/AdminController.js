
const admin = require('../Modal/AdminModal')
const {generateToken} = require('../Config/Jwtauthentication');

const handleCreateAdmin = async (req , res)=>{
    try{
        if (!req.body) return res.status(400).json({ error: "Body Not found" });
        const result = await admin.create({
            name : req.body.name,
            email : req.body.email,
            password: req.body.password,
        })
        return res.status(201).json({Message : "Admin Created SucessFully Waiting For verification"})
    }catch(e){
        console.log(e)
        return res.status(500).json({error : "Internal Server Error"})
    }
}

const handleLoginAsAdmin =async (req,res)=>{
    try {
        const data = req.body
        if (!req.body) return res.status(400).json({ error: "Body Not found" });
        const result = await admin.matchpassword( data.email , data.password);

        if(result.role === 'NONE') return res.status(403).json({ error: "Unauthorised" });
        const token = generateToken(result.email , result._id , result.role); // Generatin the Jwt tokern
        
        return res.status(200).json({ token : token});

    }catch(e){
        console.log(e);
        return res.status(400).json({error : "not found"});
    }
}

module.exports = {
    handleLoginAsAdmin,
    handleCreateAdmin
}