#!/bin/zsh

if [ "$1" = "next" ]; then
asusctl aura effect --next-mode
elif [ "$1" = "prev" ]; then
asusctl aura effect --prev-mode
fi

MODE=$(asusctl aura effect | grep "Active effect" | awk '{print $NF}')

notify-send -h string:x-canonical-private-synchronous:aura \
        -u low \
        -i preferences-desktop-theme \
        "AURA Lighting" "Mode: ${MODE:-Switched}"
