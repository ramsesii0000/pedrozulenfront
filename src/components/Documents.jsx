import React from 'react';
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import ExcelJS from 'exceljs';
import pdf from '../assets/icons/pdf.png';
import excel from '../assets/icons/excel.png';
import marcaGolden from '../assets/golden_icon.png';
import '../css/Documents.css';

const styles = StyleSheet.create({
  body: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor:'#F4D03F',
    color: '#09203f'
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    textAlign: 'center',
    fontSize: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
  },
  watermark: {
    position: 'absolute',
    zIndex: -1, 
    opacity: 0.4, 
    width: '60%',
    height: '45%',
    top: '27.5%', 
    left: '23%', 
  }
});

const Footer = () => (
  <View style={styles.footer}>
    <Text>© 2024 Golden Blog. Todos los derechos reservados.</Text>
  </View>
);

const Documents = ({ filteredPrestamos, prestamos }) => {

  const dataToExport = filteredPrestamos.length > 0 ? filteredPrestamos : prestamos;

  const exportToPDF = () => {

    const MyDocument = (
      <Document>
        <Page style={styles.body} wrap>
          <View>
            <Text style={styles.title}>Informe de Préstamos</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableColHeader}>DNI Usuario</Text>
                <Text style={styles.tableColHeader}>Fecha Préstamo</Text>
                <Text style={styles.tableColHeader}>Fecha Retorno</Text>
                <Text style={styles.tableColHeader}>Estado</Text>
              </View>
              {dataToExport.map(prestamo => (
                <View key={prestamo.idPrestamo} style={styles.tableRow}>
                  <Text style={styles.tableCol}>{prestamo.user.dniUser}</Text>
                  <Text style={styles.tableCol}>{prestamo.prestamoDate}</Text>
                  <Text style={styles.tableCol}>{prestamo.returnDate}</Text>
                  <Text style={styles.tableCol}>{prestamo.statusPrestamo}</Text>
                </View>
              ))}
            </View>
          </View>
          <Footer />
          <View style={styles.watermark}>
            <Image src={marcaGolden} />
          </View>
        </Page>
      </Document>
    );

    return (
      <PDFDownloadLink document={MyDocument} fileName="prestamos.pdf">
        {({ loading }) => (
          <button className="pdf-download-button">
            <img className="img-pdf-button" src={pdf} alt="PDF" />
            <span className="button-text">{loading ? 'Cargando documento...' : 'Descargar PDF'}</span>
          </button>
        )}
      </PDFDownloadLink>
    );
  };

  const exportToExcel = async () => {
      const dataToExport = filteredPrestamos.length > 0 ? filteredPrestamos : prestamos;
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Prestamos');

      worksheet.mergeCells('A1:B1');

      const titleCell = worksheet.getCell('A1');
      titleCell.value = 'Informe de Préstamo';
      titleCell.alignment = { horizontal: 'center' };
      titleCell.font = { bold: true, size: 16 };

      worksheet.addRow([
          'DNI Usuario',
          'Fecha Prestamo',
          'Fecha Retorno',
          'Estado'
      ]);

      const headerRow = worksheet.getRow(2);
      headerRow.eachCell((cell, colNumber) => {
          cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFA500' } 
          };
          cell.font = {
              color: { argb: 'FFFFFF' },
              bold: true 
          };
      });

      worksheet.columns = [
          { key: 'usuario', width: 20 },
          { key: 'fechaPrestamo', width: 20 },
          { key: 'fechaRetorno', width: 20 },
          { key: 'estado', width: 20 }
      ];

      let rowIndex = 3; 

      dataToExport.forEach(prestamo => {
        worksheet.addRow({
            usuario: prestamo.user.dniUser,
            fechaPrestamo: prestamo.prestamoDate,
            fechaRetorno: prestamo.returnDate,
            estado: prestamo.statusPrestamo
        });
        rowIndex++;
      });
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'prestamos.xlsx';
      a.click();
    };

  return (
    <div className="button-container">
      {exportToPDF()}
      <div className="divider-line" />
      <button className="excel-export-button" onClick={() => exportToExcel()}>
        <img className="img-excel-button" src={excel} alt="Excel" />
        <span className="button-text">Exportar a Excel</span>
      </button>
    </div>
  );
};

export default Documents;
