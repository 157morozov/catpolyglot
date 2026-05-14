const purify = require("../../utils/admin/purify")
const path = require("path")
const sharp = require("sharp")

exports.about = async (req, res) => {
    res.status(200).render("adminsphere/edit/about", {
        title: `Редактирование информации о компании / Кот-Полиглот`,
        admin_login: process.env.ADMIN_LOGIN,
        Home: (await req.database.promise().query("SELECT * FROM Home"))[0],
        Miscs: (await req.database.promise().query("SELECT * FROM Miscs"))[0],
        About: (await req.database.promise().query("SELECT * FROM About"))[0],
        Addresses: (await req.database.promise().query("SELECT * FROM Addresses"))[0],
        GlobalLinks: (await req.database.promise().query("SELECT * FROM GlobalLinks"))[0],
        Contacts: (await req.database.promise().query("SELECT * FROM Contacts"))[0],
        TaxDeduction: (await req.database.promise().query("SELECT * FROM TaxDeduction"))[0],
    })
}

exports.editTableHomeUpdate = async (req, res, next) => {
    const content = purify(req.body.home_content ?? "")
    const title = purify(req.body.home_title ?? "")
    const queries = [
        req.database.promise().query(`INSERT INTO Home (home_type, home_content) VALUES ('Содержание', ?) ON CONFLICT(home_type) DO UPDATE SET home_content = excluded.home_content;`, [content]),
        req.database.promise().query(`INSERT INTO Home (home_type, home_content) VALUES ('Заголовок', ?) ON CONFLICT(home_type) DO UPDATE SET home_content = excluded.home_content;`, [title])
    ]
    const banner = req.file ?? undefined
    if (banner !== undefined) queries.push(req.database.promise().query(`INSERT INTO Miscs (misc_type, misc_content) VALUES ('Баннер', ?) ON CONFLICT(misc_type) DO UPDATE SET misc_content = excluded.misc_content;`, [banner.filename]))
    Promise.all(queries).then(() => {
        res.status(200).redirect("/admin/edit/about")
    }).catch(error => {
        console.error(`/controllers/admin/edit.js: ${error}`)
        res.status(500).render("errors/admin", {
            title: "Ошибка / Кот-Полиглот",
            admin_login: process.env.ADMIN_LOGIN,
            error,
        })
    })
}

exports.editTableGlobalLinksInsert = async (req, res, next) => {
    const type = purify(req.body.gl_type ?? "")
    const link = purify(req.body.gl_link ?? "")
    req.database.promise().query(`INSERT INTO GlobalLinks (gl_type, gl_link) VALUES (?, ?) ON CONFLICT(gl_type) DO UPDATE SET gl_link = excluded.gl_link;`, [type, link]).then(() => {
        res.status(200).redirect("/admin/edit/about")
    }).catch(error => {
        console.error(`/controllers/admin/edit.js: ${error}`)
        res.status(500).render("errors/admin", {
            title: "Ошибка / Кот-Полиглот",
            admin_login: process.env.ADMIN_LOGIN,
            error,
        })
    })
}

exports.editTableGlobalLinksTruncate = async (req, res, next) => {
    req.database.promise().query(`DELETE FROM GlobalLinks`).then(() => {
        res.status(200).redirect("/admin/edit/about")
    }).catch(error => {
        console.error(`/controllers/admin/edit.js: ${error}`)
        res.status(500).render("errors/admin", {
            title: "Ошибка / Кот-Полиглот",
            admin_login: process.env.ADMIN_LOGIN,
            error,
        })
    })
}

exports.editTableGlobalLinksDelete = async (req, res, next) => {
    const type = purify(req.params.gl_type ?? "")
    req.database.promise().query(`DELETE FROM GlobalLinks WHERE gl_type = ?`, [type]).then(() => {
        res.status(200).redirect("/admin/edit/about")
    }).catch(error => {
        console.error(`/controllers/admin/edit.js: ${error}`)
        res.status(500).render("errors/admin", {
            title: "Ошибка / Кот-Полиглот",
            admin_login: process.env.ADMIN_LOGIN,
            error,
        })
    })
}

