//Style sheet for the Menu Scene

export default class MenuStyles {
    //background image
    static background = {
        key: 'background',
        url: 'https://picsum.photos/800/600',
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