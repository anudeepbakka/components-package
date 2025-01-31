import _ from 'lodash';


export default function OffcanvasHandler(action, id, offcanvas, params = {}) {
    const data = params || {};
    let arr;

    switch (action) {
        case 'show':
            // Add new offcanvas while preserving existing ones
            arr = [...offcanvas, { id, offset: 0, data }];
            break;

        case 'dismiss':
            // Remove specific offcanvas by id
            arr = offcanvas.filter(item => item.id !== id);
            break;

        case 'dismissAll':
            // Clear all offcanvas elements
            arr = [];
            break;

        default:
            arr = [...offcanvas];
    }

    // Ensure unique IDs, maintaining the most recent occurrence
    arr = _.reverse(_.uniqBy(_.reverse([...arr]), 'id'));

    // Calculate cascading offsets (60px per level from bottom)
    arr.forEach((item, index, array) => {
        item.offset = (array.length - 1 - index) * 80;
    });

    // Manage page mask for overlay effect
    if (arr.length > 0) {
        const pageMaskElem = document.getElementById('pageMask');
        if (!pageMaskElem) {
            const overlayDiv = document.getElementById('overlay');
            if (overlayDiv) {
                overlayDiv.insertAdjacentHTML('beforeend', "<div id='pageMask'></div>");
            }
        }
    } else {
        document.getElementById('pageMask')?.remove();
    }

    return arr;
}