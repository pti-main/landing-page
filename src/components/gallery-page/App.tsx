import React from 'react';
import ReactDOM from 'react-dom';

import Header from '../shared/components/Header';
import Footer from '../shared/components/Footer';


export default class Gallery extends React.Component<any,any> {


    handleImageClick(i:any) {
        // handling image click, getting image => getting title => render.callback
        // => add class to show overlay
        let overlay = document.querySelector("div.overlay");
        ReactDOM.render(<>
            <div className="image"> {/* to add title add "data-title" */}
                <img src={i.image} alt={`Obraz: "${i.title}" nie załadował się`}/>
            </div>
            {/* <div className="img-name">{i.title}</div> */}
        </>, overlay, () => {

            overlay.classList.add("shown", "before-show");
            if (window.matchMedia('(max-width: 768px)').matches)
                document.querySelector('html').classList.add("disable-scroll");
        });
    }

    handleOverlayClick(e:any) {
        // if ( e.target === document.querySelector(".overlay .image img") ) return;
        document.querySelector("div.overlay").classList.remove("shown");
        document.querySelector('html').classList.remove("disable-scroll");
        setTimeout(() => document.querySelector("div.overlay").classList.remove("before-show"), 250);
    }
    
    async componentDidMount() {
        let elements:any = [], data = await fetch(`http://${document.domain + ":3001"}/gallery/api/v1/list/`)
            .then(resp => resp.json())
            .then(resp => resp)
            .catch(_ => true);

        if (data === true) {
            elements.push(<div className="message" key="error">Jest problem z połączeniem się z bazą danych. 
            Przekierujemy cię do strony głównej.</div>);
            setTimeout(() => window.location.pathname = "/", 5000);
        } else
            if (data.length > 0)
                for(let a in data.images)
                    elements.push(
                        <div onClick={() => this.handleImageClick(data.images[a])}
                             className="gallery-entry" key={data.images[a].title + Math.random().toString()}>
                            <div className="gallery-img" style={{backgroundImage: `url(${data.images[a].image})`}}/>
                            <div className="gallery-title">{data.images[a].title}</div>
                        </div>
                    );
            else
                elements.push(<div className="message" key="empty-list">Brak zdjęć</div>)
                
        ReactDOM.render(<>{elements}</>, document.getElementById('gallery'));
    }
    
    render() {
        return (
            <div className="pti__container" id="gallery-page">
                
                <Header darkTheme={this.props.darkTheme} transparent={true}/>
            

                <div className="title">
                    Galeria
                </div>

                <div id="gallery" className="container"></div>
                
                <div className="overlay" onClick={this.handleOverlayClick}/>


                <Footer/>
            
            </div>
        )
    }
}