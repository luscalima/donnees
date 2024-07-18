#!/bin/sh
#
# A simple commit message checker script for Conventional Commits
#

commit_regex="^(feat|fix|chore|docs|style|refactor|perf|test|build|ci|revert|wip|merge)(\(.+\))?!?: .{1,50}"
commit_error_message="Commit message does not follow Conventional Commits format."
commit_message=$(cat $1)

if ! echo "$commit_message" | grep -iqE "$commit_regex"; then
  echo "$commit_error_message"
  exit 1
fi