const fetchData = async () => {
    return await fetch(`http://${document.domain + ":3001"}/news/api/v1/list/`)
        .then(resp => resp.json())
        .then(resp => resp)
        .catch(_ => true);
}

export default fetchData;