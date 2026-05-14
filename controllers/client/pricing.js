exports.default = async (req, res) => {
    const [data] = await req.database.promise().selectTablesSnapshot(["Contacts", "GlobalLinks", "Miscs", "Pricing", "Sales"])
    const pricingGrouped = data.Pricing.reduce((acc, item) => {
        const existingEntry = acc.find((entry) => entry.pricing_title === item.pricing_title)
        if (existingEntry) existingEntry.details.push(item)
        else acc.push({ pricing_title: item.pricing_title, details: [item] })
        return acc
    }, [])

    res.status(200).render("pricing", {
        title: "Стоимость / Кот-Полиглот",
        Contacts: data.Contacts,
        GlobalLinks: data.GlobalLinks,
        Miscs: data.Miscs,
        Pricing: data.Pricing,
        Sales: data.Sales,
        PricingGrouped: pricingGrouped,
    })
}
