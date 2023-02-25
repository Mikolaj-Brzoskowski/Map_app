import React from 'react';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Download } from 'react-bootstrap-icons'
import { Button } from 'react-bootstrap'

const PdfGenerator= ({rootElementId , downloadFileName}) => {

    const downloadPdfDocument = () => {
        const input = document.getElementById(rootElementId);
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                pdf.save(`${downloadFileName}.pdf`);
            })
    }

    return <Button type="button" variant="primary" className="w-50 m-4 m-md-0" onClick={downloadPdfDocument}><Download size={20}/>&emsp;Download calculation</Button>

}

export default PdfGenerator;