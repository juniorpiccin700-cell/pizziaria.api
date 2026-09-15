import db from '../db/db.js';
import bcrypt from 'bcrypt';

export const findAll = async (cpf, nome, email) => {

    let sql = ' SELECT * FROM usuario';

    const conditions = [];
    const values = [];
    if (cpf) {
        conditions.push('cpf = ?');
        values.push(cpf);
    }
    if (nome) {
        conditions.push('LOWER(NOME) LIKE?');
        values.push(`%${nome.toLowerCase()}%`);
    }
    if (email) {
        conditions.push('email = ?');
        values.push(email);
    }
    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }
    const [rows] = await db.query(sql, values);
    return rows;

}

export const create = async (clienteData) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash (clienteData.senha, saltRounds);
 
    const newCliente = {
        ...clienteData,
        senha: hashedPassword,
    };
 
    await db.query('INSERT INTO usuario SET ?', newCliente);
 
    delete newCliente.senha;
    return newCliente ;
};
export const update = async (cpf, clienteData) => {
    if(clienteData.senha) {
        const saltRounds = 10;
        clienteData.senha = await bcrypt.hash(clienteData.senha, saltRounds);
    }
    const [result] = await db.query('UPDATE usuario SET ? WHERE cpf = ?', [clienteData, cpf]);
    return result.affectedRows > 0;
};
 export const remove = async (cpf) => {
    const [result] = await db.query('DELETE FROM cliente WHERE cpf = ?', [cpf]);
return result.affectedRows > 0;
 };
 

