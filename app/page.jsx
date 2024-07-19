import Link from "next/link";

import { getAllSchools } from "../lib/school"
import SchoolCard from "../components/school-card";

export default async function Home() {

  const schools = (await getAllSchools()) || [];
  return (
    <main className="flex flex-1 flex-col items-center px-12 py-5 min-h-[calc(100vh-5rem)]">
      <h1 className="text-lg mb-5">School search</h1>

      <div className="ms-auto">
        <Link href="/addSchool" className="text-primary underline">Add new school</Link>
      </div>

      <div className="lg:w-[90%] w-full mx-2 mt-5">
        {schools?.map((school, index) => (
          <SchoolCard key={index} school={school} />
        ))}
      </div>
    </main>
  );
}



export const revalidate = 0