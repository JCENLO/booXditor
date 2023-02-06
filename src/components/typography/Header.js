import headingIcon from "raw-loader!../../icons/heading-solid.svg";

export const HeaderBlock = (bm, label) => {
    bm.add("header", {
        label: `
            ${headingIcon}
            <div>${label}</div>
        `,
        category: "Typography",
        content: {
            type: "header",
            content: "Bootstrap heading",
        },
    });
};

export default (domc) => {
    const textDefaultType = domc.getType("textDefault");
    const textType = domc.getType("text");
    const model = textType.model;
    const view = textType.view;

    domc.addType("header", {
        extend: "textDefault",

        isComponent: (el) => {
            if (
                el &&
                ["H1", "H2", "H3", "H4", "H5", "H6"].includes(el.tagName)
            ) {
                return { type: "header" };
            }
        },

        model: {
            defaults: {
                ...model.prototype.defaults,
                tagName: "h1",
                'custom-name': "Header",
                traits: [
                    {
                        type: "select",
                        options: [
                            { value: "h1", name: "One (largest)" },
                            { value: "h2", name: "Two" },
                            { value: "h3", name: "Three" },
                            { value: "h4", name: "Four" },
                            { value: "h5", name: "Five" },
                            { value: "h6", name: "Six (smallest)" },
                        ],
                        label: "Size",
                        name: "tagName",
                        changeProp: 1,
                    },
                    {
                        type: "class_select",
                        options: [
                            { value: "", name: "None" },
                            { value: "display-1", name: "One (largest)" },
                            { value: "display-2", name: "Two " },
                            { value: "display-3", name: "Three " },
                            { value: "display-4", name: "Four (smallest)" },
                        ],
                        label: "Display Heading",
                    },
                    ...textDefaultType.model.prototype.defaults.traits,
                ],
            },

            view: view
        },
    });
};
