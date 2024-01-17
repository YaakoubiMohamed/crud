const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',  // 127.0.0.1
    user: 'root',
    password: '',// mot de passe par defaut vide
    database: 'crud'
});

connection.connect((error) => {
    if (error){
        console.log("Erreur lors de la connexion à MySQL : " + error);
    }else {
        console.log("Connexion réussie !");
    }
})

// get all users
app.get('/users',(req,res) =>{
    let sql = "SELECT * FROM users";
    connection.query(sql , (err,result)=>{
        if(err){
            res.status(500).json({error: 'Erreur lors dela recuperation des utilisateurs'})
        } else {
            res.status(200).json({users: result})
        }
    })
})

//get user by ID
app.get('/users/:id',(req,res) =>{
    const idUser= req.params.id;
    let sql = "SELECT * FROM users WHERE id = ?";
    connection.query(sql ,[idUser], (err,result)=>{
        if(err){
            res.status(500).json({error: 'Erreur lors dela recuperation des utilisateurs'})
        } else {
            res.status(200).json({user: result})
        }
    })
})

// create new user
app.post('/users',(req,res)=>{
    let data = req.body;
    console.log(data)
    let sql =`INSERT INTO users (nom,prenom,email,password) VALUES (?,?,?,?)`;
    connection.query(sql,[data.nom,data.prenom, data.email, data.password],(error) =>{
        if(error){
            res.status(500).json({error:'Impossible d\'ajouter l\'utilisateur '})
            console.log('Impossible d\'ajouter l\'utilisateur ')
        } else {
            res.status(201).json({message:"Utilisateur ajouté avec succes"})
            console.log("Utilisateur ajouté avec succes")
        }
    })
})


// update user by id
app.put('/users/:id', (req,res)=>{
    const id=req.params.id;
    const {nom,prenom,email, password}= req.body;
    let sql ="UPDATE users SET nom= ?, prenom= ?, email= ?, password= ? WHERE id = ?";
    connection.query(sql,[nom,prenom,email,password, id], (error) =>{
        if(error){
            res.status(500).json({error:"Erreur lors de la mise ajour de l\'utilisateur"})
        } else {
            res.status(200).json({message : `L\'utilisateur a ete modifier avec succes`})
        }
    })
    
})

// delete user by id
app.delete('/users/:id',(req,res)=>{
    const id=req.params.id;
    let sql="DELETE FROM users WHERE id = ? ";
    connection.query(sql,[id],(error,result)=> {
        if(error){
            res.status(800).json({error: 'Erreur lors de la suppression de l\'utilisateur'})
        } else {
            res.status(200).json({ message: 'Utilisateur supprimé avec succes'})
        }
    })
})

// delete all users
app.delete('/users',(req,res)=>{
    let sql="DELETE FROM users ";
    connection.query(sql,(error,result)=> {
        if(error){
            res.status(800).json({error: 'Erreur lors de la suppression de l\'utilisateur'})
        } else {
            res.status(200).json({ message: 'Utilisateur supprimé avec succes'})
        }
    })
})


app.listen(3000, () =>{
    console.log('serveur en cours')
})

