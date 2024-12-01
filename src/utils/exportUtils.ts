import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { Participant } from '../types/participant.type';

export const exportToPDF = (data: Participant[], filename: string) => {
    const doc = new jsPDF();
    const headers = ['Username', 'Email', 'Phone Number'];
    const rows = data.map((item) => [
        item.username,
        item.email,
        item.phoneNumber,
    ]);

    doc.autoTable({
        head: [headers],
        body: rows,
        startY: 20,
        margin: { top: 20 },
        styles: { fontSize: 10, cellPadding: 5 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    doc.save(`${filename}.pdf`);
};

export const exportToExcel = (data: Participant[], filename: string) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Participants');
    XLSX.writeFile(workbook, `${filename}.xlsx`);
};