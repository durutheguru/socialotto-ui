

(() => {
    const head = document.getElementsByTagName('head')[0];
    const cssnode = document.createElement('link');

    cssnode.type = 'text/css';
    cssnode.rel = 'stylesheet';
    cssnode.href = '/compiled/css/compile_000.css';

    head.appendChild(cssnode);
})();

