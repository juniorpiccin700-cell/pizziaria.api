import db from '../db/db.js';

export const findAll = async (idPedido, cpf) => {
  let sql = 'SELECT * FROM pedido';

  const conditions = [];
  const values = [];

  if (idPedido) {
    conditions.push('idPedido = ?');
    values.push(idPedido);
  }

  if (cpf) {
    conditions.push('cpf = ?');
    values.push(cpf);
  }

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }
    const [rows] = await db.query(sql, values);
    return rows;

}

export const create = async (pedidoData) => {
  const [result] = await db.query('INSERT INTO pedido SET ?', pedidoData);

  return {
    idPedido: result.insertId,
    ...pedidoData
  };
};

export const update = async (idPedido, pedidoData) => {
  const [result] = await db.query(
    'UPDATE pedido SET ? WHERE idPedido = ?',
    [pedidoData, idPedido]
  );

  return result.affectedRows > 0;
};

export const remove = async (idPedido) => {
  const [result] = await db.query(
    'DELETE FROM pedido WHERE idPedido = ?',
    [idPedido]
  );

  return result.affectedRows > 0;
};