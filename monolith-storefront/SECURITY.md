# Security Policy

## Supported Versions

Brickhunter is currently pre-1.0 and under active development. Security fixes are applied to the latest release on `main` only.

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |
| < 0.1   | :x:                |

Once the project reaches a 1.0 release, this table will be updated to reflect a formal support window (e.g. the latest major version plus one prior).

## Reporting a Vulnerability

If you discover a security vulnerability in Brickhunter, please **do not open a public issue**. Instead, report it privately so it can be addressed before public disclosure.

- **Email**: [security@yourdomain.example](mailto:security@yourdomain.example) *(replace with a real monitored address before publishing this repo)*
- **Alternative**: Use [GitHub's private vulnerability reporting](../../security/advisories/new) for this repository, if enabled.

Please include:

- A description of the vulnerability and its potential impact
- Steps to reproduce, or a proof-of-concept if available
- Any relevant environment details (browser, OS, dependency versions)

### What to Expect

| Stage | Timeline |
| --- | --- |
| Acknowledgment of your report | Within 48 hours |
| Initial assessment / severity triage | Within 5 business days |
| Fix or mitigation plan communicated | Within 14 days, depending on severity |
| Public disclosure | Coordinated with the reporter, after a fix is released |

We ask that you give us a reasonable window to address the issue before any public disclosure, and we commit to keeping you informed of progress throughout.

## Security Best Practices for Contributors

This is a client-side, static-hosted React application with no backend or user data storage, which limits its attack surface — but please still follow these practices:

- **Never commit secrets.** API keys, tokens, or credentials belong in `.env` (gitignored), not in source. Use `.env.example` to document required variables without values.
- **Keep dependencies current.** Run `npm audit` periodically and address high/critical advisories promptly, especially for third-party packages with broad DOM/canvas access (GSAP, Spline runtime, Matter.js).
- **Sanitize any user-supplied input.** If future features introduce forms, comments, or dynamic content, ensure output is properly escaped to prevent XSS — never use `dangerouslySetInnerHTML` with untrusted data.
- **Be cautious with third-party embeds.** The Spline 3D scene is loaded from an external URL; only point `SPLINE_SCENE_URL` at scenes you control or trust.
- **Review new dependencies before adding them.** Prefer well-maintained packages with active security disclosure practices over abandoned or obscure ones.
- **Don't disable security-relevant browser defaults** (e.g. CSP, CORS, `rel="noopener noreferrer"` on external links) without a documented reason.

## Acknowledgments

We're grateful to the security researchers and community members who responsibly disclose vulnerabilities and help keep Brickhunter — and its users — safe. Contributors who report valid, previously-unknown vulnerabilities will be credited here (with their permission) once a fix has shipped.

*No vulnerabilities have been reported or disclosed at this time.*
