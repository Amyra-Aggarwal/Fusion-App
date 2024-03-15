const express= require ('express');
const mongoose= require ('mongoose');
const jwt= require ('jsonwebtoken');
const bcrypt= require ('bcryptjs');
const cors= require ('cors');


//middleware
const app=express();
app.use(express.json());
app.use(cors());


//connect mongodb
const URI='mongodb://127.0.0.1:27017/social';
mongoose.connect(URI);

//user Schema
const UserSchema= new mongoose.Schema({
username:String,
password:String,
});
const User = mongoose.model('User', UserSchema);


//Register user
app.post('/register',async(req,res)=>
{
    try{
        const hashedpassword=bcrypt.hashSync(req.body.password,8);
        const alreadyuser=await User.findOne({username:req.body.username});
        if(alreadyuser){
            res.status(409).send('User already exist');
        }
        else {const user= new User({username:req.body.username,password:hashedpassword});
        await user.save();
        res.status(201).send('User Resgistered Succesfully');}
    }
    catch(error){
        res.status(500).send('Error registering user');
    }
}
)

//Login user
app.post('/login',async(req,res)=>{
    try{
        const user=await User.findOne({username:req.body.username});
        if(user && bcrypt.compareSync(req.body.password,user.password)){
             const token =jwt.sign({userId:user.id},'Amyra');
             res.json({token});
        }
        else{
            res.status(401).send('Invalid credentials');
        }
    }
    catch(error){
        res.status(500).send('Error using Login');
    }
})

//Post Schema
const PostSchema= new mongoose.Schema({
    userId:mongoose.Schema.Types.ObjectId,
    title:String,
    content:String,
})
const Post=mongoose.model('Post',PostSchema);

//middleware jwt token 
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(403).send('A token is required for authentication');
    }
  
    try {
      req.user = jwt.verify(token.split(' ')[1], 'Amyra'); // removing string added in front 
      next();
    } catch (err) {
      return res.status(401).send('Invalid Token');
    }
  }


//create post 
app.post('/posts',verifyToken,async(req,res)=>{
    try{
        const post=new Post({userId:req.user.userId,title:req.body.title,content:req.body.content});
        await post.save();
        res.status(201).send('Post created successfully');
    }
    catch(error){
        res.status(500).send('Error creating post');
    }
});

//get all posts
app.get('/posts',verifyToken,async(req,res)=>{
    try{
        const posts=await Post.find();
        res.send(posts);
    }
    catch(error){
        res.status(500).send('Error fetching posts');
    }
}
)
//fetch single post
app.get('/posts/:postId',verifyToken,async(req,res)=>{
    try{
        const post = await Post.findById(req.params.postId);
        res.status(201).send(post);
    }
    catch(error){
        res.status(500).send('Error fetching post');
    }
})

// update the post
app.put('/posts/:postId', verifyToken, async (req, res) => {
    try {
        const postId = req.params.postId;
        const updatedPost = await Post.findByIdAndUpdate(postId, req.body);

        if (!updatedPost) {
            return res.status(404).send('Post not found');
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).send('Error updating post');
    }
});

//get username
app.get('/getusername', verifyToken, async (req, res) => {
    try {
      const userId = req.user.userId;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).send('User not found');
      }
      const username = user.username;
      res.status(200).json({ username });
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).send('Invalid token');
      }
      res.status(500).send('Error fetching username');
    }
  });

//listening port 
const port=3000;
app.listen(port, () => {
console.log(`Server is running on port ${port}`);})