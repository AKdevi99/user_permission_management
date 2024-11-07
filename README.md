Here's a comprehensive README that combines both sections, adding attractive buttons, tables, and a Postman guide, along with an acknowledgment section. 

---

# User Permission Management System

Welcome to the **User Permission Management System**! This system, built with **Express.js** and **Shell Scripting**, allows easy management of user permissions via a REST API interface. It facilitates user addition, modification, and deletion, making it useful for handling user data and permissions.

---

## Quick Links

<a href="https://github.com/AKdevi99/user-permission-management" style="text-decoration: none;">
    <img src="https://img.shields.io/badge/Clone%20Repo-%23000000?style=for-the-badge&logo=github&logoColor=white" alt="Clone Repo">
</a>
<a href="#getting-started" style="text-decoration: none;">
    <img src="https://img.shields.io/badge/Get%20Started-%230081CB?style=for-the-badge&logo=launchpad&logoColor=white" alt="Get Started">
</a>
<a href="#api-endpoints" style="text-decoration: none;">
    <img src="https://img.shields.io/badge/API%20Documentation-%23FFA500?style=for-the-badge&logo=swagger&logoColor=white" alt="API Documentation">
</a>

---

## Features

- **Token-based Authentication**: Secure endpoints with JWT tokens.
- **Add, Modify, Delete Users**: Shell commands for managing user data stored in `users.txt`.
- **User Group Management**: Update user groups via API calls.

![Main Screen](#) <!-- Placeholder for screenshots -->

---

## Table of Contents

- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Shell Commands](#shell-commands)
- [Folder Structure](#folder-structure)
- [Screenshots](#screenshots)
- [Testing with Postman](#testing-with-postman)
- [Acknowledgment](#acknowledgment)
- [License](#license)

---

## Getting Started

### Prerequisites

- ![Node.js](https://img.shields.io/badge/Node.js-%23339933?style=for-the-badge&logo=node.js&logoColor=white) and npm
- ![Git](https://img.shields.io/badge/Git-%23F05032?style=for-the-badge&logo=git&logoColor=white)

Create a `.env` file in the root directory and add the following:

```plaintext
ACCESS_TOKEN_SECRET=<your_jwt_secret>
PORT=3000
```

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/AKdevi99/user-permission-management.git
cd user-permission-management
npm install
```

<a href="https://github.com/AKdevi99/user-permission-management/fork" style="text-decoration: none;">
    <img src="https://img.shields.io/badge/Fork%20Repo-%23000000?style=for-the-badge&logo=github&logoColor=white" alt="Fork Repo">
</a>

---

### Usage

1. **Start the server**  
   ```bash
   npm start
   ```
   The server will run at `http://localhost:3000`.

2. **Obtain an Access Token**  
   ```bash
   curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"username":"your_username"}'
   ```
   Use this token in the `Authorization` header for secure API calls.

---

## API Endpoints

| Method | Endpoint         | Description                   | Parameters                  |
| ------ | ---------------- | ----------------------------- | --------------------------- |
| `POST` | `/login`         | Generates an access token     | `username`                  |
| `POST` | `/user`          | Adds a new user               | `username`, `password`, `group` |
| `DELETE` | `/user`        | Deletes a user                | `username`                  |
| `PUT`  | `/user`          | Modifies a user's group       | `username`, `newGroup`      |

### Example Requests

Here's an example of calling the **Add User** API endpoint:

```bash
curl -X POST http://localhost:3000/user -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"username":"jdoe", "password":"password123", "group":"admin"}'
```

> **Note**: Replace `<token>` with your JWT token obtained from `/login`.

---

## Shell Commands

The shell scripts under `scripts/` handle user operations at the system level:

| Script            | Description                              |
| ----------------- | ---------------------------------------- |
| `add_user.sh`     | Adds a new user with a username, password, and group |
| `delete_user.sh`  | Deletes a user by username               |
| `modify_user.sh`  | Changes the group of an existing user    |

Each script checks for existing entries and updates `users.txt`.

```bash
# Example usage of add_user.sh
./scripts/add_user.sh jdoe password123 admin
```

---

## Folder Structure

```plaintext
user-permission-management/
├── index.js                # Main server file
├── scripts/
│   ├── add_user.sh         # Shell script to add user
│   ├── delete_user.sh      # Shell script to delete user
│   └── modify_user.sh      # Shell script to modify user
├── .env                    # Environment variables
├── package.json            # Project dependencies
└── README.md               # Project documentation
```

---

## Screenshots

1. **Result after successfull creation**  
   <img width="1099" alt="image" src="https://github.com/user-attachments/assets/7b213b5e-1b79-4123-b123-5896a7cc9e39">
---
2. **Getting Token**  
   <img width="1068" alt="image" src="https://github.com/user-attachments/assets/d5682ef3-1a79-42c2-adb5-f3a441526b11">
---
3.**Result after deleting the user**
<img width="1073" alt="image" src="https://github.com/user-attachments/assets/f95d8792-1c98-48cf-8bce-403cd09dae76">

---

## Testing with Postman

You can test each endpoint using [Postman](https://www.postman.com/). Follow these steps for a quick start:

1. **Get an Access Token**  
   - **Method**: `POST`
   - **URL**: `http://localhost:3000/login`
   - **Body**: 
     ```json
     {
       "username": "your_username"
     }
     ```
   - Copy the `accessToken` from the response.

2. **Use Access Token for Authenticated Requests**  
   For the `/user` endpoints, set the `Authorization` header:
   - Go to **Headers** in Postman.
   - Add `Authorization` with the value `Bearer <your_access_token>`.

3. **Testing Endpoints**  
   - **Add a User**:  
     - **Method**: `POST`
     - **URL**: `http://localhost:3000/user`
     - **Body**:
       ```json
       {
         "username": "new_user",
         "password": "password123",
         "group": "admin"
       }
       ```

   - **Delete a User**:
     - **Method**: `DELETE`
     - **URL**: `http://localhost:3000/user`
     - **Body**:
       ```json
       {
         "username": "new_user"
       }
       ```

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
