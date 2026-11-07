// The galley theme's script (linked deferred in footer.html, after the
// engine's app.js): sharing under a text (social_share.html) and the
// contents of a long text in the margin.
//
// galleyShare - a behavior: in a [data-g-share] row the share button
// ([data-g-share-native]) is shown where the browser has its own share
// sheet (navigator.share) and opens it with the row's data-g-url and
// data-g-title; the copy button ([data-g-copy]) puts the address on the
// clipboard and says so for two seconds (its data-g-copied, translated
// in the template).
//
// The contents - on a content page with a margin (.g-margin, beside the
// text on a wide screen) whose text (the first .node-content of
// article.node) has three headings h2-h3 or more, unless the theme's
// "toc" setting is off (data-toc="0" on <html>): a list of them in the
// margin, after the byline; the heading being read is marked
// (aria-current). Headings without an id get one from their text.
(function () {
    'use strict';

    Kosatka.behaviors = Kosatka.behaviors || {};

    Kosatka.behaviors.galleyShare = {
        attach: function (context) {
            Kosatka.once('galley-share', '[data-g-share]', context).forEach(function (row) {
                var url = row.getAttribute('data-g-url') || window.location.href;
                var title = row.getAttribute('data-g-title') || document.title;

                var native = row.querySelector('[data-g-share-native]');
                if (native && navigator.share) {
                    native.hidden = false;
                    native.addEventListener('click', function () {
                        navigator.share({title: title, url: url}).catch(function () {});
                    });
                }

                var copy = row.querySelector('[data-g-copy]');
                var label = copy && copy.querySelector('[data-g-copy-label]');
                if (!copy || !label) return;
                if (!navigator.clipboard || !navigator.clipboard.writeText) {
                    copy.hidden = true;
                    return;
                }
                var text = label.textContent;
                var timer = null;
                copy.addEventListener('click', function () {
                    navigator.clipboard.writeText(url).then(function () {
                        label.textContent = copy.getAttribute('data-g-copied') || text;
                        copy.classList.add('is-copied');
                        clearTimeout(timer);
                        timer = setTimeout(function () {
                            label.textContent = text;
                            copy.classList.remove('is-copied');
                        }, 2000);
                    }, function () {});
                });
            });
        }
    };

    // slug - an id from a heading's text: letters and digits of any
    // script, the rest as hyphens.
    function slug(text) {
        return text.toLowerCase().trim().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '') || 'section';
    }

    function contents() {
        if (document.documentElement.getAttribute('data-toc') === '0') return;
        var margin = document.querySelector('.g-margin');
        var text = document.querySelector('article.node .node-content');
        if (!margin || !text) return;
        var headings = Array.prototype.slice.call(text.querySelectorAll('h2, h3'));
        if (headings.length < 3) return;

        var nav = document.createElement('nav');
        nav.className = 'g-toc';
        nav.setAttribute('aria-labelledby', 'g-toc-title');
        var title = document.createElement('h2');
        title.id = 'g-toc-title';
        title.textContent = Kosatka.t('Contents');
        nav.appendChild(title);
        var list = document.createElement('ol');
        var links = [];
        headings.forEach(function (h) {
            if (!h.id) {
                var id = slug(h.textContent), n = 2;
                while (document.getElementById(id)) id = slug(h.textContent) + '-' + n++;
                h.id = id;
            }
            var li = document.createElement('li');
            if (h.tagName === 'H3') li.className = 'g-toc-sub';
            var a = document.createElement('a');
            a.href = '#' + h.id;
            a.textContent = h.textContent.trim();
            li.appendChild(a);
            list.appendChild(li);
            links.push({heading: h, link: a});
        });
        nav.appendChild(list);
        var byline = margin.querySelector('.g-byline-margin');
        margin.insertBefore(nav, byline ? byline.nextSibling : margin.firstChild);

        // The heading being read: the last one above the top quarter of
        // the window.
        if (!('IntersectionObserver' in window)) return;
        var current = null;
        function mark() {
            var line = window.innerHeight / 4, active = links[0];
            links.forEach(function (l) {
                if (l.heading.getBoundingClientRect().top <= line) active = l;
            });
            if (active === current) return;
            if (current) current.link.removeAttribute('aria-current');
            active.link.setAttribute('aria-current', 'true');
            current = active;
        }
        var io = new IntersectionObserver(mark, {rootMargin: '0px 0px -75% 0px'});
        links.forEach(function (l) { io.observe(l.heading); });
        mark();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', contents);
    } else {
        contents();
    }
})();
