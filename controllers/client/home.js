exports.default = async (req, res) => {
    const [data] = await req.database.promise().selectTablesSnapshot(["Contacts", "GlobalLinks", "Miscs", "Home", "News"])
    const news = [...data.News].reverse()
    const sliderBanners = news.filter((_new) => _new.new_is_in_slider)

    res.status(200).render("home", {
        title: "Главная страница / Кот-Полиглот",
        Contacts: data.Contacts,
        GlobalLinks: data.GlobalLinks,
        Miscs: data.Miscs,
        Home: data.Home,
        SliderBanners: sliderBanners,
        SliderBannersLength: Array.from({ length: sliderBanners.length }, (_, i) => i + 1),
        NewsSliced: news.slice(0, 4),
    })
}
