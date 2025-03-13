const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CompanyModel = require("../models/CompanyModel");

// Create a new company
exports.createCompany = async (req, res) => {
  try {
    //console.log("FILES:", req.files); // Debugging logs
    //console.log("LOGO:", req.file);   // Debugging logs
    //console.log("BODY:", req.body);   // Debugging logs

    const files = req.files?.files || []; // Ensure files exist
    const logo = req.files?.logo ? req.files.logo[0] : {}; // Ensure logo exists
    const { password, ...rest } = req.body;

    const fileArray = files.map((file) => ({
      name: file.originalname,
      path: file.path,
    }));

    const hashedPassword = await bcrypt.hash(password, 10);

    const company = new CompanyModel({
      ...rest,
      files: fileArray,
      password: hashedPassword,
      logo: { name: logo.originalname, path: logo.path },
    });

    await company.save();
    res.status(201).json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all companies
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await CompanyModel.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single company by ID
exports.getCompanyById = async (req, res) => {
  try {
    const company = await CompanyModel.findById(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a company
exports.updateCompany = async (req, res) => {
  try {
    const company = await CompanyModel.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const files = req.files?.files || [];
    const logo = req.files?.logo ? req.files.logo[0] : null;
    const { password, ...rest } = req.body;

    let fileArray = company.files; // Retain existing files
    if (files.length > 0) {
      fileArray = files.map((file) => ({
        name: file.originalname,
        path: file.path,
      }));
    }

    let updatedLogo = company.logo; // Retain existing logo
    if (logo) {
      updatedLogo = { name: logo.originalname, path: logo.path };
    }

    // Delete old logo if new logo is uploaded
    // let updatedLogo = company.logo;
    // if (logo) {
    //   if (company.logo && company.logo.path) {
    //     const oldLogoPath = path.join(__dirname, "..", company.logo.path);
    //     if (fs.existsSync(oldLogoPath)) {
    //       fs.unlinkSync(oldLogoPath); // Delete the old file
    //     }
    //   }
    //   updatedLogo = { name: logo.originalname, path: logo.path };
    // } else {
    //   updatedLogo = null; // Remove the logo if not provided
    // }

    let updatedPassword = company.password; // Retain existing password
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedCompany = await CompanyModel.findByIdAndUpdate(
      req.params.id,
      {
        ...rest,
        files: fileArray,
        logo: updatedLogo,
        password: updatedPassword,
      },
      { new: true }
    );

    res.status(200).json(updatedCompany);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a company
exports.deleteCompany = async (req, res) => {
  try {
    await CompanyModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.loginCompany = async (req, res) => {
  //console.log("Received request body:", req.body);
  try {
    const { employee_id, password } = req.body;
    
    //console.log("Received login request for:", employee_id);

    if (!employee_id) {
      return res.status(400).json({ Message: "Employee ID is required" });
    }

    const company = await CompanyModel.findOne({ employee_id });

    //console.log("Found company:", company);

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, company.password);

    if (!passwordMatch) {
      return res.status(401).json({ Message: "Invalid password" });
    }

    if (company) {
      const hashed_password = company.password;
      const company_id = company._id;

      bcrypt.compare(password, hashed_password, function (err, result) {
        if (err) {
          return res.status(500).json({ Message: "Something went wrong, try again later" });
        }
        if (result) {
          const token = jwt.sign({ company_id }, process.env.SECRET, { expiresIn: "1h" });
          const document = {
            id: company._id,
            company_name: company.company_name,
            domain: company.domain,
            email: company.email,
            alternate_email: company.alternate_email,
            phone: company.phone,
            alternate_phone: company.alternate_phone,
            address: company.address,
            country: company.country,
            city: company.city,
            state: company.state,
            zip_code: company.zip_code,
            employee_id: company.employee_id,
            company_type: company.company_type,
            industry_type: company.industry_type,
            document_type: company.document_type,
            files: company.files,
            aadhar: company.aadhar,
            logo: company.logo,
            created_by: company.created_by,
            token: token,
          };

          res.status(200).json({
            Message: "Login Successful",
            document: document,
            token: token,
          });
        } else {
          res.status(401).json({ Message: "Invalid Credentials", token: null });
        }
      });
    } else {
      res.status(401).json({ Message: "Invalid Credentials", token: null });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ Message: "Internal Server Error" });
  }
};
