package main

import (
	"apple-music-downloader/utils/structs"
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

func TestLoadConfigPrefersCookieFileNextToConfig(t *testing.T) {
	home := t.TempDir()
	t.Setenv("HOME", home)
	t.Setenv("AMDL_CONFIG", "")

	configDir := filepath.Join(home, ".config", "amdl")
	if err := os.MkdirAll(configDir, 0o755); err != nil {
		t.Fatalf("mkdir failed: %v", err)
	}
	configPath := filepath.Join(configDir, "config.yaml")
	if err := os.WriteFile(configPath, []byte("media-user-token: config-token\nstorefront: cn\n"), 0o644); err != nil {
		t.Fatalf("write config failed: %v", err)
	}
	cookie := ".music.apple.com	TRUE	/	TRUE	1893456000	media-user-token	cookie-token"
	if err := os.WriteFile(filepath.Join(configDir, ".cookie"), []byte(cookie), 0o644); err != nil {
		t.Fatalf("write cookie failed: %v", err)
	}

	Config = structs.ConfigSet{}
	if err := loadConfig(); err != nil {
		t.Fatalf("loadConfig returned error: %v", err)
	}

	if Config.MediaUserToken != "cookie-token" {
		t.Fatalf("unexpected media-user-token %q", Config.MediaUserToken)
	}
}

func TestCheckUrlSongAcceptsAlbumUrlWithSongQuery(t *testing.T) {
	storefront, songID := checkUrlSong("https://music.apple.com/cn/album/a-temporary-high/1692377933?i=1692377941&ls")

	if storefront != "cn" {
		t.Fatalf("unexpected storefront %q", storefront)
	}
	if songID != "1692377941" {
		t.Fatalf("unexpected song ID %q", songID)
	}
}

func TestParseItunesStoreIDSkipsValuesUnsupportedByMP4TagWriter(t *testing.T) {
	if id, ok := parseItunesStoreID("1234567890"); !ok || id != 1234567890 {
		t.Fatalf("expected supported ID, got id=%d ok=%t", id, ok)
	}

	if id, ok := parseItunesStoreID("6786111290"); ok || id != 0 {
		t.Fatalf("expected oversized ID to be skipped, got id=%d ok=%t", id, ok)
	}
}

func TestNormalizeMediaUserTokenExtractsCookieValue(t *testing.T) {
	raw := "media-user-token=0.example+token/with=padding; itua=CN;"

	got := normalizeMediaUserToken(raw)

	if got != "0.example+token/with=padding" {
		t.Fatalf("unexpected token %q", got)
	}
}

func TestNormalizeMediaUserTokenKeepsPlainToken(t *testing.T) {
	raw := " 0.example+token/with=padding "

	got := normalizeMediaUserToken(raw)

	if got != "0.example+token/with=padding" {
		t.Fatalf("unexpected token %q", got)
	}
}

func TestNormalizeMediaUserTokenExtractsNetscapeCookieValue(t *testing.T) {
	raw := ".music.apple.com	TRUE	/	TRUE	1893456000	media-user-token	0.example+token/with=padding"

	got := normalizeMediaUserToken(raw)

	if got != "0.example+token/with=padding" {
		t.Fatalf("unexpected token %q", got)
	}
}
