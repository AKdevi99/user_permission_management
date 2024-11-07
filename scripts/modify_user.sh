#!/bin/bash

username=$1
new_group=$2
user_file="users.txt"

# Check if user exists
if ! grep -q "^$username:" "$user_file"; then
    echo "User $username does not exist."
    exit 1
fi

# Modify the user’s group
sed -i.bak "s/^$username:\(.*\):.*/$username:\1:$new_group/" "$user_file"
echo "User $username modified successfully."
