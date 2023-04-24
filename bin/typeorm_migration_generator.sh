#!/bin/bash

# Get the path to the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Set the path to the ts-node script from your custom package
TS_NODE_PATH="$SCRIPT_DIR/../node_modules/.bin/ts-node"

# Run the script using ts-node
$TS_NODE_PATH $SCRIPT_DIR/../src/index.ts $@
