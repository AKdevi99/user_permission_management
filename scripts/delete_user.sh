#!/bin/bash

username=$1
user_file="users.txt"

# Check if user exists
if ! grep -q "^$username:" "$user_file"; then
    echo "User $username does not exist."
    exit 1
fi

# Delete the user from users.txt
sed -i.bak "/^$username:/d" "$user_file"
echo "User $username deleted successfully."
