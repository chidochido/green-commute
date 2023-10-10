#!/bin/bash

BRANCH_NAME=rw_branch_v1 # <-- REPLACE with YOUR branch name here.

clear
git add .
git commit -a -m '$1'
git push --set-upstream origin $BRANCH_NAME
echo "Succesfully pushed from branch '$BRANCH_NAME'..."
