const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

//everything starts with '/user/:userId/application

//GET '/user/:userId/application
router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    console.log(currentUser)
    res.render('applications/index.ejs', {
      applications: currentUser.applications,
    });
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error)
    res.redirect('/')
  }
});

router.get('/new', async (req,res) => {
  res.render('applications/new.ejs')
})

//GET 
router.get('/:applicationId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const application = currentUser.applications.id(req.params.applicationId);
    res.render('applications/show.ejs', {
      application: application,
    });
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/')
  }
});

//PUT 
router.put("/:applicationId", async (req,res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const application = currentUser.applications.id(req.params.applicationId);
    application.set(req.body)
    await currentUser.save()
    res.redirect(`/users/${currentUser,_id}/applications/${req.params.applicationId}`)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

//GET '/users/:/userId/applications
router.get('/:applicationId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const application = currentUser.applications.id(req.params.applicationId);
    res.render('applications/edit.ejs', {
      application: application,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});


//Post '/users/:/userId/applications
router.post('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.applications.push(req.body);
    // Save changes to the user
    await currentUser.save();
    // Redirect back to the applications index view
    res.redirect(`/users/${currentUser._id}/applications`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/')
  }
});


//DELETE '/users/:userId/applications/:applicationsId'
router.delete('/:applicationId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.applications.id(req.params.applicationId).deleteOne();
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/applications`);
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});

module.exports = router;