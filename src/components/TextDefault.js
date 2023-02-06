import contexts from "../bootstrap-contexts";
import { capitalize } from "../utils";

export default (domc) => {
    const contexts_w_white = contexts.concat(["white"]);
    const textType = domc.getType("text");

    domc.addType("textDefault", {

        extend: "text",
        // Model definition
        
        model: {

            // Default properties
            defaults: {
                
                traits: [
                    // Text Color--------------------------------------------------
                    {
                        type: "class_select",
                        options: [
                            { value: "", name: "Default" },
                            ...contexts_w_white.map(function (v) {
                                return {
                                    value: "text-" + v,
                                    name: capitalize(v),
                                };
                            }),
                        ],
                        label: "Text color",
                    },

                    // Font Family --------------------------------------------------
                    {
                        type: "class_select",
                        options: [
                            { value: "", name: "Default" },
                            { value: "ff-primary", name: "fontFamily 1" },
                            { value: "ff-secondary", name: "fontFamily 2" },
                        ],
                        label: "Font Family",
                        name: "fontFamily",
                        changeProp: 1,
                    },
                    // Font Size --------------------------------------------------
                    {
                        type: "class_select",
                        options: [
                            { value: "", name: "None" },
                            { value: "fs-1", name: "1" },
                            { value: "fs-2", name: "2" },
                            { value: "fs-3", name: "3" },
                            { value: "fs-4", name: "4" },
                            { value: "fs-5", name: "5" },
                            { value: "fs-6", name: "6" },
                            { value: "small", name: "Small" },
                            { value: "lead", name: "Lead" },
                        ],
                        label: "Font Size",
                    },
                    ...textType.model.prototype.defaults.traits
                ]
            },
        },
    });
};
