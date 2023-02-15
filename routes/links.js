var express = require('express');
var router = express.Router();
const pool = require('../database')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const [links]= await pool.query('SELECT * FROM links')
  console.log(links)
  res.render('links/list',{ links })
});

router.get('/add',(req, res)=>{
  res.render('links/add')
})

router.post('/add',async (req, res)=>{

  const { title, url, description }=req.body
  const newLink={
    title,
    url,
    description
  }
  await pool.query('INSERT INTO links SET ?',[newLink])
  req.flash('success','link saved succesfully')
  res.redirect('/links')
})

router.get('/delete/:id',async (req, res)=>{
  const {id}= req.params
  await pool.query('DELETE FROM links WHERE id=?',[id])
  req.flash('success','link deleted succesfully')
  res.redirect('/links')
})

router.get('/edit/:id',async (req, res)=>{
  const {id}= req.params
  const [link]=await pool.query('SELECT * FROM links WHERE id=?',[id])
  
  // console.log(link[0])
  res.render('links/edit',{link:link[0]})
})

router.post('/edit/:id', async (req, res)=>{
  const {id}= req.params
  const { title, url, description }=req.body
  const newLink={
    title,
    url,
    description
  }
  await pool.query('UPDATE links SET ? WHERE id= ?;',[newLink, id])
  req.flash('success','link updated succesfully')
  res.redirect('/links')
})
module.exports = router;
