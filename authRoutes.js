const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('./keys');
const { ORDER } = require('mysql/lib/PoolSelector');
const router = express.Router();
const User = mongoose.model('User');
const Delivery = mongoose.model('Delivery')
 
const Orders = mongoose.model('Orders');
const AdminUser = mongoose.model('AdminUser');
const Item = mongoose.model('Items');
const SuperAdmin = mongoose.model('SuperAdminSchema');


const CharesByArea = mongoose.model('CharesByAreaSchema');
const Coupon = mongoose.model('CouponSchema');

const AddAddress = mongoose.model('AddAddressSchema');

const RestorentMenu = mongoose.model('RestorentMenu');





router.post('/AddMenu',async(req,res) =>{
  const {AdminId,MenuList,UpdatedData,UpdatedTime,Temp} = req.body;

  try{
    const menu = new RestorentMenu({AdminId,MenuList,UpdatedData,UpdatedTime,Temp});

    await  menu.save();
    res.send({"Status":"Added"});
    
    
  }catch(err){Charges
    return res.status(422).send(err.message)
  }
})



router.get('/GetMenu', function(req, res, next) {
 
  const Id = req.query.Id;
  RestorentMenu.find({AdminId:Id},(err, docs) => {
        if(docs.length>0) {
          res.send(docs);
        } else {
          res.send({"Status":"No"});
        }
    });
    
  
});


router.put('/UpdateMenu',async (req,res)=>{
  const {MenuList,UpdatedData,UpdatedTime,_id} = req.body

  
  RestorentMenu.findByIdAndUpdate(_id,{MenuList:MenuList,UpdatedData:UpdatedData,UpdatedTime:UpdatedTime},{useFindAndModify:false})
  .then(data=>{
    res.send({"Status":"Updated"});
  })
  .catch(err=>{
    res.send({"Status":"error"});
  })
})

router.get('/CheckCouponCode', function(req, res, next) {
 
  const id  =req.query.id;
  const shopid =req.query.shopid.replaceAll('"', '');
  const couponcode = req.query.coupon.replaceAll('"', '');
   
  Coupon.find({CouponCode:couponcode,ShopId:shopid},(err, docs) => {
    
    if(docs.length>0) {
          
              Orders.find({CouponCode:couponcode,CustomerId:id},(errr, docss) => {
                
                if(docss.length>0) {
                  
                      res.send({"Status":"user error"})
        
                } else {
                  res.send(docs);
                }
                
            });
           

        } 
        else {
          res.send({"Status":"error"})
        }
         
    });
    res.send(err)
  
});


// Add Coupon

router.post('/AddCoupon',async (req,res)=>{
   
  const {CouponCode,Amount,Percentage,ShopId} = req.body;

  try{
    const user = new Coupon({CouponCode,Amount,Percentage,ShopId});

    await  user.save();
    res.send("Done");
    
  }catch(err){Charges
    return res.status(422).send(err.message)
  }
  
  
})


// Area and Charges

router.post('/AddAreaCharges',async (req,res)=>{
   
  const {AreaName,Price} = req.body;
  const area = await CharesByArea.findOne({AreaName})
  
  if(area){
    res.send({"Status":"Already Existed"})
  }
  else{
    const user = new CharesByArea({AreaName,Price});

    await  user.save();
    res.send({"Status":"Done"});
  }
  console.log("hii")
})



// Get all Charges

router.get('/GetAllCharges', function(req, res, next) {
 
 
   
  CharesByArea.find((err, docs) => {
        if(docs.length>0) {
          res.send(docs);
        } else {
          res.send({"Status":"No"});
        }
    });
    
  
});

// Get Area Charges

router.get('/GetAreaCharges', function(req, res, next) {
 
  const id  =req.query.id;
   
  CharesByArea.find({AreaName:id},(err, docs) => {
        if(docs.length>0) {
          res.send(docs);
        } else {
          res.send({"Status":"No"});
        }
    });
    
  
});



// Get User Address

router.get('/GetUserAddresses', function(req, res, next) {
 
  const id  =req.query.id;
   
  AddAddress.find({Id:id},(err, docs) => {
        if(docs.length>0) {
          res.send(docs);
        } else {
          res.send({"Status":"No"});
        }
    });
    
  console.log("done")
});





