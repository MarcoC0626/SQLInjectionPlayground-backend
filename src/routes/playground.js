import express from 'express';
import sequelize from '../../config/sequelize.ts';

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Database health check endpoint
router.get('/db-health', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.json({ status: 'ok' });
    } catch (error) {
        res.status(503).json({ 
            status: 'error',
            message: 'Database connection failed'
        });
    }
});

router.get('/playground/injectable', async (req, res) => {
    try {
        const params = req.query;
        console.log("params: ", params);
        let query = `
            SELECT * 
            FROM demo_data 
            WHERE string = '${params.string}'
        `;
        console.log("query: ", query);
        const result = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });
        console.log("result: ", result);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/playground/non-injectable', async (req, res) => {
    try {
        const params = req.query;
        let query = `
            SELECT * 
            FROM demo_data 
            WHERE string = :string`;
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
