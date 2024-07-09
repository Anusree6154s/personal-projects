fetchData()
async function fetchData() {
    const res = await fetch("/data.json");
    const jsonData = await res.json()

    const container = document.querySelector('.content')
    jsonData.websites.website.forEach(item => {
        const card = document.createElement('div')
        card.classList.add('card')
        const image = document.createElement('img')
        image.src = item.image
        const text = document.createElement('div')
        text.classList.add('text')
        card.appendChild(image)
        card.appendChild(text)

        const title = document.createElement('h1')
        title.textContent = item.title
        const description = document.createElement('p')
        description.textContent = item.description
        const tools = document.createElement('p')
        item.tools.forEach((tool) => {
            const span = document.createElement('span')
            span.textContent = tool
            tools.appendChild(span)
        })
        const button = document.createElement('a')
        button.href = item.productURL
        console.log(item)
        console.log(item.productURL)
        const innerButton = document.createElement('button')
        innerButton.textContent = 'View Website'
        button.appendChild(innerButton)
        text.appendChild(title)
        text.appendChild(description)
        text.appendChild(tools)
        text.appendChild(button)

        container.appendChild(card);
    });
}