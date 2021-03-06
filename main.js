var d = {
    url: document.URL,
    origin: document.location.origin,
    protocol: document.location.protocol,
    host: document.location.host,
    path: document.location.pathname,
    hash: document.location.hash,
    search: document.location.search
}

function generateLink () {
    var link = getSearches().api;
    var keys = getSearches("keys");
    var values = getSearches("values");
    keys.forEach((v, i) => {
        if (v != "api") {
            link += "&" + v + "=" + values[i];
        }
    });
    return link;
}

function openLink (url, callback) {
    var xhr = new XMLHttpRequest();
    var a = xhr.open('GET', url, true);
    console.log("Connecting to: " + url);
    xhr.onload = function () {
        var response = {
            headers: xhr.getAllResponseHeaders(),
            type: xhr.getResponseHeader("content-type"),
            isJSON: xhr.getResponseHeader("content-type").includes("application/json")
        };
        if (xhr.status === 200) {
            console.log(xhr.response);
            callback(null, xhr.response, response);
        } else {
            console.log(xhr.response);
            callback(xhr.status, xhr.response, response);
        }
    };
    xhr.send();
}

function getSearches (type = "default") {
    var res = {};
    var tmp = d.search.slice(1, d.search.length).split("&").filter(i => i);
    tmp.forEach((v, i) => {
        var k = v.indexOf("=") >= 0 ? v.slice(0, v.indexOf("=")) : v;
        var v = v.indexOf("=") >= 0 ? v.slice(v.indexOf("=") + 1, v.length) : "";
        res[k] = v;
    });
    switch (type) {
        case "keys":
            res = Object.keys(res);
            break;

        case "values":
            var x = []
            tmp.forEach(v => {
                v = v.indexOf("=") >= 0 ? v.slice(v.indexOf("=") + 1, v.length) : "";
                x.push(v);
            });
            res = x;
            break;

        case "string":
            res = d.search.slice(1, d.search.length).split("&").filter(i => i);
            break;

        default:
            break;
    }
    return res;
}

function getHashes () {
    return d.hash.split("#").filter(i => i);
}

function getPath () {
    return d.path.split("/").filter(i => i);
}

function addElement (elementObj, tag = "head", first = false) {
    var loc = document.getElementsByTagName(tag)[0];
    first ? loc.insertBefore(elementObj, loc.firstChild) : loc.appendChild(elementObj);
    return;
}

function removeBodyChild (id) {
    document.body.removeChild(document.getElementById(id));
}

function getHashNSearch () {
    var r = [];
    getSearches("keys").forEach((v, i) => {
        r.push(v);
    });
    getHashes().forEach((v, i) => {
        r.push(v);
    });
    return r;
}