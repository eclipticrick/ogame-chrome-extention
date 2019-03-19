
function createTaskQueuingElement() {
    const buildings = {
        resources: [
            {
                id: 'button1',
                type: 1,
                name: 'Metaalmijn',
                imagePosition: '0 0',
            },
            {
                id: 'button2',
                type: 2,
                name: 'Kristalmijn',
                imagePosition: '-200px 0',
            },
            {
                id: 'button3',
                type: 3,
                name: 'Deuteriumfabriek',
                imagePosition: '-400px 0',
            },
            {
                id: 'button4',
                type: 4,
                name: 'Zonne-energiecentrale',
                imagePosition: '-600px 0',
            },
            {
                id: 'button5',
                type: 12,
                name: 'Fusiecentrale',
                imagePosition: '-800px 0',
            },
            {
                id: 'button6',
                type: 212,
                name: 'Zonne-energiesatelliet',
                hasAmount: true,
                imagePosition: '-1000px 0',
            },
            {
                id: 'button7',
                type: 22,
                name: 'Metaalopslag',
                imagePosition: '-1200px 0',
            },
            {
                id: 'button8',
                type: 23,
                name: 'Kristalopslag',
                imagePosition: '-1400px 0',
            },
            {
                id: 'button9',
                type: 24,
                name: 'Deuteriumtank',
                imagePosition: '-1600px 0',
            }
        ],
        station: [
            {
                id: 'button0',
                type: 14,
                name: 'Robotfabriek',
                imagePosition: '0 0',
            },
            {
                id: 'button1',
                type: 21,
                name: 'Werf',
                imagePosition: '-200px 0',
            },
            {
                id: 'button2',
                type: 31,
                name: 'Onderzoekslab',
                imagePosition: '-400px 0',
            },
            {
                id: 'button3',
                type: 34,
                name: 'Alliantiehangar',
                imagePosition: '-600px 0',
            },
            {
                id: 'button4',
                type: 44,
                name: 'Raketsilo',
                imagePosition: '-800px 0',
            },
            {
                id: 'button5',
                type: 15,
                name: 'Nanorobotfabriek',
                imagePosition: '-1000px 0',
            },
            {
                id: 'button6',
                type: 33,
                name: 'Terravormer',
                imagePosition: '-1200px 0',
            },
            {
                id: 'button7',
                type: 36,
                name: 'Ruimtewerf',
                imagePosition: '-2000px 0',
            }
        ],
        research: {

        },
        shipyard: {

        },
        defense: {

        },
    };

    const contentEl = createWindow({
        innerHTML: createHtmlTemplate()
    });
    // let token = document.querySelector("input[name=token]");
    // console.log('token', token ? token.value : token);
    // pages.forEach(page => {
    //     console.log('getting page', window.location.hostname + window.location.pathname + '?page=' + page);
    //     const xhr = new XMLHttpRequest();
    //     xhr.onload = function(){
    //         const doc = this.responseXML;
    //         console.log('responseURL', this.responseURL);
    //         console.log('loaded document:', doc.body.id, doc);
    //         if (doc.body.id !== 'overview') {
    //             console.log(doc.querySelector('span.time') ? `something is already upgrading on page ${page}` : `nothing is upgrading on page ${page} yet`);
    //             doc.querySelectorAll('li.on').forEach(el => {
    //                 console.log('on:', el)
    //             });
    //             doc.querySelectorAll('li.off').forEach(el => {
    //                 console.log('off:', el)
    //             });
    //             doc.querySelectorAll('li.disabled').forEach(el => {
    //                 console.log('disabled:', el)
    //             });
    //         }
    //     };
    //     xhr.open('POST', window.location.hostname + window.location.pathname + '?page=' + page + "&deprecated=1");
    //     // xhr.withCredentials = true;
    //     xhr.responseType = 'document';
    //     xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //     xhr.send("token=" + token);
    //     // request.send("token=" + token + "&modus=1&type=" + type + "&menge=" + number);
    // });

    // setTimeout(() => {
    //     const xhr = new XMLHttpRequest();
    //     xhr.onload = function(){
    //         const doc = this.responseXML;
    //         console.log(doc.querySelector('span.time') ? 'is already upgrading something on this page' : 'is not upgrading something on this page yet');
    //         doc.querySelectorAll('li.on').forEach(el => {
    //             console.log('on:', el)
    //         });
    //         doc.querySelectorAll('li.off').forEach(el => {
    //             console.log('off:', el)
    //         });
    //         doc.querySelectorAll('li.disabled').forEach(el => {
    //             console.log('disabled:', el)
    //         });
    //     };
    //     xhr.open('GET', 'https://s134-nl.ogame.gameforge.com/game/index.php?page=resources');
    //     xhr.responseType = 'document';
    //     xhr.send();
    // }, 5000);
    return contentEl;

    function createWindow(options = {}) {
        const { innerHTML } = options;
        const el = document.createElement('div');
        el.id = 'TASK_QUE';
        // el.style.width = '300px';
        // el.style.height = '400px';
        el.innerHTML = innerHTML;
        return el
    }

    function createHtmlTemplate() {
        // the id is from the outer <li> with a class off 'on', 'off' or 'disabled' (off is when you can't yet) (disabled is when you have to wait for something)


        // const pages = [
        //     'resources',
        //     'station',
        //     'research',
        //     'shipyard',
        //     'defense',
        // ];

        return `
            <div class="title">que</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="task">test</div>
            <div class="title">add to que</div>
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

        `
    }
}