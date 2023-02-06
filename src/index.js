import loadComponents from "./components";
import loadBlocks from "./blocks";
import loadTraits from "./traits";
import loadDevices from "./devices";
import { loadCss } from "./loadCssEditor";
import loadCommands from "./commands";
import en from "./locale/en";
import { default_blocks } from "./config/defaultBlock";
import { default_labels } from "./config/defaultLabels";
import  {variables}  from "./cssThemeVars";
import "./scss/main.scss";
import { appendBootstrapCss } from "./appendBootstrapCss";
// import "./main.css";

export default (editor, opts = {}) => {
    window.editor = editor;

    // console.log(rootDir, url, "root---------->");
    

    // console.log(variables, "variables");
    // console.log(rootDir, "rootDir---------");
    const opts_blocks = opts.blocks || {};
    const opts_labels = opts.labels || {};
    const opts_categories = opts.blockCategories || {};
    delete opts["blocks"];
    delete opts["labels"];
    delete opts["blockCategories"];

    const default_categories = {
        layout: true,
        media: true,
        components: true,
        typography: true,
        basic: true,
        forms: true,
    };

    let jsonVars = variables;
    const options = {
        ...{
            i18n: {},
            blocks: Object.assign(default_blocks, opts_blocks),
            labels: Object.assign(default_labels, opts_labels),
            blockCategories: Object.assign(default_categories, opts_categories),
            optionsStringSeparator: "::",
            gridDevices: true,
            gridDevicesPanel: false,
            // bootstrapCdn: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js",
            plugins: [],
            config: {},

            variables: variables,
        },
        ...opts,
    };

    editor.config.pluginsOpts["booXditor"] = options;
    // Load the language file
    loadCommands(editor, options);

    // Load Traits
    loadTraits(editor, options);


    // Load Devices
    loadDevices(editor, options);

    // Add components
    loadComponents(editor, options);

    // Add blocks
    loadBlocks(editor, options);

    // Load i18n files
    editor.I18n &&
        editor.I18n.addMessages({
            en,
            ...options.i18n,
        });

    // Load CSS

    loadCss(editor);

    // editor.addStyle(jsonVars);
    // console.log(jsonVars, "jsonVars");

    // appendBootstrapCss(options);

    // appendBootstrapCss(editor, options);
    const appendBootstrapCss = async (frame) => {
        console.log(frame, "frame");
        
        const iframe = frame.view.getEl();
        console.log(iframe.contentWindow, "iframe-------");

        if (!iframe) return;

        const { bootstrapCdn, plugins, config, cover } = options;

        const init = () => {
            iframe.contentWindow.bootstrap.config = config;
            console.log(iframe.contentWindow, "iframe.contentWindow 2");
        };

        // const linkStyles = document.createElement("link");
        // linkStyles.type = "text/css";
        // linkStyles.rel = "stylesheet";
        // linkStyles.href = bootstrapCdn;
        // linkStyles.href = bootstrapCdn;
        // script.onload = init;

        const script = document.createElement("script");
        // script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js";
        script.src = plugins.length ? `?plugins=${plugins.join()}` : "";
        script.onload = init;

        // set the iframe's document head
        // const cssStyle = document.createElement("style");
        // cssStyle.innerHTML = variables;

        // checks iframe is ready before loading bootstrap CSS - issue with firefox
        const f = setInterval(() => {
            const doc = iframe.contentDocument;

            // console.log(doc.readyState, "doc--------");
            if (doc.readyState === "complete") {
                doc.head.appendChild(script);
                // doc.head.appendChild(linkStyles);
                // doc.head.appendChild(cssStyle);
                clearInterval(f);
            }
        }, 100);
    };
    // editor.Canvas.getConfig().styles.push('')

    // editor.Config.canvasCss += jsonVars;
    // editor.Canvas.getConfig().scripts.push(
    //     "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"
    // );
    // editor.Canvas.getConfig().styles.push(
    //     "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
    // );
    editor.Canvas.getModel()["on"]("change:frames", (m, frames) => {
        frames.forEach((frame) =>
            frame.once("loaded", () => appendBootstrapCss(frame))
        );
    });
};
