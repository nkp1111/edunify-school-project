import { getAllSchools } from "../lib/school"

export default async function Home() {

  const schools = (await getAllSchools()) || [];
  console.log(schools, "schools", "page");
  return (
    <main className="flex flex-1 flex-col items-center justify-between px-12 py-5 min-h-[calc(100vh-5rem)]">
      all schools
    </main>
  );
}



export const revalidate = 0