
const express = require('express');
const db = require('./db');

const app = express();
const port = 3000;

app.use(express.json());

// Classificação ai da temperatura gulosa
function classificarTemperatura(temperatura) {
    if (temperatura < 80) {
        return 'Temperatura ideal';
    } else if (temperatura < 95) {
        return 'Atencao / Intermediario';
    } else if (temperatura <= 105) {
        return 'Acima da temperatura ideal';
    } else {
        return 'Limite crítico';
    }
}

function validarId(id) {
    return /^\d+$/.test(id) && Number(id) > 0;
}

function validarTemperatura(valor) {
    return typeof valor === 'number' &&
        Number.isFinite(valor) &&
        valor >= -273.15;
}

app.get('/', (req, res) => {
    res.status(200).send('API de Monitoramento Térmico funcionando!');
});

app.get('/medicoes', async (req, res) => {
    try {
        const [rows] = await db.execute(
            'SELECT * FROM medicoes'
        );

        res.status(200).json(rows);

    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro Interno do Servidor',
            detalhes: error.message
        });
    }
});

app.get('/medicao/:id', async (req, res) => {
    const { id } = req.params;

    if (!validarId(id)) {
        return res.status(400).json({
            mensagem: 'ID inválido'
        });
    }

    try {
        const [rows] = await db.execute(
            'SELECT * FROM medicoes WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                mensagem: 'Medição não encontrada'
            });
        }

        res.status(200).json(rows[0]);

    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro Interno do Servidor',
            detalhes: error.message
        });
    }
});

app.post('/medicao', async (req, res) => {
    const { descricao, tipo, valor } = req.body;

    if (
        Object.keys(req.body).length !== 3 ||
        !Object.hasOwn(req.body, 'descricao') ||
        !Object.hasOwn(req.body, 'tipo') ||
        !Object.hasOwn(req.body, 'valor') ||
        typeof descricao !== 'string' ||
        descricao.trim() === '' ||
        tipo !== 'temperatura' ||
        !validarTemperatura(valor)
    ) {
        return res.status(400).json({
            mensagem: 'Informe descrição, tipo temperatura e valor válido.'
        });
    }

    const valor_convertido = Math.round(((valor * 9 / 5) + 32) * 100) / 100;
    const unidade_original = '°C';
    const unidade_convertida = '°F';
    const classificacao = classificarTemperatura(valor);

    try {
        const [result] = await db.execute(
            `INSERT INTO medicoes
            (descricao, tipo, valor_original, unidade_original,
            valor_convertido, unidade_convertida, classificacao)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                descricao.trim(),
                tipo,
                valor,
                unidade_original,
                valor_convertido,
                unidade_convertida,
                classificacao
            ]
        );

        res.status(201).json({
            id: result.insertId,
            descricao: descricao.trim(),
            tipo,
            valor_original: valor,
            unidade_original,
            valor_convertido,
            unidade_convertida,
            classificacao,
            mensagem: 'Medição cadastrada com sucesso!'
        });

    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro Interno do Servidor',
            detalhes: error.message
        });
    }
});

app.put('/medicao/:id', async (req, res) => {
    const { id } = req.params;
    const { descricao, tipo, valor } = req.body;

    if (!validarId(id)) {
        return res.status(400).json({
            mensagem: 'ID inválido'
        });
    }

    if (
        Object.keys(req.body).length !== 3 ||
        !Object.hasOwn(req.body, 'descricao') ||
        !Object.hasOwn(req.body, 'tipo') ||
        !Object.hasOwn(req.body, 'valor') ||
        typeof descricao !== 'string' ||
        descricao.trim() === '' ||
        tipo !== 'temperatura' ||
        !validarTemperatura(valor)
    ) {
        return res.status(400).json({
            mensagem: 'Informe descrição, tipo temperatura e valor válido.'
        });
    }

    const valor_convertido = Math.round(((valor * 9 / 5) + 32) * 100) / 100;
    const unidade_original = '°C';
    const unidade_convertida = '°F';
    const classificacao = classificarTemperatura(valor);

    try {
        const [result] = await db.execute(
            `UPDATE medicoes SET
            descricao = ?,
            tipo = ?,
            valor_original = ?,
            unidade_original = ?,
            valor_convertido = ?,
            unidade_convertida = ?,
            classificacao = ?
            WHERE id = ?`,
            [
                descricao.trim(),
                tipo,
                valor,
                unidade_original,
                valor_convertido,
                unidade_convertida,
                classificacao,
                id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Medição não encontrada'
            });
        }

        res.status(200).json({
            mensagem: 'Medição atualizada com sucesso!'
        });

    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro Interno do Servidor',
            detalhes: error.message
        });
    }
});

app.delete('/medicao/:id', async (req, res) => {
    const { id } = req.params;

    if (!validarId(id)) {
        return res.status(400).json({
            mensagem: 'ID inválido'
        });
    }

    try {
        const [result] = await db.execute(
            'DELETE FROM medicoes WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Medição não encontrada'
            });
        }

        res.status(200).json({
            mensagem: 'Medição excluída com sucesso!'
        });

    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro Interno do Servidor',
            detalhes: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`API rodando na porta ${port}`);
});
