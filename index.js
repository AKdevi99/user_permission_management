const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { exec } = require("child_process");

dotenv.config();

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Middleware for token authentication
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        console.log("No token provided");
        return res.sendStatus(403);  // Forbidden if no token
    }

    console.log('Token received:', token);  // Debugging log

    // Remove "Bearer " prefix from token if present
    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

    jwt.verify(tokenWithoutBearer, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log("Token verification failed:", err.message);  // Log the error
            return res.sendStatus(403);  // Forbidden if token verification fails
        }

        console.log("Token verified successfully, user:", user);  // Log user info from token
        req.user = user;
        next();
    });
}


// Generate a token for demonstration purposes
app.post("/login", (req, res) => {
    const { username } = req.body;
    const user = { name: username };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
    res.json({ accessToken });
});


app.post('/user', authenticateToken, (req, res) => {
    const { username, password, group } = req.body;
    
    // Replace this with the logic you're using for adding a user
    exec(`./scripts/add_user.sh ${username} ${password} ${group}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`ERROR: ${stderr}`);
            return res.status(500).json({ message: "User creation failed", error: stderr });
        }
        res.status(201).json({ message: stdout });
    });
});


// Endpoint to delete a user
app.delete("/user", authenticateToken, (req, res) => {
    const { username } = req.body;
    exec(`./scripts/delete_user.sh ${username}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${stderr}`);
            return res.status(500).json({ message: "User deletion failed", error: stderr });
        }
        res.status(200).json({ message: stdout.trim() });
    });
});

// Endpoint to modify a user's group
app.put("/user", authenticateToken, (req, res) => {
    const { username, newGroup } = req.body;
    exec(`./scripts/modify_user.sh ${username} ${newGroup}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${stderr}`);
            return res.status(500).json({ message: "User modification failed", error: stderr });
        }
        res.status(200).json({ message: stdout.trim() });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
