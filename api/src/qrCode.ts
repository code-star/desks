import qrcode, { QRCodeOptions } from "qrcode";
import pdfDocument from "pdfkit";
import fs from "fs";
import prepareDb from "./prepareDb";
import { DeskType } from "./types";

const generateQR = async (
  desk: DeskType
): Promise<{ qr: Buffer; desk: DeskType; url: string }> => {
  const opts: QRCodeOptions = {
    errorCorrectionLevel: "H",
  };

  const fixedUrl = "https://code-star.github.io/desks/checkin/?";
  const deskUrl = `${fixedUrl}${desk.desk_id}`;
  const deskQr = await qrcode.toBuffer(deskUrl, opts);

  return { qr: deskQr, desk, url: deskUrl };
};

export async function generatePDF() {
  const db = await prepareDb();
  const pdf = new pdfDocument();
  pdf.pipe(fs.createWriteStream("test.pdf"));
  const desks = await db.all<DeskType[]>("SELECT * FROM desk");
  const qrcodes = await Promise.all(
    desks.map((desk: DeskType) => {
      return generateQR(desk);
    })
  );
  qrcodes.forEach((qrCode) => {
    pdf
      .font("Times-Roman")
      .text("Scan to checkin", { align: "center" })
      .text(qrCode.desk.desk_id, { align: "center" })
      .image(qrCode.qr, { fit: [100, 100] })
      .text(qrCode.url, { align: "center" });
  });
  pdf.end();
}

generatePDF();
