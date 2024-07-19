import Image from "next/image";
import defaultSchoolImage from "@/public/school-image.jpeg"
import mailSvg from "@/public/mail-svgrepo-com.svg";
import phoneSvg from "@/public/phone-svgrepo-com.svg";

export default function SchoolCard({ school }) {
  if (!school) return null;
  const schoolImage = school.image || defaultSchoolImage;
  const schoolName = school.name || "";
  const schoolAddress = school.address || "";
  const schoolCity = school.city || "";
  const schoolState = school.state || "";
  const schoolMail = school.email_id || "";
  const schoolPhone = school.contact || "";

  return (
    <article className="card card-compact bg-base-100 w-96 shadow-xl">
      <figure className="bg-black/30 h-48">
        <Image
          src={schoolImage}
          alt={"."}
          width={380}
          height={300}
          className="h-auto aspect-auto"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{schoolName}</h2>
        <p>{schoolCity}, {schoolState}</p>
        <p>{schoolAddress}</p>
        <div className="card-actions">
          <a className="btn btn-primary flex-1 flex-row flex-nowrap gap-2 group" href={`tel:${schoolPhone}`}>
            <Image src={phoneSvg} alt={"."} className="w-5 h-5 group-hover:scale-105 transition-transform duration-300 ease-linear" width={16} height={16} />
            Contact Now</a>
          <a className="btn btn-secondary flex-1 flex-row flex-nowrap gap-2 group" href={`mailto:${schoolMail}`}>
            <Image src={mailSvg} alt={"."} className="w-5 h-5 group-hover:scale-105 transition-transform duration-300 ease-linear" width={16} height={16} />
            Email Now</a>
        </div>
      </div>
    </article>
  )
}
