import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getHotels = async (req, res) => {
  try {
    const hotels = await prisma.postDetail.findMany();
    res.status(200).json(hotels);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users!" });
  }
};

// Get a single hotel by ID
export const getHotel = async (req, res) => {
  const id = req.params.id;
  try {
    const hotel = await prisma.hotel.findUnique({
      where: { id },
    });
    res.status(200).json(hotel);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get hotel!" });
  }
};

// Create a new hotel
export const createHotel = async (req, res) => {
  const { name, location, description, price } = req.body;
  try {
    const newHotel = await prisma.hotel.create({
      data: { name, location, description, price },
    });
    res.status(201).json(newHotel);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create hotel!" });
  }
};

// Update an existing hotel
export const updateHotel = async (req, res) => {
  const id = req.params.id;
  const { name, location, description, price } = req.body;
  try {
    const updatedHotel = await prisma.hotel.update({
      where: { id },
      data: { name, location, description, price },
    });
    res.status(200).json(updatedHotel);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update hotel!" });
  }
};

// Delete a hotel
export const deleteHotel = async (req, res) => {
  const id = req.params.id;
  try {
    await prisma.hotel.delete({
      where: { id },
    });
    res.status(200).json({ message: "Hotel deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete hotel!" });
  }
};
