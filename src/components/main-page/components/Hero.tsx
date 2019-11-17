import React from 'react';
import TextLoop from "react-text-loop";
import { Link } from "react-scroll";

export default function Hero() {
    return (
        <div id="hero" className="hero">
            <img className="hero__video" src="/img/bg.jpg" alt=""/>
            <video style={{opacity: 0}} className="hero__video" preload="metadata" playsInline loop muted onLoadedMetadata={(e) => {
                e.currentTarget.play()
                    .then(() => {
                        document.getElementsByClassName("hero__video")[0].setAttribute('style', 'opacity: 0;');
                        
                        setTimeout(() => {
                            document.getElementsByClassName("hero__video")[0].remove();
                            document.getElementsByClassName("hero__video")[0].setAttribute('style', 'opacity: 1;');
                        }, 100);
                    })
                    .catch((err) => console.log(`User can't play video, because no. (really the problem is: rejected promise: "${err}" (propably user have turned on power saving mode))`));
            }}> 
                <source data-src="/img/bg-video.mp4" src="/img/bg-video.mp4" type="video/mp4"></source>
                <source data-src="/img/bg-video.mp4" src="/img/bg-video_reduced.mp4" type="video/mp4"></source>
                <source data-src="/img/bg-video.webm" src="/img/bg-video.webm" type="video/webm"></source>
            </video>

            {/* TODO: dopasować rozmieszczenie dokładnie jak w mockupie */}

            <div className="container">
                <h1 className="title">
                    Lorem{(window.innerWidth < 840) ? <br/> : " "}
                    <TextLoop className="title__textloop" interval={3500} springConfig={{ stiffness: 340, damping: 30 }}>
                        <span>marcherka</span>
                        <span>triggered</span>
                        <span>rozsierdzony</span>
                        <span>*wklej tu tekst*</span>
                    </TextLoop>
                </h1>
                
                <h2 className="title-under">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi veritatis minus perferendis laboriosam natus ipsa eligendi qui eaque optio quae.
                </h2>
                
                <div className="container__buttons">
                    <button className="buttons__application buttons">
                        Dołącz do nas
                    </button>

                    <button className="buttons__look-more buttons">
                        Zobacz więcej
                    </button>
                </div>
            </div>
        </div>
    );
}