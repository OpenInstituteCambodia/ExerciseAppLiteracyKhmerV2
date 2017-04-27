#!/bin/bash

color() {
  printf '\033[%sm%s\033[m\n' "$@"
  # usage color "31;5" "string"
  # 0 default
  # 5 blink, 1 strong, 4 underlined
  # fg: 31 red,  32 green, 33 yellow, 34 blue, 35 purple, 36 cyan, 37 white
  # bg: 40 black, 41 red, 44 blue, 45 purple
}

BUILD_DATE=$(date '+%d%Y%s')

color '36;1' "
  Saving Applicaiton Build GUID
  -----------
  Build Version: $BUILD_DATE
"
