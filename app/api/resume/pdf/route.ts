import { buildResumePlainText } from "@/lib/resume/plainText";
import { getPortfolioContent } from "@/lib/content/getContent";
import { PDFDocument, StandardFonts } from "pdf-lib";

export const revalidate = 3600;

export async function GET() {
  const content = await getPortfolioContent();
  const text = buildResumePlainText(
    content.profile,
    content.experience,
    content.skills,
    content.education,
  );

  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const fontSize = 10;
  const lineHeight = 14;
  const margin = 50;
  const maxWidth = 512;

  let page = pdf.addPage([612, 792]);
  let y = page.getHeight() - margin;

  const wrapLine = (line: string, useBold = false) => {
    const activeFont = useBold ? bold : font;
    const words = line.split(" ");
    let current = "";

    for (const word of words) {
      const test = current ? `${current} ${word}` : word;
      const width = activeFont.widthOfTextAtSize(test, fontSize);
      if (width > maxWidth && current) {
        if (y < margin + lineHeight) {
          page = pdf.addPage([612, 792]);
          y = page.getHeight() - margin;
        }
        page.drawText(current, { x: margin, y, size: fontSize, font: activeFont });
        y -= lineHeight;
        current = word;
      } else {
        current = test;
      }
    }

    if (current) {
      if (y < margin + lineHeight) {
        page = pdf.addPage([612, 792]);
        y = page.getHeight() - margin;
      }
      page.drawText(current, { x: margin, y, size: fontSize, font: activeFont });
      y -= lineHeight;
    }
  };

  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) {
      y -= lineHeight / 2;
      continue;
    }
    wrapLine(line, i === 0);
  }

  const bytes = await pdf.save();
  const filename = `${content.profile.name.replace(/\s+/g, "-").toLowerCase()}-resume.pdf`;

  return new Response(Buffer.from(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
