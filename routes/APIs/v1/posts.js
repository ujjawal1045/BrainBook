const express = require('express');
const router = express.Router();
const postsApi = require('../../../controllers/APIs/v1/posts_api');


router.get('/',postsApi.index);


module.exports = router;