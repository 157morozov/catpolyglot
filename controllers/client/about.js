exports.default = async (req, res) => {
    const cache = req.cache

    res.status(200).render("about", {
        title: "О нас / Кот-Полиглот",
        cache: {
            // Necessarily data transfer
            Contacts: cache.Contacts,
            GlobalLinks: cache.GlobalLinks,
            Miscs: cache.Miscs,
            // Additionally data transfer
            About: cache.About,
            Addresses: cache.Addresses.sort(function (a, b) {
                var titleA = a.address_title.charAt(0)
                var titleB = b.address_title.charAt(0)
                return titleA.localeCompare(titleB)
            }),
        },
    })
}