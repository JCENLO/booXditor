import paragraphIcon from "raw-loader!../../icons/paragraph-solid.svg";

export const ParagraphBlock = (bm, label) => {
    bm.add("paragraph", {
        label: `
            ${paragraphIcon}
            <div>${label}</div>
        `,
        category: "Typography",
        content: {
            type: "paragraph",
            content:
                "Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.",
        },
    });
};

export default (domc) => {
    const textDefaultType = domc.getType("textDefault");
    const textType = domc.getType("text");
    const model = textType.model;
    const view = textType.view;

    domc.addType("paragraph", {

        isComponent(el) {
            if (el && el.tagName && el.tagName === "P") {
                return { type: "paragraph" };
            }
        },

        model: {
            defaults: {
                ...model.prototype.defaults,
                tagName: "p",
                traits: [
                    {
                        type: "class_select",
                        options: [
                            { value: "", name: "No" },
                            { value: "lead", name: "Yes" },
                        ],
                        label: "Lead?",
                    },
                    ...textDefaultType.model.prototype.defaults.traits
                ]
            }
        },
        view: view
    });
};
