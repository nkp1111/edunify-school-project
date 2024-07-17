import { NextResponse } from "next/server";
import prisma from "../../../config/db";
import { SchoolSchema } from "../../../lib/validation"


export async function GET() {
  try {
    const schools = await prisma.school.findMany()
    return NextResponse.json({ schools }, { status: 200 })
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    // validate school data
    const schoolData = await request.json();
    const { success, error, data } = SchoolSchema.safeParse(schoolData);
    if (!success) {
      NextResponse.json({ error }, { status: 400 });
    }

    // find school in database
    let school = await prisma.school.findUnique({
      where: {
        name: data.name,
        address: data.address,
      },
    })

    // if school already created
    if (school) {
      return NextResponse.json({ error: "School with that name has already been added" }, { status: 400 });
    }

    // create new school
    school = await prisma.school.create({
      data,
    })
    return NextResponse.json({ success: "School added successfully", school }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}