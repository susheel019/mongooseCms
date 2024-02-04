const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/myBlogDb').then(()=>{
    console.log('database connected successfully');
});
const blogSchema = mongoose.Schema({
    title:{type: String , required: true},
    author:String,
    comment:[{body: String , date: Date}],
    date:{type:Date , default: Date.now },
    hidden: Boolean,
    meta:{
        votes: Number,
        favs: Number
    }
});
const Blog = mongoose.model('blog' , blogSchema);

Blog.find({_id:'65bba4f828dfd7e9c73c52fa'}).then((obj) =>{
    var obj1 = obj[0];
    obj1.title= 'new tilte';
    obj1.save();
})

// var newBlog = new Blog({
//     title:'First blog',
//     author:'Susheel k yadav',
//     body: 'only for testing'
// });

// newBlog.save();
const schema = new mongoose.Schema({name:String , size:String});
const Tank = mongoose.model('Tank' , schema);