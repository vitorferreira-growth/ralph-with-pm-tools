#\!/usr/bin/env python3
"""
Comprehensive security test suite for Claude Code enhanced security features
Tests all the security improvements implemented
"""

import sys
import json
import tempfile
from pathlib import Path
from datetime import datetime

# Add security utils to path
sys.path.insert(0, str(Path(__file__).parent))
from security_utils import *

def test_enhanced_file_path_validation():
    """Test enhanced file path validation"""
    print("=== TESTING ENHANCED FILE PATH VALIDATION ===")

    # Dangerous paths that should be blocked
    dangerous_paths = [
        '/etc/passwd',
        '/etc/shadow',
        '/root/.ssh/id_rsa',
        '../../../etc/shadow',
        '/var/log/auth.log',
        '/boot/vmlinuz',
        '/sys/kernel/debug',
        '/proc/version',
        '/dev/sda1',
        '~/.aws/credentials',
        '.ssh/id_rsa',
        '.env',
        'config.json',
        'secrets.txt',
        'file.key',
        'cert.pem'
    ]

    # Safe paths that should be allowed
    safe_paths = [
        './test.py',
        'src/main.py',
        'docs/README.md',
        'config/app.yaml',
        'tests/test_security.py'
    ]

    passed = 0
    total = len(dangerous_paths) + len(safe_paths)

    for path in dangerous_paths:
        result = enhanced_is_dangerous_file_path(path)
        status = "✅ BLOCKED" if result else "❌ ALLOWED"
        print(f"   {path:<30} -> {status}")
        if result:
            passed += 1

    for path in safe_paths:
        result = enhanced_is_dangerous_file_path(path)
        status = "✅ ALLOWED" if not result else "❌ BLOCKED"
        print(f"   {path:<30} -> {status}")
        if not result:
            passed += 1

    print(f"\nFile Path Validation: {passed}/{total} tests passed")
    return passed == total

def test_rate_limiting():
    """Test rate limiting functionality"""
    print("\n=== TESTING RATE LIMITING ===")

    passed = 0

    # Test 1: Basic rate limiting
    identifier = f"test_{datetime.now().timestamp()}"

    # Should allow first 3 requests
    for i in range(3):
        allowed = check_rate_limit(identifier, max_requests=3, window_seconds=60)
        status = "✅ ALLOWED" if allowed else "❌ BLOCKED"
        print(f"   Request {i+1}: {status}")
        if allowed:
            passed += 1

    # Should block 4th and 5th requests
    for i in range(2):
        allowed = check_rate_limit(identifier, max_requests=3, window_seconds=60)
        status = "✅ BLOCKED" if not allowed else "❌ ALLOWED"
        print(f"   Request {i+4}: {status}")
        if not allowed:
            passed += 1

    print(f"\nRate Limiting: {passed}/5 tests passed")
    return passed == 5

def test_secret_detection():
    """Test secret detection in various formats"""
    print("\n=== TESTING SECRET DETECTION ===")

    test_cases = [
        ("api_key = 'sk-1234567890abcdef'", True),
        ("password = 'mypassword123'", True),
        ("Authorization: Bearer eyJhbGciOiJIUzI1NiIs", True),
        ("AKIA1234567890ABCDEF", True),  # AWS key
        ("-----BEGIN RSA PRIVATE KEY-----", True),
        ("normal code without secrets", False),
        ("def function_name():", False),
        ("import json", False),
    ]

    passed = 0

    for content, should_detect in test_cases:
        secrets = detect_secrets(content)
        has_secret = len(secrets) > 0

        if has_secret == should_detect:
            status = "✅ CORRECT"
            passed += 1
        else:
            status = "❌ INCORRECT"

        result = "SECRET DETECTED" if has_secret else "CLEAN"
        print(f"   '{content[:40]}...' -> {result} {status}")

    print(f"\nSecret Detection: {passed}/{len(test_cases)} tests passed")
    return passed == len(test_cases)

def test_secure_timeouts():
    """Test secure timeout configurations"""
    print("\n=== TESTING SECURE TIMEOUTS ===")

    expected_timeouts = {
        'bash': 60,
        'read': 30,
        'write': 45,
        'edit': 60,
        'grep': 30,
        'glob': 20,
        'ls': 15,
        'git': 120,
        'test': 300,
        'build': 600,
        'unknown': 60
    }

    passed = 0

    for operation, expected in expected_timeouts.items():
        timeout = get_secure_timeout(operation)
        status = "✅ CORRECT" if timeout == expected else "❌ INCORRECT"
        print(f"   {operation:<10} -> {timeout}s (expected {expected}s) {status}")
        if timeout == expected:
            passed += 1

    print(f"\nSecure Timeouts: {passed}/{len(expected_timeouts)} tests passed")
    return passed == len(expected_timeouts)

