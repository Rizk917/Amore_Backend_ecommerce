import express from "express";
import contactModels from "../models/contactUS.js";

const getcontactus = async (req, res) => {
  try {
    const getcontact = await contactModels.find();
    res.status(200).json(getcontact);
  } catch (err) {
    res.json({ message: err });
  }
};

const postcontactus = async (req, res) => {
  if (!req.body.fullName || !req.body.Message || !req.body.email) {
    res.status(400).json({ message: "Error" });
  } else {
    const contactpost = await contactModels.create({
      fullName: req.body.fullName,
      email: req.body.email,
      Message: req.body.Message,
    });
    return res.status(200).json(contactpost);
  }
};
const contUs = async (req, res) => {
  try {
    const cusdel = await contactModels.findById(req.params.id);
    if (!cusdel) {
      return res.status(404).json({ error: true, message: 'Error: document not found' });
    }
    await cusdel.deleteOne();
    return res.status(200).json({ id: req.params.id });
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
};

const contactusController = {
  getcontactus,
  postcontactus,
  contUs
};

export default contactusController;
