var Holder=Holder||{};!function(a,b){function c(a,b,c){b=parseInt(b,10),a=parseInt(a,10);var d=Math.max(b,a),e=Math.min(b,a),f=1/12,g=Math.min(.75*e,.75*d*f);return{height:Math.round(Math.max(c.size,g))}}function d(a){var b=[];for(p in a)a.hasOwnProperty(p)&&b.push(p+":"+a[p]);return b.join(";")}function e(a){var b=a.ctx,d=a.dimensions,e=a.template,f=a.ratio,g=a.holder,h="literal"==g.textmode,i="exact"==g.textmode,j=c(d.width,d.height,e),k=j.height,l=d.width*f,m=d.height*f,n=e.font?e.font:"Arial,Helvetica,sans-serif";canvas.width=l,canvas.height=m,b.textAlign="center",b.textBaseline="middle",b.fillStyle=e.background,b.fillRect(0,0,l,m),b.fillStyle=e.foreground,b.font="bold "+k+"px "+n;var o=e.text?e.text:Math.floor(d.width)+"x"+Math.floor(d.height);if(h){var d=g.dimensions;o=d.width+"x"+d.height}else if(i&&g.exact_dimensions){var d=g.exact_dimensions;o=Math.floor(d.width)+"x"+Math.floor(d.height)}var p=b.measureText(o).width;return p/l>=.75&&(k=Math.floor(.75*k*(l/p))),b.font="bold "+k*f+"px "+n,b.fillText(o,l/2,m/2,l),canvas.toDataURL("image/png")}function f(a){var b=a.dimensions,d=a.template,e=a.holder,f="literal"==e.textmode,g="exact"==e.textmode,h=c(b.width,b.height,d),i=h.height,j=b.width,k=b.height,l=d.font?d.font:"Arial,Helvetica,sans-serif",m=d.text?d.text:Math.floor(b.width)+"x"+Math.floor(b.height);if(f){var b=e.dimensions;m=b.width+"x"+b.height}else if(g&&e.exact_dimensions){var b=e.exact_dimensions;m=Math.floor(b.width)+"x"+Math.floor(b.height)}var n=z({text:m,width:j,height:k,text_height:i,font:l,template:d});return"data:image/svg+xml;base64,"+btoa(unescape(encodeURIComponent(n)))}function g(a){return r.use_canvas&&!r.use_svg?e(a):f(a)}function h(a,b,c,d){var e=c.dimensions,f=c.theme,h=c.text?decodeURIComponent(c.text):c.text,i=e.width+"x"+e.height;f=h?o(f,{text:h}):f,f=c.font?o(f,{font:c.font}):f,b.setAttribute("data-src",d),c.theme=f,b.holder_data=c,"image"==a?(b.setAttribute("alt",h?h:f.text?f.text+" ["+i+"]":i),(r.use_fallback||!c.auto)&&(b.style.width=e.width+"px",b.style.height=e.height+"px"),r.use_fallback?b.style.backgroundColor=f.background:(b.setAttribute("src",g({ctx:w,dimensions:e,template:f,ratio:x,holder:c})),c.textmode&&"exact"==c.textmode&&(v.push(b),k(b)))):"background"==a?r.use_fallback||(b.style.backgroundImage="url("+g({ctx:w,dimensions:e,template:f,ratio:x,holder:c})+")",b.style.backgroundSize=e.width+"px "+e.height+"px"):"fluid"==a&&(b.setAttribute("alt",h?h:f.text?f.text+" ["+i+"]":i),"%"==e.height.slice(-1)?b.style.height=e.height:null!=c.auto&&c.auto||(b.style.height=e.height+"px"),"%"==e.width.slice(-1)?b.style.width=e.width:null!=c.auto&&c.auto||(b.style.width=e.width+"px"),("inline"==b.style.display||""===b.style.display||"none"==b.style.display)&&(b.style.display="block"),j(b),r.use_fallback?b.style.backgroundColor=f.background:(v.push(b),k(b)))}function i(a,b){var c={height:a.clientHeight,width:a.clientWidth};return c.height||c.width?(a.removeAttribute("data-holder-invisible"),c):(a.setAttribute("data-holder-invisible",!0),void b.call(this,a))}function j(b){if(b.holder_data){var c=i(b,a.invisible_error_fn(j));if(c){var d=b.holder_data;d.initial_dimensions=c,d.fluid_data={fluid_height:"%"==d.dimensions.height.slice(-1),fluid_width:"%"==d.dimensions.width.slice(-1),mode:null},d.fluid_data.fluid_width&&!d.fluid_data.fluid_height?(d.fluid_data.mode="width",d.fluid_data.ratio=d.initial_dimensions.width/parseFloat(d.dimensions.height)):!d.fluid_data.fluid_width&&d.fluid_data.fluid_height&&(d.fluid_data.mode="height",d.fluid_data.ratio=parseFloat(d.dimensions.width)/d.initial_dimensions.height)}}}function k(b){var c;c=null==b.nodeType?v:[b];for(var d in c)if(c.hasOwnProperty(d)){var e=c[d];if(e.holder_data){var f=e.holder_data,h=i(e,a.invisible_error_fn(k));if(h){if(f.fluid){if(f.auto)switch(f.fluid_data.mode){case"width":h.height=h.width/f.fluid_data.ratio;break;case"height":h.width=h.height*f.fluid_data.ratio}e.setAttribute("src",g({ctx:w,dimensions:h,template:f.theme,ratio:x,holder:f}))}f.textmode&&"exact"==f.textmode&&(f.exact_dimensions=h,e.setAttribute("src",g({ctx:w,dimensions:f.dimensions,template:f.theme,ratio:x,holder:f})))}}}}function l(b,c){for(var d={theme:o(y.themes.gray,{})},e=!1,f=b.length,g=0;f>g;g++){var h=b[g];a.flags.dimensions.match(h)?(e=!0,d.dimensions=a.flags.dimensions.output(h)):a.flags.fluid.match(h)?(e=!0,d.dimensions=a.flags.fluid.output(h),d.fluid=!0):a.flags.textmode.match(h)?d.textmode=a.flags.textmode.output(h):a.flags.colors.match(h)?d.theme=a.flags.colors.output(h):c.themes[h]?c.themes.hasOwnProperty(h)&&(d.theme=o(c.themes[h],{})):a.flags.font.match(h)?d.font=a.flags.font.output(h):a.flags.auto.match(h)?d.auto=!0:a.flags.text.match(h)&&(d.text=a.flags.text.output(h))}return e?d:!1}function m(a,b){var c="complete",d="readystatechange",e=!1,f=e,g=!0,h=a.document,i=h.documentElement,j=h.addEventListener?"addEventListener":"attachEvent",k=h.addEventListener?"removeEventListener":"detachEvent",l=h.addEventListener?"":"on",m=function(g){(g.type!=d||h.readyState==c)&&(("load"==g.type?a:h)[k](l+g.type,m,e),!f&&(f=!0)&&b.call(a,null))},n=function(){try{i.doScroll("left")}catch(a){return void setTimeout(n,50)}m("poll")};if(h.readyState==c)b.call(a,"lazy");else{if(h.createEventObject&&i.doScroll){try{g=!a.frameElement}catch(o){}g&&n()}h[j](l+"DOMContentLoaded",m,e),h[j](l+d,m,e),a[j](l+"load",m,e)}}function n(a,b){var a=a.match(/^(\W)?(.*)/),b=b||document,c=b["getElement"+(a[1]?"#"==a[1]?"ById":"sByClassName":"sByTagName")],d=c.call(b,a[2]),e=[];return null!==d&&(e=d.length||0===d.length?d:[d]),e}function o(a,b){var c={};for(var d in a)a.hasOwnProperty(d)&&(c[d]=a[d]);for(var d in b)b.hasOwnProperty(d)&&(c[d]=b[d]);return c}var q={use_svg:!1,use_canvas:!1,use_fallback:!1},r={},s=!1;canvas=document.createElement("canvas");var t=1,u=1,v=[];if(canvas.getContext)if(canvas.toDataURL("image/png").indexOf("data:image/png")<0)q.use_fallback=!0;else var w=canvas.getContext("2d");else q.use_fallback=!0;document.createElementNS&&document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect&&(q.use_svg=!0,q.use_canvas=!1),q.use_fallback||(t=window.devicePixelRatio||1,u=w.webkitBackingStorePixelRatio||w.mozBackingStorePixelRatio||w.msBackingStorePixelRatio||w.oBackingStorePixelRatio||w.backingStorePixelRatio||1);var x=t/u,y={domain:"holder.js",images:"img",bgnodes:".holderjs",themes:{gray:{background:"#eee",foreground:"#aaa",size:12},social:{background:"#3a5a97",foreground:"#fff",size:12},industrial:{background:"#434A52",foreground:"#C2F200",size:12},sky:{background:"#0D8FDB",foreground:"#fff",size:12},vine:{background:"#39DBAC",foreground:"#1E292C",size:12},lava:{background:"#F8591A",foreground:"#1C2846",size:12}},stylesheet:""};a.flags={dimensions:{regex:/^(\d+)x(\d+)$/,output:function(a){var b=this.regex.exec(a);return{width:+b[1],height:+b[2]}}},fluid:{regex:/^([0-9%]+)x([0-9%]+)$/,output:function(a){var b=this.regex.exec(a);return{width:b[1],height:b[2]}}},colors:{regex:/#([0-9a-f]{3,})\:#([0-9a-f]{3,})/i,output:function(a){var b=this.regex.exec(a);return{size:y.themes.gray.size,foreground:"#"+b[2],background:"#"+b[1]}}},text:{regex:/text\:(.*)/,output:function(a){return this.regex.exec(a)[1]}},font:{regex:/font\:(.*)/,output:function(a){return this.regex.exec(a)[1]}},auto:{regex:/^auto$/},textmode:{regex:/textmode\:(.*)/,output:function(a){return this.regex.exec(a)[1]}}};var z=function(){if(window.XMLSerializer){var a=new XMLSerializer,b="http://www.w3.org/2000/svg",c=document.createElementNS(b,"svg");c.webkitMatchesSelector&&c.setAttribute("xmlns","http://www.w3.org/2000/svg");var e=document.createElementNS(b,"rect"),f=document.createElementNS(b,"text"),g=document.createTextNode(null);return f.setAttribute("text-anchor","middle"),f.appendChild(g),c.appendChild(e),c.appendChild(f),function(b){return c.setAttribute("width",b.width),c.setAttribute("height",b.height),e.setAttribute("width",b.width),e.setAttribute("height",b.height),e.setAttribute("fill",b.template.background),f.setAttribute("x",b.width/2),f.setAttribute("y",b.height/2),g.nodeValue=b.text,f.setAttribute("style",d({fill:b.template.foreground,"font-weight":"bold","font-size":b.text_height+"px","font-family":b.font,"dominant-baseline":"central"})),a.serializeToString(c)}}}();for(var A in a.flags)a.flags.hasOwnProperty(A)&&(a.flags[A].match=function(a){return a.match(this.regex)});a.invisible_error_fn=function(){return function(a){if(a.hasAttribute("data-holder-invisible"))throw new Error("Holder: invisible placeholder")}},a.add_theme=function(b,c){return null!=b&&null!=c&&(y.themes[b]=c),a},a.add_image=function(b,c){var d=n(c);if(d.length)for(var e=0,f=d.length;f>e;e++){var g=document.createElement("img");g.setAttribute("data-src",b),d[e].appendChild(g)}return a},a.run=function(b){r=o({},q),s=!0;var c=o(y,b),d=[],e=[],f=[];for(null!=c.use_canvas&&c.use_canvas&&(r.use_canvas=!0,r.use_svg=!1),"string"==typeof c.images?e=n(c.images):window.NodeList&&c.images instanceof window.NodeList?e=c.images:window.Node&&c.images instanceof window.Node?e=[c.images]:window.HTMLCollection&&c.images instanceof window.HTMLCollection&&(e=c.images),"string"==typeof c.bgnodes?f=n(c.bgnodes):window.NodeList&&c.elements instanceof window.NodeList?f=c.bgnodes:window.Node&&c.bgnodes instanceof window.Node&&(f=[c.bgnodes]),k=0,j=e.length;j>k;k++)d.push(e[k]);var g=document.getElementById("holderjs-style");g||(g=document.createElement("style"),g.setAttribute("id","holderjs-style"),g.type="text/css",document.getElementsByTagName("head")[0].appendChild(g)),c.nocss||(g.styleSheet?g.styleSheet.cssText+=c.stylesheet:c.stylesheet.length&&g.appendChild(document.createTextNode(c.stylesheet)));for(var i=new RegExp(c.domain+'/(.*?)"?\\)'),j=f.length,k=0;j>k;k++){var m=window.getComputedStyle(f[k],null).getPropertyValue("background-image"),p=m.match(i),t=f[k].getAttribute("data-background-src");if(p){var u=l(p[1].split("/"),c);u&&h("background",f[k],u,m)}else if(null!=t){var u=l(t.substr(t.lastIndexOf(c.domain)+c.domain.length+1).split("/"),c);u&&h("background",f[k],u,m)}}for(j=d.length,k=0;j>k;k++){var v,w;w=v=m=null;try{w=d[k].getAttribute("src"),attr_datasrc=d[k].getAttribute("data-src")}catch(x){}if(null==attr_datasrc&&w&&w.indexOf(c.domain)>=0?m=w:attr_datasrc&&attr_datasrc.indexOf(c.domain)>=0&&(m=attr_datasrc),m){var u=l(m.substr(m.lastIndexOf(c.domain)+c.domain.length+1).split("/"),c);u&&(u.fluid?h("fluid",d[k],u,m):h("image",d[k],u,m))}}return a},m(b,function(){window.addEventListener?(window.addEventListener("resize",k,!1),window.addEventListener("orientationchange",k,!1)):window.attachEvent("onresize",k),s||a.run({}),"object"==typeof window.Turbolinks&&document.addEventListener("page:change",function(){a.run({})})}),"function"==typeof define&&define.amd&&define([],function(){return a}),function(){function a(a){this.message=a}var b="undefined"!=typeof exports?exports:this,c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";a.prototype=Error(),a.prototype.name="InvalidCharacterError",b.btoa||(b.btoa=function(b){for(var d,e,f=0,g=c,h="";b.charAt(0|f)||(g="=",f%1);h+=g.charAt(63&d>>8-8*(f%1))){if(e=b.charCodeAt(f+=.75),e>255)throw new a("'btoa' failed");d=d<<8|e}return h}),b.atob||(b.atob=function(b){if(b=b.replace(/=+$/,""),1==b.length%4)throw new a("'atob' failed");for(var d,e,f=0,g=0,h="";e=b.charAt(g++);~e&&(d=f%4?64*d+e:e,f++%4)?h+=String.fromCharCode(255&d>>(6&-2*f)):0)e=c.indexOf(e);return h})}(),document.getElementsByClassName||(document.getElementsByClassName=function(a){var b,c,d,e=document,f=[];if(e.querySelectorAll)return e.querySelectorAll("."+a);if(e.evaluate)for(c=".//*[contains(concat(' ', @class, ' '), ' "+a+" ')]",b=e.evaluate(c,e,null,0,null);d=b.iterateNext();)f.push(d);else for(b=e.getElementsByTagName("*"),c=new RegExp("(^|\\s)"+a+"(\\s|$)"),d=0;d<b.length;d++)c.test(b[d].className)&&f.push(b[d]);return f}),window.getComputedStyle||(window.getComputedStyle=function(a){return this.el=a,this.getPropertyValue=function(b){var c=/(\-([a-z]){1})/g;return"float"==b&&(b="styleFloat"),c.test(b)&&(b=b.replace(c,function(){return arguments[2].toUpperCase()})),a.currentStyle[b]?a.currentStyle[b]:null},this}),Object.prototype.hasOwnProperty||(Object.prototype.hasOwnProperty=function(a){var b=this.__proto__||this.constructor.prototype;return a in this&&(!(a in b)||b[a]!==this[a])})}(Holder,window);
/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-shiv-mq-cssclasses-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function D(a){j.cssText=a}function E(a,b){return D(n.join(a+";")+(b||""))}function F(a,b){return typeof a===b}function G(a,b){return!!~(""+a).indexOf(b)}function H(a,b){for(var d in a){var e=a[d];if(!G(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function I(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:F(f,"function")?f.bind(d||b):f}return!1}function J(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+p.join(d+" ")+d).split(" ");return F(b,"string")||F(b,"undefined")?H(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),I(e,b,c))}function K(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)u[c[d]]=c[d]in k;return u.list&&(u.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),u}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),t[a[d]]=!!e;return t}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={svg:"http://www.w3.org/2000/svg"},s={},t={},u={},v=[],w=v.slice,x,y=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},z=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b).matches;var d;return y("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},A=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=F(e[d],"function"),F(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),B={}.hasOwnProperty,C;!F(B,"undefined")&&!F(B.call,"undefined")?C=function(a,b){return B.call(a,b)}:C=function(a,b){return b in a&&F(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=w.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(w.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(w.call(arguments)))};return e}),s.flexbox=function(){return J("flexWrap")},s.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},s.canvastext=function(){return!!e.canvas&&!!F(b.createElement("canvas").getContext("2d").fillText,"function")},s.webgl=function(){return!!a.WebGLRenderingContext},s.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:y(["@media (",n.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},s.geolocation=function(){return"geolocation"in navigator},s.postmessage=function(){return!!a.postMessage},s.websqldatabase=function(){return!!a.openDatabase},s.indexedDB=function(){return!!J("indexedDB",a)},s.hashchange=function(){return A("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},s.history=function(){return!!a.history&&!!history.pushState},s.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},s.websockets=function(){return"WebSocket"in a||"MozWebSocket"in a},s.rgba=function(){return D("background-color:rgba(150,255,150,.5)"),G(j.backgroundColor,"rgba")},s.hsla=function(){return D("background-color:hsla(120,40%,100%,.5)"),G(j.backgroundColor,"rgba")||G(j.backgroundColor,"hsla")},s.multiplebgs=function(){return D("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(j.background)},s.backgroundsize=function(){return J("backgroundSize")},s.borderimage=function(){return J("borderImage")},s.borderradius=function(){return J("borderRadius")},s.boxshadow=function(){return J("boxShadow")},s.textshadow=function(){return b.createElement("div").style.textShadow===""},s.opacity=function(){return E("opacity:.55"),/^0.55$/.test(j.opacity)},s.cssanimations=function(){return J("animationName")},s.csscolumns=function(){return J("columnCount")},s.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return D((a+"-webkit- ".split(" ").join(b+a)+n.join(c+a)).slice(0,-a.length)),G(j.backgroundImage,"gradient")},s.cssreflections=function(){return J("boxReflect")},s.csstransforms=function(){return!!J("transform")},s.csstransforms3d=function(){var a=!!J("perspective");return a&&"webkitPerspective"in g.style&&y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},s.csstransitions=function(){return J("transition")},s.fontface=function(){var a;return y('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&g.indexOf(d.split(" ")[0])===0}),a},s.generatedcontent=function(){var a;return y(["#",h,"{font:0/0 a}#",h,':after{content:"',l,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a},s.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c},s.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,"")}catch(d){}return c},s.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(a){return!1}},s.sessionstorage=function(){try{return sessionStorage.setItem(h,h),sessionStorage.removeItem(h),!0}catch(a){return!1}},s.webworkers=function(){return!!a.Worker},s.applicationcache=function(){return!!a.applicationCache},s.svg=function(){return!!b.createElementNS&&!!b.createElementNS(r.svg,"svg").createSVGRect},s.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==r.svg},s.smil=function(){return!!b.createElementNS&&/SVGAnimate/.test(m.call(b.createElementNS(r.svg,"animate")))},s.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(m.call(b.createElementNS(r.svg,"clipPath")))};for(var L in s)C(s,L)&&(x=L.toLowerCase(),e[x]=s[L](),v.push((e[x]?"":"no-")+x));return e.input||K(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)C(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},D(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.mq=z,e.hasEvent=A,e.testProp=function(a){return H([a])},e.testAllProps=J,e.testStyles=y,e.prefixed=function(a,b,c){return b?J(a,b,c):J(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+v.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