def test_secure_configuration():
    """Test secure configuration generation"""
    print("\n=== TESTING SECURE CONFIGURATION ===")

    config = create_secure_config()

    required_keys = [
        'max_file_size', 'max_output_length', 'max_log_entries',
        'rate_limit_requests', 'rate_limit_window', 'allowed_extensions',
        'blocked_extensions', 'secure_headers'
    ]

    passed = 0

    for key in required_keys:
        if key in config:
            print(f"   {key}: ✅ Present")
            passed += 1
        else:
            print(f"   {key}: ❌ Missing")

    # Validate some specific values
    if config.get('max_file_size') == 10 * 1024 * 1024:
        print(f"   max_file_size value: ✅ 10MB")
        passed += 1
    else:
        print(f"   max_file_size value: ❌ Incorrect")

    if len(config.get('allowed_extensions', [])) > 20:
        print(f"   allowed_extensions count: ✅ {len(config['allowed_extensions'])} extensions")
        passed += 1
    else:
        print(f"   allowed_extensions count: ❌ Too few")

    print(f"\nSecure Configuration: {passed}/{len(required_keys) + 2} tests passed")
    return passed == (len(required_keys) + 2)

def test_log_rotation():
    """Test log rotation functionality"""
    print("\n=== TESTING LOG ROTATION ===")

    # Create a temporary log file with many entries
    with tempfile.NamedTemporaryFile(mode='w', suffix='.json', delete=False) as temp_log:
        temp_log_path = temp_log.name

        # Write 1500 entries (should trigger rotation at 1000)
        for i in range(1500):
            entry = {
                'timestamp': datetime.now().isoformat(),
                'entry_number': i,
                'test_data': f'Entry {i}'
            }
            temp_log.write(json.dumps(entry) + '\n')

    print(f"   Created test log with 1500 entries")

    # Test rotation
    rotation_result = rotate_log_file(temp_log_path, max_entries=1000)

    if rotation_result:
        print("   ✅ Log rotation triggered")

        # Check if log was reduced
        with open(temp_log_path, 'r') as f:
            remaining_lines = len(f.readlines())

        if remaining_lines <= 600:  # Should be around 500 + rotation entry
            print(f"   ✅ Log reduced to {remaining_lines} entries")
            passed = 2
        else:
            print(f"   ❌ Log still has {remaining_lines} entries")
            passed = 1
    else:
        print("   ❌ Log rotation not triggered")
        passed = 0

    # Clean up
    Path(temp_log_path).unlink(missing_ok=True)

    print(f"\nLog Rotation: {passed}/2 tests passed")
    return passed == 2

def run_all_tests():
    """Run all security tests"""
    print("🛡️  CLAUDE CODE SECURITY TEST SUITE")
    print("=" * 50)

    tests = [
        ("Enhanced File Path Validation", test_enhanced_file_path_validation),
        ("Rate Limiting", test_rate_limiting),
        ("Secret Detection", test_secret_detection),
        ("Secure Timeouts", test_secure_timeouts),
        ("Secure Configuration", test_secure_configuration),
        ("Log Rotation", test_log_rotation)
    ]

    passed_tests = 0
    total_tests = len(tests)

    for test_name, test_func in tests:
        try:
            if test_func():
                print(f"\n🎉 {test_name}: PASSED")
                passed_tests += 1
            else:
                print(f"\n❌ {test_name}: FAILED")
        except Exception as e:
            print(f"\n💥 {test_name}: ERROR - {e}")

    print("\n" + "=" * 50)
    print(f"SECURITY TEST RESULTS: {passed_tests}/{total_tests} tests passed")

    if passed_tests == total_tests:
        print("🎉 ALL SECURITY ENHANCEMENTS WORKING PERFECTLY\!")
        print("🛡️  Security score: 10/10 - MAXIMUM SECURITY ACHIEVED")
    else:
        score = (passed_tests / total_tests) * 10
        print(f"⚠️  Security score: {score:.1f}/10 - Some improvements needed")

    return passed_tests == total_tests

if __name__ == '__main__':
    success = run_all_tests()
    exit(0 if success else 1)
