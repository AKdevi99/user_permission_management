#!/bin/bash
USERNAME=$1

if id "$USERNAME" &>/dev/null; then
	userdel -r "$USERNAME"
	echo "USER $USERNAME deleted successfully."
else
	echo "User $USERNAME does not exist."
fi

