#!/usr/bin/env bash

# Get current Wi-Fi status
WIFI_STATUS=$(nmcli radio wifi)

# Define action strings
TOGGLE_OFF="󰖪  Turn Wi-Fi Off"
TOGGLE_ON="󰖩  Turn Wi-Fi On"

# Custom Rofi theme override to handle the side-by-side top bar and layout
ROFI_THEME='
    listview {
        columns: 2;
        lines: 8;
    }
    element {
        padding: 8px;
    }
'
if [ "$WIFI_STATUS" = "enabled" ]; then
    WIFI_LIST=$(nmcli --fields SSID,SECURITY,BARS device wifi list | sed 1d | grep -v '^--' | awk -F'  +' '{print $1 " (" $2 ") " $3}')
    ACTIVE_WIFI=$(nmcli -t -f ACTIVE,SSID dev wifi | grep '^yes' | cut -d ':' -f2)
    
    if [ -n "$ACTIVE_WIFI" ]; then
        DISCONNECT_OPTION="󰖦  Disconnect ($ACTIVE_WIFI)"
        # Toggle Off (Left) | Disconnect (Right)
        SELECTION=$(echo -e "$TOGGLE_OFF\n$DISCONNECT_OPTION\n$WIFI_LIST" | rofi -dmenu -i -p "Wi-Fi Networks:" -theme-str "$ROFI_THEME")
    else
        SELECTION=$(echo -e "$TOGGLE_OFF\n\n$WIFI_LIST" | rofi -dmenu -i -p "Wi-Fi Networks:" -theme-str "$ROFI_THEME")
    fi
else
    SELECTION=$(echo -e "$TOGGLE_ON" | rofi -dmenu -i -p "Wi-Fi is Off:")
fi

[ -z "$SELECTION" ] || [ "$SELECTION" = "" ] && exit 0

if [[ "$SELECTION" == "$TOGGLE_ON" ]]; then
    nmcli radio wifi on
elif [[ "$SELECTION" == "$TOGGLE_OFF" ]]; then
    nmcli radio wifi off
elif [[ "$SELECTION" == "󰖦  Disconnect"* ]]; then
    nmcli device disconnect $(nmcli device | grep wifi | awk '{print $1}')
else
    SSID=$(echo "$SELECTION" | sed 's/ (.*//')
    if [ -n "$SSID" ]; then
        if nmcli connection show | grep -q "$SSID"; then
            nmcli device wifi connect "$SSID"
        else
            PASSWORD=$(rofi -dmenu -password -p "Enter Password for $SSID:")
            [ -n "$PASSWORD" ] && nmcli device wifi connect "$SSID" password "$PASSWORD"
        fi
    fi
fi
