const {verifyToken} = require('../Config/Jwtauthentication')

const checkisadmin = (req,res,next)=>{
    try{
        if(!req.get('Authorization')) return res.status(401).json({error : "token Expired"})
        const token = req.get('Authorization').split("Bearer ")[1]
        const admin = verifyToken(token)

        if(admin.role =='ADMIN' || admin.role == 'SUPERADMIN'){
            next()
        }
        else{
            return res.status(401).json({error : "Not an Admin"}) 
        }
    }catch(e){
        console.log(e)
        return res.status(401).json({error : "Not an Admin Token Modified"})
    }
}


const checkissuperadmin = (req,res,next)=>{
    try{
        if(!req.get('Authorization')) return res.status(401).json({error : "token Expired"})
        const token = req.get('Authorization').split("Bearer ")[1]

        const admin = verifyToken(token)

        if(admin.role == 'SUPERADMIN'){
            next()
        }
        else{
            return res.status(401).json({error : "Not an Admin"}) 
        }
    }catch(e){
        console.log(e)
        return res.status(401).json({error : "Not an Admin"})
    }
}

module.exports = {
    checkisadmin,
    checkissuperadmin   
}