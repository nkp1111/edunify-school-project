"use client";

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form";

import { addNewSchool } from "../../lib/school.js";
import { notify } from "../../lib/alert.js";


const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result); // Remove the data URL part
    reader.onerror = reject;
    reader.readAsDataURL(file); // This will read the file as a data URL
  });
};

export default function AddSchool() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const onSubmit = async (submittedData) => {
    const { email, contact, name, address, city, state, image } = submittedData;
    let imageBase64 = null;

    if (image) {
      try {
        imageBase64 = await convertFileToBase64(image[0]);
        submittedData.image = imageBase64;
      } catch (error) {
        console.log(error)
        notify("Failed to convert image to Base64", "error");
        submittedData.image = null;
        return;
      }
    }

    submittedData.email_id = email;

    // if (submittedData) return;
    addNewSchool(submittedData).then(data => {
      if (!data || data.error) {
        notify(data.error || "Something went wrong", "error");
      } else {
        notify(data.success || `School added successfully`, "success");
        router.push("/")
      }
    }).catch(error => {
      notify(error?.response?.data?.error || "Something went wrong", "error");
    });

  }


  return (
    <main className="flex flex-1 flex-col items-center px-12 py-5 min-h-[calc(100vh-5rem)]">
      <h1 className="text-lg mb-5">Add new school</h1>

      <form
        action=""
        className="gap-2 flex flex-col"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-base">School name  <sup className="text-error">*</sup></span>
          </div>
          <input
            type="text"
            placeholder="Enter school name"
            className="input input-bordered"
            {...register("name", {
              required: true,
              minLength: {
                value: 3,
                message: "School name must be at least 3 characters",
              }
            })}
          />

          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </label>


        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-base">Address  <sup className="text-error">*</sup></span>
          </div>
          <input
            type="text"
            placeholder="Enter address"
            className="input input-bordered w-full"
            {...register("address", {
              required: true,
            })}
          />

          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </label>



        <div className="flex items-center justify-between gap-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-base">City  <sup className="text-error">*</sup></span>
            </div>
            <input
              type="text"
              placeholder="Enter city"
              className="input input-bordered w-full"
              {...register("city", {
                required: true,
              })}
            />

            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-base">State  <sup className="text-error">*</sup></span>
            </div>
            <input
              type="text"
              placeholder="Enter state"
              className="input input-bordered w-full"
              {...register("state", {
                required: true,
              })}
            />

            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
          </label>
        </div>


        <div className="flex items-center justify-between gap-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-base">Contact  <sup className="text-error">*</sup></span>
            </div>
            <input
              type="text"
              placeholder="Enter contact"
              className="input input-bordered w-full"
              {...register("contact", {
                required: true,
                pattern: {
                  value: /^\d{10}$/,
                  message: "Please provide valid contact number"
                }
              })}
            />

            {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>}
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-base">Email  <sup className="text-error">*</sup></span>
            </div>
            <input
              type="email"
              placeholder="Enter email"
              className="input input-bordered w-full"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                }
              })}
            />

            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </label>
        </div>


        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-base">Image</span>
          </div>
          <input
            type="file"
            placeholder="Enter image"
            className="file-input file-input-bordered w-full"
            {...register("image")}
          />

          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
        </label>


        <button className="btn btn-primary mt-5">Add new school</button>
      </form>
    </main>
  )
}
