module.exports = {
    menu: [
        {
            name: "Home", path: "/", quote: "Cherysa Tour is a Bali and Nusa Penida Tour Agency"
        },
        {
            name: "Destinations", path: "/destinations", submenu: [
                { name: "Angel Billabong", path: "/destinations/angel-billabong"},
                { name: "Broken Beach", path: "/destinations/broken-beach"},
                { name: "Kelingking Beach", path: "/destinations/kelingking-beach"}
            ]
        },
        {
            name: "Hotels", path: "/hotels", quote: "Hotels in Nusa Penida Partnership with Cherysa Tour"
        },
        {
            name: "Contact", path: "/contact"
        },
        {
            name: "Sitemap", path: "/sitemap", mobileOnly: true
        }
    ]
}