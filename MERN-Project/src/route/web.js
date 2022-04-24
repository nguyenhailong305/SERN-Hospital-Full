import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRouter = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/user", homeController.getUserPage);
  router.post("/post-user", homeController.postUserPage);
  router.get("/get-user", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-user", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);


  router.post("/api/login" , userController.handleLogin)
  router.get("/api/get-all-users", userController.handleGetAllUsers)
  router.post("/api/create-new-users", userController.handleCreateNewUsers)
  router.put("/api/edit-users", userController.handleEditUsers)
  router.delete("/api/delete-users", userController.handleDeleteUsers);

  router.get('/api/allcode' , userController.getAllCode);

  //rest api 
  return app.use("/", router);
};

module.exports = initWebRouter;
