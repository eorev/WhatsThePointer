//Style sheet for the Menu Scene

export default class MenuStyles {
    //background image
    static background = {
        key: 'background',
        url: 'https://th.bing.com/th/id/R.dfdd8b8e762018542fd7141532c95699?rik=5O1NsZt8PboI0w&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fDMJO5GW.jpg&ehk=cmHHaC4jkyWV5HbN5WVc7ywPzlK7d%2ff3ujM56Vkv8Ak%3d&risl=&pid=ImgRaw&r=0',
    }

    //title
    static title = {
        x: 100,
        y: 100,
        text: "What's the Point(er)?",
        style: {
            font: "bold 64px Arial",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle",
        }
    }

    //menu buttons
    static menuButtons = {
        x: 100,
        y: 200,
        text: ['Play', 'Options', 'Exit'],
        style: {
            font: "bold 48px Arial",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle",
        },
        origin: {
            x: 0,
            y: 0,
        },
    }

    //selected button style
    static selectedButtonStyle = {
        font: "bold 48px Arial",
        fill: "#5271FF",
        boundsAlignH: "center",
        boundsAlignV: "middle",
    }
}