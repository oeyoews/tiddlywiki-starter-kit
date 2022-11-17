#!/usr/bin/env bash

#######################################
# Dec: question
# Globals:
#   PluginName
#   PluginName
#   answer
#######################################
function ask() {
read -p "Create new plugin: " PluginName
if [ ! ${PluginName} ]; then
  echo "⚠️  Please Input PluginName"
  exit
fi

read -p "Descript your plugin: " description
if [ ! ${PluginName} ]; then
  echo "⚠️  Please Input PluginName"
  exit
fi

read -p "Are you sure to creat ${PluginName} folder ? [y/n] " answer
if [ ! ${answer} ]; then
  echo "⚠️  Please Input [y/n]"
  exit
fi
}

#######################################
#
# Dec: create new plugin
# Globals:
#   PluginName
#   target
#   target
#   target
#   target
# Arguments:
#
#######################################
function newPlugin() {

target="dev/plugins/${PluginName}"

if [ ! -d ${target} ]; then
  cp -r templates/new-plugin ${target}
  sed -i \
    -e "s#PluginName#$PluginName#g" \
    -e "s#Description#$description#g"  \
    `find ${target} -type f`
else
  echo "⚠️  This ${target} folder has exist"
fi
}

# Dec: end
function ending() {
  echo "🎉 Please cd ${target} to find more details"
}

#######################################
# main
#######################################
main() {
  ask
  newPlugin
  ending
}

# entry
main
