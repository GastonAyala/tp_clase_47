const { home, moviesForm, moviesFavorites } = require('../controllers/other');

const router = require('express').Router();

router.get('/', home);
router.get('/formulario', moviesForm);
router.get('/favoritas', moviesFavorites);


module.exports = router;