import express from "express";

import CompanyModel from "../models/CompanyModel.js";

const companyRouter = express.Router();

companyRouter.post("/create", async (req, res) => {
  try {
    const newCompany = new CompanyModel(req.body);
    const savedCompany = await newCompany.save();
    if (savedCompany) {
      res.status(200).json(savedCompany);
    } else {
      res.status(401).send({ error: "Company details Is not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
companyRouter.get("/getcompany", async (req, res) => {
  try {
    const getCompany = await CompanyModel.find();
    res.status(200).send(getCompany);
  } catch (error) {
    res.status(500).json(error);
  }
})

export default companyRouter;