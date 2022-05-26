function Template() {
    /**
     * Templates
     *
     * @type {Map<any, any>}
     */
    this.templates = new Map();

    /**
     * Save in the store template
     *
     * @param name
     * @param fn
     */
    this.push = function (name, fn) {
        if (typeof fn !== "function") {
            throw new Error("'fn' must be a function.");
        }

        this.templates.set(name, fn);
    }

    /**
     * Return render view
     *
     * @param name
     * @param arguments
     * @returns {*}
     */
    this.get = function (name, ...args) {
        return this
            .templates
            .get(name)
            .call(this, ...args);
    }
}

module.exports = {
    Template,
}