import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

// Get multiple posts based on query parameters
export const getPosts = async (req, res) => {
  const query = req.query;

  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
      },
    });

    res.status(200).json(posts); // Send the response only once
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get posts" }); // Handle error response
  }
};

// Get a single post by ID
export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    const token = req.cookies?.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
          const saved = await prisma.savedPost.findUnique({
            where: {
              userId_postId: {
                postId: id,
                userId: payload.id,
              },
            },
          });
          return res
            .status(200)
            .json({ ...post, isSaved: saved ? true : false }); // Return after sending response
        } else {
          return res.status(200).json({ ...post, isSaved: false }); // Handle invalid token
        }
      });
    } else {
      return res.status(200).json({ ...post, isSaved: false }); // Handle no token case
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get post" }); // Handle error response
  }
};

// Add a new post
export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });
    res.status(200).json(newPost); // Send response after post creation
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create post" }); // Handle error response
  }
};

// Update an existing post (currently no update logic provided)
export const updatePost = async (req, res) => {
  try {
    res.status(200).json(); // Send an empty success response
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update posts" }); // Handle error response
  }
};

// Delete a post by ID
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" }); // Authorization error
    }

    await prisma.post.delete({
      where: { id },
    });

    res.status(200).json({ message: "Post deleted" }); // Success response after deletion
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete post" }); // Handle error response
  }
};
