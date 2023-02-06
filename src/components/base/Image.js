import imageIcon from "raw-loader!../../icons/image-solid.svg";

export const ImageBlock = (bm, label) => {
    bm.add("bs-image", {
        label: `
            ${imageIcon}
            <div>${label}</div>
        `,
        category: "Media",
        content: {
            type: "image",
        },
    });
};

export default (domComponent) => {
    const img_src_default = "https://dummyimage.com/200x200/999/222";
    const imageType = domComponent.getType("image");
    const model = imageType.model;
    // const view = imageType.view;

    const type = "image";

    domComponent.addType(type, {
        extend: "image",

        isComponent: function (el) {
            if (el && el.tagName === "IMG") {
                return { type: type };
            }
        },

        model: {
            defaults: {
                ...model.prototype.defaults,
                tagName: "img",
                'custom-name': "Image",
                resizable: 1,
                attributes: {
                    src: img_src_default,
                },
                classes: ["img-fluid"],
                traits: [
                    {
                        type: "text",
                        label: "Source (URL)",
                        name: "src",
                    },

                    ...model.prototype.defaults.traits,
                ],
            },

        },

    });
};