exports.editTableAboutUpdate = async (req, res, next) => {
    const content = purify(req.body.about_content ?? "")
    req.database.promise().query(`INSERT INTO About (about_type, about_content) VALUES ('Содержание', ?) ON CONFLICT(about_type) DO UPDATE SET about_content = excluded.about_content;`, [content]).then(() => {
        res.status(200).redirect("/admin/edit/about")
    }).catch(error => {
        console.error(`/controllers/admin/edit.js: ${error}`)
        res.status(500).render("errors/admin", {
            title: "Ошибка / Кот-Полиглот",
            admin_login: process.env.ADMIN_LOGIN,
            error,
        })
    })
}

exports.editTableTaxDeductionUpdate = async (req, res, next) => {
    const content = purify(req.body.td_content ?? "")
    req.database.promise().query(`INSERT INTO TaxDeduction (td_type, td_content) VALUES ('Содержание', ?) ON CONFLICT(td_type) DO UPDATE SET td_content = excluded.td_content;`, [content]).then(() => {
        res.status(200).redirect("/admin/edit/about")
    }).catch(error => {
        console.error(`/controllers/admin/edit.js: ${error}`)
        res.status(500).render("errors/admin", {
            title: "Ошибка / Кот-Полиглот",
            admin_login: process.env.ADMIN_LOGIN,
            error,
        })
    })
}

exports.editTableContactsInsert = async (req, res, next) => {
    const type = purify(req.body.contact_type ?? "")
    const content = purify(req.body.contact_content ?? "")
    req.database.promise().query(`INSERT INTO Contacts (contact_type, contact_content) VALUES (?, ?) ON CONFLICT(contact_type) DO UPDATE SET contact_content = excluded.contact_content;`, [type, content]).then(() => {
        res.status(200).redirect("/admin/edit/about")
    }).catch(error => {
        console.error(`/controllers/admin/edit.js: ${error}`)
        res.status(500).render("errors/admin", {
            title: "Ошибка / Кот-Полиглот",
            admin_login: process.env.ADMIN_LOGIN,
            error,
        })
    })
}

exports.editTableContactsTruncate = async (req, res, next) => {
    req.database.promise().query(`DELETE FROM Contacts`).then(() => {
        res.status(200).redirect("/admin/edit/about")
    }).catch(error => {
        console.error(`/controllers/admin/edit.js: ${error}`)
        res.status(500).render("errors/admin", {
            title: "Ошибка / Кот-Полиглот",
            admin_login: process.env.ADMIN_LOGIN,
            error,
        })
    })
}

exports.editTableContactsDelete = async (req, res, next) => {
    const type = purify(req.params.contact_type ?? "")
    req.database.promise().query(`DELETE FROM Contacts WHERE contact_type = ?`, [type]).then(() => {
        res.status(200).redirect("/admin/edit/about")
    }).catch(error => {
        console.error(`/controllers/admin/edit.js: ${error}`)
        res.status(500).render("errors/admin", {
            title: "Ошибка / Кот-Полиглот",
            admin_login: process.env.ADMIN_LOGIN,
            error,
        })
    })
}

exports.editTableAddressesInsert = async (req, res, next) => {
    const title = purify(req.body.address_title ?? "")
    const description = purify(req.body.address_description ?? "")
    const latitude = purify(req.body.address_latitude ?? 0)
    const longitude = purify(req.body.address_longitude ?? 0)
    const coords = JSON.stringify([latitude, longitude])

    if (req.file) {
        const originalImagePath = req.file.path
        const originalImageName = path.basename(originalImagePath)
        const compressedImageName = path.parse(originalImageName).name + "compressed" + path.extname(originalImageName)
        const compressedImagePath = path.join(path.dirname(originalImagePath), compressedImageName)
        const image = path.basename(compressedImagePath)

        sharp(req.file.path).resize(null, 700).toFile(compressedImagePath, (error, info) => {
            if (error) {
                console.error(`/controllers/admin/edit.js: ${error}`)
                res.status(500).render("errors/admin", {
                    title: "Админ панель / Ошибка",
                    admin_login: process.env.ADMIN_LOGIN,
                    error,
                })
            } else {
                req.database.promise().query(`INSERT INTO Addresses (address_title, address_description, address_image, address_coords) VALUES (?, ?, ?, ?)`, [title, description, image, coords]).then(() => {
                    res.status(200).redirect("/admin/edit/about")
                }).catch(error => {
                    console.error(`/controllers/admin/edit.js: ${error}`)
                    res.status(500).render("errors/admin", {
                        title: "Ошибка / Кот-Полиглот",
                        admin_login: process.env.ADMIN_LOGIN,
                        error,
                    })
                })
            }
        })
    } else {
        req.database.promise().query(`INSERT INTO Addresses (address_title, address_description, address_coords) VALUES (?, ?, ?)`, [title, description, coords]).then(() => {
            res.status(200).redirect("/admin/edit/about")
        }).catch(error => {
            console.error(`/controllers/admin/edit.js: ${error}`)
            res.status(500).render("errors/admin", {
                title: "Ошибка / Кот-Полиглот",
                admin_login: process.env.ADMIN_LOGIN,
                error,
            })
        })
    }
}

