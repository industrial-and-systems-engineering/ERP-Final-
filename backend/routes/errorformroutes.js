const express = require('express');
const router = express.Router();
const passport = require('passport');
const { ErrorDetector, Product } = require("../models/db");
//const { isLoggedIn } = require('../middleware'); 

router.post("/", async (req, res) => {
    try {
        console.log("Received form data:", req.body);

        if (!req.body || !req.body.products) {
            return res.status(400).json({ error: "No form data provided" });
        }

       
        const productDocs = await Product.insertMany(req.body.products);

        
        const newForm = new ErrorDetector({
            srfNo: req.body.srfNo,
            date: req.body.date,
            probableDate: req.body.probableDate,
            organization: req.body.organization,
            address: req.body.address,
            contactPerson: req.body.contactPerson,
            mobileNumber: req.body.mobileNumber,
            telephoneNumber: req.body.telephoneNumber,
            emailId: req.body.emailId,
            products: productDocs.map((p) => p._id),
            decisionRules: req.body.decisionRules || {} 
        });

        await newForm.save(); // Ensure this runs every time
        console.log("ErrorDetector form successfully saved!");

        return res.status(201).json({
            message: "Form submitted successfully",
            redirectURL: "/form", 
        });

    } catch (error) {
        console.error("Error saving form data:", error);
        res.status(500).json({ error: "Error saving form data" });
    }
});


router.get("/calibrated", async (req, res) => {
    try {

      const errorForms = await ErrorDetector.find().populate("products");
      const calibratedForms = errorForms.filter((form) =>
        form.products.some((product) => product.isCalibrated)
      );
      
      res.status(200).json(calibratedForms);
    } catch (error) {
      console.error("Error fetching calibrated error forms:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


  router.get("/calibrated/pending", async (req, res) => {
      try {
        // Fetch all error forms and populate products
        const errorForms = await ErrorDetector.find().populate("products");
    
        // Filter forms where at least one product is NOT calibrated
        const pendingForms = errorForms.filter((form) =>
          form.products.some((product) => !product.isCalibrated)
        );
        
        res.status(200).json(pendingForms);
      } catch (error) {
        console.error("Error fetching pending error forms:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });


    router.put("/technician/updateEquipment/:id", async (req, res) => {
        const { id } = req.params;
        const { isCalibrated } = req.body;
    
        if (typeof isCalibrated === "undefined") {
            return res.status(400).json({ success: false, message: "isCalibrated field is required" });
        }
    
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                id,
                { isCalibrated }, // Allow true/false values
                { new: true }
            );
    
            if (!updatedProduct) {
                return res.status(404).json({ success: false, message: "Product not found" });
            }
    
            res.status(200).json({ success: true, data: updatedProduct });
        } catch (error) {
            console.error("Error updating product:", error.message);
            res.status(500).json({ success: false, message: "Server error" });
        }
    });

    module.exports=router;
  



