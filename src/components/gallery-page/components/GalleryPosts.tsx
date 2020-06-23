import React from "react";

const GalleryPosts = (props:any) => {
  let gallery = props.data.getImages;
  return (
    <>
      { (gallery.length > 0) ? gallery.map((image:any, index:number) => {
        return (
          <div onClick={() => props.handleImageClick(index, image)}
                className="gallery-entry" key={image.title + Math.random().toString()}>
              <div className="gallery-img" style={{backgroundImage: `url(${image.image})`}}/>
              <div className="gallery-title">{image.title}</div>
          </div>
        )
      }) : <div className="message">Brak zdjęć</div> }
    </>
  );
}
export default GalleryPosts;