exports.editTableAddressesTruncate = async (req, res, next) => {
    req.database.promise().query(`DELETE FROM Addresses`).then(() => {
        res.status(200).redirect("/admin/edit/about")
    }).catch(error => {
        console.error(`/controllers/admin/edit.js: ${error}`)
        res.status(500).render("errors/admin", {
            title: "Ошибка / Кот-Полиглот",
            admin_login: process.env.ADMIN_LOGIN,
            error,
        })
    })
}

exports.editTableAddressesDelete = async (req, res, next) => {
    const id = purify(req.params.address_id ?? "")
    req.database.promise().query(`DELETE FROM Addresses WHERE address_id = ?`, [id]).then(() => {
        res.status(200).redirect("/admin/edit/about")
    }).catch(error => {
        console.error(`/controllers/admin/edit.js: ${error}`)
        res.status(500).render("errors/admin", {
            title: "Ошибка / Кот-Полиглот",
            admin_login: process.env.ADMIN_LOGIN,
            error,
        })
    })
}

exports.courses = async (req, res) => {
    res.status(200).render("adminsphere/edit/courses", {
        title: `Редактирование информации о курсах и стоимости / Кот-Полиглот`,
        admin_login: process.env.ADMIN_LOGIN,
        Benifits: (await req.database.promise().query("SELECT * FROM Benifits"))[0],
        Sales: (await req.database.promise().query("SELECT * FROM Sales"))[0],
        Courses: (await req.database.promise().query("SELECT * FROM Courses"))[0],
        Pricing: (await req.database.promise().query("SELECT * FROM Pricing"))[0],
    })
}

exports.editTableBenifitsInsert = async (req, res, next) => {
    const title = purify(req.body.benifit_title ?? "")
    const description = purify(req.body.benifit_description ?? "")
    const originalImagePath = req.file.path
    const originalImageName = path.basename(originalImagePath)
    const compressedImageName = path.parse(originalImageName).name + "compressed" + path.extname(originalImageName)
    const compressedImagePath = path.join(path.dirname(originalImagePath), compressedImageName)
    const image = path.basename(compressedImagePath)

    sharp(req.file.path).resize(null, 300).toFile(compressedImagePath, (error, info) => {
        if (error) {
            console.error(`/controllers/admin/edit.js: ${error}`)
            res.status(500).render("errors/admin", {
                title: "Админ панель / Ошибка",
                admin_login: process.env.ADMIN_LOGIN,
                error,
            })
        } else {
            req.database.promise().query("INSERT INTO Benifits(benifit_title, benifit_description, benifit_image) VALUES (?, ?, ?)", [title, description, image]).then(() => {
                res.status(200).redirect("/admin/edit/courses")
            }).catch(error => {
                console.error(`/controllers/admin/edit.js: ${error}`)
                res.status(500).render("errors/admin", {
                    title: "Ошибка / Кот-Полиглот",
                    admin_login: process.env.ADMIN_LOGIN,
                    error,
                })
            })
        }
    })
}

exports.editTableBenifitsTruncate = async (req, res, next) => {
    req.database.promise().query(`DELETE FROM Benifits`).then(() => {
        res.status(200).redirect("/admin/edit/courses")
    }).catch(error => {
        console.error(`/controllers/admin/edit.js: ${error}`)
        res.status(500).render("errors/admin", {
            title: "Ошибка / Кот-Полиглот",
            admin_login: process.env.ADMIN_LOGIN,
            error,
        })
    })
}

