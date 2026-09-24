import db from '../db/db.js';

export const findAll = async (idProduto, nomeProduto, preco) => {

    let sql = 'SELECT * FROM produto';

    const conditions = [];

    const values = [];

    if (idProduto) {

        conditions.push('idProduto = ?');

        values.push(idProduto);

    }

    if (nomeProduto) {

        conditions.push('LOWER(nomeProduto) LIKE ?');

        values.push(`%${nomeProduto.toLowerCase()}%`);

    }

    if (preco) {

        conditions.push('preco = ?');

        values.push(preco);

    }

    if (conditions.length > 0) {

        sql += ' WHERE ' + conditions.join(' AND ');

    }

    const [rows] = await db.query(sql, values);

    return rows;

}

export const create = async (produtoData) => {

    const [result] = await db.query('INSERT INTO produto SET ?', produtoData);

    return {
        idProduto: result.insertId,
        ...produtoData
    };

};

export const update = async (idProduto, produtoData) => {

    const [result] = await db.query(
        'UPDATE produto SET ? WHERE idProduto = ?',
        [produtoData, idProduto]
    );

    return result.affectedRows > 0;

};

export const remove = async (idProduto) => {

    const [result] = await db.query(
        'DELETE FROM produto WHERE idProduto = ?',
        [idProduto]
    );

    return result.affectedRows > 0;

};