# Documentation project instructions

## About this project

- This is the public autClaw documentation site built on Mintlify.
- Pages are MDX files with YAML frontmatter.
- Configuration lives in `docs.json`.
- Public deployment target: `https://ac-d39c0861.mintlify.app/`.

## Style preferences

- Use concise Chinese for user-facing autClaw docs unless a copied SDK reference is intentionally English.
- Prefer action-oriented copy: tell users what they can do and what command to run next.
- Use second person and active voice.
- Use sentence case headings.
- Use code formatting for file names, commands, paths, API names, and config keys.
- Do not document internal admin-only behavior unless it is required for public plugin authors.

## Mintlify rules

- Add new pages to `docs.json`; otherwise they will not appear in navigation or search indexing.
- Use root-relative internal links without extensions, such as `/plugin-sdk/javascript`.
- Run `mint validate` or `mint broken-links` before publishing when the CLI is available.
