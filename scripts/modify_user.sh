#!/bin/bash
USERNAME=$1
NEW_GROUP=$2

if id "$USERNAME" &>/dev/null; then
	usermod -g "$NEW_GROUP" "$USERNAME"
	echo "User $USERNAME modified successfully."
else
	echo "User $USERNAME does not exist."
fi
