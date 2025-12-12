#!/bin/bash

readonly THIS_FILE_PATH="${BASH_SOURCE[0]}"
readonly THIS_FILE_DIR="$(dirname "${THIS_FILE_PATH}")"
readonly SCRIPTS_DIR="$THIS_FILE_DIR/scripts"

SCRIPTS_FILES=()
SCRIPT_NAMES=()

getScripts() {
  if [ ! -d "$SCRIPTS_DIR" ]; then
    echo "[ERROR:SCRIPTS_DIR_NOT_FOUND] Directory $SCRIPTS_DIR not found."
    exit 1
  fi

  for file in "$SCRIPTS_DIR"/*; do
    if [ -f "$file" ] && [ -x "$file" ]; then
      SCRIPTS_FILES+=("$file")
      SCRIPT_NAMES+=("$(basename "$file")")
    fi
  done

  if [ ${#SCRIPTS_FILES[@]} -eq 0 ]; then
    echo "[ERROR:EMPTY_SCRIPTS_DIR] No executable script found in $SCRIPTS_DIR"
    exit 1
  fi
}

runScript() {
  # get props
  local SCRIPT_TO_RUN_NAME="$1"

  # get script file path
  local SCRIPT_TO_RUN_FILE=""

  for i in "${!SCRIPT_NAMES[@]}"; do
    if [[ "${SCRIPT_NAMES[$i]}" == "$SCRIPT_TO_RUN_NAME" ]]; then
      SCRIPT_TO_RUN_FILE="${SCRIPTS_FILES[$i]}"
      break
    fi
  done

  # ensure file exists
  if [ ! -f "$SCRIPT_TO_RUN_FILE" ]; then
    echo "[ERROR:SCRIPT_FILE_NOT_FOUND] Script file: $SCRIPT_TO_RUN_FILE not found."
    exit 1
  fi

  # run script
  echo "Executing Script: ${SCRIPT_TO_RUN_FILE} ..."
  "$SCRIPT_TO_RUN_FILE"
  # "${SCRIPT_TO_RUN_FILE}"
}

# Menu interattivo robusto con frecce
showMenu() {

  # local state
  local index=0
  local total=${#SCRIPT_NAMES[@]}
  goPrev() {
    ((index--))
    if [ $index -lt 0 ]; then 
      index=$((total-1)); 
    fi
  }
  goNext() {
    ((index++))
    if [ $index -ge $total ]; then 
      index=0; 
    fi
  }

  # draw console
  drawMenu() {
    clear
    echo "Use arrows ↑↓ and press Enter to run a script:"
    for i in "${!SCRIPT_NAMES[@]}"; do
      if [ $i -eq $index ]; then
        echo "> ${SCRIPT_NAMES[$i]}"
      else
        echo "  ${SCRIPT_NAMES[$i]}"
      fi
    done
  }

  # run
  local KEY_CODE_ESCAPE=$'\x1b'
  local KEY_CODE_UP=$'\x1b[A'
  local KEY_CODE_DOWN=$'\x1b[B'
  local KEY_CODE_ENTER=""

  while true; do
    # re-render
    drawMenu

    # on user key press -> do stuff
    local key1=""

    IFS= read -rsn1 key1  # primo carattere

    if [[ $key1 == $KEY_CODE_ESCAPE ]]; then
      local key2=""
      IFS= read -rsn2 key2  # leggi sequenza escape
      local key="$key1$key2"

      if [[ $key == $KEY_CODE_UP ]]; then  # freccia su
        goPrev
      elif [[ $key == $KEY_CODE_DOWN ]]; then  # freccia giù
        goNext
      fi
    
    elif [[ $key1 == $KEY_CODE_ENTER ]]; then  # invio
      local SCRIPT_NAME="${SCRIPT_NAMES[$index]}"
      runScript "$SCRIPT_NAME"
      break
    fi
  done
}

# ================================
# MAIN
# ================================

getScripts
showMenu
