chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === 'complete') {
			clearInterval(readyStateCheckInterval);
			onDocumentReady();
		}
	}, 10);
});

// list the windows to be created
const windows = [
	{
		icon: 'query_builder',
		name: 'Task queuing',
		childElement: createTaskQueuingElement(),
		boundingElement: null,
		element: null,
	},
	{
		icon: 'location_searching',
		name: 'Scrap finder',
		childElement: createScrapFinderElement(),
		boundingElement: null,
		element: null,
	},
	{
		icon: 'power_off',
		name: 'Inactive Player Finder',
		childElement: createInactivePlayerFinderElement(),
		boundingElement: null,
		element: null,
	},
	{
		icon: 'person',
		name: 'Extended player information',
		childElement: createExtendedPlayerInformationElement(),
		boundingElement: null,
		element: null,
	}
];

// when document is ready:
function onDocumentReady() {

	addMaterialIconStyles();

	const root = createRootElement();

	const toggles = [];

	// create the windows & toggles for it
	windows.forEach((window, i) => {
		const { name, icon, childElement } = window;
		const activateWindow = (windowElement) => {
			const highestZIndex = windows.reduce((a, w) => a > Number(w.element.style.zIndex) ? a : Number(w.element.style.zIndex), 0);
			if (!windowElement.style.zIndex || Number(windowElement.style.zIndex) < highestZIndex) {
				windowElement.style.zIndex = (highestZIndex + 1).toString();
			}
		};
		const windowEl = createDraggableWindowElement({
			id: `draggable-window-${i}`,
			name,
			boundingElement: root,
			childElement,
			onClickHandler: () => activateWindow(windowEl)
		});
		windows[i].boundingElement = root;
		windows[i].element = windowEl;
		toggles.push({ icon, window: windowEl, activateWindowHandler: () => activateWindow(windowEl) })
	});

	// actually create the toggle buttons
	const togglesEl = createWindowToggleButtonsElement({ toggles });
	root.appendChild(togglesEl);

	document.body.appendChild(root);

	// add the windows to the DOM and update the button status
	windows.forEach(window => {
		const windowEl = window.element;
		root.appendChild(windowEl);
		updateToggleButtonStatus({ windowId: windowEl.id });
	});

}

// make sure when resizing none of the windows are outside of the view
let lastKnownWidth = 0;
window.onresize = (event) => {
	const windowWidth = event.target.outerWidth;
	if (lastKnownWidth !== windowWidth) {
		lastKnownWidth = windowWidth;
		windows.forEach(window => {
			if (window.element && window.boundingElement) {
				keepWindowVisible(window)
			}
		})
	}

	function keepWindowVisible(window) {
		const { element, boundingElement } = window;
		const maxWidth = boundingElement.offsetWidth - element.offsetWidth ;
		const maxHeight = boundingElement.offsetHeight - element.offsetHeight - 19; // -19 because the footer height is 19px
		let X = element.offsetLeft;
		X = X < 0 ? 0 : X > maxWidth ? maxWidth : X;
		let Y = element.offsetTop;
		Y = Y < 0 ? 0 : Y > maxHeight ? maxHeight : Y;
		element.style.left = X + 'px';
		element.style.top = Y + 'px';
	}
};

function addMaterialIconStyles() {
	const materialIconStyles = document.createElement('link');
	materialIconStyles.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
	materialIconStyles.rel = 'stylesheet';
	document.head.appendChild(materialIconStyles);
}