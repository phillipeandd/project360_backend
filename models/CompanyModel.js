const mongoose = require("mongoose");
const fileSchema = new mongoose.Schema({
  name: String,
  path: String,
});
const companySchema = new mongoose.Schema(
  {
    company_name: { type: String, required: true },
    domain: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    alternate_email: { type: String, default: "" },
    phone: { type: String, required: true },
    alternate_phone: { type: String, default: "" },
    address: { type: String, required: true },
    country: { type: String, default: "India" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    zip_code: { type: String, default: "" },
    employee_id: { type: String, required: true, unique: true },
    role: { type: String, default: "company"  },
    company_type: { type: String, default: "" },
    industry_type: { type: String, default: "" },
    document_type: { type: String, default: "" },
    files: { type: [fileSchema], default: [] },
    password: { type: String, required: true },
    aadhar: { type: String, required: true },
    logo: { type: {}, default: "" },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
 
  },
  { timestamps: true }
);

const CompanyModel = mongoose.model("Company", companySchema);

module.exports = CompanyModel;
