import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface OrderData {
  orderId: string;
  customerName: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  date: string;
}

export const generateOrderPDF = (order: OrderData) => {
  const doc = new jsPDF();

  // --- 1. CABECERA Y LOGO ---
  // Nota: Para el logo real, podrías necesitar convertir tu logo.jpeg a Base64
  doc.setFillColor(26, 64, 31); // Verde DONNI (#1a401f)
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont("serif", "bold");
  doc.setFontSize(28);
  doc.text("DONNI BOTANICS", 15, 25);
  
  doc.setFontSize(10);
  doc.setFont("sans", "normal");
  doc.text("Las plantas son clave para la vida", 15, 32);

  // --- 2. INFORMACIÓN DE LA NOTA ---
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("NOTA DE COMPRA", 15, 55);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Folio: ${order.orderId}`, 15, 62);
  doc.text(`Fecha: ${order.date}`, 15, 67);
  doc.text(`Cliente: ${order.customerName}`, 15, 72);

  // --- 3. TABLA DE PRODUCTOS ---
  autoTable(doc, {
    startY: 80,
    head: [['Producto', 'Cantidad', 'Precio Unit.', 'Subtotal']],
    body: order.items.map(item => [
      item.name,
      item.quantity,
      `$${item.price.toFixed(2)}`,
      `$${(item.price * item.quantity).toFixed(2)}`
    ]),
    headStyles: { fillColor: [26, 64, 31] }, // Verde DONNI
    alternateRowStyles: { fillColor: [245, 245, 240] },
    margin: { left: 15, right: 15 }
  });

  // --- 4. TOTALES ---
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  doc.setFont("helvetica", "bold");
  doc.text(`Subtotal: $${order.subtotal.toFixed(2)}`, 140, finalY);
  doc.text(`Envío: $${order.shipping.toFixed(2)}`, 140, finalY + 7);
  
  doc.setFillColor(212, 137, 96); // Naranja Tierra (#D48960)
  doc.rect(138, finalY + 12, 60, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.text(`TOTAL: $${order.total.toFixed(2)} MXN`, 142, finalY + 19);

  // --- 5. PIE DE PÁGINA PROFESIONAL ---
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(8);
  doc.text("Gracias por cultivar un futuro más verde con DONNI.", 105, 280, { align: "center" });
  doc.text("Esta es una nota de compra digital. No válida como factura fiscal.", 105, 285, { align: "center" });

  // Descargar el archivo
  doc.save(`Nota_DONNI_${order.orderId}.pdf`);
};