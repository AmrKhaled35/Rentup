"use client";

import { authKey } from "@/constant";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const UpdateProperty = ({
  property,
  categories,
  facilities,
  outdoorFacilities,
  countries,
  cities,
}) => {
  const [page, setPage] = useState("details");
  const [selectedImages, setSelectedImages] = useState([]);
  const [titleImage, setTitleImage] = useState(null);
  const { push } = useRouter();
  const token = Cookies.get(authKey);

  const {
    id,
    property_title,
    property_description,
    price,
    listing_type_id,
    category_id,
    country_id,
    city_id,
    get_facility,
    get_outdoor_facility,
    get_gallery_image,
    get_title_image,
    get3d_image,
    get_video_link,
    get_map_link,
    address,
  } = property || {};

  const facilitiesValue = get_facility?.map((item) => ({
    [item.f_title]: item.f_value,
  }));
  const outdoorFacilitiesValue = get_outdoor_facility?.map((item) => ({
    [item.of_title]: item.of_value,
  }));

  const { register, handleSubmit, control, watch, getValues } = useForm({
    defaultValues: {
      title: property_title,
      type: listing_type_id == 1 ? "sell" : "rent",
      price,
      category: category_id,
      description: property_description,
      country: country_id,
      city: city_id,
      link: get_video_link?.link,
      map_link: get_map_link?.map_link,
      threed_img: get3d_image?.threed_img,
      address,
      ...facilitiesValue.reduce((acc, item) => ({ ...acc, ...item }), {}),
      ...outdoorFacilitiesValue.reduce(
        (acc, item) => ({ ...acc, ...item }),
        {}
      ),
    },
  });

  const onSubmit = (data) => {
    const toastId = toast.loading("Loading...");
    const formData = new FormData();

    // generate facilities array
    const abc = Object.keys(data).reduce((acc, item) => {
      const matchOF = facilities?.find((facility) => facility.title === item);
      if (matchOF) {
        acc.push({
          title: matchOF.title,
          icon: matchOF.icon,
          value: data[item],
        });
      }
      return acc;
    }, []);

    // generate outdoorFacilities array
    const xyz = Object.keys(data).reduce((acc, item) => {
      const matchOF = outdoorFacilities?.find(
        (facility) => facility.title === item
      );
      if (matchOF) {
        acc.push({
          title: matchOF.title,
          icon: matchOF.icon,
          value: data[item],
        });
      }
      return acc;
    }, []);

    selectedImages.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });
    formData.append("title_img", titleImage);
    formData.append("threed_img", data?.threed_img);
    formData.append("link", data?.link);
    formData.append("map_link", data?.map_link);
    formData.append("status", "pending");
    formData.append("property_title", data.title);
    formData.append("listing_type_id", data.type == "sell" ? 1 : 2);
    formData.append("price", data.price);
    formData.append("category_id", data.category);
    formData.append("property_description", data.description);
    formData.append("country_id", city?.country_id);
    formData.append("city_id", city?.id);
    formData.append("state", 1);
    formData.append("address", data.address);
    formData.append("facilities", JSON.stringify(abc));
    formData.append("outdoorFacilities", JSON.stringify(xyz));

    // console.log(Object.fromEntries(formData));

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/customer/properties/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          toast.dismiss(toastId);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Property updated successfully!",
            showConfirmButton: false,
            timer: 1000,
          });
          push("/my-properties?status=pending");
        }
        if (res.data.status === "error") {
          toast.dismiss(toastId);
          toast.error(res.data?.message, { duration: 2000 });
        }
      })
      .catch((err) => {
        toast.dismiss(toastId);
        toast.error("Something went wrong");
        console.log(err);
      });
  };

  const handleImageChange = (e) => {
    const newImages = [...selectedImages, ...e.target.files];
    setSelectedImages(newImages);
  };
  const handleDeleteImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
  };
  const handleTitleImageChange = (e) => {
    setTitleImage(e.target.files[0]);
  };

  const category = watch("category");

  const getFacilities = () => {
    const selectedCategory = categories?.find((item) => item?.id == category);
    const facilitiesArr = selectedCategory?.facilities?.split(",");
    const filteredFacilities = facilitiesArr?.reduce((acc, item) => {
      const facility = facilities?.find((fac) => fac.title === item);
      if (facility) {
        acc.push(facility);
      }
      return acc;
    }, []);

    return filteredFacilities;
  };

  const filteredCities = cities?.filter(
    (item) => item?.country_id == watch("country")
  );

  const city = filteredCities?.find((item) => item.id == getValues("city"));

  return (
    <div className="md:grid md:grid-cols-[300px_1fr] md:gap-6 min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-100px)] max-h-fit py-7">
      <div className="bg-white md:border border-[#E6E6EB] md:rounded-xl p-4 -mx-3 md:mx-0 h-full">
        <div className="flex justify-between items-center text-dark text-lg font-medium">
          <p className="hidden md:block">Add New Property</p>
          <p className="text-skyBlue md:hidden">
            {page === "details"
              ? "Details"
              : page === "facilities"
              ? "Facilities"
              : page === "outdoor"
              ? "Outdoor"
              : page === "location"
              ? "Location"
              : page === "photo"
              ? "Images & Videos"
              : ""}
          </p>
          <p>
            <span>
              {page === "details"
                ? 1
                : page === "facilities"
                ? 2
                : page === "outdoor"
                ? 3
                : page === "location"
                ? 4
                : page === "photo"
                ? 5
                : 0}
            </span>
            /5
          </p>
        </div>
        <div className="grid grid-cols-5 gap-[2.5px] mt-2">
          <div
            className={`h-[6.5px] rounded-full ${
              page === "details"
                ? "bg-skyBlue"
                : page === "facilities"
                ? "bg-skyBlue"
                : page === "outdoor"
                ? "bg-skyBlue"
                : page === "location"
                ? "bg-skyBlue"
                : page === "photo"
                ? "bg-skyBlue"
                : "bg-[#E1E1E1]"
            }`}
          ></div>
          <div
            className={`h-[6.5px] rounded-full ${
              page === "facilities"
                ? "bg-skyBlue"
                : page === "outdoor"
                ? "bg-skyBlue"
                : page === "location"
                ? "bg-skyBlue"
                : page === "photo"
                ? "bg-skyBlue"
                : "bg-[#E1E1E1]"
            }`}
          ></div>
          <div
            className={`h-[6.5px] rounded-full ${
              page === "outdoor"
                ? "bg-skyBlue"
                : page === "location"
                ? "bg-skyBlue"
                : page === "photo"
                ? "bg-skyBlue"
                : "bg-[#E1E1E1]"
            }`}
          ></div>
          <div
            className={`h-[6.5px] rounded-full ${
              page === "location"
                ? "bg-skyBlue"
                : page === "photo"
                ? "bg-skyBlue"
                : "bg-[#E1E1E1]"
            }`}
          ></div>
          <div
            className={`h-[6.5px] rounded-full ${
              page === "photo" ? "bg-skyBlue" : "bg-[#E1E1E1]"
            }`}
          ></div>
        </div>
        <div className="font-medium space-y-5 mt-11 hidden md:block">
          <p className={`${page === "details" && "text-skyBlue"}`}>Details</p>
          <p className={`${page === "facilities" && "text-skyBlue"}`}>
            Facilities
          </p>
          <p className={`${page === "outdoor" && "text-skyBlue"}`}>Outdoor</p>
          <p className={`${page === "location" && "text-skyBlue"}`}>Location</p>
          <p className={`${page === "photo" && "text-skyBlue"}`}>
            Images & videos
          </p>
        </div>
      </div>
      <div className="bg-white md:border border-[#E6E6EB] md:rounded-xl p-5 -mx-3 md:mx-0 h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col min-h-[calc(100vh-25vh)] md:h-full"
        >
          {page === "details" ? (
            <>
              <p className="font-medium">Title</p>
              <Controller
                name="title"
                control={control}
                defaultValue={""}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      {...field}
                      minLength={20}
                      maxLength={100}
                      className="w-full h-10 px-5 mt-3 border border-[#E6E6EB] rounded-lg focus:ring-0 focus:border-[#E6E6EB] form-input text-sm"
                      placeholder="Modern Haven Villa this stunning 5-bedroom, 4-bathroom"
                      required
                    />
                    <p className="text-grayA6 text-xs font-medium text-end mt-1">
                      {field.value.length}/100
                    </p>
                  </>
                )}
              />
              <div className="mt-8 grid grid-cols-2">
                <div>
                  <p className="font-medium">Property type</p>
                  <div className="mt-[22px] grid grid-cols-2">
                    <label className="text-lg flex items-center gap-4">
                      <input
                        {...register("type", {
                          required: true,
                        })}
                        type="radio"
                        value="sell"
                        className="form-radio border-border text-skyBlue focus:ring-0 size-6"
                      />
                      Sell
                    </label>
                    <label className="text-lg flex items-center gap-4">
                      <input
                        {...register("type", {
                          required: true,
                        })}
                        type="radio"
                        value="rent"
                        className="form-radio border-border text-skyBlue focus:ring-0 size-6"
                      />
                      Rent
                    </label>
                  </div>
                </div>
                <div>
                  <p className="font-medium">Price</p>
                  <input
                    {...register("price", {
                      required: true,
                    })}
                    type="number"
                    className="w-full h-10 px-5 mt-[10px] border border-[#E6E6EB] rounded-lg focus:ring-0 focus:border-[#E6E6EB] form-input text-sm"
                    placeholder="$ 0.0"
                  />
                </div>
              </div>
              <div className="mt-8">
                <p className="font-medium">Category</p>
                <select
                  {...register("category", {
                    required: true,
                  })}
                  className="h-10 w-full rounded-[10px] border-[#E6E6EB] focus:ring-0 focus:border-[#E6E6EB]  text-grayA6 form-select mt-4 text-sm"
                  disabled
                  required
                >
                  {categories?.map((item) => (
                    <option key={item.id} value={item?.id}>
                      {item?.category_name}
                    </option>
                  ))}
                </select>
              </div>
              <p className="font-medium mt-8">Description</p>
              <textarea
                {...register("description")}
                className="w-full h-56 px-5 py-2 mt-3 border border-[#E6E6EB] rounded-lg resize-none focus:ring-0 focus:border-[#E6E6EB] form-textarea"
                placeholder="Describe about your property"
                required
              />
              <div className="text-skyBlue font-medium flex items-center gap-4 justify-end mt-auto">
                <p>Cancel</p>
                {/* <button
              className="py-[6px] px-5 border border-green bg-lighter-green rounded-full"
              onClick={() => draft()}
            >
              Save as Draft
            </button> */}
                <button
                  onClick={() => setPage("facilities")}
                  type="button"
                  className="text-white border border-skyBlue bg-skyBlue px-5 py-[6px] rounded-[10px] disabled:opacity-60"
                  disabled={
                    !watch("title") ||
                    !watch("price") ||
                    !watch("type") ||
                    !watch("description") ||
                    !watch("description")
                  }
                >
                  Next
                </button>
              </div>
            </>
          ) : page === "facilities" ? (
            <>
              <div className="grid grid-cols-2 gap-7">
                {getFacilities()?.map((item) =>
                  item.type === "text" ? (
                    <label
                      key={item.title}
                      className="block text-sm font-medium"
                    >
                      {item.title}
                      <input
                        {...register(item.title)}
                        type="text"
                        className="mt-[10px] h-11 w-full border border-[#E6E6EB] rounded-[10px] px-4 form-input focus:ring-0 focus:border-skyBlue text-sm font-normal"
                      />
                    </label>
                  ) : item.type === "number" ? (
                    <label key={item.id} className="block text-sm font-medium">
                      {item.title}
                      <input
                        {...register(item.title)}
                        type="number"
                        className="mt-[10px] h-11 w-full border border-[#E6E6EB] rounded-[10px] px-4 form-input focus:ring-0 focus:border-skyBlue text-sm font-normal"
                      />
                    </label>
                  ) : item.type === "textarea" ? (
                    <label key={item.id} className="block text-sm font-medium">
                      {item.title}
                      <textarea
                        {...register(item.title)}
                        className="mt-[10px] h-11 w-full border border-[#E6E6EB] rounded-[10px] px-4 form-input focus:ring-0 focus:border-skyBlue text-sm font-normal"
                      />
                    </label>
                  ) : item.type === "radiobutton" ||
                    item.type === "dropdown" ? (
                    <label key={item.id} className="block text-sm font-medium">
                      {item.title}
                      <select
                        {...register(item.title, {
                          required: true,
                        })}
                        className="h-11 w-full rounded-[10px] border-[#E6E6EB] focus:ring-0 focus:border-[#E6E6EB]  text-grayA6 form-select mt-[10px] text-sm"
                        required
                      >
                        {item?.additional_info?.split(",").map((item, i) => (
                          <option key={i} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </label>
                  ) : item.type === "checkbox" ? (
                    <div>
                      <p key={item.id} className="text-sm font-medium">
                        {item.title}
                      </p>
                      <div className="grid grid-cols-3">
                        {item?.additional_info?.split(",").map((box, i) => (
                          <label
                            key={i}
                            className="text-sm flex items-center gap-2 mt-3"
                          >
                            <input
                              {...register(item.title)}
                              type="checkbox"
                              className="form-checkbox border-[#E6E6EB] rounded-md text-skyBlue focus:ring-0"
                              value={box}
                            />
                            {box}
                          </label>
                        ))}
                      </div>
                    </div>
                  ) : null
                )}
              </div>
              <div className="text-skyBlue font-medium flex items-center gap-3 justify-end mt-auto">
                <p>Cancel</p>
                <button
                  onClick={() => setPage("details")}
                  type="button"
                  className="py-[6px] px-5 border border-skyBlue bg-skyBlue/20 rounded-[10px]"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage("outdoor")}
                  type="button"
                  className="text-white border border-skyBlue bg-skyBlue px-5 py-[6px] rounded-[10px] disabled:opacity-60"
                >
                  Next
                </button>
              </div>
            </>
          ) : page === "outdoor" ? (
            <>
              <div className="grid grid-cols-2 gap-7">
                {outdoorFacilities?.map((item) => (
                  <label key={item.title} className="block text-sm font-medium">
                    {item.title}
                    <input
                      {...register(item.title)}
                      type="number"
                      className="mt-[10px] h-11 w-full border border-[#E6E6EB] rounded-[10px] px-4 form-input focus:ring-0 focus:border-skyBlue text-sm font-normal"
                      placeholder="00 KM"
                    />
                  </label>
                ))}
              </div>
              <div className="text-skyBlue font-medium flex items-center gap-3 justify-end mt-auto">
                <p>Cancel</p>
                <button
                  onClick={() => setPage("facilities")}
                  type="button"
                  className="py-[6px] px-5 border border-skyBlue bg-skyBlue/20 rounded-[10px]"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage("location")}
                  type="button"
                  className="text-white border border-skyBlue bg-skyBlue px-5 py-[6px] rounded-[10px] disabled:opacity-60"
                  // disabled={!city.value || !watch("price")}
                >
                  Next
                </button>
              </div>
            </>
          ) : page === "location" ? (
            <>
              <div className="grid grid-cols-2 gap-7">
                <div>
                  <p className="text-sm font-medium">Country</p>
                  <select
                    {...register("country", {
                      required: true,
                    })}
                    className="h-11 w-full rounded-[10px] border-[#E6E6EB] focus:ring-0 focus:border-[#E6E6EB]  text-grayA6 form-select mt-[10px] text-sm"
                    required
                  >
                    <option selected disabled>
                      Select a country
                    </option>
                    {countries?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.country_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <p className="text-sm font-medium">City</p>
                  <select
                    {...register("city", {
                      required: true,
                    })}
                    className="h-11 w-full rounded-[10px] border-[#E6E6EB] focus:ring-0 focus:border-[#E6E6EB]  text-grayA6 form-select mt-[10px] text-sm"
                    disabled={!getValues("country")}
                    required
                  >
                    <option selected disabled>
                      Select a city
                    </option>
                    {filteredCities?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.city_name}
                      </option>
                    ))}
                  </select>
                </div>
                {/*  <div>
                  <p className="text-sm font-medium">State</p>
                  <select
                    {...register("state", {
                      required: true,
                    })}
                    className="h-11 w-full rounded-[10px] border-[#E6E6EB] focus:ring-0 focus:border-[#E6E6EB]  text-grayA6 form-select mt-[10px] text-sm"
                    required
                  >
                    <option selected disabled>
                      Select a state
                    </option>
                    <option value="nikunja">Nikunja</option>
                  </select>
                </div> */}
                <label className="block text-sm font-medium">
                  Address
                  <textarea
                    {...register("address")}
                    className="mt-[10px] h-11 w-full border border-[#E6E6EB] rounded-[10px] px-4 form-textarea focus:ring-0 focus:border-skyBlue text-sm font-normal"
                    placeholder="Enter Address"
                  />
                </label>
              </div>
              <div className="text-skyBlue font-medium flex items-center gap-3 justify-end mt-auto">
                <p>Cancel</p>
                <button
                  onClick={() => setPage("outdoor")}
                  type="button"
                  className="py-[6px] px-5 border border-skyBlue bg-skyBlue/20 rounded-[10px]"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage("photo")}
                  type="button"
                  className="text-white border border-skyBlue bg-skyBlue px-5 py-[6px] rounded-[10px] disabled:opacity-60"
                >
                  Next
                </button>
              </div>
            </>
          ) : page === "photo" ? (
            <>
              <p className="font-medium">Upload Photos (Min. 5 - Max. 40)</p>
              <div className="flex flex-wrap gap-3 mt-3">
                <Controller
                  name="images"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <>
                      {selectedImages.map((image, index) => (
                        <div key={index} className="rounded-lg relative group">
                          <Image
                            src={URL.createObjectURL(image)}
                            alt="#"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="h-[118px] !w-auto rounded-lg"
                          />
                          <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex justify-center items-center">
                            <Image
                              onClick={() => handleDeleteImage(index)}
                              src="/icon/delete-blue.svg"
                              alt="#"
                              width={46}
                              height={46}
                              className="opacity-0 group-hover:opacity-100 transition-all"
                            />
                          </div>
                        </div>
                      ))}
                      <label htmlFor="images" className="cursor-pointer">
                        <input
                          id="images"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => {
                            field.onChange(e);
                            handleImageChange(e);
                          }}
                          className="sr-only"
                        />
                        <div className="h-[118px] w-[180px] rounded-lg bg-skyBlue/10 border border-skyBlue flex justify-center items-center">
                          <Image
                            src="/icon/plus-blue.svg"
                            alt="#"
                            width={43}
                            height={43}
                          />
                        </div>
                      </label>
                    </>
                  )}
                />
              </div>
              <div className="flex flex-wrap gap-3 mt-3">
                {get_gallery_image.length
                  ? get_gallery_image.map((item) => (
                      <Image
                        key={item?.id}
                        src={`${process.env.NEXT_PUBLIC_IMG_URL}/${item?.img}`}
                        alt="image"
                        height={0}
                        width={0}
                        sizes="100vw"
                        className="h-[118px] !w-auto rounded-lg"
                      />
                    ))
                  : ""}
              </div>
              <div className="mt-8">
                <p className="font-medium mb-3">Upload Title Photo</p>
                {!titleImage ? (
                  <Controller
                    name="titleImage"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label htmlFor="titleImage" className="cursor-pointer">
                          <input
                            id="titleImage"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              field.onChange(e);
                              handleTitleImageChange(e);
                            }}
                            className="sr-only"
                          />
                          <div className="h-[118px] w-[180px] rounded-lg bg-skyBlue/10 border border-skyBlue flex justify-center items-center mt-3">
                            <Image
                              src="/icon/plus-blue.svg"
                              alt=""
                              width={43}
                              height={43}
                            />
                          </div>
                        </label>
                      </>
                    )}
                  />
                ) : (
                  <>
                    <div className="rounded-lg relative group w-max">
                      <Image
                        src={URL.createObjectURL(titleImage)}
                        alt=""
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="h-[118px] !w-auto rounded-lg"
                      />
                      <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex justify-center items-center">
                        <Image
                          onClick={() => setTitleImage(null)}
                          src="/icon/delete-blue.svg"
                          alt=""
                          width={46}
                          height={46}
                          className="opacity-0 group-hover:opacity-100 transition-all"
                        />
                      </div>
                    </div>
                  </>
                )}
                {get_title_image?.title_img && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}/${get_title_image?.title_img}`}
                    alt="image"
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="h-[118px] !w-auto rounded-lg mt-3"
                  />
                )}
              </div>
              <div className="mt-8">
                <p className="font-medium mb-3">Video Link</p>
                <input
                  {...register("link")}
                  type="url"
                  className="w-full h-12 border-[#E6E6EB] rounded-[10px] form-input focus:ring-0 focus:border-skyBlue mt-3"
                  placeholder="https://www.example.com/laksjdflkj"
                />
              </div>
              <div className="mt-8">
                <p className="font-medium mb-3">3d Photo Link</p>
                <input
                  {...register("threed_img")}
                  type="url"
                  className="w-full h-12 border-[#E6E6EB] rounded-[10px] form-input focus:ring-0 focus:border-skyBlue mt-3"
                  placeholder="https://www.example.com/laksjdflkj"
                />
              </div>
              <div className="my-8">
                <p className="font-medium mb-3">Google Map Link</p>
                <input
                  {...register("map_link")}
                  type="text"
                  className="w-full h-12 border-[#E6E6EB] rounded-[10px] form-input focus:ring-0 focus:border-skyBlue mt-3"
                  placeholder="Gulshan Lake Park"
                />
              </div>
              <div className="text-skyBlue font-medium flex items-center gap-3 justify-end mt-auto">
                <p>Cancel</p>
                <button
                  onClick={() => setPage("location")}
                  type="button"
                  className="py-[6px] px-5 border border-skyBlue bg-skyBlue/20 rounded-[10px]"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="text-white border border-skyBlue bg-skyBlue px-5 py-[6px] rounded-[10px] disabled:opacity-60"
                >
                  Submit
                </button>
              </div>
            </>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdateProperty;
