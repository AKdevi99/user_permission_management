const express = require("express");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {exec} = require('child_process');
const { stdout, stderr } = require("process");

dotenv.config();


const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;


function authenticateToken(req,res,next){
    const token = req.headers['authorization'];
    if(!token) return res.sendStatus(403);


    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}
//Generate a token (in a real app, this would come from a login system).
app.post('/login',(req,res) => {
    const {username} = req.body;
    const user = {name:username};
    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, {
        expiresIn:'1h'
    });

    res.json({accessToken});

});
//This endpoint will add a new user using add_user.sh.
app.post('/user',authenticateToken, (req,res) => {
    const {username , password,group} = req.body;
    exec(`./scripts/add_user.sh ${username} ${password} ${group}`,(error,stdout,stderr) =>{
        if(error) {
            console.error(`ERROR: ${stderr}`);
            return res.status(500).json({message:"User creation failed",error:stderr});
        }
        res.status(201).json({message:stdout});
    });


});

//This endpoint deletes a user using delete_user.sh.
app.delete('/user', authenticateToken, (req, res) => {
    const { username } = req.body;

    exec(`./scripts/delete_user.sh ${username}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${stderr}`);
            return res.status(500).json({ message: "User deletion failed", error: stderr });
        }
        res.status(200).json({ message: stdout });
    });
});


//This endpoint modifies a user’s group using modify_user.sh

app.put('/user', authenticateToken, (req, res) => {
    const { username, newGroup } = req.body;

    exec(`./scripts/modify_user.sh ${username} ${newGroup}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${stderr}`);
            return res.status(500).json({ message: "User modification failed", error: stderr });
        }
        res.status(200).json({ message: stdout });
    });
});


app.listen(PORT, () => {
    console.log(`Server running on <http://localhost>:${PORT}`);
});

