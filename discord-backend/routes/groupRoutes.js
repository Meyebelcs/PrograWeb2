const express = require('express');
const router = express.Router();
const Joi = require('joi'); 
const validator = require('express-joi-validation').createValidator({});
const auth = require('../middleware/auth');
const groupControllers = require('../controllers/group/groupControllers');

const createGroupSchema = Joi.object({
    name: Joi.string().required(),
    participants: Joi.array().required(),
});

router.post(
    '/create',
    auth,
    validator.body(createGroupSchema),
    groupControllers.controllers.postGroup
);

module.exports = router;