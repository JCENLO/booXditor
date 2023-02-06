import { defaultCss } from "./config/defaultCss";
import { editorControlCss } from "./config/defaultEditorControll";
import {variables} from "./cssThemeVars";

export const loadCss = (editor) => {


    editor.onReady(() => {

        editor.setStyle(variables);
        editor.Css.addRules(defaultCss());
        // console.log(addedRules.map(rule => rule.toCSS()));x
        // Check rules
    });
    // Editor config layout
    editor.Config.protectedCss += editorControlCss();
};
