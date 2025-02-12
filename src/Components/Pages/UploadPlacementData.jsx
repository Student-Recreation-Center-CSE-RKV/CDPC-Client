import { useState,useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import * as XLSX from "xlsx";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const UploadPlacementData = () => {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [fileName, setFileName] = useState("No file chosen");
  const [Errors,setErrors]=new useState([]);

  useEffect(() => {
    if (Errors.length > 0) {
      toast.error("Some Data is Not Uploaded..!");
    }
  }, [Errors]); // Runs when Errors updates
  
  
  const validFields = [
    "ApplicationId",
    "Year",
    "StudentName",
    "StudentEmail",
    "Gender",
    "PlacementStatus",
    "CompanyName",
    "JobRole",
    "PackageOffered",
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // console.log(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "No file chosen");
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith(".xlsx")) {
      toast.error("Invalid file type! Please upload an Excel file (.xlsx).");
      return;
    }

    setFile(selectedFile);
    readExcelFile(selectedFile);
  };

  const readExcelFile = (file) => {
    const reader = new FileReader();
    // console.log(file);
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      if (!jsonData.length) {
        toast.error("The uploaded file is empty!");
        return;
      }

      const fileFields = Object.keys(jsonData[0]);
      const missingFields = validFields.filter((field) => !fileFields.includes(field));

      if (missingFields.length > 0) {
        toast.error(`Missing fields: ${missingFields.join(", ")}`);
        return;
      }

      setPreviewData(jsonData);
      toast.success("File selected successfully!");
    };

    reader.readAsArrayBuffer(file);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res=await axios.post("http://localhost:8000/api/placement/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const response=res.data.data;
    //   console.log(response.errors):
      if(response.failedRecords>0){
        setErrors(response.errors)
        // console.log(Errors);
      }
    
      toast.success("File uploaded successfully!");
      setPreviewData([]);
      setFile(null);
    } catch (error) {
      toast.error("Upload failed! Please check the file format.");
    }
  };
//   console.log(fileName);
  return (
    <div style={{ padding: "4px", backgroundColor: "white", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px" }}>Upload Placement Data</h2>
  
            {/* Table showing valid fields */}
        <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "8px" }}>Valid Fields(Example Data)</h3>
        <table style={{ width: "100%", backgroundColor: "white", borderCollapse: "collapse", marginBottom: "16px" }}>
        <thead>
            <tr style={{ backgroundColor: "#f3f3f3" }}>
            {validFields.map((field) => (
                <th key={field} style={{ border: "1px solid #ccc", padding: "10px", textAlign: "left", fontWeight: "bold" }}>
                {field}
                </th>
            ))}
            </tr>
        </thead>
        <tbody>
            {/* Sample Data Rows */}
            {[
            { ApplicationId:"xxxxxxxxxxxxxxx",Year: "2024", StudentName: "John Doe", StudentEmail: "john@example.com", Gender: "Male", PlacementStatus: "Placed", CompanyName: "Google", JobRole: "Software Engineer", PackageOffered: "12(LPA)" }
            ].map((sampleRow, index) => (
            <tr key={index}>
                {validFields.map((field) => (
                <td key={field} style={{ border: "1px solid #ccc", padding: "10px", textAlign: "left" }}>
                    {sampleRow[field] || "-"}
                </td>
                ))}
            </tr>
            ))}
        </tbody>
        </table>

        {/* File Input */}
        <div style={{ marginBottom: "16px", display: "flex", alignItems: "center",justifyContent:"center" }}>
        <label
            htmlFor="file-upload"
            style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "#fff",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            display: "inline-block",
            textAlign: "center",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
            Choose File
        </label>
        <input
            id="file-upload"
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
            style={{
            display: "none",
            }}
        />
        <span id="file-name" style={{ marginLeft: "10px", fontSize: "14px", color: "#555" }}>
        {fileName}
        </span>
        </div>
            
            {/* Failed Records Table */}
            {Errors.length > 0 && (
        <div style={{ overflowX: "auto", marginTop: "16px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "8px", color: "red" }}>
            Failed Records
            </h3>

            <table style={{ width: "100%", backgroundColor: "white", border: "1px solid #ccc" }}>
            <thead>
                <tr style={{ backgroundColor: "#e2e8f0" }}>
                {/* Extracting column names from first rowData object */}
                {Object.keys(Errors[0].rowData).map((field) => (
                    <th key={field} style={{ border: "1px solid #ccc", padding: "4px", textAlign: "left" }}>
                    {field}
                    </th>
                ))}
                {/* Extra Column for Reason */}
                <th style={{ border: "1px solid #ccc", padding: "4px", textAlign: "left", color: "red" }}>
                    Reason
                </th>
                </tr>
            </thead>

            <tbody>
                {Errors.map((error, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #ccc" }}>
                    {/* Map rowData dynamically */}
                    {Object.keys(error.rowData).map((field) => (
                    <td key={field} style={{ border: "1px solid #ccc", padding: "4px" }}>
                        {error.rowData[field] || "-"}
                    </td>
                    ))}
                    {/* Display Reason */}
                    <td style={{ border: "1px solid #ccc", padding: "4px", color: "red" }}>
                    {error.reason}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>

           
        </div>
        )}

  
      {/* Preview Table */}
      {previewData.length > 0 && (
        <div style={{ overflowX: "auto", marginTop: "16px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "8px" }}>Preview Data</h3>
          <table style={{ width: "100%", backgroundColor: "white", border: "1px solid #ccc" }}>
            <thead>
              <tr style={{ backgroundColor: "#e2e8f0" }}>
                {validFields.map((field) => (
                  <th key={field} style={{ border: "1px solid #ccc", padding: "8px", textAlign: "left" }}>
                    {field}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {previewData.slice(0, 5).map((row, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #ccc" }}>
                  {validFields.map((field) => (
                    <td key={field} style={{ border: "1px solid #ccc", padding: "8px" }}>
                      {row[field] || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ color: "#718096", fontSize: "14px", marginTop: "8px" }}>Showing first 5 records...</p>
        </div>
      )}
  
      {/* Upload Button */}
      {previewData.length > 0 && (
        <button
          onClick={handleUpload}
          style={{ marginTop: "16px", padding: "10px 24px", backgroundColor: "#1d4ed8", color: "white", borderRadius: "6px", border: "none", cursor: "pointer" }}
        >
          Upload Data
        </button>
      )}
  
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
  
};

export default UploadPlacementData;
