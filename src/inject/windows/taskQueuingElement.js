
function createTaskQueuingElement() {

    /* TODO: move to localStorage */
    const currentTasks = [
        {
            type: 1,
            category: 'resources',
            planetId: 33624249,
            status: 'Waiting for resources'
        },
        {
            type: 1,
            category: 'resources',
            planetId: 33624677,
            status: 'Waiting for other task to finish'
        }
    ];

    /* TODO: move to localStorage */
    const tasks = [
        {
            type: 1,
            category: 'resources',
            planetId: 33624249
        },
        {
            type: 1,
            category: 'resources',
            planetId: 33624249
        },
        {
            type: 2,
            category: 'resources',
            planetId: 33624249
        },
        {
            type: 3,
            category: 'resources',
            planetId: 33624249
        },
        {
            type: 4,
            category: 'resources',
            planetId: 33624677
        },
        {
            type: 12,
            category: 'resources',
            planetId: 33624249
        },
        {
            type: 212,
            category: 'resources',
            planetId: 33624677,
            amount: 222
        },
        {
            type: 33,
            category: 'station',
            planetId: 33624249
        }
    ];

    /* TODO: finish list */
    const buildings = {
        resources: [
            {
                id: 'button1',
                type: 1,
                name: 'Metaalmijn',
                imagePosition: 0,
            },
            {
                id: 'button2',
                type: 2,
                name: 'Kristalmijn',
                imagePosition: 1,
            },
            {
                id: 'button3',
                type: 3,
                name: 'Deuteriumfabriek',
                imagePosition: 2,
            },
            {
                id: 'button4',
                type: 4,
                name: 'Zonne-energiecentrale',
                imagePosition: 3,
            },
            {
                id: 'button5',
                type: 12,
                name: 'Fusiecentrale',
                imagePosition: 4,
            },
            {
                id: 'button6',
                type: 212,
                name: 'Zonne-energiesatelliet',
                hasAmount: true,
                imagePosition: 5,
            },
            {
                id: 'button7',
                type: 22,
                name: 'Metaalopslag',
                imagePosition: 6,
            },
            {
                id: 'button8',
                type: 23,
                name: 'Kristalopslag',
                imagePosition: 7,
            },
            {
                id: 'button9',
                type: 24,
                name: 'Deuteriumtank',
                imagePosition: 8,
            }
        ],
        station: [
            {
                id: 'button0',
                type: 14,
                name: 'Robotfabriek',
                imagePosition: 0,
            },
            {
                id: 'button1',
                type: 21,
                name: 'Werf',
                imagePosition: 1,
            },
            {
                id: 'button2',
                type: 31,
                name: 'Onderzoekslab',
                imagePosition: 2,
            },
            {
                id: 'button3',
                type: 34,
                name: 'Alliantiehangar',
                imagePosition: 3,
            },
            {
                id: 'button4',
                type: 44,
                name: 'Raketsilo',
                imagePosition: 4,
            },
            {
                id: 'button5',
                type: 15,
                name: 'Nanorobotfabriek',
                imagePosition: 5,
            },
            {
                id: 'button6',
                type: 33,
                name: 'Terravormer',
                imagePosition: 6,
            },
            {
                id: 'button7',
                type: 36,
                name: 'Ruimtewerf',
                imagePosition: 10,
            }
        ],
        research: {

        },
        shipyard: {

        },
        defense: {

        },
    };
    const imageBackgroundWidth =  {
        resources: 2400,
        station: 2200,
        research: 3200,
        shipyard: 2800,
        defense: 2000,
    };

    const planetListEl = document.body.querySelector('#planetList');
    const planets = !planetListEl ? [] : Array(...planetListEl.children).reduce((acc, el) => {
        return [...acc, {
            id: Number(el.id.substr(7)),
            name: el.querySelector('.planet-name').innerText
        }]
    }, []);

    const contentEl = createWindow({
        innerHTML: createHtmlTemplate()
    });
    return contentEl;

    function createWindow(options = {}) {
        const { innerHTML } = options;
        const el = document.createElement('div');
        el.id = 'TASK_QUE';
        el.innerHTML = innerHTML;
        return el
    }

    function createHtmlTemplate() {

        return `
            <div class="title">Currently trying</div>
            
            ${currentTaskTemplate()}

            <div class="title">Current que</div>
            
            ${currentQueTemplate()}
            
            <div class="title">Add to que</div>
            
            ${addToQueTemplate()}
        `;

        function getTaskStyles(task) {
            const { type, category, planetId, amount, status } = task;
            const { id, name, imagePosition } = buildings[category].find(building => building.type === type);
            const imageUrl = `chrome-extension://${chrome.runtime.id}/images/${category}.jpg`;
            const size = 60;
            const divider = 200 / size;
            const backgroundPosition = imagePosition === 0 ? '0' : `-${imagePosition * 200 / divider}px`;
            return `
                background-image: url(${imageUrl});
                background-position: ${backgroundPosition} 0;
                background-size: ${imageBackgroundWidth[category] / divider}px;
                width: ${size}px;
                height: ${size}px;
            `;
        }

        function currentTaskTemplate() {
            let template = '';
            currentTasks.forEach(task => {
                const { type, category, planetId, amount, status } = task;
                const { id, name, imagePosition } = buildings[category].find(building => building.type === type);

                template += `
                    <div class="task">
                        <div class="image" style="${getTaskStyles(task)}"></div>
                        <div class="content">
                            <span class="title">${name}</span>
                            <span class="task">
                                ${amount ? `build ${amount}` : 'upgrade'}
                            </span>
                            <span>
                                <div class="planet"></div> ${planets.find(p => p.id === planetId).name}
                            </span>
                            <span class="status">
                                status: ${status}
                            </span>
                            <div class="actions">
                                <div class="delete">
                                    <i class="material-icons">delete</i>
                                </div>
                                <div>
                                    <i class="material-icons">file_copy</i>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            return template
        }
        function currentQueTemplate() {
            let template = '';
            tasks.forEach(task => {
                const { type, category, planetId, amount } = task;
                const { id, name, imagePosition } = buildings[category].find(building => building.type === type);

                template += `
                    <div class="task">
                        <div class="image" style="${getTaskStyles(task)}"></div>
                        <div class="content">
                            <span class="title">${name}</span>
                            <span class="task">
                                ${amount ? `build ${amount}` : 'upgrade'}
                            </span>
                            <span>
                                <div class="planet"></div> ${planets.find(p => p.id === planetId).name}
                            </span>
                            <div class="actions">
                                <div class="delete">
                                    <i class="material-icons">delete</i>
                                </div>
                                <div>
                                    <i class="material-icons">file_copy</i>
                                </div>
                                <div>
                                    <i class="material-icons">keyboard_arrow_up</i>
                                    <i class="material-icons">keyboard_arrow_down</i>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });

            return template
        }
        function addToQueTemplate() {

            // currently selected planet:
            // document.head.querySelector('meta[name="ogame-planet-id"]').content

            // the id is from the outer <li> with a class off 'on', 'off' or 'disabled' (off is when you can't yet) (disabled is when you have to wait for something)


            // Object.keys(buildings).forEach(category => {
            //     template += `
            //
            //     `;
            // });

            return `
                <div class="category">
                    <div class="title">title</div>
                    <div class="item">item</div>
                    <div class="item">item</div>
                    <div class="item">item</div>
                    <div class="item">item</div>
                    <div class="item">item</div>
                </div>
                <div class="category">
                    <div class="title">title</div>
                    <div class="item">item</div>
                    <div class="item">item</div>
                    <div class="item">item</div>
                    <div class="item">item</div>
                    <div class="item">item</div>
                </div>
                <div class="category">
                    <div class="title">title</div>
                    <div class="item">item</div>
                    <div class="item">item</div>
                    <div class="item">item</div>
                    <div class="item">item</div>
                    <div class="item">item</div>
                </div>
                <div class="category">
                    <div class="title">title</div>
                    <div class="item">item</div>
                    <div class="item">item</div>
                    <div class="item">item</div>
                    <div class="item">item</div>
                    <div class="item">item</div>
                </div>
                <div class="category">
                    <div class="title">title</div>
                    <div class="item">item</div>
                    <div class="item">item</div>
                    <div class="item">item</div>
                    <div class="item">item</div>
                    <div class="item">item</div>
                </div>
                <div class="category">
                    <div class="title">title</div>
                    <div class="item">item</div>
                    <div class="item">item</div>
                    <div class="item">item</div>
                    <div class="item">item</div>
                    <div class="item">item</div>
                </div>
            `;
        }
    }
}