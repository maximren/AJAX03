const inp = document.getElementById('myInput');
const api = "https://rest.bandsintown.com/artists/";
const apiKey = "?app_id=85d6c62e-7ce7-4911-ac17-20082ceb84fd"
const eventsApi = "/events"
const button = document.getElementById('getData');

const fetchData = (bandName) => {
    deleteAllDAta();
    fetch(api + bandName + apiKey)
        .then((response) => {
            return response.json();
        }).then((data) => {
            if (data) {
                renderBand(data);
            } else {
                alert('Band not found');
            }
        }).catch((err) => {
            console.log(err);
        })

    fetch(api + bandName + eventsApi + apiKey)
        .then((response) => {
            return response.json();
        }).then((data) => {
            renderEvents(data);
        }).catch((err) => {
            console.log(err);
        })
}

const renderNotFound = () => {

};

const renderEvents = (events) => {
        events.forEach((event) => {
            const eventParagraph = document.createElement('p');
            eventParagraph.innerHTML = event.description;
            eventParagraph.classList.add('textEvents');
            eventParagraph.classList.add('scrollField');
            document.getElementById('eventsContainer').appendChild(eventParagraph);
        });
};

const renderBand = (band) => {
    const img = document.createElement('img');
    img.src = band.image_url;
    img.classList.add('img-thumbnail');
    img.classList.add('image');

    const bandName = document.createElement('p');
    bandName.innerHTML = band.name;
    bandName.classList.add('text');
    document.getElementById('bandContainer').appendChild(bandName);
    document.getElementById('bandContainer').appendChild(img);

};

const deleteAllDAta = () => {
    document.getElementById('bandContainer').innerHTML = '';
    document.getElementById('eventsContainer').innerHTML = '';
};

button.addEventListener('click', () => {
    if (inp.value) {
        fetchData(inp.value);
    }
});