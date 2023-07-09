const User = require('../models/user');

module.exports = function(app){


//GET - VER
app.get ('/users', (req, res) => {
    User.getUsers((err, data)=> {
        res.status(200).json(data);
    });
});


//POST - INSERTAR
app.post('/users', (req, res)=> {
    const userData = {
        id: null,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        create_at: null,
        update_at: null
    };
    User.insertUser(userData, (err, data)=> {
        if(data && data.insertId){
            res.status(200).json({
                success: true,
                msg: 'User Insert',
                data: data
            })
        }else {
            res.status(500).json({
                success: false,
                msg: 'Error'
            })
        }
    }) 
});

// PUT - ACTUALIZAR
app.put('/users/:id', (req,res) =>{
    const userData = {
        id: req.params.id,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        create_at: null,
        update_at: null
    };


    User.updateUser(userData, (err, data)=> {
        if(data && data.msg){
            res.json(data);
        }else{
            res.json({
                success: false,
                msg: "error"
            })
        }
    })
    });


//DELETE - BORRAR
app.delete('/users/:id', (req,res)=>{
    User.deleteUser(req.params.id, (err, data)=>{
        if(data && data.msg === "DELETED" || data.msg === "Not Exist"){
            res.json({
                success:true,
                data
            })
        }else{
            res.status(500).json({
                msg: "Error"
            })
        }
    })

});

}
