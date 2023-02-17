module.exports={
    isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            next()
        }else{
            res.redirect('/signin')
        }
        
    },
    isNotLogged(req, res, next){
        if(!req.isAuthenticated()){
            next()
        }else{
            res.redirect('/profile')
        }
    }
}