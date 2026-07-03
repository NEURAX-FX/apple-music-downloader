package ampapi

import "testing"

func TestExtractDeveloperTokenAcceptsCurrentJwt(t *testing.T) {
	js := `const qc="eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJBTVBXZWJQbGF5IiwiaWF0IjoxNzgxNjY1NDYwfQ.signature";`

	token, err := extractDeveloperToken([]byte(js))
	if err != nil {
		t.Fatalf("extractDeveloperToken returned error: %v", err)
	}
	if token != "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJBTVBXZWJQbGF5IiwiaWF0IjoxNzgxNjY1NDYwfQ.signature" {
		t.Fatalf("unexpected token %q", token)
	}
}

func TestExtractDeveloperTokenRejectsMissingToken(t *testing.T) {
	_, err := extractDeveloperToken([]byte(`const qc="";`))
	if err == nil {
		t.Fatal("expected error for missing token")
	}
}
