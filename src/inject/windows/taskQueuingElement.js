
function createTaskQueuingElement() {
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
        el.style.width = '300px';
        el.style.height = '800px';
        el.innerHTML = innerHTML;
        return el
    }

    function createHtmlTemplate() {
        const pages = [
            'resources',
            'station',
            'research',
            'shipyard',
            'defense',
        ];

        return `
            <div class="title">test</div>
            <div class="title">test</div>
            <div class="title">test</div>
            <div class="title">test</div>
            <div class="item">test</div>
            <div class="item">test</div>
            <div class="item">test</div>
            <div class="title">test</div>
            <div class="item">test</div>
            <div class="item">test</div>
            <div class="item">test</div>
            <div class="title">test</div>
            <div class="item">test</div>
            <div class="item">test</div>
            <div class="item">test</div>
        `
    }
}