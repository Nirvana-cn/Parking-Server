let mongoose = require('mongoose')       //引用mongoose
let UserSchema = new mongoose.Schema({       //创建数据模板
    name: String,
    age: {type: Number, default: 0},
    sex: {type: String, default: "male"},    //指定数据类型，default选项指数据缺失时的默认值
    birth: String
})
let db = mongoose.connection;   //当使用mongoose.connect()方法连接数据库时，数据库的实例依附在mongoose.connection上
let collectionName='user'
let User = mongoose.model('user', UserSchema,collectionName)    //将模板绑定到指定的collection上
mongoose.connect('mongodb://localhost:27017/user')

db.once('open', function () {       //监测数据库实例的状态
    console.log("Mongo is working")
})
db.once('close',function () {       //监测数据库实例的状态
    console.log("Mongo is closed!")
})

User.create({       //增加记录
    name:'jiwei',
    age:20,
    sex:'female'
},function () {
    console.log("Insert success!")
});

User.find({name: 'wuwei'}, function (err, data) {   //查询操作
    if (err) {
        console.log("find failure")
    } else {
        console.log("find success!")
        data.forEach((item)=>console.log(item))
    }
});
User.findOneAndUpdate({name:'wuwei'},{age:21},function () {     //查询并更新
    console.log("Update success!")
})
User.where({name:'wuwei'}).update({$set:{age:22}},function () {     //更新操作
    console.log("Update success!")
    mongoose.disconnect(function () {       //断开数据库连接
        console.log("Mongo is closed!")
    })
})

User.remove({name:'jiwei'},function () {        //删除操作
    console.log("Remove success!")
})