exports.editTableBenifitsDelete = async (req, res, next) => {
    const id = purify(req.params.benifit_id ?? "")
    req.database.promise().query(`DELETE FROM Benifits WHERE benifit_id = ?`, [id]).then(() => {
        res.status(200).redirect("/admin/edit/courses")
    }).catch(error => {
        console.error(`/controllers/admin/edit.js: ${error}`)
        res.status(500).render("errors/admin", {
            title: "Ошибка / Кот-Полиглот",
            admin_login: process.env.ADMIN_LOGIN,
            error,
        })
    })
}

exports.editTableCoursesInsert = async (req, res, next) => {
    const title = purify(req.body.course_title ?? "")
    const description = purify(req.body.course_description ?? "")
    const color = req.body.course_color
    let parameters = []
    const agelimit = purify(req.body.course_agelimit ?? "")
    if (agelimit !== "") parameters.push(["agelimit", agelimit])
    const duration = purify(req.body.course_duration ?? "")
    if (duration !== "") parameters.push(["duration", duration])
    const otherParameters = req.body.course_parameter ?? ""
    if (typeof otherParameters == "object") otherParameters.forEach(parameter => {
        const newParameter = purify(parameter)
        if (newParameter !== "") parameters.push(["parameter", purify(parameter)])
    })
    else {
        if (otherParameters !== "") parameters.push(["parameter", purify(otherParameters)])
    }
    if (parameters.length === 0) parameters = null
    else parameters = JSON.stringify(parameters)

    req.database.promise().query(`INSERT INTO Courses (course_title, course_description, course_color, course_parameters) VALUES (?, ?, ?, ?)`, [title, description, color, parameters]).then(() => {
        res.status(200).redirect("/admin/edit/courses")
    }).catch(error => {
        console.error(`/controllers/admin/edit.js: ${error}`)
        res.status(500).render("errors/admin", {
            title: "Ошибка / Кот-Полиглот",
            admin_login: process.env.ADMIN_LOGIN,
            error,
        })
    })
}

exports.editTableCoursesTruncate = async (req, res, next) => {
    req.database.promise().query(`DELETE FROM Courses`).then(() => {
        res.status(200).redirect("/admin/edit/courses")
    }).catch(error => {
        console.error(`/controllers/admin/edit.js: ${error}`)
        res.status(500).render("errors/admin", {
            title: "Ошибка / Кот-Полиглот",
            admin_login: process.env.ADMIN_LOGIN,
            error,
        })
    })
}

exports.editTableCoursesDelete = async (req, res, next) => {
    const id = purify(req.params.course_id ?? "")
    req.database.promise().query(`DELETE FROM Courses WHERE course_id = ?`, [id]).then(() => {
        res.status(200).redirect("/admin/edit/courses")
    }).catch(error => {
        console.error(`/controllers/admin/edit.js: ${error}`)
        res.status(500).render("errors/admin", {
            title: "Ошибка / Кот-Полиглот",
            admin_login: process.env.ADMIN_LOGIN,
            error,
        })
    })
}

exports.editTableSalesUpdate = async (req, res, next) => {
    const content = purify(req.body.sales_content ?? "")
    req.database.promise().query(`INSERT INTO Sales (sale_type, sale_content) VALUES ('Содержание', ?) ON CONFLICT(sale_type) DO UPDATE SET sale_content = excluded.sale_content;`, [content]).then(() => {
        res.status(200).redirect("/admin/edit/courses")
    }).catch(error => {
        console.error(`/controllers/admin/edit.js: ${error}`)
        res.status(500).render("errors/admin", {
            title: "Ошибка / Кот-Полиглот",
            admin_login: process.env.ADMIN_LOGIN,
            error,
        })
    })
}

exports.editTablePricingDelete = async (req, res, next) => {
    const id = purify(req.params.pricing_id ?? "")
    req.database.promise().query(`DELETE FROM Pricing WHERE pricing_id = ?`, [id]).then(() => {
        res.status(200).redirect("/admin/edit/courses")
    }).catch(error => {
        console.error(`/controllers/admin/edit.js: ${error}`)
        res.status(500).render("errors/admin", {
            title: "Ошибка / Кот-Полиглот",
            admin_login: process.env.ADMIN_LOGIN,
            error,
        })
    })
}

