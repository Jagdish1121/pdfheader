import React, { useState } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";

const AddHeaderFooterToPDF = () => {
  const [file, setFile] = useState(null);
  const [headerText, setHeaderText] = useState("");
  const [footerText, setFooterText] = useState("");

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const addHeaderFooter = async () => {
    if (!file) return alert("Please upload a PDF file!");
    if (!headerText && !footerText) return alert("Please enter header or footer text!");

    const fileArrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(fileArrayBuffer);

    const pages = pdfDoc.getPages();

    pages.forEach((page, index) => {
      const { width, height } = page.getSize();

      // Add Header (h2 style)
      if (headerText) {
        const fontSize = 24; // Simulating h2 size
        const charWidth = fontSize * 0.6; // Approximate width per character
        const textWidth = headerText.length * charWidth; // Total width of the text
        const x = (width - textWidth) / 2; // Center the header horizontally
        page.drawText(headerText, {
          x: x,
          y: height - 50,
          size: fontSize,
          color: rgb(0, 0, 0),
        });
      }

      // Add Footer
      if (footerText) {
        page.drawText(`${footerText} ${index + 1}`, {
          x: 50,
          y: 20,
          size: 12,
          color: rgb(0, 0, 0),
        });
      }
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, "updated.pdf");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#333", marginBottom: "20px" }}>PDF Header/Footer Editor</h2>

        {/* File Input */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileUpload}
            style={{
              display: "block",
              margin: "0 auto",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer",
              width: "100%",
            }}
          />
        </div>

        {/* Text Inputs */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ color: "#555", fontWeight: "bold" }}>Header Text</label>
          <input
            type="text"
            value={headerText}
            onChange={(e) => setHeaderText(e.target.value)}
            placeholder="Enter header text"
            style={{
              display: "block",
              margin: "10px auto",
              padding: "10px",
              width: "100%",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ color: "#555", fontWeight: "bold" }}>Footer Text</label>
          <input
            type="text"
            value={footerText}
            onChange={(e) => setFooterText(e.target.value)}
            placeholder="Enter footer text"
            style={{
              display: "block",
              margin: "10px auto",
              padding: "10px",
              width: "100%",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* Add Button */}
        <button
          onClick={addHeaderFooter}
          style={{
            padding: "12px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
            width: "100%",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
        >
          Add Header/Footer
        </button>
      </div>
    </div>
  );
};

export default AddHeaderFooterToPDF;
