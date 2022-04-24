import db from "../models/index";
import CRUDServices from "../services/CRUDServices";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    console.log(data);
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (err) {
    console.log(err);
  }
};
let getAboutPage = (req, res) => {
  return res.render("about.ejs");
};
let getUserPage = (req, res) => {
  return res.render("crud.ejs");
};

let postUserPage = async (req, res) => {
  let message = await CRUDServices.createNewUser(req.body);
  console.log(message);
  return res.send("post crud");
};

let displayGetCRUD = async (req, res) => {
  let data = await CRUDServices.getAllUser();
//   console.log("--------------------------");
//   console.log(data);
//   console.log("--------------------------");
  return res.render("displayGetUser.ejs", {
    dataTable: data,
  });
};    
//object:{
//     key:'',
//     value:'',
// }

let getEditCRUD = async (req, res) => {
    let userId = req.query.id ;
   if(userId) {
       let userData = await CRUDServices.getUserInfoById(userId);  
       console.log(userData);
    //    let userData
    return res.render('editCRUD.ejs' , {
        user : userData
    })
   }else{
    return res.send("User not found !")
   }
}

let putCRUD = async (req, res) => {
    let data =  req.body;
    let allUsers = await CRUDServices.updateUserData(data);
    return res.render('displayGetUser.ejs' , {
      dataTable : allUsers
    })
    
}

let deleteCRUD = async (req, res) => {
  let userId =  req.query.id;
  if(userId) {
    await CRUDServices.deleteUserById(userId);
    return res.send('Delete User Success')
  }else {
    return res.send('User not found');
  }

}


module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getUserPage: getUserPage,
  postUserPage: postUserPage,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD : putCRUD,
  deleteCRUD: deleteCRUD
};
