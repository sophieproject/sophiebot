#!/bin/bash

DIRECTORY="./node_modules/"
NPMI="npm install"
NPMS="npm start"

clear

echo "";
echo "████████ ██   ██ ███████     ███████  ██████  ██████  ██   ██ ██ ███████     ██████  ██████   ██████       ██ ███████  ██████ ████████ ";
echo "   ██    ██   ██ ██          ██      ██    ██ ██   ██ ██   ██ ██ ██          ██   ██ ██   ██ ██    ██      ██ ██      ██         ██    ";
echo "   ██    ███████ █████       ███████ ██    ██ ██████  ███████ ██ █████       ██████  ██████  ██    ██      ██ █████   ██         ██    ";
echo "   ██    ██   ██ ██               ██ ██    ██ ██      ██   ██ ██ ██          ██      ██   ██ ██    ██ ██   ██ ██      ██         ██    ";
echo "   ██    ██   ██ ███████     ███████  ██████  ██      ██   ██ ██ ███████     ██      ██   ██  ██████   █████  ███████  ██████    ██    ";
echo "";
echo "Created by FaultyDev and WillKenzie";
echo "Making the digital world safer.";

sleep 3

echo "---";

if [[ -d "$DIRECTORY" ]]
then
    echo "$DIRECTORY exists on your filesystem."
    echo "Starting npm..."
    sleep 1
    $NPMS 
    wait
    echo "---"
    echo "ATTENTION!"
    echo "---"
    echo "npm stopped. if this was due to an error make sure your .env credentials are valid and that your rasa server is running."
    echo "if this was an error and you think it has to do with the code, please report it to us."
else
    echo "$DIRECTORY not found..."
    echo "installing modules..."
    $NPMI
    wait
    clear
    echo "modules installed, starting npm..."
    sleep 1
    $NPMS
    wait
    echo "---"
    echo "ATTENTION!"
    echo "---"
    echo "npm stopped. if this was due to an error make sure your .env credentials are valid and that your rasa server is running."
    echo "if this was an error and you think it has to do with the code, please report it to us."
fi