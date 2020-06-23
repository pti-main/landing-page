import React from 'react';

import SummaryTile from './SummaryTile';

import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import Loader from '../../../shared/components/Loader';
import { Link } from 'react-router-dom';

let lastImagesQuery = gql`
    query($token: String!) {
        getLastImages(token: $token) {
            success
            data
        }
    }
`;

const GalleryPreview = ({ userInfo }:any) => {
    let { loading, data, error } = useQuery(lastImagesQuery, {variables: {token: (userInfo) ? userInfo.token : ""}});

    if (loading)
        return (
            <div className="bottom__container loading">
                <Loader/>
            </div>
        );

    if (error || !userInfo)
        return (
            <div className="tile">
                <div className="error bottom__container">
                    <img src="https://i.imgur.com/4Ce5xP0.jpg" alt="ragePipo"/>
                    <div className="title">
                        Wystąpił błąd przy ładowaniu komponentu
                    </div>
                </div>
            </div>
        );

    data = JSON.parse(data.getLastImages.data);
    
    const handleError = (e:any) => e.target.parentNode.classList.add("errorLoadingImage");
    return (
        <div className="tile galleryPreview">
            <SummaryTile
                title="Zdjęć w galerii"
                amount={data.length}/>
            <div className="bottom__container">
                <div className={`images ${data.length === 0 ? "noImages" : data.length === 1 ? "oneImage" : "twoImages"}`}>
                    { data.length > 0 && data.data.map((i:any) => (
                        <Link to={`/panel/gallery/edit/${i._id}`} className="image_wrapper" key={i._id}>
                            <img src={i.image} alt="" className="image" onError={handleError}/>
                            <div className="image_fallback" style={{backgroundImage: `url("${i.image}")`}}></div>
                        </Link>
                    ))}
                </div>

                <Link to={data.length === 0 ? "/panel/gallery/new" : "/panel/gallery"} className="cta">
                    {data.length === 0 ? "Dodaj zdjęcie" : "Otwórz galerię"}
                </Link>
            </div>
        </div>
    );
}

export default GalleryPreview;