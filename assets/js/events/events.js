export const registerListener  = (e, f) => {
    if(window.addEventListener) {
        window.addEventListener(e, f)
    } else {
        window.attachEvent("on" + e, f)
    }
}

export const unRegisterListener  = (e, f) => {
    if(window.removeEventListener) {
        window.removeEventListener(e, f)
    } else {
        window.detachEvent("on" + e, f)
    }
}

export const onCSSTransitionEnd = (target,  callback) => {
    let s = document.body || document.documentElement;
        s = s.style;
    let prefixTransition = "";
    let prefixAnimation = "";
    let runOnce;

    if( s.WebkitAnimation == "" )	prefixAnimation	 = "-webkit-";
    if( s.MozAnimation == "" )		prefixAnimation	 = "-moz-";
    if( s.OAnimation == "" )		prefixAnimation	 = "-o-";

    if( s.WebkitTransition == "" )	prefixTransition = "-webkit-";
    if( s.MozTransition == "" )		prefixTransition = "-moz-";
    if( s.OTransition == "" )		prefixTransition = "-o-";
    
    runOnce = (e) => { callback(); e.target.removeEventListener( e.type, runOnce ); };
    target.addEventListener( 'webkitTransitionEnd', runOnce );
    target.addEventListener( 'mozTransitionEnd', runOnce );
    target.addEventListener( 'oTransitionEnd', runOnce );
    target.addEventListener( 'transitionend', runOnce );
    target.addEventListener( 'transitionend', runOnce );
    if( ( prefixTransition == '' && !( 'transition' in s ) ) || getComputedStyle( target )[ prefixTransition + 'transition-duration' ] == '0s' ) callback();
}

export const inViewPort = (el, adjustment) => {
    let r = el.getBoundingClientRect();
    //adjustment use in case element has scaled using transform:scale
    adjustment = adjustment || 0;
    return (
        r.bottom + adjustment >= 0 &&
        r.right + adjustment >= 0 &&
        r.top - adjustment <= (window.innerHeight || document.documentElement.clientHeight) &&
        r.left - adjustment <= (window.innerWidth || document.documentElement.clientWidth)
    )
}

export const aboveViewPort = el => {
    let r = el.getBoundingClientRect();
    return (
        r.bottom <= 0 &&
        r.right >= 0 &&
        r.left <= (window.innerWidth || document.documentElement.clientWidth)
    )
}

export default {
    registerListener,
    unRegisterListener, 
    inViewPort,
    aboveViewPort,
    onCSSTransitionEnd
}