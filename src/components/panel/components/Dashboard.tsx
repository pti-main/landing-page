import React from 'react';
import TodaysVisits from './dashboard/TodaysVisits';
import LastArticles from './dashboard/LastArticles';
import RecentApplication from './dashboard/RecentApplication';
import GalleryPreview from './dashboard/GalleryPreview';

const Dashboard = ({ userInfo }:any) => {

    return (
        <div className="dashboard">
            <div className="title with-border">
                { userInfo && ((new Date().getHours() > 4 && new Date().getHours() < 21) ? "Dzień dobry, " : "Dobry wieczór, ") + 
                    `${userInfo.name}.`}
            </div>
            <div className="tiles_container">
                <TodaysVisits userInfo={userInfo}/>

                <RecentApplication userInfo={userInfo}/>

                <LastArticles userInfo={userInfo}/>

                <GalleryPreview userInfo={userInfo}/>
            </div>
        </div>
    )
}

export default Dashboard;
