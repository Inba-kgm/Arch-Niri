#!/usr/bin/env zsh
printf '\e[?7l'
fastfetch --logo NetHydra --structure OS:Kernel:Host:WM:Terminal:CPU:Memory:Disk:Battery
printf '\e[?7h'
exec /bin/zsh
