import Post from '../models/Posts.js'
import {v4 as uuid} from 'uuid'

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        return res.json(posts)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export const createPost = async (req, res) => {

    try {
        const { title, description, completed} = req.body
        const id = uuid()
        const newPost = new Post({ title, description, completed, id })
        await newPost.save()
        return res.json(newPost)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params
        const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true })
        return res.send(updatedPost)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params
        const deletedPost = await Post.findByIdAndDelete(id)
        if (!deletedPost) return res.sendStatus(404)
        return res.send(deletedPost)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export const getPost = async (req, res) => {

    try {
        const { id } = req.params
        const findedPost = await Post.findById(id)
        if (!findedPost) return res.sendStatus(404)
        return res.json(findedPost);
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message });
    }
}