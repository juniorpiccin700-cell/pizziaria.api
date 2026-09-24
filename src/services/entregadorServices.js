import db from '../db/db.js';
export const findAll = async (idEntregador, nomeEntregador) => {
  let sql = 'SELECT * FROM entregador';

  const conditions = [];
  const values = [];

  if (idEntregador) {
    conditions.push('idEntregador = ?');
    values.push(idEntregador);
  }

    if (nomeEntregador) {
    conditions.push('nomeEntregador = ?');
    values.push(nomeEntregador);
  }

  
    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');

     }
      const [rows] = await db.query(sql, values);
      return rows;
     }
      export const create = async (entregadorData) => 
        {
        const [result] = await db.query('INSERT INTO entregador SET ?', entregadorData);
      
        return {
          idEntregador: result.insertId,
          ...entregadorData
        };
      };
      export const update = async (idEntregador, entregadorData) => {
        const [result] = await db.query(
          'UPDATE entregador SET ? WHERE idEntregador = ?',
          [entregadorData, idEntregador]
        );
      
        return result.affectedRows > 0;
      };
      
      export const remove = async (idEntregador) => {
        const [result] = await db.query(
          'DELETE FROM entregador WHERE idEntregador = ?',
          [idEntregador]
        );
        return result.affectedRows > 0;
}

      

