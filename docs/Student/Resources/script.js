const download = (url, name) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
}

window.onload = async () => {

    const resources = await fetch(serverURL, {
        method: 'POST',
        body: JSON.stringify({
            requestFor: 'resources'
        })
    }).then(res => res.json());
    resources.forEach(resource => {
        document.querySelector('.resources').insertAdjacentHTML('beforeend', `
        <div class='resource' onclick='download("${resource.fileURL}", "${resource.file.name}")'>
            <figure></figure>
            <div>
                <span>
                    ${resource.title}
                </span>
                <span>
                    ${resource.subject}
                </span>
            </div>
        </div>
        `)
    })

   
}