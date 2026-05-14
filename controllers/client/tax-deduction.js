exports.default = async (req, res) => {
    const [data] = await req.database.promise().selectTablesSnapshot(["Contacts", "GlobalLinks", "Miscs", "TaxDeduction"])
    res.status(200).render("tax-deduction", {
        title: "Налоговый вычет / Кот-Полиглот",
        Contacts: data.Contacts,
        GlobalLinks: data.GlobalLinks,
        Miscs: data.Miscs,
        TaxDeduction: data.TaxDeduction,
    })
}
