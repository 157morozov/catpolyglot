exports.default = async (req, res) => {
    const cache = req.cache

    res.status(200).render("tax-deduction", {
        title: "Налоговый вычет / Кот-Полиглот",
        cache: {
            // Necessarily data transfer
            Contacts: cache.Contacts,
            GlobalLinks: cache.GlobalLinks,
            Miscs: cache.Miscs,
            // Additionally data transfer
            TaxDeduction: cache.TaxDeduction,
        },
    })
}