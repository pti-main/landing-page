import React from 'react';
import ReactDOM from 'react-dom';

import Articles from './Articles';
import Error404 from '../../404-error/App';

const readingTime = require('reading-time');


export default class App extends React.Component<any, any> {
    async componentDidMount() {
        let data = await fetch(`http://${document.domain + ":3001"}/news/api/v1/list/`)
            .then(resp => resp.json())
            .then(resp => resp)
            .catch(_ => true);


        if (data === true)
            window.location.pathname = '/';
        else {
            let matched = false;
            for (let a in data.articles) 
                if (data.articles[a].title.split(' ').join('_').toLowerCase() === this.props.path.substr(1).replace('aktualnosci/', '')){

                    let content: any = [];
                    
                    data.articles[a].message.split('\n').map((item: any, i: any) => {
                        let images = item.match(/({%{\d+}%})/g);

                        for (let i in images) {
                            item = item.split(images[i]);
                            item[0] = <div key={`${images[i]}${Math.random()}`} className="imga-container"><div className="imga" style={{backgroundImage: `url(${data.articles[a].images[images[i].split('{%{').join('').split('}%}').join('')]})`}}/></div>;
                            console.log(item, images[i]);
                        }

                        return content.push(<div className="newline" key={`${i}${Math.random()}`}>{item}</div>);
                        
                    });

                    const getMeRandomElements = (sourceArray:any, neededElements:any) => {
                        let result:any = [];

                        if (sourceArray.length <= neededElements)
                            return sourceArray;

                        for (var i = 0; i < neededElements; i++) {
                            let b = sourceArray[Math.floor(Math.random()*sourceArray.length)];
                            if (!result.includes(b) && b !== data.articles[a])
                                result.push(b);
                            else
                                i--;
                        }
                        return result;
                    }

                    const b = data.articles,
                        randomArrays = {
                            length: 3,
                            articles: getMeRandomElements(b, 3)
                        }
                    
                    ReactDOM.render(<>
                        <div className="article-container">
                            <div className="image-container">
                                <div className="img" style={{backgroundImage: `url(${data.articles[a].thumbnail})`}}/>
                            </div>
                            <div className="article-info">
                                <div className="article-title">{data.articles[a].title}</div>
                                <div className="reading-time">{new Date(data.articles[a].date).toLocaleDateString("pl-PL", { year: 'numeric', month: 'long', day: 'numeric' })}, {(data.articles[a].message.length > 200) ? Math.round(readingTime(data.articles[a].message).minutes) : 1} min czytania</div>
                            </div>

                            <div className="message">
                                {content}
                            </div>

                            <hr/>

                            <div className="read-more_title">Przeczytaj więcej</div>
                        </div>
                        <Articles data={randomArrays}/>
                    </>, document.querySelectorAll('#article')[0]);
                    matched = true;
                    break;
                }

            if (!matched)
                ReactDOM.render(<Error404/>, document.querySelector('div.pti__container#news-page'));
        }
    }

    render() {
        return (
            <div id="article" className="container"></div>
        );
    }
}