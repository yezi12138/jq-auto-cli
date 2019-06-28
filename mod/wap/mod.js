/**
 * 请引入对应的css文件
 */
import '';

/**
 * rem 自适应不同宽度
 */
(function (baseFontSize) {
    let _baseFontSize = baseFontSize || 100;
    let ua = navigator.userAgent;
    let matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
    let isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
    let dpr = window.devicePixelRatio || 1;
    if (!isIos && !(matches && matches[1] > 534)) {
        // 如果非iOS, 非Android4.3以上, dpr设为1;
        dpr = 1;
    }
    let scale = 1 / dpr;
    let metaEl = document.querySelector('meta[name="viewport"]');
    if (!metaEl) {
        metaEl = document.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        window.document.head.appendChild(metaEl);
    }
    metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);

    document.documentElement.style.fontSize = document.documentElement.clientWidth / (750 / _baseFontSize) + 'px';
})();