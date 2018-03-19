exports.up = (knex, Promise) => {
    return Promise.all([
        knex.schema.createTableIfNotExists('comments', (tb) => {
            tb.increments();
            tb.string('text').notNullable();
            tb.timestamps(true, true);
        })
    ]);

};

exports.down = (knex, Promise) => {
    return Promise.all([
        knex.schema.dropTableIfExists('comments')
    ]);
};
