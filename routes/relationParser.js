module.exports = {
    /**
     * @bySaincraft-Lab 
     * initial
     * parsing relation data */
    getter: async (queryObj, models) => {
        const query = queryObj;
        var initRel = [];
        for (const rel in query) {
            /** query first items */
            let object = { model: null };
            try {
                object.model = query[rel];
                if (query[rel].includes(' ')) {
                    var relatives = query[rel].split(' ');
                    relatives.map((relative, i) => {
                        if (i <= 0) {
                            console.log('////', relative);
                            object.model = models[relative];
                        } else {
                            if (object['include'] == undefined) {
                                object['include'] = [];
                                object['include'].push({ model: models[relative] });
                                console.log('//////2', object);
                            } else {
                                object.include = { model: models[relative] }
                            };
                        }
                    });
                } else {
                    var relatives = query[rel].split(' ');
                    relatives.map((relative, i) => {
                        if (i <= 0) {
                            console.log('////', relative);
                            object.model = models[relative];
                        } else {
                            if (object['include'] == undefined) {
                                object['include'] = [];
                                object['include'].push({ model: models[relative] });
                                console.log('//////2', object);
                            } else {
                                object.include = { model: models[relative] }
                            };
                        }
                    });
                }
            } catch (err) {
                console.log(err);
            }
            console.log(object);
            initRel.push(object);
        }
        return await initRel
    },
    poster: async () => {
        const query = queryObj;
        var initRel = [];
        for (const rel in query) {
            /** query first items */
            let object = { model: null };
            try {
                object.model = query[rel];
                if (query[rel].includes(' ')) {
                    var relatives = query[rel].split(' ');
                    relatives.map((relative, i) => {
                        if (i <= 0) {
                            console.log('////', relative);
                            object.model = models[relative];
                        } else {
                            if (object['include'] == undefined) {
                                object['include'] = [];
                                object['include'].push({ model: models[relative] });
                                console.log('//////2', object);
                            } else {
                                object.include = { model: models[relative] }
                            };
                        }
                    });
                } else {
                    var relatives = query[rel].split(' ');
                    relatives.map((relative, i) => {
                        if (i <= 0) {
                            console.log('////', relative);
                            object.model = models[relative];
                        } else {
                            if (object['include'] == undefined) {
                                object['include'] = [];
                                object['include'].push({ model: models[relative] });
                                console.log('//////2', object);
                            } else {
                                object.include = { model: models[relative] }
                            };
                        }
                    });
                }
            } catch (err) {
                console.log(err);
            }
            console.log(object);
            initRel.push(object);
        }
        return await initRel
    },
}