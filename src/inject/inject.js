chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === 'complete') {
			clearInterval(readyStateCheckInterval);
			onDocumentReady();
		}
	}, 10);
});

function onDocumentReady() {

	addMaterialIconStyles();

	const root = createRootElement();

	// list the windows to be created
	const windows = [
		{
			icon: 'query_builder',
			name: 'Task que-er',
			childElement: document.createElement('div')
		},
		{
			icon: 'location_searching',
			name: 'Scrap finder',
			childElement: document.createElement('div')
		},
		{
			icon: 'power_off',
			name: 'Inactive Player Tracker',
			childElement: document.createElement('div')
		},
		{
			icon: 'person',
			name: 'Extended player information',
			childElement: document.createElement('div')
		}
	];

	const toggles = [];

	// create the windows & toggles for it
	windows.forEach((window, i) => {
		const { name, icon, childElement } = window;
		const windowEl = createDraggableWindowElement({
			id: `draggable-window-${i}`,
			name,
			boundingElement: root,
			childElement,
		});
		windows[i].element = windowEl;
		toggles.push({ icon, window: windowEl })
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
