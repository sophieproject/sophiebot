echo off
cls

title "The Sophie Project."

echo "";
echo "████████ ██   ██ ███████     ███████  ██████  ██████  ██   ██ ██ ███████     ██████  ██████   ██████       ██ ███████  ██████ ████████ ";
echo "   ██    ██   ██ ██          ██      ██    ██ ██   ██ ██   ██ ██ ██          ██   ██ ██   ██ ██    ██      ██ ██      ██         ██    ";
echo "   ██    ███████ █████       ███████ ██    ██ ██████  ███████ ██ █████       ██████  ██████  ██    ██      ██ █████   ██         ██    ";
echo "   ██    ██   ██ ██               ██ ██    ██ ██      ██   ██ ██ ██          ██      ██   ██ ██    ██ ██   ██ ██      ██         ██    ";
echo "   ██    ██   ██ ███████     ███████  ██████  ██      ██   ██ ██ ███████     ██      ██   ██  ██████   █████  ███████  ██████    ██    ";
echo "";
echo "Created by FaultyDev and WillKenzie";
echo "Making the digital world safer.";

timeout /t 3

IF EXIST .\node_modules\ (
echo "node_modules exists starting npm."
start "npm start"
) ELSE (
echo "node_modules doesn't exist."
echo "installing node_modules"
start "npm install"
start "npm audit fix"
start "npm start"
)

pause