exports.editTablePricingTruncate = async (req, res, next) => {
    req.database.promise().query(`DELETE FROM Pricing`).then(() => {
        res.status(200).redirect("/admin/edit/courses")
    }).catch(error => {
        console.error(`/controllers/admin/edit.js: ${error}`)
        res.status(500).render("errors/admin", {
            title: "Ошибка / Кот-Полиглот",
            admin_login: process.env.ADMIN_LOGIN,
            error,
        })
    })
}

exports.editTablePricingInsert = async (req, res, next) => {
    const title = purify(req.body.pricing_title ?? "")
    const subtitle = purify(req.body.pricing_subtitle ?? "")
    const price = purify(req.body.pricing_price ?? "")
    const old_price = purify(req.body.pricing_old_price ?? "")
    let parameters = []
    const otherParameters = req.body.pricing_parameter ?? ""
    if (typeof otherParameters == "object") otherParameters.forEach(parameter => {
        const newParameter = purify(parameter)
        if (newParameter !== "") parameters.push(["parameter", purify(parameter)])
    })
    else {
        if (otherParameters !== "") parameters.push(["parameter", purify(otherParameters)])
    }
    if (parameters.length === 0) parameters = null
    else parameters = JSON.stringify(parameters)

    req.database.promise().query(`INSERT INTO Pricing(pricing_title, pricing_subtitle, pricing_price, pricing_old_price, pricing_parameters) VALUES (?,?,?,?,?)`, [title, subtitle, Number(price), Number(old_price), parameters]).then(() => {
        res.status(200).redirect("/admin/edit/courses")
    }).catch(error => {
        console.error(`/controllers/admin/edit.js: ${error}`)
        res.status(500).render("errors/admin", {
            title: "Ошибка / Кот-Полиглот",
            admin_login: process.env.ADMIN_LOGIN,
            error,
        })
    })
}

exports.pricing = async (req, res) => {
    res.status(200).render("adminsphere/edit/pricing", {
        title: `Редактирование контактной информации / Кот-Полиглот`,
        admin_login: process.env.ADMIN_LOGIN,
        Home: (await req.database.promise().query("SELECT * FROM Home"))[0],
        Miscs: (await req.database.promise().query("SELECT * FROM Miscs"))[0],
        About: (await req.database.promise().query("SELECT * FROM About"))[0],
        Addresses: (await req.database.promise().query("SELECT * FROM Addresses"))[0],
        GlobalLinks: (await req.database.promise().query("SELECT * FROM GlobalLinks"))[0],
        Contacts: (await req.database.promise().query("SELECT * FROM Contacts"))[0],
        TaxDeduction: (await req.database.promise().query("SELECT * FROM TaxDeduction"))[0],
    })
}

exports.news = async (req, res) => {
    const [news] = await req.database.promise().query("SELECT * FROM News ORDER BY new_created_at DESC")
    res.status(200).render("adminsphere/edit/news", {
        title: `Редактирование новостей / Кот-Полиглот`,
        admin_login: process.env.ADMIN_LOGIN,
        News: news,
    })
}

exports.new = async (req, res) => {
    const id = purify(req.params.new_id ?? "")
    const [news] = await req.database.promise().query("SELECT * FROM News ORDER BY new_created_at DESC")

    res.status(200).render("adminsphere/edit/new", {
        title: `Редактирование новости / Кот-Полиглот`,
        admin_login: process.env.ADMIN_LOGIN,
        News: news,
        id,
    })
}

exports.newCreate = async (req, res) => {
    res.status(200).render("adminsphere/edit/newcreate", {
        title: `Создание новости / Кот-Полиглот`,
        admin_login: process.env.ADMIN_LOGIN,
        Home: (await req.database.promise().query("SELECT * FROM Home"))[0],
        Miscs: (await req.database.promise().query("SELECT * FROM Miscs"))[0],
        About: (await req.database.promise().query("SELECT * FROM About"))[0],
        Addresses: (await req.database.promise().query("SELECT * FROM Addresses"))[0],
        GlobalLinks: (await req.database.promise().query("SELECT * FROM GlobalLinks"))[0],
        Contacts: (await req.database.promise().query("SELECT * FROM Contacts"))[0],
        TaxDeduction: (await req.database.promise().query("SELECT * FROM TaxDeduction"))[0],
    })
}

