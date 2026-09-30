#!/bin/zsh

asusctl profile -n

PROFILE=$(asusctl profile -p | grep "Active profile" | awk '{print $NF}')

notify-send -h string:x-canonical-private-synchronous:profile \
        -u normal \
        -i fan \
        "Performance Profile" "Active: ${PROFILE:-Switched}"
