let scriptTags = {};

export default {
    load: (url, callback) => {
        let scriptTag = document.querySelector(`script[src="${url}"]`);
        if(!scriptTag) {
            scriptTags[url] = [callback];
            scriptTag = document.createElement("script")
            document.body.appendChild(scriptTag)
            scriptTag.onload = () => {
                scriptTag.setAttribute("loaded", "true")
                scriptTags[url].map(fn => fn.call())
                scriptTags[url] = null;
            }
            scriptTag.src = url
        } else if(!scriptTag.hasAttribute("loaded")) {
            scriptTags[url] = [...scriptTags[url], callback];
        } else {
            callback();
        }
    }
}