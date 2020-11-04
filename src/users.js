const express = require('express');

function createRouter(db) {
    const router = express.Router();

    router.post('api/user/add', (req, res, next) => {
        db.query(
            'INSERT INTO users (email, password, first_name, last_name, user_role) VALUES (?, ?, ?, ?, ?)',
            [req.body.email, req.body.password, req.body.firstName, req.body.lastName, req.body.userRole],
            (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error' });
                } else {
                    res.status(200).json({ status: 'ok' });
                }
            }
        );
    });

    router.get('api/users', (req, res, next) => {
        db.query(
            'SELECT * FROM users',
            (error, results) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ status: 'error' });
                } else {
                    res.status(200).json(results);
                }
            }
        );
    });

    router.get('api/user/:id', (req, res, next) => {
        db.query(
            'SELECT * FROM users WHERE id=?',
            [req.params.id],
            (error, results) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ status: 'error' });
                } else {
                    res.status(200).json(results);
                }
            }
        );
    });

    router.put('api/user/update/:id', (req, res, next) => {
        db.query(
            'UPDATE users SET email=?, password=?, first_name=?, last_name=?, user_role=?',
            [req.body.email, req.body.password, req.body.firstName, req.body.lastName, req.body.userRole],
            (error) => {
                if (error) {
                    res.status(500).json({ status: 'error' });
                } else {
                    res.status(200).json({ status: 'ok' });
                }
            }
        );
    });

    router.delete('api/user/delete/:id', (req, res, next) => {
        db.query(
            'DELETE FROM users WHERE id=?',
            [req.params.id],
            (error) => {
                if (error) {
                    res.status(500).json({ status: 'error' });
                } else {
                    res.status(200).json({ status: 'ok' });
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;