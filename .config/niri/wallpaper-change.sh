#!/usr/bin/env zsh

# Enable advanced pattern matching features in Zsh
setopt extended_glob

# Path to your wallpapers folder
WALLPAPER_DIR="$HOME/Pictures/Wallpapers"
# File to save the last played wallpaper path
STATE_FILE="$HOME/.cache/current_wallpaper"

# Check if the directory exists
if [[ ! -d "$WALLPAPER_DIR" ]]; then
    echo "Directory $WALLPAPER_DIR does not exist." >&2
    exit 1
fi

# 1. Gather and sort all valid images into a Zsh array
cd "$WALLPAPER_DIR" || exit 1
wallpapers=( *(#i)*(jpg|jpeg|png|webp|gif)(.) )

# Exit if the directory is empty or no matches found
if [[ ${#wallpapers} -eq 0 || "$wallpapers[1]" == *"*(#i)*"* ]]; then
    echo "No matching image files found in $WALLPAPER_DIR" >&2
    exit 1
fi

# 2. Read the last used wallpaper filename
if [[ -f "$STATE_FILE" ]]; then
    last_wallpaper=$(cat "$STATE_FILE")
    # Find its index position in the array (Zsh arrays are 1-indexed)
    idx=$wallpapers[(I)$last_wallpaper]
else
    idx=0
fi

# 3. Calculate the next index (loop back to 1 if at the end or if index wasn't found)
if (( idx == 0 || idx == ${#wallpapers} )); then
    next_idx=1
else
    next_idx=$(( idx + 1 ))
fi

# 4. Select the target wallpaper and update the state file
NEXT_WALLPAPER=$wallpapers[$next_idx]
echo "$NEXT_WALLPAPER" > "$STATE_FILE"
FULL_PATH="$WALLPAPER_DIR/$NEXT_WALLPAPER"

# 5. Apply the wallpaper using awww
if pgrep -x "awww-daemon" > /dev/null; then
    awww img "$FULL_PATH" --transition-type random --transition-duration 0.5
else
    awww-daemon &
    sleep 0
    awww img "$FULL_PATH"
fi

#!/usr/bin/env bash


wallust run "$FULL_PATH"

echo "Wallust successfully synced to active wallpaper: $WP_PATH"
