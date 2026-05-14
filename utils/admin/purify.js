function purify(string) {
    return string.replace(/['";\(\)]/g, "")
}

module.exports = purify