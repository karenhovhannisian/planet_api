exports.up = (knex, Promise) => {
    return Promise.all([
        knex.schema.createTableIfNotExists('planets', (tb) => {
            tb.increments();
            tb.string('name', 45).notNullable();
            tb.timestamps(true, true);
        })
    ]);

};

exports.down = (knex, Promise) => {
    return Promise.all([
        knex.schema.dropTableIfExists('planets')
    ]);
};
