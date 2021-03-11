#!/bin/bash

clear
echo "--------------------"
echo "The Sophie Project!"
echo "--------------------"

start () { node index.js & cd model | rasa run --enable-api ; }

search () { node tools/search_user.js $2 ; }

add () { node tools/add_user.js $2 $3 $4 $5 ; }

remove () { node tools/remove_user.js $2 ; }

train () { cd model ; rasa train ; }

$1 $2 $3 $4 $5
