import React from 'react';
import ReactDOM from 'react-dom';

export default class App extends React.Component<any, any> {
    async componentDidMount() {
        let data = await fetch(`http://${document.domain + ":3001"}/news/api/v1/list/`)
            .then(resp => resp.json())
            .then(resp => resp)
            .catch(_ => true);


        if (data === true)
            window.location.pathname = "/";
        else
            for (let a in data.articles)
                if (data.articles[a].title.replace(' ', '+').toLowerCase() === this.props.path.substr(1).replace('aktualnosci/', '')) {
                    
                    ReactDOM.render(<>
                    <div className="img" style={{backgroundImage: `url(${data.articles[a].thumbnail})`}}>
                        <span className="title">{data.articles[a].title}</span>
                    </div>
                    </>, document.querySelectorAll('#article')[0]);
                    break;
                }
    }

    render() {
        return (
            <div id="article"></div>
        );
    }
}