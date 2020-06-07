const Spot = require('../models/Spot')
const User = require('./../models/User')

module.exports = {

    async index(req, res){
        const {tech} = req.query

        const spots = await Spot.find({techs:tech})

        return res.json(spots)
    },

    async store(req,res){
        //console.log(req.body);
        //usando multer a propriedade file é criada na requisição
        //console.log(req.file)
        const {filename} = req.file
        const {company,techs,price} = req.body
        const {user_id} = req.headers
        
        const user = await User.findById(user_id)

        if(!user){
            return res.status(400).json({error:'Usuário não existe irmão'})
        }

        const spot = await Spot.create({
            user:user_id,
            thumbnail: filename,
            company,
            techs: techs.split(',').map(tech => tech.trim()),
            price
        })

        return res.json(spot)
    }
}