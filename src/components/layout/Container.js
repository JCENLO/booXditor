import windowIcon from "raw-loader!../../icons/window-maximize-solid.svg";

export const ContainerBlock = (bm, label) => {
    bm.add("container").set({
        label: `
            ${windowIcon}
            <div>${label}</div>
        `,
        category: "Layout",
        content: {
            type: "container",
            classes: ["container"],
        },
    });
};

export default (domc) => {
    const defaultType = domc.getType("default");
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;

    domc.addType("container", {

        extend: "default",
        isComponent(el) {
            if (
                el &&
                el.classList &&
                (el.classList.contains("container") ||
                el.classList.contains("container-fluid"))
            ) {
                return { type: "container" };
            }
        },
        model: {
            defaults: {
                ...defaultModel.prototype.defaults,
                tagName: "div",
                "custom-name": "Container",
                droppable: true,
                traits: [
                    {
                        type: "class_select",
                        options: [
                            { value: "container", name: "Fixed" },
                            { value: "container-fluid", name: "Fluid" },
                        ],
                        label: "Container",
                    },
                    ...defaultModel.prototype.defaults.traits,
                ],
            },

            view: defaultView,
        },
    });
};
