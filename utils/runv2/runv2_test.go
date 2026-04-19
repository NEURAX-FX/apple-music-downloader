package runv2

import (
	"bufio"
	"bytes"
	"encoding/binary"
	"os"
	"testing"
)

type loopbackDecryptConn struct {
	bytes.Buffer
	responses [][]byte
	writes    [][]byte
	stage     int
}

func (c *loopbackDecryptConn) Write(p []byte) (int, error) {
	cp := append([]byte(nil), p...)
	c.writes = append(c.writes, cp)
	return len(p), nil
}

func (c *loopbackDecryptConn) Read(p []byte) (int, error) {
	if c.stage >= len(c.responses) {
		return 0, nil
	}
	n := copy(p, c.responses[c.stage])
	c.responses[c.stage] = c.responses[c.stage][n:]
	if len(c.responses[c.stage]) == 0 {
		c.stage++
	}
	return n, nil
}

func TestCbcsFullSubsampleDecryptWritesBackReturnedBytes(t *testing.T) {
	original := []byte("0123456789abcdefWXYZ")
	expected := []byte("fedcba9876543210")
	conn := &loopbackDecryptConn{responses: [][]byte{expected}}
	rw := bufio.NewReadWriter(bufio.NewReader(conn), bufio.NewWriter(conn))

	if err := cbcsFullSubsampleDecrypt(original, rw); err != nil {
		t.Fatalf("cbcsFullSubsampleDecrypt returned error: %v", err)
	}

	if got := original[:len(expected)]; !bytes.Equal(got, expected) {
		t.Fatalf("decrypted bytes not written back, got %x want %x", got, expected)
	}

	if len(conn.writes) != 1 {
		t.Fatalf("expected a single buffered write, got %d writes", len(conn.writes))
	}

	written := conn.writes[0]
	if len(written) < 4 {
		t.Fatalf("write too short: %d bytes", len(written))
	}

	if got := binary.LittleEndian.Uint32(written[:4]); got != uint32(len(expected)) {
		t.Fatalf("unexpected length prefix %d want %d", got, len(expected))
	}

	if got := written[4:]; !bytes.Equal(got, []byte("0123456789abcdef")) {
		t.Fatalf("unexpected encrypted payload %x", got)
	}

	if tail := original[len(expected):]; !bytes.Equal(tail, []byte("WXYZ")) {
		t.Fatalf("clear tail bytes were modified: %x", tail)
	}
}

func TestAmdlDebugEnabled(t *testing.T) {
	t.Setenv("AMDL_DEBUG", "")
	if amdlDebugEnabled() {
		t.Fatal("expected AMDL_DEBUG to be disabled by default")
	}

	for _, value := range []string{"1", "true", "TRUE", " yes ", "On"} {
		t.Setenv("AMDL_DEBUG", value)
		if !amdlDebugEnabled() {
			t.Fatalf("expected %q to enable AMDL_DEBUG", value)
		}
	}

	for _, value := range []string{"0", "false", "no", "off", "random"} {
		t.Setenv("AMDL_DEBUG", value)
		if amdlDebugEnabled() {
			t.Fatalf("expected %q to keep AMDL_DEBUG disabled", value)
		}
	}
}

func TestDebugPrintfHonorsAmdlDebug(t *testing.T) {
	var buf bytes.Buffer
	debugOut = &buf
	t.Cleanup(func() { debugOut = os.Stdout })

	t.Setenv("AMDL_DEBUG", "")
	debugPrintf("[runv2] hidden %d", 1)
	if got := buf.String(); got != "" {
		t.Fatalf("expected no output when debug disabled, got %q", got)
	}

	t.Setenv("AMDL_DEBUG", "1")
	debugPrintf("[runv2] visible %d", 2)
	if got := buf.String(); got != "[runv2] visible 2" {
		t.Fatalf("unexpected debug output %q", got)
	}
}
