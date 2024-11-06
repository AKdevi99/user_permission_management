#!/bin/bash

username=$1
password=$2
group=$3

# Check if the user already exists
if id "$username" &>/dev/null; then
    echo "User $username already exists."
    exit 1
fi

# Create a new user
sudo dscl . -create /Users/$username
sudo dscl . -create /Users/$username UserShell /bin/bash
sudo dscl . -create /Users/$username RealName "$username"
sudo dscl . -create /Users/$username UniqueID "1001"  # Ensure to use a unique ID
sudo dscl . -create /Users/$username PrimaryGroupID 80  # 80 is the group ID for staff
sudo dscl . -passwd /Users/$username "$password"
sudo dscl . -append /Groups/$group GroupMembership $username

# Check if user creation was successful
if id "$username" &>/dev/null; then
    echo "User $username created successfully."
else
    echo "Failed to create user $username."
    exit 1
fi


