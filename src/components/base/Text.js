import fontIcon from "raw-loader!../../icons/font-solid.svg";

export const TextBlock = (bm, label) => {
    bm.add("text", {
        label: `
            ${fontIcon}
            <div>${label}</div>
        `,
        category: "Typography",
        content: {
            type: "text",
            content: "Insert your text here",
        },
    });
};

export default (domc) => {
    const defaultType = domc.getType("default");
    // const textDefaultType = domc.getType("textDefault");
    const textType = domc.getType("text");
    const model = textType.model;
    const view = textType.view;




    domc.addType("text", {
        extend: ["textDefault"],
        model: {
            isComponent(el) {
                if (el && el.dataset && el.dataset.bsText) {
                    console.log(el,el.dataset, el.sataset.bsText)
                    return { type: "text" };
                }
            },
            defaults: {
                ...model.prototype.defaults,
                tagName:  "div" ,
                droppable: true,
                editable: true,
                resizable: true,
                traits: [
                    ...defaultType.model.prototype.defaults.traits,
                    // ...textDefaultType.model.prototype.defaults.traits
                ]
            }
        },
        view: view
        // view: textView,
    });
};