exports.editTableNewsInsert = async (req, res, next) => {
    const title = purify(req.body.new_title ?? "")
    let isInSlider = req.body.new_is_in_slider ?? 0
    if (isInSlider) isInSlider = 1
    const description = purify(req.body.new_description ?? "")
    const originalImagePath = req.file.path
    const originalImageName = path.basename(originalImagePath)
    const compressedImageName = path.parse(originalImageName).name + "compressed" + path.extname(originalImageName)
    const compressedImagePath = path.join(path.dirname(originalImagePath), compressedImageName)
    const image = path.basename(compressedImagePath)

    sharp(req.file.path).resize(null, 1000).toFile(compressedImagePath, (error, info) => {
        if (error) {
            console.error(`/controllers/admin/edit.js: ${error}`)
            res.status(500).render("errors/admin", {
                title: "Ошибка / Кот-Полиглот",
                admin_login: process.env.ADMIN_LOGIN,
                error,
            })
        } else {
            req.database.promise().query("INSERT INTO News(new_title, new_image, new_is_in_slider, new_description) VALUES (?, ?, ?, ?)", [title, image, isInSlider, description]).then(() => {
                res.status(200).redirect("/admin/edit/news")
            }).catch(error => {
                console.error(`/controllers/admin/edit.js: ${error}`)
                res.status(500).render("errors/admin", {
                    title: "Ошибка / Кот-Полиглот",
                    admin_login: process.env.ADMIN_LOGIN,
                    error,
                })
            })
        }
    })
}

exports.editTableNewsUpdate = async (req, res, next) => {
    const id = req.params.new_id ?? 0
    const title = purify(req.body.new_title ?? "")
    let isInSlider = req.body.new_is_in_slider ?? 0
    if (isInSlider) isInSlider = 1
    const description = purify(req.body.new_description ?? "")

    if (req.file) {
        const originalImagePath = req.file.path
        const originalImageName = path.basename(originalImagePath)
        const compressedImageName = path.parse(originalImageName).name + "compressed" + path.extname(originalImageName)
        const compressedImagePath = path.join(path.dirname(originalImagePath), compressedImageName)
        const image = path.basename(compressedImagePath)

        sharp(req.file.path).resize(null, 1000).toFile(compressedImagePath, (error, info) => {
            if (error) {
                console.error(`/controllers/admin/edit.js: ${error}`)
                res.status(500).render("errors/admin", {
                    title: "Админ панель / Ошибка",
                    admin_login: process.env.ADMIN_LOGIN,
                    error,
                })
            } else {
                req.database.promise().query("UPDATE News SET new_title = ?, new_image = ?, new_is_in_slider = ?, new_description = ? WHERE new_id = ?", [title, image, isInSlider, description, id]).then(() => {
                    res.status(200).redirect("/admin/edit/news")
                }).catch(error => {
                    console.error(`/controllers/admin/edit.js: ${error}`)
                    res.status(500).render("errors/admin", {
                        title: "Ошибка / Кот-Полиглот",
                        admin_login: process.env.ADMIN_LOGIN,
                        error,
                    })
                })
            }
        })
    } else {
        req.database.promise().query("UPDATE News SET new_title = ?, new_is_in_slider = ?, new_description = ? WHERE new_id = ?", [title, isInSlider, description, id]).then(() => {
            res.status(200).redirect("/admin/edit/news")
        }).catch(error => {
            console.error(`/controllers/admin/edit.js: ${error}`)
            res.status(500).render("errors/admin", {
                title: "Ошибка / Кот-Полиглот",
                admin_login: process.env.ADMIN_LOGIN,
                error,
            })
        })
    }
}

exports.editTableNewsDelete = async (req, res, next) => {
    const id = req.params.new_id ?? 0
    req.database.promise().query(`DELETE FROM News WHERE new_id = ?`, [id]).then(() => {
        res.status(200).redirect("/admin/edit/news")
    }).catch(error => {
        console.error(`/controllers/admin/edit.js: ${error}`)
        res.status(500).render("errors/admin", {
            title: "Ошибка / Кот-Полиглот",
            admin_login: process.env.ADMIN_LOGIN,
            error,
        })
    })
}