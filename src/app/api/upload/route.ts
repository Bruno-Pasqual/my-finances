import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { mkdirSync, existsSync } from "fs";

export async function POST(request: NextRequest) {
	const data = await request.formData();
	const file = data.get("image"); // Certifique-se de que o nome está correto

	if (!(file instanceof Blob)) {
		console.error("Invalid file type received");
		return NextResponse.json({
			success: false,
			message: "No file provided or invalid file",
		});
	}

	const bytes = await file.arrayBuffer();
	const buffer = Buffer.from(bytes);

	const uploadsDir = join(process.cwd(), "public", "uploads");

	if (!existsSync(uploadsDir)) {
		mkdirSync(uploadsDir, { recursive: true });
	}

	const filePath = join(uploadsDir, file.name);

	try {
		await writeFile(filePath, buffer);
		return NextResponse.json({
			success: true,
			filePath: `/uploads/${file.name}`,
		});
	} catch (error) {
		console.error(`Error saving file: ${error}`);
		return NextResponse.json({ success: false, message: "Error saving file" });
	}
}
