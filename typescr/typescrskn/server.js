//esmodule
import express from 'express';
import cors from 'cors';

//store
let commissions = [
  {
    id: 1,
    image: 'https://pbs.twimg.com/media/GliUFqFagAADu8Y?format=jpg&name=small',
    title: '@MekkaDock',
    link: 'x.com/MekkaDock',
    price: '2000'
  },
  {
    id: 2,
    image: 'https://pbs.twimg.com/media/FvAt9L0acAA5AjA?format=jpg&name=small',
    title: '@KuroBlood',
    link: 'x.com/KuroBlood',
    price: '10000'
  },
  {
    id: 3,
    image: 'https://pbs.twimg.com/media/Gp8niDtaYAAB2AO?format=jpg&name=small',
    title: '@zebra_vz',
    link: 'x.com/zebra_vz',
    price: '3000'
  },
  {
    id: 4,
    image: 'https://pbs.twimg.com/media/GqAMQA-asAAB6JQ?format=jpg&name=900x900',
    title: '@Fish7163',
    link: 'x.com/Fish7163',
    price: '6000'
  }
];

const app = express();
app.use(cors());
app.use(express.json());

//8GET получить список комиссий
app.get('/api/commissions', (req, res) => {
  res.json(commissions);
});

//9POST добавить новую комиссию
app.post('/api/commissions', (req, res) => {
  const { image, title, link, price } = req.body;
  const newComm = {
    id: commissions.length + 1,
    image,
    title,
    link,
    price
  };
  commissions.push(newComm);
  res.status(201).json(newComm);
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));