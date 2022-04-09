const {Router} = require('express');

const AuthService = require('../service/auth.service');
const PostService = require('../service/post.service');

const router = Router();

router
    .post('/auth/singin', AuthService.singIn)
    .post('/auth/singup', AuthService.singUp)


router.route('/post')
    .post(PostService.create)
    .get(PostService.getOne)
    .delete(PostService.delete);

router.get('/posts', PostService.getAll);

module.exports = router;