
(() => {
    const vendorJS = document.createElement('script');
    vendorJS.setAttribute('src', '/compiled/js/compile_000.js');
    document.body.appendChild(vendorJS);


    window.addEventListener('wheel', (e) => {
        // e.preventDefault();
        // this.mousewheel.bind(this)
        // console.log('Mouse Wheeling...');
    }, { passive: true });


})();


