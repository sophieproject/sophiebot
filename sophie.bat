title Sophie Terminal
cls
cd model
rasa train 
start "Sophie AI" rasa run --enable-api
cd ../
start "Sophie Terminal"  node index.js