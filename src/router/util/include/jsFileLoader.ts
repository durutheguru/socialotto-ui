
(() => {
    const vendorJS = document.createElement('script');
    vendorJS.setAttribute('src', '/compiled/js/compile_000.js');
    document.body.appendChild(vendorJS);

    document.body.addEventListener('mousewheel', (e) => {
        e.preventDefault();
    }, { passive: false });
})();
