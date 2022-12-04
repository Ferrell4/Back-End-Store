const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
try {
  const categoryData = await Category.findAll({include: [{model: Product}]})
  res.status(200).json(categoryData)
} catch (err) {
  res.status(500).json(err)

}
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const singleCat = await Category.findByPk(req.params.id, {
      include:[{model: Product}]
    })
    res.status(200).json(singleCat)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCat = await Category.create(req.body);
  res.status(200).json(newCat)
  } catch (err) {
    res.status(500).json(err)
  }
  
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCat = await Category.update(
      {
        category_name: req.body.category_name
    },
    {
      where:{
        id: req.params.id
      },
    },
    )
    res.status(200).json(updateCat)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCat = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if(!deleteCat){
      res.status(404).json({message: 'No Category with that id was found!'})
    }

    res.status(200).json(deleteCat)

  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
