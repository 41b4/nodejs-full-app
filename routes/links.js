var express = require('express');
var router = express.Router();
const pool = require('../database')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const [result]= await pool.query('SELECT 1 + 1')
  res.json(result)
});

router.get('/add',(req, res)=>{
  res.render('links/add')
})

router.post('/add',(req, res)=>{
  res.send('recibido')
})
module.exports = router;
