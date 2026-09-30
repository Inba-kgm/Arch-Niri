#!/usr/bin/env zsh

DEVICE="/dev/nvme0n1p4"

if lsblk -no MOUNTPOINT "$DEVICE" | grep -q .; then
    echo "PublicSpace is already mounted."
    exit 0
fi

echo "Mounting PublicSpace..."

if udisksctl mount -b "$DEVICE"; then
    echo "PublicSpace mounted successfully."
else
    echo "Failed to mount PublicSpace."
    exit 1
fi
