#!/bin/bash

username=$1
password=$2
group=$3
user_file="users.txt"

if grep -q "^$username:" "$user_file"; then
    echo "User $username already exists."
    exit 1
fi

echo "$username:$password:$group" >> "$user_file"
echo "User $username created successfully."
