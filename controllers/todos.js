const Item = require('../models/Item')

module.exports = {
    getItems: async (req,res)=>{
        console.log(req.user)
        try{
            const itemItems = await Item.find({userId:req.user.id})
            const itemsLeft = await Item.countDocuments({userId:req.user.id,completed: false})
            res.render('items.ejs', {items: itemItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createItem: async (req, res)=>{
        try{
            await Item.create({item: req.body.orderItem, completed: false, userId: req.user.id})
            console.log('Item has been added!')
            res.redirect('/items')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Item.findOneAndUpdate({_id:req.body.itemIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Item.findOneAndUpdate({_id:req.body.itemIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteItem: async (req, res)=>{
        console.log(req.body.itemIdFromJSFile)
        try{
            await Item.findOneAndDelete({_id:req.body.itemIdFromJSFile})
            console.log('Deleted Item')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    