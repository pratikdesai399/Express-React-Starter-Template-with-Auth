const express = require('express');
const app = express();
const { ROLE, users } = require('./data')
const projectRouter = require('./routes/projects')
const {authUser, authRole} = require('./basicAuth')
const port = 5000;

app.use(express.json())
app.use(setUser)
app.use('/projects', projectRouter)

app.get('/', (req, res) => {
  res.send('Home Page')
})

app.get('/dashboard',authUser, (req, res) => {
  res.send('Dashboard Page')
})

app.get('/admin', authUser,authRole(ROLE.ADMIN), (req, res) => {
  res.send('Admin Page')
})

function setUser(req, res, next) {
  const userId = req.body.userId
  //console.log(req.user);
  
  if (userId) {
    req.user = users.find(user => user.id === userId)
  }
  //console.log(req.user);
  next()
}

app.get('/Customers',(req,res)=>{
    const customers = [
        {id: 1, firstname: 'Pratik'},
        {id: 2, firstname: 'Manoj'},
        {id: 3, firstname: 'Desai'}
    ];
    res.json(customers);
});

app.listen(port, ()=> console.log(`SERVER STARTED ON PORT ${port}`));