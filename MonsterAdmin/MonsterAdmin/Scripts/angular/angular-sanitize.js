/*
 AngularJS v1.1.5
 (c) 2010-2012 Google, Inc. http://angularjs.org
 License: MIT
*/
(function (I, h) {
    'use strict'; function i(a) { var d = {}, a = a.split(","), c; for (c = 0; c < a.length; c++) d[a[c]] = !0; return d } function z(a, d) {
        function c(a, b, c, f) { b = h.lowercase(b); if (m[b]) for (; e.last() && n[e.last()];) g("", e.last()); o[b] && e.last() == b && g("", b); (f = p[b] || !!f) || e.push(b); var j = {}; c.replace(A, function (a, b, d, c, g) { j[b] = k(d || c || g || "") }); d.start && d.start(b, j, f) } function g(a, b) {
            var c = 0, g; if (b = h.lowercase(b)) for (c = e.length - 1; c >= 0; c--) if (e[c] == b) break; if (c >= 0) {
                for (g = e.length - 1; g >= c; g--) d.end && d.end(e[g]); e.length =
                c
            }
        } var b, f, e = [], j = a; for (e.last = function () { return e[e.length - 1] }; a;) {
            f = !0; if (!e.last() || !q[e.last()]) { if (a.indexOf("<\!--") === 0) b = a.indexOf("--\>"), b >= 0 && (d.comment && d.comment(a.substring(4, b)), a = a.substring(b + 3), f = !1); else if (B.test(a)) { if (b = a.match(r)) a = a.substring(b[0].length), b[0].replace(r, g), f = !1 } else if (C.test(a) && (b = a.match(s))) a = a.substring(b[0].length), b[0].replace(s, c), f = !1; f && (b = a.indexOf("<"), f = b < 0 ? a : a.substring(0, b), a = b < 0 ? "" : a.substring(b), d.chars && d.chars(k(f))) } else a = a.replace(RegExp("(.*)<\\s*\\/\\s*" +
            e.last() + "[^>]*>", "i"), function (a, b) { b = b.replace(D, "$1").replace(E, "$1"); d.chars && d.chars(k(b)); return "" }), g("", e.last()); if (a == j) throw "Parse Error: " + a; j = a
        } g()
    } function k(a) { l.innerHTML = a.replace(/</g, "&lt;"); return l.innerText || l.textContent || "" } function t(a) { return a.replace(/&/g, "&amp;").replace(F, function (a) { return "&#" + a.charCodeAt(0) + ";" }).replace(/</g, "&lt;").replace(/>/g, "&gt;") } function u(a) {
        var d = !1, c = h.bind(a, a.push); return {
            start: function (a, b, f) {
                a = h.lowercase(a); !d && q[a] && (d = a); !d && v[a] ==
                !0 && (c("<"), c(a), h.forEach(b, function (a, b) { var d = h.lowercase(b); if (G[d] == !0 && (w[d] !== !0 || a.match(H))) c(" "), c(b), c('="'), c(t(a)), c('"') }), c(f ? "/>" : ">"))
            }, end: function (a) { a = h.lowercase(a); !d && v[a] == !0 && (c("</"), c(a), c(">")); a == d && (d = !1) }, chars: function (a) { d || c(t(a)) }
        }
    } var s = /^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/, r = /^<\s*\/\s*([\w:-]+)[^>]*>/, A = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g, C = /^</, B = /^<\s*\//, D = /<\!--(.*?)--\>/g,
    E = /<!\[CDATA\[(.*?)]]\>/g, H = /^((ftp|https?):\/\/|mailto:|tel:|#)/, F = /([^\#-~| |!])/g, p = i("area,br,col,hr,img,wbr"), x = i("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"), y = i("rp,rt"), o = h.extend({}, y, x), m = h.extend({}, x, i("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")), n = h.extend({}, y, i("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),
    q = i("script,style"), v = h.extend({}, p, m, n, o), w = i("background,cite,href,longdesc,src,usemap"), G = h.extend({}, w, i("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,span,start,summary,target,title,type,valign,value,vspace,width")), l = document.createElement("pre"); h.module("ngSanitize", []).value("$sanitize", function (a) {
        var d = [];
        z(a, u(d)); return d.join("")
    }); h.module("ngSanitize").directive("ngBindHtml", ["$sanitize", function (a) { return function (d, c, g) { c.addClass("ng-binding").data("$binding", g.ngBindHtml); d.$watch(g.ngBindHtml, function (b) { b = a(b); c.html(b || "") }) } }]); h.module("ngSanitize").filter("linky", function () {
        var a = /((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s\.\;\,\(\)\{\}\<\>]/, d = /^mailto:/; return function (c, g) {
            if (!c) return c; var b, f = c, e = [], j = u(e), i, k, l = {}; if (h.isDefined(g)) l.target = g; for (; b = f.match(a) ;) i =
            b[0], b[2] == b[3] && (i = "mailto:" + i), k = b.index, j.chars(f.substr(0, k)), l.href = i, j.start("a", l), j.chars(b[0].replace(d, "")), j.end("a"), f = f.substring(k + b[0].length); j.chars(f); return e.join("")
        }
    })
})(window, window.angular);
