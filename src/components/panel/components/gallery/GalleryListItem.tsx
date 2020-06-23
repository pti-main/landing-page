import React from 'react';
import { Link } from 'react-router-dom';

const GalleryListItem = ({ data }:any) => {
    const handleImageLoadingError = (e:any) => e.target.parentNode.classList.add("errorLoadingImage");
    return (
        <div className="gallery_list_item">
            <div className="image_wrapper">
                <img src={data.image} alt="" className="image" onError={handleImageLoadingError}/>
                <div 
                    className="image_fallback"
                    style={{backgroundImage: `url(${data.image})`}}></div>
            </div>
            <div className="info">
                <div className="title">{data.title}</div>
                <Link to={`/panel/gallery/edit/${data._id}`} className="cta">Edit</Link>
            </div>
        </div>
    );
}

export default GalleryListItem;