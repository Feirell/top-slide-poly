const STICKY_CLASS = 'pseudo-sticky';
const OVERWRITE_SUBSTITUTE = 'use-substitute';

addEventListener('DOMContentLoaded', () => {
    const overwriteSubstitute = document.location.hash == '#' + OVERWRITE_SUBSTITUTE;

    const supportSticky = CSS && typeof CSS.supports == 'function' && CSS.supports("position", "sticky");

    if (!overwriteSubstitute && supportSticky)
        return;

    document.body.classList.add('substitute-sticky');

    const allMatching = document.querySelectorAll('div');

    // reset all elements
    for (const elem of allMatching)
        elem.classList.remove(STICKY_CLASS);

    let viewportChanged = true;
    addEventListener('scroll', () => {
        viewportChanged = true;
    }, {
        passive: true
    });

    addEventListener('resize', () => {
        viewportChanged = true;
    }, {
        passive: true
    })

    const updateLoop = () => {
        if (viewportChanged) {
            viewportChanged = false;

            const containerHeight = window.innerHeight;
            const containerScrollY = window.scrollY;
            const stickyAfter = containerScrollY / containerHeight;

            let index = 0;

            for (const elem of allMatching) {
                const apply = index <= stickyAfter;
                elem.style.top = index * containerHeight + 'px';

                if (apply && allMatching.length - 1 != index)
                    elem.classList.add(STICKY_CLASS);
                else
                    elem.classList.remove(STICKY_CLASS);

                index++;
            }
        }

        requestAnimationFrame(updateLoop);
    }

    updateLoop();
})