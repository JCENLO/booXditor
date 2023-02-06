import contexts from "../../bootstrap-contexts";
import exclamationIcon from "raw-loader!../../icons/exclamation-triangle-solid.svg";
import { capitalize } from "../../utils";

export const AlertBlock = (bm, label) => {
    bm.add("alert", {
        label: `
            ${exclamationIcon}
            <div>${label}</div>
        `,
        category: "Components",
        content: {
            type: "alert",
            content: "This is an alert—check it out!",
        },
    });
};

export default (domc) => {
    const textType = domc.getType("text");
    const model = textType.model;
    const view = textType.view;

    domc.addType("alert", {

        extend: "text",

        isComponent(el) {
            if (el && el.classList && el.classList.contains("alert")) {
                return { type: "alert" };
            }
        },

        model: {
            defaults: {
                ...model.prototype.defaults,
                tagName: "div",
                'custom-name': 'Alert',
                classes: ["alert"],
                traits: [
                    {
                        type: "class_select",
                        options: [
                            { value: "", name: "None" },
                            ...contexts.map(function (v) {
                                return {
                                    value: "alert-" + v,
                                    name: capitalize(v),
                                };
                            }),
                        ],
                        label: "Context",
                    },

                    {
                        type: "button",
                        // ...
                        text: "Custom",
                        full: true, // Full width button
                        command: (editor) => alert("Hello"),
                        // or you can just specify the Command ID
                        command: "some-command",
                    },
                    // ...textType.model.prototype.defaults.traits,
                    //TODO: add traits for dismissible, fade, etc.
                ],
            },
        },
        view: textType.view,
    });
};
