!function(element, proceed) {
    if ("function" == typeof define && (define.amd || define.cmd)) {
        define(function() {
            return proceed(element);
        });
    } else {
        proceed(element, true);
    }
}(this, function(req, dataAndEvents) {
    /**
     * @param {string} value
     * @param {?} opt_attributes
     * @param {Object} model
     * @return {undefined}
     */
    function callback(value, opt_attributes, model) {
        if (req.WeixinJSBridge) {
            WeixinJSBridge.invoke(value, postMessage(opt_attributes), function(resp) {
                success(value, resp, model);
            });
        } else {
            extend(value, model);
        }
    }
    /**
     * @param {string} name
     * @param {string} opt_attributes
     * @param {Object} options
     * @return {undefined}
     */
    function ajax(name, opt_attributes, options) {
        if (req.WeixinJSBridge) {
            WeixinJSBridge.on(name, function(a) {
                if (options) {
                    if (options.trigger) {
                        options.trigger(a);
                    }
                }
                success(name, a, opt_attributes);
            });
        } else {
            if (options) {
                extend(name, options);
            } else {
                extend(name, opt_attributes);
            }
        }
    }
    /**
     * @param {Object} data
     * @return {?}
     */
    function postMessage(data) {
        return data = data || {}, data.appId = options.appId, data.verifyAppId = options.appId, data.verifySignType = "sha1", data.verifyTimestamp = options.timestamp + "", data.verifyNonceStr = options.nonceStr, data.verifySignature = options.signature, data;
    }
    /**
     * @param {Object} options
     * @return {?}
     */
    function destroy(options) {
        return{
            timeStamp : options.timestamp + "",
            nonceStr : options.nonceStr,
            "package" : options.package,
            paySign : options.paySign,
            signType : options.signType || "SHA1"
        };
    }
    /**
     * @param {string} name
     * @param {Event} data
     * @param {Object} result
     * @return {undefined}
     */
    function success(name, data, result) {
        var key;
        var beginBracket;
        var f;
        switch(delete data.err_code, delete data.err_desc, delete data.err_detail, key = data.errMsg, key || (key = data.err_msg, delete data.err_msg, key = next(name, key), data.errMsg = key), result = result || {}, result._complete && (result._complete(data), delete result._complete), key = data.errMsg || "", options.debug && (!result.isInnerInvoke && alert(JSON.stringify(data))), beginBracket = key.indexOf(":"), f = key.substring(beginBracket + 1)) {
            case "ok":
                if (result.success) {
                    result.success(data);
                }
                break;
            case "cancel":
                if (result.cancel) {
                    result.cancel(data);
                }
                break;
            default:
                if (result.fail) {
                    result.fail(data);
                }
                ;
        }
        if (result.complete) {
            result.complete(data);
        }
    }
    /**
     * @param {string} name
     * @param {string} event
     * @return {?}
     */
    function next(name, event) {
        var key;
        var pos;
        /** @type {string} */
        var namespace = name;
        var ns = cache[namespace];
        return ns && (namespace = ns), key = "ok", event && (pos = event.indexOf(":"), key = event.substring(pos + 1), "confirm" == key && (key = "ok"), "failed" == key && (key = "fail"), -1 != key.indexOf("failed_") && (key = key.substring(7)), -1 != key.indexOf("fail_") && (key = key.substring(5)), key = key.replace(/_/g, " "), key = key.toLowerCase(), ("access denied" == key || "no permission to execute" == key) && (key = "permission denied"), "config" == namespace && ("function not exist" == key &&
        (key = "ok")), "" == key && (key = "fail")), event = namespace + ":" + key;
    }
    /**
     * @param {Array} results
     * @return {?}
     */
    function unique(results) {
        var i;
        var l;
        var id;
        var value;
        if (results) {
            /** @type {number} */
            i = 0;
            l = results.length;
            for (;l > i;++i) {
                id = results[i];
                value = module[id];
                if (value) {
                    results[i] = value;
                }
            }
            return results;
        }
    }
    /**
     * @param {string} b
     * @param {string} id
     * @return {undefined}
     */
    function extend(b, id) {
        if (!(!options.debug || id && id.isInnerInvoke)) {
            var c = cache[b];
            if (c) {
                b = c;
            }
            if (id) {
                if (id._complete) {
                    delete id._complete;
                }
            }
            console.log('"' + b + '",', id || "");
        }
    }
    /**
     * @return {undefined}
     */
    function compile() {
        if (0 != config.preVerifyState) {
            if (!u) {
                if (!v) {
                    if (!options.debug) {
                        if (!("6.0.2" > cversion)) {
                            if (!(config.systemType < 0)) {
                                if (!A) {
                                    /** @type {boolean} */
                                    A = true;
                                    config.appId = options.appId;
                                    /** @type {number} */
                                    config.initTime = fx.initEndTime - fx.initStartTime;
                                    /** @type {number} */
                                    config.preVerifyTime = fx.preVerifyEndTime - fx.preVerifyStartTime;
                                    context.getNetworkType({
                                        isInnerInvoke : true,
                                        /**
                                         * @param {Event} e
                                         * @return {undefined}
                                         */
                                        success : function(e) {
                                            var href;
                                            var objNext;
                                            config.networkType = e.networkType;
                                            /** @type {string} */
                                            href = "http://open.weixin.qq.com/sdk/report?v=" + config.version + "&o=" + config.preVerifyState + "&s=" + config.systemType + "&c=" + config.clientVersion + "&a=" + config.appId + "&n=" + config.networkType + "&i=" + config.initTime + "&p=" + config.preVerifyTime + "&u=" + config.url;
                                            /** @type {Image} */
                                            objNext = new Image;
                                            /** @type {string} */
                                            objNext.src = href;
                                        }
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    /**
     * @return {?}
     */
    function now() {
        return(new Date).getTime();
    }
    /**
     * @param {Function} fn
     * @return {undefined}
     */
    function init(fn) {
        if (w) {
            if (req.WeixinJSBridge) {
                fn();
            } else {
                if (doc.addEventListener) {
                    doc.addEventListener("WeixinJSBridgeReady", fn, false);
                }
            }
        }
    }
    /**
     * @return {undefined}
     */
    function setup() {
        if (!context.invoke) {
            /**
             * @param {string} func
             * @param {Object} obj
             * @param {Function} thisArg
             * @return {undefined}
             */
            context.invoke = function(func, obj, thisArg) {
                if (req.WeixinJSBridge) {
                    WeixinJSBridge.invoke(func, postMessage(obj), thisArg);
                }
            };
            /**
             * @param {string} types
             * @param {Function} one
             * @return {undefined}
             */
            context.on = function(types, one) {
                if (req.WeixinJSBridge) {
                    WeixinJSBridge.on(types, one);
                }
            };
        }
    }
    var module;
    var cache;
    var doc;
    var data;
    var userAgent;
    var ua;
    var u;
    var v;
    var w;
    var length;
    var bulk;
    var cversion;
    var A;
    var B;
    var fx;
    var config;
    var options;
    var self;
    var result;
    var context;
    if (!req.jWeixin) {
        return module = {
            config : "preVerifyJSAPI",
            onMenuShareTimeline : "menu:share:timeline",
            onMenuShareAppMessage : "menu:share:appmessage",
            onMenuShareQQ : "menu:share:qq",
            onMenuShareWeibo : "menu:share:weiboApp",
            onMenuShareQZone : "menu:share:QZone",
            previewImage : "imagePreview",
            getLocation : "geoLocation",
            openProductSpecificView : "openProductViewWithPid",
            addCard : "batchAddCard",
            openCard : "batchViewCard",
            chooseWXPay : "getBrandWCPayRequest"
        }, cache = function() {
            var i;
            var _hexToByte = {};
            for (i in module) {
                /** @type {string} */
                _hexToByte[module[i]] = i;
            }
            return _hexToByte;
        }(), doc = req.document, data = doc.title, userAgent = navigator.userAgent.toLowerCase(), ua = navigator.platform.toLowerCase(), u = !(!ua.match("mac") && !ua.match("win")), v = -1 != userAgent.indexOf("wxdebugger"), w = -1 != userAgent.indexOf("micromessenger"), length = -1 != userAgent.indexOf("android"), bulk = -1 != userAgent.indexOf("iphone") || -1 != userAgent.indexOf("ipad"), cversion = function() {
            var namespaceMatch = userAgent.match(/micromessenger\/(\d+\.\d+\.\d+)/) || userAgent.match(/micromessenger\/(\d+\.\d+)/);
            return namespaceMatch ? namespaceMatch[1] : "";
        }(), A = false, B = false, fx = {
            initStartTime : now(),
            initEndTime : 0,
            preVerifyStartTime : 0,
            preVerifyEndTime : 0
        }, config = {
            version : 1,
            appId : "",
            initTime : 0,
            preVerifyTime : 0,
            networkType : "",
            preVerifyState : 1,
            systemType : bulk ? 1 : length ? 2 : -1,
            clientVersion : cversion,
            url : encodeURIComponent(location.href)
        }, options = {}, self = {
            _completes : []
        }, result = {
            state : 0,
            data : {}
        }, init(function() {
            fx.initEndTime = now();
        }), context = {
            /**
             * @param {string} settings
             * @return {undefined}
             */
            config : function(settings) {
                /** @type {string} */
                options = settings;
                extend("config", settings);
                /** @type {boolean} */
                var b = options.check === false ? false : true;
                init(function() {
                    var _ref5;
                    var argIndex;
                    var _len2;
                    if (b) {
                        callback(module.config, {
                            verifyJsApiList : unique(options.jsApiList)
                        }, function() {
                            /**
                             * @param {Object} e
                             * @return {undefined}
                             */
                            self._complete = function(e) {
                                fx.preVerifyEndTime = now();
                                /** @type {number} */
                                result.state = 1;
                                /** @type {Object} */
                                result.data = e;
                            };
                            /**
                             * @return {undefined}
                             */
                            self.success = function() {
                                /** @type {number} */
                                config.preVerifyState = 0;
                            };
                            /**
                             * @param {Event} arg
                             * @return {undefined}
                             */
                            self.fail = function(arg) {
                                if (self._fail) {
                                    self._fail(arg);
                                } else {
                                    /** @type {number} */
                                    result.state = -1;
                                }
                            };
                            var matched = self._completes;
                            return matched.push(function() {
                                compile();
                            }), self.complete = function() {
                                /** @type {number} */
                                var name_fragment = 0;
                                var cnl = matched.length;
                                for (;cnl > name_fragment;++name_fragment) {
                                    matched[name_fragment]();
                                }
                                /** @type {Array} */
                                self._completes = [];
                            }, self;
                        }());
                        fx.preVerifyStartTime = now();
                    } else {
                        /** @type {number} */
                        result.state = 1;
                        _ref5 = self._completes;
                        /** @type {number} */
                        argIndex = 0;
                        _len2 = _ref5.length;
                        for (;_len2 > argIndex;++argIndex) {
                            _ref5[argIndex]();
                        }
                        /** @type {Array} */
                        self._completes = [];
                    }
                });
                if (options.beta) {
                    setup();
                }
            },
            /**
             * @param {?} callback
             * @return {undefined}
             */
            ready : function(callback) {
                if (0 != result.state) {
                    callback();
                } else {
                    self._completes.push(callback);
                    if (!w) {
                        if (options.debug) {
                            callback();
                        }
                    }
                }
            },
            /**
             * @param {?} _
             * @return {undefined}
             */
            error : function(_) {
                if (!("6.0.2" > cversion)) {
                    if (!B) {
                        /** @type {boolean} */
                        B = true;
                        if (-1 == result.state) {
                            _(result.data);
                        } else {
                            self._fail = _;
                        }
                    }
                }
            },
            /**
             * @param {?} self
             * @return {undefined}
             */
            checkJsApi : function(self) {
                /**
                 * @param {Object} cur
                 * @return {?}
                 */
                var sibling = function(cur) {
                    var k;
                    var name;
                    var old = cur.checkResult;
                    for (k in old) {
                        name = cache[k];
                        if (name) {
                            old[name] = old[k];
                            delete old[k];
                        }
                    }
                    return cur;
                };
                callback("checkJsApi", {
                    jsApiList : unique(self.jsApiList)
                }, function() {
                    return self._complete = function(item) {
                        if (length) {
                            var value = item.checkResult;
                            if (value) {
                                /** @type {*} */
                                item.checkResult = JSON.parse(value);
                            }
                        }
                        item = sibling(item);
                    }, self;
                }());
            },
            /**
             * @param {Object} options
             * @return {undefined}
             */
            onMenuShareTimeline : function(options) {
                ajax(module.onMenuShareTimeline, {
                    /**
                     * @return {undefined}
                     */
                    complete : function() {
                        callback("shareTimeline", {
                            title : options.title || data,
                            desc : options.title || data,
                            img_url : options.imgUrl || "",
                            link : options.link || location.href,
                            type : options.type || "link",
                            data_url : options.dataUrl || ""
                        }, options);
                    }
                }, options);
            },
            /**
             * @param {Object} options
             * @return {undefined}
             */
            onMenuShareAppMessage : function(options) {
                ajax(module.onMenuShareAppMessage, {
                    /**
                     * @return {undefined}
                     */
                    complete : function() {
                        callback("sendAppMessage", {
                            title : options.title || data,
                            desc : options.desc || "",
                            link : options.link || location.href,
                            img_url : options.imgUrl || "",
                            type : options.type || "link",
                            data_url : options.dataUrl || ""
                        }, options);
                    }
                }, options);
            },
            /**
             * @param {Object} options
             * @return {undefined}
             */
            onMenuShareQQ : function(options) {
                ajax(module.onMenuShareQQ, {
                    /**
                     * @return {undefined}
                     */
                    complete : function() {
                        callback("shareQQ", {
                            title : options.title || data,
                            desc : options.desc || "",
                            img_url : options.imgUrl || "",
                            link : options.link || location.href
                        }, options);
                    }
                }, options);
            },
            /**
             * @param {Object} options
             * @return {undefined}
             */
            onMenuShareWeibo : function(options) {
                ajax(module.onMenuShareWeibo, {
                    /**
                     * @return {undefined}
                     */
                    complete : function() {
                        callback("shareWeiboApp", {
                            title : options.title || data,
                            desc : options.desc || "",
                            img_url : options.imgUrl || "",
                            link : options.link || location.href
                        }, options);
                    }
                }, options);
            },
            /**
             * @param {Object} options
             * @return {undefined}
             */
            onMenuShareQZone : function(options) {
                ajax(module.onMenuShareQZone, {
                    /**
                     * @return {undefined}
                     */
                    complete : function() {
                        callback("shareQZone", {
                            title : options.title || data,
                            desc : options.desc || "",
                            img_url : options.imgUrl || "",
                            link : options.link || location.href
                        }, options);
                    }
                }, options);
            },
            /**
             * @param {Object} collection
             * @return {undefined}
             */
            startRecord : function(collection) {
                callback("startRecord", {}, collection);
            },
            /**
             * @param {Object} collection
             * @return {undefined}
             */
            stopRecord : function(collection) {
                callback("stopRecord", {}, collection);
            },
            /**
             * @param {string} opt_attributes
             * @return {undefined}
             */
            onVoiceRecordEnd : function(opt_attributes) {
                ajax("onVoiceRecordEnd", opt_attributes);
            },
            /**
             * @param {Object} collection
             * @return {undefined}
             */
            playVoice : function(collection) {
                callback("playVoice", {
                    localId : collection.localId
                }, collection);
            },
            /**
             * @param {Object} collection
             * @return {undefined}
             */
            pauseVoice : function(collection) {
                callback("pauseVoice", {
                    localId : collection.localId
                }, collection);
            },
            /**
             * @param {Object} collection
             * @return {undefined}
             */
            stopVoice : function(collection) {
                callback("stopVoice", {
                    localId : collection.localId
                }, collection);
            },
            /**
             * @param {string} opt_attributes
             * @return {undefined}
             */
            onVoicePlayEnd : function(opt_attributes) {
                ajax("onVoicePlayEnd", opt_attributes);
            },
            /**
             * @param {Object} collection
             * @return {undefined}
             */
            uploadVoice : function(collection) {
                callback("uploadVoice", {
                    localId : collection.localId,
                    isShowProgressTips : 0 == collection.isShowProgressTips ? 0 : 1
                }, collection);
            },
            /**
             * @param {Object} collection
             * @return {undefined}
             */
            downloadVoice : function(collection) {
                callback("downloadVoice", {
                    serverId : collection.serverId,
                    isShowProgressTips : 0 == collection.isShowProgressTips ? 0 : 1
                }, collection);
            },
            /**
             * @param {Object} collection
             * @return {undefined}
             */
            translateVoice : function(collection) {
                callback("translateVoice", {
                    localId : collection.localId,
                    isShowProgressTips : 0 == collection.isShowProgressTips ? 0 : 1
                }, collection);
            },
            /**
             * @param {Object} item
             * @return {undefined}
             */
            chooseImage : function(item) {
                callback("chooseImage", {
                    scene : "1|2",
                    count : item.count || 9,
                    sizeType : item.sizeType || ["original", "compressed"],
                    sourceType : item.sourceType || ["album", "camera"]
                }, function() {
                    return item._complete = function(response) {
                        if (length) {
                            var content = response.localIds;
                            if (content) {
                                /** @type {*} */
                                response.localIds = JSON.parse(content);
                            }
                        }
                    }, item;
                }());
            },
            /**
             * @param {Object} me
             * @return {undefined}
             */
            previewImage : function(me) {
                callback(module.previewImage, {
                    current : me.current,
                    urls : me.urls
                }, me);
            },
            /**
             * @param {Object} collection
             * @return {undefined}
             */
            uploadImage : function(collection) {
                callback("uploadImage", {
                    localId : collection.localId,
                    isShowProgressTips : 0 == collection.isShowProgressTips ? 0 : 1
                }, collection);
            },
            /**
             * @param {Object} collection
             * @return {undefined}
             */
            downloadImage : function(collection) {
                callback("downloadImage", {
                    serverId : collection.serverId,
                    isShowProgressTips : 0 == collection.isShowProgressTips ? 0 : 1
                }, collection);
            },
            /**
             * @param {?} opt_attributes
             * @return {undefined}
             */
            getNetworkType : function(opt_attributes) {
                /**
                 * @param {Object} data
                 * @return {?}
                 */
                var func = function(data) {
                    var type;
                    var i;
                    var k;
                    var raw = data.errMsg;
                    if (data.errMsg = "getNetworkType:ok", type = data.subtype, delete data.subtype, type) {
                        data.networkType = type;
                    } else {
                        switch(i = raw.indexOf(":"), k = raw.substring(i + 1)) {
                            case "wifi":
                                ;
                            case "edge":
                                ;
                            case "wwan":
                                data.networkType = k;
                                break;
                            default:
                                /** @type {string} */
                                data.errMsg = "getNetworkType:fail";
                        }
                    }
                    return data;
                };
                callback("getNetworkType", {}, function() {
                    return opt_attributes._complete = function(value) {
                        value = func(value);
                    }, opt_attributes;
                }());
            },
            /**
             * @param {Object} self
             * @return {undefined}
             */
            openLocation : function(self) {
                callback("openLocation", {
                    latitude : self.latitude,
                    longitude : self.longitude,
                    name : self.name || "",
                    address : self.address || "",
                    scale : self.scale || 28,
                    infoUrl : self.infoUrl || ""
                }, self);
            },
            /**
             * @param {Object} details
             * @return {undefined}
             */
            getLocation : function(details) {
                details = details || {};
                callback(module.getLocation, {
                    type : details.type || "wgs84"
                }, function() {
                    return details._complete = function(event) {
                        delete event.type;
                    }, details;
                }());
            },
            /**
             * @param {Object} collection
             * @return {undefined}
             */
            hideOptionMenu : function(collection) {
                callback("hideOptionMenu", {}, collection);
            },
            /**
             * @param {Object} collection
             * @return {undefined}
             */
            showOptionMenu : function(collection) {
                callback("showOptionMenu", {}, collection);
            },
            /**
             * @param {Object} collection
             * @return {undefined}
             */
            closeWindow : function(collection) {
                collection = collection || {};
                callback("closeWindow", {}, collection);
            },
            /**
             * @param {Object} collection
             * @return {undefined}
             */
            hideMenuItems : function(collection) {
                callback("hideMenuItems", {
                    menuList : collection.menuList
                }, collection);
            },
            /**
             * @param {Object} collection
             * @return {undefined}
             */
            showMenuItems : function(collection) {
                callback("showMenuItems", {
                    menuList : collection.menuList
                }, collection);
            },
            /**
             * @param {Object} collection
             * @return {undefined}
             */
            hideAllNonBaseMenuItem : function(collection) {
                callback("hideAllNonBaseMenuItem", {}, collection);
            },
            /**
             * @param {Object} collection
             * @return {undefined}
             */
            showAllNonBaseMenuItem : function(collection) {
                callback("showAllNonBaseMenuItem", {}, collection);
            },
            /**
             * @param {Object} proto
             * @return {undefined}
             */
            scanQRCode : function(proto) {
                proto = proto || {};
                callback("scanQRCode", {
                    needResult : proto.needResult || 0,
                    scanType : proto.scanType || ["qrCode", "barCode"]
                }, function() {
                    return proto._complete = function(response) {
                        var content;
                        var options;
                        if (bulk) {
                            content = response.resultStr;
                            if (content) {
                                /** @type {*} */
                                options = JSON.parse(content);
                                /** @type {*} */
                                response.resultStr = options && (options.scan_code && options.scan_code.scan_result);
                            }
                        }
                    }, proto;
                }());
            },
            /**
             * @param {Object} collection
             * @return {undefined}
             */
            openProductSpecificView : function(collection) {
                callback(module.openProductSpecificView, {
                    pid : collection.productId,
                    view_type : collection.viewType || 0,
                    ext_info : collection.extInfo
                }, collection);
            },
            /**
             * @param {?} item
             * @return {undefined}
             */
            addCard : function(item) {
                var position;
                var _len;
                var result;
                var vvar;
                var children = item.cardList;
                /** @type {Array} */
                var assigns = [];
                /** @type {number} */
                position = 0;
                _len = children.length;
                for (;_len > position;++position) {
                    result = children[position];
                    vvar = {
                        card_id : result.cardId,
                        card_ext : result.cardExt
                    };
                    assigns.push(vvar);
                }
                callback(module.addCard, {
                    card_list : assigns
                }, function() {
                    return item._complete = function(response) {
                        var i;
                        var l;
                        var result;
                        var headers = response.card_list;
                        if (headers) {
                            /** @type {*} */
                            headers = JSON.parse(headers);
                            /** @type {number} */
                            i = 0;
                            l = headers.length;
                            for (;l > i;++i) {
                                result = headers[i];
                                result.cardId = result.card_id;
                                result.cardExt = result.card_ext;
                                /** @type {boolean} */
                                result.isSuccess = result.is_succ ? true : false;
                                delete result.card_id;
                                delete result.card_ext;
                                delete result.is_succ;
                            }
                            /** @type {*} */
                            response.cardList = headers;
                            delete response.card_list;
                        }
                    }, item;
                }());
            },
            /**
             * @param {?} data
             * @return {undefined}
             */
            chooseCard : function(data) {
                callback("chooseCard", {
                    app_id : options.appId,
                    location_id : data.shopId || "",
                    sign_type : data.signType || "SHA1",
                    card_id : data.cardId || "",
                    card_type : data.cardType || "",
                    card_sign : data.cardSign,
                    time_stamp : data.timestamp + "",
                    nonce_str : data.nonceStr
                }, function() {
                    return data._complete = function(response) {
                        response.cardList = response.choose_card_info;
                        delete response.choose_card_info;
                    }, data;
                }());
            },
            /**
             * @param {Object} collection
             * @return {undefined}
             */
            openCard : function(collection) {
                var p;
                var a;
                var e;
                var vvar;
                var l = collection.cardList;
                /** @type {Array} */
                var assigns = [];
                /** @type {number} */
                p = 0;
                a = l.length;
                for (;a > p;++p) {
                    e = l[p];
                    vvar = {
                        card_id : e.cardId,
                        code : e.code
                    };
                    assigns.push(vvar);
                }
                callback(module.openCard, {
                    card_list : assigns
                }, collection);
            },
            /**
             * @param {Object} model
             * @return {undefined}
             */
            chooseWXPay : function(model) {
                callback(module.chooseWXPay, destroy(model), model);
            }
        }, dataAndEvents && (req.wx = req.jWeixin = context), context;
    }
});
