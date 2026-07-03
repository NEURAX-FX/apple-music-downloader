#!/usr/bin/env sh
set -eu

repo_dir=$(CDPATH='' cd -- "$(dirname -- "$0")" && pwd)
binary_dir="$repo_dir/bin"
binary="$binary_dir/apple-music-dl"
termux_prefix="/data/data/com.termux/files/usr"
if [ "${PREFIX:-}" = "$termux_prefix" ]; then
	global_wrapper="$PREFIX/bin/amdl"
else
	global_wrapper="/usr/local/bin/amdl"
fi
config_dir="${HOME:-~}/.config/amdl"
config_path="$config_dir/config.yaml"

mkdir -p "$binary_dir"

printf '%s\n' "[build] building $binary"
GOWORK=off go build -mod=mod -o "$binary" .

chmod +x "$repo_dir/amdl"
ln -sf "$repo_dir/amdl" "$global_wrapper"

mkdir -p "$config_dir"
if [ ! -f "$config_path" ]; then
	install -m 0644 "$repo_dir/config.yaml" "$config_path"
	printf '%s\n' "[build] installed default config to $config_path"
fi

printf '%s\n' "[build] deployed wrapper to $global_wrapper"
printf '%s\n' "[build] done"
