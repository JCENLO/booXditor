import windowIcon from "raw-loader!../../icons/window-maximize-solid.svg";

export const RowBlock = (bm, label) => {
    bm.add("row").set({
        label: `
            ${windowIcon}
            <div>${label}</div>
        `,
        category: "Layout",
        content: {
            type: "row",
            classes: ["row"],
        },
    });
};

export default (domc) => {
    const defaultType = domc.getType("default");
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;

    domc.addType("row", {
        isComponent(el) {
            if (el && el.classList && el.classList.contains("row")) {
                return { type: "row" };
            }
        },
        model: {
            defaults: {
                ...defaultModel.prototype.defaults, // Copy the defaults from the default type
                tagName: "div",
                "custom-name": "Row",
                draggable: ".container, .container-fluid",
                droppable: true,
                traits: [
                    {
                        type: "class_select",
                        options: [
                            { value: "", name: "Yes" },
                            { value: "no-gutters", name: "No" },
                        ],
                        label: "Gutters?",
                    },
                    ...defaultModel.prototype.defaults.traits,
                ],
            },
        },
        view: defaultView,
    });
};
