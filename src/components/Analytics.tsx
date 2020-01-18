export default async function Analytics() {
    return await fetch(`http://${document.domain + ":3001"}/analytics/api/v1/collect/data`, {
        method: "POST",
        cache: "no-cache",
        headers: {
            "x-analytics-req": "pti-analytics",
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
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

                    cookieEnabled: navigator.cookieEnabled,

                    browser: {
                        product: navigator.product,
                        version: navigator.appVersion
                    }
                }
            })
        });
}