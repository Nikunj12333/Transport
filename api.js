const client = require('./connection.js')
const express = require('express');
const app = express();

app.listen(443, ()=>{
    console.log("Sever is now listening at port 443");
})

client.connect();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get('/users', (req, res)=>{
    client.query(`Select * from users`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})


app.get('/users/:id', (req, res)=>{
    client.query(`Select * from users where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})


app.post('/users', (req, res)=> {
    const user = req.body;
    let insertQuery = `insert into users(id, parent_id, reg_no, chasis_no, engine_no, owner_name, fuel_type, vh_class, maker, 
        regn_dt, rto, state, is_active) 
                       values(${user.id}, '${user.parent_id}', '${user.reg_no}', '${user.chasis_no}','${user.engine_no}',
                       '${user.owner_name}','${user.fuel_type}','${user.vh_class}', '${user.maker}','${user.regn_dt}','${user.rto}',
                       '${user.state}','${user.is_active}')`
                       

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.put('/users/:id', (req, res)=> {
    let user = req.body;
    let updateQuery = `update users
                       set parent_id =  '${user.parent_id}' ,
                       reg_no = '${user.reg_no}' ,
                       chasis_no = '${user.chasis_no}' ,
                       engine_no = '${user.engine_no}' ,
                       owner_name = '${user.owner_name}' ,
                       fuel_type = '${user.fuel_type}' ,
                       vh_class = '${user.vh_class}' ,
                       maker = '${user.maker}' ,
                       regn_dt = '${user.regn_dt}' ,
                       rto = '${user.rto}' ,
                       state = '${user.state}' ,
                       is_active = '${user.is_active}'
                       where id = ${user.id}`


    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})


app.delete('/users/:id', (req, res)=> {
    let insertQuery = `delete from users where id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})