function sleep(ms) {
    return new Promise(async (resolve, reject) => {
        setTimeout(resolve, ms);
    })
}

async function type(page, selector, text) {
    await page.type(selector, text, { delay: 100 });
}

module.exports.sleep = sleep;
module.exports.type = type;