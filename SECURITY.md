# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability within this application, please send an e-mail to georgepalhano@autocorp.com.br. All security vulnerabilities will be promptly addressed.

## Best Practices Implemented

- **No-Referrer Policy**: All external images and maps use `referrerPolicy="no-referrer"` to prevent leaking URL information.
- **Dependency Sandboxing**: The application uses a restricted set of audited dependencies.
- **Safe Link Practices**: All external links are configured with `rel="noopener noreferrer"` to prevent tab-nabbing attacks.
- **Service Worker Security**: Our Service Worker is designed to cache only non-sensitive application assets.
- **Sensitive Data Handling**: This application is a Progressive Web App (PWA) and does not store sensitive personal information on external servers. All user-specific data (like theme preference) is stored locally using standard browser APIs.
- **Content Security**: We follow strict React patterns to prevent Cross-Site Scripting (XSS) by avoiding the use of `dangerouslySetInnerHTML`.

## Distribution Security

When deploying this application:
1. Ensure HTTPS is strictly enforced.
2. Configure appropriate Content Security Policy (CSP) headers on your web server.
3. Regularly audit and update project dependencies.
