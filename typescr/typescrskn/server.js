import express from 'express';
import cors from 'cors';

let users = [];
let commissions = [{
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
  }];

const app = express();
app.use(cors());
app.use(express.json());

//register
app.post('/api/register', (req, res) => {
  const { nickname, email, password, role, artistLink } = req.body;
  if (!nickname || !email || !password || !role) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  if (users.some(u => u.email === email)) {
    return res.status(409).json({ error: 'User already exists' });
  }
  const newUser = {
    id: users.length + 1,
    nickname,
    email,
    password,
    role,
    artistLink: role === 'artist' ? artistLink : undefined,
    token: Math.random().toString(36).slice(2)
  };
  users.push(newUser);
  const { password: pw, ...userNoPw } = newUser;
  res.status(201).json(userNoPw);
});
//login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const { password: pw, ...userNoPw } = user;
  res.json(userNoPw);
});

//comms end
app.get('/api/commissions', (req, res) => {
  res.json(commissions);
});

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
let userFavorites = {};

//user token
function getUserByToken(req) {
  const auth = req.headers.authorization || "";
  const token = auth.replace("Bearer ", "");
  return users.find(u => u.token === token);
}

// get fav
app.get('/api/favorites', (req, res) => {
  const user = getUserByToken(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  res.json(userFavorites[user.id] || []);
});

// add fav
app.post('/api/favorites', (req, res) => {
  const user = getUserByToken(req);
  const { artworkId } = req.body;
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  if (!userFavorites[user.id]) userFavorites[user.id] = [];
  if (!userFavorites[user.id].includes(artworkId)) {
    userFavorites[user.id].push(artworkId);
  }
  res.status(201).json(userFavorites[user.id]);
});

// rem fav
app.delete('/api/favorites/:id', (req, res) => {
  const user = getUserByToken(req);
  const id = Number(req.params.id);
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  userFavorites[user.id] = (userFavorites[user.id] || []).filter(fid => fid !== id);
  res.json(userFavorites[user.id]);
});
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
