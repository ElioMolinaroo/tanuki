# Bug Report: KDL Configuration Parsing Fails

## Summary

Sentinel fails to parse KDL configuration files with the error "Failed to parse KDL document" without providing specific details about what's wrong.

## Environment

- **Sentinel version**: 0.1.0 (from crates.io via `cargo install sentinel-proxy`)
- **OS**: macOS Darwin 24.6.0
- **Rust**: stable

## Steps to Reproduce

1. Install sentinel from crates.io:
   ```bash
   cargo install sentinel-proxy
   ```

2. Create a minimal config file `test.kdl`:
   ```kdl
   server {
       worker-threads 2
       max-connections 1000
       graceful-shutdown-timeout-secs 5
       daemon false
   }

   listeners {
       listener "http" {
           address "127.0.0.1:8080"
           protocol "http"
           request-timeout-secs 30
           keepalive-timeout-secs 60
           default-route "test"
       }
   }

   routes {
       route "test" {
           priority "normal"
           matches {
               path-prefix "/"
           }
           upstream null
       }
   }
   ```

3. Run sentinel:
   ```bash
   sentinel -t -c test.kdl
   ```

## Expected Behavior

Sentinel should either:
1. Successfully validate the config, or
2. Provide a specific error message indicating what's wrong with the KDL syntax or schema

## Actual Behavior

```
{"timestamp":"2025-12-27T16:35:19.637871Z","level":"INFO","fields":{"message":"Tracing initialized"},"target":"sentinel_common::observability",...}
{"timestamp":"2025-12-27T16:35:19.637903Z","level":"INFO","fields":{"message":"Starting Sentinel Proxy Phase 2"},"target":"sentinel",...}
Error: Failed to load initial configuration

Caused by:
    Failed to parse KDL: Failed to parse KDL document
```

## Additional Context

- Even the config file from the sentinel repo (`config/sentinel.kdl`) fails with the same error when using the crates.io version
- This suggests the crates.io release (0.1.0) may have been published before the KDL config system was fully implemented or the schema has changed since publication
- The error message provides no actionable information about what's wrong

## Suggested Improvements

1. **Better error messages**: Include line numbers, column positions, and specific parse errors from the KDL parser
2. **Schema validation errors**: If the KDL parses but doesn't match the expected schema, list which fields are invalid/missing
3. **Config documentation**: Provide a minimal working config example in the README or docs
4. **Version sync**: Ensure crates.io releases match the documented config format

## Workaround

Currently using Python's http.server as a fallback for static file serving until this is resolved.
