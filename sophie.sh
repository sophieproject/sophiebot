#!/bin/bash

clear
echo "--------------------"
echo "The Sophie Project!"
echo "--------------------"

search () { node tools/search_user.js $2 ; }

add () { node tools/add_user.js $2 $3 $4 $5 ; }

remove () { node tools/remove_user.js $2 ; }

$1 $2 $3 $4 $5