router.post('/AddUserAddresses',async (req,res)=>{
   
  const {Id,VillageName,PinCode,DoorNo,Landmark,Street } = req.body;

  try{
    const user = new AddAddress({Id,VillageName,PinCode,DoorNo,Landmark,Street});
    await  user.save();
    res.send("Done");
  }catch(err){
    return res.status(422).send(err.message)
  }
  
  
})




router.post('/UserSignup',async (req,res)=>{
   
  const {PhoneNumber,Name,Role,Address,Id,Password } = req.body;
  const user = await User.findOne({PhoneNumber})
  
  if(user){
    res.send({"Status":"Already"})
  }
  else{

       
          const user = new User({PhoneNumber,Name,Role,Address,Id,Password });
          user.save();
          res.send({"Status":"Yes"});
         console.log("done");


  }
     
 
     
    
})

 
router.post('/UserSigin',async (req,res)=>{
   
  const {PhonNumber,Password} = req.body
  if(PhonNumber==="" || Password===""){
       res.send({"Status":"Wrong"})
  }
  const user = await User.findOne({PhonNumber})

  if(!user){
       res.send({"Status":"NO"})
  }
  else{
      User.find({PhoneNumber:PhonNumber,Password:Password},(err, docs) => {
        if (docs.length>0) {
            res.send(docs);
           
        } else {
          res.send({"Status":"PASS ERROR"});
        }
      });
  }

    
})


router.post('/UserSiginWithOTP',async (req,res)=>{
   
  const {PhonNumber} = req.body
  if(PhonNumber===""){
       res.send({"Status":"Wrong"})
  }
  const user = await User.findOne({PhonNumber})

  if(!user){
       res.send({"Status":"NO"})
  }
  else{
      User.find({PhoneNumber:PhonNumber},(err, docs) => {
        if (docs.length>0) {
            res.send(docs);
           
        } else {
          res.send({"Status":"NO"})
        }
      });
  }
})







router.get('/GetUserNewOrOld', function(req, res, next) {
 
  const id  =req.query.id;
   
  User.find({PhoneNumber:"+91"+id},(err, docs) => {
        if(docs.length>0) {
          res.send({"Status":"Yes"});
        } else {
          res.send({"Status":"No"});
        }
    });
    
  
});


router.post('/UserDeliveryMansignup',async (req,res)=>{
   
  const {email,password,Name,PhoneNumber,id,Latitude,Longitude,AdhurCard} = req.body;

  try{
    const user = new Delivery({email,password,Name,PhoneNumber,id,Latitude,Longitude,AdhurCard});
    await  user.save();
    const token = jwt.sign({userId:user._id},jwtkey)
    res.send({token})

  }catch(err){
    return res.status(422).send(err.message)
  }
  
  
})



router.post('/UserDeliveryMansignin',async (req,res)=>{
  const {email,password} = req.body
  if(!email || !password){
      return res.status(422).send({error :"must provide email or password"})
  }
  const user = await Delivery.findOne({email})
  if(!user){
      return res.status(422).send({error :"must provide email or password"})
  }
  try{
    await user.comparePassword(password);    
    const token = jwt.sign({userId:user._id},jwtkey)
    res.send({token})
  }catch(err){
      return res.status(422).send({error :"must provide email or password"})
  }

})
/*
router.post('/DeliveryUserSignUp',async (req,res)=>{
   
  const {email,Name,PhoneNumber,AdhurCard,Latitude,Longitude,id} = req.body;

  try{
    const user = new User({email,Name,PhoneNumber,AdhurCard,Latitude,Longitude,id});
    await  Delivery.save();
    
    res.send("User Created")

  }catch(err){
    return res.status(422).send(err.message)
  }
  
  
})
*/

router.put('/LocationUpdate',async (req,res)=>{
  const {PhoneNumber,Latitude,Longitude} = req.body
  const user = await Delivery.findOne({PhoneNumber})
  Delivery.findByIdAndUpdate(user._id,{Latitude:Latitude,Longitude:Longitude},{useFindAndModify:false})
  .then(data=>{
    res.send(data);
  })
  .catch(err=>{
    res.send("error....!");
  })
})



//update shop availability

router.put('/OpenOrCloseShop',async (req,res)=>{
  const {status,Id} = req.body
 
  AdminUser.findByIdAndUpdate(Id,{ShopStatus:status},{useFindAndModify:false})
  .then(data=>{
    res.send(data);
  })
  .catch(err=>{
    res.send("error....!");
  })
})




