#!/bin/sh
# Install .NET
curl -sSL https://dot.net/v1/dotnet-install.sh > dotnet-install.sh
chmod +x dotnet-install.sh
./dotnet-install.sh -c 8.0 -InstallDir ./dotnet
./dotnet/dotnet --version

# Download TailwindCSS binary
curl -L "https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-linux-x64" -o Tailwind/tailwindcss-linux-x64
chmod +x Tailwind/tailwindcss-linux-x64

# Run .NET publish
./dotnet/dotnet publish -c Release -o output