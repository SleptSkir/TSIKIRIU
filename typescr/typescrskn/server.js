//esmodule
import express from 'express';
import cors from 'cors';

//store
let commissions = [
  {
    id: 1,
    image: 'https://pbs.twimg.com/media/GliUFqFagAADu8Y?format=jpg&name=small',
    title: 'デDeサSa',
    link: 'x.com/MekkaDock',
    price: '2000'
  },
  {
    id: 2,
    image: 'https://pbs.twimg.com/media/FvAt9L0acAA5AjA?format=jpg&name=small',
    title: '¼ᴋᴜʀᴏʙʟᴏᴏᴅ',
    link: 'x.com/KuroBlood',
    price: '10000'
  },
  {
    id: 3,
    image: 'https://pbs.twimg.com/media/Gp8niDtaYAAB2AO?format=jpg&name=small',
    title: 'シマ',
    link: 'x.com/zebra_vz',
    price: '3000'
  },
  {
    id: 4,
    image: 'https://pbs.twimg.com/media/GqAMQA-asAAB6JQ?format=jpg&name=small',
    title: '一碗鱼饭丶',
    link: 'x.com/Fish7163',
    price: '6000'
  },
  {
    id: 5,
    image: 'https://pbs.twimg.com/media/Gp0_aKBagAA4Y5Q?format=jpg&name=small',
    title: '旺财s',
    link: 'https://x.com/Yifeng_LZ',
    price: '20000'
  },
  {
    id: 6,
    image: 'https://pbs.twimg.com/media/Go0QWhoboAAHBj5?format=jpg&name=900x900',
    title: 'wintom',
    link: 'https://x.com/windu_utom',
    price: '9000'
  },
  {
    id: 7,
    image: 'https://pbs.twimg.com/media/GgSnJMubEAAxGap?format=jpg&name=large',
    title: '辰◆関けも【M-11】',
    link: 'https://x.com/AxonTatsu',
    price: '6000'
  },
  {
    id: 8,
    image: 'https://pbs.twimg.com/media/GLnfKkabUAAkEx9?format=jpg&name=900x900',
    title: 'のらはす🦑',
    link: 'https://x.com/ng_hus',
    price: '7000'
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