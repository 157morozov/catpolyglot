exports.default = async (req, res) => {
    const cache = req.cache
    const SliderBanners = cache.News.filter(_new => {
        if (_new.new_is_in_slider) return _new
    })
    function createArray(n) {
        const result = [];
        for (let i = 1; i <= n; i++) {
            result.push(i);
        }
        return result;
    }
    const SliderBannersLength = createArray(SliderBanners.length)

    res.status(200).render("home", {
        title: "Главная страница / Кот-Полиглот",
        cache: {
            // Necessarily data transfer
            Contacts: cache.Contacts,
            GlobalLinks: cache.GlobalLinks,
            Miscs: cache.Miscs,
            // Additionally data transfer
            Home: cache.Home,
            SliderBanners,
            SliderBannersLength,
            NewsSliced: cache.News.slice(0, 4),
        },
    })
}