import contexts from "../../bootstrap-contexts";
import certificateIcon from "raw-loader!../../icons/certificate-solid.svg";
import { capitalize } from "../../utils";

export const BadgeBlock = (bm, label) => {
    bm.add("badge", {
        label: `
            ${certificateIcon}
            <div>${label}</div>
        `,
        category: "Components",
        content: {
            type: "badge",
            content: "New!",
        },
    });
};

export default (domc) => {
    const textType = domc.getType("text");
    const textModel = textType.model;
    const textView = textType.view;

    domc.addType("badge", {
        isComponent(el) {
            if (el && el.classList && el.classList.contains("badge")) {
                return { type: "badge" };
            }
        },
        model: {
            defaults: {
                tagName: "span",
                "custom-name": "Badge",
                classes: ["badge"],
                traits: [
                    {
                        type: "class_select",
                        options: [
                            { value: "", name: "None" },
                            ...contexts.map(function (v) {
                                return {
                                    value: "badge-" + v,
                                    name: capitalize(v),
                                };
                            }),
                        ],
                        label: "Context",
                    },
                    {
                        type: "class_select",
                        options: [
                            { value: "", name: "Default" },
                            { value: "badge-pill", name: "Pill" },
                        ],
                        label: "Shape",
                    },
                    ...textModel.prototype.defaults.traits,
                ],
            },
        },
        view: textView,
    });
};
