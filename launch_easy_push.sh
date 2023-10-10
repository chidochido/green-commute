#!/bin/bash

# A convenient script for pushing branches to the shared Git repo.
# Intended to boost throughput.
# USAGE: ./launch_easy_push 'my custom message'

BRANCH_NAME=rw_branch_v1 # <-- IMPORTANT: replace with YOUR branch name here.

clear
git add .
git commit -a -m $1
git push --set-upstream origin $BRANCH_NAME
echo "Succesfully pushed from branch '$BRANCH_NAME'..."
