
import katex from 'katex';
import renderMathInElement from 'katex/dist/contrib/auto-render';

export function latexmathFilter() {
    return function(text: string, selector: string, enabled: boolean) {
        if (!enabled || typeof(katex) === "undefined") {
            return text;
        }
        if (text.indexOf("$$") != -1 || text.indexOf("\\[") != -1 || text.indexOf("\\(") != -1) {
            // contains math -> delayed rendering
            setTimeout(function() {
                var math = document.querySelector(selector) as HTMLElement;
                renderMathInElement(math, {
                    delimiters: [
                        {left: "$$", right: "$$", display: false},
                        {left: "\\[", right: "\\]", display: true},
                        {left: "\\(", right: "\\)", display: false}
                    ]
                });
            });
        }

        return text;
    };
}