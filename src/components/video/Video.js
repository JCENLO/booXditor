import videoIcon from "raw-loader!../../icons/youtube-brands.svg";

export const VideoBlock = (bm, label) => {
    bm.add("bs-video", {
        label: `
            ${videoIcon}
            <div>${label}</div>
        `,
        category: "Media",
        content: {
            type: "bs-video",
        },
    });
};

export default (domc) => {
    const videoType = domc.getType("video");
    const model = videoType.model;
    const view = videoType.view;
    const type = "bs-embed-responsive";

    domc.addType(type, {
        extend: "video",
        isComponent: (el) => {
            if (el.tagName === "embed-responsive-item") {
                // You should explicitly declare the type of your resultant
                // object, otherwise the `default` one will be used
                const result = {
                    provider: "so",
                    type: type,
                };

                var isYtProv = /youtube\.com\/embed/.test(el.src);
                var isYtncProv = /youtube-nocookie\.com\/embed/.test(el.src);
                var isViProv = /player\.vimeo\.com\/video/.test(el.src);
                var isExtProv = isYtProv || isYtncProv || isViProv;
                if (
                    el.tagName == "VIDEO" ||
                    (el.tagName == "IFRAME" && isExtProv)
                ) {
                    if (el.src) result.src = el.src;
                    if (isExtProv) {
                        if (isYtProv) result.provider = "yt";
                        else if (isYtncProv) result.provider = "ytnc";
                        else if (isViProv) result.provider = "vi";
                    }
                }
                return result;
            }
        },

        model: {
            defaults: {
                ...model.prototype.defaults,
                tagName: "Video",
                'custom-name': 'Video',
                resizable: false,
                droppable: false,
                draggable: false,
                copyable: false,
                provider: "so",
                classes: ["embed-responsive-item"],
            },
        },
        view: view,
    });
};