router.put('/UpdateItemStatus',async (req,res)=>{
  const {status,Id} = req.body
 
  Item.findByIdAndUpdate(Id,{ItemStatus:status},{useFindAndModify:false})
  .then(data=>{
    res.send(data);
  })
  .catch(err=>{
    res.send("error....!");
  })
})


// update item details

router.put('/UpdateItemDetails',async (req,res)=>{
  const {ItemName,ItemPrice,DiscountPrice,Id} = req.body
 
  Item.findByIdAndUpdate(Id,{ItemName:ItemName,ItemPrice:ItemPrice,DiscountPrice:DiscountPrice},{useFindAndModify:false})
  .then(data=>{
    res.send(data);
  })
  .catch(err=>{
    res.send("error....!");
  })
})

/*
router.post('/UserSignin',async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).send({error :"must provide email or password"})
    }
    const user = await User.findOne({email})
    if(!user){
        return res.status(422).send({error :"must provide email or password"})
    }
    try{
      await user.comparePassword(password);    
      const token = jwt.sign({userId:user._id},jwtkey)
      res.send({token})
    }catch(err){
        return res.status(422).send({error :"must provide email or password"})
    }

})

*/


// Admin siginin 

router.post('/AdminSignup',async (req,res)=>{
   
  const {email,password,PhoneNumber,Name,Role,ShopName,Address,AdminId,ShopPhoto,ShopType,DeliveryTime,Deliverycharges,ShopStatus,MainItems} = req.body;

  try{
    const user = new AdminUser({email,password,PhoneNumber,Name,Role,ShopName,Address,AdminId,ShopPhoto,ShopType,DeliveryTime,Deliverycharges,ShopStatus,MainItems});
    await  user.save();
    const token = jwt.sign({userId:user._id},jwtkey)
    res.send({token})

  }catch(err){
    return res.status(422).send(err.message)
  }
  
  
})



//Admin siginup

router.post('/AdminSignin',async (req,res)=>{
  const {email,password} = req.body
  if(!email || !password){
      return res.status(422).send({error :"must provide email or password"})
  }
  const user = await AdminUser.findOne({email})
  if(!user){
      return res.status(422).send({error :"must provide email or password"})
  }
  try{
    await user.comparePassword(password);    
    const token = jwt.sign({userId:user._id},jwtkey)
    res.send({token})
  }catch(err){
      return res.status(422).send({error :"must provide email or password"})
  }
  


})








router.post('/AddItem',async (req,res)=>{
   
  const {ItemName,ItemPrice,ProductImage,ItemDiscription,ShopName,ShopId,AdminId,ItemType,ItemCategory,ItemStatus,ItemHalfPrice} = req.body;

  try{
    const user = new User({ItemName,ItemPrice,ProductImage,ItemDiscription,ShopName,ShopId,AdminId,ItemType,ItemCategory,ItemStatus,ItemHalfPrice});
    await  Item.save();
    
  }catch(err){
    return res.status(422).send(err.message)
  } 
})



