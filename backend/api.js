// ===========Server=============
const express = require('express')
const bodyParser = require('body-parser')

const client = require('./connection')
const app = express() //menggunakan express

app.use(bodyParser.json()) //body parser pake json untk baca json postman

app.listen(3100, ()=> {
    console.log('Serper berlari pada pelabuhan 3100')
})

client.connect(err => {
    if(err){
        console.log('lu mending cek ulang lagi kodingan lu dah')
    } else {
        console.log('Konek nih min')
    }
    
})


// =============CRUD==============
//Read
app.get('/laundry', (req, res) => {
    client.query(`Select * from laundry`, (err, result) => {
        if(!err){
            res.send(result.rows)
        }
    })
})
//Create
app.post('/laundry', (req, res) => {
    const {pelanggan, kg, harga} = req.body

    client.query((`insert into laundry(pelanggan, kg, harga)  
        values('${pelanggan}', '${kg}', '${harga}')`), (err, result) => {
            if(!err){
                res.send('Data keinput nih min')
            } else {
                res.send(err.message)
            }
    })
})
//Update
app.put('/laundry/:id', (req, res) => {
    const {pelanggan, kg, harga } = req.body
    client.query((`update laundry set pelanggan = '${pelanggan}', kg = '${kg}', harga = '${harga}' where id = ${req.params.id}`), (err, result) => {
        if(!err) {  
            res.send('Data ke-update nih min');  
        } else {  
            res.send(err.message);  
        }  
    })
})

//Delete
app.delete('/laundry/:id', (req, res) => {


    client.query((`delete from laundry where id = ${req.params.id}`), (err, result) => {
        if(!err) {  
            res.send('Dah gua ilangin data-nya');  
        } else {  
            res.send(err.message);  
        }  
    })
})

