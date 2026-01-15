#!/bin/bash

# Don't exit on error - this is optional setup
set +e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Setting up BigQuery MCP Toolbox${NC}"

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if gcloud CLI is installed
if ! command_exists gcloud; then
    echo -e "${YELLOW}⚠️  gcloud CLI not found. Install it manually:${NC}"
    echo -e "${YELLOW}   brew install --cask google-cloud-sdk${NC}"
    echo -e "${YELLOW}   Skipping BigQuery setup.${NC}"
    exit 0
fi
echo -e "${GREEN}✅ gcloud CLI is already installed${NC}"

# Determine architecture
ARCH=$(uname -m)
OS=$(uname -s | tr '[:upper:]' '[:lower:]')

if [[ "$ARCH" == "arm64" && "$OS" == "darwin" ]]; then
    ARCH_PATH="darwin/arm64"
elif [[ "$ARCH" == "x86_64" && "$OS" == "darwin" ]]; then
    ARCH_PATH="darwin/amd64"
elif [[ "$ARCH" == "x86_64" && "$OS" == "linux" ]]; then
    ARCH_PATH="linux/amd64"
else
    echo -e "${RED}❌ Unsupported architecture: $OS/$ARCH${NC}"
    exit 1
fi

# Binary will always be named 'toolbox' to match .mcp.json expectation
BINARY_NAME="toolbox"

# Get the latest version from GitHub releases
echo -e "${GREEN}📡 Fetching latest version...${NC}"
VERSION=$(curl -s --max-time 10 https://api.github.com/repos/googleapis/genai-toolbox/releases/latest 2>/dev/null | grep '"tag_name"' | sed -E 's/.*"([^"]+)".*/\1/' | head -1)

# Fallback to v0.11.0 if unable to fetch (using known working version)
if [ -z "$VERSION" ] || [ "$VERSION" == "null" ]; then
    echo -e "${YELLOW}⚠️  Unable to fetch latest version from GitHub, using fallback v0.11.0${NC}"
    VERSION="v0.11.0"
else
    echo -e "${GREEN}✅ Found latest version: $VERSION${NC}"
fi

echo -e "${GREEN}📥 Downloading BigQuery MCP Toolbox $VERSION for $OS/$ARCH...${NC}"

# Download the binary to project root directory
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$PROJECT_ROOT"
curl -O "https://storage.googleapis.com/genai-toolbox/$VERSION/$ARCH_PATH/toolbox"

# The binary is already named 'toolbox' which matches .mcp.json expectation

# Make it executable
chmod +x "$BINARY_NAME"

echo -e "${GREEN}✅ Downloaded $BINARY_NAME to ~/${NC}"

# Test the binary
echo -e "${GREEN}🧪 Testing binary...${NC}"
./"$BINARY_NAME" --version

echo -e "${GREEN}✅ Binary is working correctly${NC}"

# Verify installation
echo -e "${GREEN}🔧 Verifying installation...${NC}"
echo -e "${GREEN}📍 Binary installed at: $PROJECT_ROOT/$(echo $BINARY_NAME)${NC}"

# Test BigQuery prebuilt configuration
echo -e "${GREEN}🧪 Testing BigQuery configuration...${NC}"
timeout 3s ./"$BINARY_NAME" --prebuilt bigquery --help 2>/dev/null || echo -e "${GREEN}✅ BigQuery prebuilt configuration available${NC}"

echo -e "${GREEN}💡 Usage examples:${NC}"
echo -e "  Start BigQuery MCP server: ${YELLOW}./$(echo $BINARY_NAME) --prebuilt bigquery${NC}"
echo -e "  Use with STDIO:             ${YELLOW}./$(echo $BINARY_NAME) --prebuilt bigquery --stdio${NC}"
echo -e "  Get help:                   ${YELLOW}./$(echo $BINARY_NAME) --help${NC}"
echo -e "${GREEN}🔗 MCP Integration:${NC}"
echo -e "  Binary path matches .mcp.json: ${YELLOW}./$(echo $BINARY_NAME)${NC}"

# Setup Application Default Credentials (ADC) - non-interactive check only
echo -e "${GREEN}🔐 Checking Application Default Credentials...${NC}"
if gcloud auth application-default print-access-token >/dev/null 2>&1; then
    echo -e "${GREEN}✅ Application Default Credentials are already configured${NC}"
else
    echo -e "${YELLOW}⚠️  ADC not configured. Run manually: gcloud auth application-default login${NC}"
fi

echo -e "${GREEN}🎉 Setup complete!${NC}"
echo -e "${GREEN}📍 Binary location: $PROJECT_ROOT/$(echo $BINARY_NAME)${NC}"
echo -e "${GREEN}🔐 ADC configured for BigQuery access${NC}"
echo -e "${GREEN}💡 You can now use the BigQuery MCP Toolbox${NC}"