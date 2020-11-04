const express = require('express');

function createRouter(db) {
    const router = express.Router();

    router.post('/user', (req, res, next) =& gt; {
        db.query(
            'INSERT INTO users (email, password, first_name, last_name, user_role) VALUES (?, ?, ?, ?, ?)',
            [req.body.email, req.body.password, req.body.firstName, req.body.lastName, req.body.userRole],
            (error) =& gt; {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error' });
                } else {
                    res.status(200).json({ status: 'ok' });
                }
            }
        );
    });

    router.get('/user/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM users WHERE id=?',
            [req.params.id],
            (error, results) =& gt; {
                if (error) {
                    console.log(error);
                    res.status(500).json({ status: 'error' });
                } else {
                    res.status(200).json(results);
                }
            }
        );
    });

    router.put('/user/:id', function (req, res, next) {
        db.query(
            'UPDATE users SET email=?, password=?, first_name=?, last_name=?, user_role=?',
            [req.body.email, req.body.password, req.body.firstName, req.body.lastName, req.body.userRole],
            (error) =& gt; {
                if (error) {
                    res.status(500).json({ status: 'error' });
                } else {
                    res.status(200).json({ status: 'ok' });
                }
            }
        );
    });

    router.delete('/event/:id', function (req, res, next) {
        db.query(
            'DELETE FROM users WHERE id=?',
            [req.params.id],
            (error) =& gt; {
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