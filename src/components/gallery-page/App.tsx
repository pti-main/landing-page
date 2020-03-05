import React, { useEffect, useState, useRef } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Header from '../shared/components/Header';
import Footer from '../shared/components/Footer';
import Loader from '../shared/components/Loader';
import Error from '../shared/components/Error';

import GalleryPosts from './components/GalleryPosts';

const query = gql`
    query {
        getImages {
            id
            image
            title
        }
    }
`;

const Gallery = (props:any) => {
    const [ selectedImage, setSelectedImage ] = useState(null);
    const overlayRef = useRef(null);
    let redirectTimeout:number = null;


    useEffect(() => {
        document.title = "Galeria - Prywatne Technikum Informatyczne";
            
        return () => {
            clearTimeout(redirectTimeout);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleImageClick = (index:number, data:any) => {
        document.title = `${data.title} - Prywatne Technikum Informatyczne`;

        setSelectedImage(data);

        overlayRef.current.classList.add("shown", "before-show");
        if (window.matchMedia('(max-width: 768px)').matches)
            document.querySelector('html').classList.add("disable-scroll");
    }

    const handleOverlayClick = (e:any) => {
        // if ( e.target === document.querySelector(".overlay .image img") ) return;
        overlayRef.current.classList.remove("shown");
        document.querySelector('html').classList.remove("disable-scroll");
        document.title = "Galeria - Prywatne Technikum Informatyczne";


        setTimeout(() => {
            overlayRef.current.classList.remove("before-show")
            setSelectedImage(null);
        }, 250);
    }                                          
    
    return (
        <>
            <Header darkTheme={props.darkTheme} transparent={true}/>
            <div className="pti__container">
                <div id="gallery-page">
                    <Query query={query}>
                        {({error, loading, data}:any) => {
                            if (loading)
                                return <Loader/>
                            if (error)
                                return <Error redirect={true} history={props.history}/>

                            return (
                                <>
                                    <div id="gallery" className="container">
                                        <GalleryPosts handleImageClick={handleImageClick} data={data}/>
                                    </div>

                                    <div ref={overlayRef} className="overlay" onClick={handleOverlayClick}>
                                        { selectedImage !== null &&
                                            <div className="image">
                                                <img src={selectedImage.image}
                                                    alt={`Obraz: "${selectedImage.title}" nie załadował się`}/>
                                            </div> 
                                        }
                                    </div>

                                    <Footer/>
                                </>
                            );                         
                        }}
                    </Query>
                </div>
            </div>
        </>
    )
}
export default Gallery;