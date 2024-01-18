# Explication du Code Node.js pour l'API CRUD avec MySQL

Le code fourni est un exemple d'API CRUD (Create, Read, Update, Delete) utilisant Node.js, Express et MySQL pour manipuler une base de données d'utilisateurs.

## Importation des Modules
```javascript
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
```
Ces lignes importent les modules nécessaires : `mysql` pour la connexion à la base de données, `express` pour la création de l'API et `body-parser` pour analyser les données JSON envoyées par les requêtes.

## Configuration de l'Application Express
```javascript
const app = express();
app.use(bodyParser.json());
```
Ces lignes créent une instance de l'application Express et configure le middleware `body-parser` pour analyser les requêtes au format JSON.

## Connexion à la Base de Données MySQL
```javascript
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud'
});
connection.connect((error) => {
    // Gestion de la connexion
});
```
Ces lignes établissent une connexion à la base de données MySQL en spécifiant l'hôte, l'utilisateur, le mot de passe et la base de données à utiliser. La méthode `connect` est utilisée pour établir la connexion.

## Routes CRUD pour les Utilisateurs
### Récupérer tous les utilisateurs
```javascript
app.get('/users', (req, res) => {
    // Requête pour récupérer tous les utilisateurs
    let sql = "SELECT * FROM users";
    connection.query(sql , (err,result)=>{
        if(err){
            res.status(500).json({error: 'Erreur lors dela recuperation des utilisateurs'})
        } else {
            res.status(200).json({users: result})
        }
    })
});
```

### Récupérer un utilisateur par ID
```javascript
app.get('/users/:id', (req, res) => {
    // Requête pour récupérer un utilisateur par ID
    const idUser= req.params.id;
    let sql = "SELECT * FROM users WHERE id = ?";
    connection.query(sql ,[idUser], (err,result)=>{
        if(err){
            res.status(500).json({error: 'Erreur lors dela recuperation des utilisateurs'})
        } else {
            res.status(200).json({user: result})
        }
    })
});
```

### Créer un nouvel utilisateur
```javascript
app.post('/users', (req, res) => {
    // Requête pour créer un nouvel utilisateur
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
});
```

### Mettre à jour un utilisateur par ID
```javascript
app.put('/users/:id', (req, res) => {
    // Requête pour mettre à jour un utilisateur par ID
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
});
```

### Supprimer un utilisateur par ID
```javascript
app.delete('/users/:id', (req, res) => {
    // Requête pour supprimer un utilisateur par ID
    const id=req.params.id;
    let sql="DELETE FROM users WHERE id = ? ";
    connection.query(sql,[id],(error,result)=> {
        if(error){
            res.status(800).json({error: 'Erreur lors de la suppression de l\'utilisateur'})
        } else {
            res.status(200).json({ message: 'Utilisateur supprimé avec succes'})
        }
    })
});
```

### Supprimer tous les utilisateurs
```javascript
app.delete('/users', (req, res) => {
    // Requête pour supprimer tous les utilisateurs
    let sql="DELETE FROM users ";
    connection.query(sql,(error,result)=> {
        if(error){
            res.status(800).json({error: 'Erreur lors de la suppression de l\'utilisateur'})
        } else {
            res.status(200).json({ message: 'Utilisateur supprimé avec succes'})
        }
    })
});
```

## Démarrer le Serveur
```javascript
app.listen(3000, () => {
    console.log('serveur en cours');
});
```
Cette ligne démarre le serveur Express sur le port 3000.

Cet exemple illustre la mise en place d'une API CRUD basique avec Node.js, Express et MySQL pour gérer les opérations de base sur une table d'utilisateurs.