const Post = require('../database/models/Post');

const SAVE_POST_ERROR = 'SAVE_POST_ERROR';
const SAVE_POST_SUCCESS = 'SAVE_POST_SUCCESS';

const FIND_POST_ERROR = 'FIND_POST_ERROR';

const DELETE_POST_ERROR = 'DELETE_POST_ERROR';
const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';

class PostService {
    static async create(req, res) {
        const { 
            title, 
            description, 
            phone, 
            address
        } = req.body;

        const newPost = Post.build({
            title, 
            description, 
            phone, 
            address
        });

        try {
            await newPost.save();
        } catch (error) {
            console.error(error);
            return res.status(400).json({message: SAVE_POST_ERROR});
        }

        return res.status(200).json({message: SAVE_POST_SUCCESS});
    }

    static async getOne(req, res) {
        const {id} = req.body;

        let post;
        try {
            post = await Post.findOne({
                where: {id}
            });
        } catch(error) {
            console.error(error);
            return res.status(400).json({message: FIND_POST_ERROR});
        }

        if (!post) return res.status(400).json({message: FIND_POST_ERROR});

        const formatedPost = {
            id: post.id,
            title: post.title, 
            description: post.description, 
            phone: post.phone, 
            address: post.address
        };

        return res.status(200).json(formatedPost);
    }

    static async getAll(req, res) {
        const {skip = 0, amount = 5} = req.body;

        let posts;
        try {
            posts = await Post.findAll({skip, amount});
        } catch(error) {
            console.error(error);
            return res.status(400).json({message: FIND_POST_ERROR});
        }

        if (!posts) return res.status(400).json({message: FIND_POST_ERROR});

        const mappedPosts = posts.map(
            ({id, title, description, phone, address}) => {
                return {
                    id,
                    title, 
                    description, 
                    phone, 
                    address
                }
            }
        )

        return res.status(200).json({
            posts: mappedPosts,
            skip,
            amount,
            len: posts.length,
        });
    }
    
    static async delete(req, res) {
        const {id} = req.body;
        
        try {
            await Post.destroy({
                where: {id}
            })
        } catch (error) {
            console.error(error);
            return res.status(400).json({message: DELETE_POST_ERROR});
        }

        return res.status(200).json({message: DELETE_POST_SUCCESS});
    }

    static async update(req, res) {}
}

module.exports = PostService