router.get('/GetRestorents', function(req, res, next) {
  const id =  req.query.id;
  if(id==="All" ||id===""){
    AdminUser.find((err, docs) => {
      if (!err) {
           res.send(docs);
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
    });
  }
  else{
      AdminUser.find({Address:id},(err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
     });
  }
  

});




// get all restorents for admin


router.get('/GetRestorentsForAdmins', function(req, res, next) {
  const id =  req.query.id;
  if(id==="All" ||id===""){
    AdminUser.find((err, docs) => {
      if (!err) {
           res.send(docs);
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
    });
  }
  else{
      AdminUser.find({AdminId:id},(err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
     });
  }
  

});




router.get('/GetItems', function(req, res, next) {
  const id=  req.query.id;
  const itemname = req.query.itemname;
  const veg = req.query.veg;
  
  if(itemname==="All" && veg==="All" ||itemname==="" && veg==="All"  ){
    Item.find({ShopId:id},(err, docs) => {
      if (!err) {
           res.send(docs);
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
    });
  }
  else if(itemname==="All" && veg!=="All"){
    Item.find({ShopId:id,ItemType:veg},(err, docs) => {
      if (docs.length>0) {
           res.send(docs);
           console.log("hhhhhh")
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
    });
  }
  else if(itemname!=="All" && veg==="All"){
    Item.find({ShopId:id,ItemCategory:itemname},(err, docs) => {
      if (!err) {
           res.send(docs);
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
    });
  }
  else{
    Item.find({ShopId:id,ItemType:veg,ItemCategory:itemname},(err, docs) => {
      if (!err) {
           res.send(docs);
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
    });
  }
  console.log(veg,itemname,id)

});


//All items


router.get('/GetAllItems', function(req, res, next) {
 
 
   
  Item.find((err, docs) => {
      if (docs.length>0) {
           res.send(docs);
      } else {
        res.send("done")
          console.log('Failed to retrieve the Course List: ' + err);
      }
  });
  

});

//get items to admin panel
router.get('/GetAdminItem', function(req, res, next) {
  const id=  req.query.id;
 
    Item.find({ShopId:id},(err, docs) => {
      if (!err) {
           res.send(docs);
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
    });
  
  

});



//delete item card from admin

router.get('/deleteItem', function (req, res) {
  var id = req.query.id;
  
 
  Item.deleteOne({ _id:id}, function (err, results) {
    if(!err){
      console.log("Deleted successfully");
    }
  });

  res.json({ success: id })
});

// delete Charges

router.get('/deleteCharges', function (req, res) {
  var id = req.query.id;
  
 
  CharesByArea.deleteOne({ _id:id}, function (err, results) {
    if(!err){
      console.log("Deleted successfully");
    }
  });

  res.json({ success: id })
});



// delete admins

router.get('/deleteAdmins', function (req, res) {
  var id = req.query.id;
  
 
  AdminUser.deleteOne({ _id:id}, function (err, results) {
    if(!err){
      console.log("Deleted successfully");
    }
  });
 bn
  res.json({ success: id })
});


// delete customer


router.get('/deleteCustomer', function (req, res) {
  var id = req.query.id;
  
 
  User.deleteOne({ _id:id}, function (err, results) {
    if(!err){
      console.log("Deleted successfully");
    }
  });

  res.json({ success: id })
});


//place order

router.post('/Orders',async (req,res)=>{
   
  const {CustomerName,ContactNo,orderList,Amount,CustomerAddress,CurrentLocation,OrderStatus,AdminId,CustomerId,DeliveryManId,OrderOtp,OrderId,ShopName,OrderTime,CouponCode} = req.body;

  try{
    const user = new Orders({CustomerName,ContactNo,orderList,Amount,CustomerAddress,CurrentLocation,OrderStatus,AdminId,CustomerId,DeliveryManId,OrderOtp,OrderId,ShopName,OrderTime,CouponCode});
    await  user.save();
    res.send("done")
    
  }catch(err){
    return res.status(422).send(err.message)
  } 
})


//admin orders

router.get('/GetOrders', function(req, res, next) {
  const id =  req.query.id;
  const Type =  req.query.Type;
  Orders.find({AdminId:id,OrderStatus:Type},(err, docs) => {
      if (!err) {
           res.send(docs);
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
  });
  

});

// get orders for analatics
router.get('/GetOrderAnalytics',(req,res)=>{

  const id =  req.query.id;
  const Type =  req.query.Type;
  
  console.log(id)
  if(Type){
      Orders.find({AdminId:id,OrderStatus:'Delivered'},(err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
          res.send("Error")
            console.log('Failed to retrieve the Course List: ' + err);
        }
    });
  }
  else{
    Orders.find({AdminId:id},(err, docs) => {
      if (!err) {
           res.send(docs);
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
  });
  }
  console.log(Type)


})
 

 


router.get('/GetOrdersForSuperAdmin', function(req, res, next) {
  const id = req.query.id;
   
  Orders.find({OrderStatus:id},(err, docs) => {
      if (!err) {
           res.send(docs);
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
  });
  

});




//user orders

router.get('/GetUserPresentOrders', function(req, res, next) {
  const id ="+"+req.query.id.replaceAll('"', '');
   
 //console.log(id.replace(/ /g,''))
  Orders.find({ContactNo:id.replace(/ /g,''),OrderStatus:["Accepted","Pending","AcceptedByDeliveryBoy"]},(err, docs) => {
      if (!err) {
              res.send(docs) 
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
  });
  

});


router.get('/GetUserHistoryOrders', function(req, res, next) {
  const id ="+"+req.query.id.replaceAll('"', '');

 //console.log(id.replace(/ /g,''))
  Orders.find({ContactNo:id.replace(/ /g,''),OrderStatus:["Delivered","CanceledByCustomer","Declain"]},(err, docs) => {
      if (!err) {
           res.send(docs);
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
  });
  //console.log("hi")

});






///customer data

router.get('/GetUser', function(req, res, next) {
  const id ="+"+req.query.id.replaceAll('"', '');
 
 //console.log(id.replace(/ /g,''))
  User.find({PhoneNumber:id.replace(/ /g,'')},(err, docs) => {
      if (!err) {
           res.send(docs);
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
  });
  

});






//update about orders///////


router.put('/UpdateDeliveryOrderStatus',async (req,res)=>{
  const {status,orderId,deliverymanid} = req.body
 
  Orders.findByIdAndUpdate(orderId,{DeliveryManId:deliverymanid,OrderStatus:status},{useFindAndModify:false})
  .then(data=>{
    res.send(data)
  })
  .catch(err=>{
    res.send("error....!");
  })
})




// update charges




router.put('/UpdateCharges',async (req,res)=>{
  const {AreaName,Id,Price } = req.body
 
  CharesByArea.findByIdAndUpdate(Id,{AreaName:AreaName,Price:Price},{useFindAndModify:false})
  .then(data=>{
    res.send(data)
  })
  .catch(err=>{
    res.send("error....!");
  })
})


///////////////


router.put('/OrderAcceptanceStatus',async (req,res)=>{
  const {status,orderId} = req.body
 
  Orders.findByIdAndUpdate(orderId,{ OrderStatus:status},{useFindAndModify:false})
  .then(data=>{ 
    res.send(data);
  })
  .catch(err=>{
    res.send("error....!");
  })
})


/////

router.put('/OrderCancel',async (req,res)=>{
  const {status,orderId} = req.body
 
  Orders.findByIdAndUpdate(orderId,{ OrderStatus:status},{useFindAndModify:false})
  .then(data=>{
    res.send(data);
  })
  .catch(err=>{
    res.send("error....!");
  })
})




router.post('/OrderDelivered', function(req, res, next) {
  const {otp,id} = req.body
 // console.log(typeof(otp),id);
  Orders.find({OrderOtp:otp,_id:id},(err, docs) => {
    //console.log(docs);
      if (docs.length>0) {
            Orders.findByIdAndUpdate(id,{ OrderStatus:"Delivered"},{useFindAndModify:false})
            .then(data=>{
              res.send({"status":"Done"})
             console.log(data);
            })
            .catch(err=>{
              //s
            })
      } else {
        res.send({"status":"Not Done"});
        console.log("not done")
      }
  });
});


//get order for delivery boys

router.get('/GetOrdersByStatus', function(req, res, next) {
  const status =  req.query.status.replaceAll('"', '');

  Orders.find({OrderStatus:status},(err, docs) => {
      if (!err) {
           res.send(docs);
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
  });
  

});



router.post('/UserOrderDelivered', function(req, res, next) {
  const {otp,id} = req.body
  User.find({OrderOtp:otp,_id:id},(err, docs) => {
      if (docs.length>0) {
            Orders.findByIdAndUpdate(id,{ OrderStatus:"Delivered"},{useFindAndModify:false})
            .then(data=>{
              res.send(data)
            })
            .catch(err=>{
              //
            })
      } else {
        res.send({"status":"Order not Done"});
      }
  });
});



router.put('/UpdateUserDetails',async (req,res)=>{
  const {PhoneNumber,Name,Address,Id} = req.body
  
  User.findByIdAndUpdate(Id,{PhoneNumber:PhoneNumber,Name:Name,Address:Address},{useFindAndModify:false})
  .then(data=>{
    res.send(data);
  })
  .catch(err=>{
     console.log("error");
  })
})



router.put('/UpdateAdminDetails',async (req,res)=>{
  const {PhoneNumber,Name,ShopName,Address,ShopPhoto,DeliveryTime,Deliverycharges,Id} = req.body
  
  AdminUser.findByIdAndUpdate(Id,{PhoneNumber:PhoneNumber,Name:Name,ShopName:ShopName,Address:Address,ShopPhoto:ShopPhoto,DeliveryTime:DeliveryTime,Deliverycharges:Deliverycharges},{useFindAndModify:false})
  .then(data=>{
    res.send(data);
  })
  .catch(err=>{
     console.log("error");
  })
})




router.get('/GetOrdersOfDeliveryBoy', function(req, res, next) {
  const id =  req.query.id.replaceAll('"', '');
  const status =  req.query.status.replaceAll('"', '');

  Orders.find({DeliveryManId:id,OrderStatus:status},(err, docs) => {
      if (!err) {
           res.send(docs);
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
  });
  
  

});



router.get('/GetAdmins', function(req, res, next) {
  

  AdminUser.find({Role:"Admin"} ,(err, docs) => {
      if (!err) {
           res.send(docs);
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
  });
  

});


router.get('/GetUsers', function(req, res, next) {
 

  User.find( (err, docs) => {
      if (!err) {
           res.send(docs);
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
  });
  

});



router.get('/GetItemsByCat', function(req, res, next) {
 
const id  =req.query.id;
 
  Item.find({ItemType:"Starters"},(err, docs) => {
      if (docs.length>0) {
           res.send(docs);
      } else {
        res.send("done")
          console.log('Failed to retrieve the Course List: ' + err);
      }
  });
  

});

router.get('/GetItemByVegOrNonVeg', function(req, res, next) {
 
  const id  =req.query.id;
    if(id=="All"){
      Item.find((err, docs) => {
        if (!err) {
             res.send(docs);
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    });

    }
    else{
      Item.find({ItemCategory:id},(err, docs) => {
        if (!err) {
             res.send(docs);
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    });
    }
    
  
  });


router.get('/GetShopsByType', function(req, res, next) {
 
    const id  =req.query.id;
      AdminUser.find({ShopType:id},(err, docs) => {
          if (!err) {
               res.send(docs);
          } else {
              console.log('Failed to retrieve the Course List: ' + err);
          }
      });
      
    
});

router.get('/GetDeliveryLocation', function(req, res, next) {
 
  const id  =req.query.id;
    Delivery.find({_id:id},(err, docs) => {
        if (!err) {
             res.send(docs);
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    });
    
  
});




 







router.post('/AddItems',async (req,res)=>{
   
  const {ItemName,ItemPrice,ItemDiscription,ShopName,ShopId,ItemId,AdminId,ItemType,ItemCategory,ProductImage,DiscountPrice,ItemStatus} = req.body;
  try{
    const item = new Item({ItemName,ItemPrice,ProductImage,ItemDiscription,ShopName,ShopId,ItemId,AdminId,ItemType,ItemCategory,DiscountPrice,ItemStatus});
    await  item.save();
   
    res.send("Done");
  }catch(err){
    return res.status(422).send(err.message)
  }
  
   
})



router.get('/GetAdminForRes', function(req, res, next) {
 
  const id  =req.query.id.replaceAll('"', '');
    AdminUser.find({AdminId:id},(err, docs) => {
        if (!err) {
             res.send(docs);
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    });
  // console.log(id);
  
});



router.get('/FindOrderForSuperAdminByOrderId', function(req, res, next) {
 
  const id  =req.query.id;
  const k = req.query.orderid.replaceAll('"', '');
   
   if(k==="All" || k===""){

          Orders.find({OrderStatus:id},(err, docs) => {
            if (!err) {
                res.send(docs);
            } else {
                console.log('Failed to retrieve the Course List: ' + err);
            }
        });
        
  

   }
   else{
          Orders.find({OrderStatus:id,OrderId:k},(err, docs) => {
            if (!err) {
              res.send(docs);
          } else {
              console.log('Failed to retrieve the Course List: ' + err);
          }
        });
  
   }
  
});



router.get('/FindOrderForAdminByOrderId', function(req, res, next) {
 
  const id  =req.query.id;
  const k = req.query.orderid.replaceAll('"', '');
  const adminid =req.query.Adminid;
   
   if(k==="All" || k===""){

          Orders.find({OrderStatus:id,AdminId:adminid},(err, docs) => {
            if (!err) {
                res.send(docs);
            } else {
                console.log('Failed to retrieve the Course List: ' + err);
            }
        });
        
  

   }
   else{
          Orders.find({OrderStatus:id,OrderId:k,AdminId:adminid},(err, docs) => {
            if (!err) {
              res.send(docs);
          } else {
              console.log('Failed to retrieve the Course List: ' + err);
          }
        });
  
   }
  
});

module.exports = router