#!/bin/bash
USERNAME=$1
PASSWORD=$2
GROUP=$3

if id "$USERNAME" &>/dev/null; then
    echo "User $USERNAME already exists."
else
    useradd -m -p $(openssl passwd -1 "$PASSWORD") -g "$GROUP" "$USERNAME"
    echo "User $USERNAME created successfully."
fi
