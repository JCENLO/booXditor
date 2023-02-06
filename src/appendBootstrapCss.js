export const appendBootstrapCss = async (frame) => {
	console.log(frame, "frame");
	// console.log('appendBootstrapCss')

	// editor.Canvas.getConfig().styles.push('./main.css')

	// const baseStyle = await fetch("./main.css").then(res => res.text())

	// return {css,js};

	// async function setCss() {
	//     const baseStyle = await fetch("./css/style.css").then(res => res.text())

	//     const cssStyle = document.createElement("style");

	//     cssStyle.innerHTML = baseStyle;

	//     const doc = iframe.contentDocument;
	//     doc.head.appendChild(cssStyle)
	// }

	// console.log(options, "options----------");
	const iframe = frame.view.getEl();
	console.log(iframe.contentWindow , "iframe-------");

	if (!iframe) return;

	const { bootstrapCdn, plugins, config, cover } = options;

	const init = () => {
		iframe.contentWindow.bootstrap.config = config;
		console.log(iframe.contentWindow, "iframe.contentWindow 2");
	};

	const linkStyles = document.createElement("link");
	linkStyles.type = "text/css";
	linkStyles.rel = "stylesheet";
	// linkStyles.href = bootstrapCdn;
	// linkStyles.href = bootstrapCdn;
	// script.onload = init;

	const script = document.createElement("script");
	// script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js";
	script.src =  plugins.length ? `?plugins=${plugins.join()}` : "";
	script.onload = init;

	const cssStyle = document.createElement("style");
	cssStyle.innerHTML = variables;

	// checks iframe is ready before loading bootstrap CSS - issue with firefox
	const f = setInterval(() => {
		const doc = iframe.contentDocument;

		// console.log(doc.readyState, "doc--------");
		if (doc.readyState === "complete") {
			doc.head.appendChild(script);
			// doc.head.appendChild(linkStyles);
			doc.head.appendChild(cssStyle);
			clearInterval(f);
		}
	}, 100);
};