const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')


const DeliveryManLocationSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    PhoneNumber:{
        type:String,
        required:true
    },
    Latitude:{
        type:String,
        required:true
    },
    Longitude:{
        type:String,
        required:true
    },
    AdhurCard:{
        type:String,
        required:true
    }
})

const OrderSchema = new mongoose.Schema({
    ShopName:{
        type:String,
        required:true
    },
    OrderTime:{
        type:String,
        required:true
    },
    CustomerName:{
        type:String,
        required:true
    },
    ContactNo:{
        type:String,
        required:true
    },
    orderList:{
        type:String,
        required:true
    },
    Amount:{
        type:String,
        required:true
    },
    CustomerAddress:{
        type:String,
        required:true
    },
    CurrentLocation:{
        type:String,
        required:true
    },
    OrderStatus:{
        type:String,
        required:true
    },
    AdminId:{
        type:String,
        required:true
    },
    CustomerId:{
        type:String,
        required:true
    },
    DeliveryManId:{
        type:String
    },
    OrderOtp:{
        type:String
    },
    OrderId:{
        type:String
    },
    CouponCode:{
        type:String,

    },

})




const AddItemSchema = new mongoose.Schema({
    ItemName:{
        type:String,
        required:true
    },
    ItemPrice:{
        type:String,
        required:true
    },
    DiscountPrice:{
    type:String,
    required:true
    },
    ProductImage:{
        type:String,
        required:true
    },
    ItemDiscription:{
        type:String,
        required:true
    },
    ShopName:{
        type:String,
        required:true
    },
    ShopId:{
        type:String,
        required:true
    },
    ItemId:{
        type:String,
        required:true
    },
    AdminId:{
        type:String,
        required:true
    },
    ItemType:{
        type:String,
        required:true
    },
    ItemCategory:{
        type:String,
        required:true
    },
    ItemStatus:{
        type:String,
        required:true
    },
    ItemStatus:{
        type:String,
        required:true
    },
    ItemHalfPrice:{
        type:String
    },
})



const CharesByAreaSchema = new mongoose.Schema({
    AreaName:{
        type:String,
        required:true 
    },
    Price:{
        type:String,
        required:true 
    },

})
const RestorentMenu = new mongoose.Schema({
    AdminId:{
        type:String,
        required:true
    },
    MenuList:{
        type:[String],
        required:true
    },
    UpdatedData:{
        type:String,
        required:true
    },
    UpdatedTime:{
        type:String,
        required:true
    },
    Temp:{
        type:[Object],

    },

})

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        
    },
    Password:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        
    },
    PhoneNumber:{
        type:String,
        required:true
        
    },
    Role:{
        type:String,
        required:true
    },
    Address:{
        type:String,
    },
    Id:{
        type:String,
        required:true
    },
})






const CouponSchema = new mongoose.Schema({
    CouponCode:{
        type:String,
        required:true
    },
    Amount:{
       type:String,   
    },
    Percentage:{
        type:String,  
    },
    ShopId:{
        type:String,
        required:true
    },

})






const AddAddressSchema =new mongoose.Schema({
    Id:{
    type:String,
    required:true
    },
    VillageName:{
        type:String,
        required:true
    },
    PinCode:{
        type:String,
        required:true
    },
    DoorNo:{
        type:String,
        required:true
    },
    Landmark:{
        type:String,
        required:true
    },
    Street:{
        type:String,
        required:true
    },

})

const SuperAdminSchema = new mongoose.Schema({
    email:{
        type:String,
       
    },
    Name:{
        type:String,
        
    },
    PhoneNumber:{
        type:String,
        required:true
    },
    Role:{
        type:String,
        required:true
    },
    Address:{
        type:String,
    },
    SuperAdminId:{
        type:String,
        required:true
    },
    ShopStatus:{
        type:String,
        required:true
    },
})



const AdminUserSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    PhoneNumber:{
        type:String,
        required:true
    },
     ShopName:{
        type:String,
        unique:true,
        required:true
    },
    Role:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    AdminId:{
        type:String,
        required:true,
        unique:true
    },
    ShopPhoto:{
        type:String
    },
    ShopType:{
        type:String,
        required:true
    },
    DeliveryTime:{
        type:String,
    },
    Deliverycharges:{
        type:String
    },
    MainItems:{
        type:String,
        required:true
    },
    ShopStatus:{
        type:String,
        required:true
    },

})





DeliveryManLocationSchema.pre('save',function(next){
    const user = this;
    if(!user.isModified('password')){
        return next()
    }
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            return next(err)
        }
     bcrypt.hash(user.password,salt,(err,hash)=>{
         if(err){
             return next(err)
         }
         user.password = hash;
         next()
     })

    })

})

 

UserSchema.pre('save',function(next){
    const user = this;
    if(!user.isModified('password')){
        return next()
    }
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            return next(err)
        }
     bcrypt.hash(user.password,salt,(err,hash)=>{
         if(err){
             return next(err)
         }
         user.password = hash;
         next()
     })

    })

})


AdminUserSchema.pre('save',function(next){
    const user = this;
    if(!user.isModified('password')){
        return next()
    }
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            return next(err)
        }
     bcrypt.hash(user.password,salt,(err,hash)=>{
         if(err){
             return next(err)
         }
         user.password = hash;
         next()
     })

    })

})

UserSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;
    return new Promise((resolve,reject)=>{
        bcrypt.compare(candidatePassword,user.password,(err,isMatch)=>{
            if(err){
                return reject(err)
            }
            if (!isMatch){
                return reject(err)
            }
            resolve(true)
        })
    })

}



AdminUserSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;
    return new Promise((resolve,reject)=>{
        bcrypt.compare(candidatePassword,user.password,(err,isMatch)=>{
            if(err){
                return reject(err)
            }
            if (!isMatch){
                return reject(err)
            }
            resolve(true)
        })
    })

}


DeliveryManLocationSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;
    return new Promise((resolve,reject)=>{
        bcrypt.compare(candidatePassword,user.password,(err,isMatch)=>{
            if(err){
                return reject(err)
            }
            if (!isMatch){
                return reject(err)
            }
            resolve(true)
        })
    })

}
mongoose.model('User',UserSchema);
mongoose.model('Items',AddItemSchema);
mongoose.model('Orders',OrderSchema);
mongoose.model('AdminUser',AdminUserSchema);
mongoose.model('Delivery',DeliveryManLocationSchema);
mongoose.model('SuperAdminSchema',SuperAdminSchema);
mongoose.model('AddAddressSchema',AddAddressSchema);

mongoose.model('CouponSchema',CouponSchema);

mongoose.model('CouponSchema',CouponSchema);
mongoose.model('CharesByAreaSchema',CharesByAreaSchema);
mongoose.model('RestorentMenu',RestorentMenu);