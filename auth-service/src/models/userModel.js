const pool = require("../config/db");

const createUser = async (
    id,
    username,
    email,
    password
) => {

    const query = `
        INSERT INTO users
        (id, username, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;

    const values = [
        id,
        username,
        email,
        password
    ];

    const result = await pool.query(
        query,
        values
    );

    return result.rows[0];
};

const findUserByEmail = async (email) => {

    const query = `
        SELECT *
        FROM users
        WHERE email = $1
    `;

    const result =
        await pool.query(query, [email]);

    return result.rows[0];
};

module.exports = {
    createUser,
    findUserByEmail
};
