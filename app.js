const express = require("express")
const app = express()

app.use(express.static("public"))

const dotenv = require("dotenv")
dotenv.config()

const expressHandlebars = require("express-handlebars")
const Handlebars = require("handlebars");
const hbs = expressHandlebars.create({
    helpers: {
        compare: function (v1, operator, v2, options) {
            switch (operator) {
                case '==':
                    return (v1 == v2) ? options.fn(this) : options.inverse(this);
                case '===':
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);
                case '!=':
                    return (v1 != v2) ? options.fn(this) : options.inverse(this);
                case '!==':
                    return (v1 !== v2) ? options.fn(this) : options.inverse(this);
                case '<':
                    return (v1 < v2) ? options.fn(this) : options.inverse(this);
                case '<=':
                    return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                case '>':
                    return (v1 > v2) ? options.fn(this) : options.inverse(this);
                case '>=':
                    return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                default:
                    return options.inverse(this);
            }
        },
        jsonStringify: function (context) {
            return new Handlebars.SafeString(JSON.stringify(context));
        },
        formatPhoneNumber: function (phoneNumber) {
            const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
            if (cleanedPhoneNumber.startsWith('7')) {
                return `+7${cleanedPhoneNumber.slice(1)}`;
            } else {
                return cleanedPhoneNumber;
            }
        },
        stripTags: function (input) {
            return input.replace(/<\/?[^>]+(>|$)/g, "");
        }
    }
})
app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const session = require("express-session")
app.use(session({
    secret: "AMx3eVXiIAiPvjYfuHognhAG0kyiPCON",
    saveUninitialized: true,
    resave: true,
}))

const dbconnection = require("./middleware/database")
app.use(dbconnection)

const migrations = require("./utils/server/migrations")
migrations()

const homePage = require("./routes/client/home")
const newsPage = require("./routes/client/news")
const adressesPage = require("./routes/client/addresses")
const aboutPage = require("./routes/client/about")
const coursesPage = require("./routes/client/courses")
const taxDeductionPage = require("./routes/client/tax-deduction")
const pricingPage = require("./routes/client/pricing")

app.use("/", homePage)
app.use("/news", newsPage)
app.use("/addresses", adressesPage)
app.use("/about", aboutPage)
app.use("/courses", coursesPage)
app.use("/tax-deduction", taxDeductionPage)
app.use("/pricing", pricingPage)

const adminsphere = require("./routes/admin/adminsphere")
app.use("/admin", adminsphere)

const server_port = process.env.SERVER_PORT
app.listen(server_port, () => {
    console.log(`/app.js: Server started, port: ${server_port}, URL: http://localhost:${server_port}/`)
})