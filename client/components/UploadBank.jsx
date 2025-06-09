
import React, { useState } from 'react';
import axios from 'axios';
import './UploadBank.css'; // Assuming you have a CSS file for styling
import { Link } from 'react-router-dom';


const UploadBank = ({ userId }) => {

    const [file, setFile] = useState(null);
  const [matched, setMatched] = useState([]);
  const [unmatched, setUnmatched] = useState([]);
  const [pdfLink, setPdfLink] = useState('');

  const handleUpload = async () => {
    if (!file) return alert('Please select a CSV file');

    const formData = new FormData();
   formData.append('bankStatement', file);
    formData.append('userId', userId);

    try {
      const res = await axios.post('http://localhost:3000/api/bank-match/upload', formData);
      setMatched(res.data.matched);
      setUnmatched(res.data.unmatched);
      setPdfLink(res.data.pdfDownloadLink);
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert('Upload/Match failed');
    }
  };
  return (
    //   <div className="p-6 space-y-4">
    //   <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
    //   <button onClick={handleUpload} className="bg-blue-600 text-white px-4 py-2 rounded">Upload & Match</button>

    //   {pdfLink && (
    //     <div className="mt-4">
    //       <a href={pdfLink} target="_blank" rel="noopener noreferrer" className="text-green-600 underline">Download Match Report PDF</a>
    //     </div>
    //   )}

    //   <div className="grid grid-cols-2 gap-6 mt-6">
    //     <div>
    //       <h3 className="text-lg font-bold mb-2">✅ Matched Transactions</h3>
    //       <table className="table-auto w-full border">
    //         <thead>
    //           <tr>
    //             <th className="border px-2">Amount</th>
    //             <th className="border px-2">Note</th>
    //             <th className="border px-2">Date</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {matched.map((t, i) => (
    //             <tr key={i}>
    //               <td className="border px-2">{t.amount}</td>
    //               <td className="border px-2">{t.note}</td>
    //               <td className="border px-2">{new Date(t.date).toLocaleDateString()}</td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>

    //     <div>
    //       <h3 className="text-lg font-bold mb-2">❌ Unmatched Bank Entries</h3>
    //       <table className="table-auto w-full border">
    //         <thead>
    //           <tr>
    //             <th className="border px-2">Amount</th>
    //             <th className="border px-2">Note</th>
    //             <th className="border px-2">Date</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {unmatched.map((b, i) => (
    //             <tr key={i}>
    //               <td className="border px-2">{b.amount}</td>
    //               <td className="border px-2">{b.note}</td>
    //               <td className="border px-2">{new Date(b.date).toLocaleDateString()}</td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>



     <div className="upload-container">
      <Link to="/"><button className="back-btn" >← Back to Dashboard</button></Link>

      <div className="upload-section">
        <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload}>Upload & Match</button>
      </div>

      {pdfLink && (
        <div className="pdf-link">
          <a href={pdfLink} target="_blank" rel="noopener noreferrer">📄 Download Match Report PDF</a>
        </div>
      )}

      <div className="results-grid">
        <div className="results-section">
          <h3>✅ Matched Transactions</h3>
          <table>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Note</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {matched.map((t, i) => (
                <tr key={i}>
                  <td>{t.amount}</td>
                  <td>{t.note}</td>
                  <td>{new Date(t.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="results-section">
          <h3>❌ Unmatched Bank Entries</h3>
          <table>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Note</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {unmatched.map((b, i) => (
                <tr key={i}>
                  <td>{b.amount}</td>
                  <td>{b.note}</td>
                  <td>{new Date(b.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UploadBank