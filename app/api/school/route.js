import { NextResponse } from "next/server";

import prisma from "../../../config/db";
import { SchoolSchema } from "../../../lib/validation"
import { v2 } from "../../../config/cloudinary"



export async function GET(request) {
  try {
    const schools = await prisma.school.findMany({})
    return NextResponse.json({ schools }, { status: 200 })
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}


export async function POST(request) {
  try {
    const { name, address, city, state, contact, email_id, image } = await request.json();

    const response = await v2.uploader.upload(image)
    // return;

    const schoolData = { name, address, city, state, contact, email_id, image: response.url };
    const { error, data } = SchoolSchema.safeParse(schoolData);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    let school = await prisma.school.findFirst({
      where: {
        name: data.name,
        address: data.address,
      },
    });

    // if school already created
    if (school) {
      return NextResponse.json({ error: "School with that name has already been added" }, { status: 400 });
    }

    // create new school
    school = await prisma.school.create({
      data,
    });
    return NextResponse.json({ success: "School added successfully", school }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}