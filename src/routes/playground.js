import express from 'express';
import sequelize from '../../config/sequelize.ts';

const router = express.Router();

router.get('/playground/injectable', async (req, res) => {
    try {
        const params = req.query;
        console.log(params);
        let query =
        `SELECT * FROM demo_data WHERE string = '${params.string}'`;
        const result = await sequelize.query(query);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/playground/non-injectable', async (req, res) => {
    try {
        const params = req.query;
        let query = 'SELECT * FROM demo_data WHERE string = :string';
        const result = await sequelize.query(query,
            {
                replacements: { string: params.string },
                type: sequelize.QueryTypes.SELECT
            }
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
