# EZ-MuteDomain

Browser extension that automatically mutes tabs for sites you specify.

## How it works

Add site names to your mute list. Any tab matching those sites gets muted automatically on load. Subdomains and all TLDs are matched.

Type just the name. No `.com` needed.

```
google
facebook
tiktok
```

This mutes `google.com`, `google.co.uk`, `news.google.com`, `facebook.net`, etc.

## Install

### Firefox

☼ Download from [Mozilla Add-ons](#) (link TBD)

☼ Or load manually: `about:debugging` > This Firefox > Load Temporary Add-on > select `manifest.json`

### Chrome

☼ Go to `chrome://extensions`

☼ Enable Developer Mode

☼ Click "Load unpacked" and select the `EZ-MuteDomain` folder

## Features

☼ Wildcard TLD matching (`.com`, `.net`, `.org`, `.co.uk`, all handled)

☼ Subdomain matching (`sub.example.com` caught by adding `example`)

☼ Auto-saves as you type

☼ Mutes existing tabs on install and browser startup

☼ Works on Firefox and Chrome (Manifest V3)\

## Permissions

☼ `tabs` - Required to detect tab URLs and mute them

☼ `storage` - Required to save your mute list across sessions

## License

MIT
