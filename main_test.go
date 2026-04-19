package main

import (
	"os"
	"path/filepath"
	"testing"
)

func TestResolveConfigPathPrefersEnvOverride(t *testing.T) {
	t.Setenv("AMDL_CONFIG", "/tmp/custom-config.yaml")
	t.Setenv("HOME", t.TempDir())

	got, err := resolveConfigPath()
	if err != nil {
		t.Fatalf("resolveConfigPath returned error: %v", err)
	}
	if got != "/tmp/custom-config.yaml" {
		t.Fatalf("unexpected config path %q", got)
	}
}

func TestResolveConfigPathFallsBackToXdgConfig(t *testing.T) {
	home := t.TempDir()
	t.Setenv("HOME", home)
	t.Setenv("AMDL_CONFIG", "")

	configPath := filepath.Join(home, ".config", "amdl", "config.yaml")
	if err := os.MkdirAll(filepath.Dir(configPath), 0o755); err != nil {
		t.Fatalf("mkdir failed: %v", err)
	}
	if err := os.WriteFile(configPath, []byte("storefront: us\n"), 0o644); err != nil {
		t.Fatalf("write failed: %v", err)
	}

	got, err := resolveConfigPath()
	if err != nil {
		t.Fatalf("resolveConfigPath returned error: %v", err)
	}
	if got != configPath {
		t.Fatalf("unexpected config path %q want %q", got, configPath)
	}
}

func TestResolveConfigPathFallsBackToLocalConfig(t *testing.T) {
	home := t.TempDir()
	t.Setenv("HOME", home)
	t.Setenv("AMDL_CONFIG", "")
	workdir := t.TempDir()
	oldWd, err := os.Getwd()
	if err != nil {
		t.Fatalf("getwd failed: %v", err)
	}
	defer os.Chdir(oldWd)
	if err := os.Chdir(workdir); err != nil {
		t.Fatalf("chdir failed: %v", err)
	}

	localConfig := filepath.Join(workdir, "config.yaml")
	if err := os.WriteFile(localConfig, []byte("storefront: us\n"), 0o644); err != nil {
		t.Fatalf("write failed: %v", err)
	}

	got, err := resolveConfigPath()
	if err != nil {
		t.Fatalf("resolveConfigPath returned error: %v", err)
	}
	if got != localConfig {
		t.Fatalf("unexpected config path %q want %q", got, localConfig)
	}
}
