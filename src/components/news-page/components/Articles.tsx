import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter as Router } from 'react-router-dom';

export default class App extends React.Component<any, any> {
    async componentDidMount() {
        let elements = [], data = await fetch(`http://${document.domain + ":3001"}/news/api/v1/list/`)
            .then(resp => resp.json())
            .then(resp => resp)
            .catch(_ => true);

        if (this.props.data !== undefined)
            data = this.props.data;


        if (data === true) {
            elements.push(<div className="message" key="error">Jest problem z połączeniem się z bazą danych. 
            Przekierujemy cię do strony głównej.</div>);
            setTimeout(() => window.location.pathname = "/", 5000);
        } else
            if (data.length > 0)
                for(let a in data.articles)
                    elements.push(
                            <div id="article-entry" key={data.articles[a].title}>
                                <a className="article-link" href={`/aktualnosci/${data.articles[a].title.split(' ').join('_').toLowerCase()}`}>
                                    {(data.articles[a].thumbnail !== null) ? 
                                        <div className="img" style={{backgroundImage: `url(${data.articles[a].thumbnail})`}} /*alt={data.articles[a].title}*//> : <></>}
                                        <div className="article-text">
                                            <div className="article-title">{(data.articles[a].title.length > 30) ? `${data.articles[a].title.substring(0, 30).replace(/\s+/g,' ').trim()}...` : data.articles[a].title}</div>
                                            <div className="article-desc">{(data.articles[a].message.length > 65) ? `${data.articles[a].message.substring(0, 65)}...` : data.articles[a].message}</div>
                                        </div>
                                </a>
                            </div>
                    );
            else
                elements.push(<div className="message" key="empty-list">Brak artykułów</div>)

        ReactDOM.render(<>{elements}</>, document.querySelectorAll('#articles')[0]);
    }

    render() {
        return (
            <div id="articles" className="container">
                
            </div>
        );
    }
}