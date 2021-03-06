/*! dwv 0.23.2 19-03-2018 */

! function(e, t) { "function" == typeof define && define.amd ? define(["i18next", "i18next-xhr-backend", "i18next-browser-languagedetector", "jszip", "konva"], t) : "object" == typeof module && module.exports ? module.exports = t(require("i18next"), require("i18next-xhr-backend"), require("i18next-browser-languagedetector"), require("jszip"), null, null) : e.dwv = t(e.i18next, e.i18nextXHRBackend, e.i18nextBrowserLanguageDetector, e.JSZip, e.Konva, e.MagicWand) }(this, function(a, s, l, t, T, f) {
    var W = void 0 !== W ? W : "undefined" != typeof self ? self : "undefined" != typeof global ? global : {};
    (H = H || {}).App = function() {
        var v, o = this,
            a = null,
            s = null,
            l = null,
            u = 0,
            c = 0,
            d = 0,
            T = null,
            r = 1,
            L = !1,
            S = 1,
            i = { x: 0, y: 0 },
            x = { x: 0, y: 0 },
            g = null,
            m = null,
            h = null,
            I = null,
            P = null,
            p = null,
            f = null,
            C = new H.html.Style,
            F = null,
            A = null,
            y = null,
            E = null,
            D = {},
            w = "./";

        function O(e, t) { R([e], new H.io.UrlsLoader, { requestHeaders: t }) }

        function b(e, t, n) {
            y = t;
            var i = W.onkeydown;
            W.onkeydown = function(e) { e.ctrlKey && 88 === e.keyCode && (console.log("crtl-x pressed!"), o.abortLoad()) }, o.reset();
            var r = "";
            r = void 0 !== e[0].name ? e[0].name : e[0], d = 1 === e.length && "zip" !== r.split(".").pop().toLowerCase(), t.setDefaultCharacterSet(v), t.onload = function(e) {
                a && g.append(e.view),
                    function(e) {
                        if (g) return;
                        g = e.view, m = new H.ViewController(g), I && I.update(e.info);
                        s = g.getImage();
                        var t = (a = s).getGeometry().getSize();
                        u = t.getNumberOfColumns(), c = t.getNumberOfRows(),
                            function(e, t) {
                                var n = o.getElement("imageLayer");
                                (p = new H.html.Layer(n)).initialise(e, t), p.fillContext(), p.setStyleDisplay(!0);
                                var i = o.getElement("drawDiv");
                                i && (f = new H.DrawController(i)).create(e, t), L ? o.fitToSize(H.gui.getWindowSize()) : o.fitToSize({ width: o.getElement("layerContainer").offsetWidth, height: o.getElement("layerContainer").offsetHeight }), o.resetLayout()
                            }(u, c), l = p.getContext().createImageData(u, c), g.addEventListener("wl-width-change", o.onWLChange), g.addEventListener("wl-center-change", o.onWLChange), g.addEventListener("colour-change", o.onColourChange), g.addEventListener("slice-change", o.onSliceChange), g.addEventListener("frame-change", o.onFrameChange), g.addEventListener("wl-width-change", q), g.addEventListener("wl-center-change", q), g.addEventListener("colour-change", q), g.addEventListener("position-change", q), g.addEventListener("slice-change", q), g.addEventListener("frame-change", q);
                        F && F.initAndDisplay(p);
                        var n = o.getElement("dropBox");
                        if (n) {
                            n.removeEventListener("dragover", Q), n.removeEventListener("dragleave", B), n.removeEventListener("drop", V), H.html.removeNode(n);
                            var i = o.getElement("layerContainer");
                            i.addEventListener("dragover", Q), i.addEventListener("dragleave", B), i.addEventListener("drop", V)
                        }
                        o.getElement("infoLayer") && ((h = new H.InfoController(T)).create(o), h.toggleListeners(o, g));
                        o.initWLDisplay(), U()
                    }(e)
            }, t.onerror = function(e) { G(e) }, t.onabort = function(e) {
                ! function(e) {
                    e.message ? console.warn(e.message) : console.warn("Abort called.");
                    H.gui.displayProgress(100)
                }(e)
            }, t.onloadend = function() { W.onkeydown = i, f && f.activateDrawLayer(m), q({ type: "load-progress", lengthComputable: !0, loaded: 100, total: 100 }), q({ type: "load-end" }), y = null }, t.onprogress = k, q({ type: "load-start" }), t.load(e, n)
        }

        function R(e, t, n) {
            t.onload = function(e) {
                var t = new H.State;
                t.apply(o, t.fromJSON(e))
            }, t.onerror = function(e) { G(e) }, t.load(e, n)
        }

        function q(e) {
            if (void 0 !== D[e.type])
                for (var t = 0; t < D[e.type].length; ++t) D[e.type][t](e)
        }

        function U() { g.generateImageData(l), p.setImageData(l), p.draw() }

        function M() { p && (p.zoom(S, S, i.x, i.y), p.draw()), f && f.zoomStage(S, i), q({ type: "zoom-change", scale: S, cx: i.x, cy: i.y }) }

        function N() {
            if (p) {
                if (p.translate(x.x, x.y), p.draw(), f) {
                    var e = -p.getOrigin().x / S - x.x,
                        t = -p.getOrigin().y / S - x.y;
                    f.translateStage(e, t)
                }
                q({ type: "offset-change", scale: S, cx: p.getTrans().x, cy: p.getTrans().y })
            }
        }

        function Q(e) {
            e.stopPropagation(), e.preventDefault();
            var t = o.getElement("dropBox");
            t && (t.className = "dropBox hover")
        }

        function B(e) {
            e.stopPropagation(), e.preventDefault();
            var t = o.getElement("dropBox hover");
            t && (t.className = "dropBox")
        }

        function V(e) { e.stopPropagation(), e.preventDefault(), o.loadFiles(e.dataTransfer.files) }

        function G(e) { e.name && e.message ? alert(e.name + ": " + e.message) : alert("Error: " + e + "."), e.stack && console.error(e.stack), H.gui.displayProgress(100) }

        function k(e) {
            if (q(e), e.lengthComputable) {
                var t = Math.ceil(e.loaded / e.total * 100);
                H.gui.displayProgress(t)
            }
        }
        this.getImage = function() { return a }, this.setImage = function(e) { a = e, g.setImage(e) }, this.restoreOriginalImage = function() { a = s, g.setImage(s) }, this.getImageData = function() { return l }, this.isMonoSliceData = function() { return d }, this.getScale = function() { return S / r }, this.getWindowScale = function() { return r }, this.getScaleCenter = function() { return i }, this.getTranslation = function() { return x }, this.getViewController = function() { return m }, this.getDrawController = function() { return f }, this.getImageLayer = function() { return p }, this.getDrawStage = function() { return f.getDrawStage() }, this.getStyle = function() { return C }, this.getHelpResourcesPath = function() { return w }, this.addToUndoStack = function(e) { null !== E && E.add(e) }, this.init = function(e) {
            if (T = e.containerDivId, e.tools && 0 !== e.tools.length) {
                for (var t = {}, n = 0; n < e.tools.length; ++n) {
                    var i = e.tools[n];
                    if ("Draw" === i) {
                        if (0 !== e.shapes) {
                            for (var r = {}, o = 0; o < e.shapes.length; ++o) {
                                var a = e.shapes[o],
                                    s = a + "Factory";
                                void 0 !== H.tool[s] ? r[a] = H.tool[s] : console.warn("Could not initialise unknown shape: " + a)
                            }
                            t.Draw = new H.tool.Draw(this, r), t.Draw.addEventListener("draw-create", q), t.Draw.addEventListener("draw-change", q), t.Draw.addEventListener("draw-move", q), t.Draw.addEventListener("draw-delete", q)
                        }
                    } else if ("Filter" === i) {
                        if (0 !== e.filters.length) {
                            for (var l = {}, u = 0; u < e.filters.length; ++u) {
                                var c = e.filters[u];
                                void 0 !== H.tool.filter[c] ? l[c] = new H.tool.filter[c](this) : console.warn("Could not initialise unknown filter: " + c)
                            }
                            t.Filter = new H.tool.Filter(l, this), t.Filter.addEventListener("filter-run", q), t.Filter.addEventListener("filter-undo", q)
                        }
                    } else {
                        var d = i;
                        void 0 !== H.tool[d] ? (t[d] = new H.tool[d](this), void 0 !== t[d].addEventListener && t[d].addEventListener(q)) : console.warn("Could not initialise unknown tool: " + i)
                    }
                }(F = new H.ToolboxController).create(t, this)
            }
            if (e.gui) {
                if (-1 !== e.gui.indexOf("tool") && F && F.setup(), -1 !== e.gui.indexOf("load")) {
                    for (var S = {}, x = 0; x < e.loaders.length; ++x) {
                        var g = e.loaders[x],
                            m = g + "Load";
                        void 0 !== H.gui[m] ? S[g] = new H.gui[m](this) : console.warn("Could not initialise unknown loader: " + g)
                    }(A = new H.gui.Loadbox(this, S)).setup();
                    for (var h = Object.keys(S), p = 0; p < h.length; ++p) S[h[p]].setup();
                    A.displayLoader(h[0])
                }
                if (-1 !== e.gui.indexOf("undo") && (E = new H.tool.UndoStack(this)).setup(), -1 !== e.gui.indexOf("tags") && (I = new H.gui.DicomTags(this)), -1 !== e.gui.indexOf("drawList") && (P = new H.gui.DrawList(this), this.addEventListener("draw-create", P.update), this.addEventListener("draw-change", P.update), this.addEventListener("draw-delete", P.update)), -1 !== e.gui.indexOf("version") && H.gui.appendVersionHtml(H.getVersion()), -1 !== e.gui.indexOf("help")) { var f = !0; "undefined" !== e.isMobile && (f = e.isMobile), void 0 !== e.helpResourcesPath && (w = e.helpResourcesPath), H.gui.appendHelpHtml(F.getToolList(), f, this) }
            }
            var C = this.getElement("dropBox");
            if (C) {
                C.addEventListener("dragover", Q), C.addEventListener("dragleave", B), C.addEventListener("drop", V);
                var y = 2 * H.gui.getWindowSize().height / 3;
                C.setAttribute("style", "width:" + y + "px;height:" + y + "px")
            }
            if (void 0 === e.skipLoadUrl) { var D = H.utils.getUriQuery(W.location.href); if (D && void 0 !== D.input && (H.utils.decodeQuery(D, this.onInputURLs), void 0 !== D.state)) { this.addEventListener("load-end", function() { O(D.state) }) } } else console.log("Not loading url from address since skipLoadUrl is defined.");
            e.fitToWindow && (L = !0, W.onresize = this.onResize), void 0 !== e.defaultCharacterSet && (v = e.defaultCharacterSet)
        }, this.getElement = function(e) { return H.gui.getElement(T, e) }, this.reset = function() { F && F.reset(), f && f.reset(), g = a = null, d = !1, E && (E = new H.tool.UndoStack(this)).initialise() }, this.resetLayout = function() {
            var e = S,
                t = i,
                n = x;
            S = r, i = { x: 0, y: 0 }, x = { x: 0, y: 0 }, p && (p.resetLayout(r), p.draw()), f && f.resetStage(r), e != S && q({ type: "zoom-change", scale: S, cx: i.x, cy: i.y }), t.x === i.x && t.y === i.y && n.x === x.x && n.y === x.y || q({ type: "offset-change", scale: S, cx: i.x, cy: i.y })
        }, this.addEventListener = function(e, t) { void 0 === D[e] && (D[e] = []), D[e].push(t) }, this.removeEventListener = function(e, t) {
            if (void 0 !== D[e])
                for (var n = 0; n < D[e].length; ++n) D[e][n] === t && D[e].splice(n, 1)
        }, this.loadFiles = function(e) { var t, n, i, r; "json" === e[0].name.split(".").pop().toLowerCase() ? (i = e[0], r = new H.io.FilesLoader, R([i], r)) : (t = e, n = new H.io.FilesLoader, b(t, n)) }, this.loadURLs = function(e, t) { var n, i, r; "json" === e[0].split(".").pop().toLowerCase() ? O(e[0], t) : (n = e, i = t, r = new H.io.UrlsLoader, b(n, r, { requestHeaders: i })) }, this.abortLoad = function() { y && (y.abort(), y = null) }, this.loadImageObject = function(e) { b(e, new H.io.MemoryLoader, {}) }, this.fitToSize = function(e) {
            var t = parseInt(r * u, 10);
            r = Math.min(e.width / u, e.height / c);
            var n = parseInt(r * u, 10),
                i = parseInt(r * c, 10);
            S *= n / t, C.setScale(r), this.getElement("layerContainer").setAttribute("style", "width:" + n + "px;height:" + i + "px"), p && (p.setWidth(n), p.setHeight(i), p.zoom(S, S, 0, 0), p.draw()), f && f.resizeStage(n, i, S)
        }, this.toggleInfoLayerDisplay = function() {
            var e = o.getElement("infoLayer");
            H.html.toggleDisplay(e), h.toggleListeners(o, g)
        }, this.initWLDisplay = function() { m.setWindowLevelPresetById(0), m.setCurrentPosition2D(0, 0), m.setCurrentFrame(0) }, this.addToolCanvasListeners = function(e) { F.addCanvasListeners(e) }, this.removeToolCanvasListeners = function(e) { F.removeCanvasListeners(e) }, this.render = function() { U() }, this.zoom = function(e, t, n) {
            (S = e * r) <= .1 && (S = .1), i = { x: t, y: n }, M()
        }, this.stepZoom = function(e, t, n) {
            (S += e) <= .1 && (S = .1), i = { x: t, y: n }, M()
        }, this.translate = function(e, t) { x = { x: e, y: t }, N() }, this.stepTranslate = function(e, t) {
            var n = x.x + e / S,
                i = x.y + t / S;
            x = { x: n, y: i }, N()
        }, this.getDrawDisplayDetails = function() { return f.getDrawDisplayDetails() }, this.getDrawStoreDetails = function() { return f.getDrawStoreDetails() }, this.setDrawings = function(e, t) { f.setDrawings(e, t, q, this.addToUndoStack), f.activateDrawLayer(m) }, this.updateDraw = function(e) { f.updateDraw(e) }, this.deleteDraws = function() { f.deleteDraws(q, this.addToUndoStack) }, this.isGroupVisible = function(e) { return f.isGroupVisible(e) }, this.toogleGroupVisibility = function(e) { f.toogleGroupVisibility(e) }, this.onWLChange = function(e) { void 0 !== e.skipGenerate && !1 !== e.skipGenerate || U() }, this.onColourChange = function() { U() }, this.onFrameChange = function() { U(), f && f.activateDrawLayer(m) }, this.onSliceChange = function() { U(), f && f.activateDrawLayer(m) }, this.onKeydown = function(e) { e.ctrlKey && (37 === e.keyCode ? (e.preventDefault(), o.getViewController().decrementFrameNb()) : 38 === e.keyCode ? (e.preventDefault(), o.getViewController().incrementSliceNb()) : 39 === e.keyCode ? (e.preventDefault(), o.getViewController().incrementFrameNb()) : 40 === e.keyCode ? (e.preventDefault(), o.getViewController().decrementSliceNb()) : 89 === e.keyCode ? E.redo() : 90 === e.keyCode && E.undo()) }, this.onResize = function() { o.fitToSize(H.gui.getWindowSize()) }, this.onZoomReset = function() { o.resetLayout() }, this.onChangeLoader = function(e) { A.displayLoader(e.currentTarget.value) }, this.resetLoadbox = function() { A.reset() }, this.onChangeURL = function(e) { o.loadURLs([e.target.value]) }, this.onInputURLs = function(e, t) { o.loadURLs(e, t) }, this.onChangeFiles = function(e) {
            var t = e.target.files;
            0 !== t.length && o.loadFiles(t)
        }, this.onStateSave = function() {
            var e = new H.State;
            o.getElement("download-state").href = "data:application/json," + e.toJSON(o)
        }, this.onChangeColourMap = function(e) { m.setColourMapFromName(e.currentTarget.value) }, this.onChangeWindowLevelPreset = function(e) { m.setWindowLevelPreset(e.currentTarget.value) }, this.onChangeTool = function(e) { F.setSelectedTool(e.currentTarget.value) }, this.onChangeShape = function(e) { F.setSelectedShape(e.currentTarget.value) }, this.onChangeFilter = function(e) { F.setSelectedFilter(e.currentTarget.value) }, this.onRunFilter = function() { F.runSelectedFilter() }, this.onChangeLineColour = function(e) { F.setLineColour(e.currentTarget.value) }, this.onChangeMinMax = function(e) { F.setRange(e) }, this.onUndo = function() { E.undo() }, this.onRedo = function() { E.redo() }, this.onToggleInfoLayer = function() { o.toggleInfoLayerDisplay() }, this.onDisplayReset = function() {
            o.resetLayout(), o.initWLDisplay();
            var e = o.getElement("presetSelect");
            e && (e.selectedIndex = 0, H.gui.refreshElement(e))
        }
    }, (H = H || {}).draw = H.draw || {};
    T = T || {};
    H.draw.getDrawPositionGroupId = function(e, t) { return "slice-" + e + "_frame-" + t }, H.draw.getPositionFromGroupId = function(e) { var t = e.indexOf("_"); return -1 === t && console.warn("Badly formed PositionGroupId: " + e), { sliceNumber: e.substring(6, t), frameNumber: e.substring(t + 7) } }, H.draw.isNodeNameShape = function(e) { return "shape" === e.name() }, H.draw.isNodeNameShapeExtra = function(e) { return e.name().startsWith("shape-") }, H.draw.isNodeNameLabel = function(e) { return "label" === e.name() }, H.draw.isPositionNode = function(e) { return "position-group" === e.name() }, H.draw.isNodeWithId = function(t) { return function(e) { return e.id() === t } }, H.draw.canNodeChangeColour = function(e) { return "anchor" !== e.name() && "label" !== e.name() }, H.draw.getHierarchyLog = function(e, t) { void 0 === t && (t = ""); for (var n = e.getChildren(), i = t + "|__ " + e.name() + ": " + e.id() + "\n", r = 0; r < n.length; ++r) i += H.draw.getHierarchyLog(n[r], t + "    "); return i }, H.DrawController = function(i) {
        var p, a = null,
            s = null;
        this.getCurrentPosGroup = function() {
            var e = p.getChildren(function(e) { return e.id() === s }),
                t = null;
            return 1 === e.length ? t = e[0] : 0 === e.length ? ((t = new T.Group).name("position-group"), t.id(s), t.visible(!0), p.add(t)) : console.warn("Unexpected number of draw position groups."), t
        }, this.create = function(e, t) {
            (a = new T.Stage({ container: i, width: e, height: t, listening: !1 })).getContent().setAttribute("style", ""), p = new T.Layer({ listening: !1, hitGraphEnabled: !1, visible: !0 }), a.add(p)
        }, this.getDrawLayer = function() { return p }, this.reset = function() { p = null }, this.getDrawStage = function() { return a }, this.activateDrawLayer = function(e) {
            var t = e.getCurrentPosition().k,
                n = e.getCurrentFrame();
            s = H.draw.getDrawPositionGroupId(t, n);
            for (var i, r = p.getChildren(H.draw.isPositionNode), o = 0, a = r.length; o < a; ++o) i = !1, r[o].id() === s && (i = !0), r[o].visible(i);
            p.draw()
        }, this.resetStage = function(e) { a.offset({ x: 0, y: 0 }), a.scale({ x: e, y: e }), a.draw() }, this.resizeStage = function(e, t, n) { i.setAttribute("style", "width:" + e + "px;height:" + t + "px"), a.setWidth(e), a.setHeight(t), a.scale({ x: n, y: n }), a.draw() }, this.zoomStage = function(e, t) {
            var n = { x: e, y: e },
                i = a.scale(),
                r = a.offset(),
                o = { x: t.x / i.x + r.x - t.x / n.x, y: t.y / i.y + r.y - t.y / n.y };
            a.offset(o), a.scale(n), a.draw()
        }, this.translateStage = function(e, t) { a.offset({ x: e, y: t }), a.draw() }, this.getDrawDisplayDetails = function() {
            for (var e = [], t = p.getChildren(), n = 0, i = t.length; n < i; ++n)
                for (var r = H.draw.getPositionFromGroupId(t[n].id()), o = t[n].getChildren(), a = 0, s = o.length; a < s; ++a) {
                    var l = o[a].getChildren(H.draw.isNodeNameShape)[0],
                        u = o[a].getChildren(H.draw.isNodeNameLabel)[0].getChildren()[0],
                        c = l.className;
                    if ("Line" === c) {
                        var d = o[a].getChildren(H.draw.isNodeNameShapeExtra);
                        l.closed() ? c = "Roi" : 0 !== d.length && (c = -1 !== d[0].name().indexOf("triangle") ? "Arrow" : "Ruler")
                    }
                    "Rect" === c && (c = "Rectangle"), e.push({ id: o[a].id(), slice: r.sliceNumber, frame: r.frameNumber, type: c, color: l.stroke(), label: u.textExpr, description: u.longText })
                }
            return e
        }, this.getDrawStoreDetails = function() {
            for (var e, t, n = {}, i = p.getChildren(H.draw.isPositionNode), r = 0, o = i.length; r < o; ++r)
                for (var a = 0, s = (e = i[r].getChildren()).length; a < s; ++a) {
                    for (var l = (t = e[a]).find(".anchor"), u = 0; u < l.length; ++u) l[u].remove();
                    var c = t.find(".text");
                    1 !== c.length && console.warn("There should not be more than one text per shape."), n[t.id()] = { textExpr: encodeURIComponent(c[0].textExpr), longText: encodeURIComponent(c[0].longText), quant: c[0].quant }
                }
            return n
        }, this.setDrawings = function(e, t, n, i) {
            for (var r = T.Node.create(e).getChildren(H.draw.isPositionNode), o = 0, a = r.length; o < a; ++o) {
                var s = r[o],
                    l = p.getChildren(H.draw.isNodeWithId(s.id()))[0];
                void 0 === l && (l = new T.Group({ id: s.id(), name: "position-group", visible: !1 }), p.add(l));
                for (var u = s.getChildren(), c = 0, d = u.length; c < d; ++c) {
                    var S = u[c];
                    l.add(S);
                    var x = S.getChildren(H.draw.isNodeNameShape)[0],
                        g = new H.tool.DrawGroupCommand(S, x.className, p);
                    if (g.onExecute = n, g.onUndo = n, t) {
                        var m = t[S.id()],
                            h = S.getChildren(H.draw.isNodeNameLabel)[0].getText();
                        h.textExpr = m.textExpr, h.longText = m.longText, h.quant = m.quant, h.setText(H.utils.replaceFlags(h.textExpr, h.quant))
                    }
                    g.execute(), i(g)
                }
            }
        }, this.updateDraw = function(e) {
            var t = p.findOne("#" + e.id);
            if (void 0 !== t) {
                for (var n = t.getChildren(H.draw.isNodeNameShape), i = 0; i < n.length; ++i) n[i].stroke(e.color);
                for (var r = t.getChildren(H.draw.isNodeNameShapeExtra), o = 0; o < r.length; ++o) void 0 !== r[o].stroke() ? r[o].stroke(e.color) : void 0 !== r[o].fill() && r[o].fill(e.color);
                var a = t.getChildren(H.draw.isNodeNameLabel)[0].getChildren()[0];
                a.fill(e.color), a.textExpr = e.label, a.longText = e.description, a.setText(H.utils.replaceFlags(a.textExpr, a.quant)), p.draw()
            } else console.warn("[updateDraw] Cannot find group with id: " + e.id)
        }, this.isGroupVisible = function(e) { var t = p.findOne("#" + e.id); return void 0 === t ? (console.warn("[isGroupVisible] Cannot find node with id: " + e.id), !1) : t.isVisible() }, this.toogleGroupVisibility = function(e) {
            var t = p.findOne("#" + e.id);
            if (void 0 === t) return console.warn("[toogleGroupVisibility] Cannot find node with id: " + e.id), !1;
            t.visible(!t.isVisible()), p.draw()
        }, this.deleteDraws = function(e, t) {
            for (var n, i = p.getChildren(); i.length;) {
                var r = i[0].getChildren(H.draw.isNodeNameShape)[0];
                (n = new H.tool.DeleteGroupCommand(i[0], H.tool.GetShapeDisplayName(r), p)).onExecute = e, n.onUndo = e, n.execute(), t(n)
            }
        }
    }, (H = H || {}).InfoController = function(t) {
        var l = null,
            u = null,
            c = [],
            i = !1;

        function d(e) { return H.gui.getElement(t, e) } this.create = function(e) {
            var t = d("infocm");
            t && (u = new H.gui.info.MiniColourMap(t, e)).create();
            for (var n = ["tl", "tc", "tr", "cl", "cr", "bl", "bc", "br"], i = 0, r = 0; r < n.length; r++) {
                var o = n[r],
                    a = d("info" + o);
                a && (c[i] = new H.gui.info.Overlay(a, o, e), c[i].create(), i++)
            }
            var s = d("plot");
            s && (l = new H.gui.info.Plot(s, e)).create()
        }, this.toggleListeners = function(e, t) {
            i ? function(e, t) {
                l && (t.removeEventListener("wl-width-change", l.update), t.removeEventListener("wl-center-change", l.update));
                u && (t.removeEventListener("wl-width-change", u.update), t.removeEventListener("wl-center-change", u.update), t.removeEventListener("colour-change", u.update));
                if (0 < c.length)
                    for (var n = 0; n < c.length; n++) e.removeEventListener("zoom-change", c[n].update), t.removeEventListener("wl-width-change", c[n].update), t.removeEventListener("wl-center-change", c[n].update), t.removeEventListener("position-change", c[n].update), t.removeEventListener("frame-change", c[n].update);
                i = !1
            }(e, t) : function(e, t) {
                l && (t.addEventListener("wl-width-change", l.update), t.addEventListener("wl-center-change", l.update));
                u && (t.addEventListener("wl-width-change", u.update), t.addEventListener("wl-center-change", u.update), t.addEventListener("colour-change", u.update));
                if (0 < c.length)
                    for (var n = 0; n < c.length; n++) e.addEventListener("zoom-change", c[n].update), t.addEventListener("wl-width-change", c[n].update), t.addEventListener("wl-center-change", c[n].update), t.addEventListener("position-change", c[n].update), t.addEventListener("frame-change", c[n].update);
                i = !0
            }(e, t)
        }
    };
    T = T || {};
    (H = H || {}).State = function() {
        this.toJSON = function(e) { return JSON.stringify({ version: "0.3", "window-center": e.getViewController().getWindowLevel().center, "window-width": e.getViewController().getWindowLevel().width, position: e.getViewController().getCurrentPosition(), scale: e.getScale(), scaleCenter: e.getScaleCenter(), translation: e.getTranslation(), drawings: e.getDrawController().getDrawLayer().toObject(), drawingsDetails: e.getDrawStoreDetails() }) }, this.fromJSON = function(e) {
            var t, n, i, r = JSON.parse(e),
                o = null;
            if ("0.1" === r.version) n = r, i = H.v01Tov02DrawingsAndDetails(n.drawings), n.drawings = H.v02Tov03Drawings(i.drawings).toObject(), n.drawingsDetails = i.drawingsDetails, o = n;
            else if ("0.2" === r.version)(t = r).drawings = H.v02Tov03Drawings(t.drawings).toObject(), t.drawingsDetails = H.v02Tov03DrawingsDetails(t.drawingsDetails), o = t;
            else {
                if ("0.3" !== r.version) throw new Error("Unknown state file format version: '" + r.version + "'.");
                o = r
            }
            return o
        }, this.apply = function(e, t) { e.getViewController().setWindowLevel(t["window-center"], t["window-width"]), e.getViewController().setCurrentPosition(t.position), e.zoom(t.scale, t.scaleCenter.x, t.scaleCenter.y), e.translate(t.translation.x, t.translation.y), e.setDrawings(t.drawings, t.drawingsDetails) }
    }, H.v02Tov03Drawings = function(e) {
        for (var t, n, i, r = new T.Layer({ listening: !1, hitGraphEnabled: !1, visible: !0 }), o = "string" == typeof e ? JSON.parse(e) : e, a = 0, s = o.length; a < s; ++a)
            for (var l = 0, u = o[a].length; l < u; ++l)
                if (0 !== (n = o[a][l]).length) {
                    i = new T.Group({ id: H.draw.getDrawPositionGroupId(a, l), name: "position-group", visible: !1 });
                    for (var c = 0, d = n.length; c < d; ++c)(t = T.Node.create(n[c])).draggable(!0), t.getChildren().forEach(function(e) { e.draggable(!1) }), i.add(t);
                    r.add(i)
                }
        return r
    }, H.v01Tov02DrawingsAndDetails = function(e) {
        for (var t, n, i = [], r = {}, o = 0, a = e.length; o < a; ++o) {
            i[o] = [];
            for (var s = 0, l = e[o].length; s < l; ++s) {
                for (var u = [], c = 0, d = (t = e[o][s]).length; c < d; ++c) {
                    (n = T.Node.create(t[c])).visible(!0);
                    var S = { x: 0, y: 0 },
                        x = n.getChildren(function(e) { return "shape" === e.name() })[0];
                    if (x.stroke(H.getColourHex(x.stroke())), "line-group" === n.name()) {
                        n.name("ruler-group");
                        var g = new T.Line({ points: [x.points()[0], x.points()[1], x.points()[0], x.points()[1]], name: "shape-tick0" });
                        n.add(g);
                        var m = new T.Line({ points: [x.points()[2], x.points()[3], x.points()[2], x.points()[3]], name: "shape-tick1" });
                        n.add(m)
                    }
                    var h = n.getChildren(function(e) { return "arc" === e.name() });
                    1 === h.length && h[0].name("shape-arc");
                    var p = n.getChildren(function(e) { return "text" === e.name() }),
                        f = new T.Text({ name: "text", text: "" });
                    1 === p.length ? (S.x = p[0].x(), S.y = p[0].y(), p[0].remove(), f = p[0]) : 0 !== x.points().length && (S = { x: x.points()[0], y: x.points()[1] });
                    var C = new T.Label({ x: S.x, y: S.y, name: "label" });
                    C.add(f), C.add(new T.Tag), n.add(C), u.push(JSON.stringify(n.toObject()));
                    var y = f.text(),
                        D = y.length,
                        v = null;
                    "ruler-group" === n.name() ? (v = { length: { value: parseFloat(y.substr(0, D - 2)), unit: y.substr(-2, 2) } }, y = "{length}") : "ellipse-group" === n.name() || "rectangle-group" === n.name() ? (v = { surface: { value: parseFloat(y.substr(0, D - 3)), unit: y.substr(-3, 3) } }, y = "{surface}") : "protractor-group" !== n.name() && "rectangle-group" !== n.name() || (v = { angle: { value: parseFloat(y.substr(0, D - 1)), unit: y.substr(-1, 1) } }, y = "{angle}"), r[n.id()] = { textExpr: y, longText: "", quant: v }
                }
                i[o].push(u)
            }
        }
        return { drawings: i, drawingsDetails: r }
    }, H.v02Tov03DrawingsDetails = function(e) {
        for (var t = {}, n = "string" == typeof e ? JSON.parse(e) : e, i = 0, r = n.length; i < r; ++i)
            for (var o = 0, a = n[i].length; o < a; ++o)
                for (var s = 0, l = n[i][o].length; s < l; ++s) {
                    var u = n[i][o][s];
                    t[u.id] = { textExpr: u.textExpr, longText: u.longText, quant: u.quant }
                }
        return t
    }, H.getColourHex = function(e) {
        var t = { Yellow: "#ffff00", Red: "#ff0000", White: "#ffffff", Green: "#008000", Blue: "#0000ff", Lime: "#00ff00", Fuchsia: "#ff00ff", Black: "#000000" },
            n = "#ffff00";
        return void 0 !== t[e] && (n = t[e]), n
    }, (H = H || {}).ToolboxController = function() {
        var o = null,
            a = null;

        function t(e) {
            var t = !1,
                n = null,
                i = null;
            if ("touchstart" === e.type || "touchmove" === e.type ? (n = H.html.getEventOffset(e), e._xs = n[0].x, e._ys = n[0].y, i = a(n[0]), e._x = parseInt(i.x, 10), e._y = parseInt(i.y, 10), 2 === n.length && (e._x1s = n[1].x, e._y1s = n[1].y, i = a(n[1]), e._x1 = parseInt(i.x, 10), e._y1 = parseInt(i.y, 10)), t = !0) : "mousemove" === e.type || "mousedown" === e.type || "mouseup" === e.type || "mouseout" === e.type || "mousewheel" === e.type || "dblclick" === e.type || "DOMMouseScroll" === e.type ? (n = H.html.getEventOffset(e), e._xs = n[0].x, e._ys = n[0].y, i = a(n[0]), e._x = parseInt(i.x, 10), e._y = parseInt(i.y, 10), t = !0) : "keydown" !== e.type && "touchend" !== e.type || (t = !0), t) {
                "keydown" !== e.type && e.preventDefault();
                var r = o.getSelectedTool()[e.type];
                r && r(e)
            }
        }
        this.create = function(e, t) { o = new H.tool.Toolbox(e, t) }, this.setup = function() { o.setup() }, this.reset = function() { o.reset() }, this.initAndDisplay = function(e) { o.init(), o.display(!0), a = e.displayToIndex, this.addCanvasListeners(e.getCanvas()), W.addEventListener("keydown", t, !0) }, this.getToolList = function() { return o.getToolList() }, this.getSelectedToolEventHandler = function(e) { return o.getSelectedTool()[e] }, this.setSelectedTool = function(e) { o.setSelectedTool(e) }, this.setSelectedShape = function(e) { o.getSelectedTool().setShapeName(e) }, this.setSelectedFilter = function(e) { o.getSelectedTool().setSelectedFilter(e) }, this.runSelectedFilter = function() { o.getSelectedTool().getSelectedFilter().run() }, this.setLineColour = function(e) { o.getSelectedTool().setLineColour(e) }, this.setRange = function(e) { o && o.getSelectedTool() && o.getSelectedTool().getSelectedFilter() && o.getSelectedTool().getSelectedFilter().run(e) }, this.addCanvasListeners = function(e) { e.setAttribute("style", "pointer-events: auto;"), e.addEventListener("mousedown", t), e.addEventListener("mousemove", t), e.addEventListener("mouseup", t), e.addEventListener("mouseout", t), e.addEventListener("mousewheel", t), e.addEventListener("DOMMouseScroll", t), e.addEventListener("dblclick", t), e.addEventListener("touchstart", t), e.addEventListener("touchmove", t), e.addEventListener("touchend", t) }, this.removeCanvasListeners = function(e) { e.setAttribute("style", "pointer-events: none;"), e.removeEventListener("mousedown", t), e.removeEventListener("mousemove", t), e.removeEventListener("mouseup", t), e.removeEventListener("mouseout", t), e.removeEventListener("mousewheel", t), e.removeEventListener("DOMMouseScroll", t), e.removeEventListener("dblclick", t), e.removeEventListener("touchstart", t), e.removeEventListener("touchmove", t), e.removeEventListener("touchend", t) }
    }, (H = H || {}).ViewController = function(n) {
        var i = this,
            r = null;
        this.getWindowLevelPresetsNames = function() { return n.getWindowPresetsNames() }, this.addWindowLevelPresets = function(e) { return n.addWindowPresets(e) }, this.setWindowLevelPreset = function(e) { n.setWindowLevelPreset(e) }, this.setWindowLevelPresetById = function(e) { n.setWindowLevelPresetById(e) }, this.isPlaying = function() { return null !== r }, this.getCurrentPosition = function() { return n.getCurrentPosition() }, this.setCurrentPosition = function(e) { return n.setCurrentPosition(e) }, this.setCurrentPosition2D = function(e, t) { return n.setCurrentPosition({ i: e, j: t, k: n.getCurrentPosition().k }) }, this.setCurrentSlice = function(e) { return n.setCurrentPosition({ i: n.getCurrentPosition().i, j: n.getCurrentPosition().j, k: e }) }, this.incrementSliceNb = function() { return i.setCurrentSlice(n.getCurrentPosition().k + 1) }, this.decrementSliceNb = function() { return i.setCurrentSlice(n.getCurrentPosition().k - 1) }, this.getCurrentFrame = function() { return n.getCurrentFrame() }, this.setCurrentFrame = function(e) { return n.setCurrentFrame(e) }, this.incrementFrameNb = function() { return n.setCurrentFrame(n.getCurrentFrame() + 1) }, this.decrementFrameNb = function() { return n.setCurrentFrame(n.getCurrentFrame() - 1) }, this.goFirstSlice = function() { return n.setCurrentPosition({ i: n.getCurrentPosition().i, j: n.getCurrentPosition().j, k: 0 }) }, this.play = function() {
            if (null === r) {
                var e = n.getImage().getGeometry().getSize().getNumberOfSlices(),
                    t = n.getImage().getNumberOfFrames();
                r = setInterval(function() { 1 !== e ? i.incrementSliceNb() || i.setCurrentSlice(0) : 1 !== t && (i.incrementFrameNb() || i.setCurrentFrame(0)) }, 300)
            } else this.stop()
        }, this.stop = function() { null !== r && (clearInterval(r), r = null) }, this.getWindowLevel = function() { return { width: n.getCurrentWindowLut().getWindowLevel().getWidth(), center: n.getCurrentWindowLut().getWindowLevel().getCenter() } }, this.setWindowLevel = function(e, t) { n.setWindowLevel(e, t) }, this.getColourMap = function() { return n.getColourMap() }, this.setColourMap = function(e) { n.setColourMap(e) }, this.setColourMapFromName = function(e) {
            if (!H.tool.colourMaps[e]) throw new Error("Unknown colour map: '" + e + "'");
            this.setColourMap(H.tool.colourMaps[e])
        }
    }, (H = H || {}).dicom = H.dicom || {}, H.getVersion = function() { return "0.23.2" }, H.dicom.cleanString = function(e) { var t = e; return e && (t = e.trim())[t.length - 1] === String.fromCharCode("u200B") && (t = t.substring(0, t.length - 1)), t }, H.dicom.isNativeLittleEndian = function() { return 0 < new Int8Array(new Int16Array([1]).buffer)[0] }, H.dicom.getUtfLabel = function(e) { var t = "utf-8"; return "ISO_IR 100" === e ? t = "iso-8859-1" : "ISO_IR 101" === e ? t = "iso-8859-2" : "ISO_IR 109" === e ? t = "iso-8859-3" : "ISO_IR 110" === e ? t = "iso-8859-4" : "ISO_IR 144" === e ? t = "iso-8859-5" : "ISO_IR 127" === e ? t = "iso-8859-6" : "ISO_IR 126" === e ? t = "iso-8859-7" : "ISO_IR 138" === e ? t = "iso-8859-8" : "ISO_IR 148" === e ? t = "iso-8859-9" : "ISO_IR 13" === e ? t = "shift-jis" : "ISO_IR 166" === e ? t = "iso-8859-11" : "ISO 2022 IR 87" === e ? t = "iso-2022-jp" : "ISO 2022 IR 149" === e || "ISO 2022 IR 58" === e || ("ISO_IR 192" === e ? t = "utf-8" : "GB18030" === e ? t = "gb18030" : "GB2312" === e ? t = "gb2312" : "GBK" === e && (t = "chinese")), t }, H.dicom.DataReader = function(o, a) {
        void 0 === a && (a = !0);
        var i = { decode: function(e) { for (var t = "", n = 0, i = e.length; n < i; ++n) t += String.fromCharCode(e[n]); return t } },
            r = i;
        void 0 !== W.TextDecoder && (r = new TextDecoder("iso-8859-1")), this.setUtfLabel = function(e) { void 0 !== W.TextDecoder && (r = new TextDecoder(e)) };
        var e = H.dicom.isNativeLittleEndian(),
            s = a !== e,
            l = new DataView(o);
        this.flipArrayEndianness = function(e) {
            for (var t, n = e.byteLength, i = new Uint8Array(e.buffer, e.byteOffset, n), r = e.BYTES_PER_ELEMENT, o = 0; o < n; o += r)
                for (var a = o + r - 1, s = o; s < a; a--, s++) t = i[s], i[s] = i[a], i[a] = t
        }, this.readUint16 = function(e) { return l.getUint16(e, a) }, this.readUint32 = function(e) { return l.getUint32(e, a) }, this.readInt32 = function(e) { return l.getInt32(e, a) }, this.readUint8Array = function(e, t) { return new Uint8Array(o, e, t) }, this.readInt8Array = function(e, t) { return new Int8Array(o, e, t) }, this.readUint16Array = function(e, t) {
            var n = t / Uint16Array.BYTES_PER_ELEMENT,
                i = null;
            if (e % Uint16Array.BYTES_PER_ELEMENT == 0) i = new Uint16Array(o, e, n), s && this.flipArrayEndianness(i);
            else { i = new Uint16Array(n); for (var r = 0; r < n; ++r) i[r] = l.getInt16(e + Uint16Array.BYTES_PER_ELEMENT * r, a) }
            return i
        }, this.readInt16Array = function(e, t) {
            var n = t / Int16Array.BYTES_PER_ELEMENT,
                i = null;
            if (e % Int16Array.BYTES_PER_ELEMENT == 0) i = new Int16Array(o, e, n), s && this.flipArrayEndianness(i);
            else { i = new Int16Array(n); for (var r = 0; r < n; ++r) i[r] = l.getInt16(e + Int16Array.BYTES_PER_ELEMENT * r, a) }
            return i
        }, this.readUint32Array = function(e, t) {
            var n = t / Uint32Array.BYTES_PER_ELEMENT,
                i = null;
            if (e % Uint32Array.BYTES_PER_ELEMENT == 0) i = new Uint32Array(o, e, n), s && this.flipArrayEndianness(i);
            else { i = new Uint32Array(n); for (var r = 0; r < n; ++r) i[r] = l.getUint32(e + Uint32Array.BYTES_PER_ELEMENT * r, a) }
            return i
        }, this.readInt32Array = function(e, t) {
            var n = t / Int32Array.BYTES_PER_ELEMENT,
                i = null;
            if (e % Int32Array.BYTES_PER_ELEMENT == 0) i = new Int32Array(o, e, n), s && this.flipArrayEndianness(i);
            else { i = new Int32Array(n); for (var r = 0; r < n; ++r) i[r] = l.getInt32(e + Int32Array.BYTES_PER_ELEMENT * r, a) }
            return i
        }, this.readFloat32Array = function(e, t) {
            var n = t / Float32Array.BYTES_PER_ELEMENT,
                i = null;
            if (e % Float32Array.BYTES_PER_ELEMENT == 0) i = new Float32Array(o, e, n), s && this.flipArrayEndianness(i);
            else { i = new Float32Array(n); for (var r = 0; r < n; ++r) i[r] = l.getFloat32(e + Float32Array.BYTES_PER_ELEMENT * r, a) }
            return i
        }, this.readFloat64Array = function(e, t) {
            var n = t / Float64Array.BYTES_PER_ELEMENT,
                i = null;
            if (e % Float64Array.BYTES_PER_ELEMENT == 0) i = new Float64Array(o, e, n), s && this.flipArrayEndianness(i);
            else { i = new Float64Array(n); for (var r = 0; r < n; ++r) i[r] = l.getFloat64(e + Float64Array.BYTES_PER_ELEMENT * r, a) }
            return i
        }, this.readHex = function(e) { var t = this.readUint16(e).toString(16); return "0x0000".substr(0, 6 - t.length) + t.toUpperCase() }, this.readString = function(e, t) { var n = this.readUint8Array(e, t); return i.decode(n) }, this.readSpecialString = function(e, t) { var n = this.readUint8Array(e, t); return r.decode(n) }
    }, H.dicom.getGroupElementFromName = function(e) {
        var t = null,
            n = null,
            i = H.dicom.dictionary,
            r = Object.keys(i),
            o = null;
        e: for (var a = 0, s = r.length; a < s; ++a) {
            t = r[a];
            for (var l = 0, u = (o = Object.keys(i[t])).length; l < u; ++l)
                if (n = o[l], i[t][n][2] === e) break e
        }
        return { group: t, element: n }
    }, H.dicom.Tag = function(e, t) { this.getGroup = function() { return e }, this.getElement = function() { return t } }, H.dicom.Tag.prototype.equals = function(e) { return null !== e && this.getGroup() === e.getGroup() && this.getElement() === e.getElement() }, H.dicom.Tag.prototype.equals2 = function(e) { return null !== e && void 0 !== e.group && void 0 !== e.element && this.equals(new H.dicom.Tag(e.group, e.element)) }, H.dicom.getFileMetaInformationGroupLengthTag = function() { return new H.dicom.Tag("0x0002", "0x0000") }, H.dicom.getItemTag = function() { return new H.dicom.Tag("0xFFFE", "0xE000") }, H.dicom.getItemDelimitationItemTag = function() { return new H.dicom.Tag("0xFFFE", "0xE00D") }, H.dicom.getSequenceDelimitationItemTag = function() { return new H.dicom.Tag("0xFFFE", "0xE0DD") }, H.dicom.getPixelDataTag = function() { return new H.dicom.Tag("0x7FE0", "0x0010") }, H.dicom.getGroupElementKey = function(e, t) { return "x" + e.substr(2, 6) + t.substr(2, 6) }, H.dicom.splitGroupElementKey = function(e) { return { group: e.substr(1, 4), element: e.substr(5, 8) } }, H.dicom.getReverseOrientation = function(e) {
        if (!e) return null;
        for (var t = { L: "R", R: "L", A: "P", P: "A", H: "F", F: "H" }, n = "", i = 0; i < e.length; i++) {
            var r = t[e.substr(i, 1)];
            r && (n += r)
        }
        return n
    }, H.dicom.isImplicitTransferSyntax = function(e) { return "1.2.840.10008.1.2" === e }, H.dicom.isBigEndianTransferSyntax = function(e) { return "1.2.840.10008.1.2.2" === e }, H.dicom.isJpegBaselineTransferSyntax = function(e) { return "1.2.840.10008.1.2.4.50" === e || "1.2.840.10008.1.2.4.51" === e }, H.dicom.isJpegRetiredTransferSyntax = function(e) { return null !== e.match(/1.2.840.10008.1.2.4.5/) && !H.dicom.isJpegBaselineTransferSyntax() && !H.dicom.isJpegLosslessTransferSyntax() || null !== e.match(/1.2.840.10008.1.2.4.6/) }, H.dicom.isJpegLosslessTransferSyntax = function(e) { return "1.2.840.10008.1.2.4.57" === e || "1.2.840.10008.1.2.4.70" === e }, H.dicom.isJpeglsTransferSyntax = function(e) { return null !== e.match(/1.2.840.10008.1.2.4.8/) }, H.dicom.isJpeg2000TransferSyntax = function(e) { return null !== e.match(/1.2.840.10008.1.2.4.9/) }, H.dicom.getSyntaxDecompressionName = function(e) { var t = null; return H.dicom.isJpeg2000TransferSyntax(e) ? t = "jpeg2000" : H.dicom.isJpegBaselineTransferSyntax(e) ? t = "jpeg-baseline" : H.dicom.isJpegLosslessTransferSyntax(e) && (t = "jpeg-lossless"), t }, H.dicom.isReadSupportedTransferSyntax = function(e) { return "1.2.840.10008.1.2" === e || "1.2.840.10008.1.2.1" === e || "1.2.840.10008.1.2.2" === e || H.dicom.isJpegBaselineTransferSyntax(e) || H.dicom.isJpegLosslessTransferSyntax(e) || H.dicom.isJpeg2000TransferSyntax(e) }, H.dicom.getTransferSyntaxName = function(e) { var t = "Unknown"; return "1.2.840.10008.1.2" === e ? t = "Little Endian Implicit" : "1.2.840.10008.1.2.1" === e ? t = "Little Endian Explicit" : "1.2.840.10008.1.2.1.99" === e ? t = "Little Endian Deflated Explicit" : "1.2.840.10008.1.2.2" === e ? t = "Big Endian Explicit" : H.dicom.isJpegBaselineTransferSyntax(e) ? t = "1.2.840.10008.1.2.4.50" === e ? "JPEG Baseline" : "JPEG Extended, Process 2+4" : H.dicom.isJpegLosslessTransferSyntax(e) ? t = "1.2.840.10008.1.2.4.57" === e ? "JPEG Lossless, Nonhierarchical (Processes 14)" : "JPEG Lossless, Non-hierarchical, 1st Order Prediction" : H.dicom.isJpegRetiredTransferSyntax(e) ? t = "Retired JPEG" : H.dicom.isJpeglsTransferSyntax(e) ? t = "JPEG-LS" : H.dicom.isJpeg2000TransferSyntax(e) ? t = "1.2.840.10008.1.2.4.91" === e ? "JPEG 2000 (Lossless or Lossy)" : "JPEG 2000 (Lossless only)" : "1.2.840.10008.1.2.4.100" === e ? t = "MPEG2" : "1.2.840.10008.1.2.5" === e && (t = "RLE"), t }, H.dicom.getTypedArray = function(e, t, n) { var i = null; return 8 === e ? i = 0 === t ? new Uint8Array(n) : new Int8Array(n) : 16 === e ? i = 0 === t ? new Uint16Array(n) : new Int16Array(n) : 32 === e && (i = 0 === t ? new Uint32Array(n) : new Int32Array(n)), i }, H.dicom.is32bitVLVR = function(e) { return "OB" === e || "OW" === e || "OF" === e || "ox" === e || "UT" === e || "SQ" === e || "UN" === e }, H.dicom.isTagWithVR = function(e, t) { return !("0xFFFE" === e && ("0xE000" === t || "0xE00D" === t || "0xE0DD" === t)) }, H.dicom.getDataElementPrefixByteSize = function(e, t) { return t ? 8 : H.dicom.is32bitVLVR(e) ? 12 : 8 }, H.dicom.DicomParser = function() {
        var t;
        this.dicomElements = {}, this.getDefaultCharacterSet = function() { return t }, this.setDefaultCharacterSet = function(e) { t = e }
    }, H.dicom.DicomParser.prototype.getRawDicomElements = function() { return this.dicomElements }, H.dicom.DicomParser.prototype.getDicomElements = function() { return new H.dicom.DicomElementsWrapper(this.dicomElements) }, H.dicom.DicomParser.prototype.readTag = function(e, t) {
        var n = e.readHex(t);
        t += Uint16Array.BYTES_PER_ELEMENT;
        var i = e.readHex(t);
        return t += Uint16Array.BYTES_PER_ELEMENT, { group: n, element: i, name: H.dicom.getGroupElementKey(n, i), endOffset: t }
    }, H.dicom.DicomParser.prototype.readItemDataElement = function(e, t, n) {
        var i = {},
            r = this.readDataElement(e, t, n);
        t = r.endOffset;
        var o = "xFFFEE0DD" === r.tag.name;
        if (o) return { data: i, endOffset: r.endOffset, isSeqDelim: o };
        if ("u/l" !== (i[r.tag.name] = r).vl) { if (0 !== r.vl) { var a = t; for (t -= r.vl; t < a;) t = (r = this.readDataElement(e, t, n)).endOffset, i[r.tag.name] = r } } else
            for (var s = !1; !s;) t = (r = this.readDataElement(e, t, n)).endOffset, (s = "xFFFEE00D" === r.tag.name) || (i[r.tag.name] = r);
        return { data: i, endOffset: t, isSeqDelim: !1 }
    }, H.dicom.DicomParser.prototype.readPixelItemDataElement = function(e, t, n) {
        var i = [],
            r = this.readDataElement(e, t, n),
            o = r.vl;
        t = r.endOffset;
        for (var a = !1; !a;) t = (r = this.readDataElement(e, t, n)).endOffset, (a = "xFFFEE0DD" === r.tag.name) || i.push(r.value);
        return { data: i, endOffset: t, offsetTableVl: o }
    }, H.dicom.DicomParser.prototype.readDataElement = function(e, t, n) {
        var i = this.readTag(e, t);
        t = i.endOffset;
        var r = null,
            o = !1;
        if (H.dicom.isTagWithVR(i.group, i.element))
            if (n) {
                r = "UN";
                var a = H.dicom.dictionary;
                void 0 !== a[i.group] && void 0 !== a[i.group][i.element] && (r = H.dicom.dictionary[i.group][i.element][0]), o = !0
            } else r = e.readString(t, 2), t += 2 * Uint8Array.BYTES_PER_ELEMENT, (o = H.dicom.is32bitVLVR(r)) && (t += 2 * Uint8Array.BYTES_PER_ELEMENT);
        else r = "UN", o = !0;
        var s = 0;
        o ? (s = e.readUint32(t), t += Uint32Array.BYTES_PER_ELEMENT) : (s = e.readUint16(t), t += Uint16Array.BYTES_PER_ELEMENT);
        var l = s;
        4294967295 === s && (l = "u/l", s = 0);
        var u = t,
            c = null,
            d = "x7FE00010" === i.name;
        if (d && "u/l" === l) {
            var S = this.readPixelItemDataElement(e, t, n);
            t = S.endOffset, u += S.offsetTableVl, c = S.data
        } else if (!d || "OB" !== r && "OW" !== r && "OF" !== r && "ox" !== r)
            if ("OB" === r) c = e.readInt8Array(t, s), t += s;
            else if ("OW" === r) c = e.readInt16Array(t, s), t += s;
        else if ("OF" === r) c = e.readInt32Array(t, s), t += s;
        else if ("OD" === r) c = e.readInt64Array(t, s), t += s;
        else if ("US" === r) c = e.readUint16Array(t, s), t += s;
        else if ("UL" === r) c = e.readUint32Array(t, s), t += s;
        else if ("SS" === r) c = e.readInt16Array(t, s), t += s;
        else if ("SL" === r) c = e.readInt32Array(t, s), t += s;
        else if ("FL" === r) c = e.readFloat32Array(t, s), t += s;
        else if ("FD" === r) c = e.readFloat64Array(t, s), t += s;
        else if ("AT" === r) {
            var x = e.readUint16Array(t, s);
            t += s, c = [];
            for (var g = 0, m = x.length; g < m; g += 2) {
                var h = x[g].toString(16),
                    p = x[g + 1].toString(16),
                    f = "(";
                f += "0000".substr(0, 4 - h.length) + h.toUpperCase(), f += ",", f += "0000".substr(0, 4 - p.length) + p.toUpperCase(), f += ")", c.push(f)
            }
        } else if ("UN" === r) c = e.readUint8Array(t, s), t += s;
        else if ("SQ" === r) {
            var C;
            if (c = [], "u/l" !== l) {
                if (0 !== s)
                    for (var y = t + s; t < y;) C = this.readItemDataElement(e, t, n), c.push(C.data), t = C.endOffset
            } else
                for (var D = !1; !D;) D = (C = this.readItemDataElement(e, t, n)).isSeqDelim, t = C.endOffset, D || c.push(C.data)
        } else c = "SH" === r || "LO" === r || "ST" === r || "PN" === r || "LT" === r || "UT" === r ? e.readSpecialString(t, s) : e.readString(t, s), t += s, c = c.split("\\");
        else {
            var v = 16;
            void 0 !== this.dicomElements.x00280100 ? v = this.dicomElements.x00280100.value[0] : console.warn("Reading DICOM pixel data with default bitsAllocated."), 8 === v && "OW" === r && console.warn("Reading DICOM pixel data with vr=OW and bitsAllocated=8 (should be 16)."), 16 === v && "OB" === r && console.warn("Reading DICOM pixel data with vr=OB and bitsAllocated=16 (should be 8).");
            var T = 0;
            void 0 !== this.dicomElements.x00280103 && (T = this.dicomElements.x00280103.value[0]), 8 === v ? c = 0 === T ? e.readUint8Array(t, s) : e.readInt8Array(t, s) : 16 === v ? c = 0 === T ? e.readUint16Array(t, s) : e.readInt16Array(t, s) : 32 === v ? c = 0 === T ? e.readUint32Array(t, s) : e.readInt32Array(t, s) : 64 === v && (c = 0 === T ? e.readUint64Array(t, s) : e.readInt64Array(t, s)), t += s
        }
        return { tag: i, vr: r, vl: l, value: c, startOffset: u, endOffset: t }
    }, H.dicom.DicomParser.prototype.parse = function(e) {
        var t = 0,
            n = !1,
            i = new H.dicom.DataReader(e),
            r = new H.dicom.DataReader(e);
        t = 128;
        var o = i.readString(t, 4);
        if (t += 4 * Uint8Array.BYTES_PER_ELEMENT, "DICM" !== o) throw new Error("Not a valid DICOM file (no magic DICM word found)");
        var a = this.readDataElement(i, t, !1);
        t = a.endOffset, this.dicomElements[a.tag.name] = a;
        for (var s = t + parseInt(a.value[0], 10); t < s;) t = (a = this.readDataElement(i, t, !1)).endOffset, this.dicomElements[a.tag.name] = a;
        if (void 0 === this.dicomElements.x00020010) throw new Error("Not a valid DICOM file (no TransferSyntaxUID found)");
        var l = H.dicom.cleanString(this.dicomElements.x00020010.value[0]);
        if (!H.dicom.isReadSupportedTransferSyntax(l)) throw new Error("Unsupported DICOM transfer syntax: '" + l + "' (" + H.dicom.getTransferSyntaxName(l) + ")");
        for (H.dicom.isImplicitTransferSyntax(l) && (n = !0), H.dicom.isBigEndianTransferSyntax(l) && (r = new H.dicom.DataReader(e, !1)), void 0 !== this.getDefaultCharacterSet() && r.setUtfLabel(this.getDefaultCharacterSet()); t < e.byteLength;) {
            var u;
            if ("x00080005" === (a = this.readDataElement(r, t, n)).tag.name) 1 === a.value.length ? u = H.dicom.cleanString(a.value[0]) : (u = H.dicom.cleanString(a.value[1]), console.warn("Unsupported character set with code extensions: '" + u + "'.")), r.setUtfLabel(H.dicom.getUtfLabel(u));
            t = a.endOffset, this.dicomElements[a.tag.name] = a
        }
        if (e.byteLength !== t && console.warn("Did not reach the end of the buffer: " + t + " != " + e.byteLength), void 0 !== this.dicomElements.x7FE00010) {
            var c = 1;
            if (void 0 !== this.dicomElements.x00280008 && (c = this.dicomElements.x00280008.value[0]), "u/l" !== this.dicomElements.x7FE00010.vl) {
                (H.dicom.isJpeg2000TransferSyntax(l) || H.dicom.isJpegBaselineTransferSyntax(l) || H.dicom.isJpegLosslessTransferSyntax(l)) && console.warn("Compressed but no items...");
                for (var d = this.dicomElements.x7FE00010.value, S = this.dicomElements.x00280011.value[0] * this.dicomElements.x00280010.value[0] * this.dicomElements.x00280002.value[0], x = [], g = 0, m = 0; m < c; ++m) x[m] = d.slice(g, g + S), g += S;
                this.dicomElements.x7FE00010.value = x
            } else {
                var h = this.dicomElements.x7FE00010.value;
                if (1 < h.length && h.length > c) {
                    for (var p = h.length / c, f = [], C = 0, y = 0; y < c; ++y) {
                        C = y * p;
                        for (var D = 0, v = 0; v < p; ++v) D += h[C + v].length;
                        for (var T = new h[0].constructor(D), L = 0, I = 0; I < p; ++I) T.set(h[C + I], L), L += h[C + I].length;
                        f[y] = T
                    }
                    this.dicomElements.x7FE00010.value = f
                }
            }
        }
    }, H.dicom.DicomElementsWrapper = function(l) {
        this.getDEFromKey = function(e) { return l[e] }, this.getFromKey = function(e, t) {
            void 0 === t && (t = !1);
            var n = null,
                i = l[e];
            return void 0 !== i && (n = 1 === i.value.length && !1 === t ? i.value[0] : i.value), n
        }, this.dumpToTable = function() { for (var e = Object.keys(l), t = H.dicom.dictionary, n = [], i = null, r = null, o = null, a = 0, s = e.length; a < s; ++a) o = {}, r = null, void 0 !== t[(i = l[e[a]]).tag.group] && void 0 !== t[i.tag.group][i.tag.element] && (r = t[i.tag.group][i.tag.element]), o.name = null !== r ? r[2] : "Unknown Tag & Data", o.value = this.getElementValueAsString(i), o.group = i.tag.group, o.element = i.tag.element, o.vr = i.vr, o.vl = i.vl, n.push(o); return n }, this.dump = function() {
            var e = Object.keys(l),
                t = "\n";
            t += "# Dicom-File-Format\n", t += "\n", t += "# Dicom-Meta-Information-Header\n", t += "# Used TransferSyntax: ", H.dicom.isNativeLittleEndian() ? t += "Little Endian Explicit\n" : t += "NOT Little Endian Explicit\n";
            for (var n = null, i = !0, r = 0, o = e.length; r < o; ++r) {
                if (n = l[e[r]], i && "0x0002" !== n.tag.group) {
                    t += "\n", t += "# Dicom-Data-Set\n", t += "# Used TransferSyntax: ";
                    var a = H.dicom.cleanString(l.x00020010.value[0]);
                    t += H.dicom.getTransferSyntaxName(a), t += "\n", i = !1
                }
                t += this.getElementAsString(n) + "\n"
            }
            return t
        }
    }, H.dicom.DicomElementsWrapper.prototype.getElementValueAsString = function(e, t) {
        var n = "";
        if (void 0 === t && (t = !0), null == e) return n;
        var i = Number.isInteger || function(e) { return "number" == typeof e && isFinite(e) && Math.floor(e) === e };
        if ("SQ" !== e.vr && 1 === e.value.length && "" === e.value[0]) n += "(no value available)";
        else if ("0x7FE0" === e.tag.group && "0x0010" === e.tag.element && "u/l" === e.vl) n = "(PixelSequence)";
        else if ("DA" === e.vr && t) {
            var r = e.value[0],
                o = parseInt(r.substr(0, 4), 10),
                a = parseInt(r.substr(4, 2), 10) - 1,
                s = parseInt(r.substr(6, 2), 10);
            n = new Date(o, a, s).toLocaleDateString()
        } else if ("TM" === e.vr && t) {
            var l = e.value[0];
            n = l.substr(0, 2) + ":" + (4 <= l.length ? l.substr(2, 2) : "00") + ":" + (6 <= l.length ? l.substr(4, 2) : "00")
        } else
            for (var u = "O" === e.vr[0].toUpperCase(), c = "FL" === e.vr || "FD" === e.vr || "DS" === e.vr, d = "", S = 0, x = e.value.length; S < x; ++S) {
                if (d = "", 0 !== S && (d += "\\"), c) { var g = e.value[S]; "string" == typeof g && (g = H.dicom.cleanString(g)); var m = Number(g);!i(m) && t ? d += m.toPrecision(4) : d += m.toString() } else if (u) {
                    var h = e.value[S].toString(16);
                    d += h = "OB" === e.vr ? "00".substr(0, 2 - h.length) + h : "0000".substr(0, 4 - h.length) + h
                } else "string" == typeof e.value[S] ? d += H.dicom.cleanString(e.value[S]) : d += e.value[S];
                if (!(n.length + d.length <= 65)) { n += "..."; break } n += d
            }
        return n
    }, H.dicom.DicomElementsWrapper.prototype.getElementValueAsStringFromKey = function(e) { return this.getElementValueAsString(this.getDEFromKey(e)) }, H.dicom.DicomElementsWrapper.prototype.getElementAsString = function(e, t) {
        t = t || "";
        var n = H.dicom.dictionary,
            i = null;
        void 0 !== n[e.tag.group] && void 0 !== n[e.tag.group][e.tag.element] && (i = n[e.tag.group][e.tag.element]);
        var r = e.value.length,
            o = "O" === e.vr[0].toUpperCase();
        "0xFFFE" !== e.tag.group || "0xE00D" !== e.tag.element && "0xE0DD" !== e.tag.element ? o && (r = 1) : r = 0;
        var a = "0x7FE0" === e.tag.group && "0x0010" === e.tag.element && "u/l" === e.vl,
            s = null;
        s = "(", s += e.tag.group.substr(2, 5).toLowerCase(), s += ",", s += e.tag.element.substr(2, 5).toLowerCase(), s += ") ", s += e.vr, "SQ" !== e.vr && 1 === e.value.length && "" === e.value[0] ? (s += " (no value available)", r = 0) : "na" === e.vr ? (s += " ", s += e.value[0]) : a ? s += " (PixelSequence #=" + r + ")" : "SQ" === e.vr ? (s += " (Sequence with", "u/l" === e.vl ? s += " undefined" : s += " explicit", s += " length #=", s += e.value.length, s += ")") : o || "pi" === e.vr || "UL" === e.vr || "US" === e.vr || "SL" === e.vr || "SS" === e.vr || "FL" === e.vr || "FD" === e.vr || "AT" === e.vr ? (s += " ", s += this.getElementValueAsString(e, !1)) : (s += " [", s += this.getElementValueAsString(e, !1), s += "]");
        var l = 55 - s.length;
        if (0 < l)
            for (var u = 0; u < l; ++u) s += " ";
        s += " # ", e.vl < 100 && (s += " "), e.vl < 10 && (s += " "), s += e.vl, s += ", ", s += r, s += " ", s += null !== i ? i[2] : "Unknown Tag & Data";
        var c = null;
        if ("SQ" === e.vr) {
            for (var d = null, S = 0, x = e.value.length; S < x; ++S) {
                d = e.value[S];
                var g = Object.keys(d);
                if (0 !== g.length) {
                    var m = d.xFFFEE000;
                    c = "(Item with", "u/l" === m.vl ? c += " undefined" : c += " explicit", c += " length #=" + (g.length - 1) + ")", m.value = [c], m.vr = "na", s += "\n", s += this.getElementAsString(m, t + "  ");
                    for (var h = 0, p = g.length; h < p; ++h) "xFFFEE000" !== g[h] && (s += "\n", s += this.getElementAsString(d[g[h]], t + "    "));
                    c = "(ItemDelimitationItem", "u/l" !== m.vl && (c += " for re-encoding");
                    var f = { tag: { group: "0xFFFE", element: "0xE00D" }, vr: "na", vl: "0", value: [c += ")"] };
                    s += "\n", s += this.getElementAsString(f, t + "  ")
                }
            }
            c = "(SequenceDelimitationItem", "u/l" !== e.vl && (c += " for re-encod.");
            var C = { tag: { group: "0xFFFE", element: "0xE0DD" }, vr: "na", vl: "0", value: [c += ")"] };
            s += "\n", s += this.getElementAsString(C, t)
        } else if (a) {
            for (var y = null, D = 0, v = e.value.length; D < v; ++D) s += "\n", (y = e.value[D]).vr = "pi", s += this.getElementAsString(y, t + "  ");
            s += "\n", s += this.getElementAsString({ tag: { group: "0xFFFE", element: "0xE0DD" }, vr: "na", vl: "0", value: ["(SequenceDelimitationItem)"] }, t)
        }
        return t + s
    }, H.dicom.DicomElementsWrapper.prototype.getFromGroupElement = function(e, t) { return this.getFromKey(H.dicom.getGroupElementKey(e, t)) }, H.dicom.DicomElementsWrapper.prototype.getFromName = function(e) {
        var t = null,
            n = H.dicom.getGroupElementFromName(e);
        return null !== n.group && null !== n.element && (t = this.getFromKey(H.dicom.getGroupElementKey(n.group, n.element))), t
    }, (H = H || {}).dicom = H.dicom || {}, H.dicom.DataWriter = function(e, i) {
        void 0 === i && (i = !0);
        var r = new DataView(e);
        this.writeUint8 = function(e, t) { return r.setUint8(e, t), e + Uint8Array.BYTES_PER_ELEMENT }, this.writeInt8 = function(e, t) { return r.setInt8(e, t), e + Int8Array.BYTES_PER_ELEMENT }, this.writeUint16 = function(e, t) { return r.setUint16(e, t, i), e + Uint16Array.BYTES_PER_ELEMENT }, this.writeInt16 = function(e, t) { return r.setInt16(e, t, i), e + Int16Array.BYTES_PER_ELEMENT }, this.writeUint32 = function(e, t) { return r.setUint32(e, t, i), e + Uint32Array.BYTES_PER_ELEMENT }, this.writeInt32 = function(e, t) { return r.setInt32(e, t, i), e + Int32Array.BYTES_PER_ELEMENT }, this.writeFloat32 = function(e, t) { return r.setFloat32(e, t, i), e + Float32Array.BYTES_PER_ELEMENT }, this.writeFloat64 = function(e, t) { return r.setFloat64(e, t, i), e + Float64Array.BYTES_PER_ELEMENT }, this.writeHex = function(e, t) { var n = parseInt(t.substr(2), 16); return r.setUint16(e, n, i), e + Uint16Array.BYTES_PER_ELEMENT }, this.writeString = function(e, t) { for (var n = 0, i = t.length; n < i; ++n) r.setUint8(e, t.charCodeAt(n)), e += Uint8Array.BYTES_PER_ELEMENT; return e }
    }, H.dicom.DataWriter.prototype.writeUint8Array = function(e, t) { for (var n = 0, i = t.length; n < i; ++n) e = this.writeUint8(e, t[n]); return e }, H.dicom.DataWriter.prototype.writeInt8Array = function(e, t) { for (var n = 0, i = t.length; n < i; ++n) e = this.writeInt8(e, t[n]); return e }, H.dicom.DataWriter.prototype.writeUint16Array = function(e, t) { for (var n = 0, i = t.length; n < i; ++n) e = this.writeUint16(e, t[n]); return e }, H.dicom.DataWriter.prototype.writeInt16Array = function(e, t) { for (var n = 0, i = t.length; n < i; ++n) e = this.writeInt16(e, t[n]); return e }, H.dicom.DataWriter.prototype.writeUint32Array = function(e, t) { for (var n = 0, i = t.length; n < i; ++n) e = this.writeUint32(e, t[n]); return e }, H.dicom.DataWriter.prototype.writeInt32Array = function(e, t) { for (var n = 0, i = t.length; n < i; ++n) e = this.writeInt32(e, t[n]); return e }, H.dicom.DataWriter.prototype.writeFloat32Array = function(e, t) { for (var n = 0, i = t.length; n < i; ++n) e = this.writeFloat32(e, t[n]); return e }, H.dicom.DataWriter.prototype.writeFloat64Array = function(e, t) { for (var n = 0, i = t.length; n < i; ++n) e = this.writeFloat64(e, t[n]); return e }, H.dicom.DataWriter.prototype.writeStringArray = function(e, t) { for (var n = 0, i = t.length; n < i; ++n) 0 !== n && (e = this.writeString(e, "\\")), e = this.writeString(e, t[n].toString()); return e }, H.dicom.DataWriter.prototype.writeDataElementItems = function(e, t, n) {
        for (var i = null, r = 0; r < t.length; ++r) {
            i = t[r];
            var o = Object.keys(i);
            if (0 !== o.length) {
                var a = i.xFFFEE000;
                a.value = [];
                var s = "u/l" === a.vl;
                s && (a.vl = 4294967295), e = this.writeDataElement(a, e, n);
                for (var l = 0; l < o.length; ++l) "xFFFEE000" !== o[l] && "xFFFEE00D" !== o[l] && (e = this.writeDataElement(i[o[l]], e, n));
                if (s) { e = this.writeDataElement({ tag: { group: "0xFFFE", element: "0xE00D", name: "ItemDelimitationItem" }, vr: "NONE", vl: 0, value: [] }, e, n) }
            }
        }
        return e
    }, H.dicom.DataWriter.prototype.writeDataElementValue = function(e, t, n, i) {
        if (n instanceof Uint8Array) t = this.writeUint8Array(t, n);
        else if (n instanceof Int8Array) t = this.writeInt8Array(t, n);
        else if (n instanceof Uint16Array) t = this.writeUint16Array(t, n);
        else if (n instanceof Int16Array) t = this.writeInt16Array(t, n);
        else if (n instanceof Uint32Array) t = this.writeUint32Array(t, n);
        else if (n instanceof Int32Array) t = this.writeInt32Array(t, n);
        else if ("UN" === e) t = this.writeUint8Array(t, n);
        else if ("OB" === e) t = this.writeInt8Array(t, n);
        else if ("OW" === e) t = this.writeInt16Array(t, n);
        else if ("OF" === e) t = this.writeInt32Array(t, n);
        else if ("OD" === e) t = this.writeInt64Array(t, n);
        else if ("US" === e) t = this.writeUint16Array(t, n);
        else if ("SS" === e) t = this.writeInt16Array(t, n);
        else if ("UL" === e) t = this.writeUint32Array(t, n);
        else if ("SL" === e) t = this.writeInt32Array(t, n);
        else if ("FL" === e) t = this.writeFloat32Array(t, n);
        else if ("FD" === e) t = this.writeFloat64Array(t, n);
        else if ("SQ" === e) t = this.writeDataElementItems(t, n, i);
        else if ("AT" === e)
            for (var r = 0; r < n.length; ++r) {
                var o = n[r] + "",
                    a = o.substring(1, 5),
                    s = o.substring(6, 10),
                    l = parseInt(a, 16),
                    u = parseInt(s, 16),
                    c = new Uint16Array([l, u]);
                t = this.writeUint16Array(t, c)
            } else t = this.writeStringArray(t, n);
        return t
    }, H.dicom.DataWriter.prototype.writePixelDataElementValue = function(e, t, n, i, r) {
        if ("u/l" !== t) {
            var o = i[0];
            1 < i.length && (o = H.dicom.flattenArrayOfTypedArrays(i)), n = this.writeDataElementValue(e, n, o, r)
        } else {
            for (var a = { xFFFEE000: { tag: { group: "0xFFFE", element: "0xE000", name: "xFFFEE000" }, vr: "UN", vl: 0, value: [] } }, s = 0; s < i.length; ++s) a[s] = { tag: { group: "0xFFFE", element: "0xE000", name: "xFFFEE000" }, vr: e, vl: i[s].length, value: i[s] };
            n = this.writeDataElementItems(n, [a], r)
        }
        return n
    }, H.dicom.DataWriter.prototype.writeDataElement = function(e, t, n) {
        var i = H.dicom.isTagWithVR(e.tag.group, e.tag.element),
            r = !(!n && i) || H.dicom.is32bitVLVR(e.vr);
        t = this.writeHex(t, e.tag.group), t = this.writeHex(t, e.tag.element), i && !n && (t = this.writeString(t, e.vr), r && (t += 2));
        var o = e.vl;
        (H.dicom.isImplicitLengthSequence(e) || H.dicom.isImplicitLengthItem(e) || H.dicom.isImplicitLengthPixels(e)) && (o = 4294967295), t = r ? this.writeUint32(t, o) : this.writeUint16(t, o);
        var a = e.value;
        if (void 0 === a && (a = []), t = "x7FE00010" === e.tag.name ? this.writePixelDataElementValue(e.vr, e.vl, t, a, n) : this.writeDataElementValue(e.vr, t, a, n), H.dicom.isImplicitLengthSequence(e) || H.dicom.isImplicitLengthPixels(e)) { t = this.writeDataElement({ tag: { group: "0xFFFE", element: "0xE0DD", name: "SequenceDelimitationItem" }, vr: "NONE", vl: 0, value: [] }, t, n) }
        return t
    }, H.dicom.isImplicitLengthSequence = function(e) { return "SQ" === e.vr && "u/l" === e.vl }, H.dicom.isImplicitLengthItem = function(e) { return "xFFFEE000" === e.tag.name && "u/l" === e.vl }, H.dicom.isImplicitLengthPixels = function(e) { return "x7FE00010" === e.tag.name && "u/l" === e.vl }, H.dicom.flattenArrayOfTypedArrays = function(e) {
        for (var t = e.length, n = e[0].length, i = t * n, r = new e[0].constructor(i), o = 0; o < t; o++) {
            var a = o * n;
            r.set(e[o], a)
        }
        return r
    }, H.dicom.DicomWriter = function() {
        var a = { copy: function(e) { return e }, remove: function() { return null }, clear: function(e) { return e.value[0] = "", e.vl = 0, e.endOffset = e.startOffset, e }, replace: function(e, t) { return e.value[0] = t, e.vl = t.length, e.endOffset = e.startOffset + t.length, e } };
        this.rules = { default: { action: "copy", value: null } }, this.anonymisationRules = { default: { action: "remove", value: null }, PatientName: { action: "replace", value: "Anonymized" }, "Meta Element": { action: "copy", value: null }, Acquisition: { action: "copy", value: null }, "Image Presentation": { action: "copy", value: null }, Procedure: { action: "copy", value: null }, "Pixel Data": { action: "copy", value: null } }, this.getElementToWrite = function(e) {
            var t, n = null,
                i = H.dicom.dictionary,
                r = e.tag.group,
                o = H.dicom.TagGroups[r.substr(1)];
            return void 0 !== i[r] && void 0 !== i[r][e.tag.element] && (n = i[r][e.tag.element][2]), t = void 0 !== this.rules[e.tag.name] ? this.rules[e.tag.name] : null !== n && void 0 !== this.rules[n] ? this.rules[n] : void 0 !== this.rules[o] ? this.rules[o] : this.rules.default, a[t.action](e, t.value)
        }
    }, H.dicom.DicomWriter.prototype.getBuffer = function(e) {
        for (var t, n, i = Object.keys(e), r = H.dicom.cleanString(e.x00020010.value[0]), o = H.dicom.isImplicitTransferSyntax(r), a = H.dicom.isBigEndianTransferSyntax(r), s = 132, l = 0, u = [], c = [], d = 0, S = H.dicom.getFileMetaInformationGroupLengthTag(), x = new H.dicom.Tag("0x0002", "0x0012"), g = new H.dicom.Tag("0x0002", "0x0013"), m = 0, h = i.length; m < h; ++m)
            if (null !== (t = this.getElementToWrite(e[i[m]])) && !S.equals2(t.tag) && !x.equals2(t.tag) && !g.equals2(t.tag)) {
                l = 0, l += "Meta Element" === (n = H.dicom.TagGroups[t.tag.group.substr(1)]) ? H.dicom.getDataElementPrefixByteSize(t.vr, !1) : H.dicom.getDataElementPrefixByteSize(t.vr, o);
                var p = t.endOffset - t.startOffset;
                l += parseInt(p, 10), (H.dicom.isImplicitLengthSequence(t) || H.dicom.isImplicitLengthPixels(t)) && (l += H.dicom.getDataElementPrefixByteSize("NONE", o)), "Meta Element" === n ? (u.push(t), d += l) : c.push(t), s += l
            }
        var f = H.dicom.getDicomElement("ImplementationClassUID"),
            C = H.dicom.getDataElementPrefixByteSize(f.vr, o);
        C += H.dicom.setElementValue(f, "1.2.826.0.1.3680043.9.7278.1." + H.getVersion(), !1), u.push(f), d += C, s += C;
        var y = H.dicom.getDicomElement("ImplementationVersionName"),
            D = H.dicom.getDataElementPrefixByteSize(y.vr, o),
            v = "DWV_" + H.getVersion();
        v.length % 2 == 1 && (v += "\0"), D += H.dicom.setElementValue(y, v, !1), u.push(y), d += D, s += D;
        var T = H.dicom.getDicomElement("FileMetaInformationGroupLength"),
            L = H.dicom.getDataElementPrefixByteSize(T.vr, o);
        s += L += H.dicom.setElementValue(T, d, !1);
        var I = new ArrayBuffer(s),
            P = new H.dicom.DataWriter(I),
            F = new H.dicom.DataWriter(I, !a),
            A = 128;
        A = P.writeString(A, "DICM"), A = P.writeDataElement(T, A, !1);
        for (var E = 0, w = u.length; E < w; ++E) A = P.writeDataElement(u[E], A, !1);
        for (var O = 0, b = c.length; O < b; ++O) A = F.writeDataElement(c[O], A, o);
        return I
    }, H.dicom.getDicomElement = function(e) {
        var t = H.dicom.getGroupElementFromName(e),
            n = H.dicom.dictionary;
        return { tag: { group: t.group, element: t.element }, vr: n[t.group][t.element][0], vl: n[t.group][t.element][1] }
    }, H.dicom.setElementValue = function(e, t, n) {
        var i = 0;
        if ("SQ" === e.vr) {
            if (e.value = t, e.vl = 0, null !== t && 0 !== t) {
                var r, o = [],
                    a = !0;
                void 0 !== t.explicitLength && (a = t.explicitLength, delete t.explicitLength);
                for (var s = Object.keys(t), l = 0, u = s.length; l < u; ++l) {
                    var c = {},
                        d = 0;
                    if (null !== (r = t[s[l]]) && 0 !== r) {
                        for (var S, x = Object.keys(r), g = 0, m = x.length; g < m; ++g) S = H.dicom.getDicomElement(x[g]), d += H.dicom.setElementValue(S, r[x[g]]), H.dicom.isImplicitLengthSequence(S) && (d += H.dicom.getDataElementPrefixByteSize("NONE", n)), c[H.dicom.getGroupElementKey(S.tag.group, S.tag.element)] = S, d += H.dicom.getDataElementPrefixByteSize(S.vr, n);
                        var h = { tag: { group: "0xFFFE", element: "0xE000" }, vr: "NONE", vl: a ? d : "u/l", value: [] };
                        if (c[H.dicom.getGroupElementKey(h.tag.group, h.tag.element)] = h, d += H.dicom.getDataElementPrefixByteSize("NONE", n), !a) {
                            var p = { tag: { group: "0xFFFE", element: "0xE00D" }, vr: "NONE", vl: 0, value: [] };
                            c[H.dicom.getGroupElementKey(p.tag.group, p.tag.element)] = p, d += H.dicom.getDataElementPrefixByteSize("NONE", n)
                        }
                        i += d, o.push(c)
                    }
                }
                e.value = o, e.vl = a ? i : "u/l"
            }
        } else { if (i = 0, t instanceof Array) { e.value = t; for (var f = 0; f < t.length; ++f) 0 !== f && (i += 1), i += t[f].toString().length } else e.value = [t], i = void 0 !== t && void 0 !== t.length ? t.length : 1; "US" === e.vr || "OW" === e.vr ? i *= Uint16Array.BYTES_PER_ELEMENT : "SS" === e.vr ? i *= Int16Array.BYTES_PER_ELEMENT : "UL" === e.vr ? i *= Uint32Array.BYTES_PER_ELEMENT : "SL" === e.vr ? i *= Int32Array.BYTES_PER_ELEMENT : "FL" === e.vr ? i *= Float32Array.BYTES_PER_ELEMENT : "FD" === e.vr ? i *= Float64Array.BYTES_PER_ELEMENT : i *= Uint8Array.BYTES_PER_ELEMENT, e.vl = i }
        return i
    }, H.dicom.getElementsFromJSONTags = function(e) { for (var t, n, i = H.dicom.isImplicitTransferSyntax(e.TransferSyntaxUID), r = Object.keys(e), o = {}, a = 132, s = 0, l = r.length; s < l; ++s) t = H.dicom.getDicomElement(r[s]), n = H.dicom.setElementValue(t, e[r[s]], i), a += H.dicom.getDataElementPrefixByteSize(t.vr, i), t.startOffset = a, a += n, t.endOffset = a, o[H.dicom.getGroupElementKey(t.tag.group, t.tag.element)] = t; return { elements: o, offset: a } };
    H.dicom.pixelGenerators = {
        gradSquare: function(e, t) {
            var o = .5 * e,
                a = .5 * t,
                s = (e / 2 + o / 2) * (t / 2 + a / 2);
            this.getGrey = function(e, t) {
                var n = 100,
                    i = Math.abs(t - a),
                    r = Math.abs(e - o);
                return i < a / 2 && r < o / 2 && (n += e * t * (100 / s)), [n]
            }, this.getRGB = function(e, t) {
                var n = 0,
                    i = Math.abs(t - a),
                    r = Math.abs(e - o);
                return i < a / 2 && r < o / 2 && (n += e * t * (100 / s)), 255 < n && (n = 200), [0, n, n]
            }
        }
    }, H.dicom.generatePixelDataFromJSONTags = function(e, t, n) {
        if (void 0 === n && (n = "gradSquare"), void 0 === e.TransferSyntaxUID) throw new Error("Missing transfer syntax for pixel generation.");
        if (void 0 === e.Rows) throw new Error("Missing number of rows for pixel generation.");
        if (void 0 === e.Columns) throw new Error("Missing number of columns for pixel generation.");
        if (void 0 === e.BitsAllocated) throw new Error("Missing BitsAllocated for pixel generation.");
        if (void 0 === e.PixelRepresentation) throw new Error("Missing PixelRepresentation for pixel generation.");
        if (void 0 === e.SamplesPerPixel) throw new Error("Missing SamplesPerPixel for pixel generation.");
        if (void 0 === e.PhotometricInterpretation) throw new Error("Missing PhotometricInterpretation for pixel generation.");
        var i = H.dicom.isImplicitTransferSyntax(e.TransferSyntaxUID),
            r = e.Rows,
            o = e.Columns,
            a = e.BitsAllocated,
            s = e.PixelRepresentation,
            l = e.SamplesPerPixel,
            u = e.PhotometricInterpretation,
            c = r * o * l;
        if (1 !== l && 3 !== l) throw new Error("Unsupported SamplesPerPixel for pixel generation: " + l);
        if (1 === l && "MONOCHROME1" !== u && "MONOCHROME2" !== u || 3 === l && "RGB" !== u) throw new Error("Unsupported PhotometricInterpretation for pixel generation: " + u + " with SamplesPerPixel: " + l);
        var d = 1,
            S = 1;
        if (3 === l) {
            if (void 0 === e.PlanarConfiguration) throw new Error("Missing PlanarConfiguration for pixel generation.");
            var x = e.PlanarConfiguration;
            if (0 !== x && 1 !== x) throw new Error("Unsupported PlanarConfiguration for pixel generation: " + x);
            0 === x ? d = 3 : S = 3
        }
        var g = H.dicom.getTypedArray(a, s, c);
        if (void 0 === H.dicom.pixelGenerators[n]) throw new Error("Unknown PixelData generator: " + n);
        var m = new H.dicom.pixelGenerators[n](o, r),
            h = m.getGrey;
        "RGB" === u && (h = m.getRGB);
        for (var p = 0, f = 0; f < S; ++f)
            for (var C = 0; C < r; ++C)
                for (var y = 0; y < o; ++y)
                    for (var D = 0; D < d; ++D) g[p] = 1 !== S ? h(y, C)[f] : h(y, C)[D], ++p;
        var v = "OW";
        8 === a && (v = "OB");
        var T = H.dicom.getDataElementPrefixByteSize(v, i) + g.BYTES_PER_ELEMENT * c;
        return { tag: { group: "0x7FE0", element: "0x0010" }, vr: v, vl: T, value: g, startOffset: t, endOffset: t + T }
    }, (H = H || {}).dicom = H.dicom || {}, H.dicom.dictionary = { "0x0000": { "0x0000": ["UL", "1", "GroupLength"], "0x0001": ["UL", "1", "CommandLengthToEnd"], "0x0002": ["UI", "1", "AffectedSOPClassUID"], "0x0003": ["UI", "1", "RequestedSOPClassUID"], "0x0010": ["CS", "1", "CommandRecognitionCode"], "0x0100": ["US", "1", "CommandField"], "0x0110": ["US", "1", "MessageID"], "0x0120": ["US", "1", "MessageIDBeingRespondedTo"], "0x0200": ["AE", "1", "Initiator"], "0x0300": ["AE", "1", "Receiver"], "0x0400": ["AE", "1", "FindLocation"], "0x0600": ["AE", "1", "MoveDestination"], "0x0700": ["US", "1", "Priority"], "0x0800": ["US", "1", "DataSetType"], "0x0850": ["US", "1", "NumberOfMatches"], "0x0860": ["US", "1", "ResponseSequenceNumber"], "0x0900": ["US", "1", "Status"], "0x0901": ["AT", "1-n", "OffendingElement"], "0x0902": ["LO", "1", "ErrorComment"], "0x0903": ["US", "1", "ErrorID"], "0x0904": ["OT", "1-n", "ErrorInformation"], "0x1000": ["UI", "1", "AffectedSOPInstanceUID"], "0x1001": ["UI", "1", "RequestedSOPInstanceUID"], "0x1002": ["US", "1", "EventTypeID"], "0x1003": ["OT", "1-n", "EventInformation"], "0x1005": ["AT", "1-n", "AttributeIdentifierList"], "0x1007": ["AT", "1-n", "ModificationList"], "0x1008": ["US", "1", "ActionTypeID"], "0x1009": ["OT", "1-n", "ActionInformation"], "0x1013": ["UI", "1-n", "SuccessfulSOPInstanceUIDList"], "0x1014": ["UI", "1-n", "FailedSOPInstanceUIDList"], "0x1015": ["UI", "1-n", "WarningSOPInstanceUIDList"], "0x1020": ["US", "1", "NumberOfRemainingSuboperations"], "0x1021": ["US", "1", "NumberOfCompletedSuboperations"], "0x1022": ["US", "1", "NumberOfFailedSuboperations"], "0x1023": ["US", "1", "NumberOfWarningSuboperations"], "0x1030": ["AE", "1", "MoveOriginatorApplicationEntityTitle"], "0x1031": ["US", "1", "MoveOriginatorMessageID"], "0x4000": ["AT", "1", "DialogReceiver"], "0x4010": ["AT", "1", "TerminalType"], "0x5010": ["SH", "1", "MessageSetID"], "0x5020": ["SH", "1", "EndMessageSet"], "0x5110": ["AT", "1", "DisplayFormat"], "0x5120": ["AT", "1", "PagePositionID"], "0x5130": ["CS", "1", "TextFormatID"], "0x5140": ["CS", "1", "NormalReverse"], "0x5150": ["CS", "1", "AddGrayScale"], "0x5160": ["CS", "1", "Borders"], "0x5170": ["IS", "1", "Copies"], "0x5180": ["CS", "1", "OldMagnificationType"], "0x5190": ["CS", "1", "Erase"], "0x51A0": ["CS", "1", "Print"], "0x51B0": ["US", "1-n", "Overlays"] }, "0x0002": { "0x0000": ["UL", "1", "FileMetaInformationGroupLength"], "0x0001": ["OB", "1", "FileMetaInformationVersion"], "0x0002": ["UI", "1", "MediaStorageSOPClassUID"], "0x0003": ["UI", "1", "MediaStorageSOPInstanceUID"], "0x0010": ["UI", "1", "TransferSyntaxUID"], "0x0012": ["UI", "1", "ImplementationClassUID"], "0x0013": ["SH", "1", "ImplementationVersionName"], "0x0016": ["AE", "1", "SourceApplicationEntityTitle"], "0x0017": ["AE", "1", "SendingApplicationEntityTitle"], "0x0018": ["AE", "1", "ReceivingApplicationEntityTitle"], "0x0100": ["UI", "1", "PrivateInformationCreatorUID"], "0x0102": ["OB", "1", "PrivateInformation"] }, "0x0004": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x1130": ["CS", "1", "FileSetID"], "0x1141": ["CS", "1-8", "FileSetDescriptorFileID"], "0x1142": ["CS", "1", "SpecificCharacterSetOfFileSetDescriptorFile"], "0x1200": ["UL", "1", "OffsetOfTheFirstDirectoryRecordOfTheRootDirectoryEntity"], "0x1202": ["UL", "1", "OffsetOfTheLastDirectoryRecordOfTheRootDirectoryEntity"], "0x1212": ["US", "1", "FileSetConsistencyFlag"], "0x1220": ["SQ", "1", "DirectoryRecordSequence"], "0x1400": ["UL", "1", "OffsetOfTheNextDirectoryRecord"], "0x1410": ["US", "1", "RecordInUseFlag"], "0x1420": ["UL", "1", "OffsetOfReferencedLowerLevelDirectoryEntity"], "0x1430": ["CS", "1", "DirectoryRecordType"], "0x1432": ["UI", "1", "PrivateRecordUID"], "0x1500": ["CS", "1-8", "ReferencedFileID"], "0x1504": ["UL", "1", "MRDRDirectoryRecordOffset"], "0x1510": ["UI", "1", "ReferencedSOPClassUIDInFile"], "0x1511": ["UI", "1", "ReferencedSOPInstanceUIDInFile"], "0x1512": ["UI", "1", "ReferencedTransferSyntaxUIDInFile"], "0x151A": ["UI", "1-n", "ReferencedRelatedGeneralSOPClassUIDInFile"], "0x1600": ["UL", "1", "NumberOfReferences"] }, "0x0008": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0001": ["UL", "1", "LengthToEnd"], "0x0005": ["CS", "1-n", "SpecificCharacterSet"], "0x0006": ["SQ", "1", "LanguageCodeSequence"], "0x0008": ["CS", "2-n", "ImageType"], "0x0010": ["SH", "1", "RecognitionCode"], "0x0012": ["DA", "1", "InstanceCreationDate"], "0x0013": ["TM", "1", "InstanceCreationTime"], "0x0014": ["UI", "1", "InstanceCreatorUID"], "0x0015": ["DT", "1", "InstanceCoercionDateTime"], "0x0016": ["UI", "1", "SOPClassUID"], "0x0018": ["UI", "1", "SOPInstanceUID"], "0x001A": ["UI", "1-n", "RelatedGeneralSOPClassUID"], "0x001B": ["UI", "1", "OriginalSpecializedSOPClassUID"], "0x0020": ["DA", "1", "StudyDate"], "0x0021": ["DA", "1", "SeriesDate"], "0x0022": ["DA", "1", "AcquisitionDate"], "0x0023": ["DA", "1", "ContentDate"], "0x0024": ["DA", "1", "OverlayDate"], "0x0025": ["DA", "1", "CurveDate"], "0x002A": ["DT", "1", "AcquisitionDateTime"], "0x0030": ["TM", "1", "StudyTime"], "0x0031": ["TM", "1", "SeriesTime"], "0x0032": ["TM", "1", "AcquisitionTime"], "0x0033": ["TM", "1", "ContentTime"], "0x0034": ["TM", "1", "OverlayTime"], "0x0035": ["TM", "1", "CurveTime"], "0x0040": ["US", "1", "DataSetType"], "0x0041": ["LO", "1", "DataSetSubtype"], "0x0042": ["CS", "1", "NuclearMedicineSeriesType"], "0x0050": ["SH", "1", "AccessionNumber"], "0x0051": ["SQ", "1", "IssuerOfAccessionNumberSequence"], "0x0052": ["CS", "1", "QueryRetrieveLevel"], "0x0053": ["CS", "1", "QueryRetrieveView"], "0x0054": ["AE", "1-n", "RetrieveAETitle"], "0x0056": ["CS", "1", "InstanceAvailability"], "0x0058": ["UI", "1-n", "FailedSOPInstanceUIDList"], "0x0060": ["CS", "1", "Modality"], "0x0061": ["CS", "1-n", "ModalitiesInStudy"], "0x0062": ["UI", "1-n", "SOPClassesInStudy"], "0x0064": ["CS", "1", "ConversionType"], "0x0068": ["CS", "1", "PresentationIntentType"], "0x0070": ["LO", "1", "Manufacturer"], "0x0080": ["LO", "1", "InstitutionName"], "0x0081": ["ST", "1", "InstitutionAddress"], "0x0082": ["SQ", "1", "InstitutionCodeSequence"], "0x0090": ["PN", "1", "ReferringPhysicianName"], "0x0092": ["ST", "1", "ReferringPhysicianAddress"], "0x0094": ["SH", "1-n", "ReferringPhysicianTelephoneNumbers"], "0x0096": ["SQ", "1", "ReferringPhysicianIdentificationSequence"], "0x009C": ["PN", "1-n", "ConsultingPhysicianName"], "0x009D": ["SQ", "1", "ConsultingPhysicianIdentificationSequence"], "0x0100": ["SH", "1", "CodeValue"], "0x0101": ["LO", "1", "ExtendedCodeValue"], "0x0102": ["SH", "1", "CodingSchemeDesignator"], "0x0103": ["SH", "1", "CodingSchemeVersion"], "0x0104": ["LO", "1", "CodeMeaning"], "0x0105": ["CS", "1", "MappingResource"], "0x0106": ["DT", "1", "ContextGroupVersion"], "0x0107": ["DT", "1", "ContextGroupLocalVersion"], "0x0108": ["LT", "1", "ExtendedCodeMeaning"], "0x010B": ["CS", "1", "ContextGroupExtensionFlag"], "0x010C": ["UI", "1", "CodingSchemeUID"], "0x010D": ["UI", "1", "ContextGroupExtensionCreatorUID"], "0x010F": ["CS", "1", "ContextIdentifier"], "0x0110": ["SQ", "1", "CodingSchemeIdentificationSequence"], "0x0112": ["LO", "1", "CodingSchemeRegistry"], "0x0114": ["ST", "1", "CodingSchemeExternalID"], "0x0115": ["ST", "1", "CodingSchemeName"], "0x0116": ["ST", "1", "CodingSchemeResponsibleOrganization"], "0x0117": ["UI", "1", "ContextUID"], "0x0118": ["UI", "1", "MappingResourceUID"], "0x0119": ["UC", "1", "LongCodeValue"], "0x0120": ["UR", "1", "URNCodeValue"], "0x0121": ["SQ", "1", "EquivalentCodeSequence"], "0x0201": ["SH", "1", "TimezoneOffsetFromUTC"], "0x0300": ["SQ", "1", "PrivateDataElementCharacteristicsSequence"], "0x0301": ["US", "1", "PrivateGroupReference"], "0x0302": ["LO", "1", "PrivateCreatorReference"], "0x0303": ["CS", "1", "BlockIdentifyingInformationStatus"], "0x0304": ["US", "1-n", "NonidentifyingPrivateElements"], "0x0306": ["US", "1-n", "IdentifyingPrivateElements"], "0x0305": ["SQ", "1", "DeidentificationActionSequence"], "0x0307": ["CS", "1", "DeidentificationAction"], "0x1000": ["AE", "1", "NetworkID"], "0x1010": ["SH", "1", "StationName"], "0x1030": ["LO", "1", "StudyDescription"], "0x1032": ["SQ", "1", "ProcedureCodeSequence"], "0x103E": ["LO", "1", "SeriesDescription"], "0x103F": ["SQ", "1", "SeriesDescriptionCodeSequence"], "0x1040": ["LO", "1", "InstitutionalDepartmentName"], "0x1048": ["PN", "1-n", "PhysiciansOfRecord"], "0x1049": ["SQ", "1", "PhysiciansOfRecordIdentificationSequence"], "0x1050": ["PN", "1-n", "PerformingPhysicianName"], "0x1052": ["SQ", "1", "PerformingPhysicianIdentificationSequence"], "0x1060": ["PN", "1-n", "NameOfPhysiciansReadingStudy"], "0x1062": ["SQ", "1", "PhysiciansReadingStudyIdentificationSequence"], "0x1070": ["PN", "1-n", "OperatorsName"], "0x1072": ["SQ", "1", "OperatorIdentificationSequence"], "0x1080": ["LO", "1-n", "AdmittingDiagnosesDescription"], "0x1084": ["SQ", "1", "AdmittingDiagnosesCodeSequence"], "0x1090": ["LO", "1", "ManufacturerModelName"], "0x1100": ["SQ", "1", "ReferencedResultsSequence"], "0x1110": ["SQ", "1", "ReferencedStudySequence"], "0x1111": ["SQ", "1", "ReferencedPerformedProcedureStepSequence"], "0x1115": ["SQ", "1", "ReferencedSeriesSequence"], "0x1120": ["SQ", "1", "ReferencedPatientSequence"], "0x1125": ["SQ", "1", "ReferencedVisitSequence"], "0x1130": ["SQ", "1", "ReferencedOverlaySequence"], "0x1134": ["SQ", "1", "ReferencedStereometricInstanceSequence"], "0x113A": ["SQ", "1", "ReferencedWaveformSequence"], "0x1140": ["SQ", "1", "ReferencedImageSequence"], "0x1145": ["SQ", "1", "ReferencedCurveSequence"], "0x114A": ["SQ", "1", "ReferencedInstanceSequence"], "0x114B": ["SQ", "1", "ReferencedRealWorldValueMappingInstanceSequence"], "0x1150": ["UI", "1", "ReferencedSOPClassUID"], "0x1155": ["UI", "1", "ReferencedSOPInstanceUID"], "0x115A": ["UI", "1-n", "SOPClassesSupported"], "0x1160": ["IS", "1-n", "ReferencedFrameNumber"], "0x1161": ["UL", "1-n", "SimpleFrameList"], "0x1162": ["UL", "3-3n", "CalculatedFrameList"], "0x1163": ["FD", "2", "TimeRange"], "0x1164": ["SQ", "1", "FrameExtractionSequence"], "0x1167": ["UI", "1", "MultiFrameSourceSOPInstanceUID"], "0x1190": ["UR", "1", "RetrieveURL"], "0x1195": ["UI", "1", "TransactionUID"], "0x1196": ["US", "1", "WarningReason"], "0x1197": ["US", "1", "FailureReason"], "0x1198": ["SQ", "1", "FailedSOPSequence"], "0x1199": ["SQ", "1", "ReferencedSOPSequence"], "0x1200": ["SQ", "1", "StudiesContainingOtherReferencedInstancesSequence"], "0x1250": ["SQ", "1", "RelatedSeriesSequence"], "0x2110": ["CS", "1", "LossyImageCompressionRetired"], "0x2111": ["ST", "1", "DerivationDescription"], "0x2112": ["SQ", "1", "SourceImageSequence"], "0x2120": ["SH", "1", "StageName"], "0x2122": ["IS", "1", "StageNumber"], "0x2124": ["IS", "1", "NumberOfStages"], "0x2127": ["SH", "1", "ViewName"], "0x2128": ["IS", "1", "ViewNumber"], "0x2129": ["IS", "1", "NumberOfEventTimers"], "0x212A": ["IS", "1", "NumberOfViewsInStage"], "0x2130": ["DS", "1-n", "EventElapsedTimes"], "0x2132": ["LO", "1-n", "EventTimerNames"], "0x2133": ["SQ", "1", "EventTimerSequence"], "0x2134": ["FD", "1", "EventTimeOffset"], "0x2135": ["SQ", "1", "EventCodeSequence"], "0x2142": ["IS", "1", "StartTrim"], "0x2143": ["IS", "1", "StopTrim"], "0x2144": ["IS", "1", "RecommendedDisplayFrameRate"], "0x2200": ["CS", "1", "TransducerPosition"], "0x2204": ["CS", "1", "TransducerOrientation"], "0x2208": ["CS", "1", "AnatomicStructure"], "0x2218": ["SQ", "1", "AnatomicRegionSequence"], "0x2220": ["SQ", "1", "AnatomicRegionModifierSequence"], "0x2228": ["SQ", "1", "PrimaryAnatomicStructureSequence"], "0x2229": ["SQ", "1", "AnatomicStructureSpaceOrRegionSequence"], "0x2230": ["SQ", "1", "PrimaryAnatomicStructureModifierSequence"], "0x2240": ["SQ", "1", "TransducerPositionSequence"], "0x2242": ["SQ", "1", "TransducerPositionModifierSequence"], "0x2244": ["SQ", "1", "TransducerOrientationSequence"], "0x2246": ["SQ", "1", "TransducerOrientationModifierSequence"], "0x2251": ["SQ", "1", "AnatomicStructureSpaceOrRegionCodeSequenceTrial"], "0x2253": ["SQ", "1", "AnatomicPortalOfEntranceCodeSequenceTrial"], "0x2255": ["SQ", "1", "AnatomicApproachDirectionCodeSequenceTrial"], "0x2256": ["ST", "1", "AnatomicPerspectiveDescriptionTrial"], "0x2257": ["SQ", "1", "AnatomicPerspectiveCodeSequenceTrial"], "0x2258": ["ST", "1", "AnatomicLocationOfExaminingInstrumentDescriptionTrial"], "0x2259": ["SQ", "1", "AnatomicLocationOfExaminingInstrumentCodeSequenceTrial"], "0x225A": ["SQ", "1", "AnatomicStructureSpaceOrRegionModifierCodeSequenceTrial"], "0x225C": ["SQ", "1", "OnAxisBackgroundAnatomicStructureCodeSequenceTrial"], "0x3001": ["SQ", "1", "AlternateRepresentationSequence"], "0x3010": ["UI", "1-n", "IrradiationEventUID"], "0x3011": ["SQ", "1", "SourceIrradiationEventSequence"], "0x3012": ["UI", "1", "RadiopharmaceuticalAdministrationEventUID"], "0x4000": ["LT", "1", "IdentifyingComments"], "0x9007": ["CS", "4", "FrameType"], "0x9092": ["SQ", "1", "ReferencedImageEvidenceSequence"], "0x9121": ["SQ", "1", "ReferencedRawDataSequence"], "0x9123": ["UI", "1", "CreatorVersionUID"], "0x9124": ["SQ", "1", "DerivationImageSequence"], "0x9154": ["SQ", "1", "SourceImageEvidenceSequence"], "0x9205": ["CS", "1", "PixelPresentation"], "0x9206": ["CS", "1", "VolumetricProperties"], "0x9207": ["CS", "1", "VolumeBasedCalculationTechnique"], "0x9208": ["CS", "1", "ComplexImageComponent"], "0x9209": ["CS", "1", "AcquisitionContrast"], "0x9215": ["SQ", "1", "DerivationCodeSequence"], "0x9237": ["SQ", "1", "ReferencedPresentationStateSequence"], "0x9410": ["SQ", "1", "ReferencedOtherPlaneSequence"], "0x9458": ["SQ", "1", "FrameDisplaySequence"], "0x9459": ["FL", "1", "RecommendedDisplayFrameRateInFloat"], "0x9460": ["CS", "1", "SkipFrameRangeFlag"] }, "0x0010": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0010": ["PN", "1", "PatientName"], "0x0020": ["LO", "1", "PatientID"], "0x0021": ["LO", "1", "IssuerOfPatientID"], "0x0022": ["CS", "1", "TypeOfPatientID"], "0x0024": ["SQ", "1", "IssuerOfPatientIDQualifiersSequence"], "0x0030": ["DA", "1", "PatientBirthDate"], "0x0032": ["TM", "1", "PatientBirthTime"], "0x0040": ["CS", "1", "PatientSex"], "0x0050": ["SQ", "1", "PatientInsurancePlanCodeSequence"], "0x0101": ["SQ", "1", "PatientPrimaryLanguageCodeSequence"], "0x0102": ["SQ", "1", "PatientPrimaryLanguageModifierCodeSequence"], "0x0200": ["CS", "1", "QualityControlSubject"], "0x0201": ["SQ", "1", "QualityControlSubjectTypeCodeSequence"], "0x1000": ["LO", "1-n", "OtherPatientIDs"], "0x1001": ["PN", "1-n", "OtherPatientNames"], "0x1002": ["SQ", "1", "OtherPatientIDsSequence"], "0x1005": ["PN", "1", "PatientBirthName"], "0x1010": ["AS", "1", "PatientAge"], "0x1020": ["DS", "1", "PatientSize"], "0x1021": ["SQ", "1", "PatientSizeCodeSequence"], "0x1030": ["DS", "1", "PatientWeight"], "0x1040": ["LO", "1", "PatientAddress"], "0x1050": ["LO", "1-n", "InsurancePlanIdentification"], "0x1060": ["PN", "1", "PatientMotherBirthName"], "0x1080": ["LO", "1", "MilitaryRank"], "0x1081": ["LO", "1", "BranchOfService"], "0x1090": ["LO", "1", "MedicalRecordLocator"], "0x1100": ["SQ", "1", "ReferencedPatientPhotoSequence"], "0x2000": ["LO", "1-n", "MedicalAlerts"], "0x2110": ["LO", "1-n", "Allergies"], "0x2150": ["LO", "1", "CountryOfResidence"], "0x2152": ["LO", "1", "RegionOfResidence"], "0x2154": ["SH", "1-n", "PatientTelephoneNumbers"], "0x2155": ["LT", "1", "PatientTelecomInformation"], "0x2160": ["SH", "1", "EthnicGroup"], "0x2180": ["SH", "1", "Occupation"], "0x21A0": ["CS", "1", "SmokingStatus"], "0x21B0": ["LT", "1", "AdditionalPatientHistory"], "0x21C0": ["US", "1", "PregnancyStatus"], "0x21D0": ["DA", "1", "LastMenstrualDate"], "0x21F0": ["LO", "1", "PatientReligiousPreference"], "0x2201": ["LO", "1", "PatientSpeciesDescription"], "0x2202": ["SQ", "1", "PatientSpeciesCodeSequence"], "0x2203": ["CS", "1", "PatientSexNeutered"], "0x2210": ["CS", "1", "AnatomicalOrientationType"], "0x2292": ["LO", "1", "PatientBreedDescription"], "0x2293": ["SQ", "1", "PatientBreedCodeSequence"], "0x2294": ["SQ", "1", "BreedRegistrationSequence"], "0x2295": ["LO", "1", "BreedRegistrationNumber"], "0x2296": ["SQ", "1", "BreedRegistryCodeSequence"], "0x2297": ["PN", "1", "ResponsiblePerson"], "0x2298": ["CS", "1", "ResponsiblePersonRole"], "0x2299": ["LO", "1", "ResponsibleOrganization"], "0x4000": ["LT", "1", "PatientComments"], "0x9431": ["FL", "1", "ExaminedBodyThickness"] }, "0x0012": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0010": ["LO", "1", "ClinicalTrialSponsorName"], "0x0020": ["LO", "1", "ClinicalTrialProtocolID"], "0x0021": ["LO", "1", "ClinicalTrialProtocolName"], "0x0030": ["LO", "1", "ClinicalTrialSiteID"], "0x0031": ["LO", "1", "ClinicalTrialSiteName"], "0x0040": ["LO", "1", "ClinicalTrialSubjectID"], "0x0042": ["LO", "1", "ClinicalTrialSubjectReadingID"], "0x0050": ["LO", "1", "ClinicalTrialTimePointID"], "0x0051": ["ST", "1", "ClinicalTrialTimePointDescription"], "0x0060": ["LO", "1", "ClinicalTrialCoordinatingCenterName"], "0x0062": ["CS", "1", "PatientIdentityRemoved"], "0x0063": ["LO", "1-n", "DeidentificationMethod"], "0x0064": ["SQ", "1", "DeidentificationMethodCodeSequence"], "0x0071": ["LO", "1", "ClinicalTrialSeriesID"], "0x0072": ["LO", "1", "ClinicalTrialSeriesDescription"], "0x0081": ["LO", "1", "ClinicalTrialProtocolEthicsCommitteeName"], "0x0082": ["LO", "1", "ClinicalTrialProtocolEthicsCommitteeApprovalNumber"], "0x0083": ["SQ", "1", "ConsentForClinicalTrialUseSequence"], "0x0084": ["CS", "1", "DistributionType"], "0x0085": ["CS", "1", "ConsentForDistributionFlag"] }, "0x0014": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0023": ["ST", "1-n", "CADFileFormat"], "0x0024": ["ST", "1-n", "ComponentReferenceSystem"], "0x0025": ["ST", "1-n", "ComponentManufacturingProcedure"], "0x0028": ["ST", "1-n", "ComponentManufacturer"], "0x0030": ["DS", "1-n", "MaterialThickness"], "0x0032": ["DS", "1-n", "MaterialPipeDiameter"], "0x0034": ["DS", "1-n", "MaterialIsolationDiameter"], "0x0042": ["ST", "1-n", "MaterialGrade"], "0x0044": ["ST", "1-n", "MaterialPropertiesDescription"], "0x0045": ["ST", "1-n", "MaterialPropertiesFileFormatRetired"], "0x0046": ["LT", "1", "MaterialNotes"], "0x0050": ["CS", "1", "ComponentShape"], "0x0052": ["CS", "1", "CurvatureType"], "0x0054": ["DS", "1", "OuterDiameter"], "0x0056": ["DS", "1", "InnerDiameter"], "0x1010": ["ST", "1", "ActualEnvironmentalConditions"], "0x1020": ["DA", "1", "ExpiryDate"], "0x1040": ["ST", "1", "EnvironmentalConditions"], "0x2002": ["SQ", "1", "EvaluatorSequence"], "0x2004": ["IS", "1", "EvaluatorNumber"], "0x2006": ["PN", "1", "EvaluatorName"], "0x2008": ["IS", "1", "EvaluationAttempt"], "0x2012": ["SQ", "1", "IndicationSequence"], "0x2014": ["IS", "1", "IndicationNumber"], "0x2016": ["SH", "1", "IndicationLabel"], "0x2018": ["ST", "1", "IndicationDescription"], "0x201A": ["CS", "1-n", "IndicationType"], "0x201C": ["CS", "1", "IndicationDisposition"], "0x201E": ["SQ", "1", "IndicationROISequence"], "0x2030": ["SQ", "1", "IndicationPhysicalPropertySequence"], "0x2032": ["SH", "1", "PropertyLabel"], "0x2202": ["IS", "1", "CoordinateSystemNumberOfAxes"], "0x2204": ["SQ", "1", "CoordinateSystemAxesSequence"], "0x2206": ["ST", "1", "CoordinateSystemAxisDescription"], "0x2208": ["CS", "1", "CoordinateSystemDataSetMapping"], "0x220A": ["IS", "1", "CoordinateSystemAxisNumber"], "0x220C": ["CS", "1", "CoordinateSystemAxisType"], "0x220E": ["CS", "1", "CoordinateSystemAxisUnits"], "0x2210": ["OB", "1", "CoordinateSystemAxisValues"], "0x2220": ["SQ", "1", "CoordinateSystemTransformSequence"], "0x2222": ["ST", "1", "TransformDescription"], "0x2224": ["IS", "1", "TransformNumberOfAxes"], "0x2226": ["IS", "1-n", "TransformOrderOfAxes"], "0x2228": ["CS", "1", "TransformedAxisUnits"], "0x222A": ["DS", "1-n", "CoordinateSystemTransformRotationAndScaleMatrix"], "0x222C": ["DS", "1-n", "CoordinateSystemTransformTranslationMatrix"], "0x3011": ["DS", "1", "InternalDetectorFrameTime"], "0x3012": ["DS", "1", "NumberOfFramesIntegrated"], "0x3020": ["SQ", "1", "DetectorTemperatureSequence"], "0x3022": ["ST", "1", "SensorName"], "0x3024": ["DS", "1", "HorizontalOffsetOfSensor"], "0x3026": ["DS", "1", "VerticalOffsetOfSensor"], "0x3028": ["DS", "1", "SensorTemperature"], "0x3040": ["SQ", "1", "DarkCurrentSequence"], "0x3050": ["ox", "1", "DarkCurrentCounts"], "0x3060": ["SQ", "1", "GainCorrectionReferenceSequence"], "0x3070": ["ox", "1", "AirCounts"], "0x3071": ["DS", "1", "KVUsedInGainCalibration"], "0x3072": ["DS", "1", "MAUsedInGainCalibration"], "0x3073": ["DS", "1", "NumberOfFramesUsedForIntegration"], "0x3074": ["LO", "1", "FilterMaterialUsedInGainCalibration"], "0x3075": ["DS", "1", "FilterThicknessUsedInGainCalibration"], "0x3076": ["DA", "1", "DateOfGainCalibration"], "0x3077": ["TM", "1", "TimeOfGainCalibration"], "0x3080": ["OB", "1", "BadPixelImage"], "0x3099": ["LT", "1", "CalibrationNotes"], "0x4002": ["SQ", "1", "PulserEquipmentSequence"], "0x4004": ["CS", "1", "PulserType"], "0x4006": ["LT", "1", "PulserNotes"], "0x4008": ["SQ", "1", "ReceiverEquipmentSequence"], "0x400A": ["CS", "1", "AmplifierType"], "0x400C": ["LT", "1", "ReceiverNotes"], "0x400E": ["SQ", "1", "PreAmplifierEquipmentSequence"], "0x400F": ["LT", "1", "PreAmplifierNotes"], "0x4010": ["SQ", "1", "TransmitTransducerSequence"], "0x4011": ["SQ", "1", "ReceiveTransducerSequence"], "0x4012": ["US", "1", "NumberOfElements"], "0x4013": ["CS", "1", "ElementShape"], "0x4014": ["DS", "1", "ElementDimensionA"], "0x4015": ["DS", "1", "ElementDimensionB"], "0x4016": ["DS", "1", "ElementPitchA"], "0x4017": ["DS", "1", "MeasuredBeamDimensionA"], "0x4018": ["DS", "1", "MeasuredBeamDimensionB"], "0x4019": ["DS", "1", "LocationOfMeasuredBeamDiameter"], "0x401A": ["DS", "1", "NominalFrequency"], "0x401B": ["DS", "1", "MeasuredCenterFrequency"], "0x401C": ["DS", "1", "MeasuredBandwidth"], "0x401D": ["DS", "1", "ElementPitchB"], "0x4020": ["SQ", "1", "PulserSettingsSequence"], "0x4022": ["DS", "1", "PulseWidth"], "0x4024": ["DS", "1", "ExcitationFrequency"], "0x4026": ["CS", "1", "ModulationType"], "0x4028": ["DS", "1", "Damping"], "0x4030": ["SQ", "1", "ReceiverSettingsSequence"], "0x4031": ["DS", "1", "AcquiredSoundpathLength"], "0x4032": ["CS", "1", "AcquisitionCompressionType"], "0x4033": ["IS", "1", "AcquisitionSampleSize"], "0x4034": ["DS", "1", "RectifierSmoothing"], "0x4035": ["SQ", "1", "DACSequence"], "0x4036": ["CS", "1", "DACType"], "0x4038": ["DS", "1-n", "DACGainPoints"], "0x403A": ["DS", "1-n", "DACTimePoints"], "0x403C": ["DS", "1-n", "DACAmplitude"], "0x4040": ["SQ", "1", "PreAmplifierSettingsSequence"], "0x4050": ["SQ", "1", "TransmitTransducerSettingsSequence"], "0x4051": ["SQ", "1", "ReceiveTransducerSettingsSequence"], "0x4052": ["DS", "1", "IncidentAngle"], "0x4054": ["ST", "1", "CouplingTechnique"], "0x4056": ["ST", "1", "CouplingMedium"], "0x4057": ["DS", "1", "CouplingVelocity"], "0x4058": ["DS", "1", "ProbeCenterLocationX"], "0x4059": ["DS", "1", "ProbeCenterLocationZ"], "0x405A": ["DS", "1", "SoundPathLength"], "0x405C": ["ST", "1", "DelayLawIdentifier"], "0x4060": ["SQ", "1", "GateSettingsSequence"], "0x4062": ["DS", "1", "GateThreshold"], "0x4064": ["DS", "1", "VelocityOfSound"], "0x4070": ["SQ", "1", "CalibrationSettingsSequence"], "0x4072": ["ST", "1", "CalibrationProcedure"], "0x4074": ["SH", "1", "ProcedureVersion"], "0x4076": ["DA", "1", "ProcedureCreationDate"], "0x4078": ["DA", "1", "ProcedureExpirationDate"], "0x407A": ["DA", "1", "ProcedureLastModifiedDate"], "0x407C": ["TM", "1-n", "CalibrationTime"], "0x407E": ["DA", "1-n", "CalibrationDate"], "0x4080": ["SQ", "1", "ProbeDriveEquipmentSequence"], "0x4081": ["CS", "1", "DriveType"], "0x4082": ["LT", "1", "ProbeDriveNotes"], "0x4083": ["SQ", "1", "DriveProbeSequence"], "0x4084": ["DS", "1", "ProbeInductance"], "0x4085": ["DS", "1", "ProbeResistance"], "0x4086": ["SQ", "1", "ReceiveProbeSequence"], "0x4087": ["SQ", "1", "ProbeDriveSettingsSequence"], "0x4088": ["DS", "1", "BridgeResistors"], "0x4089": ["DS", "1", "ProbeOrientationAngle"], "0x408B": ["DS", "1", "UserSelectedGainY"], "0x408C": ["DS", "1", "UserSelectedPhase"], "0x408D": ["DS", "1", "UserSelectedOffsetX"], "0x408E": ["DS", "1", "UserSelectedOffsetY"], "0x4091": ["SQ", "1", "ChannelSettingsSequence"], "0x4092": ["DS", "1", "ChannelThreshold"], "0x409A": ["SQ", "1", "ScannerSettingsSequence"], "0x409B": ["ST", "1", "ScanProcedure"], "0x409C": ["DS", "1", "TranslationRateX"], "0x409D": ["DS", "1", "TranslationRateY"], "0x409F": ["DS", "1", "ChannelOverlap"], "0x40A0": ["LO", "1", "ImageQualityIndicatorType"], "0x40A1": ["LO", "1", "ImageQualityIndicatorMaterial"], "0x40A2": ["LO", "1", "ImageQualityIndicatorSize"], "0x5002": ["IS", "1", "LINACEnergy"], "0x5004": ["IS", "1", "LINACOutput"], "0x5100": ["US", "1", "ActiveAperture"], "0x5101": ["DS", "1", "TotalAperture"], "0x5102": ["DS", "1", "ApertureElevation"], "0x5103": ["DS", "1", "MainLobeAngle"], "0x5104": ["DS", "1", "MainRoofAngle"], "0x5105": ["CS", "1", "ConnectorType"], "0x5106": ["SH", "1", "WedgeModelNumber"], "0x5107": ["DS", "1", "WedgeAngleFloat"], "0x5108": ["DS", "1", "WedgeRoofAngle"], "0x5109": ["CS", "1", "WedgeElement1Position"], "0x510A": ["DS", "1", "WedgeMaterialVelocity"], "0x510B": ["SH", "1", "WedgeMaterial"], "0x510C": ["DS", "1", "WedgeOffsetZ"], "0x510D": ["DS", "1", "WedgeOriginOffsetX"], "0x510E": ["DS", "1", "WedgeTimeDelay"], "0x510F": ["SH", "1", "WedgeName"], "0x5110": ["SH", "1", "WedgeManufacturerName"], "0x5111": ["LO", "1", "WedgeDescription"], "0x5112": ["DS", "1", "NominalBeamAngle"], "0x5113": ["DS", "1", "WedgeOffsetX"], "0x5114": ["DS", "1", "WedgeOffsetY"], "0x5115": ["DS", "1", "WedgeTotalLength"], "0x5116": ["DS", "1", "WedgeInContactLength"], "0x5117": ["DS", "1", "WedgeFrontGap"], "0x5118": ["DS", "1", "WedgeTotalHeight"], "0x5119": ["DS", "1", "WedgeFrontHeight"], "0x511A": ["DS", "1", "WedgeRearHeight"], "0x511B": ["DS", "1", "WedgeTotalWidth"], "0x511C": ["DS", "1", "WedgeInContactWidth"], "0x511D": ["DS", "1", "WedgeChamferHeight"], "0x511E": ["CS", "1", "WedgeCurve"], "0x511F": ["DS", "1", "RadiusAlongWedge"] }, "0x0018": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0010": ["LO", "1", "ContrastBolusAgent"], "0x0012": ["SQ", "1", "ContrastBolusAgentSequence"], "0x0013": ["FL", "1", "ContrastBolusT1Relaxivity"], "0x0014": ["SQ", "1", "ContrastBolusAdministrationRouteSequence"], "0x0015": ["CS", "1", "BodyPartExamined"], "0x0020": ["CS", "1-n", "ScanningSequence"], "0x0021": ["CS", "1-n", "SequenceVariant"], "0x0022": ["CS", "1-n", "ScanOptions"], "0x0023": ["CS", "1", "MRAcquisitionType"], "0x0024": ["SH", "1", "SequenceName"], "0x0025": ["CS", "1", "AngioFlag"], "0x0026": ["SQ", "1", "InterventionDrugInformationSequence"], "0x0027": ["TM", "1", "InterventionDrugStopTime"], "0x0028": ["DS", "1", "InterventionDrugDose"], "0x0029": ["SQ", "1", "InterventionDrugCodeSequence"], "0x002A": ["SQ", "1", "AdditionalDrugSequence"], "0x0030": ["LO", "1-n", "Radionuclide"], "0x0031": ["LO", "1", "Radiopharmaceutical"], "0x0032": ["DS", "1", "EnergyWindowCenterline"], "0x0033": ["DS", "1-n", "EnergyWindowTotalWidth"], "0x0034": ["LO", "1", "InterventionDrugName"], "0x0035": ["TM", "1", "InterventionDrugStartTime"], "0x0036": ["SQ", "1", "InterventionSequence"], "0x0037": ["CS", "1", "TherapyType"], "0x0038": ["CS", "1", "InterventionStatus"], "0x0039": ["CS", "1", "TherapyDescription"], "0x003A": ["ST", "1", "InterventionDescription"], "0x0040": ["IS", "1", "CineRate"], "0x0042": ["CS", "1", "InitialCineRunState"], "0x0050": ["DS", "1", "SliceThickness"], "0x0060": ["DS", "1", "KVP"], "0x0070": ["IS", "1", "CountsAccumulated"], "0x0071": ["CS", "1", "AcquisitionTerminationCondition"], "0x0072": ["DS", "1", "EffectiveDuration"], "0x0073": ["CS", "1", "AcquisitionStartCondition"], "0x0074": ["IS", "1", "AcquisitionStartConditionData"], "0x0075": ["IS", "1", "AcquisitionTerminationConditionData"], "0x0080": ["DS", "1", "RepetitionTime"], "0x0081": ["DS", "1", "EchoTime"], "0x0082": ["DS", "1", "InversionTime"], "0x0083": ["DS", "1", "NumberOfAverages"], "0x0084": ["DS", "1", "ImagingFrequency"], "0x0085": ["SH", "1", "ImagedNucleus"], "0x0086": ["IS", "1-n", "EchoNumbers"], "0x0087": ["DS", "1", "MagneticFieldStrength"], "0x0088": ["DS", "1", "SpacingBetweenSlices"], "0x0089": ["IS", "1", "NumberOfPhaseEncodingSteps"], "0x0090": ["DS", "1", "DataCollectionDiameter"], "0x0091": ["IS", "1", "EchoTrainLength"], "0x0093": ["DS", "1", "PercentSampling"], "0x0094": ["DS", "1", "PercentPhaseFieldOfView"], "0x0095": ["DS", "1", "PixelBandwidth"], "0x1000": ["LO", "1", "DeviceSerialNumber"], "0x1002": ["UI", "1", "DeviceUID"], "0x1003": ["LO", "1", "DeviceID"], "0x1004": ["LO", "1", "PlateID"], "0x1005": ["LO", "1", "GeneratorID"], "0x1006": ["LO", "1", "GridID"], "0x1007": ["LO", "1", "CassetteID"], "0x1008": ["LO", "1", "GantryID"], "0x1010": ["LO", "1", "SecondaryCaptureDeviceID"], "0x1011": ["LO", "1", "HardcopyCreationDeviceID"], "0x1012": ["DA", "1", "DateOfSecondaryCapture"], "0x1014": ["TM", "1", "TimeOfSecondaryCapture"], "0x1016": ["LO", "1", "SecondaryCaptureDeviceManufacturer"], "0x1017": ["LO", "1", "HardcopyDeviceManufacturer"], "0x1018": ["LO", "1", "SecondaryCaptureDeviceManufacturerModelName"], "0x1019": ["LO", "1-n", "SecondaryCaptureDeviceSoftwareVersions"], "0x101A": ["LO", "1-n", "HardcopyDeviceSoftwareVersion"], "0x101B": ["LO", "1", "HardcopyDeviceManufacturerModelName"], "0x1020": ["LO", "1-n", "SoftwareVersions"], "0x1022": ["SH", "1", "VideoImageFormatAcquired"], "0x1023": ["LO", "1", "DigitalImageFormatAcquired"], "0x1030": ["LO", "1", "ProtocolName"], "0x1040": ["LO", "1", "ContrastBolusRoute"], "0x1041": ["DS", "1", "ContrastBolusVolume"], "0x1042": ["TM", "1", "ContrastBolusStartTime"], "0x1043": ["TM", "1", "ContrastBolusStopTime"], "0x1044": ["DS", "1", "ContrastBolusTotalDose"], "0x1045": ["IS", "1", "SyringeCounts"], "0x1046": ["DS", "1-n", "ContrastFlowRate"], "0x1047": ["DS", "1-n", "ContrastFlowDuration"], "0x1048": ["CS", "1", "ContrastBolusIngredient"], "0x1049": ["DS", "1", "ContrastBolusIngredientConcentration"], "0x1050": ["DS", "1", "SpatialResolution"], "0x1060": ["DS", "1", "TriggerTime"], "0x1061": ["LO", "1", "TriggerSourceOrType"], "0x1062": ["IS", "1", "NominalInterval"], "0x1063": ["DS", "1", "FrameTime"], "0x1064": ["LO", "1", "CardiacFramingType"], "0x1065": ["DS", "1-n", "FrameTimeVector"], "0x1066": ["DS", "1", "FrameDelay"], "0x1067": ["DS", "1", "ImageTriggerDelay"], "0x1068": ["DS", "1", "MultiplexGroupTimeOffset"], "0x1069": ["DS", "1", "TriggerTimeOffset"], "0x106A": ["CS", "1", "SynchronizationTrigger"], "0x106C": ["US", "2", "SynchronizationChannel"], "0x106E": ["UL", "1", "TriggerSamplePosition"], "0x1070": ["LO", "1", "RadiopharmaceuticalRoute"], "0x1071": ["DS", "1", "RadiopharmaceuticalVolume"], "0x1072": ["TM", "1", "RadiopharmaceuticalStartTime"], "0x1073": ["TM", "1", "RadiopharmaceuticalStopTime"], "0x1074": ["DS", "1", "RadionuclideTotalDose"], "0x1075": ["DS", "1", "RadionuclideHalfLife"], "0x1076": ["DS", "1", "RadionuclidePositronFraction"], "0x1077": ["DS", "1", "RadiopharmaceuticalSpecificActivity"], "0x1078": ["DT", "1", "RadiopharmaceuticalStartDateTime"], "0x1079": ["DT", "1", "RadiopharmaceuticalStopDateTime"], "0x1080": ["CS", "1", "BeatRejectionFlag"], "0x1081": ["IS", "1", "LowRRValue"], "0x1082": ["IS", "1", "HighRRValue"], "0x1083": ["IS", "1", "IntervalsAcquired"], "0x1084": ["IS", "1", "IntervalsRejected"], "0x1085": ["LO", "1", "PVCRejection"], "0x1086": ["IS", "1", "SkipBeats"], "0x1088": ["IS", "1", "HeartRate"], "0x1090": ["IS", "1", "CardiacNumberOfImages"], "0x1094": ["IS", "1", "TriggerWindow"], "0x1100": ["DS", "1", "ReconstructionDiameter"], "0x1110": ["DS", "1", "DistanceSourceToDetector"], "0x1111": ["DS", "1", "DistanceSourceToPatient"], "0x1114": ["DS", "1", "EstimatedRadiographicMagnificationFactor"], "0x1120": ["DS", "1", "GantryDetectorTilt"], "0x1121": ["DS", "1", "GantryDetectorSlew"], "0x1130": ["DS", "1", "TableHeight"], "0x1131": ["DS", "1", "TableTraverse"], "0x1134": ["CS", "1", "TableMotion"], "0x1135": ["DS", "1-n", "TableVerticalIncrement"], "0x1136": ["DS", "1-n", "TableLateralIncrement"], "0x1137": ["DS", "1-n", "TableLongitudinalIncrement"], "0x1138": ["DS", "1", "TableAngle"], "0x113A": ["CS", "1", "TableType"], "0x1140": ["CS", "1", "RotationDirection"], "0x1141": ["DS", "1", "AngularPosition"], "0x1142": ["DS", "1-n", "RadialPosition"], "0x1143": ["DS", "1", "ScanArc"], "0x1144": ["DS", "1", "AngularStep"], "0x1145": ["DS", "1", "CenterOfRotationOffset"], "0x1146": ["DS", "1-n", "RotationOffset"], "0x1147": ["CS", "1", "FieldOfViewShape"], "0x1149": ["IS", "1-2", "FieldOfViewDimensions"], "0x1150": ["IS", "1", "ExposureTime"], "0x1151": ["IS", "1", "XRayTubeCurrent"], "0x1152": ["IS", "1", "Exposure"], "0x1153": ["IS", "1", "ExposureInuAs"], "0x1154": ["DS", "1", "AveragePulseWidth"], "0x1155": ["CS", "1", "RadiationSetting"], "0x1156": ["CS", "1", "RectificationType"], "0x115A": ["CS", "1", "RadiationMode"], "0x115E": ["DS", "1", "ImageAndFluoroscopyAreaDoseProduct"], "0x1160": ["SH", "1", "FilterType"], "0x1161": ["LO", "1-n", "TypeOfFilters"], "0x1162": ["DS", "1", "IntensifierSize"], "0x1164": ["DS", "2", "ImagerPixelSpacing"], "0x1166": ["CS", "1-n", "Grid"], "0x1170": ["IS", "1", "GeneratorPower"], "0x1180": ["SH", "1", "CollimatorGridName"], "0x1181": ["CS", "1", "CollimatorType"], "0x1182": ["IS", "1-2", "FocalDistance"], "0x1183": ["DS", "1-2", "XFocusCenter"], "0x1184": ["DS", "1-2", "YFocusCenter"], "0x1190": ["DS", "1-n", "FocalSpots"], "0x1191": ["CS", "1", "AnodeTargetMaterial"], "0x11A0": ["DS", "1", "BodyPartThickness"], "0x11A2": ["DS", "1", "CompressionForce"], "0x11A4": ["LO", "1", "PaddleDescription"], "0x1200": ["DA", "1-n", "DateOfLastCalibration"], "0x1201": ["TM", "1-n", "TimeOfLastCalibration"], "0x1202": ["DT", "1", "DateTimeOfLastCalibration"], "0x1210": ["SH", "1-n", "ConvolutionKernel"], "0x1240": ["IS", "1-n", "UpperLowerPixelValues"], "0x1242": ["IS", "1", "ActualFrameDuration"], "0x1243": ["IS", "1", "CountRate"], "0x1244": ["US", "1", "PreferredPlaybackSequencing"], "0x1250": ["SH", "1", "ReceiveCoilName"], "0x1251": ["SH", "1", "TransmitCoilName"], "0x1260": ["SH", "1", "PlateType"], "0x1261": ["LO", "1", "PhosphorType"], "0x1300": ["DS", "1", "ScanVelocity"], "0x1301": ["CS", "1-n", "WholeBodyTechnique"], "0x1302": ["IS", "1", "ScanLength"], "0x1310": ["US", "4", "AcquisitionMatrix"], "0x1312": ["CS", "1", "InPlanePhaseEncodingDirection"], "0x1314": ["DS", "1", "FlipAngle"], "0x1315": ["CS", "1", "VariableFlipAngleFlag"], "0x1316": ["DS", "1", "SAR"], "0x1318": ["DS", "1", "dBdt"], "0x1400": ["LO", "1", "AcquisitionDeviceProcessingDescription"], "0x1401": ["LO", "1", "AcquisitionDeviceProcessingCode"], "0x1402": ["CS", "1", "CassetteOrientation"], "0x1403": ["CS", "1", "CassetteSize"], "0x1404": ["US", "1", "ExposuresOnPlate"], "0x1405": ["IS", "1", "RelativeXRayExposure"], "0x1411": ["DS", "1", "ExposureIndex"], "0x1412": ["DS", "1", "TargetExposureIndex"], "0x1413": ["DS", "1", "DeviationIndex"], "0x1450": ["DS", "1", "ColumnAngulation"], "0x1460": ["DS", "1", "TomoLayerHeight"], "0x1470": ["DS", "1", "TomoAngle"], "0x1480": ["DS", "1", "TomoTime"], "0x1490": ["CS", "1", "TomoType"], "0x1491": ["CS", "1", "TomoClass"], "0x1495": ["IS", "1", "NumberOfTomosynthesisSourceImages"], "0x1500": ["CS", "1", "PositionerMotion"], "0x1508": ["CS", "1", "PositionerType"], "0x1510": ["DS", "1", "PositionerPrimaryAngle"], "0x1511": ["DS", "1", "PositionerSecondaryAngle"], "0x1520": ["DS", "1-n", "PositionerPrimaryAngleIncrement"], "0x1521": ["DS", "1-n", "PositionerSecondaryAngleIncrement"], "0x1530": ["DS", "1", "DetectorPrimaryAngle"], "0x1531": ["DS", "1", "DetectorSecondaryAngle"], "0x1600": ["CS", "1-3", "ShutterShape"], "0x1602": ["IS", "1", "ShutterLeftVerticalEdge"], "0x1604": ["IS", "1", "ShutterRightVerticalEdge"], "0x1606": ["IS", "1", "ShutterUpperHorizontalEdge"], "0x1608": ["IS", "1", "ShutterLowerHorizontalEdge"], "0x1610": ["IS", "2", "CenterOfCircularShutter"], "0x1612": ["IS", "1", "RadiusOfCircularShutter"], "0x1620": ["IS", "2-2n", "VerticesOfThePolygonalShutter"], "0x1622": ["US", "1", "ShutterPresentationValue"], "0x1623": ["US", "1", "ShutterOverlayGroup"], "0x1624": ["US", "3", "ShutterPresentationColorCIELabValue"], "0x1700": ["CS", "1-3", "CollimatorShape"], "0x1702": ["IS", "1", "CollimatorLeftVerticalEdge"], "0x1704": ["IS", "1", "CollimatorRightVerticalEdge"], "0x1706": ["IS", "1", "CollimatorUpperHorizontalEdge"], "0x1708": ["IS", "1", "CollimatorLowerHorizontalEdge"], "0x1710": ["IS", "2", "CenterOfCircularCollimator"], "0x1712": ["IS", "1", "RadiusOfCircularCollimator"], "0x1720": ["IS", "2-2n", "VerticesOfThePolygonalCollimator"], "0x1800": ["CS", "1", "AcquisitionTimeSynchronized"], "0x1801": ["SH", "1", "TimeSource"], "0x1802": ["CS", "1", "TimeDistributionProtocol"], "0x1803": ["LO", "1", "NTPSourceAddress"], "0x2001": ["IS", "1-n", "PageNumberVector"], "0x2002": ["SH", "1-n", "FrameLabelVector"], "0x2003": ["DS", "1-n", "FramePrimaryAngleVector"], "0x2004": ["DS", "1-n", "FrameSecondaryAngleVector"], "0x2005": ["DS", "1-n", "SliceLocationVector"], "0x2006": ["SH", "1-n", "DisplayWindowLabelVector"], "0x2010": ["DS", "2", "NominalScannedPixelSpacing"], "0x2020": ["CS", "1", "DigitizingDeviceTransportDirection"], "0x2030": ["DS", "1", "RotationOfScannedFilm"], "0x2041": ["SQ", "1", "BiopsyTargetSequence"], "0x2042": ["UI", "1", "TargetUID"], "0x2043": ["FL", "2", "LocalizingCursorPosition"], "0x2044": ["FL", "3", "CalculatedTargetPosition"], "0x2045": ["SH", "1", "TargetLabel"], "0x2046": ["FL", "1", "DisplayedZValue"], "0x3100": ["CS", "1", "IVUSAcquisition"], "0x3101": ["DS", "1", "IVUSPullbackRate"], "0x3102": ["DS", "1", "IVUSGatedRate"], "0x3103": ["IS", "1", "IVUSPullbackStartFrameNumber"], "0x3104": ["IS", "1", "IVUSPullbackStopFrameNumber"], "0x3105": ["IS", "1-n", "LesionNumber"], "0x4000": ["LT", "1", "AcquisitionComments"], "0x5000": ["SH", "1-n", "OutputPower"], "0x5010": ["LO", "1-n", "TransducerData"], "0x5012": ["DS", "1", "FocusDepth"], "0x5020": ["LO", "1", "ProcessingFunction"], "0x5021": ["LO", "1", "PostprocessingFunction"], "0x5022": ["DS", "1", "MechanicalIndex"], "0x5024": ["DS", "1", "BoneThermalIndex"], "0x5026": ["DS", "1", "CranialThermalIndex"], "0x5027": ["DS", "1", "SoftTissueThermalIndex"], "0x5028": ["DS", "1", "SoftTissueFocusThermalIndex"], "0x5029": ["DS", "1", "SoftTissueSurfaceThermalIndex"], "0x5030": ["DS", "1", "DynamicRange"], "0x5040": ["DS", "1", "TotalGain"], "0x5050": ["IS", "1", "DepthOfScanField"], "0x5100": ["CS", "1", "PatientPosition"], "0x5101": ["CS", "1", "ViewPosition"], "0x5104": ["SQ", "1", "ProjectionEponymousNameCodeSequence"], "0x5210": ["DS", "6", "ImageTransformationMatrix"], "0x5212": ["DS", "3", "ImageTranslationVector"], "0x6000": ["DS", "1", "Sensitivity"], "0x6011": ["SQ", "1", "SequenceOfUltrasoundRegions"], "0x6012": ["US", "1", "RegionSpatialFormat"], "0x6014": ["US", "1", "RegionDataType"], "0x6016": ["UL", "1", "RegionFlags"], "0x6018": ["UL", "1", "RegionLocationMinX0"], "0x601A": ["UL", "1", "RegionLocationMinY0"], "0x601C": ["UL", "1", "RegionLocationMaxX1"], "0x601E": ["UL", "1", "RegionLocationMaxY1"], "0x6020": ["SL", "1", "ReferencePixelX0"], "0x6022": ["SL", "1", "ReferencePixelY0"], "0x6024": ["US", "1", "PhysicalUnitsXDirection"], "0x6026": ["US", "1", "PhysicalUnitsYDirection"], "0x6028": ["FD", "1", "ReferencePixelPhysicalValueX"], "0x602A": ["FD", "1", "ReferencePixelPhysicalValueY"], "0x602C": ["FD", "1", "PhysicalDeltaX"], "0x602E": ["FD", "1", "PhysicalDeltaY"], "0x6030": ["UL", "1", "TransducerFrequency"], "0x6031": ["CS", "1", "TransducerType"], "0x6032": ["UL", "1", "PulseRepetitionFrequency"], "0x6034": ["FD", "1", "DopplerCorrectionAngle"], "0x6036": ["FD", "1", "SteeringAngle"], "0x6038": ["UL", "1", "DopplerSampleVolumeXPositionRetired"], "0x6039": ["SL", "1", "DopplerSampleVolumeXPosition"], "0x603A": ["UL", "1", "DopplerSampleVolumeYPositionRetired"], "0x603B": ["SL", "1", "DopplerSampleVolumeYPosition"], "0x603C": ["UL", "1", "TMLinePositionX0Retired"], "0x603D": ["SL", "1", "TMLinePositionX0"], "0x603E": ["UL", "1", "TMLinePositionY0Retired"], "0x603F": ["SL", "1", "TMLinePositionY0"], "0x6040": ["UL", "1", "TMLinePositionX1Retired"], "0x6041": ["SL", "1", "TMLinePositionX1"], "0x6042": ["UL", "1", "TMLinePositionY1Retired"], "0x6043": ["SL", "1", "TMLinePositionY1"], "0x6044": ["US", "1", "PixelComponentOrganization"], "0x6046": ["UL", "1", "PixelComponentMask"], "0x6048": ["UL", "1", "PixelComponentRangeStart"], "0x604A": ["UL", "1", "PixelComponentRangeStop"], "0x604C": ["US", "1", "PixelComponentPhysicalUnits"], "0x604E": ["US", "1", "PixelComponentDataType"], "0x6050": ["UL", "1", "NumberOfTableBreakPoints"], "0x6052": ["UL", "1-n", "TableOfXBreakPoints"], "0x6054": ["FD", "1-n", "TableOfYBreakPoints"], "0x6056": ["UL", "1", "NumberOfTableEntries"], "0x6058": ["UL", "1-n", "TableOfPixelValues"], "0x605A": ["FL", "1-n", "TableOfParameterValues"], "0x6060": ["FL", "1-n", "RWaveTimeVector"], "0x7000": ["CS", "1", "DetectorConditionsNominalFlag"], "0x7001": ["DS", "1", "DetectorTemperature"], "0x7004": ["CS", "1", "DetectorType"], "0x7005": ["CS", "1", "DetectorConfiguration"], "0x7006": ["LT", "1", "DetectorDescription"], "0x7008": ["LT", "1", "DetectorMode"], "0x700A": ["SH", "1", "DetectorID"], "0x700C": ["DA", "1", "DateOfLastDetectorCalibration"], "0x700E": ["TM", "1", "TimeOfLastDetectorCalibration"], "0x7010": ["IS", "1", "ExposuresOnDetectorSinceLastCalibration"], "0x7011": ["IS", "1", "ExposuresOnDetectorSinceManufactured"], "0x7012": ["DS", "1", "DetectorTimeSinceLastExposure"], "0x7014": ["DS", "1", "DetectorActiveTime"], "0x7016": ["DS", "1", "DetectorActivationOffsetFromExposure"], "0x701A": ["DS", "2", "DetectorBinning"], "0x7020": ["DS", "2", "DetectorElementPhysicalSize"], "0x7022": ["DS", "2", "DetectorElementSpacing"], "0x7024": ["CS", "1", "DetectorActiveShape"], "0x7026": ["DS", "1-2", "DetectorActiveDimensions"], "0x7028": ["DS", "2", "DetectorActiveOrigin"], "0x702A": ["LO", "1", "DetectorManufacturerName"], "0x702B": ["LO", "1", "DetectorManufacturerModelName"], "0x7030": ["DS", "2", "FieldOfViewOrigin"], "0x7032": ["DS", "1", "FieldOfViewRotation"], "0x7034": ["CS", "1", "FieldOfViewHorizontalFlip"], "0x7036": ["FL", "2", "PixelDataAreaOriginRelativeToFOV"], "0x7038": ["FL", "1", "PixelDataAreaRotationAngleRelativeToFOV"], "0x7040": ["LT", "1", "GridAbsorbingMaterial"], "0x7041": ["LT", "1", "GridSpacingMaterial"], "0x7042": ["DS", "1", "GridThickness"], "0x7044": ["DS", "1", "GridPitch"], "0x7046": ["IS", "2", "GridAspectRatio"], "0x7048": ["DS", "1", "GridPeriod"], "0x704C": ["DS", "1", "GridFocalDistance"], "0x7050": ["CS", "1-n", "FilterMaterial"], "0x7052": ["DS", "1-n", "FilterThicknessMinimum"], "0x7054": ["DS", "1-n", "FilterThicknessMaximum"], "0x7056": ["FL", "1-n", "FilterBeamPathLengthMinimum"], "0x7058": ["FL", "1-n", "FilterBeamPathLengthMaximum"], "0x7060": ["CS", "1", "ExposureControlMode"], "0x7062": ["LT", "1", "ExposureControlModeDescription"], "0x7064": ["CS", "1", "ExposureStatus"], "0x7065": ["DS", "1", "PhototimerSetting"], "0x8150": ["DS", "1", "ExposureTimeInuS"], "0x8151": ["DS", "1", "XRayTubeCurrentInuA"], "0x9004": ["CS", "1", "ContentQualification"], "0x9005": ["SH", "1", "PulseSequenceName"], "0x9006": ["SQ", "1", "MRImagingModifierSequence"], "0x9008": ["CS", "1", "EchoPulseSequence"], "0x9009": ["CS", "1", "InversionRecovery"], "0x9010": ["CS", "1", "FlowCompensation"], "0x9011": ["CS", "1", "MultipleSpinEcho"], "0x9012": ["CS", "1", "MultiPlanarExcitation"], "0x9014": ["CS", "1", "PhaseContrast"], "0x9015": ["CS", "1", "TimeOfFlightContrast"], "0x9016": ["CS", "1", "Spoiling"], "0x9017": ["CS", "1", "SteadyStatePulseSequence"], "0x9018": ["CS", "1", "EchoPlanarPulseSequence"], "0x9019": ["FD", "1", "TagAngleFirstAxis"], "0x9020": ["CS", "1", "MagnetizationTransfer"], "0x9021": ["CS", "1", "T2Preparation"], "0x9022": ["CS", "1", "BloodSignalNulling"], "0x9024": ["CS", "1", "SaturationRecovery"], "0x9025": ["CS", "1", "SpectrallySelectedSuppression"], "0x9026": ["CS", "1", "SpectrallySelectedExcitation"], "0x9027": ["CS", "1", "SpatialPresaturation"], "0x9028": ["CS", "1", "Tagging"], "0x9029": ["CS", "1", "OversamplingPhase"], "0x9030": ["FD", "1", "TagSpacingFirstDimension"], "0x9032": ["CS", "1", "GeometryOfKSpaceTraversal"], "0x9033": ["CS", "1", "SegmentedKSpaceTraversal"], "0x9034": ["CS", "1", "RectilinearPhaseEncodeReordering"], "0x9035": ["FD", "1", "TagThickness"], "0x9036": ["CS", "1", "PartialFourierDirection"], "0x9037": ["CS", "1", "CardiacSynchronizationTechnique"], "0x9041": ["LO", "1", "ReceiveCoilManufacturerName"], "0x9042": ["SQ", "1", "MRReceiveCoilSequence"], "0x9043": ["CS", "1", "ReceiveCoilType"], "0x9044": ["CS", "1", "QuadratureReceiveCoil"], "0x9045": ["SQ", "1", "MultiCoilDefinitionSequence"], "0x9046": ["LO", "1", "MultiCoilConfiguration"], "0x9047": ["SH", "1", "MultiCoilElementName"], "0x9048": ["CS", "1", "MultiCoilElementUsed"], "0x9049": ["SQ", "1", "MRTransmitCoilSequence"], "0x9050": ["LO", "1", "TransmitCoilManufacturerName"], "0x9051": ["CS", "1", "TransmitCoilType"], "0x9052": ["FD", "1-2", "SpectralWidth"], "0x9053": ["FD", "1-2", "ChemicalShiftReference"], "0x9054": ["CS", "1", "VolumeLocalizationTechnique"], "0x9058": ["US", "1", "MRAcquisitionFrequencyEncodingSteps"], "0x9059": ["CS", "1", "Decoupling"], "0x9060": ["CS", "1-2", "DecoupledNucleus"], "0x9061": ["FD", "1-2", "DecouplingFrequency"], "0x9062": ["CS", "1", "DecouplingMethod"], "0x9063": ["FD", "1-2", "DecouplingChemicalShiftReference"], "0x9064": ["CS", "1", "KSpaceFiltering"], "0x9065": ["CS", "1-2", "TimeDomainFiltering"], "0x9066": ["US", "1-2", "NumberOfZeroFills"], "0x9067": ["CS", "1", "BaselineCorrection"], "0x9069": ["FD", "1", "ParallelReductionFactorInPlane"], "0x9070": ["FD", "1", "CardiacRRIntervalSpecified"], "0x9073": ["FD", "1", "AcquisitionDuration"], "0x9074": ["DT", "1", "FrameAcquisitionDateTime"], "0x9075": ["CS", "1", "DiffusionDirectionality"], "0x9076": ["SQ", "1", "DiffusionGradientDirectionSequence"], "0x9077": ["CS", "1", "ParallelAcquisition"], "0x9078": ["CS", "1", "ParallelAcquisitionTechnique"], "0x9079": ["FD", "1-n", "InversionTimes"], "0x9080": ["ST", "1", "MetaboliteMapDescription"], "0x9081": ["CS", "1", "PartialFourier"], "0x9082": ["FD", "1", "EffectiveEchoTime"], "0x9083": ["SQ", "1", "MetaboliteMapCodeSequence"], "0x9084": ["SQ", "1", "ChemicalShiftSequence"], "0x9085": ["CS", "1", "CardiacSignalSource"], "0x9087": ["FD", "1", "DiffusionBValue"], "0x9089": ["FD", "3", "DiffusionGradientOrientation"], "0x9090": ["FD", "3", "VelocityEncodingDirection"], "0x9091": ["FD", "1", "VelocityEncodingMinimumValue"], "0x9092": ["SQ", "1", "VelocityEncodingAcquisitionSequence"], "0x9093": ["US", "1", "NumberOfKSpaceTrajectories"], "0x9094": ["CS", "1", "CoverageOfKSpace"], "0x9095": ["UL", "1", "SpectroscopyAcquisitionPhaseRows"], "0x9096": ["FD", "1", "ParallelReductionFactorInPlaneRetired"], "0x9098": ["FD", "1-2", "TransmitterFrequency"], "0x9100": ["CS", "1-2", "ResonantNucleus"], "0x9101": ["CS", "1", "FrequencyCorrection"], "0x9103": ["SQ", "1", "MRSpectroscopyFOVGeometrySequence"], "0x9104": ["FD", "1", "SlabThickness"], "0x9105": ["FD", "3", "SlabOrientation"], "0x9106": ["FD", "3", "MidSlabPosition"], "0x9107": ["SQ", "1", "MRSpatialSaturationSequence"], "0x9112": ["SQ", "1", "MRTimingAndRelatedParametersSequence"], "0x9114": ["SQ", "1", "MREchoSequence"], "0x9115": ["SQ", "1", "MRModifierSequence"], "0x9117": ["SQ", "1", "MRDiffusionSequence"], "0x9118": ["SQ", "1", "CardiacSynchronizationSequence"], "0x9119": ["SQ", "1", "MRAveragesSequence"], "0x9125": ["SQ", "1", "MRFOVGeometrySequence"], "0x9126": ["SQ", "1", "VolumeLocalizationSequence"], "0x9127": ["UL", "1", "SpectroscopyAcquisitionDataColumns"], "0x9147": ["CS", "1", "DiffusionAnisotropyType"], "0x9151": ["DT", "1", "FrameReferenceDateTime"], "0x9152": ["SQ", "1", "MRMetaboliteMapSequence"], "0x9155": ["FD", "1", "ParallelReductionFactorOutOfPlane"], "0x9159": ["UL", "1", "SpectroscopyAcquisitionOutOfPlanePhaseSteps"], "0x9166": ["CS", "1", "BulkMotionStatus"], "0x9168": ["FD", "1", "ParallelReductionFactorSecondInPlane"], "0x9169": ["CS", "1", "CardiacBeatRejectionTechnique"], "0x9170": ["CS", "1", "RespiratoryMotionCompensationTechnique"], "0x9171": ["CS", "1", "RespiratorySignalSource"], "0x9172": ["CS", "1", "BulkMotionCompensationTechnique"], "0x9173": ["CS", "1", "BulkMotionSignalSource"], "0x9174": ["CS", "1", "ApplicableSafetyStandardAgency"], "0x9175": ["LO", "1", "ApplicableSafetyStandardDescription"], "0x9176": ["SQ", "1", "OperatingModeSequence"], "0x9177": ["CS", "1", "OperatingModeType"], "0x9178": ["CS", "1", "OperatingMode"], "0x9179": ["CS", "1", "SpecificAbsorptionRateDefinition"], "0x9180": ["CS", "1", "GradientOutputType"], "0x9181": ["FD", "1", "SpecificAbsorptionRateValue"], "0x9182": ["FD", "1", "GradientOutput"], "0x9183": ["CS", "1", "FlowCompensationDirection"], "0x9184": ["FD", "1", "TaggingDelay"], "0x9185": ["ST", "1", "RespiratoryMotionCompensationTechniqueDescription"], "0x9186": ["SH", "1", "RespiratorySignalSourceID"], "0x9195": ["FD", "1", "ChemicalShiftMinimumIntegrationLimitInHz"], "0x9196": ["FD", "1", "ChemicalShiftMaximumIntegrationLimitInHz"], "0x9197": ["SQ", "1", "MRVelocityEncodingSequence"], "0x9198": ["CS", "1", "FirstOrderPhaseCorrection"], "0x9199": ["CS", "1", "WaterReferencedPhaseCorrection"], "0x9200": ["CS", "1", "MRSpectroscopyAcquisitionType"], "0x9214": ["CS", "1", "RespiratoryCyclePosition"], "0x9217": ["FD", "1", "VelocityEncodingMaximumValue"], "0x9218": ["FD", "1", "TagSpacingSecondDimension"], "0x9219": ["SS", "1", "TagAngleSecondAxis"], "0x9220": ["FD", "1", "FrameAcquisitionDuration"], "0x9226": ["SQ", "1", "MRImageFrameTypeSequence"], "0x9227": ["SQ", "1", "MRSpectroscopyFrameTypeSequence"], "0x9231": ["US", "1", "MRAcquisitionPhaseEncodingStepsInPlane"], "0x9232": ["US", "1", "MRAcquisitionPhaseEncodingStepsOutOfPlane"], "0x9234": ["UL", "1", "SpectroscopyAcquisitionPhaseColumns"], "0x9236": ["CS", "1", "CardiacCyclePosition"], "0x9239": ["SQ", "1", "SpecificAbsorptionRateSequence"], "0x9240": ["US", "1", "RFEchoTrainLength"], "0x9241": ["US", "1", "GradientEchoTrainLength"], "0x9250": ["CS", "1", "ArterialSpinLabelingContrast"], "0x9251": ["SQ", "1", "MRArterialSpinLabelingSequence"], "0x9252": ["LO", "1", "ASLTechniqueDescription"], "0x9253": ["US", "1", "ASLSlabNumber"], "0x9254": ["FD", "1", "ASLSlabThickness"], "0x9255": ["FD", "3", "ASLSlabOrientation"], "0x9256": ["FD", "3", "ASLMidSlabPosition"], "0x9257": ["CS", "1", "ASLContext"], "0x9258": ["UL", "1", "ASLPulseTrainDuration"], "0x9259": ["CS", "1", "ASLCrusherFlag"], "0x925A": ["FD", "1", "ASLCrusherFlowLimit"], "0x925B": ["LO", "1", "ASLCrusherDescription"], "0x925C": ["CS", "1", "ASLBolusCutoffFlag"], "0x925D": ["SQ", "1", "ASLBolusCutoffTimingSequence"], "0x925E": ["LO", "1", "ASLBolusCutoffTechnique"], "0x925F": ["UL", "1", "ASLBolusCutoffDelayTime"], "0x9260": ["SQ", "1", "ASLSlabSequence"], "0x9295": ["FD", "1", "ChemicalShiftMinimumIntegrationLimitInppm"], "0x9296": ["FD", "1", "ChemicalShiftMaximumIntegrationLimitInppm"], "0x9297": ["CS", "1", "WaterReferenceAcquisition"], "0x9298": ["IS", "1", "EchoPeakPosition"], "0x9301": ["SQ", "1", "CTAcquisitionTypeSequence"], "0x9302": ["CS", "1", "AcquisitionType"], "0x9303": ["FD", "1", "TubeAngle"], "0x9304": ["SQ", "1", "CTAcquisitionDetailsSequence"], "0x9305": ["FD", "1", "RevolutionTime"], "0x9306": ["FD", "1", "SingleCollimationWidth"], "0x9307": ["FD", "1", "TotalCollimationWidth"], "0x9308": ["SQ", "1", "CTTableDynamicsSequence"], "0x9309": ["FD", "1", "TableSpeed"], "0x9310": ["FD", "1", "TableFeedPerRotation"], "0x9311": ["FD", "1", "SpiralPitchFactor"], "0x9312": ["SQ", "1", "CTGeometrySequence"], "0x9313": ["FD", "3", "DataCollectionCenterPatient"], "0x9314": ["SQ", "1", "CTReconstructionSequence"], "0x9315": ["CS", "1", "ReconstructionAlgorithm"], "0x9316": ["CS", "1", "ConvolutionKernelGroup"], "0x9317": ["FD", "2", "ReconstructionFieldOfView"], "0x9318": ["FD", "3", "ReconstructionTargetCenterPatient"], "0x9319": ["FD", "1", "ReconstructionAngle"], "0x9320": ["SH", "1", "ImageFilter"], "0x9321": ["SQ", "1", "CTExposureSequence"], "0x9322": ["FD", "2", "ReconstructionPixelSpacing"], "0x9323": ["CS", "1", "ExposureModulationType"], "0x9324": ["FD", "1", "EstimatedDoseSaving"], "0x9325": ["SQ", "1", "CTXRayDetailsSequence"], "0x9326": ["SQ", "1", "CTPositionSequence"], "0x9327": ["FD", "1", "TablePosition"], "0x9328": ["FD", "1", "ExposureTimeInms"], "0x9329": ["SQ", "1", "CTImageFrameTypeSequence"], "0x9330": ["FD", "1", "XRayTubeCurrentInmA"], "0x9332": ["FD", "1", "ExposureInmAs"], "0x9333": ["CS", "1", "ConstantVolumeFlag"], "0x9334": ["CS", "1", "FluoroscopyFlag"], "0x9335": ["FD", "1", "DistanceSourceToDataCollectionCenter"], "0x9337": ["US", "1", "ContrastBolusAgentNumber"], "0x9338": ["SQ", "1", "ContrastBolusIngredientCodeSequence"], "0x9340": ["SQ", "1", "ContrastAdministrationProfileSequence"], "0x9341": ["SQ", "1", "ContrastBolusUsageSequence"], "0x9342": ["CS", "1", "ContrastBolusAgentAdministered"], "0x9343": ["CS", "1", "ContrastBolusAgentDetected"], "0x9344": ["CS", "1", "ContrastBolusAgentPhase"], "0x9345": ["FD", "1", "CTDIvol"], "0x9346": ["SQ", "1", "CTDIPhantomTypeCodeSequence"], "0x9351": ["FL", "1", "CalciumScoringMassFactorPatient"], "0x9352": ["FL", "3", "CalciumScoringMassFactorDevice"], "0x9353": ["FL", "1", "EnergyWeightingFactor"], "0x9360": ["SQ", "1", "CTAdditionalXRaySourceSequence"], "0x9401": ["SQ", "1", "ProjectionPixelCalibrationSequence"], "0x9402": ["FL", "1", "DistanceSourceToIsocenter"], "0x9403": ["FL", "1", "DistanceObjectToTableTop"], "0x9404": ["FL", "2", "ObjectPixelSpacingInCenterOfBeam"], "0x9405": ["SQ", "1", "PositionerPositionSequence"], "0x9406": ["SQ", "1", "TablePositionSequence"], "0x9407": ["SQ", "1", "CollimatorShapeSequence"], "0x9410": ["CS", "1", "PlanesInAcquisition"], "0x9412": ["SQ", "1", "XAXRFFrameCharacteristicsSequence"], "0x9417": ["SQ", "1", "FrameAcquisitionSequence"], "0x9420": ["CS", "1", "XRayReceptorType"], "0x9423": ["LO", "1", "AcquisitionProtocolName"], "0x9424": ["LT", "1", "AcquisitionProtocolDescription"], "0x9425": ["CS", "1", "ContrastBolusIngredientOpaque"], "0x9426": ["FL", "1", "DistanceReceptorPlaneToDetectorHousing"], "0x9427": ["CS", "1", "IntensifierActiveShape"], "0x9428": ["FL", "1-2", "IntensifierActiveDimensions"], "0x9429": ["FL", "2", "PhysicalDetectorSize"], "0x9430": ["FL", "2", "PositionOfIsocenterProjection"], "0x9432": ["SQ", "1", "FieldOfViewSequence"], "0x9433": ["LO", "1", "FieldOfViewDescription"], "0x9434": ["SQ", "1", "ExposureControlSensingRegionsSequence"], "0x9435": ["CS", "1", "ExposureControlSensingRegionShape"], "0x9436": ["SS", "1", "ExposureControlSensingRegionLeftVerticalEdge"], "0x9437": ["SS", "1", "ExposureControlSensingRegionRightVerticalEdge"], "0x9438": ["SS", "1", "ExposureControlSensingRegionUpperHorizontalEdge"], "0x9439": ["SS", "1", "ExposureControlSensingRegionLowerHorizontalEdge"], "0x9440": ["SS", "2", "CenterOfCircularExposureControlSensingRegion"], "0x9441": ["US", "1", "RadiusOfCircularExposureControlSensingRegion"], "0x9442": ["SS", "2-n", "VerticesOfThePolygonalExposureControlSensingRegion"], "0x9445": ["", "", ""], "0x9447": ["FL", "1", "ColumnAngulationPatient"], "0x9449": ["FL", "1", "BeamAngle"], "0x9451": ["SQ", "1", "FrameDetectorParametersSequence"], "0x9452": ["FL", "1", "CalculatedAnatomyThickness"], "0x9455": ["SQ", "1", "CalibrationSequence"], "0x9456": ["SQ", "1", "ObjectThicknessSequence"], "0x9457": ["CS", "1", "PlaneIdentification"], "0x9461": ["FL", "1-2", "FieldOfViewDimensionsInFloat"], "0x9462": ["SQ", "1", "IsocenterReferenceSystemSequence"], "0x9463": ["FL", "1", "PositionerIsocenterPrimaryAngle"], "0x9464": ["FL", "1", "PositionerIsocenterSecondaryAngle"], "0x9465": ["FL", "1", "PositionerIsocenterDetectorRotationAngle"], "0x9466": ["FL", "1", "TableXPositionToIsocenter"], "0x9467": ["FL", "1", "TableYPositionToIsocenter"], "0x9468": ["FL", "1", "TableZPositionToIsocenter"], "0x9469": ["FL", "1", "TableHorizontalRotationAngle"], "0x9470": ["FL", "1", "TableHeadTiltAngle"], "0x9471": ["FL", "1", "TableCradleTiltAngle"], "0x9472": ["SQ", "1", "FrameDisplayShutterSequence"], "0x9473": ["FL", "1", "AcquiredImageAreaDoseProduct"], "0x9474": ["CS", "1", "CArmPositionerTabletopRelationship"], "0x9476": ["SQ", "1", "XRayGeometrySequence"], "0x9477": ["SQ", "1", "IrradiationEventIdentificationSequence"], "0x9504": ["SQ", "1", "XRay3DFrameTypeSequence"], "0x9506": ["SQ", "1", "ContributingSourcesSequence"], "0x9507": ["SQ", "1", "XRay3DAcquisitionSequence"], "0x9508": ["FL", "1", "PrimaryPositionerScanArc"], "0x9509": ["FL", "1", "SecondaryPositionerScanArc"], "0x9510": ["FL", "1", "PrimaryPositionerScanStartAngle"], "0x9511": ["FL", "1", "SecondaryPositionerScanStartAngle"], "0x9514": ["FL", "1", "PrimaryPositionerIncrement"], "0x9515": ["FL", "1", "SecondaryPositionerIncrement"], "0x9516": ["DT", "1", "StartAcquisitionDateTime"], "0x9517": ["DT", "1", "EndAcquisitionDateTime"], "0x9518": ["SS", "1", "PrimaryPositionerIncrementSign"], "0x9519": ["SS", "1", "SecondaryPositionerIncrementSign"], "0x9524": ["LO", "1", "ApplicationName"], "0x9525": ["LO", "1", "ApplicationVersion"], "0x9526": ["LO", "1", "ApplicationManufacturer"], "0x9527": ["CS", "1", "AlgorithmType"], "0x9528": ["LO", "1", "AlgorithmDescription"], "0x9530": ["SQ", "1", "XRay3DReconstructionSequence"], "0x9531": ["LO", "1", "ReconstructionDescription"], "0x9538": ["SQ", "1", "PerProjectionAcquisitionSequence"], "0x9541": ["SQ", "1", "DetectorPositionSequence"], "0x9542": ["SQ", "1", "XRayAcquisitionDoseSequence"], "0x9543": ["FD", "1", "XRaySourceIsocenterPrimaryAngle"], "0x9544": ["FD", "1", "XRaySourceIsocenterSecondaryAngle"], "0x9545": ["FD", "1", "BreastSupportIsocenterPrimaryAngle"], "0x9546": ["FD", "1", "BreastSupportIsocenterSecondaryAngle"], "0x9547": ["FD", "1", "BreastSupportXPositionToIsocenter"], "0x9548": ["FD", "1", "BreastSupportYPositionToIsocenter"], "0x9549": ["FD", "1", "BreastSupportZPositionToIsocenter"], "0x9550": ["FD", "1", "DetectorIsocenterPrimaryAngle"], "0x9551": ["FD", "1", "DetectorIsocenterSecondaryAngle"], "0x9552": ["FD", "1", "DetectorXPositionToIsocenter"], "0x9553": ["FD", "1", "DetectorYPositionToIsocenter"], "0x9554": ["FD", "1", "DetectorZPositionToIsocenter"], "0x9555": ["SQ", "1", "XRayGridSequence"], "0x9556": ["SQ", "1", "XRayFilterSequence"], "0x9557": ["FD", "3", "DetectorActiveAreaTLHCPosition"], "0x9558": ["FD", "6", "DetectorActiveAreaOrientation"], "0x9559": ["CS", "1", "PositionerPrimaryAngleDirection"], "0x9601": ["SQ", "1", "DiffusionBMatrixSequence"], "0x9602": ["FD", "1", "DiffusionBValueXX"], "0x9603": ["FD", "1", "DiffusionBValueXY"], "0x9604": ["FD", "1", "DiffusionBValueXZ"], "0x9605": ["FD", "1", "DiffusionBValueYY"], "0x9606": ["FD", "1", "DiffusionBValueYZ"], "0x9607": ["FD", "1", "DiffusionBValueZZ"], "0x9701": ["DT", "1", "DecayCorrectionDateTime"], "0x9715": ["FD", "1", "StartDensityThreshold"], "0x9716": ["FD", "1", "StartRelativeDensityDifferenceThreshold"], "0x9717": ["FD", "1", "StartCardiacTriggerCountThreshold"], "0x9718": ["FD", "1", "StartRespiratoryTriggerCountThreshold"], "0x9719": ["FD", "1", "TerminationCountsThreshold"], "0x9720": ["FD", "1", "TerminationDensityThreshold"], "0x9721": ["FD", "1", "TerminationRelativeDensityThreshold"], "0x9722": ["FD", "1", "TerminationTimeThreshold"], "0x9723": ["FD", "1", "TerminationCardiacTriggerCountThreshold"], "0x9724": ["FD", "1", "TerminationRespiratoryTriggerCountThreshold"], "0x9725": ["CS", "1", "DetectorGeometry"], "0x9726": ["FD", "1", "TransverseDetectorSeparation"], "0x9727": ["FD", "1", "AxialDetectorDimension"], "0x9729": ["US", "1", "RadiopharmaceuticalAgentNumber"], "0x9732": ["SQ", "1", "PETFrameAcquisitionSequence"], "0x9733": ["SQ", "1", "PETDetectorMotionDetailsSequence"], "0x9734": ["SQ", "1", "PETTableDynamicsSequence"], "0x9735": ["SQ", "1", "PETPositionSequence"], "0x9736": ["SQ", "1", "PETFrameCorrectionFactorsSequence"], "0x9737": ["SQ", "1", "RadiopharmaceuticalUsageSequence"], "0x9738": ["CS", "1", "AttenuationCorrectionSource"], "0x9739": ["US", "1", "NumberOfIterations"], "0x9740": ["US", "1", "NumberOfSubsets"], "0x9749": ["SQ", "1", "PETReconstructionSequence"], "0x9751": ["SQ", "1", "PETFrameTypeSequence"], "0x9755": ["CS", "1", "TimeOfFlightInformationUsed"], "0x9756": ["CS", "1", "ReconstructionType"], "0x9758": ["CS", "1", "DecayCorrected"], "0x9759": ["CS", "1", "AttenuationCorrected"], "0x9760": ["CS", "1", "ScatterCorrected"], "0x9761": ["CS", "1", "DeadTimeCorrected"], "0x9762": ["CS", "1", "GantryMotionCorrected"], "0x9763": ["CS", "1", "PatientMotionCorrected"], "0x9764": ["CS", "1", "CountLossNormalizationCorrected"], "0x9765": ["CS", "1", "RandomsCorrected"], "0x9766": ["CS", "1", "NonUniformRadialSamplingCorrected"], "0x9767": ["CS", "1", "SensitivityCalibrated"], "0x9768": ["CS", "1", "DetectorNormalizationCorrection"], "0x9769": ["CS", "1", "IterativeReconstructionMethod"], "0x9770": ["CS", "1", "AttenuationCorrectionTemporalRelationship"], "0x9771": ["SQ", "1", "PatientPhysiologicalStateSequence"], "0x9772": ["SQ", "1", "PatientPhysiologicalStateCodeSequence"], "0x9801": ["FD", "1-n", "DepthsOfFocus"], "0x9803": ["SQ", "1", "ExcludedIntervalsSequence"], "0x9804": ["DT", "1", "ExclusionStartDateTime"], "0x9805": ["FD", "1", "ExclusionDuration"], "0x9806": ["SQ", "1", "USImageDescriptionSequence"], "0x9807": ["SQ", "1", "ImageDataTypeSequence"], "0x9808": ["CS", "1", "DataType"], "0x9809": ["SQ", "1", "TransducerScanPatternCodeSequence"], "0x980B": ["CS", "1", "AliasedDataType"], "0x980C": ["CS", "1", "PositionMeasuringDeviceUsed"], "0x980D": ["SQ", "1", "TransducerGeometryCodeSequence"], "0x980E": ["SQ", "1", "TransducerBeamSteeringCodeSequence"], "0x980F": ["SQ", "1", "TransducerApplicationCodeSequence"], "0x9810": ["xs", "1", "ZeroVelocityPixelValue"], "0xA001": ["SQ", "1", "ContributingEquipmentSequence"], "0xA002": ["DT", "1", "ContributionDateTime"], "0xA003": ["ST", "1", "ContributionDescription"] }, "0x0020": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x000D": ["UI", "1", "StudyInstanceUID"], "0x000E": ["UI", "1", "SeriesInstanceUID"], "0x0010": ["SH", "1", "StudyID"], "0x0011": ["IS", "1", "SeriesNumber"], "0x0012": ["IS", "1", "AcquisitionNumber"], "0x0013": ["IS", "1", "InstanceNumber"], "0x0014": ["IS", "1", "IsotopeNumber"], "0x0015": ["IS", "1", "PhaseNumber"], "0x0016": ["IS", "1", "IntervalNumber"], "0x0017": ["IS", "1", "TimeSlotNumber"], "0x0018": ["IS", "1", "AngleNumber"], "0x0019": ["IS", "1", "ItemNumber"], "0x0020": ["CS", "2", "PatientOrientation"], "0x0022": ["IS", "1", "OverlayNumber"], "0x0024": ["IS", "1", "CurveNumber"], "0x0026": ["IS", "1", "LUTNumber"], "0x0030": ["DS", "3", "ImagePosition"], "0x0032": ["DS", "3", "ImagePositionPatient"], "0x0035": ["DS", "6", "ImageOrientation"], "0x0037": ["DS", "6", "ImageOrientationPatient"], "0x0050": ["DS", "1", "Location"], "0x0052": ["UI", "1", "FrameOfReferenceUID"], "0x0060": ["CS", "1", "Laterality"], "0x0062": ["CS", "1", "ImageLaterality"], "0x0070": ["LO", "1", "ImageGeometryType"], "0x0080": ["CS", "1-n", "MaskingImage"], "0x00AA": ["IS", "1", "ReportNumber"], "0x0100": ["IS", "1", "TemporalPositionIdentifier"], "0x0105": ["IS", "1", "NumberOfTemporalPositions"], "0x0110": ["DS", "1", "TemporalResolution"], "0x0200": ["UI", "1", "SynchronizationFrameOfReferenceUID"], "0x0242": ["UI", "1", "SOPInstanceUIDOfConcatenationSource"], "0x1000": ["IS", "1", "SeriesInStudy"], "0x1001": ["IS", "1", "AcquisitionsInSeries"], "0x1002": ["IS", "1", "ImagesInAcquisition"], "0x1003": ["IS", "1", "ImagesInSeries"], "0x1004": ["IS", "1", "AcquisitionsInStudy"], "0x1005": ["IS", "1", "ImagesInStudy"], "0x1020": ["LO", "1-n", "Reference"], "0x1040": ["LO", "1", "PositionReferenceIndicator"], "0x1041": ["DS", "1", "SliceLocation"], "0x1070": ["IS", "1-n", "OtherStudyNumbers"], "0x1200": ["IS", "1", "NumberOfPatientRelatedStudies"], "0x1202": ["IS", "1", "NumberOfPatientRelatedSeries"], "0x1204": ["IS", "1", "NumberOfPatientRelatedInstances"], "0x1206": ["IS", "1", "NumberOfStudyRelatedSeries"], "0x1208": ["IS", "1", "NumberOfStudyRelatedInstances"], "0x1209": ["IS", "1", "NumberOfSeriesRelatedInstances"], "0x3100": ["CS", "1-n", "SourceImageIDs"], "0x3401": ["CS", "1", "ModifyingDeviceID"], "0x3402": ["CS", "1", "ModifiedImageID"], "0x3403": ["DA", "1", "ModifiedImageDate"], "0x3404": ["LO", "1", "ModifyingDeviceManufacturer"], "0x3405": ["TM", "1", "ModifiedImageTime"], "0x3406": ["LO", "1", "ModifiedImageDescription"], "0x4000": ["LT", "1", "ImageComments"], "0x5000": ["AT", "1-n", "OriginalImageIdentification"], "0x5002": ["LO", "1-n", "OriginalImageIdentificationNomenclature"], "0x9056": ["SH", "1", "StackID"], "0x9057": ["UL", "1", "InStackPositionNumber"], "0x9071": ["SQ", "1", "FrameAnatomySequence"], "0x9072": ["CS", "1", "FrameLaterality"], "0x9111": ["SQ", "1", "FrameContentSequence"], "0x9113": ["SQ", "1", "PlanePositionSequence"], "0x9116": ["SQ", "1", "PlaneOrientationSequence"], "0x9128": ["UL", "1", "TemporalPositionIndex"], "0x9153": ["FD", "1", "NominalCardiacTriggerDelayTime"], "0x9154": ["FL", "1", "NominalCardiacTriggerTimePriorToRPeak"], "0x9155": ["FL", "1", "ActualCardiacTriggerTimePriorToRPeak"], "0x9156": ["US", "1", "FrameAcquisitionNumber"], "0x9157": ["UL", "1-n", "DimensionIndexValues"], "0x9158": ["LT", "1", "FrameComments"], "0x9161": ["UI", "1", "ConcatenationUID"], "0x9162": ["US", "1", "InConcatenationNumber"], "0x9163": ["US", "1", "InConcatenationTotalNumber"], "0x9164": ["UI", "1", "DimensionOrganizationUID"], "0x9165": ["AT", "1", "DimensionIndexPointer"], "0x9167": ["AT", "1", "FunctionalGroupPointer"], "0x9170": ["SQ", "1", "UnassignedSharedConvertedAttributesSequence"], "0x9171": ["SQ", "1", "UnassignedPerFrameConvertedAttributesSequence"], "0x9172": ["SQ", "1", "ConversionSourceAttributesSequence"], "0x9213": ["LO", "1", "DimensionIndexPrivateCreator"], "0x9221": ["SQ", "1", "DimensionOrganizationSequence"], "0x9222": ["SQ", "1", "DimensionIndexSequence"], "0x9228": ["UL", "1", "ConcatenationFrameOffsetNumber"], "0x9238": ["LO", "1", "FunctionalGroupPrivateCreator"], "0x9241": ["FL", "1", "NominalPercentageOfCardiacPhase"], "0x9245": ["FL", "1", "NominalPercentageOfRespiratoryPhase"], "0x9246": ["FL", "1", "StartingRespiratoryAmplitude"], "0x9247": ["CS", "1", "StartingRespiratoryPhase"], "0x9248": ["FL", "1", "EndingRespiratoryAmplitude"], "0x9249": ["CS", "1", "EndingRespiratoryPhase"], "0x9250": ["CS", "1", "RespiratoryTriggerType"], "0x9251": ["FD", "1", "RRIntervalTimeNominal"], "0x9252": ["FD", "1", "ActualCardiacTriggerDelayTime"], "0x9253": ["SQ", "1", "RespiratorySynchronizationSequence"], "0x9254": ["FD", "1", "RespiratoryIntervalTime"], "0x9255": ["FD", "1", "NominalRespiratoryTriggerDelayTime"], "0x9256": ["FD", "1", "RespiratoryTriggerDelayThreshold"], "0x9257": ["FD", "1", "ActualRespiratoryTriggerDelayTime"], "0x9301": ["FD", "3", "ImagePositionVolume"], "0x9302": ["FD", "6", "ImageOrientationVolume"], "0x9307": ["CS", "1", "UltrasoundAcquisitionGeometry"], "0x9308": ["FD", "3", "ApexPosition"], "0x9309": ["FD", "16", "VolumeToTransducerMappingMatrix"], "0x930A": ["FD", "16", "VolumeToTableMappingMatrix"], "0x930B": ["CS", "1", "VolumeToTransducerRelationship"], "0x930C": ["CS", "1", "PatientFrameOfReferenceSource"], "0x930D": ["FD", "1", "TemporalPositionTimeOffset"], "0x930E": ["SQ", "1", "PlanePositionVolumeSequence"], "0x930F": ["SQ", "1", "PlaneOrientationVolumeSequence"], "0x9310": ["SQ", "1", "TemporalPositionSequence"], "0x9311": ["CS", "1", "DimensionOrganizationType"], "0x9312": ["UI", "1", "VolumeFrameOfReferenceUID"], "0x9313": ["UI", "1", "TableFrameOfReferenceUID"], "0x9421": ["LO", "1", "DimensionDescriptionLabel"], "0x9450": ["SQ", "1", "PatientOrientationInFrameSequence"], "0x9453": ["LO", "1", "FrameLabel"], "0x9518": ["US", "1-n", "AcquisitionIndex"], "0x9529": ["SQ", "1", "ContributingSOPInstancesReferenceSequence"], "0x9536": ["US", "1", "ReconstructionIndex"] }, "0x0022": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0001": ["US", "1", "LightPathFilterPassThroughWavelength"], "0x0002": ["US", "2", "LightPathFilterPassBand"], "0x0003": ["US", "1", "ImagePathFilterPassThroughWavelength"], "0x0004": ["US", "2", "ImagePathFilterPassBand"], "0x0005": ["CS", "1", "PatientEyeMovementCommanded"], "0x0006": ["SQ", "1", "PatientEyeMovementCommandCodeSequence"], "0x0007": ["FL", "1", "SphericalLensPower"], "0x0008": ["FL", "1", "CylinderLensPower"], "0x0009": ["FL", "1", "CylinderAxis"], "0x000A": ["FL", "1", "EmmetropicMagnification"], "0x000B": ["FL", "1", "IntraOcularPressure"], "0x000C": ["FL", "1", "HorizontalFieldOfView"], "0x000D": ["CS", "1", "PupilDilated"], "0x000E": ["FL", "1", "DegreeOfDilation"], "0x0010": ["FL", "1", "StereoBaselineAngle"], "0x0011": ["FL", "1", "StereoBaselineDisplacement"], "0x0012": ["FL", "1", "StereoHorizontalPixelOffset"], "0x0013": ["FL", "1", "StereoVerticalPixelOffset"], "0x0014": ["FL", "1", "StereoRotation"], "0x0015": ["SQ", "1", "AcquisitionDeviceTypeCodeSequence"], "0x0016": ["SQ", "1", "IlluminationTypeCodeSequence"], "0x0017": ["SQ", "1", "LightPathFilterTypeStackCodeSequence"], "0x0018": ["SQ", "1", "ImagePathFilterTypeStackCodeSequence"], "0x0019": ["SQ", "1", "LensesCodeSequence"], "0x001A": ["SQ", "1", "ChannelDescriptionCodeSequence"], "0x001B": ["SQ", "1", "RefractiveStateSequence"], "0x001C": ["SQ", "1", "MydriaticAgentCodeSequence"], "0x001D": ["SQ", "1", "RelativeImagePositionCodeSequence"], "0x001E": ["FL", "1", "CameraAngleOfView"], "0x0020": ["SQ", "1", "StereoPairsSequence"], "0x0021": ["SQ", "1", "LeftImageSequence"], "0x0022": ["SQ", "1", "RightImageSequence"], "0x0028": ["CS", "1", "StereoPairsPresent"], "0x0030": ["FL", "1", "AxialLengthOfTheEye"], "0x0031": ["SQ", "1", "OphthalmicFrameLocationSequence"], "0x0032": ["FL", "2-2n", "ReferenceCoordinates"], "0x0035": ["FL", "1", "DepthSpatialResolution"], "0x0036": ["FL", "1", "MaximumDepthDistortion"], "0x0037": ["FL", "1", "AlongScanSpatialResolution"], "0x0038": ["FL", "1", "MaximumAlongScanDistortion"], "0x0039": ["CS", "1", "OphthalmicImageOrientation"], "0x0041": ["FL", "1", "DepthOfTransverseImage"], "0x0042": ["SQ", "1", "MydriaticAgentConcentrationUnitsSequence"], "0x0048": ["FL", "1", "AcrossScanSpatialResolution"], "0x0049": ["FL", "1", "MaximumAcrossScanDistortion"], "0x004E": ["DS", "1", "MydriaticAgentConcentration"], "0x0055": ["FL", "1", "IlluminationWaveLength"], "0x0056": ["FL", "1", "IlluminationPower"], "0x0057": ["FL", "1", "IlluminationBandwidth"], "0x0058": ["SQ", "1", "MydriaticAgentSequence"], "0x1007": ["SQ", "1", "OphthalmicAxialMeasurementsRightEyeSequence"], "0x1008": ["SQ", "1", "OphthalmicAxialMeasurementsLeftEyeSequence"], "0x1009": ["CS", "1", "OphthalmicAxialMeasurementsDeviceType"], "0x1010": ["CS", "1", "OphthalmicAxialLengthMeasurementsType"], "0x1012": ["SQ", "1", "OphthalmicAxialLengthSequence"], "0x1019": ["FL", "1", "OphthalmicAxialLength"], "0x1024": ["SQ", "1", "LensStatusCodeSequence"], "0x1025": ["SQ", "1", "VitreousStatusCodeSequence"], "0x1028": ["SQ", "1", "IOLFormulaCodeSequence"], "0x1029": ["LO", "1", "IOLFormulaDetail"], "0x1033": ["FL", "1", "KeratometerIndex"], "0x1035": ["SQ", "1", "SourceOfOphthalmicAxialLengthCodeSequence"], "0x1037": ["FL", "1", "TargetRefraction"], "0x1039": ["CS", "1", "RefractiveProcedureOccurred"], "0x1040": ["SQ", "1", "RefractiveSurgeryTypeCodeSequence"], "0x1044": ["SQ", "1", "OphthalmicUltrasoundMethodCodeSequence"], "0x1050": ["SQ", "1", "OphthalmicAxialLengthMeasurementsSequence"], "0x1053": ["FL", "1", "IOLPower"], "0x1054": ["FL", "1", "PredictedRefractiveError"], "0x1059": ["FL", "1", "OphthalmicAxialLengthVelocity"], "0x1065": ["LO", "1", "LensStatusDescription"], "0x1066": ["LO", "1", "VitreousStatusDescription"], "0x1090": ["SQ", "1", "IOLPowerSequence"], "0x1092": ["SQ", "1", "LensConstantSequence"], "0x1093": ["LO", "1", "IOLManufacturer"], "0x1094": ["LO", "1", "LensConstantDescription"], "0x1095": ["LO", "1", "ImplantName"], "0x1096": ["SQ", "1", "KeratometryMeasurementTypeCodeSequence"], "0x1097": ["LO", "1", "ImplantPartNumber"], "0x1100": ["SQ", "1", "ReferencedOphthalmicAxialMeasurementsSequence"], "0x1101": ["SQ", "1", "OphthalmicAxialLengthMeasurementsSegmentNameCodeSequence"], "0x1103": ["SQ", "1", "RefractiveErrorBeforeRefractiveSurgeryCodeSequence"], "0x1121": ["FL", "1", "IOLPowerForExactEmmetropia"], "0x1122": ["FL", "1", "IOLPowerForExactTargetRefraction"], "0x1125": ["SQ", "1", "AnteriorChamberDepthDefinitionCodeSequence"], "0x1127": ["SQ", "1", "LensThicknessSequence"], "0x1128": ["SQ", "1", "AnteriorChamberDepthSequence"], "0x1130": ["FL", "1", "LensThickness"], "0x1131": ["FL", "1", "AnteriorChamberDepth"], "0x1132": ["SQ", "1", "SourceOfLensThicknessDataCodeSequence"], "0x1133": ["SQ", "1", "SourceOfAnteriorChamberDepthDataCodeSequence"], "0x1134": ["SQ", "1", "SourceOfRefractiveMeasurementsSequence"], "0x1135": ["SQ", "1", "SourceOfRefractiveMeasurementsCodeSequence"], "0x1140": ["CS", "1", "OphthalmicAxialLengthMeasurementModified"], "0x1150": ["SQ", "1", "OphthalmicAxialLengthDataSourceCodeSequence"], "0x1153": ["SQ", "1", "OphthalmicAxialLengthAcquisitionMethodCodeSequence"], "0x1155": ["FL", "1", "SignalToNoiseRatio"], "0x1159": ["LO", "1", "OphthalmicAxialLengthDataSourceDescription"], "0x1210": ["SQ", "1", "OphthalmicAxialLengthMeasurementsTotalLengthSequence"], "0x1211": ["SQ", "1", "OphthalmicAxialLengthMeasurementsSegmentalLengthSequence"], "0x1212": ["SQ", "1", "OphthalmicAxialLengthMeasurementsLengthSummationSequence"], "0x1220": ["SQ", "1", "UltrasoundOphthalmicAxialLengthMeasurementsSequence"], "0x1225": ["SQ", "1", "OpticalOphthalmicAxialLengthMeasurementsSequence"], "0x1230": ["SQ", "1", "UltrasoundSelectedOphthalmicAxialLengthSequence"], "0x1250": ["SQ", "1", "OphthalmicAxialLengthSelectionMethodCodeSequence"], "0x1255": ["SQ", "1", "OpticalSelectedOphthalmicAxialLengthSequence"], "0x1257": ["SQ", "1", "SelectedSegmentalOphthalmicAxialLengthSequence"], "0x1260": ["SQ", "1", "SelectedTotalOphthalmicAxialLengthSequence"], "0x1262": ["SQ", "1", "OphthalmicAxialLengthQualityMetricSequence"], "0x1265": ["SQ", "1", "OphthalmicAxialLengthQualityMetricTypeCodeSequence"], "0x1273": ["LO", "1", "OphthalmicAxialLengthQualityMetricTypeDescription"], "0x1300": ["SQ", "1", "IntraocularLensCalculationsRightEyeSequence"], "0x1310": ["SQ", "1", "IntraocularLensCalculationsLeftEyeSequence"], "0x1330": ["SQ", "1", "ReferencedOphthalmicAxialLengthMeasurementQCImageSequence"], "0x1415": ["CS", "1", "OphthalmicMappingDeviceType"], "0x1420": ["SQ", "1", "AcquisitionMethodCodeSequence"], "0x1423": ["SQ", "1", "AcquisitionMethodAlgorithmSequence"], "0x1436": ["SQ", "1", "OphthalmicThicknessMapTypeCodeSequence"], "0x1443": ["SQ", "1", "OphthalmicThicknessMappingNormalsSequence"], "0x1445": ["SQ", "1", "RetinalThicknessDefinitionCodeSequence"], "0x1450": ["SQ", "1", "PixelValueMappingToCodedConceptSequence"], "0x1452": ["xs", "1", "MappedPixelValue"], "0x1454": ["LO", "1", "PixelValueMappingExplanation"], "0x1458": ["SQ", "1", "OphthalmicThicknessMapQualityThresholdSequence"], "0x1460": ["FL", "1", "OphthalmicThicknessMapThresholdQualityRating"], "0x1463": ["FL", "2", "AnatomicStructureReferencePoint"], "0x1465": ["SQ", "1", "RegistrationToLocalizerSequence"], "0x1466": ["CS", "1", "RegisteredLocalizerUnits"], "0x1467": ["FL", "2", "RegisteredLocalizerTopLeftHandCorner"], "0x1468": ["FL", "2", "RegisteredLocalizerBottomRightHandCorner"], "0x1470": ["SQ", "1", "OphthalmicThicknessMapQualityRatingSequence"], "0x1472": ["SQ", "1", "RelevantOPTAttributesSequence"], "0x1512": ["SQ", "1", "TransformationMethodCodeSequence"], "0x1513": ["SQ", "1", "TransformationAlgorithmSequence"], "0x1515": ["CS", "1", "OphthalmicAxialLengthMethod"], "0x1517": ["FL", "1", "OphthalmicFOV"], "0x1518": ["SQ", "1", "TwoDimensionalToThreeDimensionalMapSequence"], "0x1525": ["SQ", "1", "WideFieldOphthalmicPhotographyQualityRatingSequence"], "0x1526": ["SQ", "1", "WideFieldOphthalmicPhotographyQualityThresholdSequence"], "0x1527": ["FL", "1", "WideFieldOphthalmicPhotographyThresholdQualityRating"], "0x1528": ["FL", "1", "XCoordinatesCenterPixelViewAngle"], "0x1529": ["FL", "1", "YCoordinatesCenterPixelViewAngle"], "0x1530": ["UL", "1", "NumberOfMapPoints"], "0x1531": ["OF", "1", "TwoDimensionalToThreeDimensionalMapData"] }, "0x0024": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0010": ["FL", "1", "VisualFieldHorizontalExtent"], "0x0011": ["FL", "1", "VisualFieldVerticalExtent"], "0x0012": ["CS", "1", "VisualFieldShape"], "0x0016": ["SQ", "1", "ScreeningTestModeCodeSequence"], "0x0018": ["FL", "1", "MaximumStimulusLuminance"], "0x0020": ["FL", "1", "BackgroundLuminance"], "0x0021": ["SQ", "1", "StimulusColorCodeSequence"], "0x0024": ["SQ", "1", "BackgroundIlluminationColorCodeSequence"], "0x0025": ["FL", "1", "StimulusArea"], "0x0028": ["FL", "1", "StimulusPresentationTime"], "0x0032": ["SQ", "1", "FixationSequence"], "0x0033": ["SQ", "1", "FixationMonitoringCodeSequence"], "0x0034": ["SQ", "1", "VisualFieldCatchTrialSequence"], "0x0035": ["US", "1", "FixationCheckedQuantity"], "0x0036": ["US", "1", "PatientNotProperlyFixatedQuantity"], "0x0037": ["CS", "1", "PresentedVisualStimuliDataFlag"], "0x0038": ["US", "1", "NumberOfVisualStimuli"], "0x0039": ["CS", "1", "ExcessiveFixationLossesDataFlag"], "0x0040": ["CS", "1", "ExcessiveFixationLosses"], "0x0042": ["US", "1", "StimuliRetestingQuantity"], "0x0044": ["LT", "1", "CommentsOnPatientPerformanceOfVisualField"], "0x0045": ["CS", "1", "FalseNegativesEstimateFlag"], "0x0046": ["FL", "1", "FalseNegativesEstimate"], "0x0048": ["US", "1", "NegativeCatchTrialsQuantity"], "0x0050": ["US", "1", "FalseNegativesQuantity"], "0x0051": ["CS", "1", "ExcessiveFalseNegativesDataFlag"], "0x0052": ["CS", "1", "ExcessiveFalseNegatives"], "0x0053": ["CS", "1", "FalsePositivesEstimateFlag"], "0x0054": ["FL", "1", "FalsePositivesEstimate"], "0x0055": ["CS", "1", "CatchTrialsDataFlag"], "0x0056": ["US", "1", "PositiveCatchTrialsQuantity"], "0x0057": ["CS", "1", "TestPointNormalsDataFlag"], "0x0058": ["SQ", "1", "TestPointNormalsSequence"], "0x0059": ["CS", "1", "GlobalDeviationProbabilityNormalsFlag"], "0x0060": ["US", "1", "FalsePositivesQuantity"], "0x0061": ["CS", "1", "ExcessiveFalsePositivesDataFlag"], "0x0062": ["CS", "1", "ExcessiveFalsePositives"], "0x0063": ["CS", "1", "VisualFieldTestNormalsFlag"], "0x0064": ["SQ", "1", "ResultsNormalsSequence"], "0x0065": ["SQ", "1", "AgeCorrectedSensitivityDeviationAlgorithmSequence"], "0x0066": ["FL", "1", "GlobalDeviationFromNormal"], "0x0067": ["SQ", "1", "GeneralizedDefectSensitivityDeviationAlgorithmSequence"], "0x0068": ["FL", "1", "LocalizedDeviationFromNormal"], "0x0069": ["LO", "1", "PatientReliabilityIndicator"], "0x0070": ["FL", "1", "VisualFieldMeanSensitivity"], "0x0071": ["FL", "1", "GlobalDeviationProbability"], "0x0072": ["CS", "1", "LocalDeviationProbabilityNormalsFlag"], "0x0073": ["FL", "1", "LocalizedDeviationProbability"], "0x0074": ["CS", "1", "ShortTermFluctuationCalculated"], "0x0075": ["FL", "1", "ShortTermFluctuation"], "0x0076": ["CS", "1", "ShortTermFluctuationProbabilityCalculated"], "0x0077": ["FL", "1", "ShortTermFluctuationProbability"], "0x0078": ["CS", "1", "CorrectedLocalizedDeviationFromNormalCalculated"], "0x0079": ["FL", "1", "CorrectedLocalizedDeviationFromNormal"], "0x0080": ["CS", "1", "CorrectedLocalizedDeviationFromNormalProbabilityCalculated"], "0x0081": ["FL", "1", "CorrectedLocalizedDeviationFromNormalProbability"], "0x0083": ["SQ", "1", "GlobalDeviationProbabilitySequence"], "0x0085": ["SQ", "1", "LocalizedDeviationProbabilitySequence"], "0x0086": ["CS", "1", "FovealSensitivityMeasured"], "0x0087": ["FL", "1", "FovealSensitivity"], "0x0088": ["FL", "1", "VisualFieldTestDuration"], "0x0089": ["SQ", "1", "VisualFieldTestPointSequence"], "0x0090": ["FL", "1", "VisualFieldTestPointXCoordinate"], "0x0091": ["FL", "1", "VisualFieldTestPointYCoordinate"], "0x0092": ["FL", "1", "AgeCorrectedSensitivityDeviationValue"], "0x0093": ["CS", "1", "StimulusResults"], "0x0094": ["FL", "1", "SensitivityValue"], "0x0095": ["CS", "1", "RetestStimulusSeen"], "0x0096": ["FL", "1", "RetestSensitivityValue"], "0x0097": ["SQ", "1", "VisualFieldTestPointNormalsSequence"], "0x0098": ["FL", "1", "QuantifiedDefect"], "0x0100": ["FL", "1", "AgeCorrectedSensitivityDeviationProbabilityValue"], "0x0102": ["CS", "1", "GeneralizedDefectCorrectedSensitivityDeviationFlag"], "0x0103": ["FL", "1", "GeneralizedDefectCorrectedSensitivityDeviationValue"], "0x0104": ["FL", "1", "GeneralizedDefectCorrectedSensitivityDeviationProbabilityValue"], "0x0105": ["FL", "1", "MinimumSensitivityValue"], "0x0106": ["CS", "1", "BlindSpotLocalized"], "0x0107": ["FL", "1", "BlindSpotXCoordinate"], "0x0108": ["FL", "1", "BlindSpotYCoordinate"], "0x0110": ["SQ", "1", "VisualAcuityMeasurementSequence"], "0x0112": ["SQ", "1", "RefractiveParametersUsedOnPatientSequence"], "0x0113": ["CS", "1", "MeasurementLaterality"], "0x0114": ["SQ", "1", "OphthalmicPatientClinicalInformationLeftEyeSequence"], "0x0115": ["SQ", "1", "OphthalmicPatientClinicalInformationRightEyeSequence"], "0x0117": ["CS", "1", "FovealPointNormativeDataFlag"], "0x0118": ["FL", "1", "FovealPointProbabilityValue"], "0x0120": ["CS", "1", "ScreeningBaselineMeasured"], "0x0122": ["SQ", "1", "ScreeningBaselineMeasuredSequence"], "0x0124": ["CS", "1", "ScreeningBaselineType"], "0x0126": ["FL", "1", "ScreeningBaselineValue"], "0x0202": ["LO", "1", "AlgorithmSource"], "0x0306": ["LO", "1", "DataSetName"], "0x0307": ["LO", "1", "DataSetVersion"], "0x0308": ["LO", "1", "DataSetSource"], "0x0309": ["LO", "1", "DataSetDescription"], "0x0317": ["SQ", "1", "VisualFieldTestReliabilityGlobalIndexSequence"], "0x0320": ["SQ", "1", "VisualFieldGlobalResultsIndexSequence"], "0x0325": ["SQ", "1", "DataObservationSequence"], "0x0338": ["CS", "1", "IndexNormalsFlag"], "0x0341": ["FL", "1", "IndexProbability"], "0x0344": ["SQ", "1", "IndexProbabilitySequence"] }, "0x0028": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0002": ["US", "1", "SamplesPerPixel"], "0x0003": ["US", "1", "SamplesPerPixelUsed"], "0x0004": ["CS", "1", "PhotometricInterpretation"], "0x0005": ["US", "1", "ImageDimensions"], "0x0006": ["US", "1", "PlanarConfiguration"], "0x0008": ["IS", "1", "NumberOfFrames"], "0x0009": ["AT", "1-n", "FrameIncrementPointer"], "0x000A": ["AT", "1-n", "FrameDimensionPointer"], "0x0010": ["US", "1", "Rows"], "0x0011": ["US", "1", "Columns"], "0x0012": ["US", "1", "Planes"], "0x0014": ["US", "1", "UltrasoundColorDataPresent"], "0x0020": ["", "", ""], "0x0030": ["DS", "2", "PixelSpacing"], "0x0031": ["DS", "2", "ZoomFactor"], "0x0032": ["DS", "2", "ZoomCenter"], "0x0034": ["IS", "2", "PixelAspectRatio"], "0x0040": ["CS", "1", "ImageFormat"], "0x0050": ["LO", "1-n", "ManipulatedImage"], "0x0051": ["CS", "1-n", "CorrectedImage"], "0x005F": ["LO", "1", "CompressionRecognitionCode"], "0x0060": ["CS", "1", "CompressionCode"], "0x0061": ["SH", "1", "CompressionOriginator"], "0x0062": ["LO", "1", "CompressionLabel"], "0x0063": ["SH", "1", "CompressionDescription"], "0x0065": ["CS", "1-n", "CompressionSequence"], "0x0066": ["AT", "1-n", "CompressionStepPointers"], "0x0068": ["US", "1", "RepeatInterval"], "0x0069": ["US", "1", "BitsGrouped"], "0x0070": ["US", "1-n", "PerimeterTable"], "0x0071": ["xs", "1", "PerimeterValue"], "0x0080": ["US", "1", "PredictorRows"], "0x0081": ["US", "1", "PredictorColumns"], "0x0082": ["US", "1-n", "PredictorConstants"], "0x0090": ["CS", "1", "BlockedPixels"], "0x0091": ["US", "1", "BlockRows"], "0x0092": ["US", "1", "BlockColumns"], "0x0093": ["US", "1", "RowOverlap"], "0x0094": ["US", "1", "ColumnOverlap"], "0x0100": ["US", "1", "BitsAllocated"], "0x0101": ["US", "1", "BitsStored"], "0x0102": ["US", "1", "HighBit"], "0x0103": ["US", "1", "PixelRepresentation"], "0x0104": ["xs", "1", "SmallestValidPixelValue"], "0x0105": ["xs", "1", "LargestValidPixelValue"], "0x0106": ["xs", "1", "SmallestImagePixelValue"], "0x0107": ["xs", "1", "LargestImagePixelValue"], "0x0108": ["xs", "1", "SmallestPixelValueInSeries"], "0x0109": ["xs", "1", "LargestPixelValueInSeries"], "0x0110": ["xs", "1", "SmallestImagePixelValueInPlane"], "0x0111": ["xs", "1", "LargestImagePixelValueInPlane"], "0x0120": ["xs", "1", "PixelPaddingValue"], "0x0121": ["xs", "1", "PixelPaddingRangeLimit"], "0x0122": ["FL", "1", "FloatPixelPaddingValue"], "0x0123": ["FD", "1", "DoubleFloatPixelPaddingValue"], "0x0124": ["FL", "1", "FloatPixelPaddingRangeLimit"], "0x0125": ["FD", "1", "DoubleFloatPixelPaddingRangeLimit"], "0x0200": ["US", "1", "ImageLocation"], "0x0300": ["CS", "1", "QualityControlImage"], "0x0301": ["CS", "1", "BurnedInAnnotation"], "0x0302": ["CS", "1", "RecognizableVisualFeatures"], "0x0303": ["CS", "1", "LongitudinalTemporalInformationModified"], "0x0304": ["UI", "1", "ReferencedColorPaletteInstanceUID"], "0x0400": ["LO", "1", "TransformLabel"], "0x0401": ["LO", "1", "TransformVersionNumber"], "0x0402": ["US", "1", "NumberOfTransformSteps"], "0x0403": ["LO", "1-n", "SequenceOfCompressedData"], "0x0404": ["AT", "1-n", "DetailsOfCoefficients"], "0x04x0": ["US", "1", "RowsForNthOrderCoefficients"], "0x04x1": ["US", "1", "ColumnsForNthOrderCoefficients"], "0x04x2": ["LO", "1-n", "CoefficientCoding"], "0x04x3": ["AT", "1-n", "CoefficientCodingPointers"], "0x0700": ["LO", "1", "DCTLabel"], "0x0701": ["CS", "1-n", "DataBlockDescription"], "0x0702": ["AT", "1-n", "DataBlock"], "0x0710": ["US", "1", "NormalizationFactorFormat"], "0x0720": ["US", "1", "ZonalMapNumberFormat"], "0x0721": ["AT", "1-n", "ZonalMapLocation"], "0x0722": ["US", "1", "ZonalMapFormat"], "0x0730": ["US", "1", "AdaptiveMapFormat"], "0x0740": ["US", "1", "CodeNumberFormat"], "0x08x0": ["CS", "1-n", "CodeLabel"], "0x08x2": ["US", "1", "NumberOfTables"], "0x08x3": ["AT", "1-n", "CodeTableLocation"], "0x08x4": ["US", "1", "BitsForCodeWord"], "0x08x8": ["AT", "1-n", "ImageDataLocation"], "0x0A02": ["CS", "1", "PixelSpacingCalibrationType"], "0x0A04": ["LO", "1", "PixelSpacingCalibrationDescription"], "0x1040": ["CS", "1", "PixelIntensityRelationship"], "0x1041": ["SS", "1", "PixelIntensityRelationshipSign"], "0x1050": ["DS", "1-n", "WindowCenter"], "0x1051": ["DS", "1-n", "WindowWidth"], "0x1052": ["DS", "1", "RescaleIntercept"], "0x1053": ["DS", "1", "RescaleSlope"], "0x1054": ["LO", "1", "RescaleType"], "0x1055": ["LO", "1-n", "WindowCenterWidthExplanation"], "0x1056": ["CS", "1", "VOILUTFunction"], "0x1080": ["CS", "1", "GrayScale"], "0x1090": ["CS", "1", "RecommendedViewingMode"], "0x1100": ["xs", "3", "GrayLookupTableDescriptor"], "0x1101": ["xs", "3", "RedPaletteColorLookupTableDescriptor"], "0x1102": ["xs", "3", "GreenPaletteColorLookupTableDescriptor"], "0x1103": ["xs", "3", "BluePaletteColorLookupTableDescriptor"], "0x1104": ["US", "3", "AlphaPaletteColorLookupTableDescriptor"], "0x1111": ["xs", "4", "LargeRedPaletteColorLookupTableDescriptor"], "0x1112": ["xs", "4", "LargeGreenPaletteColorLookupTableDescriptor"], "0x1113": ["xs", "4", "LargeBluePaletteColorLookupTableDescriptor"], "0x1199": ["UI", "1", "PaletteColorLookupTableUID"], "0x1200": ["US or SS or OW", "1-n or 1", "GrayLookupTableData"], "0x1201": ["OW", "1", "RedPaletteColorLookupTableData"], "0x1202": ["OW", "1", "GreenPaletteColorLookupTableData"], "0x1203": ["OW", "1", "BluePaletteColorLookupTableData"], "0x1204": ["OW", "1", "AlphaPaletteColorLookupTableData"], "0x1211": ["OW", "1", "LargeRedPaletteColorLookupTableData"], "0x1212": ["OW", "1", "LargeGreenPaletteColorLookupTableData"], "0x1213": ["OW", "1", "LargeBluePaletteColorLookupTableData"], "0x1214": ["UI", "1", "LargePaletteColorLookupTableUID"], "0x1221": ["OW", "1", "SegmentedRedPaletteColorLookupTableData"], "0x1222": ["OW", "1", "SegmentedGreenPaletteColorLookupTableData"], "0x1223": ["OW", "1", "SegmentedBluePaletteColorLookupTableData"], "0x1300": ["CS", "1", "BreastImplantPresent"], "0x1350": ["CS", "1", "PartialView"], "0x1351": ["ST", "1", "PartialViewDescription"], "0x1352": ["SQ", "1", "PartialViewCodeSequence"], "0x135A": ["CS", "1", "SpatialLocationsPreserved"], "0x1401": ["SQ", "1", "DataFrameAssignmentSequence"], "0x1402": ["CS", "1", "DataPathAssignment"], "0x1403": ["US", "1", "BitsMappedToColorLookupTable"], "0x1404": ["SQ", "1", "BlendingLUT1Sequence"], "0x1405": ["CS", "1", "BlendingLUT1TransferFunction"], "0x1406": ["FD", "1", "BlendingWeightConstant"], "0x1407": ["US", "3", "BlendingLookupTableDescriptor"], "0x1408": ["OW", "1", "BlendingLookupTableData"], "0x140B": ["SQ", "1", "EnhancedPaletteColorLookupTableSequence"], "0x140C": ["SQ", "1", "BlendingLUT2Sequence"], "0x140D": ["CS", "1", "BlendingLUT2TransferFunction"], "0x140E": ["CS", "1", "DataPathID"], "0x140F": ["CS", "1", "RGBLUTTransferFunction"], "0x1410": ["CS", "1", "AlphaLUTTransferFunction"], "0x2000": ["OB", "1", "ICCProfile"], "0x2110": ["CS", "1", "LossyImageCompression"], "0x2112": ["DS", "1-n", "LossyImageCompressionRatio"], "0x2114": ["CS", "1-n", "LossyImageCompressionMethod"], "0x3000": ["SQ", "1", "ModalityLUTSequence"], "0x3002": ["xs", "3", "LUTDescriptor"], "0x3003": ["LO", "1", "LUTExplanation"], "0x3004": ["LO", "1", "ModalityLUTType"], "0x3006": ["US or OW", "1-n or 1", "LUTData"], "0x3010": ["SQ", "1", "VOILUTSequence"], "0x3110": ["SQ", "1", "SoftcopyVOILUTSequence"], "0x4000": ["LT", "1", "ImagePresentationComments"], "0x5000": ["SQ", "1", "BiPlaneAcquisitionSequence"], "0x6010": ["US", "1", "RepresentativeFrameNumber"], "0x6020": ["US", "1-n", "FrameNumbersOfInterest"], "0x6022": ["LO", "1-n", "FrameOfInterestDescription"], "0x6023": ["CS", "1-n", "FrameOfInterestType"], "0x6030": ["US", "1-n", "MaskPointers"], "0x6040": ["US", "1-n", "RWavePointer"], "0x6100": ["SQ", "1", "MaskSubtractionSequence"], "0x6101": ["CS", "1", "MaskOperation"], "0x6102": ["US", "2-2n", "ApplicableFrameRange"], "0x6110": ["US", "1-n", "MaskFrameNumbers"], "0x6112": ["US", "1", "ContrastFrameAveraging"], "0x6114": ["FL", "2", "MaskSubPixelShift"], "0x6120": ["SS", "1", "TIDOffset"], "0x6190": ["ST", "1", "MaskOperationExplanation"], "0x7000": ["SQ", "1", "EquipmentAdministratorSequence"], "0x7001": ["US", "1", "NumberOfDisplaySubsystems"], "0x7002": ["US", "1", "CurrentConfigurationID"], "0x7003": ["US", "1", "DisplaySubsystemID"], "0x7004": ["SH", "1", "DisplaySubsystemName"], "0x7005": ["LO", "1", "DisplaySubsystemDescription"], "0x7006": ["CS", "1", "SystemStatus"], "0x7007": ["LO", "1", "SystemStatusComment"], "0x7008": ["SQ", "1", "TargetLuminanceCharacteristicsSequence"], "0x7009": ["US", "1", "LuminanceCharacteristicsID"], "0x700A": ["SQ", "1", "DisplaySubsystemConfigurationSequence"], "0x700B": ["US", "1", "ConfigurationID"], "0x700C": ["SH", "1", "ConfigurationName"], "0x700D": ["LO", "1", "ConfigurationDescription"], "0x700E": ["US", "1", "ReferencedTargetLuminanceCharacteristicsID"], "0x700F": ["SQ", "1", "QAResultsSequence"], "0x7010": ["SQ", "1", "DisplaySubsystemQAResultsSequence"], "0x7011": ["SQ", "1", "ConfigurationQAResultsSequence"], "0x7012": ["SQ", "1", "MeasurementEquipmentSequence"], "0x7013": ["CS", "1-n", "MeasurementFunctions"], "0x7014": ["CS", "1", "MeasurementEquipmentType"], "0x7015": ["SQ", "1", "VisualEvaluationResultSequence"], "0x7016": ["SQ", "1", "DisplayCalibrationResultSequence"], "0x7017": ["US", "1", "DDLValue"], "0x7018": ["FL", "2", "CIExyWhitePoint"], "0x7019": ["CS", "1", "DisplayFunctionType"], "0x701A": ["FL", "1", "GammaValue"], "0x701B": ["US", "1", "NumberOfLuminancePoints"], "0x701C": ["SQ", "1", "LuminanceResponseSequence"], "0x701D": ["FL", "1", "TargetMinimumLuminance"], "0x701E": ["FL", "1", "TargetMaximumLuminance"], "0x701F": ["FL", "1", "LuminanceValue"], "0x7020": ["LO", "1", "LuminanceResponseDescription"], "0x7021": ["CS", "1", "WhitePointFlag"], "0x7022": ["SQ", "1", "DisplayDeviceTypeCodeSequence"], "0x7023": ["SQ", "1", "DisplaySubsystemSequence"], "0x7024": ["SQ", "1", "LuminanceResultSequence"], "0x7025": ["CS", "1", "AmbientLightValueSource"], "0x7026": ["CS", "1-n", "MeasuredCharacteristics"], "0x7027": ["SQ", "1", "LuminanceUniformityResultSequence"], "0x7028": ["SQ", "1", "VisualEvaluationTestSequence"], "0x7029": ["CS", "1", "TestResult"], "0x702A": ["LO", "1", "TestResultComment"], "0x702B": ["CS", "1", "TestImageValidation"], "0x702C": ["SQ", "1", "TestPatternCodeSequence"], "0x702D": ["SQ", "1", "MeasurementPatternCodeSequence"], "0x702E": ["SQ", "1", "VisualEvaluationMethodCodeSequence"], "0x7FE0": ["UR", "1", "PixelDataProviderURL"], "0x9001": ["UL", "1", "DataPointRows"], "0x9002": ["UL", "1", "DataPointColumns"], "0x9003": ["CS", "1", "SignalDomainColumns"], "0x9099": ["US", "1", "LargestMonochromePixelValue"], "0x9108": ["CS", "1", "DataRepresentation"], "0x9110": ["SQ", "1", "PixelMeasuresSequence"], "0x9132": ["SQ", "1", "FrameVOILUTSequence"], "0x9145": ["SQ", "1", "PixelValueTransformationSequence"], "0x9235": ["CS", "1", "SignalDomainRows"], "0x9411": ["FL", "1", "DisplayFilterPercentage"], "0x9415": ["SQ", "1", "FramePixelShiftSequence"], "0x9416": ["US", "1", "SubtractionItemID"], "0x9422": ["SQ", "1", "PixelIntensityRelationshipLUTSequence"], "0x9443": ["SQ", "1", "FramePixelDataPropertiesSequence"], "0x9444": ["CS", "1", "GeometricalProperties"], "0x9445": ["FL", "1", "GeometricMaximumDistortion"], "0x9446": ["CS", "1-n", "ImageProcessingApplied"], "0x9454": ["CS", "1", "MaskSelectionMode"], "0x9474": ["CS", "1", "LUTFunction"], "0x9478": ["FL", "1", "MaskVisibilityPercentage"], "0x9501": ["SQ", "1", "PixelShiftSequence"], "0x9502": ["SQ", "1", "RegionPixelShiftSequence"], "0x9503": ["SS", "2-2n", "VerticesOfTheRegion"], "0x9505": ["SQ", "1", "MultiFramePresentationSequence"], "0x9506": ["US", "2-2n", "PixelShiftFrameRange"], "0x9507": ["US", "2-2n", "LUTFrameRange"], "0x9520": ["DS", "16", "ImageToEquipmentMappingMatrix"], "0x9537": ["CS", "1", "EquipmentCoordinateSystemIdentification"] }, "0x0032": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x000A": ["CS", "1", "StudyStatusID"], "0x000C": ["CS", "1", "StudyPriorityID"], "0x0012": ["LO", "1", "StudyIDIssuer"], "0x0032": ["DA", "1", "StudyVerifiedDate"], "0x0033": ["TM", "1", "StudyVerifiedTime"], "0x0034": ["DA", "1", "StudyReadDate"], "0x0035": ["TM", "1", "StudyReadTime"], "0x1000": ["DA", "1", "ScheduledStudyStartDate"], "0x1001": ["TM", "1", "ScheduledStudyStartTime"], "0x1010": ["DA", "1", "ScheduledStudyStopDate"], "0x1011": ["TM", "1", "ScheduledStudyStopTime"], "0x1020": ["LO", "1", "ScheduledStudyLocation"], "0x1021": ["AE", "1-n", "ScheduledStudyLocationAETitle"], "0x1030": ["LO", "1", "ReasonForStudy"], "0x1031": ["SQ", "1", "RequestingPhysicianIdentificationSequence"], "0x1032": ["PN", "1", "RequestingPhysician"], "0x1033": ["LO", "1", "RequestingService"], "0x1034": ["SQ", "1", "RequestingServiceCodeSequence"], "0x1040": ["DA", "1", "StudyArrivalDate"], "0x1041": ["TM", "1", "StudyArrivalTime"], "0x1050": ["DA", "1", "StudyCompletionDate"], "0x1051": ["TM", "1", "StudyCompletionTime"], "0x1055": ["CS", "1", "StudyComponentStatusID"], "0x1060": ["LO", "1", "RequestedProcedureDescription"], "0x1064": ["SQ", "1", "RequestedProcedureCodeSequence"], "0x1070": ["LO", "1", "RequestedContrastAgent"], "0x4000": ["LT", "1", "StudyComments"] }, "0x0038": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0004": ["SQ", "1", "ReferencedPatientAliasSequence"], "0x0008": ["CS", "1", "VisitStatusID"], "0x0010": ["LO", "1", "AdmissionID"], "0x0011": ["LO", "1", "IssuerOfAdmissionID"], "0x0014": ["SQ", "1", "IssuerOfAdmissionIDSequence"], "0x0016": ["LO", "1", "RouteOfAdmissions"], "0x001A": ["DA", "1", "ScheduledAdmissionDate"], "0x001B": ["TM", "1", "ScheduledAdmissionTime"], "0x001C": ["DA", "1", "ScheduledDischargeDate"], "0x001D": ["TM", "1", "ScheduledDischargeTime"], "0x001E": ["LO", "1", "ScheduledPatientInstitutionResidence"], "0x0020": ["DA", "1", "AdmittingDate"], "0x0021": ["TM", "1", "AdmittingTime"], "0x0030": ["DA", "1", "DischargeDate"], "0x0032": ["TM", "1", "DischargeTime"], "0x0040": ["LO", "1", "DischargeDiagnosisDescription"], "0x0044": ["SQ", "1", "DischargeDiagnosisCodeSequence"], "0x0050": ["LO", "1", "SpecialNeeds"], "0x0060": ["LO", "1", "ServiceEpisodeID"], "0x0061": ["LO", "1", "IssuerOfServiceEpisodeID"], "0x0062": ["LO", "1", "ServiceEpisodeDescription"], "0x0064": ["SQ", "1", "IssuerOfServiceEpisodeIDSequence"], "0x0100": ["SQ", "1", "PertinentDocumentsSequence"], "0x0101": ["SQ", "1", "PertinentResourcesSequence"], "0x0102": ["LO", "1", "ResourceDescription"], "0x0300": ["LO", "1", "CurrentPatientLocation"], "0x0400": ["LO", "1", "PatientInstitutionResidence"], "0x0500": ["LO", "1", "PatientState"], "0x0502": ["SQ", "1", "PatientClinicalTrialParticipationSequence"], "0x4000": ["LT", "1", "VisitComments"] }, "0x003A": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0004": ["CS", "1", "WaveformOriginality"], "0x0005": ["US", "1", "NumberOfWaveformChannels"], "0x0010": ["UL", "1", "NumberOfWaveformSamples"], "0x001A": ["DS", "1", "SamplingFrequency"], "0x0020": ["SH", "1", "MultiplexGroupLabel"], "0x0200": ["SQ", "1", "ChannelDefinitionSequence"], "0x0202": ["IS", "1", "WaveformChannelNumber"], "0x0203": ["SH", "1", "ChannelLabel"], "0x0205": ["CS", "1-n", "ChannelStatus"], "0x0208": ["SQ", "1", "ChannelSourceSequence"], "0x0209": ["SQ", "1", "ChannelSourceModifiersSequence"], "0x020A": ["SQ", "1", "SourceWaveformSequence"], "0x020C": ["LO", "1", "ChannelDerivationDescription"], "0x0210": ["DS", "1", "ChannelSensitivity"], "0x0211": ["SQ", "1", "ChannelSensitivityUnitsSequence"], "0x0212": ["DS", "1", "ChannelSensitivityCorrectionFactor"], "0x0213": ["DS", "1", "ChannelBaseline"], "0x0214": ["DS", "1", "ChannelTimeSkew"], "0x0215": ["DS", "1", "ChannelSampleSkew"], "0x0218": ["DS", "1", "ChannelOffset"], "0x021A": ["US", "1", "WaveformBitsStored"], "0x0220": ["DS", "1", "FilterLowFrequency"], "0x0221": ["DS", "1", "FilterHighFrequency"], "0x0222": ["DS", "1", "NotchFilterFrequency"], "0x0223": ["DS", "1", "NotchFilterBandwidth"], "0x0230": ["FL", "1", "WaveformDataDisplayScale"], "0x0231": ["US", "3", "WaveformDisplayBackgroundCIELabValue"], "0x0240": ["SQ", "1", "WaveformPresentationGroupSequence"], "0x0241": ["US", "1", "PresentationGroupNumber"], "0x0242": ["SQ", "1", "ChannelDisplaySequence"], "0x0244": ["US", "3", "ChannelRecommendedDisplayCIELabValue"], "0x0245": ["FL", "1", "ChannelPosition"], "0x0246": ["CS", "1", "DisplayShadingFlag"], "0x0247": ["FL", "1", "FractionalChannelDisplayScale"], "0x0248": ["FL", "1", "AbsoluteChannelDisplayScale"], "0x0300": ["SQ", "1", "MultiplexedAudioChannelsDescriptionCodeSequence"], "0x0301": ["IS", "1", "ChannelIdentificationCode"], "0x0302": ["CS", "1", "ChannelMode"] }, "0x0040": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0001": ["AE", "1-n", "ScheduledStationAETitle"], "0x0002": ["DA", "1", "ScheduledProcedureStepStartDate"], "0x0003": ["TM", "1", "ScheduledProcedureStepStartTime"], "0x0004": ["DA", "1", "ScheduledProcedureStepEndDate"], "0x0005": ["TM", "1", "ScheduledProcedureStepEndTime"], "0x0006": ["PN", "1", "ScheduledPerformingPhysicianName"], "0x0007": ["LO", "1", "ScheduledProcedureStepDescription"], "0x0008": ["SQ", "1", "ScheduledProtocolCodeSequence"], "0x0009": ["SH", "1", "ScheduledProcedureStepID"], "0x000A": ["SQ", "1", "StageCodeSequence"], "0x000B": ["SQ", "1", "ScheduledPerformingPhysicianIdentificationSequence"], "0x0010": ["SH", "1-n", "ScheduledStationName"], "0x0011": ["SH", "1", "ScheduledProcedureStepLocation"], "0x0012": ["LO", "1", "PreMedication"], "0x0020": ["CS", "1", "ScheduledProcedureStepStatus"], "0x0026": ["SQ", "1", "OrderPlacerIdentifierSequence"], "0x0027": ["SQ", "1", "OrderFillerIdentifierSequence"], "0x0031": ["UT", "1", "LocalNamespaceEntityID"], "0x0032": ["UT", "1", "UniversalEntityID"], "0x0033": ["CS", "1", "UniversalEntityIDType"], "0x0035": ["CS", "1", "IdentifierTypeCode"], "0x0036": ["SQ", "1", "AssigningFacilitySequence"], "0x0039": ["SQ", "1", "AssigningJurisdictionCodeSequence"], "0x003A": ["SQ", "1", "AssigningAgencyOrDepartmentCodeSequence"], "0x0100": ["SQ", "1", "ScheduledProcedureStepSequence"], "0x0220": ["SQ", "1", "ReferencedNonImageCompositeSOPInstanceSequence"], "0x0241": ["AE", "1", "PerformedStationAETitle"], "0x0242": ["SH", "1", "PerformedStationName"], "0x0243": ["SH", "1", "PerformedLocation"], "0x0244": ["DA", "1", "PerformedProcedureStepStartDate"], "0x0245": ["TM", "1", "PerformedProcedureStepStartTime"], "0x0250": ["DA", "1", "PerformedProcedureStepEndDate"], "0x0251": ["TM", "1", "PerformedProcedureStepEndTime"], "0x0252": ["CS", "1", "PerformedProcedureStepStatus"], "0x0253": ["SH", "1", "PerformedProcedureStepID"], "0x0254": ["LO", "1", "PerformedProcedureStepDescription"], "0x0255": ["LO", "1", "PerformedProcedureTypeDescription"], "0x0260": ["SQ", "1", "PerformedProtocolCodeSequence"], "0x0261": ["CS", "1", "PerformedProtocolType"], "0x0270": ["SQ", "1", "ScheduledStepAttributesSequence"], "0x0275": ["SQ", "1", "RequestAttributesSequence"], "0x0280": ["ST", "1", "CommentsOnThePerformedProcedureStep"], "0x0281": ["SQ", "1", "PerformedProcedureStepDiscontinuationReasonCodeSequence"], "0x0293": ["SQ", "1", "QuantitySequence"], "0x0294": ["DS", "1", "Quantity"], "0x0295": ["SQ", "1", "MeasuringUnitsSequence"], "0x0296": ["SQ", "1", "BillingItemSequence"], "0x0300": ["US", "1", "TotalTimeOfFluoroscopy"], "0x0301": ["US", "1", "TotalNumberOfExposures"], "0x0302": ["US", "1", "EntranceDose"], "0x0303": ["US", "1-2", "ExposedArea"], "0x0306": ["DS", "1", "DistanceSourceToEntrance"], "0x0307": ["DS", "1", "DistanceSourceToSupport"], "0x030E": ["SQ", "1", "ExposureDoseSequence"], "0x0310": ["ST", "1", "CommentsOnRadiationDose"], "0x0312": ["DS", "1", "XRayOutput"], "0x0314": ["DS", "1", "HalfValueLayer"], "0x0316": ["DS", "1", "OrganDose"], "0x0318": ["CS", "1", "OrganExposed"], "0x0320": ["SQ", "1", "BillingProcedureStepSequence"], "0x0321": ["SQ", "1", "FilmConsumptionSequence"], "0x0324": ["SQ", "1", "BillingSuppliesAndDevicesSequence"], "0x0330": ["SQ", "1", "ReferencedProcedureStepSequence"], "0x0340": ["SQ", "1", "PerformedSeriesSequence"], "0x0400": ["LT", "1", "CommentsOnTheScheduledProcedureStep"], "0x0440": ["SQ", "1", "ProtocolContextSequence"], "0x0441": ["SQ", "1", "ContentItemModifierSequence"], "0x0500": ["SQ", "1", "ScheduledSpecimenSequence"], "0x050A": ["LO", "1", "SpecimenAccessionNumber"], "0x0512": ["LO", "1", "ContainerIdentifier"], "0x0513": ["SQ", "1", "IssuerOfTheContainerIdentifierSequence"], "0x0515": ["SQ", "1", "AlternateContainerIdentifierSequence"], "0x0518": ["SQ", "1", "ContainerTypeCodeSequence"], "0x051A": ["LO", "1", "ContainerDescription"], "0x0520": ["SQ", "1", "ContainerComponentSequence"], "0x0550": ["SQ", "1", "SpecimenSequence"], "0x0551": ["LO", "1", "SpecimenIdentifier"], "0x0552": ["SQ", "1", "SpecimenDescriptionSequenceTrial"], "0x0553": ["ST", "1", "SpecimenDescriptionTrial"], "0x0554": ["UI", "1", "SpecimenUID"], "0x0555": ["SQ", "1", "AcquisitionContextSequence"], "0x0556": ["ST", "1", "AcquisitionContextDescription"], "0x059A": ["SQ", "1", "SpecimenTypeCodeSequence"], "0x0560": ["SQ", "1", "SpecimenDescriptionSequence"], "0x0562": ["SQ", "1", "IssuerOfTheSpecimenIdentifierSequence"], "0x0600": ["LO", "1", "SpecimenShortDescription"], "0x0602": ["UT", "1", "SpecimenDetailedDescription"], "0x0610": ["SQ", "1", "SpecimenPreparationSequence"], "0x0612": ["SQ", "1", "SpecimenPreparationStepContentItemSequence"], "0x0620": ["SQ", "1", "SpecimenLocalizationContentItemSequence"], "0x06FA": ["LO", "1", "SlideIdentifier"], "0x071A": ["SQ", "1", "ImageCenterPointCoordinatesSequence"], "0x072A": ["DS", "1", "XOffsetInSlideCoordinateSystem"], "0x073A": ["DS", "1", "YOffsetInSlideCoordinateSystem"], "0x074A": ["DS", "1", "ZOffsetInSlideCoordinateSystem"], "0x08D8": ["SQ", "1", "PixelSpacingSequence"], "0x08DA": ["SQ", "1", "CoordinateSystemAxisCodeSequence"], "0x08EA": ["SQ", "1", "MeasurementUnitsCodeSequence"], "0x09F8": ["SQ", "1", "VitalStainCodeSequenceTrial"], "0x1001": ["SH", "1", "RequestedProcedureID"], "0x1002": ["LO", "1", "ReasonForTheRequestedProcedure"], "0x1003": ["SH", "1", "RequestedProcedurePriority"], "0x1004": ["LO", "1", "PatientTransportArrangements"], "0x1005": ["LO", "1", "RequestedProcedureLocation"], "0x1006": ["SH", "1", "PlacerOrderNumberProcedure"], "0x1007": ["SH", "1", "FillerOrderNumberProcedure"], "0x1008": ["LO", "1", "ConfidentialityCode"], "0x1009": ["SH", "1", "ReportingPriority"], "0x100A": ["SQ", "1", "ReasonForRequestedProcedureCodeSequence"], "0x1010": ["PN", "1-n", "NamesOfIntendedRecipientsOfResults"], "0x1011": ["SQ", "1", "IntendedRecipientsOfResultsIdentificationSequence"], "0x1012": ["SQ", "1", "ReasonForPerformedProcedureCodeSequence"], "0x1060": ["LO", "1", "RequestedProcedureDescriptionTrial"], "0x1101": ["SQ", "1", "PersonIdentificationCodeSequence"], "0x1102": ["ST", "1", "PersonAddress"], "0x1103": ["LO", "1-n", "PersonTelephoneNumbers"], "0x1104": ["LT", "1", "PersonTelecomInformation"], "0x1400": ["LT", "1", "RequestedProcedureComments"], "0x2001": ["LO", "1", "ReasonForTheImagingServiceRequest"], "0x2004": ["DA", "1", "IssueDateOfImagingServiceRequest"], "0x2005": ["TM", "1", "IssueTimeOfImagingServiceRequest"], "0x2006": ["SH", "1", "PlacerOrderNumberImagingServiceRequestRetired"], "0x2007": ["SH", "1", "FillerOrderNumberImagingServiceRequestRetired"], "0x2008": ["PN", "1", "OrderEnteredBy"], "0x2009": ["SH", "1", "OrderEntererLocation"], "0x2010": ["SH", "1", "OrderCallbackPhoneNumber"], "0x2011": ["LT", "1", "OrderCallbackTelecomInformation"], "0x2016": ["LO", "1", "PlacerOrderNumberImagingServiceRequest"], "0x2017": ["LO", "1", "FillerOrderNumberImagingServiceRequest"], "0x2400": ["LT", "1", "ImagingServiceRequestComments"], "0x3001": ["LO", "1", "ConfidentialityConstraintOnPatientDataDescription"], "0x4001": ["CS", "1", "GeneralPurposeScheduledProcedureStepStatus"], "0x4002": ["CS", "1", "GeneralPurposePerformedProcedureStepStatus"], "0x4003": ["CS", "1", "GeneralPurposeScheduledProcedureStepPriority"], "0x4004": ["SQ", "1", "ScheduledProcessingApplicationsCodeSequence"], "0x4005": ["DT", "1", "ScheduledProcedureStepStartDateTime"], "0x4006": ["CS", "1", "MultipleCopiesFlag"], "0x4007": ["SQ", "1", "PerformedProcessingApplicationsCodeSequence"], "0x4009": ["SQ", "1", "HumanPerformerCodeSequence"], "0x4010": ["DT", "1", "ScheduledProcedureStepModificationDateTime"], "0x4011": ["DT", "1", "ExpectedCompletionDateTime"], "0x4015": ["SQ", "1", "ResultingGeneralPurposePerformedProcedureStepsSequence"], "0x4016": ["SQ", "1", "ReferencedGeneralPurposeScheduledProcedureStepSequence"], "0x4018": ["SQ", "1", "ScheduledWorkitemCodeSequence"], "0x4019": ["SQ", "1", "PerformedWorkitemCodeSequence"], "0x4020": ["CS", "1", "InputAvailabilityFlag"], "0x4021": ["SQ", "1", "InputInformationSequence"], "0x4022": ["SQ", "1", "RelevantInformationSequence"], "0x4023": ["UI", "1", "ReferencedGeneralPurposeScheduledProcedureStepTransactionUID"], "0x4025": ["SQ", "1", "ScheduledStationNameCodeSequence"], "0x4026": ["SQ", "1", "ScheduledStationClassCodeSequence"], "0x4027": ["SQ", "1", "ScheduledStationGeographicLocationCodeSequence"], "0x4028": ["SQ", "1", "PerformedStationNameCodeSequence"], "0x4029": ["SQ", "1", "PerformedStationClassCodeSequence"], "0x4030": ["SQ", "1", "PerformedStationGeographicLocationCodeSequence"], "0x4031": ["SQ", "1", "RequestedSubsequentWorkitemCodeSequence"], "0x4032": ["SQ", "1", "NonDICOMOutputCodeSequence"], "0x4033": ["SQ", "1", "OutputInformationSequence"], "0x4034": ["SQ", "1", "ScheduledHumanPerformersSequence"], "0x4035": ["SQ", "1", "ActualHumanPerformersSequence"], "0x4036": ["LO", "1", "HumanPerformerOrganization"], "0x4037": ["PN", "1", "HumanPerformerName"], "0x4040": ["CS", "1", "RawDataHandling"], "0x4041": ["CS", "1", "InputReadinessState"], "0x4050": ["DT", "1", "PerformedProcedureStepStartDateTime"], "0x4051": ["DT", "1", "PerformedProcedureStepEndDateTime"], "0x4052": ["DT", "1", "ProcedureStepCancellationDateTime"], "0x8302": ["DS", "1", "EntranceDoseInmGy"], "0x9092": ["SQ", "1", "ParametricMapFrameTypeSequence"], "0x9094": ["SQ", "1", "ReferencedImageRealWorldValueMappingSequence"], "0x9096": ["SQ", "1", "RealWorldValueMappingSequence"], "0x9098": ["SQ", "1", "PixelValueMappingCodeSequence"], "0x9210": ["SH", "1", "LUTLabel"], "0x9211": ["xs", "1", "RealWorldValueLastValueMapped"], "0x9212": ["FD", "1-n", "RealWorldValueLUTData"], "0x9216": ["xs", "1", "RealWorldValueFirstValueMapped"], "0x9220": ["SQ", "1", "QuantityDefinitionSequence"], "0x9224": ["FD", "1", "RealWorldValueIntercept"], "0x9225": ["FD", "1", "RealWorldValueSlope"], "0xA007": ["CS", "1", "FindingsFlagTrial"], "0xA010": ["CS", "1", "RelationshipType"], "0xA020": ["SQ", "1", "FindingsSequenceTrial"], "0xA021": ["UI", "1", "FindingsGroupUIDTrial"], "0xA022": ["UI", "1", "ReferencedFindingsGroupUIDTrial"], "0xA023": ["DA", "1", "FindingsGroupRecordingDateTrial"], "0xA024": ["TM", "1", "FindingsGroupRecordingTimeTrial"], "0xA026": ["SQ", "1", "FindingsSourceCategoryCodeSequenceTrial"], "0xA027": ["LO", "1", "VerifyingOrganization"], "0xA028": ["SQ", "1", "DocumentingOrganizationIdentifierCodeSequenceTrial"], "0xA030": ["DT", "1", "VerificationDateTime"], "0xA032": ["DT", "1", "ObservationDateTime"], "0xA040": ["CS", "1", "ValueType"], "0xA043": ["SQ", "1", "ConceptNameCodeSequence"], "0xA047": ["LO", "1", "MeasurementPrecisionDescriptionTrial"], "0xA050": ["CS", "1", "ContinuityOfContent"], "0xA057": ["CS", "1-n", "UrgencyOrPriorityAlertsTrial"], "0xA060": ["LO", "1", "SequencingIndicatorTrial"], "0xA066": ["SQ", "1", "DocumentIdentifierCodeSequenceTrial"], "0xA067": ["PN", "1", "DocumentAuthorTrial"], "0xA068": ["SQ", "1", "DocumentAuthorIdentifierCodeSequenceTrial"], "0xA070": ["SQ", "1", "IdentifierCodeSequenceTrial"], "0xA073": ["SQ", "1", "VerifyingObserverSequence"], "0xA074": ["OB", "1", "ObjectBinaryIdentifierTrial"], "0xA075": ["PN", "1", "VerifyingObserverName"], "0xA076": ["SQ", "1", "DocumentingObserverIdentifierCodeSequenceTrial"], "0xA078": ["SQ", "1", "AuthorObserverSequence"], "0xA07A": ["SQ", "1", "ParticipantSequence"], "0xA07C": ["SQ", "1", "CustodialOrganizationSequence"], "0xA080": ["CS", "1", "ParticipationType"], "0xA082": ["DT", "1", "ParticipationDateTime"], "0xA084": ["CS", "1", "ObserverType"], "0xA085": ["SQ", "1", "ProcedureIdentifierCodeSequenceTrial"], "0xA088": ["SQ", "1", "VerifyingObserverIdentificationCodeSequence"], "0xA089": ["OB", "1", "ObjectDirectoryBinaryIdentifierTrial"], "0xA090": ["SQ", "1", "EquivalentCDADocumentSequence"], "0xA0B0": ["US", "2-2n", "ReferencedWaveformChannels"], "0xA110": ["DA", "1", "DateOfDocumentOrVerbalTransactionTrial"], "0xA112": ["TM", "1", "TimeOfDocumentCreationOrVerbalTransactionTrial"], "0xA120": ["DT", "1", "DateTime"], "0xA121": ["DA", "1", "Date"], "0xA122": ["TM", "1", "Time"], "0xA123": ["PN", "1", "PersonName"], "0xA124": ["UI", "1", "UID"], "0xA125": ["CS", "2", "ReportStatusIDTrial"], "0xA130": ["CS", "1", "TemporalRangeType"], "0xA132": ["UL", "1-n", "ReferencedSamplePositions"], "0xA136": ["US", "1-n", "ReferencedFrameNumbers"], "0xA138": ["DS", "1-n", "ReferencedTimeOffsets"], "0xA13A": ["DT", "1-n", "ReferencedDateTime"], "0xA160": ["UT", "1", "TextValue"], "0xA161": ["FD", "1-n", "FloatingPointValue"], "0xA162": ["SL", "1-n", "RationalNumeratorValue"], "0xA163": ["UL", "1-n", "RationalDenominatorValue"], "0xA167": ["SQ", "1", "ObservationCategoryCodeSequenceTrial"], "0xA168": ["SQ", "1", "ConceptCodeSequence"], "0xA16A": ["ST", "1", "BibliographicCitationTrial"], "0xA170": ["SQ", "1", "PurposeOfReferenceCodeSequence"], "0xA171": ["UI", "1", "ObservationUID"], "0xA172": ["UI", "1", "ReferencedObservationUIDTrial"], "0xA173": ["CS", "1", "ReferencedObservationClassTrial"], "0xA174": ["CS", "1", "ReferencedObjectObservationClassTrial"], "0xA180": ["US", "1", "AnnotationGroupNumber"], "0xA192": ["DA", "1", "ObservationDateTrial"], "0xA193": ["TM", "1", "ObservationTimeTrial"], "0xA194": ["CS", "1", "MeasurementAutomationTrial"], "0xA195": ["SQ", "1", "ModifierCodeSequence"], "0xA224": ["ST", "1", "IdentificationDescriptionTrial"], "0xA290": ["CS", "1", "CoordinatesSetGeometricTypeTrial"], "0xA296": ["SQ", "1", "AlgorithmCodeSequenceTrial"], "0xA297": ["ST", "1", "AlgorithmDescriptionTrial"], "0xA29A": ["SL", "2-2n", "PixelCoordinatesSetTrial"], "0xA300": ["SQ", "1", "MeasuredValueSequence"], "0xA301": ["SQ", "1", "NumericValueQualifierCodeSequence"], "0xA307": ["PN", "1", "CurrentObserverTrial"], "0xA30A": ["DS", "1-n", "NumericValue"], "0xA313": ["SQ", "1", "ReferencedAccessionSequenceTrial"], "0xA33A": ["ST", "1", "ReportStatusCommentTrial"], "0xA340": ["SQ", "1", "ProcedureContextSequenceTrial"], "0xA352": ["PN", "1", "VerbalSourceTrial"], "0xA353": ["ST", "1", "AddressTrial"], "0xA354": ["LO", "1", "TelephoneNumberTrial"], "0xA358": ["SQ", "1", "VerbalSourceIdentifierCodeSequenceTrial"], "0xA360": ["SQ", "1", "PredecessorDocumentsSequence"], "0xA370": ["SQ", "1", "ReferencedRequestSequence"], "0xA372": ["SQ", "1", "PerformedProcedureCodeSequence"], "0xA375": ["SQ", "1", "CurrentRequestedProcedureEvidenceSequence"], "0xA380": ["SQ", "1", "ReportDetailSequenceTrial"], "0xA385": ["SQ", "1", "PertinentOtherEvidenceSequence"], "0xA390": ["SQ", "1", "HL7StructuredDocumentReferenceSequence"], "0xA402": ["UI", "1", "ObservationSubjectUIDTrial"], "0xA403": ["CS", "1", "ObservationSubjectClassTrial"], "0xA404": ["SQ", "1", "ObservationSubjectTypeCodeSequenceTrial"], "0xA491": ["CS", "1", "CompletionFlag"], "0xA492": ["LO", "1", "CompletionFlagDescription"], "0xA493": ["CS", "1", "VerificationFlag"], "0xA494": ["CS", "1", "ArchiveRequested"], "0xA496": ["CS", "1", "PreliminaryFlag"], "0xA504": ["SQ", "1", "ContentTemplateSequence"], "0xA525": ["SQ", "1", "IdenticalDocumentsSequence"], "0xA600": ["CS", "1", "ObservationSubjectContextFlagTrial"], "0xA601": ["CS", "1", "ObserverContextFlagTrial"], "0xA603": ["CS", "1", "ProcedureContextFlagTrial"], "0xA730": ["SQ", "1", "ContentSequence"], "0xA731": ["SQ", "1", "RelationshipSequenceTrial"], "0xA732": ["SQ", "1", "RelationshipTypeCodeSequenceTrial"], "0xA744": ["SQ", "1", "LanguageCodeSequenceTrial"], "0xA992": ["ST", "1", "UniformResourceLocatorTrial"], "0xB020": ["SQ", "1", "WaveformAnnotationSequence"], "0xDB00": ["CS", "1", "TemplateIdentifier"], "0xDB06": ["DT", "1", "TemplateVersion"], "0xDB07": ["DT", "1", "TemplateLocalVersion"], "0xDB0B": ["CS", "1", "TemplateExtensionFlag"], "0xDB0C": ["UI", "1", "TemplateExtensionOrganizationUID"], "0xDB0D": ["UI", "1", "TemplateExtensionCreatorUID"], "0xDB73": ["UL", "1-n", "ReferencedContentItemIdentifier"], "0xE001": ["ST", "1", "HL7InstanceIdentifier"], "0xE004": ["DT", "1", "HL7DocumentEffectiveTime"], "0xE006": ["SQ", "1", "HL7DocumentTypeCodeSequence"], "0xE008": ["SQ", "1", "DocumentClassCodeSequence"], "0xE010": ["UR", "1", "RetrieveURI"], "0xE011": ["UI", "1", "RetrieveLocationUID"], "0xE020": ["CS", "1", "TypeOfInstances"], "0xE021": ["SQ", "1", "DICOMRetrievalSequence"], "0xE022": ["SQ", "1", "DICOMMediaRetrievalSequence"], "0xE023": ["SQ", "1", "WADORetrievalSequence"], "0xE024": ["SQ", "1", "XDSRetrievalSequence"], "0xE025": ["SQ", "1", "WADORSRetrievalSequence"], "0xE030": ["UI", "1", "RepositoryUniqueID"], "0xE031": ["UI", "1", "HomeCommunityID"] }, "0x0042": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0010": ["ST", "1", "DocumentTitle"], "0x0011": ["OB", "1", "EncapsulatedDocument"], "0x0012": ["LO", "1", "MIMETypeOfEncapsulatedDocument"], "0x0013": ["SQ", "1", "SourceInstanceSequence"], "0x0014": ["LO", "1-n", "ListOfMIMETypes"] }, "0x0044": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0001": ["ST", "1", "ProductPackageIdentifier"], "0x0002": ["CS", "1", "SubstanceAdministrationApproval"], "0x0003": ["LT", "1", "ApprovalStatusFurtherDescription"], "0x0004": ["DT", "1", "ApprovalStatusDateTime"], "0x0007": ["SQ", "1", "ProductTypeCodeSequence"], "0x0008": ["LO", "1-n", "ProductName"], "0x0009": ["LT", "1", "ProductDescription"], "0x000A": ["LO", "1", "ProductLotIdentifier"], "0x000B": ["DT", "1", "ProductExpirationDateTime"], "0x0010": ["DT", "1", "SubstanceAdministrationDateTime"], "0x0011": ["LO", "1", "SubstanceAdministrationNotes"], "0x0012": ["LO", "1", "SubstanceAdministrationDeviceID"], "0x0013": ["SQ", "1", "ProductParameterSequence"], "0x0019": ["SQ", "1", "SubstanceAdministrationParameterSequence"] }, "0x0046": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0012": ["LO", "1", "LensDescription"], "0x0014": ["SQ", "1", "RightLensSequence"], "0x0015": ["SQ", "1", "LeftLensSequence"], "0x0016": ["SQ", "1", "UnspecifiedLateralityLensSequence"], "0x0018": ["SQ", "1", "CylinderSequence"], "0x0028": ["SQ", "1", "PrismSequence"], "0x0030": ["FD", "1", "HorizontalPrismPower"], "0x0032": ["CS", "1", "HorizontalPrismBase"], "0x0034": ["FD", "1", "VerticalPrismPower"], "0x0036": ["CS", "1", "VerticalPrismBase"], "0x0038": ["CS", "1", "LensSegmentType"], "0x0040": ["FD", "1", "OpticalTransmittance"], "0x0042": ["FD", "1", "ChannelWidth"], "0x0044": ["FD", "1", "PupilSize"], "0x0046": ["FD", "1", "CornealSize"], "0x0050": ["SQ", "1", "AutorefractionRightEyeSequence"], "0x0052": ["SQ", "1", "AutorefractionLeftEyeSequence"], "0x0060": ["FD", "1", "DistancePupillaryDistance"], "0x0062": ["FD", "1", "NearPupillaryDistance"], "0x0063": ["FD", "1", "IntermediatePupillaryDistance"], "0x0064": ["FD", "1", "OtherPupillaryDistance"], "0x0070": ["SQ", "1", "KeratometryRightEyeSequence"], "0x0071": ["SQ", "1", "KeratometryLeftEyeSequence"], "0x0074": ["SQ", "1", "SteepKeratometricAxisSequence"], "0x0075": ["FD", "1", "RadiusOfCurvature"], "0x0076": ["FD", "1", "KeratometricPower"], "0x0077": ["FD", "1", "KeratometricAxis"], "0x0080": ["SQ", "1", "FlatKeratometricAxisSequence"], "0x0092": ["CS", "1", "BackgroundColor"], "0x0094": ["CS", "1", "Optotype"], "0x0095": ["CS", "1", "OptotypePresentation"], "0x0097": ["SQ", "1", "SubjectiveRefractionRightEyeSequence"], "0x0098": ["SQ", "1", "SubjectiveRefractionLeftEyeSequence"], "0x0100": ["SQ", "1", "AddNearSequence"], "0x0101": ["SQ", "1", "AddIntermediateSequence"], "0x0102": ["SQ", "1", "AddOtherSequence"], "0x0104": ["FD", "1", "AddPower"], "0x0106": ["FD", "1", "ViewingDistance"], "0x0121": ["SQ", "1", "VisualAcuityTypeCodeSequence"], "0x0122": ["SQ", "1", "VisualAcuityRightEyeSequence"], "0x0123": ["SQ", "1", "VisualAcuityLeftEyeSequence"], "0x0124": ["SQ", "1", "VisualAcuityBothEyesOpenSequence"], "0x0125": ["CS", "1", "ViewingDistanceType"], "0x0135": ["SS", "2", "VisualAcuityModifiers"], "0x0137": ["FD", "1", "DecimalVisualAcuity"], "0x0139": ["LO", "1", "OptotypeDetailedDefinition"], "0x0145": ["SQ", "1", "ReferencedRefractiveMeasurementsSequence"], "0x0146": ["FD", "1", "SpherePower"], "0x0147": ["FD", "1", "CylinderPower"], "0x0201": ["CS", "1", "CornealTopographySurface"], "0x0202": ["FL", "2", "CornealVertexLocation"], "0x0203": ["FL", "1", "PupilCentroidXCoordinate"], "0x0204": ["FL", "1", "PupilCentroidYCoordinate"], "0x0205": ["FL", "1", "EquivalentPupilRadius"], "0x0207": ["SQ", "1", "CornealTopographyMapTypeCodeSequence"], "0x0208": ["IS", "2-2n", "VerticesOfTheOutlineOfPupil"], "0x0210": ["SQ", "1", "CornealTopographyMappingNormalsSequence"], "0x0211": ["SQ", "1", "MaximumCornealCurvatureSequence"], "0x0212": ["FL", "1", "MaximumCornealCurvature"], "0x0213": ["FL", "2", "MaximumCornealCurvatureLocation"], "0x0215": ["SQ", "1", "MinimumKeratometricSequence"], "0x0218": ["SQ", "1", "SimulatedKeratometricCylinderSequence"], "0x0220": ["FL", "1", "AverageCornealPower"], "0x0224": ["FL", "1", "CornealISValue"], "0x0227": ["FL", "1", "AnalyzedArea"], "0x0230": ["FL", "1", "SurfaceRegularityIndex"], "0x0232": ["FL", "1", "SurfaceAsymmetryIndex"], "0x0234": ["FL", "1", "CornealEccentricityIndex"], "0x0236": ["FL", "1", "KeratoconusPredictionIndex"], "0x0238": ["FL", "1", "DecimalPotentialVisualAcuity"], "0x0242": ["CS", "1", "CornealTopographyMapQualityEvaluation"], "0x0244": ["SQ", "1", "SourceImageCornealProcessedDataSequence"], "0x0247": ["FL", "3", "CornealPointLocation"], "0x0248": ["CS", "1", "CornealPointEstimated"], "0x0249": ["FL", "1", "AxialPower"], "0x0250": ["FL", "1", "TangentialPower"], "0x0251": ["FL", "1", "RefractivePower"], "0x0252": ["FL", "1", "RelativeElevation"], "0x0253": ["FL", "1", "CornealWavefront"] }, "0x0048": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0001": ["FL", "1", "ImagedVolumeWidth"], "0x0002": ["FL", "1", "ImagedVolumeHeight"], "0x0003": ["FL", "1", "ImagedVolumeDepth"], "0x0006": ["UL", "1", "TotalPixelMatrixColumns"], "0x0007": ["UL", "1", "TotalPixelMatrixRows"], "0x0008": ["SQ", "1", "TotalPixelMatrixOriginSequence"], "0x0010": ["CS", "1", "SpecimenLabelInImage"], "0x0011": ["CS", "1", "FocusMethod"], "0x0012": ["CS", "1", "ExtendedDepthOfField"], "0x0013": ["US", "1", "NumberOfFocalPlanes"], "0x0014": ["FL", "1", "DistanceBetweenFocalPlanes"], "0x0015": ["US", "3", "RecommendedAbsentPixelCIELabValue"], "0x0100": ["SQ", "1", "IlluminatorTypeCodeSequence"], "0x0102": ["DS", "6", "ImageOrientationSlide"], "0x0105": ["SQ", "1", "OpticalPathSequence"], "0x0106": ["SH", "1", "OpticalPathIdentifier"], "0x0107": ["ST", "1", "OpticalPathDescription"], "0x0108": ["SQ", "1", "IlluminationColorCodeSequence"], "0x0110": ["SQ", "1", "SpecimenReferenceSequence"], "0x0111": ["DS", "1", "CondenserLensPower"], "0x0112": ["DS", "1", "ObjectiveLensPower"], "0x0113": ["DS", "1", "ObjectiveLensNumericalAperture"], "0x0120": ["SQ", "1", "PaletteColorLookupTableSequence"], "0x0200": ["SQ", "1", "ReferencedImageNavigationSequence"], "0x0201": ["US", "2", "TopLeftHandCornerOfLocalizerArea"], "0x0202": ["US", "2", "BottomRightHandCornerOfLocalizerArea"], "0x0207": ["SQ", "1", "OpticalPathIdentificationSequence"], "0x021A": ["SQ", "1", "PlanePositionSlideSequence"], "0x021E": ["SL", "1", "ColumnPositionInTotalImagePixelMatrix"], "0x021F": ["SL", "1", "RowPositionInTotalImagePixelMatrix"], "0x0301": ["CS", "1", "PixelOriginInterpretation"] }, "0x0050": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0004": ["CS", "1", "CalibrationImage"], "0x0010": ["SQ", "1", "DeviceSequence"], "0x0012": ["SQ", "1", "ContainerComponentTypeCodeSequence"], "0x0013": ["FD", "1", "ContainerComponentThickness"], "0x0014": ["DS", "1", "DeviceLength"], "0x0015": ["FD", "1", "ContainerComponentWidth"], "0x0016": ["DS", "1", "DeviceDiameter"], "0x0017": ["CS", "1", "DeviceDiameterUnits"], "0x0018": ["DS", "1", "DeviceVolume"], "0x0019": ["DS", "1", "InterMarkerDistance"], "0x001A": ["CS", "1", "ContainerComponentMaterial"], "0x001B": ["LO", "1", "ContainerComponentID"], "0x001C": ["FD", "1", "ContainerComponentLength"], "0x001D": ["FD", "1", "ContainerComponentDiameter"], "0x001E": ["LO", "1", "ContainerComponentDescription"], "0x0020": ["LO", "1", "DeviceDescription"] }, "0x0052": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0001": ["FL", "1", "ContrastBolusIngredientPercentByVolume"], "0x0002": ["FD", "1", "OCTFocalDistance"], "0x0003": ["FD", "1", "BeamSpotSize"], "0x0004": ["FD", "1", "EffectiveRefractiveIndex"], "0x0006": ["CS", "1", "OCTAcquisitionDomain"], "0x0007": ["FD", "1", "OCTOpticalCenterWavelength"], "0x0008": ["FD", "1", "AxialResolution"], "0x0009": ["FD", "1", "RangingDepth"], "0x0011": ["FD", "1", "ALineRate"], "0x0012": ["US", "1", "ALinesPerFrame"], "0x0013": ["FD", "1", "CatheterRotationalRate"], "0x0014": ["FD", "1", "ALinePixelSpacing"], "0x0016": ["SQ", "1", "ModeOfPercutaneousAccessSequence"], "0x0025": ["SQ", "1", "IntravascularOCTFrameTypeSequence"], "0x0026": ["CS", "1", "OCTZOffsetApplied"], "0x0027": ["SQ", "1", "IntravascularFrameContentSequence"], "0x0028": ["FD", "1", "IntravascularLongitudinalDistance"], "0x0029": ["SQ", "1", "IntravascularOCTFrameContentSequence"], "0x0030": ["SS", "1", "OCTZOffsetCorrection"], "0x0031": ["CS", "1", "CatheterDirectionOfRotation"], "0x0033": ["FD", "1", "SeamLineLocation"], "0x0034": ["FD", "1", "FirstALineLocation"], "0x0036": ["US", "1", "SeamLineIndex"], "0x0038": ["US", "1", "NumberOfPaddedALines"], "0x0039": ["CS", "1", "InterpolationType"], "0x003A": ["CS", "1", "RefractiveIndexApplied"] }, "0x0054": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0010": ["US", "1-n", "EnergyWindowVector"], "0x0011": ["US", "1", "NumberOfEnergyWindows"], "0x0012": ["SQ", "1", "EnergyWindowInformationSequence"], "0x0013": ["SQ", "1", "EnergyWindowRangeSequence"], "0x0014": ["DS", "1", "EnergyWindowLowerLimit"], "0x0015": ["DS", "1", "EnergyWindowUpperLimit"], "0x0016": ["SQ", "1", "RadiopharmaceuticalInformationSequence"], "0x0017": ["IS", "1", "ResidualSyringeCounts"], "0x0018": ["SH", "1", "EnergyWindowName"], "0x0020": ["US", "1-n", "DetectorVector"], "0x0021": ["US", "1", "NumberOfDetectors"], "0x0022": ["SQ", "1", "DetectorInformationSequence"], "0x0030": ["US", "1-n", "PhaseVector"], "0x0031": ["US", "1", "NumberOfPhases"], "0x0032": ["SQ", "1", "PhaseInformationSequence"], "0x0033": ["US", "1", "NumberOfFramesInPhase"], "0x0036": ["IS", "1", "PhaseDelay"], "0x0038": ["IS", "1", "PauseBetweenFrames"], "0x0039": ["CS", "1", "PhaseDescription"], "0x0050": ["US", "1-n", "RotationVector"], "0x0051": ["US", "1", "NumberOfRotations"], "0x0052": ["SQ", "1", "RotationInformationSequence"], "0x0053": ["US", "1", "NumberOfFramesInRotation"], "0x0060": ["US", "1-n", "RRIntervalVector"], "0x0061": ["US", "1", "NumberOfRRIntervals"], "0x0062": ["SQ", "1", "GatedInformationSequence"], "0x0063": ["SQ", "1", "DataInformationSequence"], "0x0070": ["US", "1-n", "TimeSlotVector"], "0x0071": ["US", "1", "NumberOfTimeSlots"], "0x0072": ["SQ", "1", "TimeSlotInformationSequence"], "0x0073": ["DS", "1", "TimeSlotTime"], "0x0080": ["US", "1-n", "SliceVector"], "0x0081": ["US", "1", "NumberOfSlices"], "0x0090": ["US", "1-n", "AngularViewVector"], "0x0100": ["US", "1-n", "TimeSliceVector"], "0x0101": ["US", "1", "NumberOfTimeSlices"], "0x0200": ["DS", "1", "StartAngle"], "0x0202": ["CS", "1", "TypeOfDetectorMotion"], "0x0210": ["IS", "1-n", "TriggerVector"], "0x0211": ["US", "1", "NumberOfTriggersInPhase"], "0x0220": ["SQ", "1", "ViewCodeSequence"], "0x0222": ["SQ", "1", "ViewModifierCodeSequence"], "0x0300": ["SQ", "1", "RadionuclideCodeSequence"], "0x0302": ["SQ", "1", "AdministrationRouteCodeSequence"], "0x0304": ["SQ", "1", "RadiopharmaceuticalCodeSequence"], "0x0306": ["SQ", "1", "CalibrationDataSequence"], "0x0308": ["US", "1", "EnergyWindowNumber"], "0x0400": ["SH", "1", "ImageID"], "0x0410": ["SQ", "1", "PatientOrientationCodeSequence"], "0x0412": ["SQ", "1", "PatientOrientationModifierCodeSequence"], "0x0414": ["SQ", "1", "PatientGantryRelationshipCodeSequence"], "0x0500": ["CS", "1", "SliceProgressionDirection"], "0x0501": ["CS", "1", "ScanProgressionDirection"], "0x1000": ["CS", "2", "SeriesType"], "0x1001": ["CS", "1", "Units"], "0x1002": ["CS", "1", "CountsSource"], "0x1004": ["CS", "1", "ReprojectionMethod"], "0x1006": ["CS", "1", "SUVType"], "0x1100": ["CS", "1", "RandomsCorrectionMethod"], "0x1101": ["LO", "1", "AttenuationCorrectionMethod"], "0x1102": ["CS", "1", "DecayCorrection"], "0x1103": ["LO", "1", "ReconstructionMethod"], "0x1104": ["LO", "1", "DetectorLinesOfResponseUsed"], "0x1105": ["LO", "1", "ScatterCorrectionMethod"], "0x1200": ["DS", "1", "AxialAcceptance"], "0x1201": ["IS", "2", "AxialMash"], "0x1202": ["IS", "1", "TransverseMash"], "0x1203": ["DS", "2", "DetectorElementSize"], "0x1210": ["DS", "1", "CoincidenceWindowWidth"], "0x1220": ["CS", "1-n", "SecondaryCountsType"], "0x1300": ["DS", "1", "FrameReferenceTime"], "0x1310": ["IS", "1", "PrimaryPromptsCountsAccumulated"], "0x1311": ["IS", "1-n", "SecondaryCountsAccumulated"], "0x1320": ["DS", "1", "SliceSensitivityFactor"], "0x1321": ["DS", "1", "DecayFactor"], "0x1322": ["DS", "1", "DoseCalibrationFactor"], "0x1323": ["DS", "1", "ScatterFractionFactor"], "0x1324": ["DS", "1", "DeadTimeFactor"], "0x1330": ["US", "1", "ImageIndex"], "0x1400": ["CS", "1-n", "CountsIncluded"], "0x1401": ["CS", "1", "DeadTimeCorrectionFlag"] }, "0x0060": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x3000": ["SQ", "1", "HistogramSequence"], "0x3002": ["US", "1", "HistogramNumberOfBins"], "0x3004": ["xs", "1", "HistogramFirstBinValue"], "0x3006": ["xs", "1", "HistogramLastBinValue"], "0x3008": ["US", "1", "HistogramBinWidth"], "0x3010": ["LO", "1", "HistogramExplanation"], "0x3020": ["UL", "1-n", "HistogramData"] }, "0x0062": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0001": ["CS", "1", "SegmentationType"], "0x0002": ["SQ", "1", "SegmentSequence"], "0x0003": ["SQ", "1", "SegmentedPropertyCategoryCodeSequence"], "0x0004": ["US", "1", "SegmentNumber"], "0x0005": ["LO", "1", "SegmentLabel"], "0x0006": ["ST", "1", "SegmentDescription"], "0x0008": ["CS", "1", "SegmentAlgorithmType"], "0x0009": ["LO", "1", "SegmentAlgorithmName"], "0x000A": ["SQ", "1", "SegmentIdentificationSequence"], "0x000B": ["US", "1-n", "ReferencedSegmentNumber"], "0x000C": ["US", "1", "RecommendedDisplayGrayscaleValue"], "0x000D": ["US", "3", "RecommendedDisplayCIELabValue"], "0x000E": ["US", "1", "MaximumFractionalValue"], "0x000F": ["SQ", "1", "SegmentedPropertyTypeCodeSequence"], "0x0010": ["CS", "1", "SegmentationFractionalType"], "0x0011": ["SQ", "1", "SegmentedPropertyTypeModifierCodeSequence"], "0x0012": ["SQ", "1", "UsedSegmentsSequence"] }, "0x0064": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0002": ["SQ", "1", "DeformableRegistrationSequence"], "0x0003": ["UI", "1", "SourceFrameOfReferenceUID"], "0x0005": ["SQ", "1", "DeformableRegistrationGridSequence"], "0x0007": ["UL", "3", "GridDimensions"], "0x0008": ["FD", "3", "GridResolution"], "0x0009": ["OF", "1", "VectorGridData"], "0x000F": ["SQ", "1", "PreDeformationMatrixRegistrationSequence"], "0x0010": ["SQ", "1", "PostDeformationMatrixRegistrationSequence"] }, "0x0066": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0001": ["UL", "1", "NumberOfSurfaces"], "0x0002": ["SQ", "1", "SurfaceSequence"], "0x0003": ["UL", "1", "SurfaceNumber"], "0x0004": ["LT", "1", "SurfaceComments"], "0x0009": ["CS", "1", "SurfaceProcessing"], "0x000A": ["FL", "1", "SurfaceProcessingRatio"], "0x000B": ["LO", "1", "SurfaceProcessingDescription"], "0x000C": ["FL", "1", "RecommendedPresentationOpacity"], "0x000D": ["CS", "1", "RecommendedPresentationType"], "0x000E": ["CS", "1", "FiniteVolume"], "0x0010": ["CS", "1", "Manifold"], "0x0011": ["SQ", "1", "SurfacePointsSequence"], "0x0012": ["SQ", "1", "SurfacePointsNormalsSequence"], "0x0013": ["SQ", "1", "SurfaceMeshPrimitivesSequence"], "0x0015": ["UL", "1", "NumberOfSurfacePoints"], "0x0016": ["OF", "1", "PointCoordinatesData"], "0x0017": ["FL", "3", "PointPositionAccuracy"], "0x0018": ["FL", "1", "MeanPointDistance"], "0x0019": ["FL", "1", "MaximumPointDistance"], "0x001A": ["FL", "6", "PointsBoundingBoxCoordinates"], "0x001B": ["FL", "3", "AxisOfRotation"], "0x001C": ["FL", "3", "CenterOfRotation"], "0x001E": ["UL", "1", "NumberOfVectors"], "0x001F": ["US", "1", "VectorDimensionality"], "0x0020": ["FL", "1-n", "VectorAccuracy"], "0x0021": ["OF", "1", "VectorCoordinateData"], "0x0023": ["OW", "1", "TrianglePointIndexList"], "0x0024": ["OW", "1", "EdgePointIndexList"], "0x0025": ["OW", "1", "VertexPointIndexList"], "0x0026": ["SQ", "1", "TriangleStripSequence"], "0x0027": ["SQ", "1", "TriangleFanSequence"], "0x0028": ["SQ", "1", "LineSequence"], "0x0029": ["OW", "1", "PrimitivePointIndexList"], "0x002A": ["UL", "1", "SurfaceCount"], "0x002B": ["SQ", "1", "ReferencedSurfaceSequence"], "0x002C": ["UL", "1", "ReferencedSurfaceNumber"], "0x002D": ["SQ", "1", "SegmentSurfaceGenerationAlgorithmIdentificationSequence"], "0x002E": ["SQ", "1", "SegmentSurfaceSourceInstanceSequence"], "0x002F": ["SQ", "1", "AlgorithmFamilyCodeSequence"], "0x0030": ["SQ", "1", "AlgorithmNameCodeSequence"], "0x0031": ["LO", "1", "AlgorithmVersion"], "0x0032": ["LT", "1", "AlgorithmParameters"], "0x0034": ["SQ", "1", "FacetSequence"], "0x0035": ["SQ", "1", "SurfaceProcessingAlgorithmIdentificationSequence"], "0x0036": ["LO", "1", "AlgorithmName"], "0x0037": ["FL", "1", "RecommendedPointRadius"], "0x0038": ["FL", "1", "RecommendedLineThickness"], "0x0040": ["UL", "1-n", "LongPrimitivePointIndexList"], "0x0041": ["UL", "3-3n", "LongTrianglePointIndexList"], "0x0042": ["UL", "2-2n", "LongEdgePointIndexList"], "0x0043": ["UL", "1-n", "LongVertexPointIndexList"] }, "0x0068": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x6210": ["LO", "1", "ImplantSize"], "0x6221": ["LO", "1", "ImplantTemplateVersion"], "0x6222": ["SQ", "1", "ReplacedImplantTemplateSequence"], "0x6223": ["CS", "1", "ImplantType"], "0x6224": ["SQ", "1", "DerivationImplantTemplateSequence"], "0x6225": ["SQ", "1", "OriginalImplantTemplateSequence"], "0x6226": ["DT", "1", "EffectiveDateTime"], "0x6230": ["SQ", "1", "ImplantTargetAnatomySequence"], "0x6260": ["SQ", "1", "InformationFromManufacturerSequence"], "0x6265": ["SQ", "1", "NotificationFromManufacturerSequence"], "0x6270": ["DT", "1", "InformationIssueDateTime"], "0x6280": ["ST", "1", "InformationSummary"], "0x62A0": ["SQ", "1", "ImplantRegulatoryDisapprovalCodeSequence"], "0x62A5": ["FD", "1", "OverallTemplateSpatialTolerance"], "0x62C0": ["SQ", "1", "HPGLDocumentSequence"], "0x62D0": ["US", "1", "HPGLDocumentID"], "0x62D5": ["LO", "1", "HPGLDocumentLabel"], "0x62E0": ["SQ", "1", "ViewOrientationCodeSequence"], "0x62F0": ["FD", "9", "ViewOrientationModifier"], "0x62F2": ["FD", "1", "HPGLDocumentScaling"], "0x6300": ["OB", "1", "HPGLDocument"], "0x6310": ["US", "1", "HPGLContourPenNumber"], "0x6320": ["SQ", "1", "HPGLPenSequence"], "0x6330": ["US", "1", "HPGLPenNumber"], "0x6340": ["LO", "1", "HPGLPenLabel"], "0x6345": ["ST", "1", "HPGLPenDescription"], "0x6346": ["FD", "2", "RecommendedRotationPoint"], "0x6347": ["FD", "4", "BoundingRectangle"], "0x6350": ["US", "1-n", "ImplantTemplate3DModelSurfaceNumber"], "0x6360": ["SQ", "1", "SurfaceModelDescriptionSequence"], "0x6380": ["LO", "1", "SurfaceModelLabel"], "0x6390": ["FD", "1", "SurfaceModelScalingFactor"], "0x63A0": ["SQ", "1", "MaterialsCodeSequence"], "0x63A4": ["SQ", "1", "CoatingMaterialsCodeSequence"], "0x63A8": ["SQ", "1", "ImplantTypeCodeSequence"], "0x63AC": ["SQ", "1", "FixationMethodCodeSequence"], "0x63B0": ["SQ", "1", "MatingFeatureSetsSequence"], "0x63C0": ["US", "1", "MatingFeatureSetID"], "0x63D0": ["LO", "1", "MatingFeatureSetLabel"], "0x63E0": ["SQ", "1", "MatingFeatureSequence"], "0x63F0": ["US", "1", "MatingFeatureID"], "0x6400": ["SQ", "1", "MatingFeatureDegreeOfFreedomSequence"], "0x6410": ["US", "1", "DegreeOfFreedomID"], "0x6420": ["CS", "1", "DegreeOfFreedomType"], "0x6430": ["SQ", "1", "TwoDMatingFeatureCoordinatesSequence"], "0x6440": ["US", "1", "ReferencedHPGLDocumentID"], "0x6450": ["FD", "2", "TwoDMatingPoint"], "0x6460": ["FD", "4", "TwoDMatingAxes"], "0x6470": ["SQ", "1", "TwoDDegreeOfFreedomSequence"], "0x6490": ["FD", "3", "ThreeDDegreeOfFreedomAxis"], "0x64A0": ["FD", "2", "RangeOfFreedom"], "0x64C0": ["FD", "3", "ThreeDMatingPoint"], "0x64D0": ["FD", "9", "ThreeDMatingAxes"], "0x64F0": ["FD", "3", "TwoDDegreeOfFreedomAxis"], "0x6500": ["SQ", "1", "PlanningLandmarkPointSequence"], "0x6510": ["SQ", "1", "PlanningLandmarkLineSequence"], "0x6520": ["SQ", "1", "PlanningLandmarkPlaneSequence"], "0x6530": ["US", "1", "PlanningLandmarkID"], "0x6540": ["LO", "1", "PlanningLandmarkDescription"], "0x6545": ["SQ", "1", "PlanningLandmarkIdentificationCodeSequence"], "0x6550": ["SQ", "1", "TwoDPointCoordinatesSequence"], "0x6560": ["FD", "2", "TwoDPointCoordinates"], "0x6590": ["FD", "3", "ThreeDPointCoordinates"], "0x65A0": ["SQ", "1", "TwoDLineCoordinatesSequence"], "0x65B0": ["FD", "4", "TwoDLineCoordinates"], "0x65D0": ["FD", "6", "ThreeDLineCoordinates"], "0x65E0": ["SQ", "1", "TwoDPlaneCoordinatesSequence"], "0x65F0": ["FD", "4", "TwoDPlaneIntersection"], "0x6610": ["FD", "3", "ThreeDPlaneOrigin"], "0x6620": ["FD", "3", "ThreeDPlaneNormal"] }, "0x0070": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0001": ["SQ", "1", "GraphicAnnotationSequence"], "0x0002": ["CS", "1", "GraphicLayer"], "0x0003": ["CS", "1", "BoundingBoxAnnotationUnits"], "0x0004": ["CS", "1", "AnchorPointAnnotationUnits"], "0x0005": ["CS", "1", "GraphicAnnotationUnits"], "0x0006": ["ST", "1", "UnformattedTextValue"], "0x0008": ["SQ", "1", "TextObjectSequence"], "0x0009": ["SQ", "1", "GraphicObjectSequence"], "0x0010": ["FL", "2", "BoundingBoxTopLeftHandCorner"], "0x0011": ["FL", "2", "BoundingBoxBottomRightHandCorner"], "0x0012": ["CS", "1", "BoundingBoxTextHorizontalJustification"], "0x0014": ["FL", "2", "AnchorPoint"], "0x0015": ["CS", "1", "AnchorPointVisibility"], "0x0020": ["US", "1", "GraphicDimensions"], "0x0021": ["US", "1", "NumberOfGraphicPoints"], "0x0022": ["FL", "2-n", "GraphicData"], "0x0023": ["CS", "1", "GraphicType"], "0x0024": ["CS", "1", "GraphicFilled"], "0x0040": ["IS", "1", "ImageRotationRetired"], "0x0041": ["CS", "1", "ImageHorizontalFlip"], "0x0042": ["US", "1", "ImageRotation"], "0x0050": ["US", "2", "DisplayedAreaTopLeftHandCornerTrial"], "0x0051": ["US", "2", "DisplayedAreaBottomRightHandCornerTrial"], "0x0052": ["SL", "2", "DisplayedAreaTopLeftHandCorner"], "0x0053": ["SL", "2", "DisplayedAreaBottomRightHandCorner"], "0x005A": ["SQ", "1", "DisplayedAreaSelectionSequence"], "0x0060": ["SQ", "1", "GraphicLayerSequence"], "0x0062": ["IS", "1", "GraphicLayerOrder"], "0x0066": ["US", "1", "GraphicLayerRecommendedDisplayGrayscaleValue"], "0x0067": ["US", "3", "GraphicLayerRecommendedDisplayRGBValue"], "0x0068": ["LO", "1", "GraphicLayerDescription"], "0x0080": ["CS", "1", "ContentLabel"], "0x0081": ["LO", "1", "ContentDescription"], "0x0082": ["DA", "1", "PresentationCreationDate"], "0x0083": ["TM", "1", "PresentationCreationTime"], "0x0084": ["PN", "1", "ContentCreatorName"], "0x0086": ["SQ", "1", "ContentCreatorIdentificationCodeSequence"], "0x0087": ["SQ", "1", "AlternateContentDescriptionSequence"], "0x0100": ["CS", "1", "PresentationSizeMode"], "0x0101": ["DS", "2", "PresentationPixelSpacing"], "0x0102": ["IS", "2", "PresentationPixelAspectRatio"], "0x0103": ["FL", "1", "PresentationPixelMagnificationRatio"], "0x0207": ["LO", "1", "GraphicGroupLabel"], "0x0208": ["ST", "1", "GraphicGroupDescription"], "0x0209": ["SQ", "1", "CompoundGraphicSequence"], "0x0226": ["UL", "1", "CompoundGraphicInstanceID"], "0x0227": ["LO", "1", "FontName"], "0x0228": ["CS", "1", "FontNameType"], "0x0229": ["LO", "1", "CSSFontName"], "0x0230": ["FD", "1", "RotationAngle"], "0x0231": ["SQ", "1", "TextStyleSequence"], "0x0232": ["SQ", "1", "LineStyleSequence"], "0x0233": ["SQ", "1", "FillStyleSequence"], "0x0234": ["SQ", "1", "GraphicGroupSequence"], "0x0241": ["US", "3", "TextColorCIELabValue"], "0x0242": ["CS", "1", "HorizontalAlignment"], "0x0243": ["CS", "1", "VerticalAlignment"], "0x0244": ["CS", "1", "ShadowStyle"], "0x0245": ["FL", "1", "ShadowOffsetX"], "0x0246": ["FL", "1", "ShadowOffsetY"], "0x0247": ["US", "3", "ShadowColorCIELabValue"], "0x0248": ["CS", "1", "Underlined"], "0x0249": ["CS", "1", "Bold"], "0x0250": ["CS", "1", "Italic"], "0x0251": ["US", "3", "PatternOnColorCIELabValue"], "0x0252": ["US", "3", "PatternOffColorCIELabValue"], "0x0253": ["FL", "1", "LineThickness"], "0x0254": ["CS", "1", "LineDashingStyle"], "0x0255": ["UL", "1", "LinePattern"], "0x0256": ["OB", "1", "FillPattern"], "0x0257": ["CS", "1", "FillMode"], "0x0258": ["FL", "1", "ShadowOpacity"], "0x0261": ["FL", "1", "GapLength"], "0x0262": ["FL", "1", "DiameterOfVisibility"], "0x0273": ["FL", "2", "RotationPoint"], "0x0274": ["CS", "1", "TickAlignment"], "0x0278": ["CS", "1", "ShowTickLabel"], "0x0279": ["CS", "1", "TickLabelAlignment"], "0x0282": ["CS", "1", "CompoundGraphicUnits"], "0x0284": ["FL", "1", "PatternOnOpacity"], "0x0285": ["FL", "1", "PatternOffOpacity"], "0x0287": ["SQ", "1", "MajorTicksSequence"], "0x0288": ["FL", "1", "TickPosition"], "0x0289": ["SH", "1", "TickLabel"], "0x0294": ["CS", "1", "CompoundGraphicType"], "0x0295": ["UL", "1", "GraphicGroupID"], "0x0306": ["CS", "1", "ShapeType"], "0x0308": ["SQ", "1", "RegistrationSequence"], "0x0309": ["SQ", "1", "MatrixRegistrationSequence"], "0x030A": ["SQ", "1", "MatrixSequence"], "0x030C": ["CS", "1", "FrameOfReferenceTransformationMatrixType"], "0x030D": ["SQ", "1", "RegistrationTypeCodeSequence"], "0x030F": ["ST", "1", "FiducialDescription"], "0x0310": ["SH", "1", "FiducialIdentifier"], "0x0311": ["SQ", "1", "FiducialIdentifierCodeSequence"], "0x0312": ["FD", "1", "ContourUncertaintyRadius"], "0x0314": ["SQ", "1", "UsedFiducialsSequence"], "0x0318": ["SQ", "1", "GraphicCoordinatesDataSequence"], "0x031A": ["UI", "1", "FiducialUID"], "0x031C": ["SQ", "1", "FiducialSetSequence"], "0x031E": ["SQ", "1", "FiducialSequence"], "0x0401": ["US", "3", "GraphicLayerRecommendedDisplayCIELabValue"], "0x0402": ["SQ", "1", "BlendingSequence"], "0x0403": ["FL", "1", "RelativeOpacity"], "0x0404": ["SQ", "1", "ReferencedSpatialRegistrationSequence"], "0x0405": ["CS", "1", "BlendingPosition"] }, "0x0072": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0002": ["SH", "1", "HangingProtocolName"], "0x0004": ["LO", "1", "HangingProtocolDescription"], "0x0006": ["CS", "1", "HangingProtocolLevel"], "0x0008": ["LO", "1", "HangingProtocolCreator"], "0x000A": ["DT", "1", "HangingProtocolCreationDateTime"], "0x000C": ["SQ", "1", "HangingProtocolDefinitionSequence"], "0x000E": ["SQ", "1", "HangingProtocolUserIdentificationCodeSequence"], "0x0010": ["LO", "1", "HangingProtocolUserGroupName"], "0x0012": ["SQ", "1", "SourceHangingProtocolSequence"], "0x0014": ["US", "1", "NumberOfPriorsReferenced"], "0x0020": ["SQ", "1", "ImageSetsSequence"], "0x0022": ["SQ", "1", "ImageSetSelectorSequence"], "0x0024": ["CS", "1", "ImageSetSelectorUsageFlag"], "0x0026": ["AT", "1", "SelectorAttribute"], "0x0028": ["US", "1", "SelectorValueNumber"], "0x0030": ["SQ", "1", "TimeBasedImageSetsSequence"], "0x0032": ["US", "1", "ImageSetNumber"], "0x0034": ["CS", "1", "ImageSetSelectorCategory"], "0x0038": ["US", "2", "RelativeTime"], "0x003A": ["CS", "1", "RelativeTimeUnits"], "0x003C": ["SS", "2", "AbstractPriorValue"], "0x003E": ["SQ", "1", "AbstractPriorCodeSequence"], "0x0040": ["LO", "1", "ImageSetLabel"], "0x0050": ["CS", "1", "SelectorAttributeVR"], "0x0052": ["AT", "1-n", "SelectorSequencePointer"], "0x0054": ["LO", "1-n", "SelectorSequencePointerPrivateCreator"], "0x0056": ["LO", "1", "SelectorAttributePrivateCreator"], "0x0060": ["AT", "1-n", "SelectorATValue"], "0x0062": ["CS", "1-n", "SelectorCSValue"], "0x0064": ["IS", "1-n", "SelectorISValue"], "0x0066": ["LO", "1-n", "SelectorLOValue"], "0x0068": ["LT", "1", "SelectorLTValue"], "0x006A": ["PN", "1-n", "SelectorPNValue"], "0x006C": ["SH", "1-n", "SelectorSHValue"], "0x006E": ["ST", "1", "SelectorSTValue"], "0x0070": ["UT", "1", "SelectorUTValue"], "0x0072": ["DS", "1-n", "SelectorDSValue"], "0x0074": ["FD", "1-n", "SelectorFDValue"], "0x0076": ["FL", "1-n", "SelectorFLValue"], "0x0078": ["UL", "1-n", "SelectorULValue"], "0x007A": ["US", "1-n", "SelectorUSValue"], "0x007C": ["SL", "1-n", "SelectorSLValue"], "0x007E": ["SS", "1-n", "SelectorSSValue"], "0x007F": ["UI", "1-n", "SelectorUIValue"], "0x0080": ["SQ", "1", "SelectorCodeSequenceValue"], "0x0100": ["US", "1", "NumberOfScreens"], "0x0102": ["SQ", "1", "NominalScreenDefinitionSequence"], "0x0104": ["US", "1", "NumberOfVerticalPixels"], "0x0106": ["US", "1", "NumberOfHorizontalPixels"], "0x0108": ["FD", "4", "DisplayEnvironmentSpatialPosition"], "0x010A": ["US", "1", "ScreenMinimumGrayscaleBitDepth"], "0x010C": ["US", "1", "ScreenMinimumColorBitDepth"], "0x010E": ["US", "1", "ApplicationMaximumRepaintTime"], "0x0200": ["SQ", "1", "DisplaySetsSequence"], "0x0202": ["US", "1", "DisplaySetNumber"], "0x0203": ["LO", "1", "DisplaySetLabel"], "0x0204": ["US", "1", "DisplaySetPresentationGroup"], "0x0206": ["LO", "1", "DisplaySetPresentationGroupDescription"], "0x0208": ["CS", "1", "PartialDataDisplayHandling"], "0x0210": ["SQ", "1", "SynchronizedScrollingSequence"], "0x0212": ["US", "2-n", "DisplaySetScrollingGroup"], "0x0214": ["SQ", "1", "NavigationIndicatorSequence"], "0x0216": ["US", "1", "NavigationDisplaySet"], "0x0218": ["US", "1-n", "ReferenceDisplaySets"], "0x0300": ["SQ", "1", "ImageBoxesSequence"], "0x0302": ["US", "1", "ImageBoxNumber"], "0x0304": ["CS", "1", "ImageBoxLayoutType"], "0x0306": ["US", "1", "ImageBoxTileHorizontalDimension"], "0x0308": ["US", "1", "ImageBoxTileVerticalDimension"], "0x0310": ["CS", "1", "ImageBoxScrollDirection"], "0x0312": ["CS", "1", "ImageBoxSmallScrollType"], "0x0314": ["US", "1", "ImageBoxSmallScrollAmount"], "0x0316": ["CS", "1", "ImageBoxLargeScrollType"], "0x0318": ["US", "1", "ImageBoxLargeScrollAmount"], "0x0320": ["US", "1", "ImageBoxOverlapPriority"], "0x0330": ["FD", "1", "CineRelativeToRealTime"], "0x0400": ["SQ", "1", "FilterOperationsSequence"], "0x0402": ["CS", "1", "FilterByCategory"], "0x0404": ["CS", "1", "FilterByAttributePresence"], "0x0406": ["CS", "1", "FilterByOperator"], "0x0420": ["US", "3", "StructuredDisplayBackgroundCIELabValue"], "0x0421": ["US", "3", "EmptyImageBoxCIELabValue"], "0x0422": ["SQ", "1", "StructuredDisplayImageBoxSequence"], "0x0424": ["SQ", "1", "StructuredDisplayTextBoxSequence"], "0x0427": ["SQ", "1", "ReferencedFirstFrameSequence"], "0x0430": ["SQ", "1", "ImageBoxSynchronizationSequence"], "0x0432": ["US", "2-n", "SynchronizedImageBoxList"], "0x0434": ["CS", "1", "TypeOfSynchronization"], "0x0500": ["CS", "1", "BlendingOperationType"], "0x0510": ["CS", "1", "ReformattingOperationType"], "0x0512": ["FD", "1", "ReformattingThickness"], "0x0514": ["FD", "1", "ReformattingInterval"], "0x0516": ["CS", "1", "ReformattingOperationInitialViewDirection"], "0x0520": ["CS", "1-n", "ThreeDRenderingType"], "0x0600": ["SQ", "1", "SortingOperationsSequence"], "0x0602": ["CS", "1", "SortByCategory"], "0x0604": ["CS", "1", "SortingDirection"], "0x0700": ["CS", "2", "DisplaySetPatientOrientation"], "0x0702": ["CS", "1", "VOIType"], "0x0704": ["CS", "1", "PseudoColorType"], "0x0705": ["SQ", "1", "PseudoColorPaletteInstanceReferenceSequence"], "0x0706": ["CS", "1", "ShowGrayscaleInverted"], "0x0710": ["CS", "1", "ShowImageTrueSizeFlag"], "0x0712": ["CS", "1", "ShowGraphicAnnotationFlag"], "0x0714": ["CS", "1", "ShowPatientDemographicsFlag"], "0x0716": ["CS", "1", "ShowAcquisitionTechniquesFlag"], "0x0717": ["CS", "1", "DisplaySetHorizontalJustification"], "0x0718": ["CS", "1", "DisplaySetVerticalJustification"] }, "0x0074": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0120": ["FD", "1", "ContinuationStartMeterset"], "0x0121": ["FD", "1", "ContinuationEndMeterset"], "0x1000": ["CS", "1", "ProcedureStepState"], "0x1002": ["SQ", "1", "ProcedureStepProgressInformationSequence"], "0x1004": ["DS", "1", "ProcedureStepProgress"], "0x1006": ["ST", "1", "ProcedureStepProgressDescription"], "0x1008": ["SQ", "1", "ProcedureStepCommunicationsURISequence"], "0x100A": ["UR", "1", "ContactURI"], "0x100C": ["LO", "1", "ContactDisplayName"], "0x100E": ["SQ", "1", "ProcedureStepDiscontinuationReasonCodeSequence"], "0x1020": ["SQ", "1", "BeamTaskSequence"], "0x1022": ["CS", "1", "BeamTaskType"], "0x1024": ["IS", "1", "BeamOrderIndexTrial"], "0x1025": ["CS", "1", "AutosequenceFlag"], "0x1026": ["FD", "1", "TableTopVerticalAdjustedPosition"], "0x1027": ["FD", "1", "TableTopLongitudinalAdjustedPosition"], "0x1028": ["FD", "1", "TableTopLateralAdjustedPosition"], "0x102A": ["FD", "1", "PatientSupportAdjustedAngle"], "0x102B": ["FD", "1", "TableTopEccentricAdjustedAngle"], "0x102C": ["FD", "1", "TableTopPitchAdjustedAngle"], "0x102D": ["FD", "1", "TableTopRollAdjustedAngle"], "0x1030": ["SQ", "1", "DeliveryVerificationImageSequence"], "0x1032": ["CS", "1", "VerificationImageTiming"], "0x1034": ["CS", "1", "DoubleExposureFlag"], "0x1036": ["CS", "1", "DoubleExposureOrdering"], "0x1038": ["DS", "1", "DoubleExposureMetersetTrial"], "0x103A": ["DS", "4", "DoubleExposureFieldDeltaTrial"], "0x1040": ["SQ", "1", "RelatedReferenceRTImageSequence"], "0x1042": ["SQ", "1", "GeneralMachineVerificationSequence"], "0x1044": ["SQ", "1", "ConventionalMachineVerificationSequence"], "0x1046": ["SQ", "1", "IonMachineVerificationSequence"], "0x1048": ["SQ", "1", "FailedAttributesSequence"], "0x104A": ["SQ", "1", "OverriddenAttributesSequence"], "0x104C": ["SQ", "1", "ConventionalControlPointVerificationSequence"], "0x104E": ["SQ", "1", "IonControlPointVerificationSequence"], "0x1050": ["SQ", "1", "AttributeOccurrenceSequence"], "0x1052": ["AT", "1", "AttributeOccurrencePointer"], "0x1054": ["UL", "1", "AttributeItemSelector"], "0x1056": ["LO", "1", "AttributeOccurrencePrivateCreator"], "0x1057": ["IS", "1-n", "SelectorSequencePointerItems"], "0x1200": ["CS", "1", "ScheduledProcedureStepPriority"], "0x1202": ["LO", "1", "WorklistLabel"], "0x1204": ["LO", "1", "ProcedureStepLabel"], "0x1210": ["SQ", "1", "ScheduledProcessingParametersSequence"], "0x1212": ["SQ", "1", "PerformedProcessingParametersSequence"], "0x1216": ["SQ", "1", "UnifiedProcedureStepPerformedProcedureSequence"], "0x1220": ["SQ", "1", "RelatedProcedureStepSequence"], "0x1222": ["LO", "1", "ProcedureStepRelationshipType"], "0x1224": ["SQ", "1", "ReplacedProcedureStepSequence"], "0x1230": ["LO", "1", "DeletionLock"], "0x1234": ["AE", "1", "ReceivingAE"], "0x1236": ["AE", "1", "RequestingAE"], "0x1238": ["LT", "1", "ReasonForCancellation"], "0x1242": ["CS", "1", "SCPStatus"], "0x1244": ["CS", "1", "SubscriptionListStatus"], "0x1246": ["CS", "1", "UnifiedProcedureStepListStatus"], "0x1324": ["UL", "1", "BeamOrderIndex"], "0x1338": ["FD", "1", "DoubleExposureMeterset"], "0x133A": ["FD", "4", "DoubleExposureFieldDelta"] }, "0x0076": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0001": ["LO", "1", "ImplantAssemblyTemplateName"], "0x0003": ["LO", "1", "ImplantAssemblyTemplateIssuer"], "0x0006": ["LO", "1", "ImplantAssemblyTemplateVersion"], "0x0008": ["SQ", "1", "ReplacedImplantAssemblyTemplateSequence"], "0x000A": ["CS", "1", "ImplantAssemblyTemplateType"], "0x000C": ["SQ", "1", "OriginalImplantAssemblyTemplateSequence"], "0x000E": ["SQ", "1", "DerivationImplantAssemblyTemplateSequence"], "0x0010": ["SQ", "1", "ImplantAssemblyTemplateTargetAnatomySequence"], "0x0020": ["SQ", "1", "ProcedureTypeCodeSequence"], "0x0030": ["LO", "1", "SurgicalTechnique"], "0x0032": ["SQ", "1", "ComponentTypesSequence"], "0x0034": ["CS", "1", "ComponentTypeCodeSequence"], "0x0036": ["CS", "1", "ExclusiveComponentType"], "0x0038": ["CS", "1", "MandatoryComponentType"], "0x0040": ["SQ", "1", "ComponentSequence"], "0x0055": ["US", "1", "ComponentID"], "0x0060": ["SQ", "1", "ComponentAssemblySequence"], "0x0070": ["US", "1", "Component1ReferencedID"], "0x0080": ["US", "1", "Component1ReferencedMatingFeatureSetID"], "0x0090": ["US", "1", "Component1ReferencedMatingFeatureID"], "0x00A0": ["US", "1", "Component2ReferencedID"], "0x00B0": ["US", "1", "Component2ReferencedMatingFeatureSetID"], "0x00C0": ["US", "1", "Component2ReferencedMatingFeatureID"] }, "0x0078": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0001": ["LO", "1", "ImplantTemplateGroupName"], "0x0010": ["ST", "1", "ImplantTemplateGroupDescription"], "0x0020": ["LO", "1", "ImplantTemplateGroupIssuer"], "0x0024": ["LO", "1", "ImplantTemplateGroupVersion"], "0x0026": ["SQ", "1", "ReplacedImplantTemplateGroupSequence"], "0x0028": ["SQ", "1", "ImplantTemplateGroupTargetAnatomySequence"], "0x002A": ["SQ", "1", "ImplantTemplateGroupMembersSequence"], "0x002E": ["US", "1", "ImplantTemplateGroupMemberID"], "0x0050": ["FD", "3", "ThreeDImplantTemplateGroupMemberMatchingPoint"], "0x0060": ["FD", "9", "ThreeDImplantTemplateGroupMemberMatchingAxes"], "0x0070": ["SQ", "1", "ImplantTemplateGroupMemberMatching2DCoordinatesSequence"], "0x0090": ["FD", "2", "TwoDImplantTemplateGroupMemberMatchingPoint"], "0x00A0": ["FD", "4", "TwoDImplantTemplateGroupMemberMatchingAxes"], "0x00B0": ["SQ", "1", "ImplantTemplateGroupVariationDimensionSequence"], "0x00B2": ["LO", "1", "ImplantTemplateGroupVariationDimensionName"], "0x00B4": ["SQ", "1", "ImplantTemplateGroupVariationDimensionRankSequence"], "0x00B6": ["US", "1", "ReferencedImplantTemplateGroupMemberID"], "0x00B8": ["US", "1", "ImplantTemplateGroupVariationDimensionRank"] }, "0x0080": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0001": ["SQ", "1", "SurfaceScanAcquisitionTypeCodeSequence"], "0x0002": ["SQ", "1", "SurfaceScanModeCodeSequence"], "0x0003": ["SQ", "1", "RegistrationMethodCodeSequence"], "0x0004": ["FD", "1", "ShotDurationTime"], "0x0005": ["FD", "1", "ShotOffsetTime"], "0x0006": ["US", "1-n", "SurfacePointPresentationValueData"], "0x0007": ["US", "3-3n", "SurfacePointColorCIELabValueData"], "0x0008": ["SQ", "1", "UVMappingSequence"], "0x0009": ["SH", "1", "TextureLabel"], "0x0010": ["OF", "1-n", "UValueData"], "0x0011": ["OF", "1-n", "VValueData"], "0x0012": ["SQ", "1", "ReferencedTextureSequence"], "0x0013": ["SQ", "1", "ReferencedSurfaceDataSequence"] }, "0x0088": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0130": ["SH", "1", "StorageMediaFileSetID"], "0x0140": ["UI", "1", "StorageMediaFileSetUID"], "0x0200": ["SQ", "1", "IconImageSequence"], "0x0904": ["LO", "1", "TopicTitle"], "0x0906": ["ST", "1", "TopicSubject"], "0x0910": ["LO", "1", "TopicAuthor"], "0x0912": ["LO", "1-32", "TopicKeywords"] }, "0x0100": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0410": ["CS", "1", "SOPInstanceStatus"], "0x0420": ["DT", "1", "SOPAuthorizationDateTime"], "0x0424": ["LT", "1", "SOPAuthorizationComment"], "0x0426": ["LO", "1", "AuthorizationEquipmentCertificationNumber"] }, "0x0400": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0005": ["US", "1", "MACIDNumber"], "0x0010": ["UI", "1", "MACCalculationTransferSyntaxUID"], "0x0015": ["CS", "1", "MACAlgorithm"], "0x0020": ["AT", "1-n", "DataElementsSigned"], "0x0100": ["UI", "1", "DigitalSignatureUID"], "0x0105": ["DT", "1", "DigitalSignatureDateTime"], "0x0110": ["CS", "1", "CertificateType"], "0x0115": ["OB", "1", "CertificateOfSigner"], "0x0120": ["OB", "1", "Signature"], "0x0305": ["CS", "1", "CertifiedTimestampType"], "0x0310": ["OB", "1", "CertifiedTimestamp"], "0x0401": ["SQ", "1", "DigitalSignaturePurposeCodeSequence"], "0x0402": ["SQ", "1", "ReferencedDigitalSignatureSequence"], "0x0403": ["SQ", "1", "ReferencedSOPInstanceMACSequence"], "0x0404": ["OB", "1", "MAC"], "0x0500": ["SQ", "1", "EncryptedAttributesSequence"], "0x0510": ["UI", "1", "EncryptedContentTransferSyntaxUID"], "0x0520": ["OB", "1", "EncryptedContent"], "0x0550": ["SQ", "1", "ModifiedAttributesSequence"], "0x0561": ["SQ", "1", "OriginalAttributesSequence"], "0x0562": ["DT", "1", "AttributeModificationDateTime"], "0x0563": ["LO", "1", "ModifyingSystem"], "0x0564": ["LO", "1", "SourceOfPreviousValues"], "0x0565": ["CS", "1", "ReasonForTheAttributeModification"] }, "0x1000": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0010": ["US", "3", "EscapeTriplet"], "0x0011": ["US", "3", "RunLengthTriplet"], "0x0012": ["US", "1", "HuffmanTableSize"], "0x0013": ["US", "3", "HuffmanTableTriplet"], "0x0014": ["US", "1", "ShiftTableSize"], "0x0015": ["US", "3", "ShiftTableTriplet"] }, "0x1010": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0004": ["US", "1-n", "ZonalMap"] }, "0x2000": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0010": ["IS", "1", "NumberOfCopies"], "0x001E": ["SQ", "1", "PrinterConfigurationSequence"], "0x0020": ["CS", "1", "PrintPriority"], "0x0030": ["CS", "1", "MediumType"], "0x0040": ["CS", "1", "FilmDestination"], "0x0050": ["LO", "1", "FilmSessionLabel"], "0x0060": ["IS", "1", "MemoryAllocation"], "0x0061": ["IS", "1", "MaximumMemoryAllocation"], "0x0062": ["CS", "1", "ColorImagePrintingFlag"], "0x0063": ["CS", "1", "CollationFlag"], "0x0065": ["CS", "1", "AnnotationFlag"], "0x0067": ["CS", "1", "ImageOverlayFlag"], "0x0069": ["CS", "1", "PresentationLUTFlag"], "0x006A": ["CS", "1", "ImageBoxPresentationLUTFlag"], "0x00A0": ["US", "1", "MemoryBitDepth"], "0x00A1": ["US", "1", "PrintingBitDepth"], "0x00A2": ["SQ", "1", "MediaInstalledSequence"], "0x00A4": ["SQ", "1", "OtherMediaAvailableSequence"], "0x00A8": ["SQ", "1", "SupportedImageDisplayFormatsSequence"], "0x0500": ["SQ", "1", "ReferencedFilmBoxSequence"], "0x0510": ["SQ", "1", "ReferencedStoredPrintSequence"] }, "0x2010": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0010": ["ST", "1", "ImageDisplayFormat"], "0x0030": ["CS", "1", "AnnotationDisplayFormatID"], "0x0040": ["CS", "1", "FilmOrientation"], "0x0050": ["CS", "1", "FilmSizeID"], "0x0052": ["CS", "1", "PrinterResolutionID"], "0x0054": ["CS", "1", "DefaultPrinterResolutionID"], "0x0060": ["CS", "1", "MagnificationType"], "0x0080": ["CS", "1", "SmoothingType"], "0x00A6": ["CS", "1", "DefaultMagnificationType"], "0x00A7": ["CS", "1-n", "OtherMagnificationTypesAvailable"], "0x00A8": ["CS", "1", "DefaultSmoothingType"], "0x00A9": ["CS", "1-n", "OtherSmoothingTypesAvailable"], "0x0100": ["CS", "1", "BorderDensity"], "0x0110": ["CS", "1", "EmptyImageDensity"], "0x0120": ["US", "1", "MinDensity"], "0x0130": ["US", "1", "MaxDensity"], "0x0140": ["CS", "1", "Trim"], "0x0150": ["ST", "1", "ConfigurationInformation"], "0x0152": ["LT", "1", "ConfigurationInformationDescription"], "0x0154": ["IS", "1", "MaximumCollatedFilms"], "0x015E": ["US", "1", "Illumination"], "0x0160": ["US", "1", "ReflectedAmbientLight"], "0x0376": ["DS", "2", "PrinterPixelSpacing"], "0x0500": ["SQ", "1", "ReferencedFilmSessionSequence"], "0x0510": ["SQ", "1", "ReferencedImageBoxSequence"], "0x0520": ["SQ", "1", "ReferencedBasicAnnotationBoxSequence"] }, "0x2020": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0010": ["US", "1", "ImageBoxPosition"], "0x0020": ["CS", "1", "Polarity"], "0x0030": ["DS", "1", "RequestedImageSize"], "0x0040": ["CS", "1", "RequestedDecimateCropBehavior"], "0x0050": ["CS", "1", "RequestedResolutionID"], "0x00A0": ["CS", "1", "RequestedImageSizeFlag"], "0x00A2": ["CS", "1", "DecimateCropResult"], "0x0110": ["SQ", "1", "BasicGrayscaleImageSequence"], "0x0111": ["SQ", "1", "BasicColorImageSequence"], "0x0130": ["SQ", "1", "ReferencedImageOverlayBoxSequence"], "0x0140": ["SQ", "1", "ReferencedVOILUTBoxSequence"] }, "0x2030": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0010": ["US", "1", "AnnotationPosition"], "0x0020": ["LO", "1", "TextString"] }, "0x2040": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0010": ["SQ", "1", "ReferencedOverlayPlaneSequence"], "0x0011": ["US", "1-99", "ReferencedOverlayPlaneGroups"], "0x0020": ["SQ", "1", "OverlayPixelDataSequence"], "0x0060": ["CS", "1", "OverlayMagnificationType"], "0x0070": ["CS", "1", "OverlaySmoothingType"], "0x0072": ["CS", "1", "OverlayOrImageMagnification"], "0x0074": ["US", "1", "MagnifyToNumberOfColumns"], "0x0080": ["CS", "1", "OverlayForegroundDensity"], "0x0082": ["CS", "1", "OverlayBackgroundDensity"], "0x0090": ["CS", "1", "OverlayMode"], "0x0100": ["CS", "1", "ThresholdDensity"], "0x0500": ["SQ", "1", "ReferencedImageBoxSequenceRetired"] }, "0x2050": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0010": ["SQ", "1", "PresentationLUTSequence"], "0x0020": ["CS", "1", "PresentationLUTShape"], "0x0500": ["SQ", "1", "ReferencedPresentationLUTSequence"] }, "0x2100": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0010": ["SH", "1", "PrintJobID"], "0x0020": ["CS", "1", "ExecutionStatus"], "0x0030": ["CS", "1", "ExecutionStatusInfo"], "0x0040": ["DA", "1", "CreationDate"], "0x0050": ["TM", "1", "CreationTime"], "0x0070": ["AE", "1", "Originator"], "0x0140": ["AE", "1", "DestinationAE"], "0x0160": ["SH", "1", "OwnerID"], "0x0170": ["IS", "1", "NumberOfFilms"], "0x0500": ["SQ", "1", "ReferencedPrintJobSequencePullStoredPrint"] }, "0x2110": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0010": ["CS", "1", "PrinterStatus"], "0x0020": ["CS", "1", "PrinterStatusInfo"], "0x0030": ["LO", "1", "PrinterName"], "0x0099": ["SH", "1", "PrintQueueID"] }, "0x2120": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0010": ["CS", "1", "QueueStatus"], "0x0050": ["SQ", "1", "PrintJobDescriptionSequence"], "0x0070": ["SQ", "1", "ReferencedPrintJobSequence"] }, "0x2130": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0010": ["SQ", "1", "PrintManagementCapabilitiesSequence"], "0x0015": ["SQ", "1", "PrinterCharacteristicsSequence"], "0x0030": ["SQ", "1", "FilmBoxContentSequence"], "0x0040": ["SQ", "1", "ImageBoxContentSequence"], "0x0050": ["SQ", "1", "AnnotationContentSequence"], "0x0060": ["SQ", "1", "ImageOverlayBoxContentSequence"], "0x0080": ["SQ", "1", "PresentationLUTContentSequence"], "0x00A0": ["SQ", "1", "ProposedStudySequence"], "0x00C0": ["SQ", "1", "OriginalImageSequence"] }, "0x2200": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0001": ["CS", "1", "LabelUsingInformationExtractedFromInstances"], "0x0002": ["UT", "1", "LabelText"], "0x0003": ["CS", "1", "LabelStyleSelection"], "0x0004": ["LT", "1", "MediaDisposition"], "0x0005": ["LT", "1", "BarcodeValue"], "0x0006": ["CS", "1", "BarcodeSymbology"], "0x0007": ["CS", "1", "AllowMediaSplitting"], "0x0008": ["CS", "1", "IncludeNonDICOMObjects"], "0x0009": ["CS", "1", "IncludeDisplayApplication"], "0x000A": ["CS", "1", "PreserveCompositeInstancesAfterMediaCreation"], "0x000B": ["US", "1", "TotalNumberOfPiecesOfMediaCreated"], "0x000C": ["LO", "1", "RequestedMediaApplicationProfile"], "0x000D": ["SQ", "1", "ReferencedStorageMediaSequence"], "0x000E": ["AT", "1-n", "FailureAttributes"], "0x000F": ["CS", "1", "AllowLossyCompression"], "0x0020": ["CS", "1", "RequestPriority"] }, "0x3002": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0002": ["SH", "1", "RTImageLabel"], "0x0003": ["LO", "1", "RTImageName"], "0x0004": ["ST", "1", "RTImageDescription"], "0x000A": ["CS", "1", "ReportedValuesOrigin"], "0x000C": ["CS", "1", "RTImagePlane"], "0x000D": ["DS", "3", "XRayImageReceptorTranslation"], "0x000E": ["DS", "1", "XRayImageReceptorAngle"], "0x0010": ["DS", "6", "RTImageOrientation"], "0x0011": ["DS", "2", "ImagePlanePixelSpacing"], "0x0012": ["DS", "2", "RTImagePosition"], "0x0020": ["SH", "1", "RadiationMachineName"], "0x0022": ["DS", "1", "RadiationMachineSAD"], "0x0024": ["DS", "1", "RadiationMachineSSD"], "0x0026": ["DS", "1", "RTImageSID"], "0x0028": ["DS", "1", "SourceToReferenceObjectDistance"], "0x0029": ["IS", "1", "FractionNumber"], "0x0030": ["SQ", "1", "ExposureSequence"], "0x0032": ["DS", "1", "MetersetExposure"], "0x0034": ["DS", "4", "DiaphragmPosition"], "0x0040": ["SQ", "1", "FluenceMapSequence"], "0x0041": ["CS", "1", "FluenceDataSource"], "0x0042": ["DS", "1", "FluenceDataScale"], "0x0050": ["SQ", "1", "PrimaryFluenceModeSequence"], "0x0051": ["CS", "1", "FluenceMode"], "0x0052": ["SH", "1", "FluenceModeID"] }, "0x3004": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0001": ["CS", "1", "DVHType"], "0x0002": ["CS", "1", "DoseUnits"], "0x0004": ["CS", "1", "DoseType"], "0x0005": ["CS", "1", "SpatialTransformOfDose"], "0x0006": ["LO", "1", "DoseComment"], "0x0008": ["DS", "3", "NormalizationPoint"], "0x000A": ["CS", "1", "DoseSummationType"], "0x000C": ["DS", "2-n", "GridFrameOffsetVector"], "0x000E": ["DS", "1", "DoseGridScaling"], "0x0010": ["SQ", "1", "RTDoseROISequence"], "0x0012": ["DS", "1", "DoseValue"], "0x0014": ["CS", "1-3", "TissueHeterogeneityCorrection"], "0x0040": ["DS", "3", "DVHNormalizationPoint"], "0x0042": ["DS", "1", "DVHNormalizationDoseValue"], "0x0050": ["SQ", "1", "DVHSequence"], "0x0052": ["DS", "1", "DVHDoseScaling"], "0x0054": ["CS", "1", "DVHVolumeUnits"], "0x0056": ["IS", "1", "DVHNumberOfBins"], "0x0058": ["DS", "2-2n", "DVHData"], "0x0060": ["SQ", "1", "DVHReferencedROISequence"], "0x0062": ["CS", "1", "DVHROIContributionType"], "0x0070": ["DS", "1", "DVHMinimumDose"], "0x0072": ["DS", "1", "DVHMaximumDose"], "0x0074": ["DS", "1", "DVHMeanDose"] }, "0x3006": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0002": ["SH", "1", "StructureSetLabel"], "0x0004": ["LO", "1", "StructureSetName"], "0x0006": ["ST", "1", "StructureSetDescription"], "0x0008": ["DA", "1", "StructureSetDate"], "0x0009": ["TM", "1", "StructureSetTime"], "0x0010": ["SQ", "1", "ReferencedFrameOfReferenceSequence"], "0x0012": ["SQ", "1", "RTReferencedStudySequence"], "0x0014": ["SQ", "1", "RTReferencedSeriesSequence"], "0x0016": ["SQ", "1", "ContourImageSequence"], "0x0018": ["SQ", "1", "PredecessorStructureSetSequence"], "0x0020": ["SQ", "1", "StructureSetROISequence"], "0x0022": ["IS", "1", "ROINumber"], "0x0024": ["UI", "1", "ReferencedFrameOfReferenceUID"], "0x0026": ["LO", "1", "ROIName"], "0x0028": ["ST", "1", "ROIDescription"], "0x002A": ["IS", "3", "ROIDisplayColor"], "0x002C": ["DS", "1", "ROIVolume"], "0x0030": ["SQ", "1", "RTRelatedROISequence"], "0x0033": ["CS", "1", "RTROIRelationship"], "0x0036": ["CS", "1", "ROIGenerationAlgorithm"], "0x0038": ["LO", "1", "ROIGenerationDescription"], "0x0039": ["SQ", "1", "ROIContourSequence"], "0x0040": ["SQ", "1", "ContourSequence"], "0x0042": ["CS", "1", "ContourGeometricType"], "0x0044": ["DS", "1", "ContourSlabThickness"], "0x0045": ["DS", "3", "ContourOffsetVector"], "0x0046": ["IS", "1", "NumberOfContourPoints"], "0x0048": ["IS", "1", "ContourNumber"], "0x0049": ["IS", "1-n", "AttachedContours"], "0x0050": ["DS", "3-3n", "ContourData"], "0x0080": ["SQ", "1", "RTROIObservationsSequence"], "0x0082": ["IS", "1", "ObservationNumber"], "0x0084": ["IS", "1", "ReferencedROINumber"], "0x0085": ["SH", "1", "ROIObservationLabel"], "0x0086": ["SQ", "1", "RTROIIdentificationCodeSequence"], "0x0088": ["ST", "1", "ROIObservationDescription"], "0x00A0": ["SQ", "1", "RelatedRTROIObservationsSequence"], "0x00A4": ["CS", "1", "RTROIInterpretedType"], "0x00A6": ["PN", "1", "ROIInterpreter"], "0x00B0": ["SQ", "1", "ROIPhysicalPropertiesSequence"], "0x00B2": ["CS", "1", "ROIPhysicalProperty"], "0x00B4": ["DS", "1", "ROIPhysicalPropertyValue"], "0x00B6": ["SQ", "1", "ROIElementalCompositionSequence"], "0x00B7": ["US", "1", "ROIElementalCompositionAtomicNumber"], "0x00B8": ["FL", "1", "ROIElementalCompositionAtomicMassFraction"], "0x00B9": ["SQ", "1", "AdditionalRTROIIdentificationCodeSequence"], "0x00C0": ["SQ", "1", "FrameOfReferenceRelationshipSequence"], "0x00C2": ["UI", "1", "RelatedFrameOfReferenceUID"], "0x00C4": ["CS", "1", "FrameOfReferenceTransformationType"], "0x00C6": ["DS", "16", "FrameOfReferenceTransformationMatrix"], "0x00C8": ["LO", "1", "FrameOfReferenceTransformationComment"] }, "0x3008": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0010": ["SQ", "1", "MeasuredDoseReferenceSequence"], "0x0012": ["ST", "1", "MeasuredDoseDescription"], "0x0014": ["CS", "1", "MeasuredDoseType"], "0x0016": ["DS", "1", "MeasuredDoseValue"], "0x0020": ["SQ", "1", "TreatmentSessionBeamSequence"], "0x0021": ["SQ", "1", "TreatmentSessionIonBeamSequence"], "0x0022": ["IS", "1", "CurrentFractionNumber"], "0x0024": ["DA", "1", "TreatmentControlPointDate"], "0x0025": ["TM", "1", "TreatmentControlPointTime"], "0x002A": ["CS", "1", "TreatmentTerminationStatus"], "0x002B": ["SH", "1", "TreatmentTerminationCode"], "0x002C": ["CS", "1", "TreatmentVerificationStatus"], "0x0030": ["SQ", "1", "ReferencedTreatmentRecordSequence"], "0x0032": ["DS", "1", "SpecifiedPrimaryMeterset"], "0x0033": ["DS", "1", "SpecifiedSecondaryMeterset"], "0x0036": ["DS", "1", "DeliveredPrimaryMeterset"], "0x0037": ["DS", "1", "DeliveredSecondaryMeterset"], "0x003A": ["DS", "1", "SpecifiedTreatmentTime"], "0x003B": ["DS", "1", "DeliveredTreatmentTime"], "0x0040": ["SQ", "1", "ControlPointDeliverySequence"], "0x0041": ["SQ", "1", "IonControlPointDeliverySequence"], "0x0042": ["DS", "1", "SpecifiedMeterset"], "0x0044": ["DS", "1", "DeliveredMeterset"], "0x0045": ["FL", "1", "MetersetRateSet"], "0x0046": ["FL", "1", "MetersetRateDelivered"], "0x0047": ["FL", "1-n", "ScanSpotMetersetsDelivered"], "0x0048": ["DS", "1", "DoseRateDelivered"], "0x0050": ["SQ", "1", "TreatmentSummaryCalculatedDoseReferenceSequence"], "0x0052": ["DS", "1", "CumulativeDoseToDoseReference"], "0x0054": ["DA", "1", "FirstTreatmentDate"], "0x0056": ["DA", "1", "MostRecentTreatmentDate"], "0x005A": ["IS", "1", "NumberOfFractionsDelivered"], "0x0060": ["SQ", "1", "OverrideSequence"], "0x0061": ["AT", "1", "ParameterSequencePointer"], "0x0062": ["AT", "1", "OverrideParameterPointer"], "0x0063": ["IS", "1", "ParameterItemIndex"], "0x0064": ["IS", "1", "MeasuredDoseReferenceNumber"], "0x0065": ["AT", "1", "ParameterPointer"], "0x0066": ["ST", "1", "OverrideReason"], "0x0068": ["SQ", "1", "CorrectedParameterSequence"], "0x006A": ["FL", "1", "CorrectionValue"], "0x0070": ["SQ", "1", "CalculatedDoseReferenceSequence"], "0x0072": ["IS", "1", "CalculatedDoseReferenceNumber"], "0x0074": ["ST", "1", "CalculatedDoseReferenceDescription"], "0x0076": ["DS", "1", "CalculatedDoseReferenceDoseValue"], "0x0078": ["DS", "1", "StartMeterset"], "0x007A": ["DS", "1", "EndMeterset"], "0x0080": ["SQ", "1", "ReferencedMeasuredDoseReferenceSequence"], "0x0082": ["IS", "1", "ReferencedMeasuredDoseReferenceNumber"], "0x0090": ["SQ", "1", "ReferencedCalculatedDoseReferenceSequence"], "0x0092": ["IS", "1", "ReferencedCalculatedDoseReferenceNumber"], "0x00A0": ["SQ", "1", "BeamLimitingDeviceLeafPairsSequence"], "0x00B0": ["SQ", "1", "RecordedWedgeSequence"], "0x00C0": ["SQ", "1", "RecordedCompensatorSequence"], "0x00D0": ["SQ", "1", "RecordedBlockSequence"], "0x00E0": ["SQ", "1", "TreatmentSummaryMeasuredDoseReferenceSequence"], "0x00F0": ["SQ", "1", "RecordedSnoutSequence"], "0x00F2": ["SQ", "1", "RecordedRangeShifterSequence"], "0x00F4": ["SQ", "1", "RecordedLateralSpreadingDeviceSequence"], "0x00F6": ["SQ", "1", "RecordedRangeModulatorSequence"], "0x0100": ["SQ", "1", "RecordedSourceSequence"], "0x0105": ["LO", "1", "SourceSerialNumber"], "0x0110": ["SQ", "1", "TreatmentSessionApplicationSetupSequence"], "0x0116": ["CS", "1", "ApplicationSetupCheck"], "0x0120": ["SQ", "1", "RecordedBrachyAccessoryDeviceSequence"], "0x0122": ["IS", "1", "ReferencedBrachyAccessoryDeviceNumber"], "0x0130": ["SQ", "1", "RecordedChannelSequence"], "0x0132": ["DS", "1", "SpecifiedChannelTotalTime"], "0x0134": ["DS", "1", "DeliveredChannelTotalTime"], "0x0136": ["IS", "1", "SpecifiedNumberOfPulses"], "0x0138": ["IS", "1", "DeliveredNumberOfPulses"], "0x013A": ["DS", "1", "SpecifiedPulseRepetitionInterval"], "0x013C": ["DS", "1", "DeliveredPulseRepetitionInterval"], "0x0140": ["SQ", "1", "RecordedSourceApplicatorSequence"], "0x0142": ["IS", "1", "ReferencedSourceApplicatorNumber"], "0x0150": ["SQ", "1", "RecordedChannelShieldSequence"], "0x0152": ["IS", "1", "ReferencedChannelShieldNumber"], "0x0160": ["SQ", "1", "BrachyControlPointDeliveredSequence"], "0x0162": ["DA", "1", "SafePositionExitDate"], "0x0164": ["TM", "1", "SafePositionExitTime"], "0x0166": ["DA", "1", "SafePositionReturnDate"], "0x0168": ["TM", "1", "SafePositionReturnTime"], "0x0171": ["SQ", "1", "PulseSpecificBrachyControlPointDeliveredSequence"], "0x0172": ["US", "1", "PulseNumber"], "0x0173": ["SQ", "1", "BrachyPulseControlPointDeliveredSequence"], "0x0200": ["CS", "1", "CurrentTreatmentStatus"], "0x0202": ["ST", "1", "TreatmentStatusComment"], "0x0220": ["SQ", "1", "FractionGroupSummarySequence"], "0x0223": ["IS", "1", "ReferencedFractionNumber"], "0x0224": ["CS", "1", "FractionGroupType"], "0x0230": ["CS", "1", "BeamStopperPosition"], "0x0240": ["SQ", "1", "FractionStatusSummarySequence"], "0x0250": ["DA", "1", "TreatmentDate"], "0x0251": ["TM", "1", "TreatmentTime"] }, "0x300A": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0002": ["SH", "1", "RTPlanLabel"], "0x0003": ["LO", "1", "RTPlanName"], "0x0004": ["ST", "1", "RTPlanDescription"], "0x0006": ["DA", "1", "RTPlanDate"], "0x0007": ["TM", "1", "RTPlanTime"], "0x0009": ["LO", "1-n", "TreatmentProtocols"], "0x000A": ["CS", "1", "PlanIntent"], "0x000B": ["LO", "1-n", "TreatmentSites"], "0x000C": ["CS", "1", "RTPlanGeometry"], "0x000E": ["ST", "1", "PrescriptionDescription"], "0x0010": ["SQ", "1", "DoseReferenceSequence"], "0x0012": ["IS", "1", "DoseReferenceNumber"], "0x0013": ["UI", "1", "DoseReferenceUID"], "0x0014": ["CS", "1", "DoseReferenceStructureType"], "0x0015": ["CS", "1", "NominalBeamEnergyUnit"], "0x0016": ["LO", "1", "DoseReferenceDescription"], "0x0018": ["DS", "3", "DoseReferencePointCoordinates"], "0x001A": ["DS", "1", "NominalPriorDose"], "0x0020": ["CS", "1", "DoseReferenceType"], "0x0021": ["DS", "1", "ConstraintWeight"], "0x0022": ["DS", "1", "DeliveryWarningDose"], "0x0023": ["DS", "1", "DeliveryMaximumDose"], "0x0025": ["DS", "1", "TargetMinimumDose"], "0x0026": ["DS", "1", "TargetPrescriptionDose"], "0x0027": ["DS", "1", "TargetMaximumDose"], "0x0028": ["DS", "1", "TargetUnderdoseVolumeFraction"], "0x002A": ["DS", "1", "OrganAtRiskFullVolumeDose"], "0x002B": ["DS", "1", "OrganAtRiskLimitDose"], "0x002C": ["DS", "1", "OrganAtRiskMaximumDose"], "0x002D": ["DS", "1", "OrganAtRiskOverdoseVolumeFraction"], "0x0040": ["SQ", "1", "ToleranceTableSequence"], "0x0042": ["IS", "1", "ToleranceTableNumber"], "0x0043": ["SH", "1", "ToleranceTableLabel"], "0x0044": ["DS", "1", "GantryAngleTolerance"], "0x0046": ["DS", "1", "BeamLimitingDeviceAngleTolerance"], "0x0048": ["SQ", "1", "BeamLimitingDeviceToleranceSequence"], "0x004A": ["DS", "1", "BeamLimitingDevicePositionTolerance"], "0x004B": ["FL", "1", "SnoutPositionTolerance"], "0x004C": ["DS", "1", "PatientSupportAngleTolerance"], "0x004E": ["DS", "1", "TableTopEccentricAngleTolerance"], "0x004F": ["FL", "1", "TableTopPitchAngleTolerance"], "0x0050": ["FL", "1", "TableTopRollAngleTolerance"], "0x0051": ["DS", "1", "TableTopVerticalPositionTolerance"], "0x0052": ["DS", "1", "TableTopLongitudinalPositionTolerance"], "0x0053": ["DS", "1", "TableTopLateralPositionTolerance"], "0x0055": ["CS", "1", "RTPlanRelationship"], "0x0070": ["SQ", "1", "FractionGroupSequence"], "0x0071": ["IS", "1", "FractionGroupNumber"], "0x0072": ["LO", "1", "FractionGroupDescription"], "0x0078": ["IS", "1", "NumberOfFractionsPlanned"], "0x0079": ["IS", "1", "NumberOfFractionPatternDigitsPerDay"], "0x007A": ["IS", "1", "RepeatFractionCycleLength"], "0x007B": ["LT", "1", "FractionPattern"], "0x0080": ["IS", "1", "NumberOfBeams"], "0x0082": ["DS", "3", "BeamDoseSpecificationPoint"], "0x0084": ["DS", "1", "BeamDose"], "0x0086": ["DS", "1", "BeamMeterset"], "0x0088": ["FL", "1", "BeamDosePointDepth"], "0x0089": ["FL", "1", "BeamDosePointEquivalentDepth"], "0x008A": ["FL", "1", "BeamDosePointSSD"], "0x008B": ["CS", "1", "BeamDoseMeaning"], "0x008C": ["SQ", "1", "BeamDoseVerificationControlPointSequence"], "0x008D": ["FL", "1", "AverageBeamDosePointDepth"], "0x008E": ["FL", "1", "AverageBeamDosePointEquivalentDepth"], "0x008F": ["FL", "1", "AverageBeamDosePointSSD"], "0x00A0": ["IS", "1", "NumberOfBrachyApplicationSetups"], "0x00A2": ["DS", "3", "BrachyApplicationSetupDoseSpecificationPoint"], "0x00A4": ["DS", "1", "BrachyApplicationSetupDose"], "0x00B0": ["SQ", "1", "BeamSequence"], "0x00B2": ["SH", "1", "TreatmentMachineName"], "0x00B3": ["CS", "1", "PrimaryDosimeterUnit"], "0x00B4": ["DS", "1", "SourceAxisDistance"], "0x00B6": ["SQ", "1", "BeamLimitingDeviceSequence"], "0x00B8": ["CS", "1", "RTBeamLimitingDeviceType"], "0x00BA": ["DS", "1", "SourceToBeamLimitingDeviceDistance"], "0x00BB": ["FL", "1", "IsocenterToBeamLimitingDeviceDistance"], "0x00BC": ["IS", "1", "NumberOfLeafJawPairs"], "0x00BE": ["DS", "3-n", "LeafPositionBoundaries"], "0x00C0": ["IS", "1", "BeamNumber"], "0x00C2": ["LO", "1", "BeamName"], "0x00C3": ["ST", "1", "BeamDescription"], "0x00C4": ["CS", "1", "BeamType"], "0x00C5": ["FD", "1", "BeamDeliveryDurationLimit"], "0x00C6": ["CS", "1", "RadiationType"], "0x00C7": ["CS", "1", "HighDoseTechniqueType"], "0x00C8": ["IS", "1", "ReferenceImageNumber"], "0x00CA": ["SQ", "1", "PlannedVerificationImageSequence"], "0x00CC": ["LO", "1-n", "ImagingDeviceSpecificAcquisitionParameters"], "0x00CE": ["CS", "1", "TreatmentDeliveryType"], "0x00D0": ["IS", "1", "NumberOfWedges"], "0x00D1": ["SQ", "1", "WedgeSequence"], "0x00D2": ["IS", "1", "WedgeNumber"], "0x00D3": ["CS", "1", "WedgeType"], "0x00D4": ["SH", "1", "WedgeID"], "0x00D5": ["IS", "1", "WedgeAngle"], "0x00D6": ["DS", "1", "WedgeFactor"], "0x00D7": ["FL", "1", "TotalWedgeTrayWaterEquivalentThickness"], "0x00D8": ["DS", "1", "WedgeOrientation"], "0x00D9": ["FL", "1", "IsocenterToWedgeTrayDistance"], "0x00DA": ["DS", "1", "SourceToWedgeTrayDistance"], "0x00DB": ["FL", "1", "WedgeThinEdgePosition"], "0x00DC": ["SH", "1", "BolusID"], "0x00DD": ["ST", "1", "BolusDescription"], "0x00DE": ["DS", "1", "EffectiveWedgeAngle"], "0x00E0": ["IS", "1", "NumberOfCompensators"], "0x00E1": ["SH", "1", "MaterialID"], "0x00E2": ["DS", "1", "TotalCompensatorTrayFactor"], "0x00E3": ["SQ", "1", "CompensatorSequence"], "0x00E4": ["IS", "1", "CompensatorNumber"], "0x00E5": ["SH", "1", "CompensatorID"], "0x00E6": ["DS", "1", "SourceToCompensatorTrayDistance"], "0x00E7": ["IS", "1", "CompensatorRows"], "0x00E8": ["IS", "1", "CompensatorColumns"], "0x00E9": ["DS", "2", "CompensatorPixelSpacing"], "0x00EA": ["DS", "2", "CompensatorPosition"], "0x00EB": ["DS", "1-n", "CompensatorTransmissionData"], "0x00EC": ["DS", "1-n", "CompensatorThicknessData"], "0x00ED": ["IS", "1", "NumberOfBoli"], "0x00EE": ["CS", "1", "CompensatorType"], "0x00EF": ["SH", "1", "CompensatorTrayID"], "0x00F0": ["IS", "1", "NumberOfBlocks"], "0x00F2": ["DS", "1", "TotalBlockTrayFactor"], "0x00F3": ["FL", "1", "TotalBlockTrayWaterEquivalentThickness"], "0x00F4": ["SQ", "1", "BlockSequence"], "0x00F5": ["SH", "1", "BlockTrayID"], "0x00F6": ["DS", "1", "SourceToBlockTrayDistance"], "0x00F7": ["FL", "1", "IsocenterToBlockTrayDistance"], "0x00F8": ["CS", "1", "BlockType"], "0x00F9": ["LO", "1", "AccessoryCode"], "0x00FA": ["CS", "1", "BlockDivergence"], "0x00FB": ["CS", "1", "BlockMountingPosition"], "0x00FC": ["IS", "1", "BlockNumber"], "0x00FE": ["LO", "1", "BlockName"], "0x0100": ["DS", "1", "BlockThickness"], "0x0102": ["DS", "1", "BlockTransmission"], "0x0104": ["IS", "1", "BlockNumberOfPoints"], "0x0106": ["DS", "2-2n", "BlockData"], "0x0107": ["SQ", "1", "ApplicatorSequence"], "0x0108": ["SH", "1", "ApplicatorID"], "0x0109": ["CS", "1", "ApplicatorType"], "0x010A": ["LO", "1", "ApplicatorDescription"], "0x010C": ["DS", "1", "CumulativeDoseReferenceCoefficient"], "0x010E": ["DS", "1", "FinalCumulativeMetersetWeight"], "0x0110": ["IS", "1", "NumberOfControlPoints"], "0x0111": ["SQ", "1", "ControlPointSequence"], "0x0112": ["IS", "1", "ControlPointIndex"], "0x0114": ["DS", "1", "NominalBeamEnergy"], "0x0115": ["DS", "1", "DoseRateSet"], "0x0116": ["SQ", "1", "WedgePositionSequence"], "0x0118": ["CS", "1", "WedgePosition"], "0x011A": ["SQ", "1", "BeamLimitingDevicePositionSequence"], "0x011C": ["DS", "2-2n", "LeafJawPositions"], "0x011E": ["DS", "1", "GantryAngle"], "0x011F": ["CS", "1", "GantryRotationDirection"], "0x0120": ["DS", "1", "BeamLimitingDeviceAngle"], "0x0121": ["CS", "1", "BeamLimitingDeviceRotationDirection"], "0x0122": ["DS", "1", "PatientSupportAngle"], "0x0123": ["CS", "1", "PatientSupportRotationDirection"], "0x0124": ["DS", "1", "TableTopEccentricAxisDistance"], "0x0125": ["DS", "1", "TableTopEccentricAngle"], "0x0126": ["CS", "1", "TableTopEccentricRotationDirection"], "0x0128": ["DS", "1", "TableTopVerticalPosition"], "0x0129": ["DS", "1", "TableTopLongitudinalPosition"], "0x012A": ["DS", "1", "TableTopLateralPosition"], "0x012C": ["DS", "3", "IsocenterPosition"], "0x012E": ["DS", "3", "SurfaceEntryPoint"], "0x0130": ["DS", "1", "SourceToSurfaceDistance"], "0x0131": ["FL", "1", "AverageBeamDosePointSourceToExternalContourSurfaceDistance"], "0x0132": ["FL", "1", "SourceToExternalContourDistance"], "0x0133": ["FL", "3", "ExternalContourEntryPoint"], "0x0134": ["DS", "1", "CumulativeMetersetWeight"], "0x0140": ["FL", "1", "TableTopPitchAngle"], "0x0142": ["CS", "1", "TableTopPitchRotationDirection"], "0x0144": ["FL", "1", "TableTopRollAngle"], "0x0146": ["CS", "1", "TableTopRollRotationDirection"], "0x0148": ["FL", "1", "HeadFixationAngle"], "0x014A": ["FL", "1", "GantryPitchAngle"], "0x014C": ["CS", "1", "GantryPitchRotationDirection"], "0x014E": ["FL", "1", "GantryPitchAngleTolerance"], "0x0180": ["SQ", "1", "PatientSetupSequence"], "0x0182": ["IS", "1", "PatientSetupNumber"], "0x0183": ["LO", "1", "PatientSetupLabel"], "0x0184": ["LO", "1", "PatientAdditionalPosition"], "0x0190": ["SQ", "1", "FixationDeviceSequence"], "0x0192": ["CS", "1", "FixationDeviceType"], "0x0194": ["SH", "1", "FixationDeviceLabel"], "0x0196": ["ST", "1", "FixationDeviceDescription"], "0x0198": ["SH", "1", "FixationDevicePosition"], "0x0199": ["FL", "1", "FixationDevicePitchAngle"], "0x019A": ["FL", "1", "FixationDeviceRollAngle"], "0x01A0": ["SQ", "1", "ShieldingDeviceSequence"], "0x01A2": ["CS", "1", "ShieldingDeviceType"], "0x01A4": ["SH", "1", "ShieldingDeviceLabel"], "0x01A6": ["ST", "1", "ShieldingDeviceDescription"], "0x01A8": ["SH", "1", "ShieldingDevicePosition"], "0x01B0": ["CS", "1", "SetupTechnique"], "0x01B2": ["ST", "1", "SetupTechniqueDescription"], "0x01B4": ["SQ", "1", "SetupDeviceSequence"], "0x01B6": ["CS", "1", "SetupDeviceType"], "0x01B8": ["SH", "1", "SetupDeviceLabel"], "0x01BA": ["ST", "1", "SetupDeviceDescription"], "0x01BC": ["DS", "1", "SetupDeviceParameter"], "0x01D0": ["ST", "1", "SetupReferenceDescription"], "0x01D2": ["DS", "1", "TableTopVerticalSetupDisplacement"], "0x01D4": ["DS", "1", "TableTopLongitudinalSetupDisplacement"], "0x01D6": ["DS", "1", "TableTopLateralSetupDisplacement"], "0x0200": ["CS", "1", "BrachyTreatmentTechnique"], "0x0202": ["CS", "1", "BrachyTreatmentType"], "0x0206": ["SQ", "1", "TreatmentMachineSequence"], "0x0210": ["SQ", "1", "SourceSequence"], "0x0212": ["IS", "1", "SourceNumber"], "0x0214": ["CS", "1", "SourceType"], "0x0216": ["LO", "1", "SourceManufacturer"], "0x0218": ["DS", "1", "ActiveSourceDiameter"], "0x021A": ["DS", "1", "ActiveSourceLength"], "0x021B": ["SH", "1", "SourceModelID"], "0x021C": ["LO", "1", "SourceDescription"], "0x0222": ["DS", "1", "SourceEncapsulationNominalThickness"], "0x0224": ["DS", "1", "SourceEncapsulationNominalTransmission"], "0x0226": ["LO", "1", "SourceIsotopeName"], "0x0228": ["DS", "1", "SourceIsotopeHalfLife"], "0x0229": ["CS", "1", "SourceStrengthUnits"], "0x022A": ["DS", "1", "ReferenceAirKermaRate"], "0x022B": ["DS", "1", "SourceStrength"], "0x022C": ["DA", "1", "SourceStrengthReferenceDate"], "0x022E": ["TM", "1", "SourceStrengthReferenceTime"], "0x0230": ["SQ", "1", "ApplicationSetupSequence"], "0x0232": ["CS", "1", "ApplicationSetupType"], "0x0234": ["IS", "1", "ApplicationSetupNumber"], "0x0236": ["LO", "1", "ApplicationSetupName"], "0x0238": ["LO", "1", "ApplicationSetupManufacturer"], "0x0240": ["IS", "1", "TemplateNumber"], "0x0242": ["SH", "1", "TemplateType"], "0x0244": ["LO", "1", "TemplateName"], "0x0250": ["DS", "1", "TotalReferenceAirKerma"], "0x0260": ["SQ", "1", "BrachyAccessoryDeviceSequence"], "0x0262": ["IS", "1", "BrachyAccessoryDeviceNumber"], "0x0263": ["SH", "1", "BrachyAccessoryDeviceID"], "0x0264": ["CS", "1", "BrachyAccessoryDeviceType"], "0x0266": ["LO", "1", "BrachyAccessoryDeviceName"], "0x026A": ["DS", "1", "BrachyAccessoryDeviceNominalThickness"], "0x026C": ["DS", "1", "BrachyAccessoryDeviceNominalTransmission"], "0x0280": ["SQ", "1", "ChannelSequence"], "0x0282": ["IS", "1", "ChannelNumber"], "0x0284": ["DS", "1", "ChannelLength"], "0x0286": ["DS", "1", "ChannelTotalTime"], "0x0288": ["CS", "1", "SourceMovementType"], "0x028A": ["IS", "1", "NumberOfPulses"], "0x028C": ["DS", "1", "PulseRepetitionInterval"], "0x0290": ["IS", "1", "SourceApplicatorNumber"], "0x0291": ["SH", "1", "SourceApplicatorID"], "0x0292": ["CS", "1", "SourceApplicatorType"], "0x0294": ["LO", "1", "SourceApplicatorName"], "0x0296": ["DS", "1", "SourceApplicatorLength"], "0x0298": ["LO", "1", "SourceApplicatorManufacturer"], "0x029C": ["DS", "1", "SourceApplicatorWallNominalThickness"], "0x029E": ["DS", "1", "SourceApplicatorWallNominalTransmission"], "0x02A0": ["DS", "1", "SourceApplicatorStepSize"], "0x02A2": ["IS", "1", "TransferTubeNumber"], "0x02A4": ["DS", "1", "TransferTubeLength"], "0x02B0": ["SQ", "1", "ChannelShieldSequence"], "0x02B2": ["IS", "1", "ChannelShieldNumber"], "0x02B3": ["SH", "1", "ChannelShieldID"], "0x02B4": ["LO", "1", "ChannelShieldName"], "0x02B8": ["DS", "1", "ChannelShieldNominalThickness"], "0x02BA": ["DS", "1", "ChannelShieldNominalTransmission"], "0x02C8": ["DS", "1", "FinalCumulativeTimeWeight"], "0x02D0": ["SQ", "1", "BrachyControlPointSequence"], "0x02D2": ["DS", "1", "ControlPointRelativePosition"], "0x02D4": ["DS", "3", "ControlPoint3DPosition"], "0x02D6": ["DS", "1", "CumulativeTimeWeight"], "0x02E0": ["CS", "1", "CompensatorDivergence"], "0x02E1": ["CS", "1", "CompensatorMountingPosition"], "0x02E2": ["DS", "1-n", "SourceToCompensatorDistance"], "0x02E3": ["FL", "1", "TotalCompensatorTrayWaterEquivalentThickness"], "0x02E4": ["FL", "1", "IsocenterToCompensatorTrayDistance"], "0x02E5": ["FL", "1", "CompensatorColumnOffset"], "0x02E6": ["FL", "1-n", "IsocenterToCompensatorDistances"], "0x02E7": ["FL", "1", "CompensatorRelativeStoppingPowerRatio"], "0x02E8": ["FL", "1", "CompensatorMillingToolDiameter"], "0x02EA": ["SQ", "1", "IonRangeCompensatorSequence"], "0x02EB": ["LT", "1", "CompensatorDescription"], "0x0302": ["IS", "1", "RadiationMassNumber"], "0x0304": ["IS", "1", "RadiationAtomicNumber"], "0x0306": ["SS", "1", "RadiationChargeState"], "0x0308": ["CS", "1", "ScanMode"], "0x030A": ["FL", "2", "VirtualSourceAxisDistances"], "0x030C": ["SQ", "1", "SnoutSequence"], "0x030D": ["FL", "1", "SnoutPosition"], "0x030F": ["SH", "1", "SnoutID"], "0x0312": ["IS", "1", "NumberOfRangeShifters"], "0x0314": ["SQ", "1", "RangeShifterSequence"], "0x0316": ["IS", "1", "RangeShifterNumber"], "0x0318": ["SH", "1", "RangeShifterID"], "0x0320": ["CS", "1", "RangeShifterType"], "0x0322": ["LO", "1", "RangeShifterDescription"], "0x0330": ["IS", "1", "NumberOfLateralSpreadingDevices"], "0x0332": ["SQ", "1", "LateralSpreadingDeviceSequence"], "0x0334": ["IS", "1", "LateralSpreadingDeviceNumber"], "0x0336": ["SH", "1", "LateralSpreadingDeviceID"], "0x0338": ["CS", "1", "LateralSpreadingDeviceType"], "0x033A": ["LO", "1", "LateralSpreadingDeviceDescription"], "0x033C": ["FL", "1", "LateralSpreadingDeviceWaterEquivalentThickness"], "0x0340": ["IS", "1", "NumberOfRangeModulators"], "0x0342": ["SQ", "1", "RangeModulatorSequence"], "0x0344": ["IS", "1", "RangeModulatorNumber"], "0x0346": ["SH", "1", "RangeModulatorID"], "0x0348": ["CS", "1", "RangeModulatorType"], "0x034A": ["LO", "1", "RangeModulatorDescription"], "0x034C": ["SH", "1", "BeamCurrentModulationID"], "0x0350": ["CS", "1", "PatientSupportType"], "0x0352": ["SH", "1", "PatientSupportID"], "0x0354": ["LO", "1", "PatientSupportAccessoryCode"], "0x0356": ["FL", "1", "FixationLightAzimuthalAngle"], "0x0358": ["FL", "1", "FixationLightPolarAngle"], "0x035A": ["FL", "1", "MetersetRate"], "0x0360": ["SQ", "1", "RangeShifterSettingsSequence"], "0x0362": ["LO", "1", "RangeShifterSetting"], "0x0364": ["FL", "1", "IsocenterToRangeShifterDistance"], "0x0366": ["FL", "1", "RangeShifterWaterEquivalentThickness"], "0x0370": ["SQ", "1", "LateralSpreadingDeviceSettingsSequence"], "0x0372": ["LO", "1", "LateralSpreadingDeviceSetting"], "0x0374": ["FL", "1", "IsocenterToLateralSpreadingDeviceDistance"], "0x0380": ["SQ", "1", "RangeModulatorSettingsSequence"], "0x0382": ["FL", "1", "RangeModulatorGatingStartValue"], "0x0384": ["FL", "1", "RangeModulatorGatingStopValue"], "0x0386": ["FL", "1", "RangeModulatorGatingStartWaterEquivalentThickness"], "0x0388": ["FL", "1", "RangeModulatorGatingStopWaterEquivalentThickness"], "0x038A": ["FL", "1", "IsocenterToRangeModulatorDistance"], "0x0390": ["SH", "1", "ScanSpotTuneID"], "0x0392": ["IS", "1", "NumberOfScanSpotPositions"], "0x0394": ["FL", "1-n", "ScanSpotPositionMap"], "0x0396": ["FL", "1-n", "ScanSpotMetersetWeights"], "0x0398": ["FL", "2", "ScanningSpotSize"], "0x039A": ["IS", "1", "NumberOfPaintings"], "0x03A0": ["SQ", "1", "IonToleranceTableSequence"], "0x03A2": ["SQ", "1", "IonBeamSequence"], "0x03A4": ["SQ", "1", "IonBeamLimitingDeviceSequence"], "0x03A6": ["SQ", "1", "IonBlockSequence"], "0x03A8": ["SQ", "1", "IonControlPointSequence"], "0x03AA": ["SQ", "1", "IonWedgeSequence"], "0x03AC": ["SQ", "1", "IonWedgePositionSequence"], "0x0401": ["SQ", "1", "ReferencedSetupImageSequence"], "0x0402": ["ST", "1", "SetupImageComment"], "0x0410": ["SQ", "1", "MotionSynchronizationSequence"], "0x0412": ["FL", "3", "ControlPointOrientation"], "0x0420": ["SQ", "1", "GeneralAccessorySequence"], "0x0421": ["SH", "1", "GeneralAccessoryID"], "0x0422": ["ST", "1", "GeneralAccessoryDescription"], "0x0423": ["CS", "1", "GeneralAccessoryType"], "0x0424": ["IS", "1", "GeneralAccessoryNumber"], "0x0425": ["FL", "1", "SourceToGeneralAccessoryDistance"], "0x0431": ["SQ", "1", "ApplicatorGeometrySequence"], "0x0432": ["CS", "1", "ApplicatorApertureShape"], "0x0433": ["FL", "1", "ApplicatorOpening"], "0x0434": ["FL", "1", "ApplicatorOpeningX"], "0x0435": ["FL", "1", "ApplicatorOpeningY"], "0x0436": ["FL", "1", "SourceToApplicatorMountingPositionDistance"], "0x0440": ["IS", "1", "NumberOfBlockSlabItems"], "0x0441": ["SQ", "1", "BlockSlabSequence"], "0x0442": ["DS", "1", "BlockSlabThickness"], "0x0443": ["US", "1", "BlockSlabNumber"], "0x0450": ["SQ", "1", "DeviceMotionControlSequence"], "0x0451": ["CS", "1", "DeviceMotionExecutionMode"], "0x0452": ["CS", "1", "DeviceMotionObservationMode"], "0x0453": ["SQ", "1", "DeviceMotionParameterCodeSequence"] }, "0x300C": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0002": ["SQ", "1", "ReferencedRTPlanSequence"], "0x0004": ["SQ", "1", "ReferencedBeamSequence"], "0x0006": ["IS", "1", "ReferencedBeamNumber"], "0x0007": ["IS", "1", "ReferencedReferenceImageNumber"], "0x0008": ["DS", "1", "StartCumulativeMetersetWeight"], "0x0009": ["DS", "1", "EndCumulativeMetersetWeight"], "0x000A": ["SQ", "1", "ReferencedBrachyApplicationSetupSequence"], "0x000C": ["IS", "1", "ReferencedBrachyApplicationSetupNumber"], "0x000E": ["IS", "1", "ReferencedSourceNumber"], "0x0020": ["SQ", "1", "ReferencedFractionGroupSequence"], "0x0022": ["IS", "1", "ReferencedFractionGroupNumber"], "0x0040": ["SQ", "1", "ReferencedVerificationImageSequence"], "0x0042": ["SQ", "1", "ReferencedReferenceImageSequence"], "0x0050": ["SQ", "1", "ReferencedDoseReferenceSequence"], "0x0051": ["IS", "1", "ReferencedDoseReferenceNumber"], "0x0055": ["SQ", "1", "BrachyReferencedDoseReferenceSequence"], "0x0060": ["SQ", "1", "ReferencedStructureSetSequence"], "0x006A": ["IS", "1", "ReferencedPatientSetupNumber"], "0x0080": ["SQ", "1", "ReferencedDoseSequence"], "0x00A0": ["IS", "1", "ReferencedToleranceTableNumber"], "0x00B0": ["SQ", "1", "ReferencedBolusSequence"], "0x00C0": ["IS", "1", "ReferencedWedgeNumber"], "0x00D0": ["IS", "1", "ReferencedCompensatorNumber"], "0x00E0": ["IS", "1", "ReferencedBlockNumber"], "0x00F0": ["IS", "1", "ReferencedControlPointIndex"], "0x00F2": ["SQ", "1", "ReferencedControlPointSequence"], "0x00F4": ["IS", "1", "ReferencedStartControlPointIndex"], "0x00F6": ["IS", "1", "ReferencedStopControlPointIndex"], "0x0100": ["IS", "1", "ReferencedRangeShifterNumber"], "0x0102": ["IS", "1", "ReferencedLateralSpreadingDeviceNumber"], "0x0104": ["IS", "1", "ReferencedRangeModulatorNumber"], "0x0111": ["SQ", "1", "OmittedBeamTaskSequence"], "0x0112": ["CS", "1", "ReasonForOmission"], "0x0113": ["LO", "1", "ReasonForOmissionDescription"] }, "0x300E": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0002": ["CS", "1", "ApprovalStatus"], "0x0004": ["DA", "1", "ReviewDate"], "0x0005": ["TM", "1", "ReviewTime"], "0x0008": ["PN", "1", "ReviewerName"] }, "0x4000": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0010": ["LT", "1", "Arbitrary"], "0x4000": ["LT", "1", "TextComments"] }, "0x4008": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0040": ["SH", "1", "ResultsID"], "0x0042": ["LO", "1", "ResultsIDIssuer"], "0x0050": ["SQ", "1", "ReferencedInterpretationSequence"], "0x00FF": ["CS", "1", "ReportProductionStatusTrial"], "0x0100": ["DA", "1", "InterpretationRecordedDate"], "0x0101": ["TM", "1", "InterpretationRecordedTime"], "0x0102": ["PN", "1", "InterpretationRecorder"], "0x0103": ["LO", "1", "ReferenceToRecordedSound"], "0x0108": ["DA", "1", "InterpretationTranscriptionDate"], "0x0109": ["TM", "1", "InterpretationTranscriptionTime"], "0x010A": ["PN", "1", "InterpretationTranscriber"], "0x010B": ["ST", "1", "InterpretationText"], "0x010C": ["PN", "1", "InterpretationAuthor"], "0x0111": ["SQ", "1", "InterpretationApproverSequence"], "0x0112": ["DA", "1", "InterpretationApprovalDate"], "0x0113": ["TM", "1", "InterpretationApprovalTime"], "0x0114": ["PN", "1", "PhysicianApprovingInterpretation"], "0x0115": ["LT", "1", "InterpretationDiagnosisDescription"], "0x0117": ["SQ", "1", "InterpretationDiagnosisCodeSequence"], "0x0118": ["SQ", "1", "ResultsDistributionListSequence"], "0x0119": ["PN", "1", "DistributionName"], "0x011A": ["LO", "1", "DistributionAddress"], "0x0200": ["SH", "1", "InterpretationID"], "0x0202": ["LO", "1", "InterpretationIDIssuer"], "0x0210": ["CS", "1", "InterpretationTypeID"], "0x0212": ["CS", "1", "InterpretationStatusID"], "0x0300": ["ST", "1", "Impressions"], "0x4000": ["ST", "1", "ResultsComments"] }, "0x4010": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0001": ["CS", "1", "LowEnergyDetectors"], "0x0002": ["CS", "1", "HighEnergyDetectors"], "0x0004": ["SQ", "1", "DetectorGeometrySequence"], "0x1001": ["SQ", "1", "ThreatROIVoxelSequence"], "0x1004": ["FL", "3", "ThreatROIBase"], "0x1005": ["FL", "3", "ThreatROIExtents"], "0x1006": ["OB", "1", "ThreatROIBitmap"], "0x1007": ["SH", "1", "RouteSegmentID"], "0x1008": ["CS", "1", "GantryType"], "0x1009": ["CS", "1", "OOIOwnerType"], "0x100A": ["SQ", "1", "RouteSegmentSequence"], "0x1010": ["US", "1", "PotentialThreatObjectID"], "0x1011": ["SQ", "1", "ThreatSequence"], "0x1012": ["CS", "1", "ThreatCategory"], "0x1013": ["LT", "1", "ThreatCategoryDescription"], "0x1014": ["CS", "1", "ATDAbilityAssessment"], "0x1015": ["CS", "1", "ATDAssessmentFlag"], "0x1016": ["FL", "1", "ATDAssessmentProbability"], "0x1017": ["FL", "1", "Mass"], "0x1018": ["FL", "1", "Density"], "0x1019": ["FL", "1", "ZEffective"], "0x101A": ["SH", "1", "BoardingPassID"], "0x101B": ["FL", "3", "CenterOfMass"], "0x101C": ["FL", "3", "CenterOfPTO"], "0x101D": ["FL", "6-n", "BoundingPolygon"], "0x101E": ["SH", "1", "RouteSegmentStartLocationID"], "0x101F": ["SH", "1", "RouteSegmentEndLocationID"], "0x1020": ["CS", "1", "RouteSegmentLocationIDType"], "0x1021": ["CS", "1-n", "AbortReason"], "0x1023": ["FL", "1", "VolumeOfPTO"], "0x1024": ["CS", "1", "AbortFlag"], "0x1025": ["DT", "1", "RouteSegmentStartTime"], "0x1026": ["DT", "1", "RouteSegmentEndTime"], "0x1027": ["CS", "1", "TDRType"], "0x1028": ["CS", "1", "InternationalRouteSegment"], "0x1029": ["LO", "1-n", "ThreatDetectionAlgorithmandVersion"], "0x102A": ["SH", "1", "AssignedLocation"], "0x102B": ["DT", "1", "AlarmDecisionTime"], "0x1031": ["CS", "1", "AlarmDecision"], "0x1033": ["US", "1", "NumberOfTotalObjects"], "0x1034": ["US", "1", "NumberOfAlarmObjects"], "0x1037": ["SQ", "1", "PTORepresentationSequence"], "0x1038": ["SQ", "1", "ATDAssessmentSequence"], "0x1039": ["CS", "1", "TIPType"], "0x103A": ["CS", "1", "DICOSVersion"], "0x1041": ["DT", "1", "OOIOwnerCreationTime"], "0x1042": ["CS", "1", "OOIType"], "0x1043": ["FL", "3", "OOISize"], "0x1044": ["CS", "1", "AcquisitionStatus"], "0x1045": ["SQ", "1", "BasisMaterialsCodeSequence"], "0x1046": ["CS", "1", "PhantomType"], "0x1047": ["SQ", "1", "OOIOwnerSequence"], "0x1048": ["CS", "1", "ScanType"], "0x1051": ["LO", "1", "ItineraryID"], "0x1052": ["SH", "1", "ItineraryIDType"], "0x1053": ["LO", "1", "ItineraryIDAssigningAuthority"], "0x1054": ["SH", "1", "RouteID"], "0x1055": ["SH", "1", "RouteIDAssigningAuthority"], "0x1056": ["CS", "1", "InboundArrivalType"], "0x1058": ["SH", "1", "CarrierID"], "0x1059": ["CS", "1", "CarrierIDAssigningAuthority"], "0x1060": ["FL", "3", "SourceOrientation"], "0x1061": ["FL", "3", "SourcePosition"], "0x1062": ["FL", "1", "BeltHeight"], "0x1064": ["SQ", "1", "AlgorithmRoutingCodeSequence"], "0x1067": ["CS", "1", "TransportClassification"], "0x1068": ["LT", "1", "OOITypeDescriptor"], "0x1069": ["FL", "1", "TotalProcessingTime"], "0x106C": ["OB", "1", "DetectorCalibrationData"], "0x106D": ["CS", "1", "AdditionalScreeningPerformed"], "0x106E": ["CS", "1", "AdditionalInspectionSelectionCriteria"], "0x106F": ["SQ", "1", "AdditionalInspectionMethodSequence"], "0x1070": ["CS", "1", "AITDeviceType"], "0x1071": ["SQ", "1", "QRMeasurementsSequence"], "0x1072": ["SQ", "1", "TargetMaterialSequence"], "0x1073": ["FD", "1", "SNRThreshold"], "0x1075": ["DS", "1", "ImageScaleRepresentation"], "0x1076": ["SQ", "1", "ReferencedPTOSequence"], "0x1077": ["SQ", "1", "ReferencedTDRInstanceSequence"], "0x1078": ["ST", "1", "PTOLocationDescription"], "0x1079": ["SQ", "1", "AnomalyLocatorIndicatorSequence"], "0x107A": ["FL", "3", "AnomalyLocatorIndicator"], "0x107B": ["SQ", "1", "PTORegionSequence"], "0x107C": ["CS", "1", "InspectionSelectionCriteria"], "0x107D": ["SQ", "1", "SecondaryInspectionMethodSequence"], "0x107E": ["DS", "6", "PRCSToRCSOrientation"] }, "0x4FFE": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0001": ["SQ", "1", "MACParametersSequence"] }, "0x5000": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0005": ["US", "1", "CurveDimensions"], "0x0010": ["US", "1", "NumberOfPoints"], "0x0020": ["CS", "1", "TypeOfData"], "0x0022": ["LO", "1", "CurveDescription"], "0x0030": ["SH", "1-n", "AxisUnits"], "0x0040": ["SH", "1-n", "AxisLabels"], "0x0103": ["US", "1", "DataValueRepresentation"], "0x0104": ["US", "1-n", "MinimumCoordinateValue"], "0x0105": ["US", "1-n", "MaximumCoordinateValue"], "0x0106": ["SH", "1-n", "CurveRange"], "0x0110": ["US", "1-n", "CurveDataDescriptor"], "0x0112": ["US", "1-n", "CoordinateStartValue"], "0x0114": ["US", "1-n", "CoordinateStepValue"], "0x1001": ["CS", "1", "CurveActivationLayer"], "0x2000": ["US", "1", "AudioType"], "0x2002": ["US", "1", "AudioSampleFormat"], "0x2004": ["US", "1", "NumberOfChannels"], "0x2006": ["UL", "1", "NumberOfSamples"], "0x2008": ["UL", "1", "SampleRate"], "0x200A": ["UL", "1", "TotalTime"], "0x200C": ["ox", "1", "AudioSampleData"], "0x200E": ["LT", "1", "AudioComments"], "0x2500": ["LO", "1", "CurveLabel"], "0x2600": ["SQ", "1", "CurveReferencedOverlaySequence"], "0x2610": ["US", "1", "CurveReferencedOverlayGroup"], "0x3000": ["ox", "1", "CurveData"] }, "0x5200": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x9229": ["SQ", "1", "SharedFunctionalGroupsSequence"], "0x9230": ["SQ", "1", "PerFrameFunctionalGroupsSequence"] }, "0x5400": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0100": ["SQ", "1", "WaveformSequence"], "0x0110": ["ox", "1", "ChannelMinimumValue"], "0x0112": ["ox", "1", "ChannelMaximumValue"], "0x1004": ["US", "1", "WaveformBitsAllocated"], "0x1006": ["CS", "1", "WaveformSampleInterpretation"], "0x100A": ["ox", "1", "WaveformPaddingValue"], "0x1010": ["ox", "1", "WaveformData"] }, "0x5600": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0010": ["OF", "1", "FirstOrderPhaseCorrectionAngle"], "0x0020": ["OF", "1", "SpectroscopyData"] }, "0x6000": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0010": ["US", "1", "OverlayRows"], "0x0011": ["US", "1", "OverlayColumns"], "0x0012": ["US", "1", "OverlayPlanes"], "0x0015": ["IS", "1", "NumberOfFramesInOverlay"], "0x0022": ["LO", "1", "OverlayDescription"], "0x0040": ["CS", "1", "OverlayType"], "0x0045": ["LO", "1", "OverlaySubtype"], "0x0050": ["SS", "2", "OverlayOrigin"], "0x0051": ["US", "1", "ImageFrameOrigin"], "0x0052": ["US", "1", "OverlayPlaneOrigin"], "0x0060": ["CS", "1", "OverlayCompressionCode"], "0x0061": ["SH", "1", "OverlayCompressionOriginator"], "0x0062": ["SH", "1", "OverlayCompressionLabel"], "0x0063": ["CS", "1", "OverlayCompressionDescription"], "0x0066": ["AT", "1-n", "OverlayCompressionStepPointers"], "0x0068": ["US", "1", "OverlayRepeatInterval"], "0x0069": ["US", "1", "OverlayBitsGrouped"], "0x0100": ["US", "1", "OverlayBitsAllocated"], "0x0102": ["US", "1", "OverlayBitPosition"], "0x0110": ["CS", "1", "OverlayFormat"], "0x0200": ["US", "1", "OverlayLocation"], "0x0800": ["CS", "1-n", "OverlayCodeLabel"], "0x0802": ["US", "1", "OverlayNumberOfTables"], "0x0803": ["AT", "1-n", "OverlayCodeTableLocation"], "0x0804": ["US", "1", "OverlayBitsForCodeWord"], "0x1001": ["CS", "1", "OverlayActivationLayer"], "0x1100": ["US", "1", "OverlayDescriptorGray"], "0x1101": ["US", "1", "OverlayDescriptorRed"], "0x1102": ["US", "1", "OverlayDescriptorGreen"], "0x1103": ["US", "1", "OverlayDescriptorBlue"], "0x1200": ["US", "1-n", "OverlaysGray"], "0x1201": ["US", "1-n", "OverlaysRed"], "0x1202": ["US", "1-n", "OverlaysGreen"], "0x1203": ["US", "1-n", "OverlaysBlue"], "0x1301": ["IS", "1", "ROIArea"], "0x1302": ["DS", "1", "ROIMean"], "0x1303": ["DS", "1", "ROIStandardDeviation"], "0x1500": ["LO", "1", "OverlayLabel"], "0x3000": ["ox", "1", "OverlayData"], "0x4000": ["LT", "1", "OverlayComments"] }, "0x7FE0": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0008": ["OF", "1", "FloatPixelData"], "0x0009": ["OD", "1", "DoubleFloatPixelData"], "0x0010": ["ox", "1", "PixelData"], "0x0020": ["OW", "1", "CoefficientsSDVN"], "0x0030": ["OW", "1", "CoefficientsSDHN"], "0x0040": ["OW", "1", "CoefficientsSDDN"] }, "0x7F00": { "0x0000": ["UL", "1", "GenericGroupLength"], "0x0010": ["ox", "1", "VariablePixelData"], "0x0011": ["US", "1", "VariableNextDataGroup"], "0x0020": ["OW", "1", "VariableCoefficientsSDVN"], "0x0030": ["OW", "1", "VariableCoefficientsSDHN"], "0x0040": ["OW", "1", "VariableCoefficientsSDDN"] }, "0xFFFA": { "0x0000": ["UL", "1", "GenericGroupLength"], "0xFFFA": ["SQ", "1", "DigitalSignaturesSequence"] }, "0xFFFC": { "0x0000": ["UL", "1", "GenericGroupLength"], "0xFFFC": ["OB", "1", "DataSetTrailingPadding"] }, "0xFFFE": { "0x0000": ["UL", "1", "GenericGroupLength"], "0xE000": ["NONE", "1", "Item"], "0xE00D": ["NONE", "1", "ItemDelimitationItem"], "0xE0DD": ["NONE", "1", "SequenceDelimitationItem"] } }, H.dicom.TagGroups = { x0000: "Command", x0002: "Meta Element", x0004: "File Set", x0008: "Identifying", x0009: "SPI Identifying", x0010: "Patient", x0012: "Clinical Trial", x0018: "Acquisition", x0019: "SPI Acquisition", x0020: "Image", x0021: "SPI Image", x0022: "Ophtalmology", x0028: "Image Presentation", x0032: "Study", x0038: "Visit", x003A: "Waveform", x0040: "Procedure", x0042: "Encapsulated Document", x0050: "Device Informations", x0054: "Nuclear Medicine", x0060: "Histogram", x0070: "Presentation State", x0072: "Hanging Protocol", x0088: "Storage", x0100: "Authorization", x0400: "Digital Signature", x1000: "Code Table", x1010: "Zonal Map", x2000: "Film Session", x2010: "Film Box", x2020: "Image Box", x2030: "Annotation", x2040: "Overlay Box", x2050: "Presentation LUT", x2100: "Print Job", x2110: "Printer", x2120: "Queue", x2130: "Print Content", x2200: "Media Creation", x3002: "RT Image", x3004: "RT Dose", x3006: "RT StructureSet", x3008: "RT Treatment", x300A: "RT Plan", x300C: "RT Relationship", x300E: "RT Approval", x4000: "Text", x4008: "Results", x4FFE: "MAC Parameters", x5000: "Curve", x5002: "Curve", x5004: "Curve", x5006: "Curve", x5008: "Curve", x500A: "Curve", x500C: "Curve", x500E: "Curve", x5400: "Waveform Data", x6000: "Overlays", x6002: "Overlays", x6004: "Overlays", x6008: "Overlays", x600A: "Overlays", x600C: "Overlays", x600E: "Overlays", xFFFC: "Generic", x7FE0: "Pixel Data", xFFFF: "Unknown" }, (H = H || {}).gui = H.gui || {}, H.gui.base = H.gui.base || {}, H.gui.filter = H.gui.filter || {}, H.gui.filter.base = H.gui.filter.base || {}, H.gui.base.Filter = function(r) {
        this.setup = function(e) {
            var t = H.html.createHtmlSelect("filterSelect", e, "filter");
            t.onchange = r.onChangeFilter;
            var n = H.html.createHiddenElement("li", "filterLi");
            n.className += " ui-block-b", n.appendChild(t);
            var i = r.getElement("toolList").getElementsByTagName("ul")[0];
            H.html.appendElement(i, n)
        }, this.display = function(e) {
            var t = r.getElement("filterLi");
            H.html.displayElement(t, e)
        }, this.initialise = function() {
            var e = r.getElement("filterSelect");
            e.selectedIndex = 0, H.gui.refreshElement(e)
        }
    }, H.gui.base.Threshold = function(n) {
        var i = new H.gui.Slider(n);
        this.setup = function() {
            var e = H.html.createHiddenElement("li", "thresholdLi");
            e.className += " ui-block-c";
            var t = n.getElement("toolList").getElementsByTagName("ul")[0];
            t.appendChild(e), i.append(), H.gui.refreshElement(t)
        }, this.display = function(e) {
            e && i.initialise();
            var t = n.getElement("thresholdLi");
            H.html.displayElement(t, e)
        }, this.initialise = function() {}
    }, H.gui.filter.base.createFilterApplyButton = function(e) { var t = document.createElement("button"); return t.id = "runFilterButton", t.onclick = e.onRunFilter, t.setAttribute("style", "width:100%; margin-top:0.5em;"), t.setAttribute("class", "ui-btn ui-btn-b"), t.appendChild(document.createTextNode(H.i18n("basics.apply"))), t }, H.gui.base.Sharpen = function(n) {
        this.setup = function() {
            var e = H.html.createHiddenElement("li", "sharpenLi");
            e.className += " ui-block-c", e.appendChild(H.gui.filter.base.createFilterApplyButton(n));
            var t = n.getElement("toolList").getElementsByTagName("ul")[0];
            H.html.appendElement(t, e)
        }, this.display = function(e) {
            var t = n.getElement("sharpenLi");
            H.html.displayElement(t, e)
        }
    }, H.gui.base.Sobel = function(n) {
        this.setup = function() {
            var e = H.html.createHiddenElement("li", "sobelLi");
            e.className += " ui-block-c", e.appendChild(H.gui.filter.base.createFilterApplyButton(n));
            var t = n.getElement("toolList").getElementsByTagName("ul")[0];
            H.html.appendElement(t, e)
        }, this.display = function(e) {
            var t = n.getElement("sobelLi");
            H.html.displayElement(t, e)
        }
    }, (H = H || {}).gui = H.gui || {}, H.gui.base = H.gui.base || {}, H.gui.base.getWindowSize = function() { return { width: W.innerWidth, height: W.innerHeight - 147 } }, H.gui.base.prompt = function(e, t) { return prompt(e, t) }, H.gui.base.displayProgress = function() {}, H.gui.base.focusImage = function() {}, H.gui.base.postProcessTable = function() {}, H.gui.base.getElement = function(e, t) {
        var n = document.getElementById(e);
        if (!n) return null;
        var i = n.getElementsByClassName(t),
            r = i[i.length - 1];
        return void 0 === r && (r = document.getElementById(e + "-" + t)), r
    }, H.gui.base.refreshElement = function() {}, H.gui.setSelected = function(e, t) {
        if (e) {
            var n = 0;
            for (n in e.options)
                if (e.options[n].value === t) break;
            e.selectedIndex = n, H.gui.refreshElement(e)
        }
    }, H.gui.base.Slider = function(r) {
        this.append = function() {
            var e = document.createElement("input");
            e.id = "threshold-min", e.type = "range", e.max = 1, e.min = 0, e.value = 0;
            var t = document.createElement("input");
            t.id = "threshold-max", t.type = "range", t.max = 1, t.min = 0, t.value = 1;
            var n = document.createElement("div");
            n.id = "threshold-div", n.setAttribute("data-role", "rangeslider"), n.appendChild(e), n.appendChild(t), n.setAttribute("data-mini", "true"), r.getElement("thresholdLi").appendChild(n), $("#threshold-div").on("change", function() { r.onChangeMinMax({ min: $("#threshold-min").val(), max: $("#threshold-max").val() }) }), H.gui.refreshElement(r.getElement("toolList"))
        }, this.initialise = function() {
            var e = r.getImage().getDataRange().min,
                t = r.getImage().getDataRange().max,
                n = document.getElementById("threshold-min");
            n.max = t, n.min = e, n.value = e;
            var i = document.getElementById("threshold-max");
            i.max = t, i.min = e, i.value = t, H.gui.refreshElement(r.getElement("toolList"))
        }
    }, H.gui.base.DicomTags = function(i) {
        this.update = function(e) {
            var t = i.getElement("tags");
            if (null !== t) {
                for (; t.hasChildNodes();) t.removeChild(t.firstChild);
                if (0 !== e.length) {
                    var n = H.html.toTable(e);
                    n.className = "tagsTable", H.gui.postProcessTable(n), 0 !== n.rows.length ? (H.html.translateTableRow(n.rows.item(0)), t.appendChild(H.html.getHtmlSearchForm(n)), t.appendChild(n), H.gui.refreshElement(t)) : console.warn("The processed table does not contain data.")
                } else console.warn("No DICOM tags to show.")
            } else console.warn("Cannot find a node to append the DICOM tags.")
        }
    }, H.gui.base.DrawList = function(D) {
        var v = this;
        this.update = function(e) {
            var t = !1;
            void 0 !== e.editable && (t = e.editable);
            var n = D.getElement("drawList");
            if (null !== n) {
                for (; n.hasChildNodes();) n.removeChild(n.firstChild);
                var i = D.getDrawDisplayDetails();
                if (0 !== i.length) {
                    var r = H.html.toTable(i);
                    if (r.className = "drawsTable", H.gui.postProcessTable(r), 0 !== r.rows.length) {
                        H.html.translateTableRow(r.rows.item(0)), H.html.translateTableColumn(r, 3, "shape", "name");
                        var o = function(e) { return function() { e.color = this.value, D.updateDraw(e) } },
                            a = function(e) { return function() { e.label = this.value, D.updateDraw(e) } },
                            s = function(e) { return function() { e.description = this.value, D.updateDraw(e) } },
                            l = function(t, n) {
                                return function() {
                                    var e = D.getViewController().getCurrentPosition();
                                    e.k = t, D.getViewController().setCurrentPosition(e), D.getViewController().setCurrentFrame(n), H.gui.focusImage()
                                }
                            },
                            u = function(e) { return function() { D.toogleGroupVisibility(e) } };
                        r.rows.item(0).insertCell(0).outerHTML = "<th>" + H.i18n("basics.visible") + "</th>";
                        for (var c = 1; c < r.rows.length; ++c) {
                            for (var d = i[c - 1], S = r.rows.item(c), x = S.cells, g = 0; g < x.length; ++g) 0 === g && (x[g].firstChild.data = x[g].firstChild.data.substring(0, 5)), t ? 4 === g ? H.html.makeCellEditable(x[g], o(d), "color") : 5 === g ? H.html.makeCellEditable(x[g], a(d)) : 6 === g && H.html.makeCellEditable(x[g], s(d)) : (x[0].onclick = l(x[1].firstChild.data, x[2].firstChild.data), x[0].onmouseover = H.html.setCursorToPointer, x[0].onmouseout = H.html.setCursorToDefault, 4 === g && H.html.makeCellEditable(x[g], null, "color"));
                            var m = S.insertCell(0),
                                h = document.createElement("input");
                            h.setAttribute("type", "checkbox"), h.checked = D.isGroupVisible(d), h.onclick = u(d), m.appendChild(h)
                        }
                        var p = document.createElement("input");
                        p.setAttribute("type", "checkbox"), p.id = "checkbox-editable", p.checked = t, p.onclick = function() { v.update({ editable: this.checked }) };
                        var f = document.createElement("label");
                        f.setAttribute("for", p.id), f.setAttribute("class", "inline"), f.appendChild(document.createTextNode(H.i18n("basics.editMode")));
                        var C = document.createElement("div");
                        C.appendChild(f), C.appendChild(p), n.appendChild(H.html.getHtmlSearchForm(r)), n.appendChild(C), n.appendChild(r);
                        var y = document.createElement("button");
                        y.onclick = function() { D.deleteDraws() }, y.setAttribute("class", "ui-btn ui-btn-inline"), y.appendChild(document.createTextNode(H.i18n("basics.deleteDraws"))), t || (y.style.display = "none"), n.appendChild(y), H.gui.refreshElement(n)
                    } else console.warn("The processed table does not contain data.")
                }
            } else console.warn("Cannot find a node to append the drawing list.")
        }
    }, (H = H || {}).gui = H.gui || {}, H.gui.base = H.gui.base || {}, H.gui.base.appendVersionHtml = function(e) {
        var t = document.getElementsByClassName("dwv-version");
        if (t)
            for (var n = 0; n < t.length; ++n) t[n].appendChild(document.createTextNode(e))
    }, H.gui.base.appendHelpHtml = function(e, t, n) {
        var i = "mouse";
        t && (i = "touch");
        for (var r = document.createElement("div"), o = null, a = Object.keys(e), s = 0; s < a.length; ++s) {
            o = e[a[s]];
            var l = document.createElement("h3");
            l.appendChild(document.createTextNode(o.getHelp().title));
            var u = document.createElement("div"),
                c = document.createElement("p");
            if (c.appendChild(document.createTextNode(o.getHelp().brief)), u.appendChild(c), o.getHelp()[i])
                for (var d = Object.keys(o.getHelp()[i]), S = 0; S < d.length; ++S) {
                    var x = o.getHelp()[i][d[S]],
                        g = document.createElement("img");
                    g.src = n.getHelpResourcesPath() + "/" + d[S] + ".png", g.style.float = "left", g.style.margin = "0px 15px 15px 0px";
                    var m = document.createElement("br");
                    m.style.clear = "both";
                    var h = document.createElement("p");
                    h.appendChild(g), h.appendChild(document.createTextNode(x)), h.appendChild(m), u.appendChild(h)
                }
            if (t) {
                var p = document.createElement("div");
                p.setAttribute("data-role", "collapsible"), p.appendChild(l), p.appendChild(u), r.appendChild(p)
            } else r.id = "accordion", r.appendChild(l), r.appendChild(u)
        }
        var f = n.getElement("help"),
            C = document.createElement("p");
        C.appendChild(document.createTextNode(H.i18n("help.intro.p0"))), f.appendChild(C);
        var y = document.createElement("p");
        y.appendChild(document.createTextNode(H.i18n("help.intro.p1"))), f.appendChild(y);
        var D = document.createElement("p");
        D.appendChild(document.createTextNode(H.i18n("help.tool_intro"))), f.appendChild(D), f.appendChild(r)
    }, (H = H || {}).html = H.html || {}, H.html.appendCell = function(e, t) {
        var n = e.insertCell(-1),
            i = t;
        (t instanceof Array || t instanceof Uint8Array || t instanceof Int8Array || t instanceof Uint16Array || t instanceof Int16Array || t instanceof Uint32Array) && (10 < t.length && ((t = Array.prototype.slice.call(t, 0, 10))[10] = "..."), i = Array.prototype.join.call(t, ", ")), n.appendChild(document.createTextNode(i))
    }, H.html.appendHCell = function(e, t) {
        var n = document.createElement("th");
        n.appendChild(document.createTextNode(t)), e.appendChild(n)
    }, H.html.appendRowForArray = function(e, t, n, i, r) { for (var o = null, a = 0; a < t.length; ++a) { var s = t[a]; "number" == typeof s || "string" == typeof s || null == s || i <= n ? (o || (o = e.insertRow(-1)), H.html.appendCell(o, s)) : H.html.appendRow(e, s, n + a, i, r) } }, H.html.appendRowForObject = function(e, t, n, i, r) {
        for (var o = Object.keys(t), a = null, s = 0; s < o.length; ++s) { var l = t[o[s]]; "number" == typeof l || "string" == typeof l || null == l || i <= n ? (a || (a = e.insertRow(-1)), 0 === s && r && H.html.appendCell(a, r), H.html.appendCell(a, l)) : H.html.appendRow(e, l, n + s, i, o[s]) }
        if (2 === n) {
            var u = e.createTHead().insertRow(-1);
            r && H.html.appendHCell(u, "");
            for (var c = 0; c < o.length; ++c) H.html.appendHCell(u, o[c])
        }
    }, H.html.appendRow = function(e, t, n, i, r) {
        if (t instanceof Array) H.html.appendRowForArray(e, t, n + 1, i, r);
        else {
            if ("object" != typeof t) throw new Error("Unsupported input data type.");
            H.html.appendRowForObject(e, t, n + 1, i, r)
        }
    }, H.html.toTable = function(e) { if (0 === e.length) return null; var t = document.createElement("table"); return H.html.appendRow(t, e, 0, 2), t }, H.html.getHtmlSearchForm = function(e) {
        var t = document.createElement("input");
        t.id = "table-search", t.onkeyup = function() { H.html.filterTable(t, e) };
        var n = document.createElement("label");
        n.setAttribute("for", t.id), n.appendChild(document.createTextNode(H.i18n("basics.search") + ": "));
        var i = document.createElement("form");
        return i.setAttribute("class", "filter"), i.onsubmit = function(e) { e.preventDefault() }, i.appendChild(n), i.appendChild(t), i
    }, H.html.filterTable = function(e, t) { H.html.dehighlight(t); for (var n = e.value.toLowerCase().split(" "), i = 0, r = 1; r < t.rows.length; ++r) { i = ""; for (var o = 0; o < n.length; ++o) t.rows[r].innerHTML.replace(/<[^>]+>/g, "").toLowerCase().indexOf(n[o]) < 0 ? i = "none" : n[o].length && H.html.highlight(n[o], t.rows[r]), t.rows[r].style.display = i } }, H.html.dehighlight = function(e) {
        for (var t = 0; t < e.childNodes.length; t++) {
            var n = e.childNodes[t];
            if (n.attributes && n.attributes.class && "highlighted" === n.attributes.class.value) return void n.parentNode.parentNode.replaceChild(document.createTextNode(n.parentNode.innerHTML.replace(/<[^>]+>/g, "")), n.parentNode);
            3 !== n.nodeType && H.html.dehighlight(n)
        }
    }, H.html.highlight = function(e, t) {
        for (var n = 0; n < t.childNodes.length; n++) {
            var i = t.childNodes[n];
            if (3 === i.nodeType) {
                var r = i.data,
                    o = r.toLowerCase();
                if (0 <= o.indexOf(e)) {
                    var a, s = document.createElement("span");
                    for (i.parentNode.replaceChild(s, i); - 1 !== (a = o.indexOf(e));) s.appendChild(document.createTextNode(r.substr(0, a))), s.appendChild(H.html.createHighlightNode(document.createTextNode(r.substr(a, e.length)))), r = r.substr(a + e.length), o = o.substr(a + e.length);
                    s.appendChild(document.createTextNode(r))
                }
            } else H.html.highlight(e, i)
        }
    }, H.html.createHighlightNode = function(e) { var t = document.createElement("span"); return t.setAttribute("class", "highlighted"), t.attributes.class.value = "highlighted", t.appendChild(e), t }, H.html.cleanNode = function(e) {
        if (e)
            for (; e.hasChildNodes();) e.removeChild(e.firstChild)
    }, H.html.removeNode = function(e) { e && (H.html.cleanNode(e), e.parentNode.removeChild(e)) }, H.html.removeNodes = function(e) { for (var t = 0; t < e.length; ++t) H.html.removeNode(e[t]) }, H.html.translateTableRow = function(e, t) {
        var n = void 0 === t ? "basics" : t;
        0 !== n.length && (n += ".");
        for (var i = e.cells, r = 0; r < i.length; ++r) {
            var o = i[r].firstChild.data;
            i[r].firstChild.data = H.i18n(n + o)
        }
    }, H.html.translateTableColumn = function(e, t, n, i) {
        var r = void 0 === n ? "basics" : n;
        0 !== r.length && (r += ".");
        var o = void 0 === i ? "" : i;
        if (0 !== o.length && (o = "." + o), 0 !== e.rows.length)
            for (var a = 1; a < e.rows.length; ++a) {
                var s = e.rows.item(a).cells;
                if (s.length >= t) {
                    var l = s[t].firstChild.data;
                    s[t].firstChild.data = H.i18n(r + l + o)
                }
            }
    }, H.html.makeCellEditable = function(e, t, n) {
        if (void 0 !== e) {
            var i = document.createElement("input");
            t ? i.onchange = t : i.disabled = !0, i.value = e.firstChild.data, void 0 === n || "color" === n && !H.browser.hasInputColor() ? i.type = "text" : i.type = n, H.html.cleanNode(e);
            var r = document.createElement("form");
            r.onsubmit = function(e) { e.preventDefault() }, r.appendChild(i), e.appendChild(r)
        } else console.warn("Cannot create input for non existing cell.")
    }, H.html.setCursorToPointer = function() { document.body.style.cursor = "pointer" }, H.html.setCursorToDefault = function() { document.body.style.cursor = "default" }, H.html.createHtmlSelect = function(e, t, n, i) {
        var r = document.createElement("select");
        r.className = e;
        var o, a = void 0 === n ? "" : n + ".",
            s = void 0 !== i,
            l = function(e) { var t = a + e + ".name"; return s ? H.i18nExists(t) ? H.i18n(t) : e : H.i18n(t) };
        if (t instanceof Array)
            for (var u in t) t.hasOwnProperty(u) && ((o = document.createElement("option")).value = t[u], o.appendChild(document.createTextNode(l(t[u]))), r.appendChild(o));
        else { if ("object" != typeof t) throw new Error("Unsupported input list type."); for (var c in t)(o = document.createElement("option")).value = c, o.appendChild(document.createTextNode(l(c))), r.appendChild(o) }
        return r
    }, H.html.displayElement = function(e, t) { e.style.display = t ? "" : "none" }, H.html.toggleDisplay = function(e) { "none" === e.style.display ? e.style.display = "" : e.style.display = "none" }, H.html.appendElement = function(e, t) { e.appendChild(t), H.gui.refreshElement(e) }, H.html.createHiddenElement = function(e, t) { var n = document.createElement(e); return n.className = t, n.style.display = "none", n }, (H = H || {}).gui = H.gui || {}, H.gui.base = H.gui.base || {}, H.gui.info = H.gui.info || {}, H.gui.base.plot = function() {}, H.gui.info.MiniColourMap = function(h, p) {
        this.create = function() {
            var e = h.getElementsByClassName("colour-map-info");
            0 !== e.length && H.html.removeNodes(e);
            var t = document.createElement("canvas");
            t.className = "colour-map-info", t.width = 98, t.height = 10, h.appendChild(t)
        }, this.update = function(e) { for (var t, n = e.wc, i = e.ww, r = h.getElementsByClassName("colour-map-info")[0], o = r.getContext("2d"), a = p.getViewController().getColourMap(), s = o.getImageData(0, 0, r.width, r.height), l = 0, u = p.getImage().getRescaledDataRange().min, c = (p.getImage().getRescaledDataRange().max - u) / r.width, d = 0, S = n - .5 - (i - 1) / 2, x = n - .5 + (i - 1) / 2, g = 0; g < r.height; ++g) { l = u; for (var m = 0; m < r.width; ++m) l <= S ? d = 0 : x < l ? d = 255 : (d = 255 * ((l - (n - .5)) / (i - 1) + .5) + 0, d = parseInt(d, 10)), t = 4 * (m + g * r.width), s.data[t] = a.red[d], s.data[t + 1] = a.green[d], s.data[t + 2] = a.blue[d], s.data[t + 3] = 255, l += c } o.putImageData(s, 0, 0) }
    }, H.gui.info.Plot = function(l, u) {
        this.create = function() { l && H.html.cleanNode(l), H.gui.plot(l, u.getImage().getHistogram()) }, this.update = function(e) {
            var t = e.wc,
                n = e.ww,
                i = parseInt((n - 1) / 2, 10),
                r = parseInt(t - .5, 10),
                o = r - i,
                a = r + i,
                s = [{ color: "#faa", lineWidth: 1, xaxis: { from: o, to: o } }, { color: "#aaf", lineWidth: 1, xaxis: { from: a, to: a } }];
            H.gui.plot(l, u.getImage().getHistogram(), { markings: s })
        }
    }, H.gui.info.Overlay = function(x, g, i) {
        var m = this;
        this.getOverlays = function() { var e = i.getImage(); if (e) { var t = e.getOverlays(); if (t) { var n = t[i.getViewController().getCurrentPosition().k]; if (n) return n[g] } } }, this.create = function() {
            H.html.cleanNode(x);
            var e = m.getOverlays();
            if (e)
                if ("bc" === g || "tc" === g || "cr" === g || "cl" === g) x.textContent = e[0].value;
                else { for (var t = document.createElement("ul"), n = 0; e[n]; n++) { var i; "window-center" === e[n].value ? (i = document.createElement("li")).className = "info-" + g + "-window-center" : "window-width" === e[n].value ? (i = document.createElement("li")).className = "info-" + g + "-window-width" : "zoom" === e[n].value ? (i = document.createElement("li")).className = "info-" + g + "-zoom" : "offset" === e[n].value ? (i = document.createElement("li")).className = "info-" + g + "-offset" : "value" === e[n].value ? (i = document.createElement("li")).className = "info-" + g + "-value" : "position" === e[n].value ? (i = document.createElement("li")).className = "info-" + g + "-position" : "frame" === e[n].value ? (i = document.createElement("li")).className = "info-" + g + "-frame" : ((i = document.createElement("li")).className = "info-" + g + "-" + n, i.appendChild(document.createTextNode(e[n].value))), t.appendChild(i) } x.appendChild(t) }
        }, this.update = function(e) {
            var t, n, i = m.getOverlays();
            if (i)
                if ("bc" === g || "tc" === g || "cr" === g || "cl" === g) x.textContent = i[0].value;
                else
                    for (n = 0; i[n]; n++)
                        if ("window-center" === i[n].value) {
                            if ("wl-center-change" === e.type) {
                                t = x.getElementsByClassName("info-" + g + "-window-center")[0], H.html.cleanNode(t);
                                var r = H.utils.replaceFlags2(i[n].format, [Math.round(e.wc)]);
                                t && t.appendChild(document.createTextNode(r))
                            }
                        } else if ("window-width" === i[n].value) {
                if ("wl-width-change" === e.type) {
                    t = x.getElementsByClassName("info-" + g + "-window-width")[0], H.html.cleanNode(t);
                    var o = H.utils.replaceFlags2(i[n].format, [Math.round(e.ww)]);
                    t && t.appendChild(document.createTextNode(o))
                }
            } else if ("zoom" === i[n].value) {
                if ("zoom-change" === e.type) {
                    t = x.getElementsByClassName("info-" + g + "-zoom")[0], H.html.cleanNode(t);
                    var a = Number(e.scale).toPrecision(3),
                        s = H.utils.replaceFlags2(i[n].format, [a]);
                    t && t.appendChild(document.createTextNode(s))
                }
            } else if ("offset" === i[n].value) {
                if ("zoom-change" === e.type) {
                    t = x.getElementsByClassName("info-" + g + "-offset")[0], H.html.cleanNode(t);
                    var l = [Number(e.cx).toPrecision(3), Number(e.cy).toPrecision(3)],
                        u = H.utils.replaceFlags2(i[n].format, l);
                    t && t.appendChild(document.createTextNode(u))
                }
            } else if ("value" === i[n].value) {
                if ("position-change" === e.type) {
                    t = x.getElementsByClassName("info-" + g + "-value")[0], H.html.cleanNode(t);
                    var c = H.utils.replaceFlags2(i[n].format, [e.value]);
                    t && t.appendChild(document.createTextNode(c))
                }
            } else if ("position" === i[n].value) {
                if ("position-change" === e.type) {
                    t = x.getElementsByClassName("info-" + g + "-position")[0], H.html.cleanNode(t);
                    var d = H.utils.replaceFlags2(i[n].format, [e.i, e.j, e.k]);
                    t && t.appendChild(document.createTextNode(d))
                }
            } else if ("frame" === i[n].value) {
                if ("frame-change" === e.type) {
                    t = x.getElementsByClassName("info-" + g + "-frame")[0], H.html.cleanNode(t);
                    var S = H.utils.replaceFlags2(i[n].format, [e.frame]);
                    t && t.appendChild(document.createTextNode(S))
                }
            } else "position-change" === e.type && (t = x.getElementsByClassName("info-" + g + "-" + n)[0], H.html.cleanNode(t), t && t.appendChild(document.createTextNode(i[n].value)))
        }
    }, H.gui.info.createOverlays = function(e) {
        var t = {},
            n = e.getFromKey("x00080060");
        if (!n) return t;
        var i = H.gui.info.overlayMaps;
        if (!i) return t;
        for (var r = i[n] || i["*"], o = 0; r[o]; o++) {
            var a = r[o].value,
                s = r[o].tags,
                l = r[o].format,
                u = r[o].pos;
            if (void 0 !== s && 0 !== s.length) {
                for (var c = [], d = 0; d < s.length; ++d) c.push(e.getElementValueAsStringFromKey(s[d]));
                null == l && (l = H.utils.createDefaultReplaceFormat(c)), a = H.utils.replaceFlags2(l, c)
            }
            a && 0 !== a.length && (t[u] || (t[u] = []), t[u].push({ value: a.trim(), format: l }))
        }
        var S = e.getFromKey("x00200020");
        if (null != S && 2 == S.length) {
            var x = H.dicom.cleanString(S[0]),
                g = H.dicom.cleanString(S[1]);
            t.cr = [{ value: x }], t.cl = [{ value: H.dicom.getReverseOrientation(x) }], t.bc = [{ value: g }], t.tc = [{ value: H.dicom.getReverseOrientation(g) }]
        }
        return t
    }, H.gui.info.createOverlaysForDom = function(e) {
        var t = {},
            n = H.gui.info.overlayMaps;
        if (!n) return t;
        var i = n.DOM;
        if (!i) return t;
        for (var r = 0; i[r]; r++) {
            var o = i[r].value,
                a = i[r].tags,
                s = i[r].format,
                l = i[r].pos;
            if (void 0 !== a && 0 !== a.length) {
                for (var u = [], c = 0; c < a.length; ++c)
                    for (var d = 0; d < e.length; ++d) a[c] === e[d].name && u.push(e[d].value);
                null == s && (s = H.utils.createDefaultReplaceFormat(u)), o = H.utils.replaceFlags2(s, u)
            }
            o && 0 !== o.length && (t[l] || (t[l] = []), t[l].push({ value: o.trim(), format: s }))
        }
        return t
    }, (H = H || {}).html = H.html || {}, H.html.Layer = function(u) {
        var n = null,
            i = null;
        this.getCanvas = function() { return u }, this.getContext = function() { return i }, this.getOffset = function() { return u.offset() };
        var c = null,
            d = { x: 0, y: 0 };
        this.getOrigin = function() { return d };
        var S = { x: 1, y: 1 };
        this.getZoom = function() { return S };
        var r = { x: 0, y: 0 };
        this.getTrans = function() { return r }, this.setWidth = function(e) { u.width = e }, this.setHeight = function(e) { u.height = e }, this.zoom = function(e, t, n, i) { d.x = n - (n - d.x) * (e / S.x), d.y = i - (i - d.y) * (t / S.y), S.x = e, S.y = t }, this.translate = function(e, t) { r.x = e, r.y = t }, this.setImageData = function(e) { c = e, n.getContext("2d").putImageData(c, 0, 0) }, this.resetLayout = function(e) { d.x = 0, d.y = 0, S.x = e, S.y = e, r.x = 0, r.y = 0 }, this.displayToIndex = function(e) { return { x: (e.x - d.x) / S.x - r.x, y: (e.y - d.y) / S.y - r.y } }, this.draw = function() { i.save(), i.setTransform(1, 0, 0, 1, 0, 0), i.clearRect(0, 0, u.width, u.height), i.restore(), i.setTransform(S.x, 0, 0, S.y, d.x + r.x * S.x, d.y + r.y * S.y), i.drawImage(n, 0, 0) }, this.initialise = function(e, t) { u.getContext ? (i = u.getContext("2d")) ? (u.width = e, u.height = t, i.clearRect(0, 0, u.width, u.height), c = i.getImageData(0, 0, u.width, u.height), (n = document.createElement("canvas")).width = e, n.height = t) : alert("Error: failed to get the 2D context.") : alert("Error: no canvas.getContext method.") }, this.fillContext = function() { i.fillRect(0, 0, u.width, u.height) }, this.clear = function() { i.clearRect(0, 0, u.width, u.height), c = i.getImageData(0, 0, u.width, u.height), this.resetLayout() }, this.merge = function(e) { for (var t = e.getContext().getImageData(0, 0, u.width, u.height), n = 0, i = 0, r = 0, o = 0, a = 0, s = 0; s < u.height; ++s) { i = parseInt(d.y + s * S.y, 10) * u.width, o = s * u.width; for (var l = 0; l < u.width; ++l) n = 4 * (parseInt(d.x + l * S.x, 10) + i), r = 4 * (l + o), 0 !== (a = t.data[n + 3]) && (c.data[r] = t.data[n], c.data[r + 1] = t.data[n + 1], c.data[r + 2] = t.data[n + 2], c.data[r + 3] = a) } e.clear(), this.draw() }, this.setLineColour = function(e) { i.fillStyle = e, i.strokeStyle = e }, this.setStyleDisplay = function(e) { u.style.display = !0 === e ? "" : "none" }, this.isVisible = function() { return "none" !== u.style.display }, this.align = function(e) { u.style.top = e.getCanvas().offsetTop, u.style.left = e.getCanvas().offsetLeft }
    }, H.html.getEventOffset = function(e) {
        var t = [],
            n = 0,
            i = 0;
        if (e.targetTouches) { for (var r = 0, o = 0, a = e.targetTouches[0].target.offsetParent; a;) isNaN(a.offsetLeft) || (r += a.offsetLeft), isNaN(a.offsetTop) || (o += a.offsetTop), a = a.offsetParent; for (var s = null, l = 0; l < e.targetTouches.length; ++l) n = (s = e.targetTouches[l]).pageX - r, i = s.pageY - o, t.push({ x: n, y: i }) } else n = void 0 === e.offsetX ? e.layerX : e.offsetX, i = void 0 === e.offsetY ? e.layerY : e.offsetY, t.push({ x: n, y: i });
        return t
    }, (H = H || {}).gui = H.gui || {}, H.gui.base = H.gui.base || {}, H.gui.base.Loadbox = function(t, i) {
        var n = null;
        this.setup = function() {
            (n = H.html.createHtmlSelect("loaderSelect", i, "io")).onchange = t.onChangeLoader;
            for (var e = t.getElement("loaderlist"); e.hasChildNodes();) e.removeChild(e.firstChild);
            e.appendChild(n), H.gui.refreshElement(e)
        }, this.displayLoader = function(e) { for (var t = Object.keys(i), n = 0; n < t.length; ++n) t[n] === e ? i[t[n]].display(!0) : i[t[n]].display(!1) }, this.reset = function() {
            var e = Object.keys(i);
            this.displayLoader(e[0]), n && (n.selectedIndex = 0)
        }
    }, H.gui.base.FileLoad = function(i) {
        var t = this;

        function r(e) { "function" == typeof t.onchange && t.onchange(e), i.onChangeFiles(e) } this.setup = function() {
            var e = document.createElement("input");
            e.onchange = r, e.type = "file", e.multiple = !0, e.className = "imagefiles", e.setAttribute("data-clear-btn", "true"), e.setAttribute("data-mini", "true");
            var t = document.createElement("div");
            t.className = "imagefilesdiv", t.style.display = "none", t.appendChild(e);
            var n = i.getElement("loaderlist");
            n.appendChild(t), H.gui.refreshElement(n)
        }, this.display = function(e) { i.getElement("loaderlist").getElementsByClassName("imagefilesdiv")[0].style.display = e ? "" : "none" }
    }, H.gui.base.FolderLoad = function(i) {
        var t = this;

        function r(e) { "function" == typeof t.onchange && t.onchange(e), i.onChangeFiles(e) } this.setup = function() {
            var e = document.createElement("input");
            e.onchange = r, e.type = "file", e.multiple = !0, e.webkitdirectory = !0, e.className = "imagefolder", e.setAttribute("data-clear-btn", "true"), e.setAttribute("data-mini", "true");
            var t = document.createElement("div");
            t.className = "imagefolderdiv", t.style.display = "none", t.appendChild(e);
            var n = i.getElement("loaderlist");
            n.appendChild(t), H.gui.refreshElement(n)
        }, this.display = function(e) { i.getElement("loaderlist").getElementsByClassName("imagefolderdiv")[0].style.display = e ? "" : "none" }
    }, H.gui.base.UrlLoad = function(i) {
        var t = this;

        function r(e) { "function" == typeof t.onchange && t.onchange(e), i.onChangeURL(e) } this.setup = function() {
            var e = document.createElement("input");
            e.onchange = r, e.type = "url", e.className = "imageurl", e.setAttribute("data-clear-btn", "true"), e.setAttribute("data-mini", "true");
            var t = document.createElement("div");
            t.className = "imageurldiv", t.style.display = "none", t.appendChild(e);
            var n = i.getElement("loaderlist");
            n.appendChild(t), H.gui.refreshElement(n)
        }, this.display = function(e) { i.getElement("loaderlist").getElementsByClassName("imageurldiv")[0].style.display = e ? "" : "none" }
    }, (H = H || {}).html = H.html || {}, H.html.Style = function() {
        var t = "#ffff80",
            n = 1;
        this.getFontFamily = function() { return "Verdana" }, this.getFontSize = function() { return 12 }, this.getStrokeWidth = function() { return 2 }, this.getTextColour = function() { return "#fff" }, this.getLineColour = function() { return t }, this.setLineColour = function(e) { t = e }, this.setScale = function(e) { n = e }, this.scale = function(e) { return e / n }
    }, H.html.Style.prototype.getFontStr = function() { return "normal " + this.getFontSize() + "px sans-serif" }, H.html.Style.prototype.getLineHeight = function() { return this.getFontSize() + this.getFontSize() / 5 }, H.html.Style.prototype.getScaledFontSize = function() { return this.scale(this.getFontSize()) }, H.html.Style.prototype.getScaledStrokeWidth = function() { return this.scale(this.getStrokeWidth()) }, (H = H || {}).gui = H.gui || {}, H.gui.base = H.gui.base || {}, H.gui.base.Toolbox = function(o) {
        this.setup = function(e) {
            var t = H.html.createHtmlSelect("toolSelect", e, "tool");
            t.onchange = o.onChangeTool;
            var n = document.createElement("li");
            n.className = "toolLi ui-block-a", n.style.display = "none", n.appendChild(t);
            var i = document.createElement("ul");
            i.appendChild(n), i.className = "ui-grid-b";
            var r = o.getElement("toolList");
            r.appendChild(i), H.gui.refreshElement(r)
        }, this.display = function(e) {
            var t = o.getElement("toolLi");
            H.html.displayElement(t, e)
        }, this.initialise = function(e) {
            for (var t = o.getElement("toolSelect"), n = t.options, i = -1, r = 0; r < n.length; ++r) e[r] ? (-1 === i && (i = r), n[r].style.display = "") : n[r].style.display = "none";
            t.selectedIndex = i, H.gui.refreshElement(t)
        }
    }, H.gui.base.WindowLevel = function(o) {
        this.setup = function() {
            var e = H.html.createHtmlSelect("presetSelect", []);
            e.onchange = o.onChangeWindowLevelPreset;
            var t = H.html.createHtmlSelect("colourMapSelect", H.tool.colourMaps, "colourmap");
            t.onchange = o.onChangeColourMap;
            var n = document.createElement("li");
            n.className = "wlLi ui-block-b", n.style.display = "none", n.appendChild(e);
            var i = document.createElement("li");
            i.className = "cmLi ui-block-c", i.style.display = "none", i.appendChild(t);
            var r = o.getElement("toolList").getElementsByTagName("ul")[0];
            r.appendChild(n), r.appendChild(i), H.gui.refreshElement(r)
        }, this.display = function(e) {
            var t = o.getElement("wlLi");
            H.html.displayElement(t, e), t = o.getElement("cmLi"), H.html.displayElement(t, e)
        }, this.initialise = function() {
            var e = H.html.createHtmlSelect("presetSelect", o.getViewController().getWindowLevelPresetsNames(), "wl.presets", !0);
            e.onchange = o.onChangeWindowLevelPreset, e.title = "Select w/l preset.";
            var t = o.getElement("wlLi");
            H.html.cleanNode(t), t.appendChild(e), H.gui.refreshElement(t);
            var n = o.getElement("colourMapSelect");
            n.selectedIndex = 0, "MONOCHROME1" === o.getImage().getPhotometricInterpretation() && (n.selectedIndex = 1), H.gui.refreshElement(n)
        }
    }, H.gui.base.Draw = function(a) {
        var s = ["Yellow", "Red", "White", "Green", "Blue", "Lime", "Fuchsia", "Black"];
        this.getDefaultColour = function() { return H.browser.hasInputColor() ? "#FFFF80" : s[0] }, this.setup = function(e) {
            var t = H.html.createHtmlSelect("shapeSelect", e, "shape");
            t.onchange = a.onChangeShape;
            var n = null;
            H.browser.hasInputColor() ? ((n = document.createElement("input")).className = "colourSelect", n.type = "color", n.value = "#FFFF80") : n = H.html.createHtmlSelect("colourSelect", s, "colour"), n.onchange = a.onChangeLineColour;
            var i = document.createElement("li");
            i.className = "shapeLi ui-block-c", i.style.display = "none", i.appendChild(t);
            var r = document.createElement("li");
            r.className = "colourLi ui-block-b", r.style.display = "none", r.appendChild(n);
            var o = a.getElement("toolList").getElementsByTagName("ul")[0];
            o.appendChild(i), o.appendChild(r), H.gui.refreshElement(o)
        }, this.display = function(e) {
            var t = a.getElement("colourLi");
            H.html.displayElement(t, e), t = a.getElement("shapeLi"), H.html.displayElement(t, e)
        }, this.initialise = function() {
            var e = a.getElement("shapeSelect");
            e.selectedIndex = 0, H.gui.refreshElement(e);
            var t = a.getElement("colourSelect");
            H.browser.hasInputColor() || (t.selectedIndex = 0), H.gui.refreshElement(t)
        }
    }, H.gui.base.ColourTool = function(i, e) {
        var r = ["Yellow", "Red", "White", "Green", "Blue", "Lime", "Fuchsia", "Black"],
            o = e + "ColourSelect",
            a = e + "ColourLi";
        this.getDefaultColour = function() { return H.browser.hasInputColor() ? "#FFFF80" : r[0] }, this.setup = function() {
            var e = null;
            H.browser.hasInputColor() ? ((e = document.createElement("input")).className = o, e.type = "color", e.value = "#FFFF80") : e = H.html.createHtmlSelect(o, r, "colour"), e.onchange = i.onChangeLineColour;
            var t = document.createElement("li");
            t.className = a + " ui-block-b", t.style.display = "none", t.appendChild(e);
            var n = i.getElement("toolList").getElementsByTagName("ul")[0];
            n.appendChild(t), H.gui.refreshElement(n)
        }, this.display = function(e) {
            var t = i.getElement(a);
            H.html.displayElement(t, e)
        }, this.initialise = function() {
            var e = i.getElement(o);
            H.browser.hasInputColor() || (e.selectedIndex = 0), H.gui.refreshElement(e)
        }
    }, H.gui.base.ZoomAndPan = function(r) {
        this.setup = function() {
            var e = document.createElement("button");
            e.className = "zoomResetButton", e.name = "zoomResetButton", e.onclick = r.onZoomReset, e.setAttribute("style", "width:100%; margin-top:0.5em;"), e.setAttribute("class", "ui-btn ui-btn-b");
            var t = document.createTextNode(H.i18n("basics.reset"));
            e.appendChild(t);
            var n = document.createElement("li");
            n.className = "zoomLi ui-block-c", n.style.display = "none", n.appendChild(e);
            var i = r.getElement("toolList").getElementsByTagName("ul")[0];
            i.appendChild(n), H.gui.refreshElement(i)
        }, this.display = function(e) {
            var t = r.getElement("zoomLi");
            H.html.displayElement(t, e)
        }
    }, H.gui.base.Scroll = function(n) {
        this.setup = function() {
            var e = document.createElement("li");
            e.className = "scrollLi ui-block-c", e.style.display = "none";
            var t = n.getElement("toolList").getElementsByTagName("ul")[0];
            t.appendChild(e), H.gui.refreshElement(t)
        }, this.display = function(e) {
            var t = n.getElement("scrollLi");
            H.html.displayElement(t, e)
        }
    }, (H = H || {}).gui = H.gui || {}, H.gui.base = H.gui.base || {}, H.gui.base.Undo = function(o) {
        this.setup = function() {
            var e = document.createElement("p");
            e.appendChild(document.createTextNode("History:")), e.appendChild(document.createElement("br"));
            var t = document.createElement("select");
            t.className = "history_list", t.name = "history_list", t.multiple = "multiple", e.appendChild(t);
            for (var n = o.getElement("history"); n.hasChildNodes();) n.removeChild(n.firstChild);
            n.appendChild(e), H.gui.refreshElement(n)
        }, this.initialise = function() {
            var e = o.getElement("history_list");
            if (e && 0 !== e.length)
                for (var t = e.length - 1; 0 <= t; --t) e.remove(t);
            H.gui.refreshElement(e)
        }, this.addCommandToUndoHtml = function(e) {
            var t = o.getElement("history_list"),
                n = t.length - (t.selectedIndex + 1);
            if (0 < n)
                for (var i = 0; i < n; ++i) t.remove(t.length - 1);
            var r = document.createElement("option");
            r.text = e, r.value = e, t.add(r), t.selectedIndex++, H.gui.refreshElement(t)
        }, this.enableInUndoHtml = function(e) {
            var t = o.getElement("history_list");
            e ? (t.selectedIndex++, t.options[t.selectedIndex].disabled = !1) : (t.options[t.selectedIndex].disabled = !0, t.selectedIndex--), H.gui.refreshElement(t)
        }
    }, (H = H || {}).image = H.image || {};
    var c = void 0 !== d,
        d = d || {},
        S = void 0 !== x && void 0 !== x.lossless,
        x = x || {};
    x.lossless = x.lossless || {};
    var g = void 0 !== m,
        m = m || {};
    H.image.AsynchPixelBufferDecoder = function(o) {
        var a = new H.utils.ThreadPool(15);
        a.init(), this.decode = function(e, t, n, i) {
            a.onpoolworkend = this.ondecodeend, a.onworkerend = this.ondecoded;
            var r = new H.utils.WorkerTask(o, i, { buffer: e, bitsAllocated: t, isSigned: n });
            a.addWorkerTask(r)
        }, this.abort = function() { a.abort() }
    }, H.image.AsynchPixelBufferDecoder.prototype.ondecodeend = function() {}, H.image.AsynchPixelBufferDecoder.prototype.ondecoded = function() {}, H.image.SynchPixelBufferDecoder = function(u) {
        this.decode = function(e, t, n, i) {
            var r = null,
                o = null;
            if ("jpeg-lossless" === u) {
                if (!S) throw new Error("No JPEG Lossless decoder provided");
                var a = t / 8,
                    s = new Uint8Array(e),
                    l = (r = new x.lossless.Decoder).decode(s.buffer, 0, s.buffer.byteLength, a);
                8 === t ? o = n ? new Int8Array(l.buffer) : new Uint8Array(l.buffer) : 16 === t && (o = n ? new Int16Array(l.buffer) : new Uint16Array(l.buffer))
            } else if ("jpeg-baseline" === u) {
                if (!c) throw new Error("No JPEG Baseline decoder provided");
                (r = new d).parse(e), o = r.getData(r.width, r.height)
            } else if ("jpeg2000" === u) {
                if (!g) throw new Error("No JPEG 2000 decoder provided");
                (r = new m).parse(e), o = r.tiles[0].items
            }
            this.ondecoded(), this.ondecodeend(), i({ data: [o] })
        }, this.abort = function() {}
    }, H.image.SynchPixelBufferDecoder.prototype.ondecodeend = function() {}, H.image.SynchPixelBufferDecoder.prototype.ondecoded = function() {}, H.image.PixelBufferDecoder = function(e) {
        var r = null;
        r = void 0 !== H.image.decoderScripts && void 0 !== H.image.decoderScripts[e] ? new H.image.AsynchPixelBufferDecoder(H.image.decoderScripts[e]) : new H.image.SynchPixelBufferDecoder(e), this.decode = function(e, t, n, i) { r.ondecodeend = this.ondecodeend, r.ondecoded = this.ondecoded, r.decode(e, t, n, i) }, this.abort = function() { r.abort() }
    }, H.image.PixelBufferDecoder.prototype.ondecodeend = function() {}, H.image.PixelBufferDecoder.prototype.ondecoded = function() {}, (H = H || {}).image = H.image || {}, H.image.DicomBufferToView = function() {
        var g, m = this;
        this.setDefaultCharacterSet = function(e) { g = e };
        var h = null;
        this.convert = function(e, i) {
            var n = new H.dicom.DicomParser;
            n.setDefaultCharacterSet(g), n.parse(e);
            var r = n.getRawDicomElements().x7FE00010.value,
                t = H.dicom.cleanString(n.getRawDicomElements().x00020010.value[0]),
                o = H.dicom.getSyntaxDecompressionName(t),
                a = function() {
                    var e = (new H.image.ImageFactory).create(n.getDicomElements(), r),
                        t = (new H.image.ViewFactory).create(n.getDicomElements(), e);
                    m.onload({ view: t, info: n.getDicomElements().dumpToTable() })
                };
            if (null !== o) {
                var s = n.getRawDicomElements().x00280100.value[0],
                    l = 1 === n.getRawDicomElements().x00280103.value[0],
                    u = r.length;
                h || (h = new H.image.PixelBufferDecoder(o)), h.ondecodeend = function() { m.onloadend() }, 1 === u && (h.ondecoded = function() { m.onloadend() });
                var c = 0,
                    d = function(n) {
                        return function(e) {
                            var t = { type: "load-progress", lengthComputable: !0, loaded: 100 * ++c / u, total: 100 };
                            void 0 !== i && (t.index = i), m.onprogress(t), r[n] = e.data[0], 0 === n && a()
                        }
                    };
                if (h.decode(r[0], s, l, d(0), !1), 1 !== u)
                    for (var S = 1; S < u; ++S) h.decode(r[S], s, l, d(S))
            } else {
                var x = { type: "load-progress", lengthComputable: !0, loaded: 100, total: 100 };
                void 0 !== i && (x.index = i), m.onprogress(x), a(), m.onloadend()
            }
        }, this.abort = function() { h && h.abort() }
    }, H.image.DicomBufferToView.prototype.onloadend = function() {}, H.image.DicomBufferToView.prototype.onload = function() {}, H.image.DicomBufferToView.prototype.onprogress = function() {}, (H = H || {}).image = H.image || {}, H.image.imageDataToBuffer = function(e) { for (var t = e.data.length, n = new Uint8Array(t / 4 * 3), i = 0, r = 0; r < t; r += 4) n[i] = e.data[r], n[i + 1] = e.data[r + 1], n[i + 2] = e.data[r + 2], i += 3; return n }, H.image.getDefaultView = function(e, t, n, i, r, o) {
        var a = new H.image.Size(e, t),
            s = new H.image.Spacing(1, 1),
            l = new H.math.Point3D(0, 0, n),
            u = new H.image.Geometry(l, a, s),
            c = new H.image.Image(u, i, r);
        c.setPhotometricInterpretation("RGB");
        var d = { BitsStored: 8 };
        c.setMeta(d), c.setFirstOverlay(H.gui.info.createOverlaysForDom(o));
        var S = new H.image.View(c);
        return S.setWindowLevelMinMax(), S
    }, H.image.getViewFromDOMImage = function(e) {
        var t = e.width,
            n = e.height,
            i = document.createElement("canvas");
        i.width = t, i.height = n;
        var r = i.getContext("2d");
        r.drawImage(e, 0, 0);
        var o = r.getImageData(0, 0, t, n),
            a = [];
        "string" == typeof e.origin ? a.push({ name: "origin", value: e.origin }) : (a.push({ name: "fileName", value: e.origin.name }), a.push({ name: "fileType", value: e.origin.type }), a.push({ name: "fileLastModifiedDate", value: e.origin.lastModifiedDate })), a.push({ name: "imageWidth", value: t }), a.push({ name: "imageHeight", value: n });
        var s = e.index ? e.index : 0,
            l = H.image.imageDataToBuffer(o);
        return { view: H.image.getDefaultView(t, n, s, [l], 1, a), info: a }
    }, H.image.getViewFromDOMVideo = function(n, i, r, o, a) {
        var s = n.videoWidth,
            l = n.videoHeight,
            u = 30,
            c = Math.floor(n.duration * u),
            d = [];
        n.file && (d.push({ name: "fileName", value: n.file.name }), d.push({ name: "fileType", value: n.file.type }), d.push({ name: "fileLastModifiedDate", value: n.file.lastModifiedDate })), d.push({ name: "imageWidth", value: s }), d.push({ name: "imageHeight", value: l }), d.push({ name: "numberOfFrames", value: c });
        var e = document.createElement("canvas");
        e.width = s, e.height = l;
        var S = e.getContext("2d");
        n.addEventListener("seeked", function e() {
            ! function() {
                var e = { type: "load-progress", lengthComputable: !0, loaded: x, total: c };
                void 0 !== a && (e.index = a);
                r(e), S.drawImage(n, 0, 0);
                var t = H.image.imageDataToBuffer(S.getImageData(0, 0, s, l));
                0 === x ? (g = H.image.getDefaultView(s, l, 1, [t], c, d), i({ view: g, info: d })) : g.appendFrameBuffer(t)
            }();
            ++x;
            var t = x / u;
            t <= this.duration ? this.currentTime = t : (o(), n.removeEventListener("seeked", e))
        }, !1);
        var x = 0,
            g = null;
        n.currentTime = 0
    }, (H = H || {}).image = H.image || {}, H.image.filter = H.image.filter || {}, H.image.filter.Threshold = function() {
        var t = 0,
            n = 0;
        this.getMin = function() { return t }, this.setMin = function(e) { t = e }, this.getMax = function() { return n }, this.setMax = function(e) { n = e }, this.getName = function() { return "Threshold" };
        var i = null;
        this.setOriginalImage = function(e) { i = e }, this.getOriginalImage = function() { return i }
    }, H.image.filter.Threshold.prototype.update = function() {
        var e = this.getOriginalImage(),
            t = e.getDataRange().min,
            n = this;
        return e.transform(function(e) { return e < n.getMin() || e > n.getMax() ? t : e })
    }, H.image.filter.Sharpen = function() {
        this.getName = function() { return "Sharpen" };
        var t = null;
        this.setOriginalImage = function(e) { t = e }, this.getOriginalImage = function() { return t }
    }, H.image.filter.Sharpen.prototype.update = function() { return this.getOriginalImage().convolute2D([0, -1, 0, -1, 5, -1, 0, -1, 0]) }, H.image.filter.Sobel = function() {
        this.getName = function() { return "Sobel" };
        var t = null;
        this.setOriginalImage = function(e) { t = e }, this.getOriginalImage = function() { return t }
    }, H.image.filter.Sobel.prototype.update = function() {
        var e = this.getOriginalImage(),
            t = e.convolute2D([1, 0, -1, 2, 0, -2, 1, 0, -1]),
            n = e.convolute2D([1, 2, 1, 0, 0, 0, -1, -2, -1]);
        return t.compose(n, function(e, t) { return Math.sqrt(e * e + t * t) })
    }, (H = H || {}).image = H.image || {}, H.image.Size = function(e, t, n) { this.getNumberOfColumns = function() { return e }, this.getNumberOfRows = function() { return t }, this.getNumberOfSlices = function() { return n || 1 } }, H.image.Size.prototype.getSliceSize = function() { return this.getNumberOfColumns() * this.getNumberOfRows() }, H.image.Size.prototype.getTotalSize = function() { return this.getSliceSize() * this.getNumberOfSlices() }, H.image.Size.prototype.equals = function(e) { return null !== e && this.getNumberOfColumns() === e.getNumberOfColumns() && this.getNumberOfRows() === e.getNumberOfRows() && this.getNumberOfSlices() === e.getNumberOfSlices() }, H.image.Size.prototype.isInBounds = function(e, t, n) { return !(e < 0 || e > this.getNumberOfColumns() - 1 || t < 0 || t > this.getNumberOfRows() - 1 || n < 0 || n > this.getNumberOfSlices() - 1) }, H.image.Size.prototype.toString = function() { return "(" + this.getNumberOfColumns() + ", " + this.getNumberOfRows() + ", " + this.getNumberOfSlices() + ")" }, H.image.Spacing = function(e, t, n) { this.getColumnSpacing = function() { return e }, this.getRowSpacing = function() { return t }, this.getSliceSpacing = function() { return n || 1 } }, H.image.Spacing.prototype.equals = function(e) { return null !== e && this.getColumnSpacing() === e.getColumnSpacing() && this.getRowSpacing() === e.getRowSpacing() && this.getSliceSpacing() === e.getSliceSpacing() }, H.image.Spacing.prototype.toString = function() { return "(" + this.getColumnSpacing() + ", " + this.getRowSpacing() + ", " + this.getSliceSpacing() + ")" }, H.image.Geometry = function(e, n, t, o) {
        void 0 === e && (e = new H.math.Point3D(0, 0, 0));
        var a = [e];
        void 0 === o && (o = new H.math.getIdentityMat33), this.getOrigin = function() { return e }, this.getOrigins = function() { return a }, this.getSize = function() { return n }, this.getSpacing = function() { return t }, this.getOrientation = function() { return o }, this.getSliceIndex = function(e) { for (var t = 0, n = e.getDistance(a[0]), i = 0, r = 0; r < a.length; ++r)(i = e.getDistance(a[r])) < n && (n = i, t = r); return 0 < new H.math.Vector3D(o.get(2, 0), o.get(2, 1), o.get(2, 2)).dotProduct(e.minus(a[t])) ? t + 1 : t }, this.appendOrigin = function(e, t) { a.splice(t, 0, e), n = new H.image.Size(n.getNumberOfColumns(), n.getNumberOfRows(), n.getNumberOfSlices() + 1) }
    }, H.image.Geometry.prototype.equals = function(e) { return null !== e && this.getOrigin() === e.getOrigin() && this.getSize() === e.getSize() && this.getSpacing() === e.getSpacing() }, H.image.Geometry.prototype.indexToOffset = function(e) { var t = this.getSize(); return e.getI() + e.getJ() * t.getNumberOfColumns() + e.getK() * t.getSliceSize() }, H.image.Geometry.prototype.indexToWorld = function(e) {
        var t = this.getOrigin(),
            n = this.getSpacing();
        return new H.math.Point3D(t.getX() + e.getI() * n.getColumnSpacing(), t.getY() + e.getJ() * n.getRowSpacing(), t.getZ() + e.getK() * n.getSliceSpacing())
    }, H.image.Geometry.prototype.worldToIndex = function(e) {
        var t = this.getOrigin(),
            n = this.getSpacing();
        return new H.math.Point3D(e.getX() / n.getColumnSpacing() - t.getX(), e.getY() / n.getRowSpacing() - t.getY(), e.getZ() / n.getSliceSpacing() - t.getZ())
    }, (H = H || {}).image = H.image || {}, H.image.RescaleSlopeAndIntercept = function(t, n) { this.getSlope = function() { return t }, this.getIntercept = function() { return n }, this.apply = function(e) { return e * t + n } }, H.image.RescaleSlopeAndIntercept.prototype.equals = function(e) { return null !== e && this.getSlope() === e.getSlope() && this.getIntercept() === e.getIntercept() }, H.image.RescaleSlopeAndIntercept.prototype.toString = function() { return this.getSlope() + ", " + this.getIntercept() }, H.image.RescaleSlopeAndIntercept.prototype.isID = function() { return 1 === this.getSlope() && 0 === this.getIntercept() }, H.image.Image = function(d, S, e) {
        void 0 === e && (e = S.length), this.getNumberOfFrames = function() { return e };
        for (var x = [], t = 0, n = d.getSize().getNumberOfSlices(); t < n; ++t) x.push(new H.image.RescaleSlopeAndIntercept(1, 0));
        var r = !0,
            o = !0,
            g = "MONOCHROME2",
            i = 0,
            a = S[0].length / d.getSize().getTotalSize(),
            m = {},
            s = null,
            l = null,
            u = null,
            h = [];
        this.setFirstOverlay = function(e) { h[0] = e }, this.getOverlays = function() { return h }, this.getGeometry = function() { return d }, this.getBuffer = function() { return S }, this.getFrame = function(e) { return S[e] }, this.getRescaleSlopeAndIntercept = function(e) { return x[e] }, this.setRescaleSlopeAndIntercept = function(e, t) { void 0 === t && (t = 0), x[t] = e, o = r = !0; for (var n = 0, i = x.length; n < i; ++n) x[n].isID() || (r = !1), 0 < n && !x[n].equals(x[n - 1]) && (o = !1) }, this.isIdentityRSI = function() { return r }, this.isConstantRSI = function() { return o }, this.getPhotometricInterpretation = function() { return g }, this.setPhotometricInterpretation = function(e) { g = e }, this.getPlanarConfiguration = function() { return i }, this.setPlanarConfiguration = function(e) { i = e }, this.getNumberOfComponents = function() { return a }, this.getMeta = function() { return m }, this.setMeta = function(e) { m = e }, this.getValueAtOffset = function(e, t) { return S[t][e] }, this.clone = function() { for (var e = [], t = 0, n = this.getNumberOfFrames(); t < n; ++t) e[t] = S[t].slice(0); for (var i = new H.image.Image(this.getGeometry(), e), r = this.getGeometry().getSize().getNumberOfSlices(), o = 0; o < r; ++o) i.setRescaleSlopeAndIntercept(this.getRescaleSlopeAndIntercept(o), o); return i.setPhotometricInterpretation(this.getPhotometricInterpretation()), i.setPlanarConfiguration(this.getPlanarConfiguration()), i.setMeta(this.getMeta()), i }, this.appendSlice = function(e, t) {
            if (null === e) throw new Error("Cannot append null slice");
            var n = e.getGeometry().getSize(),
                i = d.getSize();
            if (1 !== n.getNumberOfSlices()) throw new Error("Cannot append more than one slice");
            if (i.getNumberOfColumns() !== n.getNumberOfColumns()) throw new Error("Cannot append a slice with different number of columns");
            if (i.getNumberOfRows() !== n.getNumberOfRows()) throw new Error("Cannot append a slice with different number of rows");
            if (g !== e.getPhotometricInterpretation()) throw new Error("Cannot append a slice with different photometric interpretation");
            for (var r in m)
                if (m[r] !== e.getMeta()[r]) throw new Error("Cannot append a slice with different " + r);
            var o = void 0 === t ? 0 : t,
                a = 1;
            "RGB" !== g && "YBR_FULL_422" !== g || (a = 3);
            var s = a * i.getSliceSize(),
                l = H.dicom.getTypedArray(8 * S[o].BYTES_PER_ELEMENT, m.IsSigned ? 1 : 0, s * (i.getNumberOfSlices() + 1)),
                u = d.getSliceIndex(e.getGeometry().getOrigin());
            if (0 === u) l.set(e.getFrame(o)), l.set(S[o], s);
            else if (u === i.getNumberOfSlices()) l.set(S[o]), l.set(e.getFrame(o), i.getNumberOfSlices() * s);
            else {
                var c = u * s;
                l.set(S[o].subarray(0, c - 1)), l.set(e.getFrame(o), c), l.set(S[o].subarray(c), c + s)
            }
            return d.appendOrigin(e.getGeometry().getOrigin(), u), x.splice(u, 0, e.getRescaleSlopeAndIntercept(0)), S[o] = l, h.splice(u, 0, e.getOverlays()[0]), u
        }, this.appendFrameBuffer = function(e) { S.push(e) }, this.getDataRange = function() { return s || (s = this.calculateDataRange()), s }, this.getRescaledDataRange = function() { return l || (l = this.calculateRescaledDataRange()), l }, this.getHistogram = function() {
            if (!u) {
                var e = this.calculateHistogram();
                s = e.dataRange, l = e.rescaledDataRange, u = e.histogram
            }
            return u
        }
    }, H.image.Image.prototype.getValue = function(e, t, n, i) {
        var r = i || 0,
            o = new H.math.Index3D(e, t, n);
        return this.getValueAtOffset(this.getGeometry().indexToOffset(o), r)
    }, H.image.Image.prototype.getRescaledValue = function(e, t, n, i) {
        var r = i || 0,
            o = this.getValue(e, t, n, r);
        return this.isIdentityRSI() || (o = this.getRescaleSlopeAndIntercept(n).apply(o)), o
    }, H.image.Image.prototype.calculateDataRange = function() {
        for (var e = this.getGeometry().getSize().getTotalSize(), t = this.getValueAtOffset(0, 0), n = t, i = 0, r = 0; r < 1; ++r)
            for (var o = 0; o < e; ++o) n < (i = this.getValueAtOffset(o, r)) && (n = i), i < t && (t = i);
        return { min: t, max: n }
    }, H.image.Image.prototype.calculateRescaledDataRange = function() {
        if (this.isIdentityRSI()) return this.getDataRange();
        if (this.isConstantRSI()) {
            var e = this.getDataRange(),
                t = this.getRescaleSlopeAndIntercept(0).apply(e.min),
                n = this.getRescaleSlopeAndIntercept(0).apply(e.max);
            return { min: t < n ? t : n, max: n < t ? t : n }
        }
        for (var i = this.getGeometry().getSize(), r = this.getRescaledValue(0, 0, 0), o = r, a = 0, s = 0; s < 1; ++s)
            for (var l = 0, u = i.getNumberOfSlices(); l < u; ++l)
                for (var c = 0, d = i.getNumberOfRows(); c < d; ++c)
                    for (var S = 0, x = i.getNumberOfColumns(); S < x; ++S) o < (a = this.getRescaledValue(S, c, l, s)) && (o = a), a < r && (r = a);
        return { min: r, max: o }
    }, H.image.Image.prototype.calculateHistogram = function() {
        for (var e = this.getGeometry().getSize(), t = [], n = this.getValue(0, 0, 0), i = n, r = 0, o = this.getRescaledValue(0, 0, 0), a = o, s = 0, l = 0, u = this.getNumberOfFrames(); l < u; ++l)
            for (var c = 0, d = e.getNumberOfSlices(); c < d; ++c)
                for (var S = 0, x = e.getNumberOfRows(); S < x; ++S)
                    for (var g = 0, m = e.getNumberOfColumns(); g < m; ++g) i < (r = this.getValue(g, S, c, l)) && (i = r), r < n && (n = r), a < (s = this.getRescaleSlopeAndIntercept(c).apply(r)) && (a = s), s < o && (o = s), t[s] = (t[s] || 0) + 1;
        for (var h = { min: n, max: i }, p = { min: o, max: a }, f = [], C = o; C <= a; ++C) f.push([C, t[C] || 0]);
        return { dataRange: h, rescaledDataRange: p, histogram: f }
    }, H.image.Image.prototype.convolute2D = function(e) {
        if (9 !== e.length) throw new Error("The convolution matrix does not have a length of 9; it has " + e.length);
        var t = this.clone(),
            n = t.getBuffer(),
            i = this.getGeometry().getSize(),
            r = i.getNumberOfColumns(),
            o = i.getNumberOfRows(),
            a = i.getNumberOfSlices(),
            s = this.getNumberOfFrames(),
            l = this.getNumberOfComponents(),
            u = 1,
            c = 1,
            d = i.getTotalSize();
        3 === l && (d *= 3, 0 === this.getPlanarConfiguration() ? u = 3 : c = i.getTotalSize());
        var S = [];
        S[0] = (-r - 1) * u, S[1] = -r * u, S[2] = (1 - r) * u, S[3] = -u, S[4] = 0, S[5] = 1 * u, S[6] = (r - 1) * u, S[7] = r * u, S[8] = (r + 1) * u;
        var x = [];
        x[0] = S[4], x[1] = S[4], x[2] = S[5], x[3] = S[4], x[4] = S[4], x[5] = S[5], x[6] = S[7], x[7] = S[7], x[8] = S[8];
        var g = [];
        g[0] = S[1], g[1] = S[1], g[2] = S[2], g[3] = S[4], g[4] = S[4], g[5] = S[5], g[6] = S[7], g[7] = S[7], g[8] = S[8];
        var m = [];
        m[0] = S[1], m[1] = S[1], m[2] = S[2], m[3] = S[4], m[4] = S[4], m[5] = S[5], m[6] = S[4], m[7] = S[4], m[8] = S[5];
        var h = [];
        h[0] = S[3], h[1] = S[4], h[2] = S[5], h[3] = S[3], h[4] = S[4], h[5] = S[5], h[6] = S[6], h[7] = S[7], h[8] = S[8];
        var p = [];
        p[0] = S[0], p[1] = S[1], p[2] = S[2], p[3] = S[3], p[4] = S[4], p[5] = S[5], p[6] = S[3], p[7] = S[4], p[8] = S[5];
        var f = [];
        f[0] = S[3], f[1] = S[4], f[2] = S[4], f[3] = S[3], f[4] = S[4], f[5] = S[4], f[6] = S[6], f[7] = S[7], f[8] = S[7];
        var C = [];
        C[0] = S[0], C[1] = S[1], C[2] = S[1], C[3] = S[3], C[4] = S[4], C[5] = S[4], C[6] = S[6], C[7] = S[7], C[8] = S[7];
        var y = [];
        y[0] = S[0], y[1] = S[1], y[2] = S[1], y[3] = S[3], y[4] = S[4], y[5] = S[4], y[6] = S[3], y[7] = S[4], y[8] = S[4];
        for (var D = 0, v = 0, T = [], L = 0; L < s; L++) {
            D = L * d;
            for (var I = 0; I < l; I++) {
                D += I * c;
                for (var P = 0; P < a; P++)
                    for (var F = 0; F < o; F++)
                        for (var A = 0; A < r; A++) {
                            T = S, 0 === A && 0 === F ? T = x : 0 === A && F === o - 1 ? T = m : A === r - 1 && 0 === F ? T = f : A === r - 1 && F === o - 1 ? T = y : 0 === A && F !== o - 1 && 0 !== F ? T = g : A === r - 1 && F !== o - 1 && 0 !== F ? T = C : 0 !== A && A !== r - 1 && 0 === F ? T = h : 0 !== A && A !== r - 1 && F === o - 1 && (T = p);
                            for (var E = v = 0; E < 9; ++E) v += this.getValueAtOffset(D + T[E], L) * e[E];
                            n[L][D] = v, D += u
                        }
            }
        }
        return t
    }, H.image.Image.prototype.transform = function(e) {
        for (var t = this.clone(), n = t.getBuffer(), i = 0, r = this.getNumberOfFrames(); i < r; ++i)
            for (var o = 0, a = n[i].length; o < a; ++o) n[i][o] = e(t.getValueAtOffset(o, i));
        return t
    }, H.image.Image.prototype.compose = function(e, t) {
        for (var n = this.clone(), i = n.getBuffer(), r = 0, o = this.getNumberOfFrames(); r < o; ++r)
            for (var a = 0, s = i[r].length; a < s; ++a) i[r][a] = Math.floor(t(this.getValueAtOffset(a, r), e.getValueAtOffset(a, r)));
        return n
    }, H.image.Image.prototype.quantifyLine = function(e) {
        var t = {},
            n = this.getGeometry().getSpacing(),
            i = e.getWorldLength(n.getColumnSpacing(), n.getRowSpacing());
        return null !== i && (t.length = { value: i, unit: H.i18n("unit.mm") }), t
    }, H.image.Image.prototype.quantifyRect = function(e) {
        var t = {},
            n = this.getGeometry().getSpacing(),
            i = e.getWorldSurface(n.getColumnSpacing(), n.getRowSpacing());
        null !== i && (t.surface = { value: i / 100, unit: H.i18n("unit.cm2") });
        for (var r = [], o = parseInt(e.getBegin().getY(), 10), a = parseInt(e.getEnd().getY(), 10), s = parseInt(e.getBegin().getX(), 10), l = parseInt(e.getEnd().getX(), 10), u = o; u < a; ++u)
            for (var c = s; c < l; ++c) r.push(this.getValue(c, u, 0));
        var d = H.math.getStats(r);
        return t.min = { value: d.min, unit: "" }, t.max = { value: d.max, unit: "" }, t.mean = { value: d.mean, unit: "" }, t.stdDev = { value: d.stdDev, unit: "" }, t
    }, H.image.Image.prototype.quantifyEllipse = function(e) {
        var t = {},
            n = this.getGeometry().getSpacing(),
            i = e.getWorldSurface(n.getColumnSpacing(), n.getRowSpacing());
        return null !== i && (t.surface = { value: i / 100, unit: H.i18n("unit.cm2") }), t
    }, H.image.ImageFactory = function() {}, H.image.ImageFactory.prototype.create = function(e, t) {
        var n = e.getFromKey("x00280011");
        if (!n) throw new Error("Missing or empty DICOM image number of columns");
        var i = e.getFromKey("x00280010");
        if (!i) throw new Error("Missing or empty DICOM image number of rows");
        var r = new H.image.Size(n, i),
            o = null,
            a = null,
            s = e.getFromKey("x00280030"),
            l = e.getFromKey("x00181164");
        s && s[0] && s[1] ? (o = parseFloat(s[0]), a = parseFloat(s[1])) : l && l[0] && l[1] && (o = parseFloat(l[0]), a = parseFloat(l[1]));
        var u = new H.image.Spacing(a, o),
            c = e.getFromKey("x00020010"),
            d = H.dicom.cleanString(c),
            S = H.dicom.isJpeg2000TransferSyntax(d),
            x = H.dicom.isJpegBaselineTransferSyntax(d),
            g = H.dicom.isJpegLosslessTransferSyntax(d),
            m = new Array(0, 0, 0),
            h = e.getFromKey("x00200032");
        h && (m = [parseFloat(h[0]), parseFloat(h[1]), parseFloat(h[2])]);
        var p, f = e.getFromKey("x00200037");
        if (f) {
            var C = new H.math.Vector3D(parseFloat(f[0]), parseFloat(f[1]), parseFloat(f[2])),
                y = new H.math.Vector3D(parseFloat(f[3]), parseFloat(f[4]), parseFloat(f[5])),
                D = C.crossProduct(y);
            p = new H.math.Matrix33(C.getX(), C.getY(), C.getZ(), y.getX(), y.getY(), y.getZ(), D.getX(), D.getY(), D.getZ())
        }
        var v = new H.math.Point3D(m[0], m[1], m[2]),
            T = new H.image.Geometry(v, r, u, p),
            L = new H.image.Image(T, t),
            I = e.getFromKey("x00280004");
        if (I) {
            var P = H.dicom.cleanString(I).toUpperCase();
            (S || x || g) && "MONOCHROME1" !== P && "MONOCHROME2" !== P && (P = "RGB"), L.setPhotometricInterpretation(P)
        }
        var F = e.getFromKey("x00280006");
        F && L.setPlanarConfiguration(F);
        var A = 1,
            E = e.getFromKey("x00281053");
        E && (A = parseFloat(E));
        var w = 0,
            O = e.getFromKey("x00281052");
        O && (w = parseFloat(O));
        var b = new H.image.RescaleSlopeAndIntercept(A, w);
        L.setRescaleSlopeAndIntercept(b);
        var R = {},
            q = e.getFromKey("x00080060");
        q && (R.Modality = q);
        var U = e.getFromKey("x0020000D");
        U && (R.StudyInstanceUID = U);
        var M = e.getFromKey("x0020000E");
        M && (R.SeriesInstanceUID = M);
        var N = e.getFromKey("x00280101");
        N && (R.BitsStored = parseInt(N, 10));
        var Q = e.getFromKey("x00280103");
        return R.IsSigned = !1, Q && (R.IsSigned = 1 === Q), L.setMeta(R), L.setFirstOverlay(H.gui.info.createOverlays(e)), L
    }, (H = H || {}).image = H.image || {}, H.image.lut = H.image.lut || {}, H.image.lut.Rescale = function(t, e) {
        var n = null,
            i = !1,
            r = Math.pow(2, e);
        this.getRSI = function() { return t }, this.isReady = function() { return i }, this.initialise = function() {
            if (!i) {
                n = new Float32Array(r);
                for (var e = 0; e < r; ++e) n[e] = t.apply(e);
                i = !0
            }
        }, this.getLength = function() { return r }, this.getValue = function(e) { return n[e] }
    }, H.image.lut.Window = function(n, i) {
        var r = null,
            o = null,
            a = !1,
            s = 0;
        this.getWindowLevel = function() { return o }, this.isSigned = function() { return i }, this.getRescaleLut = function() { return n }, this.isReady = function() { return a }, this.setWindowLevel = function(e) {
            if (s = 0, (o = e).setSignedOffset(0), i) {
                var t = n.getLength();
                s = t / 2, o.setSignedOffset(n.getRSI().getSlope() * s)
            }
            a = !1
        }, this.update = function() {
            if (!a) {
                n.isReady() || n.initialise();
                var e = n.getLength();
                r || (r = new Uint8ClampedArray(e));
                for (var t = 0; t < e; ++t) r[t] = o.apply(n.getValue(t));
                a = !0
            }
        }, this.getLength = function() { return r.length }, this.getValue = function(e) { return r[e + s] }
    }, H.image.lut.range_max = 256, H.image.lut.buildLut = function(e) { for (var t = [], n = 0; n < H.image.lut.range_max; ++n) t.push(e(n)); return t }, H.image.lut.max = function() { return H.image.lut.range_max - 1 }, H.image.lut.maxFirstThird = function(e) { return e < H.image.lut.range_max / 3 ? H.image.lut.range_max - 1 : 0 }, H.image.lut.maxSecondThird = function(e) { var t = H.image.lut.range_max / 3; return t <= e && e < 2 * t ? H.image.lut.range_max - 1 : 0 }, H.image.lut.maxThirdThird = function(e) { return e >= 2 * H.image.lut.range_max / 3 ? H.image.lut.range_max - 1 : 0 }, H.image.lut.toMaxFirstThird = function(e) { var t = 3 * e; return t > H.image.lut.range_max - 1 ? H.image.lut.range_max - 1 : t }, H.image.lut.toMaxSecondThird = function(e) {
        var t = H.image.lut.range_max / 3,
            n = 0;
        return t <= e && (n = 3 * (e - t)) > H.image.lut.range_max - 1 ? H.image.lut.range_max - 1 : n
    }, H.image.lut.toMaxThirdThird = function(e) {
        var t = H.image.lut.range_max / 3,
            n = 0;
        return 2 * t <= e && (n = 3 * (e - 2 * t)) > H.image.lut.range_max - 1 ? H.image.lut.range_max - 1 : n
    }, H.image.lut.zero = function() { return 0 }, H.image.lut.id = function(e) { return e }, H.image.lut.invId = function(e) { return H.image.lut.range_max - 1 - e }, H.image.lut.plain = { red: H.image.lut.buildLut(H.image.lut.id), green: H.image.lut.buildLut(H.image.lut.id), blue: H.image.lut.buildLut(H.image.lut.id) }, H.image.lut.invPlain = { red: H.image.lut.buildLut(H.image.lut.invId), green: H.image.lut.buildLut(H.image.lut.invId), blue: H.image.lut.buildLut(H.image.lut.invId) }, H.image.lut.rainbow = { blue: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144, 148, 152, 156, 160, 164, 168, 172, 176, 180, 184, 188, 192, 196, 200, 204, 208, 212, 216, 220, 224, 228, 232, 236, 240, 244, 248, 252, 255, 247, 239, 231, 223, 215, 207, 199, 191, 183, 175, 167, 159, 151, 143, 135, 127, 119, 111, 103, 95, 87, 79, 71, 63, 55, 47, 39, 31, 23, 15, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], green: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 128, 136, 144, 152, 160, 168, 176, 184, 192, 200, 208, 216, 224, 232, 240, 248, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 253, 251, 249, 247, 245, 243, 241, 239, 237, 235, 233, 231, 229, 227, 225, 223, 221, 219, 217, 215, 213, 211, 209, 207, 205, 203, 201, 199, 197, 195, 193, 192, 189, 186, 183, 180, 177, 174, 171, 168, 165, 162, 159, 156, 153, 150, 147, 144, 141, 138, 135, 132, 129, 126, 123, 120, 117, 114, 111, 108, 105, 102, 99, 96, 93, 90, 87, 84, 81, 78, 75, 72, 69, 66, 63, 60, 57, 54, 51, 48, 45, 42, 39, 36, 33, 30, 27, 24, 21, 18, 15, 12, 9, 6, 3], red: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 62, 60, 58, 56, 54, 52, 50, 48, 46, 44, 42, 40, 38, 36, 34, 32, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144, 148, 152, 156, 160, 164, 168, 172, 176, 180, 184, 188, 192, 196, 200, 204, 208, 212, 216, 220, 224, 228, 232, 236, 240, 244, 248, 252, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255] }, H.image.lut.hot = { red: H.image.lut.buildLut(H.image.lut.toMaxFirstThird), green: H.image.lut.buildLut(H.image.lut.toMaxSecondThird), blue: H.image.lut.buildLut(H.image.lut.toMaxThirdThird) }, H.image.lut.hot_iron = { red: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176, 178, 180, 182, 184, 186, 188, 190, 192, 194, 196, 198, 200, 202, 204, 206, 208, 210, 212, 214, 216, 218, 220, 222, 224, 226, 228, 230, 232, 234, 236, 238, 240, 242, 244, 246, 248, 250, 252, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], green: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176, 178, 180, 182, 184, 186, 188, 190, 192, 194, 196, 198, 200, 202, 204, 206, 208, 210, 212, 214, 216, 218, 220, 222, 224, 226, 228, 230, 232, 234, 236, 238, 240, 242, 244, 246, 248, 250, 252, 255], blue: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144, 148, 152, 156, 160, 164, 168, 172, 176, 180, 184, 188, 192, 196, 200, 204, 208, 212, 216, 220, 224, 228, 232, 236, 240, 244, 248, 252, 255] }, H.image.lut.pet = { red: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 171, 173, 175, 177, 179, 181, 183, 185, 187, 189, 191, 193, 195, 197, 199, 201, 203, 205, 207, 209, 211, 213, 215, 217, 219, 221, 223, 225, 227, 229, 231, 233, 235, 237, 239, 241, 243, 245, 247, 249, 251, 253, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], green: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95, 97, 99, 101, 103, 105, 107, 109, 111, 113, 115, 117, 119, 121, 123, 125, 128, 126, 124, 122, 120, 118, 116, 114, 112, 110, 108, 106, 104, 102, 100, 98, 96, 94, 92, 90, 88, 86, 84, 82, 80, 78, 76, 74, 72, 70, 68, 66, 64, 63, 61, 59, 57, 55, 53, 51, 49, 47, 45, 43, 41, 39, 37, 35, 33, 31, 29, 27, 25, 23, 21, 19, 17, 15, 13, 11, 9, 7, 5, 3, 1, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176, 178, 180, 182, 184, 186, 188, 190, 192, 194, 196, 198, 200, 202, 204, 206, 208, 210, 212, 214, 216, 218, 220, 222, 224, 226, 228, 230, 232, 234, 236, 238, 240, 242, 244, 246, 248, 250, 252, 255], blue: [0, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95, 97, 99, 101, 103, 105, 107, 109, 111, 113, 115, 117, 119, 121, 123, 125, 127, 129, 131, 133, 135, 137, 139, 141, 143, 145, 147, 149, 151, 153, 155, 157, 159, 161, 163, 165, 167, 169, 171, 173, 175, 177, 179, 181, 183, 185, 187, 189, 191, 193, 195, 197, 199, 201, 203, 205, 207, 209, 211, 213, 215, 217, 219, 221, 223, 225, 227, 229, 231, 233, 235, 237, 239, 241, 243, 245, 247, 249, 251, 253, 255, 252, 248, 244, 240, 236, 232, 228, 224, 220, 216, 212, 208, 204, 200, 196, 192, 188, 184, 180, 176, 172, 168, 164, 160, 156, 152, 148, 144, 140, 136, 132, 128, 124, 120, 116, 112, 108, 104, 100, 96, 92, 88, 84, 80, 76, 72, 68, 64, 60, 56, 52, 48, 44, 40, 36, 32, 28, 24, 20, 16, 12, 8, 4, 0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 85, 89, 93, 97, 101, 105, 109, 113, 117, 121, 125, 129, 133, 137, 141, 145, 149, 153, 157, 161, 165, 170, 174, 178, 182, 186, 190, 194, 198, 202, 206, 210, 214, 218, 222, 226, 230, 234, 238, 242, 246, 250, 255] }, H.image.lut.hot_metal_blue = { red: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 9, 12, 15, 18, 21, 24, 26, 29, 32, 35, 38, 41, 44, 47, 50, 52, 55, 57, 59, 62, 64, 66, 69, 71, 74, 76, 78, 81, 83, 85, 88, 90, 93, 96, 99, 102, 105, 108, 111, 114, 116, 119, 122, 125, 128, 131, 134, 137, 140, 143, 146, 149, 152, 155, 158, 161, 164, 166, 169, 172, 175, 178, 181, 184, 187, 190, 194, 198, 201, 205, 209, 213, 217, 221, 224, 228, 232, 236, 240, 244, 247, 251, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], green: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 6, 8, 9, 11, 13, 15, 17, 19, 21, 23, 24, 26, 28, 30, 32, 34, 36, 38, 40, 41, 43, 45, 47, 49, 51, 53, 55, 56, 58, 60, 62, 64, 66, 68, 70, 72, 73, 75, 77, 79, 81, 83, 85, 87, 88, 90, 92, 94, 96, 98, 100, 102, 104, 105, 107, 109, 111, 113, 115, 117, 119, 120, 122, 124, 126, 128, 130, 132, 134, 136, 137, 139, 141, 143, 145, 147, 149, 151, 152, 154, 156, 158, 160, 162, 164, 166, 168, 169, 171, 173, 175, 177, 179, 181, 183, 184, 186, 188, 190, 192, 194, 196, 198, 200, 201, 203, 205, 207, 209, 211, 213, 215, 216, 218, 220, 222, 224, 226, 228, 229, 231, 233, 235, 237, 239, 240, 242, 244, 246, 248, 250, 251, 253, 255], blue: [0, 2, 4, 6, 8, 10, 12, 14, 16, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 117, 119, 121, 123, 125, 127, 129, 131, 133, 135, 137, 139, 141, 143, 145, 147, 149, 151, 153, 155, 157, 159, 161, 163, 165, 167, 169, 171, 173, 175, 177, 179, 181, 183, 184, 186, 188, 190, 192, 194, 196, 198, 200, 197, 194, 191, 188, 185, 182, 179, 176, 174, 171, 168, 165, 162, 159, 156, 153, 150, 144, 138, 132, 126, 121, 115, 109, 103, 97, 91, 85, 79, 74, 68, 62, 56, 50, 47, 44, 41, 38, 35, 32, 29, 26, 24, 21, 18, 15, 12, 9, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 9, 12, 15, 18, 21, 24, 26, 29, 32, 35, 38, 41, 44, 47, 50, 53, 56, 59, 62, 65, 68, 71, 74, 76, 79, 82, 85, 88, 91, 94, 97, 100, 103, 106, 109, 112, 115, 118, 121, 124, 126, 129, 132, 135, 138, 141, 144, 147, 150, 153, 156, 159, 162, 165, 168, 171, 174, 176, 179, 182, 185, 188, 191, 194, 197, 200, 203, 206, 210, 213, 216, 219, 223, 226, 229, 232, 236, 239, 242, 245, 249, 252, 255] }, H.image.lut.pet_20step = { red: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], green: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], blue: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255] }, H.image.lut.test = { red: H.image.lut.buildLut(H.image.lut.id), green: H.image.lut.buildLut(H.image.lut.zero), blue: H.image.lut.buildLut(H.image.lut.zero) }, (H = H || {}).image = H.image || {}, H.image.WindowLevel = function(t, n) {
        if (0 === n) throw new Error("A window level with a width of zero is not possible.");
        var i = 0,
            r = 0,
            o = 255,
            a = null,
            s = null,
            l = null,
            u = null;

        function c() {
            var e = t + i;
            a = e - .5 - (n - 1) / 2, s = e - .5 + (n - 1) / 2, l = (o - r) / (n - 1), u = (-(e - .5) / (n - 1) + .5) * (o - r) + r
        }
        c(), this.getCenter = function() { return t }, this.getWidth = function() { return n }, this.setRange = function(e, t) { r = parseInt(e, 10), o = parseInt(t, 10), c() }, this.setSignedOffset = function(e) { i = e, c() }, this.apply = function(e) { return e <= a ? r : s < e ? o : parseInt(e * l + u, 10) }
    }, H.image.WindowLevel.prototype.equals = function(e) { return null !== e && this.getCenter() === e.getCenter() && this.getWidth() === e.getWidth() }, H.image.WindowLevel.prototype.toString = function() { return this.getCenter() + ", " + this.getWidth() }, H.image.View = function(d) {
        var S = {},
            a = { minmax: { name: "minmax" } },
            x = null,
            t = H.image.lut.plain,
            i = { i: 0, j: 0, k: 0 },
            n = null;
        this.getImage = function() { return d }, this.setImage = function(e) { d = e }, this.getCurrentWindowLut = function(e) {
            var t = this.getCurrentPosition().k;
            void 0 === e && (e = d.getRescaleSlopeAndIntercept(t));
            var n = S[e.toString()];
            if (x && void 0 !== a[x] && void 0 !== a[x].perslice && !0 === a[x].perslice) {
                var i = a[x].wl[t];
                if (!n.getWindowLevel().equals(i)) {
                    var r = n.getWindowLevel().getWidth(),
                        o = n.getWindowLevel().getCenter();
                    n.setWindowLevel(i), r !== i.getWidth() && this.fireEvent({ type: "wl-width-change", wc: i.getCenter(), ww: i.getWidth(), skipGenerate: !0 }), o !== i.getCenter() && this.fireEvent({ type: "wl-center-change", wc: i.getCenter(), ww: i.getWidth(), skipGenerate: !0 })
                }
            }
            return n.update(), n
        }, this.addWindowLut = function(e) {
            var t = e.getRescaleLut().getRSI();
            S[t.toString()] = e
        }, this.getWindowPresets = function() { return a }, this.getWindowPresetsNames = function() { return Object.keys(a) }, this.setWindowPresets = function(e) { a = e }, this.setDefaultColourMap = function(e) { t = e }, this.addWindowPresets = function(e, t) { for (var n = Object.keys(e), i = null, r = 0; r < n.length; ++r) i = n[r], void 0 !== a[i] && void 0 !== a[i].perslice && !0 === a[i].perslice ? a[i].wl.splice(t, 0, e[i].wl[0]) : a[i] = e[i] }, this.getColourMap = function() { return t }, this.setColourMap = function(e) { t = e, this.fireEvent({ type: "colour-change", wc: this.getCurrentWindowLut().getWindowLevel().getCenter(), ww: this.getCurrentWindowLut().getWindowLevel().getWidth() }) }, this.getCurrentPosition = function() { return { i: i.i, j: i.j, k: i.k } }, this.setCurrentPosition = function(e, t) { if (void 0 === t && (t = !1), !d.getGeometry().getSize().isInBounds(e.i, e.j, e.k)) return !1; var n = i; return i = e, null !== d.getPhotometricInterpretation().match(/MONOCHROME/) ? this.fireEvent({ type: "position-change", i: e.i, j: e.j, k: e.k, value: d.getRescaledValue(e.i, e.j, e.k, this.getCurrentFrame()) }) : this.fireEvent({ type: "position-change", i: e.i, j: e.j, k: e.k }), t || n.k !== i.k && this.fireEvent({ type: "slice-change" }), !0 }, this.getCurrentFrame = function() { return n }, this.setCurrentFrame = function(e) { return !(e < 0 || e >= d.getNumberOfFrames()) && (n !== (n = e) && 1 !== d.getNumberOfFrames() && (this.fireEvent({ type: "frame-change", frame: n }), this.setCurrentPosition(this.getCurrentPosition(), !0)), !0) }, this.append = function(e) {
            var t = this.getImage().appendSlice(e.getImage());
            t <= this.getCurrentPosition().k && this.setCurrentPosition({ i: this.getCurrentPosition().i, j: this.getCurrentPosition().j, k: this.getCurrentPosition().k + 1 }, !0), this.addWindowPresets(e.getWindowPresets(), t)
        }, this.appendFrameBuffer = function(e) { this.getImage().appendFrameBuffer(e) }, this.setWindowLevel = function(e, t, n) {
            if (1 <= t) {
                var i = this.getCurrentPosition().k,
                    r = null,
                    o = d.getRescaleSlopeAndIntercept(i);
                if (o && void 0 !== o) {
                    var a = S[o.toString()];
                    a && void 0 !== a && (r = a.getWindowLevel())
                }
                void 0 === n && (n = "manual"), x = n;
                var s = new H.image.WindowLevel(e, t);
                if (0 === Object.keys(S).length) {
                    var l = new H.image.lut.Rescale(d.getRescaleSlopeAndIntercept(0), d.getMeta().BitsStored),
                        u = new H.image.lut.Window(l, d.getMeta().IsSigned);
                    this.addWindowLut(u)
                }
                for (var c in S) S[c].setWindowLevel(s);
                r && void 0 !== r ? (r.getWidth() !== t && this.fireEvent({ type: "wl-width-change", wc: e, ww: t }), r.getCenter() !== e && this.fireEvent({ type: "wl-center-change", wc: e, ww: t })) : (this.fireEvent({ type: "wl-width-change", wc: e, ww: t }), this.fireEvent({ type: "wl-center-change", wc: e, ww: t }))
            }
        }, this.setWindowLevelPreset = function(e) { var t = this.getWindowPresets()[e]; if (void 0 === t) throw new Error("Unknown window level preset: '" + e + "'"); "minmax" === e && void 0 === t.wl && (t.wl = this.getWindowLevelMinMax()), void 0 !== t.perslice && !0 === t.perslice && (t = { wl: t.wl[this.getCurrentPosition().k] }), this.setWindowLevel(t.wl.getCenter(), t.wl.getWidth(), e) }, this.setWindowLevelPresetById = function(e) {
            var t = Object.keys(this.getWindowPresets());
            this.setWindowLevelPreset(t[e])
        }, this.clone = function() { var e = new H.image.View(this.getImage()); for (var t in S) e.addWindowLut(S[t]); return e.setListeners(this.getListeners()), e };
        var r = {};
        this.getListeners = function() { return r }, this.setListeners = function(e) { r = e }
    }, H.image.View.prototype.getWindowLevelMinMax = function() {
        var e = this.getImage().getRescaledDataRange(),
            t = e.min,
            n = e.max - t,
            i = t + n / 2;
        return new H.image.WindowLevel(i, n)
    }, H.image.View.prototype.setWindowLevelMinMax = function() {
        var e = this.getWindowLevelMinMax();
        this.setWindowLevel(e.getCenter(), e.getWidth(), "minmax")
    }, H.image.View.prototype.generateImageData = function(e) {
        var t = this.getCurrentWindowLut(),
            n = this.getImage(),
            i = n.getGeometry().getSize().getSliceSize(),
            r = i * this.getCurrentPosition().k,
            o = this.getCurrentFrame() ? this.getCurrentFrame() : 0,
            a = 0,
            s = 0,
            l = 0,
            u = n.getPhotometricInterpretation();
        switch (u) {
            case "MONOCHROME1":
            case "MONOCHROME2":
                for (var c = this.getColourMap(), d = r + i, S = r; S < d; ++S) s = parseInt(t.getValue(n.getValueAtOffset(S, o)), 10), e.data[a] = c.red[s], e.data[a + 1] = c.green[s], e.data[a + 2] = c.blue[s], e.data[a + 3] = 255, a += 4;
                break;
            case "RGB":
                r *= 3;
                var x = n.getPlanarConfiguration();
                if (0 !== x && 1 !== x) throw new Error("Unsupported planar configuration: " + x);
                var g = r,
                    m = r + 1,
                    h = r + 2;
                l = 3, 1 === x && (m = (g = r) + i, h = r + 2 * i, l = 1);
                for (var p = 0; p < i; ++p) e.data[a] = parseInt(t.getValue(n.getValueAtOffset(g, o)), 10), e.data[a + 1] = parseInt(t.getValue(n.getValueAtOffset(m, o)), 10), e.data[a + 2] = parseInt(t.getValue(n.getValueAtOffset(h, o)), 10), e.data[a + 3] = 255, a += 4, g += l, m += l, h += l;
                break;
            case "YBR_FULL_422":
                r *= 3;
                var f = n.getPlanarConfiguration();
                if (0 !== f && 1 !== f) throw new Error("Unsupported planar configuration: " + f);
                var C, y, D, v, T, L, I = r,
                    P = r + 1,
                    F = r + 2;
                l = 3, 1 === f && (P = (I = r) + i, F = r + 2 * i, l = 1);
                for (var A = 0; A < i; ++A) C = n.getValueAtOffset(I, o), y = n.getValueAtOffset(P, o), v = C + 1.402 * ((D = n.getValueAtOffset(F, o)) - 128), T = C - .34414 * (y - 128) - .71414 * (D - 128), L = C + 1.772 * (y - 128), e.data[a] = parseInt(t.getValue(v), 10), e.data[a + 1] = parseInt(t.getValue(T), 10), e.data[a + 2] = parseInt(t.getValue(L), 10), e.data[a + 3] = 255, a += 4, I += l, P += l, F += l;
                break;
            default:
                throw new Error("Unsupported photometric interpretation: " + u)
        }
    }, H.image.View.prototype.addEventListener = function(e, t) {
        var n = this.getListeners();
        n[e] || (n[e] = []), n[e].push(t)
    }, H.image.View.prototype.removeEventListener = function(e, t) {
        var n = this.getListeners();
        if (n[e])
            for (var i = 0; i < n[e].length; ++i) n[e][i] === t && n[e].splice(i, 1)
    }, H.image.View.prototype.fireEvent = function(e) {
        var t = this.getListeners();
        if (t[e.type])
            for (var n = 0; n < t[e.type].length; ++n) t[e.type][n](e)
    }, H.image.ViewFactory = function() {}, H.image.ViewFactory.prototype.create = function(e, t) {
        var n = new H.image.View(t);
        "MONOCHROME1" === t.getPhotometricInterpretation() && n.setDefaultColourMap(H.image.lut.invPlain);
        var i = {},
            r = e.getFromKey("x00281050", !0),
            o = e.getFromKey("x00281051", !0),
            a = e.getFromKey("x00281055", !0);
        if (r && o)
            for (var s, l = 0; l < r.length; ++l) {
                var u = parseFloat(r[l], 10),
                    c = parseFloat(o[l], 10);
                u && c && (s = "", a && (s = H.dicom.cleanString(a[l])), "" === s && (s = "Default" + l), i[s] = { wl: [new H.image.WindowLevel(u, c)], name: s, perslice: !0 })
            }
        if (i.minmax = { name: "minmax" }, void 0 !== H.tool.defaultpresets) {
            var d = t.getMeta().Modality;
            for (var S in H.tool.defaultpresets[d]) {
                var x = H.tool.defaultpresets[d][S];
                i[S] = { wl: new H.image.WindowLevel(x.center, x.width), name: S }
            }
        }
        return n.setWindowPresets(i), n
    }, (H = H || {}).io = H.io || {}, H.io.DicomDataLoader = function() {
        var i = this,
            r = {},
            o = !1;
        this.setOptions = function(e) { r = e }, this.isLoading = function() { return o };
        var a = new H.image.DicomBufferToView;
        this.load = function(e, t, n) { o = !0, void 0 !== r.defaultCharacterSet && a.setDefaultCharacterSet(r.defaultCharacterSet), a.onload = i.onload, a.onloadend = function() { o = !1, i.onloadend() }, a.onprogress = i.onprogress; try { a.convert(e, n) } catch (e) { i.onerror(e) } }, this.abort = function() { a.abort(), o = !1, i.onabort({ message: "Abort while loading DICOM data." }) }, this.getFileLoadHandler = function(t, n) { return function(e) { i.load(e.target.result, t, n) } }, this.getUrlLoadHandler = function(e, t) { return function() { 200 === this.status || 0 === this.status ? i.load(this.response, e, t) : i.onerror({ name: "RequestError", message: "Error status: " + this.status + " while loading '" + e + "' [DicomDataLoader]" }) } }
    }, H.io.DicomDataLoader.prototype.canLoadFile = function(e) {
        var t = e.name.split("."),
            n = "";
        return 1 !== t.length && (n = t.pop().toLowerCase()), !(0 !== n.length) || "dcm" === n
    }, H.io.DicomDataLoader.prototype.canLoadUrl = function(e) {
        var t = e.split("."),
            n = "";
        1 !== t.length && (n = t.pop().toLowerCase());
        var i = 0 !== n.length && n.length < 5;
        return -1 !== e.indexOf("contentType=application/dicom") || "dcm" === n || !i
    }, H.io.DicomDataLoader.prototype.loadFileAs = function() { return H.io.fileContentTypes.ArrayBuffer }, H.io.DicomDataLoader.prototype.loadUrlAs = function() { return H.io.urlContentTypes.ArrayBuffer }, H.io.DicomDataLoader.prototype.onload = function() {}, H.io.DicomDataLoader.prototype.onloadend = function() {}, H.io.DicomDataLoader.prototype.onprogress = function() {}, H.io.DicomDataLoader.prototype.onerror = function() {}, H.io.DicomDataLoader.prototype.onabort = function() {}, H.io.loaderList = H.io.loaderList || [], H.io.loaderList.push("DicomDataLoader"), (H = H || {}).io = H.io || {}, H.io.fileContentTypes = { Text: 0, ArrayBuffer: 1, DataURL: 2 }, H.io.FilesLoader = function() {
        var t, e = this,
            n = [],
            i = [],
            r = 0,
            o = 0;
        this.getDefaultCharacterSet = function() { return t }, this.setDefaultCharacterSet = function(e) { t = e }, this.storeReader = function(e) { n.push(e) }, this.clearStoredReaders = function() { n = [] }, this.storeLoader = function(e) { i = e }, this.clearStoredLoader = function() { i = null }, this.abort = function() {
            for (var e = 0; e < n.length; ++e) 1 === n[e].readyState && n[e].abort();
            this.clearStoredReaders(), i && i.abort(), this.clearStoredLoader()
        }, this.setNToLoad = function(e) { r = e }, this.addLoaded = function() {++o === r && e.onloadend() }
    }, H.io.FilesLoader.prototype.onload = function() {}, H.io.FilesLoader.prototype.onloadend = function() {}, H.io.FilesLoader.prototype.onprogress = function() {}, H.io.FilesLoader.prototype.onerror = function() {}, H.io.FilesLoader.prototype.onabort = function() {}, H.io.FilesLoader.prototype.load = function(e) {
        this.clearStoredReaders(), this.clearStoredLoader();
        var i = this;
        this.setNToLoad(e.length);
        var t = new H.utils.MultiProgressHandler(i.onprogress);
        t.setNToLoad(e.length);
        for (var n = [], r = 0; r < H.io.loaderList.length; ++r) n.push(new H.io[H.io.loaderList[r]]);
        for (var o = null, a = 0; a < n.length; ++a)(o = n[a]).onload = i.onload, o.onloadend = i.addLoaded, o.onerror = i.onerror, o.onabort = i.onabort, o.setOptions({ defaultCharacterSet: this.getDefaultCharacterSet() }), o.onprogress = t.getUndefinedMonoProgressHandler(1);
        for (var s = function(n) {
                return function(e) {
                    var t = "An error occurred while reading '" + n + "'";
                    void 0 !== e.getMessage && (t += " (" + e.getMessage() + ")"), t += ".", i.onerror({ name: "FileReaderError", message: t })
                }
            }, l = function(e) { return function() { i.onabort({ message: "Abort while reading '" + e + "'" }) } }, u = 0; u < e.length; ++u) {
            var c = e[u],
                d = new FileReader;
            this.storeReader(d), d.onprogress = t.getMonoProgressHandler(u, 0);
            for (var S = !1, x = 0; x < n.length; ++x)
                if ((o = n[x]).canLoadFile(c)) { S = !0, this.storeLoader(o), d.onload = o.getFileLoadHandler(c, u), d.onerror = s(c.name), d.onabort = l(c.name), o.loadFileAs() === H.io.fileContentTypes.Text ? d.readAsText(c) : o.loadFileAs() === H.io.fileContentTypes.DataURL ? d.readAsDataURL(c) : o.loadFileAs() === H.io.fileContentTypes.ArrayBuffer && d.readAsArrayBuffer(c); break }
            if (!S) throw new Error("No loader found for file: " + c)
        }
    }, (H = H || {}).io = H.io || {}, H.io.JSONTextLoader = function() {
        var i = this,
            r = !1;
        this.setOptions = function() {}, this.isLoading = function() { return r }, this.load = function(e, t, n) { r = !0; try { i.onload(e), r = !1, i.onloadend() } catch (e) { i.onerror(e) } i.onprogress({ type: "read-progress", lengthComputable: !0, loaded: 100, total: 100, index: n }) }, this.abort = function() { r = !1, i.onabort() }, this.getFileLoadHandler = function(t, n) { return function(e) { i.load(e.target.result, t, n) } }, this.getUrlLoadHandler = function(e, t) { return function() { 200 === this.status || 0 === this.status ? i.load(this.responseText, e, t) : i.onerror({ name: "RequestError", message: "Error status: " + this.status + " while loading '" + e + "' [JSONTextLoader]" }) } }
    }, H.io.JSONTextLoader.prototype.canLoadFile = function(e) { return "json" === e.name.split(".").pop().toLowerCase() }, H.io.JSONTextLoader.prototype.canLoadUrl = function(e) { return "json" === e.split(".").pop().toLowerCase() }, H.io.JSONTextLoader.prototype.loadFileAs = function() { return H.io.fileContentTypes.Text }, H.io.JSONTextLoader.prototype.loadUrlAs = function() { return H.io.urlContentTypes.Text }, H.io.JSONTextLoader.prototype.onload = function() {}, H.io.JSONTextLoader.prototype.onloadend = function() {}, H.io.JSONTextLoader.prototype.onprogress = function() {}, H.io.JSONTextLoader.prototype.onerror = function() {}, H.io.JSONTextLoader.prototype.onabort = function() {}, H.io.loaderList = H.io.loaderList || [], H.io.loaderList.push("JSONTextLoader"), (H = H || {}).io = H.io || {}, H.io.MemoryLoader = function() {
        var t, e = this,
            n = null,
            i = 0,
            r = 0;
        this.getDefaultCharacterSet = function() { return t }, this.setDefaultCharacterSet = function(e) { t = e }, this.storeLoader = function(e) { n = e }, this.clearStoredLoader = function() { n = null }, this.abort = function() { n.abort(), this.clearStoredLoaders() }, this.setNToLoad = function(e) { i = e }, this.addLoaded = function() {++r === i && e.onloadend() }
    }, H.io.MemoryLoader.prototype.onload = function() {}, H.io.MemoryLoader.prototype.onloadend = function() {}, H.io.MemoryLoader.prototype.onprogress = function() {}, H.io.MemoryLoader.prototype.onerror = function() {}, H.io.MemoryLoader.prototype.onabort = function() {}, H.io.MemoryLoader.prototype.load = function(e) {
        this.clearStoredLoader();
        var t = this;
        this.setNToLoad(e.length);
        var n = new H.utils.MultiProgressHandler(t.onprogress);
        n.setNToLoad(e.length);
        for (var i = [], r = 0; r < H.io.loaderList.length; ++r) i.push(new H.io[H.io.loaderList[r]]);
        for (var o = null, a = 0; a < i.length; ++a)(o = i[a]).onload = t.onload, o.onloadend = t.addLoaded, o.onerror = t.onerror, o.onabort = t.onabort, o.setOptions({ defaultCharacterSet: this.getDefaultCharacterSet() }), o.onprogress = n.getUndefinedMonoProgressHandler(1);
        for (var s = 0; s < e.length; ++s) {
            for (var l = e[s], u = !1, c = 0; c < i.length; ++c)
                if ((o = i[c]).canLoadUrl(l.filename)) { u = !0, this.storeLoader(o), o.load(l.data, l.filename, s); break }
            if (!u) throw new Error("No loader found for file: " + l.filename)
        }
    }, (H = H || {}).io = H.io || {}, H.io.RawImageLoader = function() {
        var r = this;
        this.setOptions = function() {}, this.isLoading = function() { return !0 }, this.load = function(e, t, n) {
            var i = new Image;
            i.src = e, i.origin = t, i.index = n, i.onload = function() { try { r.onload(H.image.getViewFromDOMImage(this)), r.onloadend() } catch (e) { r.onerror(e) } r.onprogress({ type: "read-progress", lengthComputable: !0, loaded: 100, total: 100, index: n }) }
        }, this.abort = function() { r.onabort() }, this.getFileLoadHandler = function(t, n) { return function(e) { r.load(e.target.result, t, n) } }, this.getUrlLoadHandler = function(t, n) {
            return function() {
                if (200 === this.status || 0 === this.status) {
                    var e = t.split(".").pop().toLowerCase();
                    r.load(function(e, t) { for (var n = new Uint8Array(e), i = "", r = 0; r < n.byteLength; ++r) i += String.fromCharCode(n[r]); var o = t; return "jpg" === o && (o = "jpeg"), "data:image/" + o + ";base64," + W.btoa(i) }(this.response, e), t, n)
                } else r.onerror({ name: "RequestError", message: "Error status: " + this.status + " while loading '" + t + "' [RawImageLoader]" })
            }
        }
    }, H.io.RawImageLoader.prototype.canLoadFile = function(e) { return e.type.match("image.*") }, H.io.RawImageLoader.prototype.canLoadUrl = function(e) {
        var t = e.split(".").pop().toLowerCase(),
            n = "jpeg" === t || "jpg" === t || "png" === t || "gif" === t;
        return -1 !== e.indexOf("contentType=image/jpeg") || -1 !== e.indexOf("contentType=image/png") || -1 !== e.indexOf("contentType=image/gif") || n
    }, H.io.RawImageLoader.prototype.loadFileAs = function() { return H.io.fileContentTypes.DataURL }, H.io.RawImageLoader.prototype.loadUrlAs = function() { return H.io.urlContentTypes.ArrayBuffer }, H.io.RawImageLoader.prototype.onload = function() {}, H.io.RawImageLoader.prototype.onloadend = function() {}, H.io.RawImageLoader.prototype.onprogress = function() {}, H.io.RawImageLoader.prototype.onerror = function() {}, H.io.RawImageLoader.prototype.onabort = function() {}, H.io.loaderList = H.io.loaderList || [], H.io.loaderList.push("RawImageLoader"), (H = H || {}).io = H.io || {}, H.io.RawVideoLoader = function() {
        var r = this;
        this.setOptions = function() {}, this.isLoading = function() { return !0 }, this.load = function(e, t, n) {
            var i = document.createElement("video");
            i.src = e, i.file = t, i.index = n, i.onloadedmetadata = function() { try { H.image.getViewFromDOMVideo(this, r.onload, r.onprogress, r.onloadend, n) } catch (e) { r.onerror(e) } }
        }, this.abort = function() { r.onabort() }, this.getFileLoadHandler = function(t, n) { return function(e) { r.load(e.target.result, t, n) } }, this.getUrlLoadHandler = function(t, n) {
            return function() {
                if (200 === this.status || 0 === this.status) {
                    var e = t.split(".").pop().toLowerCase();
                    r.load(function(e, t) { for (var n = new Uint8Array(e), i = "", r = 0; r < n.byteLength; ++r) i += String.fromCharCode(n[r]); return "data:video/" + t + ";base64," + W.btoa(i) }(this.response, e), t, n)
                } else r.onerror({ name: "RequestError", message: "Error status: " + this.status + " while loading '" + t + "' [RawVideoLoader]" })
            }
        }
    }, H.io.RawVideoLoader.prototype.canLoadFile = function(e) { return e.type.match("video.*") }, H.io.RawVideoLoader.prototype.canLoadUrl = function(e) { var t = e.split(".").pop().toLowerCase(); return "mp4" === t || "ogg" === t || "webm" === t }, H.io.RawVideoLoader.prototype.loadFileAs = function() { return H.io.fileContentTypes.DataURL }, H.io.RawVideoLoader.prototype.loadUrlAs = function() { return H.io.urlContentTypes.ArrayBuffer }, H.io.RawVideoLoader.prototype.onload = function() {}, H.io.RawVideoLoader.prototype.onloadend = function() {}, H.io.RawVideoLoader.prototype.onprogress = function() {}, H.io.RawVideoLoader.prototype.onerror = function() {}, H.io.RawVideoLoader.prototype.onabort = function() {}, H.io.loaderList = H.io.loaderList || [], H.io.loaderList.push("RawVideoLoader"), (H = H || {}).io = H.io || {}, H.io.urlContentTypes = { Text: 0, ArrayBuffer: 1, oups: 2 }, H.io.UrlsLoader = function() {
        var t, e = this,
            n = [],
            i = null,
            r = 0,
            o = 0;
        this.getDefaultCharacterSet = function() { return t }, this.setDefaultCharacterSet = function(e) { t = e }, this.storeRequest = function(e) { n.push(e) }, this.clearStoredRequests = function() { n = [] }, this.storeLoader = function(e) { i = e }, this.clearStoredLoader = function() { i = null }, this.abort = function() {
            for (var e = 0; e < n.length; ++e) 2 !== n[e].readyState && 3 !== n[e].readyState || n[e].abort();
            this.clearStoredRequests(), i && i.isLoading() && i.abort(), this.clearStoredLoader()
        }, this.setNToLoad = function(e) { r = e }, this.addLoaded = function() {++o === r && e.onloadend() }
    }, H.io.UrlsLoader.prototype.onload = function() {}, H.io.UrlsLoader.prototype.onloadend = function() {}, H.io.UrlsLoader.prototype.onprogress = function() {}, H.io.UrlsLoader.prototype.onerror = function() {}, H.io.UrlsLoader.prototype.onabort = function() {}, H.io.UrlsLoader.prototype.load = function(e, t) {
        this.clearStoredRequests(), this.clearStoredLoader();
        var n = this;
        this.setNToLoad(e.length);
        var i = new H.utils.MultiProgressHandler(n.onprogress);
        i.setNToLoad(e.length);
        for (var r = [], o = 0; o < H.io.loaderList.length; ++o) r.push(new H.io[H.io.loaderList[o]]);
        for (var a = null, s = 0; s < r.length; ++s)(a = r[s]).onload = n.onload, a.onloadend = n.addLoaded, a.onerror = n.onerror, a.onabort = n.onabort, a.setOptions({ defaultCharacterSet: this.getDefaultCharacterSet() }), a.onprogress = i.getUndefinedMonoProgressHandler(1);
        for (var l = function(t) {
                return function() {
                    var e = "An error occurred while downloading '" + t + "'";
                    void 0 !== this.status && (e += " (http status: " + this.status + ")"), e += ".", n.onerror({ name: "RequestError", message: e })
                }
            }, u = function(e) { return function() { n.onabort({ message: "Abort while downloading '" + e + "'." }) } }, c = 0; c < e.length; ++c) {
            var d = e[c],
                S = new XMLHttpRequest;
            if (S.open("GET", d, !0), this.storeRequest(S), void 0 !== t.requestHeaders)
                for (var x = t.requestHeaders, g = 0; g < x.length; ++g) void 0 !== x[g].name && void 0 !== x[g].value && S.setRequestHeader(x[g].name, x[g].value);
            S.onprogress = i.getMonoProgressHandler(c, 0), S.onloadend = i.getMonoOnLoadEndHandler(c, 0);
            for (var m = !1, h = 0; h < r.length; ++h)
                if ((a = r[h]).canLoadUrl(d)) { m = !0, this.storeLoader(a), S.onload = a.getUrlLoadHandler(d, c), S.onerror = l(d), S.onabort = u(d), a.loadUrlAs() === H.io.urlContentTypes.ArrayBuffer && (S.responseType = "arraybuffer"), S.send(null); break }
            if (!m) throw new Error("No loader found for url: " + d)
        }
    }, (H = H || {}).io = H.io || {};
    t = t || {};
    H.io.ZipLoader = function() {
        var i = this,
            r = !1;
        this.setOptions = function(e) { e }, this.isLoading = function() { return r };
        var o = "",
            a = [],
            s = null;

        function l(e) {
            if (a.push({ filename: o, data: e }), a.length < s.length) {
                var t = a.length;
                o = s[t].name, s[t].async("arrayBuffer").then(l)
            } else {
                var n = new H.io.MemoryLoader;
                n.onload = i.onload, n.onloadend = function() { r = !1, i.onloadend() }, n.onprogress = i.onprogress, n.onerror = i.onerror, n.onabort = i.onabort, n.load(a)
            }
        }
        this.load = function(e) {
            r = !0, t.loadAsync(e).then(function(e) {
                a = [], s = e.file(/.*\.dcm/);
                var t = a.length;
                o = s[t].name, s[t].async("arrayBuffer").then(l)
            })
        }, this.abort = function() { r = !1, i.onabort() }, this.getFileLoadHandler = function(t, n) { return function(e) { i.load(e.target.result, t, n) } }, this.getUrlLoadHandler = function(e, t) { return function() { 200 === this.status || 0 === this.status ? i.load(this.response, e, t) : i.onerror({ name: "RequestError", message: "Error status: " + this.status + " while loading '" + e + "' [ZipLoader]" }) } }
    }, H.io.ZipLoader.prototype.canLoadFile = function(e) { return "zip" === e.name.split(".").pop().toLowerCase() }, H.io.ZipLoader.prototype.canLoadUrl = function(e) { return "zip" === e.split(".").pop().toLowerCase() }, H.io.ZipLoader.prototype.loadFileAs = function() { return H.io.fileContentTypes.ArrayBuffer }, H.io.ZipLoader.prototype.loadUrlAs = function() { return H.io.urlContentTypes.ArrayBuffer }, H.io.ZipLoader.prototype.onload = function() {}, H.io.ZipLoader.prototype.onloadend = function() {}, H.io.ZipLoader.prototype.onprogress = function() {}, H.io.ZipLoader.prototype.onerror = function() {}, H.io.ZipLoader.prototype.onabort = function() {}, H.io.loaderList = H.io.loaderList || [], H.io.loaderList.push("ZipLoader"), (H = H || {}).math = H.math || {}, H.math.BucketQueue = function(e, t) { this.bucketCount = 1 << e, this.mask = this.bucketCount - 1, this.size = 0, this.loc = 0, this.cost = void 0 !== t ? t : function(e) { return e }, this.buckets = this.buildArray(this.bucketCount) }, H.math.BucketQueue.prototype.push = function(e) {
        var t = this.getBucket(e);
        e.next = this.buckets[t], this.buckets[t] = e, this.size++
    }, H.math.BucketQueue.prototype.pop = function() { if (0 === this.size) throw new Error("Cannot pop, bucketQueue is empty."); for (; null === this.buckets[this.loc];) this.loc = (this.loc + 1) % this.bucketCount; var e = this.buckets[this.loc]; return this.buckets[this.loc] = e.next, e.next = null, this.size--, e }, H.math.BucketQueue.prototype.remove = function(e) { if (!e) return !1; for (var t = this.getBucket(e), n = this.buckets[t]; null !== n && !e.equals(n.next);) n = n.next; return null !== n && (n.next = n.next.next, this.size--, !0) }, H.math.BucketQueue.prototype.isEmpty = function() { return 0 === this.size }, H.math.BucketQueue.prototype.getBucket = function(e) { return this.cost(e) & this.mask }, H.math.BucketQueue.prototype.buildArray = function(e) { for (var t = new Array(e), n = 0; n < t.length; n++) t[n] = null; return t }, (H = H || {}).math = H.math || {}, H.math.Matrix33 = function(e, t, n, i, r, o, a, s, l) {
        var u = new Float32Array(9);
        u[0] = e, u[1] = t, u[2] = n, u[3] = i, u[4] = r, u[5] = o, u[6] = a, u[7] = s, u[8] = l, this.get = function(e, t) { return u[3 * e + t] }
    }, H.math.Matrix33.prototype.equals = function(e) { return this.get(0, 0) === e.get(0, 0) && this.get(0, 1) === e.get(0, 1) && this.get(0, 2) === e.get(0, 2) && this.get(1, 0) === e.get(1, 0) && this.get(1, 1) === e.get(1, 1) && this.get(1, 2) === e.get(1, 2) && this.get(2, 0) === e.get(2, 0) && this.get(2, 1) === e.get(2, 1) && this.get(2, 2) === e.get(2, 2) }, H.math.Matrix33.prototype.toString = function() { return "[" + this.get(0, 0) + ", " + this.get(0, 1) + ", " + this.get(0, 2) + "\n " + this.get(1, 0) + ", " + this.get(1, 1) + ", " + this.get(1, 2) + "\n " + this.get(2, 0) + ", " + this.get(2, 1) + ", " + this.get(2, 2) + "]" }, H.math.Matrix33.multiplyVector3D = function(e) {
        var t = this.get(0, 0),
            n = this.get(0, 1),
            i = this.get(0, 2),
            r = this.get(1, 0),
            o = this.get(1, 1),
            a = this.get(1, 2),
            s = this.get(2, 0),
            l = this.get(2, 1),
            u = this.get(2, 2),
            c = e.getX(),
            d = e.getY(),
            S = e.getZ();
        return new H.math.Vector3D(t * c + n * d + i * S, r * c + o * d + a * S, s * c + l * d + u * S)
    }, H.math.getIdentityMat33 = function() { return new H.math.Matrix33(1, 0, 0, 0, 1, 0, 0, 0, 1) }, (H = H || {}).math = H.math || {}, H.math.Point2D = function(e, t) { this.getX = function() { return e }, this.getY = function() { return t } }, H.math.Point2D.prototype.equals = function(e) { return null !== e && this.getX() === e.getX() && this.getY() === e.getY() }, H.math.Point2D.prototype.toString = function() { return "(" + this.getX() + ", " + this.getY() + ")" }, H.math.Point2D.prototype.getDistance = function(e) { return Math.sqrt((this.getX() - e.getX()) * (this.getX() - e.getX()) + (this.getY() - e.getY()) * (this.getY() - e.getY())) }, H.math.FastPoint2D = function(e, t) { this.x = e, this.y = t }, H.math.FastPoint2D.prototype.equals = function(e) { return null !== e && this.x === e.x && this.y === e.y }, H.math.FastPoint2D.prototype.toString = function() { return "(" + this.x + ", " + this.y + ")" }, H.math.Point3D = function(e, t, n) { this.getX = function() { return e }, this.getY = function() { return t }, this.getZ = function() { return n } }, H.math.Point3D.prototype.equals = function(e) { return null !== e && this.getX() === e.getX() && this.getY() === e.getY() && this.getZ() === e.getZ() }, H.math.Point3D.prototype.toString = function() { return "(" + this.getX() + ", " + this.getY() + ", " + this.getZ() + ")" }, H.math.Point3D.prototype.getDistance = function(e) { return Math.sqrt((this.getX() - e.getX()) * (this.getX() - e.getX()) + (this.getY() - e.getY()) * (this.getY() - e.getY()) + (this.getZ() - e.getZ()) * (this.getZ() - e.getZ())) }, H.math.Point3D.prototype.minus = function(e) { return new H.math.Vector3D(this.getX() - e.getX(), this.getY() - e.getY(), this.getZ() - e.getZ()) }, H.math.Index3D = function(e, t, n) { this.getI = function() { return e }, this.getJ = function() { return t }, this.getK = function() { return n } }, H.math.Index3D.prototype.equals = function(e) { return null !== e && this.getI() === e.getI() && this.getJ() === e.getJ() && this.getK() === e.getK() }, H.math.Index3D.prototype.toString = function() { return "(" + this.getI() + ", " + this.getJ() + ", " + this.getK() + ")" }, (H = H || {}).math = H.math || {};
    var h = 2 / (3 * Math.PI);

    function o(e, t, n) { var i = null; return null !== t && null !== n && (i = e * t * n), i } H.math.computeGreyscale = function(e, t, n) {
        for (var i = [], r = 0; r < n; r++) {
            i[r] = [];
            for (var o = 0; o < t; o++) {
                var a = 4 * (r * t + o);
                i[r][o] = (e[a] + e[a + 1] + e[a + 2]) / 765
            }
        }
        return i.dx = function(e, t) { return e + 1 === this[t].length && e--, this[t][e + 1] - this[t][e] }, i.dy = function(e, t) { return t + 1 === this.length && t--, this[t][e] - this[t + 1][e] }, i.gradMagnitude = function(e, t) {
            var n = this.dx(e, t),
                i = this.dy(e, t);
            return Math.sqrt(n * n + i * i)
        }, i.laplace = function(e, t) { var n = -16 * this[t][e]; return n += this[t - 2][e], n += this[t - 1][e - 1] + 2 * this[t - 1][e] + this[t - 1][e + 1], n += this[t][e - 2] + 2 * this[t][e - 1] + 2 * this[t][e + 1] + this[t][e + 2], n += this[t + 1][e - 1] + 2 * this[t + 1][e] + this[t + 1][e + 1], n += this[t + 2][e] }, i
    }, H.math.computeGradient = function(e) {
        var t = [],
            n = 0,
            i = 0,
            r = 0;
        for (r = 0; r < e.length - 1; r++) {
            for (t[r] = [], i = 0; i < e[r].length - 1; i++) t[r][i] = e.gradMagnitude(i, r), n = Math.max(t[r][i], n);
            t[r][e[r].length - 1] = t[r][e.length - 2]
        }
        t[e.length - 1] = [];
        for (var o = 0; o < t[0].length; o++) t[e.length - 1][o] = t[e.length - 2][o];
        for (r = 0; r < t.length; r++)
            for (i = 0; i < t[r].length; i++) t[r][i] = 1 - t[r][i] / n;
        return t
    }, H.math.computeLaplace = function(e) {
        var t = [];
        t[0] = [], t[1] = [];
        for (var n = 1; n < e.length; n++) t[0][n] = 1, t[1][n] = 1;
        for (var i = 2; i < e.length - 2; i++) {
            t[i] = [], t[i][0] = 1, t[i][1] = 1;
            for (var r = 2; r < e[i].length - 2; r++) t[i][r] = .33 < e.laplace(r, i) ? 0 : 1;
            t[i][e[i].length - 2] = 1, t[i][e[i].length - 1] = 1
        }
        t[e.length - 2] = [], t[e.length - 1] = [];
        for (var o = 1; o < e.length; o++) t[e.length - 2][o] = 1, t[e.length - 1][o] = 1;
        return t
    }, H.math.computeGradX = function(e) {
        for (var t = [], n = 0; n < e.length; n++) {
            t[n] = [];
            for (var i = 0; i < e[n].length - 1; i++) t[n][i] = e.dx(i, n);
            t[n][e[n].length - 1] = t[n][e[n].length - 2]
        }
        return t
    }, H.math.computeGradY = function(e) { for (var t = [], n = 0; n < e.length - 1; n++) { t[n] = []; for (var i = 0; i < e[n].length; i++) t[n][i] = e.dy(i, n) } t[e.length - 1] = []; for (var r = 0; r < e[0].length; r++) t[e.length - 1][r] = t[e.length - 2][r]; return t }, H.math.gradUnitVector = function(e, t, n, i, r) {
        var o = e[i][n],
            a = t[i][n],
            s = Math.sqrt(o * o + a * a);
        s = Math.max(s, 1e-100), r.x = o / s, r.y = a / s
    }, H.math.gradDirection = function(e, t, n, i, r, o) {
        var a = new H.math.FastPoint2D(-1, -1),
            s = new H.math.FastPoint2D(-1, -1);
        H.math.gradUnitVector(e, t, n, i, a), H.math.gradUnitVector(e, t, r, o, s);
        var l = a.y * (r - n) - a.x * (o - i),
            u = s.y * (r - n) - s.x * (o - i);
        return l < 0 && (l = -l, u = -u), n !== r && i !== o && (l *= Math.SQRT1_2, u *= Math.SQRT1_2), h * (Math.acos(l) + Math.acos(u))
    }, H.math.computeSides = function(e, t, n, i) {
        for (var r = { inside: [], outside: [] }, o = new H.math.FastPoint2D(-1, -1), a = 0; a < t.length; a++) {
            r.inside[a] = [], r.outside[a] = [];
            for (var s = 0; s < t[a].length; s++) {
                H.math.gradUnitVector(t, n, s, a, o);
                var l = Math.round(s + e * o.y),
                    u = Math.round(a - e * o.x),
                    c = Math.round(s - e * o.y),
                    d = Math.round(a + e * o.x);
                l = Math.max(Math.min(l, t[a].length - 1), 0), c = Math.max(Math.min(c, t[a].length - 1), 0), u = Math.max(Math.min(u, t.length - 1), 0), d = Math.max(Math.min(d, t.length - 1), 0), r.inside[a][s] = i[u][l], r.outside[a][s] = i[d][c]
            }
        }
        return r
    }, H.math.gaussianBlur = function(e, t) {
        t[0] = .4 * e[0] + .5 * e[1] + .1 * e[1], t[1] = .25 * e[0] + .4 * e[1] + .25 * e[2] + .1 * e[3];
        for (var n = 2; n < e.length - 2; n++) t[n] = .05 * e[n - 2] + .25 * e[n - 1] + .4 * e[n] + .25 * e[n + 1] + .05 * e[n + 2];
        var i = e.length;
        t[i - 2] = .25 * e[i - 1] + .4 * e[i - 2] + .25 * e[i - 3] + .1 * e[i - 4], t[i - 1] = .4 * e[i - 1] + .5 * e[i - 2] + .1 * e[i - 3]
    }, H.math.Scissors = function() { this.width = -1, this.height = -1, this.curPoint = null, this.searchGranBits = 8, this.searchGran = 1 << this.earchGranBits, this.pointsPerPost = 500, this.greyscale = null, this.laplace = null, this.gradient = null, this.gradX = null, this.gradY = null, this.parents = null, this.working = !1, this.trained = !1, this.trainingPoints = null, this.edgeWidth = 2, this.trainingLength = 32, this.edgeGran = 256, this.edgeTraining = null, this.gradPointsNeeded = 32, this.gradGran = 1024, this.gradTraining = null, this.insideGran = 256, this.insideTraining = null, this.outsideGran = 256, this.outsideTraining = null }, H.math.Scissors.prototype.getTrainingIdx = function(e, t) { return Math.round((e - 1) * t) }, H.math.Scissors.prototype.getTrainedEdge = function(e) { return this.edgeTraining[this.getTrainingIdx(this.edgeGran, e)] }, H.math.Scissors.prototype.getTrainedGrad = function(e) { return this.gradTraining[this.getTrainingIdx(this.gradGran, e)] }, H.math.Scissors.prototype.getTrainedInside = function(e) { return this.insideTraining[this.getTrainingIdx(this.insideGran, e)] }, H.math.Scissors.prototype.getTrainedOutside = function(e) { return this.outsideTraining[this.getTrainingIdx(this.outsideGran, e)] }, H.math.Scissors.prototype.setWorking = function(e) { this.working = e }, H.math.Scissors.prototype.setDimensions = function(e, t) { this.width = e, this.height = t }, H.math.Scissors.prototype.setData = function(e) {
        if (-1 === this.width || -1 === this.height) throw new Error("Dimensions have not been set.");
        this.greyscale = H.math.computeGreyscale(e, this.width, this.height), this.laplace = H.math.computeLaplace(this.greyscale), this.gradient = H.math.computeGradient(this.greyscale), this.gradX = H.math.computeGradX(this.greyscale), this.gradY = H.math.computeGradY(this.greyscale);
        var t = H.math.computeSides(this.edgeWidth, this.gradX, this.gradY, this.greyscale);
        this.inside = t.inside, this.outside = t.outside, this.edgeTraining = [], this.gradTraining = [], this.insideTraining = [], this.outsideTraining = []
    }, H.math.Scissors.prototype.findTrainingPoints = function(e) {
        var t = [];
        if (null !== this.parents)
            for (var n = 0; n < this.trainingLength && e; n++) t.push(e), e = this.parents[e.y][e.x];
        return t
    }, H.math.Scissors.prototype.resetTraining = function() { this.trained = !1 }, H.math.Scissors.prototype.doTraining = function(e) {
        if (this.trainingPoints = this.findTrainingPoints(e), !(this.trainingPoints.length < 8)) {
            var t = [];
            this.calculateTraining(t, this.edgeGran, this.greyscale, this.edgeTraining), this.calculateTraining(t, this.gradGran, this.gradient, this.gradTraining), this.calculateTraining(t, this.insideGran, this.inside, this.insideTraining), this.calculateTraining(t, this.outsideGran, this.outside, this.outsideTraining), this.trainingPoints.length < this.gradPointsNeeded && this.addInStaticGrad(this.trainingPoints.length, this.gradPointsNeeded), this.trained = !0
        }
    }, H.math.Scissors.prototype.calculateTraining = function(e, t, n, i) {
        var r = 0;
        for (e.length = t, r = 0; r < t; r++) e[r] = 0;
        var o = 1;
        for (r = 0; r < this.trainingPoints.length; r++) {
            var a = this.trainingPoints[r],
                s = this.getTrainingIdx(t, n[a.y][a.x]);
            e[s] += 1, o = Math.max(o, e[s])
        }
        for (r = 0; r < t; r++) e[r] = 1 - e[r] / o;
        H.math.gaussianBlur(e, i)
    }, H.math.Scissors.prototype.addInStaticGrad = function(e, t) { for (var n = 0; n < this.gradGran; n++) this.gradTraining[n] = Math.min(this.gradTraining[n], 1 - n * (t - e) / (t * this.gradGran)) }, H.math.Scissors.prototype.gradDirection = function(e, t, n, i) { return H.math.gradDirection(this.gradX, this.gradY, e, t, n, i) }, H.math.Scissors.prototype.dist = function(e, t, n, i) {
        var r = this.gradient[i][n];
        e !== n && t !== i || (r *= Math.SQRT1_2);
        var o = this.laplace[i][n],
            a = this.gradDirection(e, t, n, i);
        return this.trained ? .3 * this.getTrainedGrad(r) + .3 * o + .1 * (a + this.getTrainedEdge(this.greyscale[t][e]) + this.getTrainedInside(this.inside[t][e]) + this.getTrainedOutside(this.outside[t][e])) : .43 * r + .43 * o + .11 * a
    }, H.math.Scissors.prototype.adj = function(e) {
        for (var t = [], n = Math.max(e.x - 1, 0), i = Math.max(e.y - 1, 0), r = Math.min(e.x + 1, this.greyscale[0].length - 1), o = Math.min(e.y + 1, this.greyscale.length - 1), a = 0, s = i; s <= o; s++)
            for (var l = n; l <= r; l++) l === e.x && s === e.y || (t[a++] = new H.math.FastPoint2D(l, s));
        return t
    }, H.math.Scissors.prototype.setPoint = function(e) {
        this.setWorking(!0), this.curPoint = e;
        var t = 0,
            n = 0;
        for (this.visited = [], n = 0; n < this.height; n++)
            for (this.visited[n] = [], t = 0; t < this.width; t++) this.visited[n][t] = !1;
        for (this.parents = [], n = 0; n < this.height; n++) this.parents[n] = [];
        for (this.cost = [], n = 0; n < this.height; n++)
            for (this.cost[n] = [], t = 0; t < this.width; t++) this.cost[n][t] = Number.MAX_VALUE;
        this.pq = new H.math.BucketQueue(this.searchGranBits, function(e) { return Math.round(this.searchGran * this.costArr[e.y][e.x]) }), this.pq.searchGran = this.searchGran, this.pq.costArr = this.cost, this.pq.push(e), this.cost[e.y][e.x] = 0
    }, H.math.Scissors.prototype.doWork = function() {
        if (this.working) {
            this.timeout = null;
            for (var e = 0, t = []; !this.pq.isEmpty() && e < this.pointsPerPost;) {
                var n = this.pq.pop();
                t.push(n), t.push(this.parents[n.y][n.x]), this.visited[n.y][n.x] = !0;
                for (var i = this.adj(n), r = 0; r < i.length; r++) {
                    var o = i[r],
                        a = this.cost[n.y][n.x] + this.dist(n.x, n.y, o.x, o.y);
                    a < this.cost[o.y][o.x] && (this.cost[o.y][o.x] !== Number.MAX_VALUE && this.pq.remove(o), this.cost[o.y][o.x] = a, this.parents[o.y][o.x] = n, this.pq.push(o))
                }
                e++
            }
            return t
        }
    }, (H = H || {}).math = H.math || {}, H.math.Circle = function(e, t) {
        var n = Math.PI * t * t;
        this.getCenter = function() { return e }, this.getRadius = function() { return t }, this.getSurface = function() { return n }, this.getWorldSurface = function(e, t) { return o(n, e, t) }
    }, H.math.Ellipse = function(e, t, n) {
        var i = Math.PI * t * n;
        this.getCenter = function() { return e }, this.getA = function() { return t }, this.getB = function() { return n }, this.getSurface = function() { return i }, this.getWorldSurface = function(e, t) { return o(i, e, t) }
    }, H.math.Line = function(e, t) {
        var o = t.getX() - e.getX(),
            a = t.getY() - e.getY(),
            n = Math.sqrt(o * o + a * a);
        this.getBegin = function() { return e }, this.getEnd = function() { return t }, this.getDeltaX = function() { return o }, this.getDeltaY = function() { return a }, this.getLength = function() { return n }, this.getWorldLength = function(e, t) {
            var n = null;
            if (null !== e && null !== t) {
                var i = o * e,
                    r = a * t;
                n = Math.sqrt(i * i + r * r)
            }
            return n
        }, this.getMidpoint = function() { return new H.math.Point2D(parseInt((e.getX() + t.getX()) / 2, 10), parseInt((e.getY() + t.getY()) / 2, 10)) }, this.getSlope = function() { return a / o }, this.getIntercept = function() { return (t.getX() * e.getY() - e.getX() * t.getY()) / o }, this.getInclination = function() { return 180 - 180 * Math.atan2(a, o) / Math.PI }
    }, H.math.getAngle = function(e, t) {
        var n = e.getDeltaX(),
            i = e.getDeltaY(),
            r = t.getDeltaX(),
            o = t.getDeltaY(),
            a = n * r + i * o,
            s = n * o - i * r;
        return 360 - (180 - 180 * Math.atan2(s, a) / Math.PI)
    }, H.math.getPerpendicularLine = function(e, t, n) {
        var i = 0,
            r = 0,
            o = 0,
            a = 0;
        if (0 !== e.getSlope()) {
            var s = -1 / e.getSlope(),
                l = t.getY() - s * t.getX(),
                u = n / (2 * Math.sqrt(1 + s * s));
            r = s * (i = t.getX() - u) + l, a = s * (o = t.getX() + u) + l
        } else i = t.getX(), r = t.getY() - n / 2, o = t.getX(), a = t.getY() + n / 2;
        return new H.math.Line(new H.math.Point2D(i, r), new H.math.Point2D(o, a))
    }, H.math.Rectangle = function(e, t) {
        if (t.getX() < e.getX()) {
            var n = e.getX();
            e = new H.math.Point2D(t.getX(), e.getY()), t = new H.math.Point2D(n, t.getY())
        }
        if (t.getY() < e.getY()) {
            var i = e.getY();
            e = new H.math.Point2D(e.getX(), t.getY()), t = new H.math.Point2D(t.getX(), i)
        }
        var r = Math.abs(t.getX() - e.getX()) * Math.abs(t.getY() - e.getY());
        this.getBegin = function() { return e }, this.getEnd = function() { return t }, this.getRealWidth = function() { return t.getX() - e.getX() }, this.getRealHeight = function() { return t.getY() - e.getY() }, this.getWidth = function() { return Math.abs(this.getRealWidth()) }, this.getHeight = function() { return Math.abs(this.getRealHeight()) }, this.getSurface = function() { return r }, this.getWorldSurface = function(e, t) { return o(r, e, t) }
    }, H.math.ROI = function() {
        var t = [];
        this.getPoint = function(e) { return t[e] }, this.getLength = function() { return t.length }, this.addPoint = function(e) { t.push(e) }, this.addPoints = function(e) { t = t.concat(e) }
    }, H.math.Path = function(e, t) { this.pointArray = e ? e.slice() : [], this.controlPointIndexArray = t ? t.slice() : [] }, H.math.Path.prototype.getPoint = function(e) { return this.pointArray[e] }, H.math.Path.prototype.isControlPoint = function(e) { var t = this.pointArray.indexOf(e); if (-1 !== t) return -1 !== this.controlPointIndexArray.indexOf(t); throw new Error("Error: isControlPoint called with not in list point.") }, H.math.Path.prototype.getLength = function() { return this.pointArray.length }, H.math.Path.prototype.addPoint = function(e) { this.pointArray.push(e) }, H.math.Path.prototype.addControlPoint = function(e) {
        var t = this.pointArray.indexOf(e);
        if (-1 === t) throw new Error("Error: addControlPoint called with no point in list point.");
        this.controlPointIndexArray.push(t)
    }, H.math.Path.prototype.addPoints = function(e) { this.pointArray = this.pointArray.concat(e) }, H.math.Path.prototype.appenPath = function(e) {
        var t = this.pointArray.length;
        this.pointArray = this.pointArray.concat(e.pointArray);
        for (var n = [], i = 0; i < e.controlPointIndexArray.length; ++i) n[i] = e.controlPointIndexArray[i] + t;
        this.controlPointIndexArray = this.controlPointIndexArray.concat(n)
    }, (H = H || {}).math = H.math || {}, H.math.getStats = function(e) { for (var t, n, i = e[0], r = i, o = 0, a = 0, s = 0, l = 0; l < e.length; ++l)(s = e[l]) < i ? i = s : r < s && (r = s), o += s, a += s * s; return t = o / e.length, n = a / e.length - t * t, { min: i, max: r, mean: t, stdDev: Math.sqrt(n) } }, H.math.guid = function() { return Math.random().toString(36).substring(2, 15) }, (H = H || {}).math = H.math || {}, H.math.Vector3D = function(e, t, n) { this.getX = function() { return e }, this.getY = function() { return t }, this.getZ = function() { return n } }, H.math.Vector3D.prototype.equals = function(e) { return null !== e && this.getX() === e.getX() && this.getY() === e.getY() && this.getZ() === e.getZ() }, H.math.Vector3D.prototype.toString = function() { return "(" + this.getX() + ", " + this.getY() + ", " + this.getZ() + ")" }, H.math.Vector3D.prototype.norm = function() { return Math.sqrt(this.getX() * this.getX() + this.getY() * this.getY() + this.getZ() * this.getZ()) }, H.math.Vector3D.prototype.crossProduct = function(e) { return new H.math.Vector3D(this.getY() * e.getZ() - e.getY() * this.getZ(), this.getZ() * e.getX() - e.getZ() * this.getX(), this.getX() * e.getY() - e.getX() * this.getY()) }, H.math.Vector3D.prototype.dotProduct = function(e) { return this.getX() * e.getX() + this.getY() * e.getY() + this.getZ() * e.getZ() }, (H = H || {}).tool = H.tool || {};
    T = T || {};
    H.tool.ArrowFactory = function() { this.getNPoints = function() { return 2 }, this.getTimeout = function() { return 0 } }, H.tool.ArrowFactory.prototype.create = function(e, t) {
        var n = new H.math.Line(e[0], e[1]),
            i = new T.Line({ points: [n.getBegin().getX(), n.getBegin().getY(), n.getEnd().getX(), n.getEnd().getY()], stroke: t.getLineColour(), strokeWidth: t.getScaledStrokeWidth(), name: "shape" }),
            r = H.math.getPerpendicularLine(n, e[0], 10),
            o = H.math.getPerpendicularLine(n, e[1], 10);
        i.hitFunc(function(e) { e.beginPath(), e.moveTo(r.getBegin().getX(), r.getBegin().getY()), e.lineTo(r.getEnd().getX(), r.getEnd().getY()), e.lineTo(o.getEnd().getX(), o.getEnd().getY()), e.lineTo(o.getBegin().getX(), o.getBegin().getY()), e.closePath(), e.fillStrokeShape(this) });
        var a = new H.math.Point2D(n.getBegin().getX(), n.getBegin().getY() - 10),
            s = new H.math.Line(n.getBegin(), a),
            l = H.math.getAngle(n, s),
            u = l * Math.PI / 180,
            c = new T.RegularPolygon({ x: n.getBegin().getX() + 5 * Math.sin(u), y: n.getBegin().getY() + 5 * Math.cos(u), sides: 3, radius: 5, rotation: -l, fill: t.getLineColour(), strokeWidth: t.getScaledStrokeWidth(), name: "shape-triangle" }),
            d = new T.Text({ fontSize: t.getScaledFontSize(), fontFamily: t.getFontFamily(), fill: t.getLineColour(), name: "text" });
        d.textExpr = "", d.longText = "", d.quant = null, d.setText(d.textExpr);
        var S = n.getBegin().getX() > n.getEnd().getX() ? 0 : -1,
            x = n.getBegin().getY() > n.getEnd().getY() ? -1 : .5,
            g = new T.Label({ x: n.getEnd().getX() + 25 * S, y: n.getEnd().getY() + 15 * x, name: "label" });
        g.add(d), g.add(new T.Tag);
        var m = new T.Group;
        return m.name("line-group"), m.add(i), m.add(c), m.add(g), m.visible(!0), m
    }, H.tool.UpdateArrow = function(e) {
        var t = e.getParent(),
            n = t.getChildren(function(e) { return "shape" === e.name() })[0],
            i = t.getChildren(function(e) { return "shape-triangle" === e.name() })[0],
            r = t.getChildren(function(e) { return "label" === e.name() })[0],
            o = t.getChildren(function(e) { return "begin" === e.id() })[0],
            a = t.getChildren(function(e) { return "end" === e.id() })[0];
        switch (e.id()) {
            case "begin":
                o.x(e.x()), o.y(e.y());
                break;
            case "end":
                a.x(e.x()), a.y(e.y())
        }
        var s = o.x() - n.x(),
            l = o.y() - n.y(),
            u = a.x() - n.x(),
            c = a.y() - n.y();
        n.points([s, l, u, c]);
        var d = new H.math.Point2D(o.x(), o.y()),
            S = new H.math.Point2D(a.x(), a.y()),
            x = new H.math.Line(d, S),
            g = new H.math.Point2D(s, l),
            m = new H.math.Point2D(u, c),
            h = H.math.getPerpendicularLine(x, g, 10),
            p = H.math.getPerpendicularLine(x, m, 10);
        n.hitFunc(function(e) { e.beginPath(), e.moveTo(h.getBegin().getX(), h.getBegin().getY()), e.lineTo(h.getEnd().getX(), h.getEnd().getY()), e.lineTo(p.getEnd().getX(), p.getEnd().getY()), e.lineTo(p.getBegin().getX(), p.getBegin().getY()), e.closePath(), e.fillStrokeShape(this) });
        var f = new H.math.Point2D(x.getBegin().getX(), x.getBegin().getY() - 10),
            C = new H.math.Line(x.getBegin(), f),
            y = H.math.getAngle(x, C),
            D = y * Math.PI / 180;
        i.x(x.getBegin().getX() + i.radius() * Math.sin(D)), i.y(x.getBegin().getY() + i.radius() * Math.cos(D)), i.rotation(-y);
        var v = r.getText();
        v.quant = null, v.setText(v.textExpr);
        var T = x.getBegin().getX() > x.getEnd().getX() ? 0 : -1,
            L = x.getBegin().getY() > x.getEnd().getY() ? -1 : .5,
            I = { x: x.getEnd().getX() + 25 * T, y: x.getEnd().getY() + 15 * L };
        r.position(I)
    }, (H = H || {}).tool = H.tool || {};
    T = T || {};
    H.tool.Draw = function(d, e) {
        var n = this,
            i = null,
            r = !1;
        this.shapeFactoryList = e;
        var t = null,
            o = null;
        this.shapeName = 0;
        var a = [],
            s = null,
            S = new H.tool.ShapeEditor(d);
        S.setDrawEventCallback(f);
        var x = new T.Group,
            l = new T.Line({ points: [-10, -10, 10, 10], stroke: "red" }),
            u = new T.Line({ points: [10, -10, -10, 10], stroke: "red" });
        x.add(l), x.add(u), this.style = new H.html.Style;
        var c = {},
            g = null;

        function m() { h(!0) }

        function h(e) {
            g.listening(e), g.hitGraphEnabled(e);
            var t = d.getDrawController().getCurrentPosGroup().getChildren();
            e ? (d.addToolCanvasListeners(d.getDrawStage().getContent()), t.forEach(function(e) { n.setShapeOn(e) })) : (d.removeToolCanvasListeners(d.getDrawStage().getContent()), t.forEach(function(e) {
                var t;
                (t = e).off("mouseover"), t.off("mouseout"), t.draggable(!1), t.off("dragstart.draw"), t.off("dragmove.draw"), t.off("dragend.draw"), t.off("dblclick")
            })), g.draw()
        }

        function p(e) { var t = d.getDrawStage(); return { x: t.offset().x + e.x / t.scale().x, y: t.offset().y + e.y / t.scale().y } }

        function f(e) {
            if (void 0 !== c[e.type])
                for (var t = 0; t < c[e.type].length; ++t) c[e.type][t](e)
        }
        this.mousedown = function(e) {
            var t = d.getDrawStage().getIntersection({ x: e._xs, y: e._ys });
            if (t) {
                var n = t.getParent().find(".shape")[0];
                n && n !== S.getShape() && (S.disable(), S.setShape(n), S.setImage(d.getImage()), S.enable())
            } else S.disable(), S.setShape(null), S.setImage(null), r = !0, a = [], s = new H.math.Point2D(e._x, e._y), a.push(s)
        }, this.mousemove = function(e) {
            if (r && (0 < Math.abs(e._x - s.getX()) || 0 < Math.abs(e._y - s.getY()))) {
                s = new H.math.Point2D(e._x, e._y), 1 != a.length && a.pop(), a.push(s);
                var t = new n.shapeFactoryList[n.shapeName];
                a.length < t.getNPoints() && (clearTimeout(this.timer), this.timer = setTimeout(function() { a.push(s) }, t.getTimeout())), o && o.destroy(), (o = t.create(a, n.style, d.getImage())).getChildren(H.draw.isNodeNameShape)[0].listening(!1), g.hitGraphEnabled(!1), g.add(o), g.draw()
            }
        }, this.mouseup = function() {
            if (r && 1 < a.length) {
                o && o.destroy();
                var e = (new n.shapeFactoryList[n.shapeName]).create(a, n.style, d.getImage());
                e.id(H.math.guid()), d.getDrawController().getCurrentPosGroup().add(e), g.hitGraphEnabled(!0), (t = new H.tool.DrawGroupCommand(e, n.shapeName, g)).onExecute = f, t.onUndo = f, t.execute(), d.addToUndoStack(t), n.setShapeOn(e)
            }
            r = !1
        }, this.mouseout = function(e) { n.mouseup(e) }, this.touchstart = function(e) { n.mousedown(e) }, this.touchmove = function(e) { n.mousemove(e) }, this.touchend = function(e) { n.mouseup(e) }, this.keydown = function(e) { d.onKeydown(e) }, this.setup = function() {
            (i = new H.gui.Draw(d)).setup(this.shapeFactoryList)
        }, this.display = function(e) { i && i.display(e), S.disable(), S.setShape(null), S.setImage(null), document.body.style.cursor = "default", d.getDrawStage().listening(e), g = d.getDrawController().getDrawLayer(), h(e), e ? (d.addEventListener("slice-change", m), d.addEventListener("frame-change", m)) : (d.removeEventListener("slice-change", m), d.removeEventListener("frame-change", m)) }, this.setShapeOn = function(s) {
            s.on("mouseover", function() { document.body.style.cursor = "pointer" }), s.on("mouseout", function() { document.body.style.cursor = "default" }), s.draggable(!0);
            var l = { x: s.x(), y: s.y() },
                u = H.tool.GetShapeDisplayName(s.getChildren(H.draw.isNodeNameShape)[0]),
                c = null;
            s.on("dragstart.draw", function() {
                c = s.getChildren(H.draw.isNodeNameShape)[0].stroke();
                var e = d.getDrawStage(),
                    t = e.scale(),
                    n = { x: 1 / t.x, y: 1 / t.y };
                x.x(e.offset().x + 256 / t.x), x.y(e.offset().y + 20 / t.y), x.scale(n), g.add(x), S.setAnchorsActive(!1), g.draw()
            }), s.on("dragmove.draw", function(e) {
                var t = p(H.html.getEventOffset(e.evt)[0]);
                Math.abs(t.x - x.x()) < 10 && Math.abs(t.y - x.y()) < 10 ? (x.getChildren().each(function(e) { e.stroke("orange") }), s.getChildren(H.draw.canNodeChangeColour).forEach(function(e) { e.stroke("red") })) : (x.getChildren().each(function(e) { e.stroke("red") }), s.getChildren(H.draw.canNodeChangeColour).forEach(function(e) { e.stroke(c) })), g.draw()
            }), s.on("dragend.draw", function(e) {
                var t = this.x(),
                    n = this.y();
                x.remove();
                var i = p(H.html.getEventOffset(e.evt)[0]);
                if (Math.abs(i.x - x.x()) < 10 && Math.abs(i.y - x.y()) < 10) {
                    this.x(l.x), this.y(l.y), S.disable(), S.setShape(null), S.setImage(null), s.getChildren(H.draw.canNodeChangeColour).forEach(function(e) { e.stroke(c) }), document.body.style.cursor = "default";
                    var r = new H.tool.DeleteGroupCommand(this, u, g);
                    r.onExecute = f, r.onUndo = f, r.execute(), d.addToUndoStack(r)
                } else {
                    var o = { x: t - l.x, y: n - l.y };
                    if (0 !== o.x || 0 !== o.y) {
                        var a = new H.tool.MoveGroupCommand(this, u, o, g);
                        a.onExecute = f, a.onUndo = f, d.addToUndoStack(a), f({ type: "draw-move" })
                    }
                    S.setAnchorsActive(!0), S.resetAnchors()
                }
                g.draw(), l = { x: this.x(), y: this.y() }
            }), s.on("dblclick", function() {
                var e = this.findOne("Label");
                if (void 0 === e) throw new Error("Could not find the shape label.");
                var t = e.getText(),
                    n = H.gui.prompt("Shape label", t.textExpr);
                null !== n && n !== t.textExpr && (t.textExpr = n, t.setText(H.utils.replaceFlags(t.textExpr, t.quant)), f({ type: "draw-change" }), g.draw())
            })
        }, this.init = function() { var e = 0; for (var t in this.shapeFactoryList) { e = t; break } return this.setShapeName(e), i && (this.style.setScale(d.getWindowScale()), this.setLineColour(this.style.getLineColour()), i.initialise()), !0 }, this.addEventListener = function(e, t) { void 0 === c[e] && (c[e] = []), c[e].push(t) }, this.removeEventListener = function(e, t) {
            if (void 0 !== c[e])
                for (var n = 0; n < c[e].length; ++n) c[e][n] === t && c[e].splice(n, 1)
        }, this.setLineColour = function(e) { this.style.setLineColour(e) }
    }, H.tool.Draw.prototype.getHelp = function() { return { title: H.i18n("tool.Draw.name"), brief: H.i18n("tool.Draw.brief"), mouse: { mouse_drag: H.i18n("tool.Draw.mouse_drag") }, touch: { touch_drag: H.i18n("tool.Draw.touch_drag") } } }, H.tool.Draw.prototype.setShapeName = function(e) {
        if (!this.hasShape(e)) throw new Error("Unknown shape: '" + e + "'");
        this.shapeName = e
    }, H.tool.Draw.prototype.hasShape = function(e) { return this.shapeFactoryList[e] }, (H = H || {}).tool = H.tool || {};
    T = T || {};
    H.tool.GetShapeDisplayName = function(e) { var t = "shape"; return e instanceof T.Line ? t = 4 === e.points().length ? "line" : 6 === e.points().length ? "protractor" : "roi" : e instanceof T.Rect ? t = "rectangle" : e instanceof T.Ellipse && (t = "ellipse"), t }, H.tool.DrawGroupCommand = function(e, t, n, i) {
        var r = void 0 !== i,
            o = e.getParent();
        this.getName = function() { return "Draw-" + t }, this.execute = function() { o.add(e), n.draw(), r || this.onExecute({ type: "draw-create", id: e.id() }) }, this.undo = function() { e.remove(), n.draw(), this.onUndo({ type: "draw-delete", id: e.id() }) }
    }, H.tool.DrawGroupCommand.prototype.onExecute = function() {}, H.tool.DrawGroupCommand.prototype.onUndo = function() {}, H.tool.MoveGroupCommand = function(t, e, n, i) {
        this.getName = function() { return "Move-" + e }, this.execute = function() { t.move(n), i.draw(), this.onExecute({ type: "draw-move", id: t.id() }) }, this.undo = function() {
            var e = { x: -n.x, y: -n.y };
            t.move(e), i.draw(), this.onUndo({ type: "draw-move", id: t.id() })
        }
    }, H.tool.MoveGroupCommand.prototype.onExecute = function() {}, H.tool.MoveGroupCommand.prototype.onUndo = function() {}, H.tool.ChangeGroupCommand = function(e, t, n, i, r, o) { this.getName = function() { return "Change-" + e }, this.execute = function() { t(i, o), r.draw(), this.onExecute({ type: "draw-change" }) }, this.undo = function() { t(n, o), r.draw(), this.onUndo({ type: "draw-change" }) } }, H.tool.ChangeGroupCommand.prototype.onExecute = function() {}, H.tool.ChangeGroupCommand.prototype.onUndo = function() {}, H.tool.DeleteGroupCommand = function(e, t, n) {
        var i = e.getParent();
        this.getName = function() { return "Delete-" + t }, this.execute = function() { e.remove(), n.draw(), this.onExecute({ type: "draw-delete", id: e.id() }) }, this.undo = function() { i.add(e), n.draw(), this.onUndo({ type: "draw-create", id: e.id() }) }
    }, H.tool.DeleteGroupCommand.prototype.onExecute = function() {}, H.tool.DeleteGroupCommand.prototype.onUndo = function() {}, (H = H || {}).tool = H.tool || {};
    T = T || {};
    H.tool.ShapeEditor = function(o) {
        var m = null,
            a = null,
            e = !1,
            h = null,
            s = null;

        function n(e) { m && m.getParent() && m.getParent().find(".anchor").each(e) }

        function t(t) { n(function(e) { e.visible(t) }) }

        function i() { n(function(e) { e.remove() }) }

        function r() {
            if (m && m.getLayer()) {
                var e = m.getParent();
                if (m instanceof T.Line) {
                    var t = m.points();
                    if (4 === t.length || 6 === t.length) {
                        var n = t[0] + m.x(),
                            i = t[1] + m.y(),
                            r = t[2] + m.x(),
                            o = t[3] + m.y();
                        if (p(e, n, i, "begin"), 4 === t.length) {
                            var a = e.getChildren(H.draw.isNodeNameShapeExtra);
                            h = 2 === a.length ? H.tool.UpdateRuler : H.tool.UpdateArrow, p(e, r, o, "end")
                        } else { h = H.tool.UpdateProtractor, p(e, r, o, "mid"), p(e, t[4] + m.x(), t[5] + m.y(), "end") }
                    } else { h = H.tool.UpdateRoi; for (var s = 0; s < t.length; s += 2) p(e, t[s] + m.x(), t[s + 1] + m.y(), s) }
                } else if (m instanceof T.Rect) {
                    h = H.tool.UpdateRect;
                    var l = m.x(),
                        u = m.y(),
                        c = m.width(),
                        d = m.height();
                    p(e, l, u, "topLeft"), p(e, l + c, u, "topRight"), p(e, l + c, u + d, "bottomRight"), p(e, l, u + d, "bottomLeft")
                } else if (m instanceof T.Ellipse) {
                    h = H.tool.UpdateEllipse;
                    var S = m.x(),
                        x = m.y(),
                        g = m.radius();
                    p(e, S - g.x, x - g.y, "topLeft"), p(e, S + g.x, x - g.y, "topRight"), p(e, S + g.x, x + g.y, "bottomRight"), p(e, S - g.x, x + g.y, "bottomLeft")
                }
            }
        }

        function p(e, t, n, i) {
            var r = new T.Circle({ x: t, y: n, stroke: "#999", fill: "rgba(100,100,100,0.7", strokeWidth: o.getStyle().getScaledStrokeWidth() / o.getScale(), radius: o.getStyle().scale(6) / o.getScale(), name: "anchor", id: i, dragOnTop: !1, draggable: !0, visible: !1 });
            u(r), e.add(r)
        }

        function l(e) {
            var t = e.getParent(),
                n = e.id(),
                i = e.x(),
                r = e.y(),
                o = { getParent: function() { return t }, id: function() { return n }, x: function() { return i }, y: function() { return r } };
            return o
        }

        function u(e) {
            var i = null,
                r = H.tool.GetShapeDisplayName(m);
            e.on("dragstart.edit", function(e) { i = l(this), e.cancelBubble = !0 }), e.on("dragmove.edit", function(e) { h && h(this, a), this.getLayer() ? this.getLayer().draw() : console.warn("No layer to draw the anchor!"), e.cancelBubble = !0 }), e.on("dragend.edit", function(e) {
                var t = l(this),
                    n = new H.tool.ChangeGroupCommand(r, h, i, t, this.getLayer(), a);
                n.onExecute = s, n.onUndo = s, n.execute(), o.addToUndoStack(n), i = t, e.cancelBubble = !0
            }), e.on("mousedown touchstart", function() { this.moveToTop() }), e.on("mouseover.edit", function() { this.stroke("#ddd"), this.getLayer() ? this.getLayer().draw() : console.warn("No layer to draw the anchor!") }), e.on("mouseout.edit", function() { this.stroke("#999"), this.getLayer() ? this.getLayer().draw() : console.warn("No layer to draw the anchor!") })
        }
        this.setShape = function(e) {
            (m = e) && (i(), r())
        }, this.setImage = function(e) { a = e }, this.getShape = function() { return m }, this.isActive = function() { return e }, this.setDrawEventCallback = function(e) { s = e }, this.enable = function() { e = !0, m && (t(!0), m.getLayer() && m.getLayer().draw()) }, this.disable = function() { e = !1, m && (t(!1), m.getLayer() && m.getLayer().draw()) }, this.resetAnchors = function() { i(), r(), t(!0) }, this.setAnchorsActive = function(e) {
            n(e ? function(e) { u(e) } : function(e) {
                var t;
                (t = e).off("dragstart.edit"), t.off("dragmove.edit"), t.off("dragend.edit"), t.off("mousedown touchstart"), t.off("mouseover.edit"), t.off("mouseout.edit")
            })
        }
    }, (H = H || {}).tool = H.tool || {};
    T = T || {};
    H.tool.EllipseFactory = function() { this.getNPoints = function() { return 2 }, this.getTimeout = function() { return 0 } }, H.tool.EllipseFactory.prototype.create = function(e, t, n) {
        var i = Math.abs(e[0].getX() - e[1].getX()),
            r = Math.abs(e[0].getY() - e[1].getY()),
            o = new H.math.Ellipse(e[0], i, r),
            a = new T.Ellipse({ x: o.getCenter().getX(), y: o.getCenter().getY(), radius: { x: o.getA(), y: o.getB() }, stroke: t.getLineColour(), strokeWidth: t.getScaledStrokeWidth(), name: "shape" }),
            s = n.quantifyEllipse(o),
            l = new T.Text({ fontSize: t.getScaledFontSize(), fontFamily: t.getFontFamily(), fill: t.getLineColour(), name: "text" });
        l.textExpr = "{surface}", l.longText = "", l.quant = s, l.setText(H.utils.replaceFlags(l.textExpr, l.quant));
        var u = new T.Label({ x: o.getCenter().getX(), y: o.getCenter().getY(), name: "label" });
        u.add(l), u.add(new T.Tag);
        var c = new T.Group;
        return c.name("ellipse-group"), c.add(a), c.add(u), c.visible(!0), c
    }, H.tool.UpdateEllipse = function(e, t) {
        var n = e.getParent(),
            i = n.getChildren(function(e) { return "shape" === e.name() })[0],
            r = n.getChildren(function(e) { return "label" === e.name() })[0],
            o = n.getChildren(function(e) { return "topLeft" === e.id() })[0],
            a = n.getChildren(function(e) { return "topRight" === e.id() })[0],
            s = n.getChildren(function(e) { return "bottomRight" === e.id() })[0],
            l = n.getChildren(function(e) { return "bottomLeft" === e.id() })[0];
        switch (e.id()) {
            case "topLeft":
                o.x(e.x()), o.y(e.y()), a.y(e.y()), l.x(e.x());
                break;
            case "topRight":
                a.x(e.x()), a.y(e.y()), o.y(e.y()), s.x(e.x());
                break;
            case "bottomRight":
                s.x(e.x()), s.y(e.y()), l.y(e.y()), a.x(e.x());
                break;
            case "bottomLeft":
                l.x(e.x()), l.y(e.y()), s.y(e.y()), o.x(e.x());
                break;
            default:
                console.error("Unhandled anchor id: " + e.id())
        }
        var u = (a.x() - o.x()) / 2,
            c = (s.y() - a.y()) / 2,
            d = { x: o.x() + u, y: a.y() + c };
        i.position(d);
        var S = { x: Math.abs(u), y: Math.abs(c) };
        i.radius(S);
        var x = new H.math.Ellipse(d, S.x, S.y),
            g = t.quantifyEllipse(x),
            m = r.getText();
        m.quant = g, m.setText(H.utils.replaceFlags(m.textExpr, m.quant));
        var h = { x: d.x, y: d.y };
        r.position(h)
    }, (H = H || {}).tool = H.tool || {}, H.tool.filter = H.tool.filter || {}, H.tool.Filter = function(e, t) {
        var n = null;
        this.filterList = e, this.selectedFilter = 0, this.defaultFilterName = 0, this.displayed = !1;
        var i = new H.utils.ListenerHandler;

        function r(e) { i.fireEvent(e) } this.setup = function() {
            if (0 !== Object.keys(this.filterList).length)
                for (var e in (n = new H.gui.Filter(t)).setup(this.filterList), this.filterList) this.filterList[e].setup(), this.filterList[e].addEventListener("filter-run", r), this.filterList[e].addEventListener("filter-undo", r)
        }, this.display = function(e) { n && n.display(e), this.displayed = e, this.selectedFilter.display(e) }, this.init = function() { for (var e in this.filterList) { this.defaultFilterName = e; break } for (e in this.setSelectedFilter(this.defaultFilterName), this.filterList) this.filterList[e].init(); return n && n.initialise(), !0 }, this.keydown = function(e) { t.onKeydown(e) }, this.addEventListener = function(e, t) { i.add(e, t) }, this.removeEventListener = function(e, t) { i.remove(e, t) }
    }, H.tool.Filter.prototype.getHelp = function() { return { title: H.i18n("tool.Filter.name"), brief: H.i18n("tool.Filter.brief") } }, H.tool.Filter.prototype.getSelectedFilter = function() { return this.selectedFilter }, H.tool.Filter.prototype.setSelectedFilter = function(e) {
        if (!this.hasFilter(e)) throw new Error("Unknown filter: '" + e + "'");
        this.displayed && this.selectedFilter.display(!1), this.selectedFilter = this.filterList[e], this.displayed && this.selectedFilter.display(!0)
    }, H.tool.Filter.prototype.getFilterList = function() { return this.filterList }, H.tool.Filter.prototype.hasFilter = function(e) { return this.filterList[e] }, H.tool.filter.Threshold = function(n) {
        var i = new H.image.filter.Threshold,
            t = new H.gui.Threshold(n),
            r = !0,
            o = new H.utils.ListenerHandler;

        function a(e) { o.fireEvent(e) } this.setup = function() { t.setup() }, this.display = function(e) { t.display(e), e && (r = !0) }, this.init = function() { t.initialise() }, this.run = function(e) {
            i.setMin(e.min), i.setMax(e.max), r && (i.setOriginalImage(n.getImage()), r = !1);
            var t = new H.tool.RunFilterCommand(i, n);
            t.onExecute = a, t.onUndo = a, t.execute(), n.addToUndoStack(t)
        }, this.addEventListener = function(e, t) { o.add(e, t) }, this.removeEventListener = function(e, t) { o.remove(e, t) }
    }, H.tool.filter.Sharpen = function(n) {
        var t = new H.gui.Sharpen(n),
            i = new H.utils.ListenerHandler;

        function r(e) { i.fireEvent(e) } this.setup = function() { t.setup() }, this.display = function(e) { t.display(e) }, this.init = function() {}, this.run = function() {
            var e = new H.image.filter.Sharpen;
            e.setOriginalImage(n.getImage());
            var t = new H.tool.RunFilterCommand(e, n);
            t.onExecute = r, t.onUndo = r, t.execute(), n.addToUndoStack(t)
        }, this.addEventListener = function(e, t) { i.add(e, t) }, this.removeEventListener = function(e, t) { i.remove(e, t) }
    }, H.tool.filter.Sobel = function(n) {
        var t = new H.gui.Sobel(n),
            i = new H.utils.ListenerHandler;

        function r(e) { i.fireEvent(e) } this.setup = function() { t.setup() }, this.display = function(e) { t.display(e) }, this.init = function() {}, H.tool.filter.Sobel.prototype.run = function() {
            var e = new H.image.filter.Sobel;
            e.setOriginalImage(n.getImage());
            var t = new H.tool.RunFilterCommand(e, n);
            t.onExecute = r, t.onUndo = r, t.execute(), n.addToUndoStack(t)
        }, this.addEventListener = function(e, t) { i.add(e, t) }, this.removeEventListener = function(e, t) { i.remove(e, t) }
    }, H.tool.RunFilterCommand = function(e, t) { this.getName = function() { return "Filter-" + e.getName() }, this.execute = function() { t.setImage(e.update()), t.render(), this.onExecute({ type: "filter-run", id: this.getName() }) }, this.undo = function() { t.setImage(e.getOriginalImage()), t.render(), this.onUndo({ type: "filter-undo", id: this.getName() }) } }, H.tool.RunFilterCommand.prototype.onExecute = function() {}, H.tool.RunFilterCommand.prototype.onUndo = function() {}, (H = H || {}).tool = H.tool || {};
    f = f || {};
    H.tool.Floodfill = function(l) {
        var s = null,
            u = null,
            c = null,
            o = this;
        this.started = !1;
        var d, e, t = null,
            i = null,
            S = null,
            a = null,
            x = [],
            n = !1;
        this.style = new H.html.Style;
        var r = [];
        this.setExtend = function(e) { n = e }, this.getExtend = function() { return n };
        var g = function(e) { return { x: e._x, y: e._y } },
            m = function(e, t, n) {
                x = [];
                var i = { data: s.data, width: s.width, height: s.height, bytes: 4 };
                u = f.floodFill(i, e.x, e.y, t), u = f.gaussBlurOnlyBorder(u, 5);
                var r = f.traceContours(u);
                if (0 < (r = f.simplifyContours(r, 0, 2e3)).length && r[0].points[0].x) { if (n) return r[0].points; for (var o = 0, a = r[0].points.length; o < a; o++) x.push(new H.math.Point2D(r[0].points[o].x, r[0].points[o].y)); return x }
                return !1
            },
            h = function(e, t) { if (a = m(e, t)) { var n = new H.tool.RoiFactory; return (S = n.create(a, o.style)).id(H.math.guid()), l.getDrawController().getCurrentPosGroup().add(S), (i = new H.tool.DrawGroupCommand(S, "floodfill", l.getDrawController().getDrawLayer())).onExecute = p, i.onUndo = p, i.execute(), l.addToUndoStack(i), !0 } return !1 };

        function p(e) { for (var t = 0; t < r.length; ++t) r[t](e) } this.extend = function(e, t) {
            if (!d) throw "'initialpoint' not found. User must click before use extend!";
            S && S.destroy();
            for (var n = l.getViewController().getCurrentPosition(), i = c || 10, r = n.k, o = t || l.getImage().getGeometry().getSize().getNumberOfSlices(); r < o && h(d, i); r++) l.getViewController().incrementSliceNb();
            l.getViewController().setCurrentPosition(n);
            for (var a = n.k, s = e || 0; s < a && h(d, i); a--) l.getViewController().decrementSliceNb();
            l.getViewController().setCurrentPosition(n)
        }, this.modifyThreshold = function(i, r) {
            if (r || !S) throw "No shape found";
            r = S.getChildren(function(e) { return "shape" === e.name() })[0], clearTimeout(e), e = setTimeout(function() {
                if (!(a = m(d, i, !0))) return !1;
                for (var e = [], t = 0, n = a.length; t < n; ++t) e.push(a[t].x), e.push(a[t].y);
                r.setPoints(e), r.getLayer().draw(), o.onThresholdChange(i)
            }, 100)
        }, this.onThresholdChange = function() {}, this.mousedown = function(e) {
            if (!(s = l.getImageData())) return console.error("No image found");
            o.started = !0, d = g(e), h(d, 10), o.onThresholdChange(10)
        }, this.mousemove = function(e) {
            if (o.started) {
                var t = g(e);
                c = (c = Math.round(Math.sqrt(Math.pow(d.x - t.x, 2) + Math.pow(d.y - t.y, 2)) / 2)) < 10 ? 10 : c - 10, o.modifyThreshold(c)
            }
        }, this.mouseup = function() { o.started = !1, n && o.extend() }, this.mouseout = function() { o.mouseup() }, this.touchstart = function(e) { o.mousedown(e) }, this.touchmove = function(e) { o.mousemove(e) }, this.touchend = function() { o.mouseup() }, this.keydown = function(e) { l.onKeydown(e) }, this.setup = function() {
            (t = new H.gui.ColourTool(l, "ff")).setup()
        }, this.display = function(e) { t && t.display(e), this.init() }, this.init = function() { return t && (this.style.setScale(l.getWindowScale()), this.setLineColour(this.style.getLineColour()), t.initialise()), !0 }, this.addEventListener = function(e) { r.push(e) }, this.removeEventListener = function(e) { for (var t = 0; t < r.length; ++t) r[t] === e && r.splice(t, 1) }
    }, H.tool.Floodfill.prototype.getHelp = function() { return { title: H.i18n("tool.Floodfill.name"), brief: H.i18n("tool.Floodfill.brief"), mouse: { click: H.i18n("tool.Floodfill.click") }, touch: { tap: H.i18n("tool.Floodfill.tap") } } }, H.tool.Floodfill.prototype.setLineColour = function(e) { this.style.setLineColour(e) }, (H = H || {}).tool = H.tool || {};
    T = T || {};
    H.tool.FreeHandFactory = function() { this.getNPoints = function() { return 1e3 }, this.getTimeout = function() { return 25 } }, H.tool.FreeHandFactory.prototype.create = function(e, t) {
        for (var n = [], i = 0; i < e.length; ++i) n.push(e[i].getX()), n.push(e[i].getY());
        var r = new T.Line({ points: n, stroke: t.getLineColour(), strokeWidth: t.getScaledStrokeWidth(), name: "shape", tension: .5 }),
            o = new T.Text({ fontSize: t.getScaledFontSize(), fontFamily: t.getFontFamily(), fill: t.getLineColour(), name: "text" });
        o.textExpr = "", o.longText = "", o.quant = null, o.setText(o.textExpr);
        var a = new T.Label({ x: e[0].getX(), y: e[0].getY() + 10, name: "label" });
        a.add(o), a.add(new T.Tag);
        var s = new T.Group;
        return s.name("freeHand-group"), s.add(r), s.add(a), s.visible(!0), s
    }, H.tool.UpdateFreeHand = function(t) {
        var e = t.getParent(),
            n = e.getChildren(function(e) { return "shape" === e.name() })[0],
            i = e.getChildren(function(e) { return "label" === e.name() })[0],
            r = e.getChildren(function(e) { return e.id() === t.id() })[0];
        r.x(t.x()), r.y(t.y());
        var o = n.points();
        o[t.id()] = t.x() - n.x(), o[t.id() + 1] = t.y() - n.y(), n.points(o);
        var a = i.getText();
        a.quant = null, a.setText(H.utils.replaceFlags(a.textExpr, a.quant));
        var s = { x: o[0] + n.x(), y: o[1] + n.y() + 10 };
        i.position(s)
    }, (H = H || {}).tool = H.tool || {}, H.tool.Livewire = function(l) {
        var u = this,
            n = null;
        this.started = !1;
        var c = null,
            d = null;
        this.style = new H.html.Style, this.style.setScale(l.getWindowScale());
        var S = new H.math.Path,
            x = new H.math.Path,
            g = [],
            i = [];

        function r() { for (var e = l.getImage().getGeometry().getSize().getNumberOfRows(), t = 0; t < e; ++t) g[t] = [] }
        var m = new H.math.Scissors;

        function o(e) { for (var t = 0; t < i.length; ++t) i[t](e) } this.mousedown = function(e) {
            if (u.started)
                if (Math.abs(e._x - u.x0) < 5 && Math.abs(e._y - u.y0) < 5) u.mousemove(e), c.onExecute = o, c.onUndo = o, console.log("Done."), l.addToUndoStack(c), u.started = !1;
                else {
                    S = x, r();
                    var t = new H.math.FastPoint2D(e._x, e._y);
                    m.doTraining(t), S.addControlPoint(x.getPoint(0))
                }
            else {
                u.started = !0, u.x0 = e._x, u.y0 = e._y, S = new H.math.Path, x = new H.math.Path, r();
                var n = new H.math.FastPoint2D(e._x, e._y);
                m.doTraining(n);
                var i = new H.math.Point2D(e._x, e._y);
                S.addPoint(i), S.addControlPoint(i)
            }
        }, this.mousemove = function(e) {
            if (u.started) {
                var t = new H.math.FastPoint2D(e._x, e._y);
                m.setPoint(t);
                for (var n = 0, i = !1; !g[t.y][t.x] && !i;)
                    if (console.log("Getting ready..."), 0 === (n = m.doWork()).length) i = !0;
                    else
                        for (var r = 0; r < n.length - 1; r += 2) {
                            var o = n[r],
                                a = n[r + 1];
                            g[o.y][o.x] = a
                        }
                for (console.log("Ready!"), x = new H.math.Path, i = !1; t && !i;) x.addPoint(new H.math.Point2D(t.x, t.y)), g[t.y] && g[t.y][t.x] ? t = g[t.y][t.x] : i = !0;
                x.appenPath(S), d && d.destroy();
                var s = new H.tool.RoiFactory;
                (d = s.create(x.pointArray, u.style)).id(H.math.guid()), l.getDrawController().getCurrentPosGroup().add(d), (c = new H.tool.DrawGroupCommand(d, "livewire", l.getDrawController().getDrawLayer())).execute()
            }
        }, this.mouseup = function() {}, this.mouseout = function(e) { u.mouseup(e) }, this.dblclick = function() { console.log("dblclick"), l.addToUndoStack(c), u.started = !1 }, this.touchstart = function(e) { u.mousedown(e) }, this.touchmove = function(e) { u.mousemove(e) }, this.touchend = function(e) { u.mouseup(e) }, this.keydown = function(e) { l.onKeydown(e) }, this.setup = function() {
            (n = new H.gui.ColourTool(l, "lw")).setup()
        }, this.display = function(e) {
            if (n && n.display(e), e) {
                var t = l.getImage().getGeometry().getSize();
                m.setDimensions(t.getNumberOfColumns(), t.getNumberOfRows()), m.setData(l.getImageData().data)
            }
        }, this.init = function() { return n && (this.style.setScale(l.getWindowScale()), this.setLineColour(this.style.getLineColour()), n.initialise()), !0 }, this.addEventListener = function(e) { i.push(e) }, this.removeEventListener = function(e) { for (var t = 0; t < i.length; ++t) i[t] === e && i.splice(t, 1) }
    }, H.tool.Livewire.prototype.getHelp = function() { return { title: H.i18n("tool.Livewire.name"), brief: H.i18n("tool.Livewire.brief") } }, H.tool.Livewire.prototype.setLineColour = function(e) { this.style.setLineColour(e) }, (H = H || {}).tool = H.tool || {};
    T = T || {};
    H.tool.ProtractorFactory = function() { this.getNPoints = function() { return 3 }, this.getTimeout = function() { return 500 } }, H.tool.ProtractorFactory.prototype.create = function(t, e) {
        for (var n = new H.math.Line(t[0], t[1]), i = [], r = 0; r < t.length; ++r) i.push(t[r].getX()), i.push(t[r].getY());
        var o = new T.Line({ points: i, stroke: e.getLineColour(), strokeWidth: e.getScaledStrokeWidth(), name: "shape" }),
            a = new T.Group;
        if (a.name("protractor-group"), a.add(o), a.visible(!0), 3 === t.length) {
            var s = new H.math.Line(t[1], t[2]);
            o.hitFunc(function(e) { e.beginPath(), e.moveTo(t[0].getX(), t[0].getY()), e.lineTo(t[1].getX(), t[1].getY()), e.lineTo(t[2].getX(), t[2].getY()), e.closePath(), e.fillStrokeShape(this) });
            var l = H.math.getAngle(n, s),
                u = n.getInclination();
            180 < l && (u += l = 360 - l);
            var c = { angle: { value: l, unit: H.i18n("unit.degree") } },
                d = new T.Text({ fontSize: e.getScaledFontSize(), fontFamily: e.getFontFamily(), fill: e.getLineColour(), name: "text" });
            d.textExpr = "{angle}", d.longText = "", d.quant = c, d.setText(H.utils.replaceFlags(d.textExpr, d.quant));
            var S = (n.getMidpoint().getX() + s.getMidpoint().getX()) / 2,
                x = (n.getMidpoint().getY() + s.getMidpoint().getY()) / 2,
                g = new T.Label({ x: S, y: x - 15, name: "label" });
            g.add(d), g.add(new T.Tag);
            var m = 33 * Math.min(n.getLength(), s.getLength()) / 100,
                h = new T.Arc({ innerRadius: m, outerRadius: m, stroke: e.getLineColour(), strokeWidth: e.getScaledStrokeWidth(), angle: l, rotation: -u, x: t[1].getX(), y: t[1].getY(), name: "shape-arc" });
            a.add(g), a.add(h)
        }
        return a
    }, H.tool.UpdateProtractor = function(e) {
        var t = e.getParent(),
            n = t.getChildren(function(e) { return "shape" === e.name() })[0],
            i = t.getChildren(function(e) { return "label" === e.name() })[0],
            r = t.getChildren(function(e) { return "shape-arc" === e.name() })[0],
            o = t.getChildren(function(e) { return "begin" === e.id() })[0],
            a = t.getChildren(function(e) { return "mid" === e.id() })[0],
            s = t.getChildren(function(e) { return "end" === e.id() })[0];
        switch (e.id()) {
            case "begin":
                o.x(e.x()), o.y(e.y());
                break;
            case "mid":
                a.x(e.x()), a.y(e.y());
                break;
            case "end":
                s.x(e.x()), s.y(e.y())
        }
        var l = o.x() - n.x(),
            u = o.y() - n.y(),
            c = a.x() - n.x(),
            d = a.y() - n.y(),
            S = s.x() - n.x(),
            x = s.y() - n.y();
        n.points([l, u, c, d, S, x]), n.hitFunc(function(e) { e.beginPath(), e.moveTo(l, u), e.lineTo(c, d), e.lineTo(S, x), e.closePath(), e.fillStrokeShape(this) });
        var g = new H.math.Point2D(o.x(), o.y()),
            m = new H.math.Point2D(a.x(), a.y()),
            h = new H.math.Point2D(s.x(), s.y()),
            p = new H.math.Line(g, m),
            f = new H.math.Line(m, h),
            C = H.math.getAngle(p, f),
            y = p.getInclination();
        180 < C && (y += C = 360 - C);
        var D = { angle: { value: C, unit: H.i18n("unit.degree") } },
            v = i.getText();
        v.quant = D, v.setText(H.utils.replaceFlags(v.textExpr, v.quant));
        var T = { x: (p.getMidpoint().getX() + f.getMidpoint().getX()) / 2, y: (p.getMidpoint().getY() + f.getMidpoint().getY()) / 2 - 15 };
        i.position(T);
        var L = 33 * Math.min(p.getLength(), f.getLength()) / 100;
        r.innerRadius(L), r.outerRadius(L), r.angle(C), r.rotation(-y);
        var I = { x: a.x(), y: a.y() };
        r.position(I)
    }, (H = H || {}).tool = H.tool || {};
    T = T || {};
    H.tool.RectangleFactory = function() { this.getNPoints = function() { return 2 }, this.getTimeout = function() { return 0 } }, H.tool.RectangleFactory.prototype.create = function(e, t, n) {
        var i = new H.math.Rectangle(e[0], e[1]),
            r = new T.Rect({ x: i.getBegin().getX(), y: i.getBegin().getY(), width: i.getWidth(), height: i.getHeight(), stroke: t.getLineColour(), strokeWidth: t.getScaledStrokeWidth(), name: "shape" }),
            o = n.quantifyRect(i),
            a = new T.Text({ fontSize: t.getScaledFontSize(), fontFamily: t.getFontFamily(), fill: t.getLineColour(), name: "text" });
        a.textExpr = "{surface}", a.longText = "", a.quant = o, a.setText(H.utils.replaceFlags(a.textExpr, a.quant));
        var s = new T.Label({ x: i.getBegin().getX(), y: i.getEnd().getY() + 10, name: "label" });
        s.add(a), s.add(new T.Tag);
        var l = new T.Group;
        return l.name("rectangle-group"), l.add(r), l.add(s), l.visible(!0), l
    }, H.tool.UpdateRect = function(e, t) {
        var n = e.getParent(),
            i = n.getChildren(function(e) { return "shape" === e.name() })[0],
            r = n.getChildren(function(e) { return "label" === e.name() })[0],
            o = n.getChildren(function(e) { return "topLeft" === e.id() })[0],
            a = n.getChildren(function(e) { return "topRight" === e.id() })[0],
            s = n.getChildren(function(e) { return "bottomRight" === e.id() })[0],
            l = n.getChildren(function(e) { return "bottomLeft" === e.id() })[0];
        switch (e.id()) {
            case "topLeft":
                o.x(e.x()), o.y(e.y()), a.y(e.y()), l.x(e.x());
                break;
            case "topRight":
                a.x(e.x()), a.y(e.y()), o.y(e.y()), s.x(e.x());
                break;
            case "bottomRight":
                s.x(e.x()), s.y(e.y()), l.y(e.y()), a.x(e.x());
                break;
            case "bottomLeft":
                l.x(e.x()), l.y(e.y()), s.y(e.y()), o.x(e.x());
                break;
            default:
                console.error("Unhandled anchor id: " + e.id())
        }
        i.position(o.position());
        var u = a.x() - o.x(),
            c = l.y() - o.y();
        u && c && i.size({ width: u, height: c });
        var d = new H.math.Point2D(o.x(), o.y()),
            S = new H.math.Point2D(s.x(), s.y()),
            x = new H.math.Rectangle(d, S),
            g = t.quantifyRect(x),
            m = r.getText();
        m.quant = g, m.setText(H.utils.replaceFlags(m.textExpr, m.quant));
        var h = { x: x.getBegin().getX(), y: x.getEnd().getY() + 10 };
        r.position(h)
    }, (H = H || {}).tool = H.tool || {};
    T = T || {};
    H.tool.RoiFactory = function() { this.getNPoints = function() { return 50 }, this.getTimeout = function() { return 100 } }, H.tool.RoiFactory.prototype.create = function(e, t) {
        var n = new H.math.ROI;
        n.addPoints(e);
        for (var i = [], r = 0; r < n.getLength(); ++r) i.push(n.getPoint(r).getX()), i.push(n.getPoint(r).getY());
        var o = new T.Line({ points: i, stroke: t.getLineColour(), strokeWidth: t.getScaledStrokeWidth(), name: "shape", closed: !0 }),
            a = new T.Text({ fontSize: t.getScaledFontSize(), fontFamily: t.getFontFamily(), fill: t.getLineColour(), name: "text" });
        a.textExpr = "", a.longText = "", a.quant = null, a.setText(H.utils.replaceFlags(a.textExpr, a.quant));
        var s = new T.Label({ x: n.getPoint(0).getX(), y: n.getPoint(0).getY() + 10, name: "label" });
        s.add(a), s.add(new T.Tag);
        var l = new T.Group;
        return l.name("roi-group"), l.add(o), l.add(s), l.visible(!0), l
    }, H.tool.UpdateRoi = function(t) {
        var e = t.getParent(),
            n = e.getChildren(function(e) { return "shape" === e.name() })[0],
            i = e.getChildren(function(e) { return "label" === e.name() })[0],
            r = e.getChildren(function(e) { return e.id() === t.id() })[0];
        r.x(t.x()), r.y(t.y());
        var o = n.points();
        o[t.id()] = t.x() - n.x(), o[t.id() + 1] = t.y() - n.y(), n.points(o);
        var a = i.getText();
        a.quant = null, a.setText(H.utils.replaceFlags(a.textExpr, a.quant));
        var s = { x: o[0] + n.x(), y: o[1] + n.y() + 10 };
        i.position(s)
    }, (H = H || {}).tool = H.tool || {};
    T = T || {};
    H.tool.RulerFactory = function() { this.getNPoints = function() { return 2 }, this.getTimeout = function() { return 0 } }, H.tool.RulerFactory.prototype.create = function(e, t, n) {
        var i = new H.math.Line(e[0], e[1]),
            r = new T.Line({ points: [i.getBegin().getX(), i.getBegin().getY(), i.getEnd().getX(), i.getEnd().getY()], stroke: t.getLineColour(), strokeWidth: t.getScaledStrokeWidth(), name: "shape" }),
            o = H.math.getPerpendicularLine(i, e[0], 10),
            a = new T.Line({ points: [o.getBegin().getX(), o.getBegin().getY(), o.getEnd().getX(), o.getEnd().getY()], stroke: t.getLineColour(), strokeWidth: t.getScaledStrokeWidth(), name: "shape-tick0" }),
            s = H.math.getPerpendicularLine(i, e[1], 10),
            l = new T.Line({ points: [s.getBegin().getX(), s.getBegin().getY(), s.getEnd().getX(), s.getEnd().getY()], stroke: t.getLineColour(), strokeWidth: t.getScaledStrokeWidth(), name: "shape-tick1" });
        r.hitFunc(function(e) { e.beginPath(), e.moveTo(o.getBegin().getX(), o.getBegin().getY()), e.lineTo(o.getEnd().getX(), o.getEnd().getY()), e.lineTo(s.getEnd().getX(), s.getEnd().getY()), e.lineTo(s.getBegin().getX(), s.getBegin().getY()), e.closePath(), e.fillStrokeShape(this) });
        var u = n.quantifyLine(i),
            c = new T.Text({ fontSize: t.getScaledFontSize(), fontFamily: t.getFontFamily(), fill: t.getLineColour(), name: "text" });
        c.textExpr = "{length}", c.longText = "", c.quant = u, c.setText(H.utils.replaceFlags(c.textExpr, c.quant));
        var d = i.getBegin().getX() > i.getEnd().getX() ? 0 : -1,
            S = i.getBegin().getY() > i.getEnd().getY() ? -1 : .5,
            x = new T.Label({ x: i.getEnd().getX() + 25 * d, y: i.getEnd().getY() + 15 * S, name: "label" });
        x.add(c), x.add(new T.Tag);
        var g = new T.Group;
        return g.name("ruler-group"), g.add(r), g.add(a), g.add(l), g.add(x), g.visible(!0), g
    }, H.tool.UpdateRuler = function(e, t) {
        var n = e.getParent(),
            i = n.getChildren(function(e) { return "shape" === e.name() })[0],
            r = n.getChildren(function(e) { return "shape-tick0" === e.name() })[0],
            o = n.getChildren(function(e) { return "shape-tick1" === e.name() })[0],
            a = n.getChildren(function(e) { return "label" === e.name() })[0],
            s = n.getChildren(function(e) { return "begin" === e.id() })[0],
            l = n.getChildren(function(e) { return "end" === e.id() })[0];
        switch (e.id()) {
            case "begin":
                s.x(e.x()), s.y(e.y());
                break;
            case "end":
                l.x(e.x()), l.y(e.y())
        }
        var u = s.x() - i.x(),
            c = s.y() - i.y(),
            d = l.x() - i.x(),
            S = l.y() - i.y();
        i.points([u, c, d, S]);
        var x = new H.math.Point2D(s.x(), s.y()),
            g = new H.math.Point2D(l.x(), l.y()),
            m = new H.math.Line(x, g),
            h = new H.math.Point2D(u, c),
            p = new H.math.Point2D(d, S),
            f = H.math.getPerpendicularLine(m, h, 10);
        r.points([f.getBegin().getX(), f.getBegin().getY(), f.getEnd().getX(), f.getEnd().getY()]);
        var C = H.math.getPerpendicularLine(m, p, 10);
        o.points([C.getBegin().getX(), C.getBegin().getY(), C.getEnd().getX(), C.getEnd().getY()]), i.hitFunc(function(e) { e.beginPath(), e.moveTo(f.getBegin().getX(), f.getBegin().getY()), e.lineTo(f.getEnd().getX(), f.getEnd().getY()), e.lineTo(C.getEnd().getX(), C.getEnd().getY()), e.lineTo(C.getBegin().getX(), C.getBegin().getY()), e.closePath(), e.fillStrokeShape(this) });
        var y = t.quantifyLine(m),
            D = a.getText();
        D.quant = y, D.setText(H.utils.replaceFlags(D.textExpr, D.quant));
        var v = m.getBegin().getX() > m.getEnd().getX() ? 0 : -1,
            T = m.getBegin().getY() > m.getEnd().getY() ? -1 : .5,
            L = { x: m.getEnd().getX() + 25 * v, y: m.getEnd().getY() + 15 * T };
        a.position(L)
    }, (H = H || {}).tool = H.tool || {}, H.tool.Scroll = function(o) {
        var a = this,
            t = null;
        this.started = !1;
        var n = null;

        function i(e) {
            var t = 1 !== o.getImage().getGeometry().getSize().getNumberOfSlices(),
                n = 1 !== o.getImage().getNumberOfFrames();
            e ? t ? o.getViewController().incrementSliceNb() : n && o.getViewController().incrementFrameNb() : t ? o.getViewController().decrementSliceNb() : n && o.getViewController().decrementFrameNb()
        }
        this.mousedown = function(e) { o.getViewController().isPlaying() && o.getViewController().stop(), a.started = !0, a.x0 = e._x, a.y0 = e._y }, this.mousemove = function(e) {
            if (a.started) {
                var t = e._y - a.y0,
                    n = 15 < Math.abs(t);
                n && (0 < t ? o.getViewController().decrementSliceNb() : o.getViewController().incrementSliceNb());
                var i = e._x - a.x0,
                    r = 15 < Math.abs(i);
                r && (0 < i ? o.getViewController().incrementFrameNb() : o.getViewController().decrementFrameNb()), r && (a.x0 = e._x), n && (a.y0 = e._y)
            }
        }, this.mouseup = function() { a.started && (a.started = !1) }, this.mouseout = function(e) { a.mouseup(e) }, this.touchstart = function(e) { n = setTimeout(a.dblclick, 500), a.mousedown(e) }, this.touchmove = function(e) { null !== n && (clearTimeout(n), n = null), a.mousemove(e) }, this.touchend = function(e) { null !== n && (clearTimeout(n), n = null), a.mouseup(e) }, this.DOMMouseScroll = function(e) { e.detail < 0 ? i(!0) : i(!1) }, this.mousewheel = function(e) { 0 < e.wheelDelta ? i(!0) : i(!1) }, this.keydown = function(e) { o.onKeydown(e) }, this.dblclick = function() { o.getViewController().play() }, this.setup = function() {
            (t = new H.gui.Scroll(o)).setup()
        }, this.display = function(e) { t && t.display(e) }, this.init = function() { return !o.isMonoSliceData() || 1 !== o.getImage().getNumberOfFrames() }
    }, H.tool.Scroll.prototype.getHelp = function() { return { title: H.i18n("tool.Scroll.name"), brief: H.i18n("tool.Scroll.brief"), mouse: { mouse_drag: H.i18n("tool.Scroll.mouse_drag"), double_click: H.i18n("tool.Scroll.double_click") }, touch: { touch_drag: H.i18n("tool.Scroll.touch_drag"), tap_and_hold: H.i18n("tool.Scroll.tap_and_hold") } } }, (H = H || {}).tool = H.tool || {}, H.tool.Toolbox = function(i, t) {
        var r = null,
            n = null,
            o = null;
        this.getToolList = function() { return i }, this.getSelectedTool = function() { return n }, this.setup = function() {
            if (0 !== Object.keys(i).length)
                for (var e in (r = new H.gui.Toolbox(t)).setup(i), i) i[e].setup()
        }, this.display = function(e) { 0 !== Object.keys(i).length && r && r.display(e) }, this.init = function() {
            if (0 !== Object.keys(i).length) {
                o = "";
                var e = [],
                    t = null;
                for (var n in i)(t = i[n].init()) && "" === o && (o = n), e.push(t);
                this.setSelectedTool(o), r && r.initialise(e)
            }
        }, this.setSelectedTool = function(e) {
            if (!this.hasTool(e)) throw new Error("Unknown tool: '" + e + "'");
            n && n.display(!1), (n = i[e]).display(!0)
        }, this.reset = function() { n && n.display(!1), o = n = null }
    }, H.tool.Toolbox.prototype.hasTool = function(e) { return this.getToolList()[e] }, (H = H || {}).tool = H.tool || {}, H.tool.UndoStack = function(e) {
        var t = new H.gui.Undo(e),
            n = [];
        this.getStack = function() { return n };
        var i = 0;
        this.add = function(e) {
            (n = n.slice(0, i)).push(e), ++i, t.addCommandToUndoHtml(e.getName())
        }, this.undo = function() { 0 < i && (n[--i].undo(), t.enableInUndoHtml(!1)) }, this.redo = function() { i < n.length && (n[i].execute(), ++i, t.enableInUndoHtml(!0)) }, this.setup = function() { t.setup() }, this.initialise = function() { t.initialise() }
    }, (H = H || {}).tool = H.tool || {}, H.tool.WindowLevel = function(o) {
        var a = this,
            s = null;
        this.started = !1, this.mousedown = function(e) { a.started = !0, a.x0 = e._x, a.y0 = e._y, o.getViewController().setCurrentPosition2D(e._x, e._y) }, this.mousemove = function(e) {
            if (a.started) {
                var t = e._x - a.x0,
                    n = a.y0 - e._y,
                    i = parseInt(o.getViewController().getWindowLevel().center, 10) + n,
                    r = parseInt(o.getViewController().getWindowLevel().width, 10) + t;
                o.getViewController().addWindowLevelPresets({ manual: { wl: new H.image.WindowLevel(i, r), name: "manual" } }), o.getViewController().setWindowLevelPreset("manual"), s && (s.initialise(), H.gui.setSelected(o.getElement("presetSelect"), "manual")), a.x0 = e._x, a.y0 = e._y
            }
        }, this.mouseup = function() { a.started && (a.started = !1) }, this.mouseout = function(e) { a.mouseup(e) }, this.touchstart = function(e) { a.mousedown(e) }, this.touchmove = function(e) { a.mousemove(e) }, this.touchend = function(e) { a.mouseup(e) }, this.dblclick = function(e) { o.getViewController().setWindowLevel(parseInt(o.getImage().getRescaledValue(e._x, e._y, o.getViewController().getCurrentPosition().k), 10), parseInt(o.getViewController().getWindowLevel().width, 10)) }, this.keydown = function(e) { o.onKeydown(e) }, this.setup = function() {
            (s = new H.gui.WindowLevel(o)).setup()
        }, this.display = function(e) { s && (null !== o.getImage().getPhotometricInterpretation().match(/MONOCHROME/) ? s.display(e) : s.display(!1)) }, this.init = function() { return s && s.initialise(), !0 }
    }, H.tool.WindowLevel.prototype.getHelp = function() { return { title: H.i18n("tool.WindowLevel.name"), brief: H.i18n("tool.WindowLevel.brief"), mouse: { mouse_drag: H.i18n("tool.WindowLevel.mouse_drag"), double_click: H.i18n("tool.WindowLevel.double_click") }, touch: { touch_drag: H.i18n("tool.WindowLevel.touch_drag") } } }, (H = H || {}).tool = H.tool || {}, H.tool.ZoomAndPan = function(a) {
        var s = this,
            t = null;
        this.started = !1, this.mousedown = function(e) { s.started = !0, s.x0 = e._xs, s.y0 = e._ys }, this.twotouchdown = function(e) {
            s.started = !0, s.x0 = e._x, s.y0 = e._y;
            var t = new H.math.Point2D(e._x, e._y),
                n = new H.math.Point2D(e._x1, e._y1);
            s.line0 = new H.math.Line(t, n), s.midPoint = s.line0.getMidpoint()
        }, this.mousemove = function(e) {
            if (s.started) {
                var t = e._xs - s.x0,
                    n = e._ys - s.y0;
                a.stepTranslate(t, n), s.x0 = e._xs, s.y0 = e._ys
            }
        }, this.twotouchmove = function(e) {
            if (s.started) {
                var t = new H.math.Point2D(e._x, e._y),
                    n = new H.math.Point2D(e._x1, e._y1),
                    i = new H.math.Line(t, n).getLength() / s.line0.getLength();
                if (1 === i) {
                    var r = e._y - s.y0;
                    if (Math.abs(r) < 15) return;
                    0 < r ? a.getViewController().incrementSliceNb() : a.getViewController().decrementSliceNb()
                } else {
                    var o = (i - 1) / 2;
                    Math.abs(o) % .1 <= .05 && a.stepZoom(o, e._xs, e._ys)
                }
            }
        }, this.mouseup = function() { s.started && (s.started = !1) }, this.mouseout = function(e) { s.mouseup(e) }, this.touchstart = function(e) {
            var t = e.targetTouches;
            1 === t.length ? s.mousedown(e) : 2 === t.length && s.twotouchdown(e)
        }, this.touchmove = function(e) {
            var t = e.targetTouches;
            1 === t.length ? s.mousemove(e) : 2 === t.length && s.twotouchmove(e)
        }, this.touchend = function(e) { s.mouseup(e) }, this.DOMMouseScroll = function(e) {
            var t = -e.detail / 30;
            a.stepZoom(t, e._xs, e._ys)
        }, this.mousewheel = function(e) {
            var t = e.wheelDelta / 1200;
            a.stepZoom(t, e._xs, e._ys)
        }, this.keydown = function(e) { a.onKeydown(e) }, this.setup = function() {
            (t = new H.gui.ZoomAndPan(a)).setup()
        }, this.display = function(e) { t && t.display(e) }
    }, H.tool.ZoomAndPan.prototype.getHelp = function() { return { title: H.i18n("tool.ZoomAndPan.name"), brief: H.i18n("tool.ZoomAndPan.brief"), mouse: { mouse_wheel: H.i18n("tool.ZoomAndPan.mouse_wheel"), mouse_drag: H.i18n("tool.ZoomAndPan.mouse_drag") }, touch: { twotouch_pinch: H.i18n("tool.ZoomAndPan.twotouch_pinch"), touch_drag: H.i18n("tool.ZoomAndPan.touch_drag") } } }, H.tool.ZoomAndPan.prototype.init = function() { return !0 }, (H = H || {}).browser = H.browser || {}, H.browser.hasFileApi = function() { return -1 !== navigator.appVersion.indexOf("Safari") && -1 === navigator.appVersion.indexOf("Chrome") && (-1 !== navigator.appVersion.indexOf("5.0.") || -1 !== navigator.appVersion.indexOf("5.1.")) ? (console.warn("Assuming FileAPI support for Safari5..."), !0) : H.Modernizr.filereader }, H.browser.hasXmlHttpRequest = function() { return H.Modernizr.xhrresponsetype && H.Modernizr.xhrresponsetypearraybuffer && H.Modernizr.xhrresponsetypetext && "XMLHttpRequest" in W && "withCredentials" in new XMLHttpRequest }, H.browser.hasTypedArray = function() { return H.Modernizr.dataview && H.Modernizr.typedarrays }, H.browser.hasInputColor = function() { return H.Modernizr.inputtypes.color }, H.browser.hasInputDirectory = function() { return H.Modernizr.fileinputdirectory }, H.browser._hasTypedArraySlice = void 0 !== Uint8Array.prototype.slice, H.browser.hasTypedArraySlice = function() { return H.browser._hasTypedArraySlice }, H.browser._hasFloat64Array = "Float64Array" in W, H.browser.hasFloat64Array = function() { return H.browser._hasFloat64Array }, H.browser._hasClampedArray = "Uint8ClampedArray" in W, H.browser.hasClampedArray = function() { return H.browser._hasClampedArray }, H.browser.check = function() {
        var e = "The application cannot be run.",
            t = "";
        if (!H.browser.hasFileApi()) throw t = "The File APIs are not supported in this browser. ", alert(t + e), new Error(t);
        if (!H.browser.hasXmlHttpRequest()) throw t = "The XMLHttpRequest is not supported in this browser. ", alert(t + e), new Error(t);
        if (!H.browser.hasTypedArray()) throw t = "The Typed arrays are not supported in this browser. ", alert(t + e), new Error(t);
        H.browser.hasTypedArraySlice() || (console.warn("The TypedArray.slice method is not supported in this browser. This may impair performance. "), Uint16Array.prototype.slice = function(e, t) { for (var n = t - e, i = new Uint16Array(n), r = 0; r < n; r++) i[r] = this[e + r]; return i }, Int16Array.prototype.slice = function(e, t) { for (var n = t - e, i = new Int16Array(n), r = 0; r < n; r++) i[r] = this[e + r]; return i }, Uint8Array.prototype.slice = function(e, t) { for (var n = t - e, i = new Uint8Array(n), r = 0; r < n; r++) i[r] = this[e + r]; return i }, Int8Array.prototype.slice = function(e, t) { for (var n = t - e, i = new Int8Array(n), r = 0; r < n; r++) i[r] = this[e + r]; return i }), H.browser.hasClampedArray() || (console.warn("The Uint8ClampedArray is not supported in this browser. This may impair performance. "), W.Uint8ClampedArray = W.Uint8Array), H.browser.hasFloat64Array() || (console.warn("The Float64Array is not supported in this browser. This may impair performance. "), W.Float64Array = W.Float32Array), String.prototype.startsWith || (String.prototype.startsWith = function(e, t) { return this.substr(!t || t < 0 ? 0 : +t, e.length) === e })
    };
    a = a || {}, s = s || {}, l = l || {};
    (H = H || {}).i18nLocalesPath = null, H.i18nInitialise = function(e, t) {
        var n = void 0 === e ? "auto" : e,
            i = void 0 === t ? "../.." : t,
            r = { fallbackLng: "en", load: "languageOnly", backend: { loadPath: (H.i18nLocalesPath = i) + "/locales/{{lng}}/{{ns}}.json" } },
            o = a.use(s);
        "auto" === n ? o.use(l) : r.lng = n, o.init(r)
    }, H.i18nInitialiseWithResources = function(e, t) {
        var n = void 0 === e ? "auto" : e,
            i = { fallbackLng: "en", load: "languageOnly", resources: t };
        "auto" === n ? a.use(l).init(i) : (i.lng = n, a.init(i))
    }, H.i18nOnInitialised = function(e) { a.on("initialized", e) }, H.i18nOffInitialised = function() { a.off("initialized") }, H.i18nOnFailedLoad = function(e) { a.on("failedLoading", e) }, H.i18nOffFailedLoad = function() { a.off("failedLoading") }, H.i18n = function(e, t) { return a.t(e, t) }, H.i18nExists = function(e, t) { return a.exists(e, t) }, H.i18nPage = function() { for (var e = document.getElementsByTagName("*"), t = 0; t < e.length; ++t) void 0 !== e[t].dataset.i18n && (e[t].innerHTML = H.i18n(e[t].dataset.i18n)) }, H.i18nGetLocalePath = function(e) { var t = a.language.substr(0, 2); return H.i18nLocalesPath + "/locales/" + t + "/" + e }, H.i18nGetFallbackLocalePath = function(e) { var t = a.languages[a.languages.length - 1].substr(0, 2); return H.i18nLocalesPath + "/locales/" + t + "/" + e }, (H = H || {}).utils = H.utils || {}, H.utils.ListenerHandler = function() {
        var i = {};
        this.add = function(e, t) { void 0 === i[e] && (i[e] = []), i[e].push(t) }, this.remove = function(e, t) {
            if (void 0 !== i[e])
                for (var n = 0; n < i[e].length; ++n) i[e][n] === t && i[e].splice(n, 1)
        }, this.fireEvent = function(e) {
            if (void 0 !== i[e.type])
                for (var t = 0; t < i[e.type].length; ++t) i[e.type][t](e)
        }
    };
    var H = H || {};
    return function(e, a, t) {
        var s = [],
            n = {
                _version: "3.6.0",
                _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 },
                _q: [],
                on: function(e, t) {
                    var n = this;
                    setTimeout(function() { t(n[e]) }, 0)
                },
                addTest: function(e, t, n) { s.push({ name: e, fn: t, options: n }) },
                addAsyncTest: function(e) { s.push({ name: null, fn: e }) }
            },
            l = function() {};
        l.prototype = n, (l = new l).addTest("dataview", "undefined" != typeof DataView && "getFloat64" in DataView.prototype), l.addTest("typedarrays", "ArrayBuffer" in e), l.addTest("filereader", !!(e.File && e.FileList && e.FileReader)), l.addTest("xhrresponsetype", function() { if ("undefined" == typeof XMLHttpRequest) return !1; var e = new XMLHttpRequest; return e.open("get", "/", !0), "response" in e }());
        var u = [];
        var c = a.documentElement,
            i = function(e) {
                if ("undefined" == typeof XMLHttpRequest) return !1;
                var t = new XMLHttpRequest;
                t.open("get", "/", !0);
                try { t.responseType = e } catch (e) { return !1 }
                return "response" in t && t.responseType == e
            };
        l.addTest("xhrresponsetypearraybuffer", i("arraybuffer")), l.addTest("xhrresponsetypejson", i("json")), l.addTest("xhrresponsetypetext", i("text"));
        var r = "svg" === c.nodeName.toLowerCase();

        function o() { return "function" != typeof a.createElement ? a.createElement(arguments[0]) : r ? a.createElementNS.call(a, "http://www.w3.org/2000/svg", arguments[0]) : a.createElement.apply(a, arguments) }
        var d = o("input"),
            S = "search tel url email datetime date month week time datetime-local number range color".split(" "),
            x = {};
        l.inputtypes = function(e) { for (var t, n, i, r = e.length, o = 0; o < r; o++) d.setAttribute("type", t = e[o]), (i = "text" !== d.type && "style" in d) && (d.value = "1)", d.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(t) && void 0 !== d.style.WebkitAppearance ? (c.appendChild(d), i = (n = a.defaultView).getComputedStyle && "textfield" !== n.getComputedStyle(d, null).WebkitAppearance && 0 !== d.offsetHeight, c.removeChild(d)) : /^(search|tel)$/.test(t) || (i = /^(url|email)$/.test(t) ? d.checkValidity && !1 === d.checkValidity() : "1)" != d.value)), x[e[o]] = !!i; return x }(S);
        var g = n._config.usePrefixes ? "Moz O ms Webkit".toLowerCase().split(" ") : [];
        n._domPrefixes = g, l.addTest("fileinputdirectory", function() {
                var e = o("input"),
                    t = "directory";
                if (e.type = "file", t in e) return !0;
                for (var n = 0, i = g.length; n < i; n++)
                    if (g[n] + t in e) return !0;
                return !1
            }),
            function() {
                var e, t, n, i, r, o;
                for (var a in s)
                    if (s.hasOwnProperty(a)) {
                        if (e = [], (t = s[a]).name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length))
                            for (n = 0; n < t.options.aliases.length; n++) e.push(t.options.aliases[n].toLowerCase());
                        for (i = "function" == typeof t.fn ? t.fn() : t.fn, r = 0; r < e.length; r++) 1 === (o = e[r].split(".")).length ? l[o[0]] = i : (!l[o[0]] || l[o[0]] instanceof Boolean || (l[o[0]] = new Boolean(l[o[0]])), l[o[0]][o[1]] = i), u.push((i ? "" : "no-") + o.join("-"))
                    }
            }(), delete n.addTest, delete n.addAsyncTest;
        for (var m = 0; m < l._q.length; m++) l._q[m]();
        H.Modernizr = l
    }(W, document), (H = H || {}).utils = H.utils || {}, H.utils.MultiProgressHandler = function(n) {
        var i = this,
            r = [],
            o = 2;
        this.setNumberOfDimensions = function(e) { o = e }, this.setNToLoad = function(e) { for (var t = 0; t < e; ++t) { r[t] = []; for (var n = 0; n < o; ++n) r[t][n] = 0 } }, this.onprogress = function(e) {
            if (e.lengthComputable && void 0 !== e.subindex && void 0 !== e.index) {
                var t = 100 * e.loaded / e.total;
                r[e.index][e.subindex] = t, n({
                    type: e.type,
                    lengthComputable: !0,
                    loaded: function() {
                        for (var e = 0, t = r.length, n = 0; n < t; ++n)
                            for (var i = 0; i < o; ++i) e += r[n][i];
                        return Math.round(e / (t * o))
                    }(),
                    total: 100
                })
            }
        }, this.getMonoProgressHandler = function(t, n) { return function(e) { e.index = t, e.subindex = n, i.onprogress(e) } }, this.getMonoOnLoadEndHandler = function(e, t) { return function() { i.onprogress({ type: "load-progress", lengthComputable: !0, loaded: 100, total: 100, index: e, subindex: t }) } }, this.getUndefinedMonoProgressHandler = function(t) { return function(e) { e.subindex = t, i.onprogress(e) } }
    }, (H = H || {}).utils = H.utils || {}, H.utils.capitaliseFirstLetter = function(e) { var t = e; return e && (t = e.charAt(0).toUpperCase() + e.slice(1)), t }, H.utils.splitKeyValueString = function(e) {
        var t = {};
        if (e)
            for (var n = e.split("&"), i = 0; i < n.length; ++i) {
                var r = n[i].split("=");
                t[r[0]] ? (t[r[0]] instanceof Array || (t[r[0]] = [t[r[0]]]), t[r[0]].push(r[1])) : t[r[0]] = r[1]
            }
        return t
    }, H.utils.replaceFlags = function(e, t) {
        var n = "";
        if (null == e) return n;
        if (n = e, null == t) return n;
        for (var i = Object.keys(t), r = 0; r < i.length; ++r) {
            var o = t[i[r]];
            if (null != o && null !== o.value && void 0 !== o.value) {
                var a = o.value.toPrecision(4);
                null !== o.unit && void 0 !== o.unit && 0 !== o.unit.length && ("degree" !== o.unit && (a += " "), a += o.unit);
                var s = "{" + i[r] + "}";
                n = n.replace(s, a)
            }
        }
        return n
    }, H.utils.replaceFlags2 = function(e, t) { for (var n = e, i = 0; i < t.length; ++i) n = n.replace("{v" + i + "}", t[i]); return n }, H.utils.createDefaultReplaceFormat = function(e) { for (var t = "", n = 0; n < e.length; ++n) 0 !== n && (t += ", "), t += "{v" + n + "}"; return t }, (H = H || {}).utils = H.utils || {}, H.utils.ThreadPool = function(i) {
        var r = [],
            o = [],
            a = [];
        this.init = function() { for (var e = 0; e < i; ++e) o.push(new H.utils.WorkerThread(this)) }, this.addWorkerTask = function(e) {
            if (0 < o.length) {
                var t = o.shift();
                t.run(e), a.push(t)
            } else r.push(e)
        }, this.abort = function() {
            r = [];
            for (var e = 0; e < a.length; ++e) a[e].stop();
            a = [], this.init()
        }, this.freeWorkerThread = function(e) {
            if (this.onworkerend(), 0 < r.length) {
                var t = r.shift();
                e.run(t)
            } else {
                o.push(e);
                for (var n = 0; n < a.length; ++n) a[n].getId() === e.getId() && a.splice(n, 1);
                o.length === i && this.onpoolworkend()
            }
        }
    }, H.utils.ThreadPool.prototype.onpoolworkend = function() {}, H.utils.ThreadPool.prototype.onworkerend = function() {}, H.utils.WorkerThread = function(e) {
        var t, n = this,
            i = Math.random().toString(36).substring(2, 15),
            r = {};

        function o(e) { r.callback(e), n.stop() } this.getId = function() { return i }, this.run = function(e) { null !== (r = e).script && ((t = new Worker(r.script)).addEventListener("message", o, !1), t.postMessage(r.startMessage)) }, this.stop = function() { t.terminate(), e.freeWorkerThread(this) }
    }, H.utils.WorkerTask = function(e, t, n) { this.script = e, this.callback = t, this.startMessage = n }, (H = H || {}).utils = H.utils || {}, H.utils.base = H.utils.base || {}, H.utils.splitUri = function(e) {
        var t = {},
            n = null;
        if (e && -1 !== (n = e.indexOf("?"))) {
            t.base = e.substr(0, n);
            var i = e.indexOf("#"); - 1 === i && (i = e.length);
            var r = e.substr(n + 1, i - 1 - n);
            t.query = H.utils.splitKeyValueString(r)
        }
        return t
    }, H.utils.getUriQuery = function(e) { var t = H.utils.splitUri(e); return 0 === Object.keys(t).length ? null : t.query }, H.utils.base.decodeQuery = function(e, t) { e.type && "manifest" === e.type ? H.utils.decodeManifestQuery(e, t) : t(H.utils.decodeKeyValueUri(e.input, e.dwvReplaceMode)) }, H.utils.decodeKeyValueUri = function(e, t) {
        var n = [],
            i = "key";
        t && (i = t);
        var r = decodeURIComponent(e),
            o = H.utils.splitUri(r);
        if (0 === Object.keys(o).length) n.push(r);
        else {
            for (var a = Object.keys(o.query), s = null, l = 0; l < a.length; ++l)
                if (o.query[a[l]] instanceof Array) { s = a[l]; break }
            if (s) {
                var u = o.query[s],
                    c = o.base;
                "file" !== s && (c += "?");
                for (var d, S = !1, x = 0; x < a.length; ++x) a[x] !== s && (S && (c += "&"), c += a[x] + "=" + o.query[a[x]], S = !0);
                for (var g = 0; g < u.length; ++g) d = c, S && (d += "&"), "key" === i && (d += s + "="), d += u[g], n.push(d)
            } else n.push(r)
        }
        return n
    }, H.utils.decodeManifestQuery = function(e, t) {
        var n = "";
        "/" === e.input[0] && (n = W.location.protocol + "//" + W.location.host), n += e.input;
        var i = new XMLHttpRequest;
        i.open("GET", decodeURIComponent(n), !0), i.responseType = "document", i.onload = function() { t(H.utils.decodeManifest(this.responseXML, e.nslices)) }, i.onerror = function() { console.warn("RequestError while receiving manifest: " + this.status) }, i.send(null)
    }, H.utils.decodeManifest = function(e, t) {
        var n = [],
            i = e.getElementsByTagName("wado_query")[0].getAttribute("wadoURL") + "?requestType=WADO&contentType=application/dicom&",
            r = e.getElementsByTagName("Patient");
        1 < r.length && console.warn("More than one patient, loading first one.");
        var o = r[0].getElementsByTagName("Study");
        1 < o.length && console.warn("More than one study, loading first one.");
        var a = o[0].getAttribute("StudyInstanceUID"),
            s = o[0].getElementsByTagName("Series");
        1 < s.length && console.warn("More than one series, loading first one.");
        var l = s[0].getAttribute("SeriesInstanceUID"),
            u = s[0].getElementsByTagName("Instance"),
            c = u.length;
        t < c && (c = t);
        for (var d = 0; d < c; ++d) {
            var S = i + "&studyUID=" + a + "&seriesUID=" + l + "&objectUID=" + u[d].getAttribute("SOPInstanceUID");
            n.push(S)
        }
        return n
    }, H
});