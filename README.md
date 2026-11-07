# Galley

A theme for [Kosatka](https://github.com/kosatka-cms/kosatka): a blog in
one reading column. The header, the lists, the text and the comments are
as wide as a comfortable line; serif type for reading, a wide cover over
an article, the author and sharing under it. A sticky item leads the
lists with its picture across; the other rows have a thumbnail on the
right. An accent colour, a light and a dark scheme.

![Galley](https://raw.githubusercontent.com/kosatka-cms/kosatka-theme-galley/main/static/screenshot.jpg)

## Install

```bash
app theme add https://github.com/kosatka-cms/kosatka-theme-galley
```

Then commit `themes/` and choose *Galley* on *Appearance*. See
[Distributing a theme](https://kosatka-cms.github.io/kosatka/themes/distribute/).

## Settings

On *Appearance → Galley → Settings*:

| Setting | Default |
|---|---|
| Accent colour - rust, blue, green or plum | rust |
| Colour scheme by default - as on the visitor's device, light or dark | as on the device |
| The text's font - serif or sans-serif | serif |
| The front page's heading, over the list | the site's slogan |
| Sharing and the author under a text whose type shows the author and date | on |
| Logging in and registration in the header | off |

A visitor switches the scheme with the button in the header; the choice
is kept in the browser.

## Under a text

When the content type shows the author and date (an article, not a page
like *About*), the text ends with:

- sharing: the browser's own share sheet where it has one, copying the
  address, an e-mail;
- the author: the avatar, the name and the signature from the profile.

Similar items, comments and the modules' parts (a rating, say) follow
as usual.

## Regions

The engine's regions - *Header*, *Sidebar*, *Content top*, *Content
bottom*, *Inside content*, *Footer*, *Footer bottom line* - so blocks
placed for another theme stay where they are. The header region holds
the main menu, under the site's name. There is no column beside the
text: the *Sidebar* is *Under the content* here, a block after another,
so blocks placed in another theme's sidebar stay on the page. A new site
gets the copyright block and a "Powered by Kosatka CMS" block in *Footer
bottom line*; both are ordinary blocks to change or remove on *Blocks*.

## Fonts

Source Serif 4 for headings and text, Inter for the menu, dates and
buttons, both with Latin, Cyrillic and Greek. They come with the theme
(`static/fonts`, SIL Open Font License 1.1) and the site serves them: no
requests to other servers.

## Translations

The theme's own strings: English, Russian, German and Spanish
(`translations/`).

## License

MIT
