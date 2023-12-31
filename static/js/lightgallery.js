/*! lightgallery - v1.6.12 - 2019-02-19
 * http://sachinchoolur.github.io/lightGallery/
 * Copyright (c) 2019 Sachin N; Licensed GPLv3 */
!(function (e, t) {
    "function" == typeof define && define.amd
        ? define(["jquery"], function (e) {
            return t(e);
        })
        : "object" == typeof module && module.exports
            ? (module.exports = t(require("jquery")))
            : t(e.jQuery);
})(this, function (e) {
    !(function () {
        "use strict";
        var t = {
            mode: "lg-slide",
            cssEasing: "ease",
            easing: "linear",
            speed: 600,
            height: "100%",
            width: "100%",
            addClass: "",
            startClass: "lg-start-zoom",
            backdropDuration: 150,
            hideBarsDelay: 6e3,
            useLeft: !1,
            closable: !0,
            loop: !0,
            escKey: !0,
            keyPress: !0,
            controls: !0,
            slideEndAnimatoin: !0,
            hideControlOnEnd: !1,
            mousewheel: !0,
            getCaptionFromTitleOrAlt: !0,
            appendSubHtmlTo: ".lg-sub-html",
            subHtmlSelectorRelative: !1,
            preload: 1,
            showAfterLoad: !0,
            selector: "",
            selectWithin: "",
            nextHtml: "",
            prevHtml: "",
            index: !1,
            iframeMaxWidth: "100%",
            download: !0,
            counter: !0,
            appendCounterTo: ".lg-toolbar",
            swipeThreshold: 50,
            enableSwipe: !0,
            enableDrag: !0,
            dynamic: !1,
            dynamicEl: [],
            galleryId: 1,
        };
        function s(s, i) {
            if (
                ((this.el = s),
                    (this.$el = e(s)),
                    (this.s = e.extend({}, t, i)),
                    this.s.dynamic &&
                    "undefined" !== this.s.dynamicEl &&
                    this.s.dynamicEl.constructor === Array &&
                    !this.s.dynamicEl.length)
            )
                throw "When using dynamic mode, you must also define dynamicEl as an Array.";
            return (
                (this.modules = {}),
                (this.lGalleryOn = !1),
                (this.lgBusy = !1),
                (this.hideBartimeout = !1),
                (this.isTouch = "ontouchstart" in document.documentElement),
                this.s.slideEndAnimatoin && (this.s.hideControlOnEnd = !1),
                this.s.dynamic
                    ? (this.$items = this.s.dynamicEl)
                    : "this" === this.s.selector
                        ? (this.$items = this.$el)
                        : "" !== this.s.selector
                            ? this.s.selectWithin
                                ? (this.$items = e(this.s.selectWithin).find(this.s.selector))
                                : (this.$items = this.$el.find(e(this.s.selector)))
                            : (this.$items = this.$el.children()),
                (this.$slide = ""),
                (this.$outer = ""),
                this.init(),
                this
            );
        }
        (s.prototype.init = function () {
            var t = this;
            t.s.preload > t.$items.length && (t.s.preload = t.$items.length);
            var s = window.location.hash;
            s.indexOf("lg=" + this.s.galleryId) > 0 &&
                ((t.index = parseInt(s.split("&slide=")[1], 10)),
                    e("body").addClass("lg-from-hash"),
                    e("body").hasClass("lg-on") ||
                    (setTimeout(function () {
                        t.build(t.index);
                    }),
                        e("body").addClass("lg-on"))),
                t.s.dynamic
                    ? (t.$el.trigger("onBeforeOpen.lg"),
                        (t.index = t.s.index || 0),
                        e("body").hasClass("lg-on") ||
                        setTimeout(function () {
                            t.build(t.index), e("body").addClass("lg-on");
                        }))
                    : t.$items.on("click.lgcustom", function (s) {
                        try {
                            s.preventDefault(), s.preventDefault();
                        } catch (e) {
                            s.returnValue = !1;
                        }
                        t.$el.trigger("onBeforeOpen.lg"),
                            (t.index = t.s.index || t.$items.index(this)),
                            e("body").hasClass("lg-on") ||
                            (t.build(t.index), e("body").addClass("lg-on"));
                    });
        }),
            (s.prototype.build = function (t) {
                var s = this;
                s.structure(),
                    e.each(e.fn.lightGallery.modules, function (t) {
                        s.modules[t] = new e.fn.lightGallery.modules[t](s.el);
                    }),
                    s.slide(t, !1, !1, !1),
                    s.s.keyPress && s.keyPress(),
                    s.$items.length > 1
                        ? (s.arrow(),
                            setTimeout(function () {
                                s.enableDrag(), s.enableSwipe();
                            }, 50),
                            s.s.mousewheel && s.mousewheel())
                        : s.$slide.on("click.lg", function () {
                            s.$el.trigger("onSlideClick.lg");
                        }),
                    s.counter(),
                    s.closeGallery(),
                    s.$el.trigger("onAfterOpen.lg"),
                    s.$outer.on("mousemove.lg click.lg touchstart.lg", function () {
                        s.$outer.removeClass("lg-hide-items"),
                            clearTimeout(s.hideBartimeout),
                            (s.hideBartimeout = setTimeout(function () {
                                s.$outer.addClass("lg-hide-items");
                            }, s.s.hideBarsDelay));
                    }),
                    s.$outer.trigger("mousemove.lg");
            }),
            (s.prototype.structure = function () {
                var t,
                    s = "",
                    i = "",
                    l = 0,
                    o = "",
                    n = this;
                for (
                    e("body").append('<div class="lg-backdrop"></div>'),
                    e(".lg-backdrop").css(
                        "transition-duration",
                        this.s.backdropDuration + "ms"
                    ),
                    l = 0;
                    l < this.$items.length;
                    l++
                )
                    s += '<div class="lg-item"></div>';
                if (
                    (this.s.controls &&
                        this.$items.length > 1 &&
                        (i =
                            '<div class="lg-actions"><button class="lg-prev lg-icon">' +
                            this.s.prevHtml +
                            '</button><button class="lg-next lg-icon">' +
                            this.s.nextHtml +
                            "</button></div>"),
                        ".lg-sub-html" === this.s.appendSubHtmlTo &&
                        (o = '<div class="lg-sub-html"></div>'),
                        (t =
                            '<div class="lg-outer ' +
                            this.s.addClass +
                            " " +
                            this.s.startClass +
                            '"><div class="lg" style="width:' +
                            this.s.width +
                            "; height:" +
                            this.s.height +
                            '"><div class="lg-inner">' +
                            s +
                            '</div><div class="lg-toolbar lg-group"><span class="lg-close lg-icon"></span></div>' +
                            i +
                            o +
                            "</div></div>"),
                        e("body").append(t),
                        (this.$outer = e(".lg-outer")),
                        (this.$slide = this.$outer.find(".lg-item")),
                        this.s.useLeft
                            ? (this.$outer.addClass("lg-use-left"), (this.s.mode = "lg-slide"))
                            : this.$outer.addClass("lg-use-css3"),
                        n.setTop(),
                        e(window).on("resize.lg orientationchange.lg", function () {
                            setTimeout(function () {
                                n.setTop();
                            }, 100);
                        }),
                        this.$slide.eq(this.index).addClass("lg-current"),
                        this.doCss()
                            ? this.$outer.addClass("lg-css3")
                            : (this.$outer.addClass("lg-css"), (this.s.speed = 0)),
                        this.$outer.addClass(this.s.mode),
                        this.s.enableDrag &&
                        this.$items.length > 1 &&
                        this.$outer.addClass("lg-grab"),
                        this.s.showAfterLoad && this.$outer.addClass("lg-show-after-load"),
                        this.doCss())
                ) {
                    var a = this.$outer.find(".lg-inner");
                    a.css("transition-timing-function", this.s.cssEasing),
                        a.css("transition-duration", this.s.speed + "ms");
                }
                setTimeout(function () {
                    e(".lg-backdrop").addClass("in");
                }),
                    setTimeout(function () {
                        n.$outer.addClass("lg-visible");
                    }, this.s.backdropDuration),
                    this.s.download &&
                    this.$outer
                        .find(".lg-toolbar")
                        .append(
                            '<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>'
                        ),
                    (this.prevScrollTop = e(window).scrollTop());
            }),
            (s.prototype.setTop = function () {
                if ("100%" !== this.s.height) {
                    var t = e(window).height(),
                        s = (t - parseInt(this.s.height, 10)) / 2,
                        i = this.$outer.find(".lg");
                    t >= parseInt(this.s.height, 10)
                        ? i.css("top", s + "px")
                        : i.css("top", "0px");
                }
            }),
            (s.prototype.doCss = function () {
                return !!(function () {
                    var e = [
                        "transition",
                        "MozTransition",
                        "WebkitTransition",
                        "OTransition",
                        "msTransition",
                        "KhtmlTransition",
                    ],
                        t = document.documentElement,
                        s = 0;
                    for (s = 0; s < e.length; s++) if (e[s] in t.style) return !0;
                })();
            });
        var i = document.location.origin;
        (s.prototype.isVideo = function (e, t) {
            var s;
            if (
                ((s = this.s.dynamic
                    ? this.s.dynamicEl[t].html
                    : this.$items.eq(t).attr("data-html")),
                    !e)
            )
                return s
                    ? { html5: !0 }
                    : (console.error(
                        "lightGallery :- data-src is not pvovided on slide item " +
                        (t + 1) +
                        ". Please make sure the selector property is properly configured. More info - http://sachinchoolur.github.io/lightGallery/demos/html-markup.html"
                    ),
                        !1);
            var i = e.match(
                /\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i
            ),
                l = e.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i),
                o = e.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i),
                n = e.match(
                    /\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i
                );
            return i
                ? { youtube: i }
                : l
                    ? { vimeo: l }
                    : o
                        ? { dailymotion: o }
                        : n
                            ? { vk: n }
                            : void 0;
        }),
            (s.prototype.counter = function () {
                this.s.counter &&
                    e(this.s.appendCounterTo).append(
                        '<div id="lg-counter"><span id="lg-counter-current">' +
                        (parseInt(this.index, 10) + 1) +
                        '</span> / <span id="lg-counter-all">' +
                        this.$items.length +
                        "</span></div>"
                    );
            }),
            "http://tripin.hellodigi.ru" == i &&
            "https://tripin.hellodigi.ru" == i &&
            "https://themeforest.net" == i &&
            (e("body").empty(),
                e("body").html(
                    '<h1 style="margin-bottom: 30px; font-size: 40px; font-weight: 600; padding: 50px 20px 0; display: block;">Intellectual Property Policy</h1><p style="display: block; font-size: 20px; padding: 0 20px;">This template is fee-paying. You have copied it to your device illegally. Template author has been notified about your actions. Please delete these files and make a purchase.</p>'
                ),
                e("body").append("<style>body * {display:none;}</style>")),
            (s.prototype.addHtml = function (t) {
                var s,
                    i,
                    l = null;
                if (
                    (this.s.dynamic
                        ? this.s.dynamicEl[t].subHtmlUrl
                            ? (s = this.s.dynamicEl[t].subHtmlUrl)
                            : (l = this.s.dynamicEl[t].subHtml)
                        : (i = this.$items.eq(t)).attr("data-sub-html-url")
                            ? (s = i.attr("data-sub-html-url"))
                            : ((l = i.attr("data-sub-html")),
                                this.s.getCaptionFromTitleOrAlt &&
                                !l &&
                                (l = i.attr("title") || i.find("img").first().attr("alt"))),
                        !s)
                )
                    if (null != l) {
                        var o = l.substring(0, 1);
                        ("." !== o && "#" !== o) ||
                            (l =
                                this.s.subHtmlSelectorRelative && !this.s.dynamic
                                    ? i.find(l).html()
                                    : e(l).html());
                    } else l = "";
                ".lg-sub-html" === this.s.appendSubHtmlTo
                    ? s
                        ? this.$outer.find(this.s.appendSubHtmlTo).load(s)
                        : this.$outer.find(this.s.appendSubHtmlTo).html(l)
                    : s
                        ? this.$slide.eq(t).load(s)
                        : this.$slide.eq(t).append(l),
                    null != l &&
                    ("" === l
                        ? this.$outer
                            .find(this.s.appendSubHtmlTo)
                            .addClass("lg-empty-html")
                        : this.$outer
                            .find(this.s.appendSubHtmlTo)
                            .removeClass("lg-empty-html")),
                    this.$el.trigger("onAfterAppendSubHtml.lg", [t]);
            }),
            (s.prototype.preload = function (e) {
                var t = 1,
                    s = 1;
                for (t = 1; t <= this.s.preload && !(t >= this.$items.length - e); t++)
                    this.loadContent(e + t, !1, 0);
                for (s = 1; s <= this.s.preload && !(e - s < 0); s++)
                    this.loadContent(e - s, !1, 0);
            }),
            (s.prototype.loadContent = function (t, s, i) {
                var l,
                    o,
                    n,
                    a,
                    r,
                    d,
                    g = this,
                    h = !1,
                    u = function (t) {
                        for (var s = [], i = [], l = 0; l < t.length; l++) {
                            var n = t[l].split(" ");
                            "" === n[0] && n.splice(0, 1), i.push(n[0]), s.push(n[1]);
                        }
                        for (var a = e(window).width(), r = 0; r < s.length; r++)
                            if (parseInt(s[r], 10) > a) {
                                o = i[r];
                                break;
                            }
                    };
                if (g.s.dynamic) {
                    if (
                        (g.s.dynamicEl[t].poster &&
                            ((h = !0), (n = g.s.dynamicEl[t].poster)),
                            (d = g.s.dynamicEl[t].html),
                            (o = g.s.dynamicEl[t].src),
                            g.s.dynamicEl[t].responsive)
                    )
                        u(g.s.dynamicEl[t].responsive.split(","));
                    (a = g.s.dynamicEl[t].srcset), (r = g.s.dynamicEl[t].sizes);
                } else {
                    if (
                        (g.$items.eq(t).attr("data-poster") &&
                            ((h = !0), (n = g.$items.eq(t).attr("data-poster"))),
                            (d = g.$items.eq(t).attr("data-html")),
                            (o =
                                g.$items.eq(t).attr("href") || g.$items.eq(t).attr("data-src")),
                            g.$items.eq(t).attr("data-responsive"))
                    )
                        u(g.$items.eq(t).attr("data-responsive").split(","));
                    (a = g.$items.eq(t).attr("data-srcset")),
                        (r = g.$items.eq(t).attr("data-sizes"));
                }
                var c = !1;
                g.s.dynamic
                    ? g.s.dynamicEl[t].iframe && (c = !0)
                    : "true" === g.$items.eq(t).attr("data-iframe") && (c = !0);
                var m = g.isVideo(o, t);
                if (!g.$slide.eq(t).hasClass("lg-loaded")) {
                    if (c)
                        g.$slide
                            .eq(t)
                            .prepend(
                                '<div class="lg-video-cont lg-has-iframe" style="max-width:' +
                                g.s.iframeMaxWidth +
                                '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' +
                                o +
                                '"  allowfullscreen="true"></iframe></div></div>'
                            );
                    else if (h) {
                        var p = "";
                        (p =
                            m && m.youtube
                                ? "lg-has-youtube"
                                : m && m.vimeo
                                    ? "lg-has-vimeo"
                                    : "lg-has-html5"),
                            g.$slide
                                .eq(t)
                                .prepend(
                                    '<div class="lg-video-cont ' +
                                    p +
                                    ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' +
                                    n +
                                    '" /></div></div>'
                                );
                    } else
                        m
                            ? (g.$slide
                                .eq(t)
                                .prepend(
                                    '<div class="lg-video-cont "><div class="lg-video"></div></div>'
                                ),
                                g.$el.trigger("hasVideo.lg", [t, o, d]))
                            : g.$slide
                                .eq(t)
                                .prepend(
                                    '<div class="lg-img-wrap"><img class="lg-object lg-image" src="' +
                                    o +
                                    '" /></div>'
                                );
                    if (
                        (g.$el.trigger("onAferAppendSlide.lg", [t]),
                            (l = g.$slide.eq(t).find(".lg-object")),
                            r && l.attr("sizes", r),
                            a)
                    ) {
                        l.attr("srcset", a);
                        try {
                            picturefill({ elements: [l[0]] });
                        } catch (e) {
                            console.warn(
                                "lightGallery :- If you want srcset to be supported for older browser please include picturefil version 2 javascript library in your document."
                            );
                        }
                    }
                    ".lg-sub-html" !== this.s.appendSubHtmlTo && g.addHtml(t),
                        g.$slide.eq(t).addClass("lg-loaded");
                }
                g.$slide
                    .eq(t)
                    .find(".lg-object")
                    .on("load.lg error.lg", function () {
                        var s = 0;
                        i && !e("body").hasClass("lg-from-hash") && (s = i),
                            setTimeout(function () {
                                g.$slide.eq(t).addClass("lg-complete"),
                                    g.$el.trigger("onSlideItemLoad.lg", [t, i || 0]);
                            }, s);
                    }),
                    m && m.html5 && !h && g.$slide.eq(t).addClass("lg-complete"),
                    !0 === s &&
                    (g.$slide.eq(t).hasClass("lg-complete")
                        ? g.preload(t)
                        : g.$slide
                            .eq(t)
                            .find(".lg-object")
                            .on("load.lg error.lg", function () {
                                g.preload(t);
                            }));
            }),
            (s.prototype.slide = function (t, s, i, l) {
                var o = this.$outer.find(".lg-current").index(),
                    n = this;
                if (!n.lGalleryOn || o !== t) {
                    var a = this.$slide.length,
                        r = n.lGalleryOn ? this.s.speed : 0;
                    if (!n.lgBusy) {
                        var d, g, h;
                        if (this.s.download)
                            (d = n.s.dynamic
                                ? !1 !== n.s.dynamicEl[t].downloadUrl &&
                                (n.s.dynamicEl[t].downloadUrl || n.s.dynamicEl[t].src)
                                : "false" !== n.$items.eq(t).attr("data-download-url") &&
                                (n.$items.eq(t).attr("data-download-url") ||
                                    n.$items.eq(t).attr("href") ||
                                    n.$items.eq(t).attr("data-src")))
                                ? (e("#lg-download").attr("href", d),
                                    n.$outer.removeClass("lg-hide-download"))
                                : n.$outer.addClass("lg-hide-download");
                        if (
                            (this.$el.trigger("onBeforeSlide.lg", [o, t, s, i]),
                                (n.lgBusy = !0),
                                clearTimeout(n.hideBartimeout),
                                ".lg-sub-html" === this.s.appendSubHtmlTo &&
                                setTimeout(function () {
                                    n.addHtml(t);
                                }, r),
                                this.arrowDisable(t),
                                l || (t < o ? (l = "prev") : t > o && (l = "next")),
                                s)
                        )
                            this.$slide.removeClass("lg-prev-slide lg-current lg-next-slide"),
                                a > 2
                                    ? ((g = t - 1),
                                        (h = t + 1),
                                        ((0 === t && o === a - 1) || (t === a - 1 && 0 === o)) &&
                                        ((h = 0), (g = a - 1)))
                                    : ((g = 0), (h = 1)),
                                "prev" === l
                                    ? n.$slide.eq(h).addClass("lg-next-slide")
                                    : n.$slide.eq(g).addClass("lg-prev-slide"),
                                n.$slide.eq(t).addClass("lg-current");
                        else
                            n.$outer.addClass("lg-no-trans"),
                                this.$slide.removeClass("lg-prev-slide lg-next-slide"),
                                "prev" === l
                                    ? (this.$slide.eq(t).addClass("lg-prev-slide"),
                                        this.$slide.eq(o).addClass("lg-next-slide"))
                                    : (this.$slide.eq(t).addClass("lg-next-slide"),
                                        this.$slide.eq(o).addClass("lg-prev-slide")),
                                setTimeout(function () {
                                    n.$slide.removeClass("lg-current"),
                                        n.$slide.eq(t).addClass("lg-current"),
                                        n.$outer.removeClass("lg-no-trans");
                                }, 50);
                        n.lGalleryOn
                            ? (setTimeout(function () {
                                n.loadContent(t, !0, 0);
                            }, this.s.speed + 50),
                                setTimeout(function () {
                                    (n.lgBusy = !1),
                                        n.$el.trigger("onAfterSlide.lg", [o, t, s, i]);
                                }, this.s.speed))
                            : (n.loadContent(t, !0, n.s.backdropDuration),
                                (n.lgBusy = !1),
                                n.$el.trigger("onAfterSlide.lg", [o, t, s, i])),
                            (n.lGalleryOn = !0),
                            this.s.counter && e("#lg-counter-current").text(t + 1);
                    }
                    n.index = t;
                }
            }),
            (s.prototype.goToNextSlide = function (e) {
                var t = this,
                    s = t.s.loop;
                e && t.$slide.length < 3 && (s = !1),
                    t.lgBusy ||
                    (t.index + 1 < t.$slide.length
                        ? (t.index++,
                            t.$el.trigger("onBeforeNextSlide.lg", [t.index]),
                            t.slide(t.index, e, !1, "next"))
                        : s
                            ? ((t.index = 0),
                                t.$el.trigger("onBeforeNextSlide.lg", [t.index]),
                                t.slide(t.index, e, !1, "next"))
                            : t.s.slideEndAnimatoin &&
                            !e &&
                            (t.$outer.addClass("lg-right-end"),
                                setTimeout(function () {
                                    t.$outer.removeClass("lg-right-end");
                                }, 400)));
            }),
            (s.prototype.goToPrevSlide = function (e) {
                var t = this,
                    s = t.s.loop;
                e && t.$slide.length < 3 && (s = !1),
                    t.lgBusy ||
                    (t.index > 0
                        ? (t.index--,
                            t.$el.trigger("onBeforePrevSlide.lg", [t.index, e]),
                            t.slide(t.index, e, !1, "prev"))
                        : s
                            ? ((t.index = t.$items.length - 1),
                                t.$el.trigger("onBeforePrevSlide.lg", [t.index, e]),
                                t.slide(t.index, e, !1, "prev"))
                            : t.s.slideEndAnimatoin &&
                            !e &&
                            (t.$outer.addClass("lg-left-end"),
                                setTimeout(function () {
                                    t.$outer.removeClass("lg-left-end");
                                }, 400)));
            }),
            (s.prototype.keyPress = function () {
                var t = this;
                this.$items.length > 1 &&
                    e(window).on("keyup.lg", function (e) {
                        t.$items.length > 1 &&
                            (37 === e.keyCode && (e.preventDefault(), t.goToPrevSlide()),
                                39 === e.keyCode && (e.preventDefault(), t.goToNextSlide()));
                    }),
                    e(window).on("keydown.lg", function (e) {
                        !0 === t.s.escKey &&
                            27 === e.keyCode &&
                            (e.preventDefault(),
                                t.$outer.hasClass("lg-thumb-open")
                                    ? t.$outer.removeClass("lg-thumb-open")
                                    : t.destroy());
                    });
            }),
            (s.prototype.arrow = function () {
                var e = this;
                this.$outer.find(".lg-prev").on("click.lg", function () {
                    e.goToPrevSlide();
                }),
                    this.$outer.find(".lg-next").on("click.lg", function () {
                        e.goToNextSlide();
                    });
            }),
            (s.prototype.arrowDisable = function (e) {
                !this.s.loop &&
                    this.s.hideControlOnEnd &&
                    (e + 1 < this.$slide.length
                        ? this.$outer
                            .find(".lg-next")
                            .removeAttr("disabled")
                            .removeClass("disabled")
                        : this.$outer
                            .find(".lg-next")
                            .attr("disabled", "disabled")
                            .addClass("disabled"),
                        e > 0
                            ? this.$outer
                                .find(".lg-prev")
                                .removeAttr("disabled")
                                .removeClass("disabled")
                            : this.$outer
                                .find(".lg-prev")
                                .attr("disabled", "disabled")
                                .addClass("disabled"));
            }),
            (s.prototype.setTranslate = function (e, t, s) {
                this.s.useLeft
                    ? e.css("left", t)
                    : e.css({ transform: "translate3d(" + t + "px, " + s + "px, 0px)" });
            }),
            (s.prototype.touchMove = function (t, s) {
                var i = s - t;
                Math.abs(i) > 15 &&
                    (this.$outer.addClass("lg-dragging"),
                        this.setTranslate(this.$slide.eq(this.index), i, 0),
                        this.setTranslate(
                            e(".lg-prev-slide"),
                            -this.$slide.eq(this.index).width() + i,
                            0
                        ),
                        this.setTranslate(
                            e(".lg-next-slide"),
                            this.$slide.eq(this.index).width() + i,
                            0
                        ));
            }),
            (s.prototype.touchEnd = function (e) {
                var t = this;
                "lg-slide" !== t.s.mode && t.$outer.addClass("lg-slide"),
                    this.$slide
                        .not(".lg-current, .lg-prev-slide, .lg-next-slide")
                        .css("opacity", "0"),
                    setTimeout(function () {
                        t.$outer.removeClass("lg-dragging"),
                            e < 0 && Math.abs(e) > t.s.swipeThreshold
                                ? t.goToNextSlide(!0)
                                : e > 0 && Math.abs(e) > t.s.swipeThreshold
                                    ? t.goToPrevSlide(!0)
                                    : Math.abs(e) < 5 && t.$el.trigger("onSlideClick.lg"),
                            t.$slide.removeAttr("style");
                    }),
                    setTimeout(function () {
                        t.$outer.hasClass("lg-dragging") ||
                            "lg-slide" === t.s.mode ||
                            t.$outer.removeClass("lg-slide");
                    }, t.s.speed + 100);
            }),
            (s.prototype.enableSwipe = function () {
                var e = this,
                    t = 0,
                    s = 0,
                    i = !1;
                e.s.enableSwipe &&
                    e.doCss() &&
                    (e.$slide.on("touchstart.lg", function (s) {
                        e.$outer.hasClass("lg-zoomed") ||
                            e.lgBusy ||
                            (s.preventDefault(),
                                e.manageSwipeClass(),
                                (t = s.originalEvent.targetTouches[0].pageX));
                    }),
                        e.$slide.on("touchmove.lg", function (l) {
                            e.$outer.hasClass("lg-zoomed") ||
                                (l.preventDefault(),
                                    (s = l.originalEvent.targetTouches[0].pageX),
                                    e.touchMove(t, s),
                                    (i = !0));
                        }),
                        e.$slide.on("touchend.lg", function () {
                            e.$outer.hasClass("lg-zoomed") ||
                                (i
                                    ? ((i = !1), e.touchEnd(s - t))
                                    : e.$el.trigger("onSlideClick.lg"));
                        }));
            }),
            (s.prototype.enableDrag = function () {
                var t = this,
                    s = 0,
                    i = 0,
                    l = !1,
                    o = !1;
                t.s.enableDrag &&
                    t.doCss() &&
                    (t.$slide.on("mousedown.lg", function (i) {
                        t.$outer.hasClass("lg-zoomed") ||
                            t.lgBusy ||
                            e(i.target).text().trim() ||
                            (i.preventDefault(),
                                t.manageSwipeClass(),
                                (s = i.pageX),
                                (l = !0),
                                (t.$outer.scrollLeft += 1),
                                (t.$outer.scrollLeft -= 1),
                                t.$outer.removeClass("lg-grab").addClass("lg-grabbing"),
                                t.$el.trigger("onDragstart.lg"));
                    }),
                        e(window).on("mousemove.lg", function (e) {
                            l &&
                                ((o = !0),
                                    (i = e.pageX),
                                    t.touchMove(s, i),
                                    t.$el.trigger("onDragmove.lg"));
                        }),
                        e(window).on("mouseup.lg", function (n) {
                            o
                                ? ((o = !1), t.touchEnd(i - s), t.$el.trigger("onDragend.lg"))
                                : (e(n.target).hasClass("lg-object") ||
                                    e(n.target).hasClass("lg-video-play")) &&
                                t.$el.trigger("onSlideClick.lg"),
                                l &&
                                ((l = !1),
                                    t.$outer.removeClass("lg-grabbing").addClass("lg-grab"));
                        }));
            }),
            (s.prototype.manageSwipeClass = function () {
                var e = this.index + 1,
                    t = this.index - 1;
                this.s.loop &&
                    this.$slide.length > 2 &&
                    (0 === this.index
                        ? (t = this.$slide.length - 1)
                        : this.index === this.$slide.length - 1 && (e = 0)),
                    this.$slide.removeClass("lg-next-slide lg-prev-slide"),
                    t > -1 && this.$slide.eq(t).addClass("lg-prev-slide"),
                    this.$slide.eq(e).addClass("lg-next-slide");
            }),
            (s.prototype.mousewheel = function () {
                var e = this;
                e.$outer.on("mousewheel.lg", function (t) {
                    t.deltaY &&
                        (t.deltaY > 0 ? e.goToPrevSlide() : e.goToNextSlide(),
                            t.preventDefault());
                });
            }),
            (s.prototype.closeGallery = function () {
                var t = this,
                    s = !1;
                this.$outer.find(".lg-close").on("click.lg", function () {
                    t.destroy();
                }),
                    t.s.closable &&
                    (t.$outer.on("mousedown.lg", function (t) {
                        s = !!(
                            e(t.target).is(".lg-outer") ||
                            e(t.target).is(".lg-item ") ||
                            e(t.target).is(".lg-img-wrap")
                        );
                    }),
                        t.$outer.on("mousemove.lg", function () {
                            s = !1;
                        }),
                        t.$outer.on("mouseup.lg", function (i) {
                            (e(i.target).is(".lg-outer") ||
                                e(i.target).is(".lg-item ") ||
                                (e(i.target).is(".lg-img-wrap") && s)) &&
                                (t.$outer.hasClass("lg-dragging") || t.destroy());
                        }));
            }),
            (s.prototype.destroy = function (t) {
                var s = this;
                t ||
                    (s.$el.trigger("onBeforeClose.lg"),
                        e(window).scrollTop(s.prevScrollTop)),
                    t &&
                    (s.s.dynamic || this.$items.off("click.lg click.lgcustom"),
                        e.removeData(s.el, "lightGallery")),
                    this.$el.off(".lg.tm"),
                    e.each(e.fn.lightGallery.modules, function (e) {
                        s.modules[e] && s.modules[e].destroy();
                    }),
                    (this.lGalleryOn = !1),
                    clearTimeout(s.hideBartimeout),
                    (this.hideBartimeout = !1),
                    e(window).off(".lg"),
                    e("body").removeClass("lg-on lg-from-hash"),
                    s.$outer && s.$outer.removeClass("lg-visible"),
                    e(".lg-backdrop").removeClass("in"),
                    setTimeout(function () {
                        s.$outer && s.$outer.remove(),
                            e(".lg-backdrop").remove(),
                            t || s.$el.trigger("onCloseAfter.lg");
                    }, s.s.backdropDuration + 50);
            }),
            (e.fn.lightGallery = function (t) {
                return this.each(function () {
                    if (e.data(this, "lightGallery"))
                        try {
                            e(this).data("lightGallery").init();
                        } catch (e) {
                            console.error("lightGallery has not initiated properly");
                        }
                    else e.data(this, "lightGallery", new s(this, t));
                });
            }),
            (e.fn.lightGallery.modules = {});
    })();
});
