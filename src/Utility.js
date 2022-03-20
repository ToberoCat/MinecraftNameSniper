function sleep(ms) {
    return new Promise(async (resolve, reject) => {
        setTimeout(resolve, ms);
    })
}

module.exports.sleep = sleep;