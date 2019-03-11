
function createRootElement() {
    const root = document.createElement('div');
    root.id = 'OGAME_EXTENTION';
    return root
}

function updateToggleButtonStatus(options) {
    const { windowId } = options;
    const isActive = document.getElementById(windowId).style.display !== 'none';
    const btn = document.getElementById(`toggle-${windowId}`);
    if (isActive) {
        btn.classList.add('active');
    } else {
        btn.classList.remove('active');
    }
}

function createWindowToggleButtonsElement(options = {}) {
    let { toggles } = options;
    if (!toggles) {
        toggles = [];
    }
    const togglesEl = document.createElement('div');
    togglesEl.className = 'toggles';
    toggles.forEach(toggle => {
        const { icon, window, activateWindowHandler } = toggle;
        const btn = document.createElement('button');
        btn.id = `toggle-${window.id}`;
        btn.onclick = () => {
            toggleElementVisibility({ element: window });
            updateToggleButtonStatus({ windowId: window.id });
            activateWindowHandler()
        };
        btn.innerHTML = `<i class="material-icons">${icon}</i>`;
        togglesEl.appendChild(btn);
    });
    return togglesEl
}

function createDraggableWindowElement(options = {}) {
    const {
        id,
        name,
        boundingElement,
        childElement,
        onClickHandler
    } = options;

    const windowEl = document.createElement('div');
    windowEl.className = 'window';
    windowEl.id = id;
    windowEl.style.display = 'none';
    windowEl.onclick = onClickHandler;
    const windowHeaderEl = createHeaderElement({ windowEl });
    windowEl.appendChild(windowHeaderEl);
    windowEl.appendChild(childElement);

    // make element draggable
    dragElement({
        element: windowEl,
        boundingElement
    });

    return windowEl;

    function createHeaderElement() {
        const windowHeaderEl = document.createElement('div');
        windowHeaderEl.className = 'header';

        const headerTitleEl = createTitleElement();
        const minimizeButtonEl = createMinimizeButton();
        const opacitizeButtonEl = createOpacitizeButton();
        windowHeaderEl.appendChild(headerTitleEl);

        const rightDiv = document.createElement('div');
        rightDiv.classList.add('button-container');
        rightDiv.appendChild(opacitizeButtonEl);
        rightDiv.appendChild(minimizeButtonEl);
        windowHeaderEl.appendChild(rightDiv);

        return windowHeaderEl;

        function createTitleElement() {
            const titleEl = document.createElement('span');
            titleEl.className = 'title';
            titleEl.innerText = name;
            return titleEl;
        }
        function createOpacitizeButton() {
            const button = document.createElement('button');
            button.className = 'opacitize';
            button.innerText = '*';
            button.onclick = () => {
                toggleElementOpacity({ element: windowEl });
                updateToggleButtonStatus({ windowId: windowEl.id });
            };
            return button;
        }
        function createMinimizeButton() {
            const button = document.createElement('button');
            button.className = 'minimize';
            button.innerText = 'x';
            button.onclick = () => {
                toggleElementVisibility({ element: windowEl });
                updateToggleButtonStatus({ windowId: windowEl.id });
            };
            return button;
        }
    }
}

function toggleElementOpacity(options = {}) {
    const { element } = options;

    if (element.style.backgroundColor.includes('rgba')) {
        element.style.backgroundColor = null
    } else {
        element.style.backgroundColor = 'rgba(0,0,0,.5)'
    }
}

function toggleElementVisibility(options = {}) {
    const { element } = options;
    if (element.style.display === 'none') {
        element.style.display = 'block'
    } else {
        element.style.display = 'none'
    }
}

function dragElement(options = {}) {
    const {
        element,
        boundingElement
    } = options;

    let pos1 = 0;
    let pos2 = 0;
    let pos3 = 0;
    let pos4 = 0;

    if (element.getElementsByClassName('header').length) {
        // if present, the header is where you move the DIV from:
        element.getElementsByClassName('header')[0].onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        element.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:

        const maxWidth = boundingElement.offsetWidth - element.offsetWidth ;
        const maxHeight = boundingElement.offsetHeight - element.offsetHeight - 19; // -19 because the footer height is 19px

        let X = element.offsetLeft - pos1;
        X = X < 0 ? 0 : X > maxWidth ? maxWidth : X;
        let Y = element.offsetTop - pos2;
        Y = Y < 0 ? 0 : Y > maxHeight ? maxHeight : Y;

        element.style.left = X + 'px';
        element.style.top = Y + 'px';
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}