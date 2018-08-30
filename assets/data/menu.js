module.exports = {
    menu: [
        {
            name: "Home", path: "/"
        },
        {
            name: "Destinations", path: "/destinations", submenu: [
                { name: "Angel Billabong", path: "/destinations/angel-billabong"},
                { name: "Broken Beach", path: "/destinations/broken-beach"},
                { name: "Kelingking Beach", path: "/destinations/kelingking-beach"}
            ]
        },
        {
            name: "Hotels", path: "/hotels"
        },
        {
            name: "Contact", path: "/contact"
        }
    ]
}