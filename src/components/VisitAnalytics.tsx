
const getVisitAnalytics = async () => {
    let nav:any = window.navigator,
        data:String,
        battery:any = (nav.getBattery) ? await nav.getBattery().then((a:any) => a).catch(() => {}) : {}; 

    data = JSON.stringify({
        screen: {
            width: window.screen.width,
            height: window.screen.height,
            pixelRatio: window.devicePixelRatio
        },

        window: {
            time: {
                timestamp: new Date().getTime(),
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            location: window.location,

            inner: {
                height: window.innerHeight,
                width: window.innerWidth
            },

            outer: {
                height: window.outerHeight,
                width: window.outerWidth
            }
        },

        user: {
            agent: navigator.userAgent,
            
            platform: navigator.platform,
            language: navigator.language,
            vendor: navigator.vendor,

            battery: (nav.getBattery) ? {
                charging: battery.charging,
                chargingTime: battery.chargingTime,
                dischargingTime: battery.dischargingTime,
                level: battery.level
            } : null,

            cookieEnabled: navigator.cookieEnabled,

            browser: {
                product: navigator.product,
                version: navigator.appVersion
            }
        }
    });
    
    return data;
}

export default getVisitAnalytics;