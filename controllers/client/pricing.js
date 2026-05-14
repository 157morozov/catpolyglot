exports.default = async (req, res) => {
    const cache = req.cache
    const Pricing = cache.Pricing
    const PricingGrouped = Pricing.reduce((acc, item) => {
        const existingEntry = acc.find(entry => entry.pricing_title === item.pricing_title);
        if (existingEntry) {
            existingEntry.details.push({
                pricing_id: item.pricing_id,
                pricing_subtitle: item.pricing_subtitle,
                pricing_price: item.pricing_price,
                pricing_old_price: item.pricing_old_price,
                pricing_parameters: item.pricing_parameters
            })
        } else {
            acc.push({
                pricing_title: item.pricing_title,
                details: [{
                    pricing_id: item.pricing_id,
                    pricing_subtitle: item.pricing_subtitle,
                    pricing_price: item.pricing_price,
                    pricing_old_price: item.pricing_old_price,
                    pricing_parameters: item.pricing_parameters
                }]
            })
        }
        return acc;
    }, [])

    res.status(200).render("pricing", {
        title: "Стоимость / Кот-Полиглот",
        cache: {
            // Necessarily data transfer
            Contacts: cache.Contacts,
            GlobalLinks: cache.GlobalLinks,
            Miscs: cache.Miscs,
            // Additionally data transfer
            Pricing: cache.Pricing,
            Sales: cache.Sales,
            PricingGrouped: PricingGrouped,
        },
    })
}
