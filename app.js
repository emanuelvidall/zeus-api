import express from 'express';
import bodyParser from 'body-parser';
import {mongoose} from 'mongoose';
import {config} from 'dotenv';

config();


const port = 3001;
const app = express();

app.use((req, res, next) => {
  //Allow cross-origin requests from any domain and with any headers/methods
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post('/register', (req, res) => {
  // res.header('Access-Control-Allow-Origin', '*');
  console.log('incoming request body:', req.body);
  const newUser = new User({
    name: req.body.name,
  });
  console.log('new user before save: ', newUser);

  newUser
    .save()
    .then(savedUser => {
      return res.status(200).json({msg: savedUser});
    })
    .catch(error => {
      console.error('Error saving user:', error);
      return res.status(500).json({error: 'could not save'});
    });
});

app.post('/novocusto', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  console.log('incoming request body:', req.body);
  const newCost = new Cost({
    valor: req.body.valor,
    tipo: req.body.tipo,
    quantidade: req.body.quantidade,
    desc: req.body.desc,
    data: req.body.data,
  });
  console.log('new cost before save: ', newCost);

  newCost
    .save()
    .then(savedCost => {
      return res.status(200).json({msg: savedCost});
    })
    .catch(error => {
      console.error('Error saving cost:', error);
      return res.status(500).json({error: 'could not save'});
    });
});

app.get('/users', async (req1, res1) => {
  try {
    const users = await User.find();
    const userNames = users.map(user => user);
    res1.json(userNames);
  } catch (error) {
    console.error(error);
    res1.status(500).json({error: 'Internal server error'});
  }
});

app.get('/todoscustos', async (req2, res2) => {
  try {
    const custos = await Cost.find();
    const todosCustos = custos.map(custo => custo);
    res2.json(todosCustos);
  } catch (error) {
    console.error(error);
    res2.status(500).json({error: 'Internal server error'});
  }
});

app.get('/todoscustos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Cost.findById(id);
    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server Error');
  }
});

app.delete('/costs/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const cost = await Cost.findById(id);

    if (!cost) {
      return res.status(404).send({
        message: 'Cost not found',
      });
    }

    await Cost.deleteOne({_id: id});

    return res.status(200).send({
      message: 'Cost deleted successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: 'Internal server error',
    });
  }
});

app.put('/todoscustos/editar/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = {
      valor: req.body.valor,
      tipo: req.body.tipo,
      quantidade: req.body.quantidade,
      desc: req.body.desc,
      data: req.body.data,
    };
    const result = await Cost.findByIdAndUpdate({_id: id}, data, { new: true });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
