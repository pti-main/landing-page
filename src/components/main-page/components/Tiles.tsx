import React from 'react';

export default function Tiles() {
    return (
        <div id="tiles">
            <div className="container">
                <div className="first-row">
                    <div className="title-tile">
                        <div className="text-tile">
                            Zgodnie z prognozami w 2020 roku na całym świecie będzie brakowało aż jednego miliona programistów.
                        </div>
                    </div>
                    <div className="video-tile">
                        <iframe className="video-iframe" allowFullScreen src="https://www.youtube.com/embed/nKIu9yen5nc?feature=oembed&amp;autoplay=1&amp;start&amp;end&amp;wmode=opaque&amp;loop=0&amp;controls=0&amp;mute=1&amp;rel=0&amp;modestbranding=1&amp;loop=1"></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}