// The galley theme's script (linked deferred in footer.html, after the
// engine's app.js): sharing under a text (social_share.html).
//
// galleyShare - a behavior: in a [data-g-share] row the share button
// ([data-g-share-native]) is shown where the browser has its own share
// sheet (navigator.share) and opens it with the row's data-g-url and
// data-g-title; the copy button ([data-g-copy]) puts the address on the
// clipboard and says so for two seconds (its data-g-copied, translated
// in the template).
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
})();
