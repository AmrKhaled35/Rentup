"use server";

import { authKey, success } from "@/constant";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
const baseUrl = process.env.SERVER_API_URL;

export const loginUser = async (formData) => {
  try {
    const res = await fetch(`${baseUrl}/login/user`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data?.status === success) {
      cookies().set(authKey, data?.token);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = async (user) => {
  try {
    const res = await fetch(
      `${baseUrl}${
        user?.google_id
          ? "/customer/google-login/logout"
          : "/customer/logout/user"
      }`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${cookies().get(authKey)?.value}` },
      }
    );
    const data = await res.json();
    if (data?.status === success) {
      cookies().delete(authKey);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async () => {
  try {
    const token = await getToken();
    if (token) {
      const res = await fetch(`${baseUrl}/customer/get-me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
        cache: "force-cache",
        next: { tags: ["user"] },
      });
      return await res.json();
    } else {
      return { data: { user_img: null } };
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (data) => {
  try {
    const res = await fetch(`${baseUrl}/customer/users/update-me`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
      body: data,
    });
    revalidateTag("user");
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateSubscription = async (data) => {
  try {
    const res = await fetch(`${baseUrl}/customer/subscribe`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    revalidateTag("user");
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getGoogleConfig = async () => {
  try {
    const res = await fetch(`${process.env.SERVER_API_URL}/google-config`, {
      method: "GET",
      next: { revalidate: 3600 },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getPusherConfig = async () => {
  try {
    const res = await fetch(
      `${process.env.SERVER_API_URL}/customer/pusher-config`,
      {
        method: "GET",
        next: { revalidate: 3600 },
        headers: { Authorization: `Bearer ${await getToken()}` },
      }
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getAppSettings = async () => {
  try {
    const res = await fetch(`${process.env.SERVER_API_URL}/app-setting`, {
      method: "GET",
      next: { revalidate: 3600 },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getToken = async () => {
  return cookies().get(authKey)?.value;
};

export const adToFav = async (id) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_API_URL}/customer/favorites`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ property_id: id }),
      }
    );
    const data = await res.json();
    if (data.status === success) {
      revalidateTag("favorite");
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const removeFromFav = async (id) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_API_URL}/customer/user-favorites/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ property_id: id }),
      }
    );
    const data = await res.json();
    if (data.status === success) {
      revalidateTag("favorite");
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getFavPro = async () => {
  try {
    const token = await getToken();
    if (token) {
      const res = await fetch(
        `${process.env.SERVER_API_URL}/customer/user-favorite`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
          cache: "force-cache",
          next: { tags: ["favorite"] },
        }
      );
      return await res.json();
    } else {
      return {
        data: [],
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserProperty = async (status) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_API_URL}/customer/property-by-user${
        status ? `?status=${status}` : ""
      }`,
      {
        method: "GET",
        next: { revalidate: 0 },
        headers: { Authorization: `Bearer ${await getToken()}` },
      }
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteProperty = async (id) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_API_URL}/customer/properties/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${await getToken()}` },
      }
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const unpublishProperty = async (id) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_API_URL}/customer/property/unpublish`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          property_id: id,
          status: "unpublish",
        }),
      }
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getAllConversation = async () => {
  try {
    const res = await fetch(
      `${process.env.SERVER_API_URL}/customer/conversation-threads/get-all`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${await getToken()}` },
        next: { revalidate: 0 },
      }
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getSocial = async () => {
  try {
    const res = await fetch(`${process.env.SERVER_API_URL}/socials`, {
      method: "GET",
      next: { revalidate: 3600 },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getMorePages = async () => {
  try {
    const res = await fetch(`${process.env.SERVER_API_URL}/more-pages`, {
      method: "GET",
      next: { revalidate: 3600 },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getSingleMorePages = async (slug) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_API_URL}/more-pages/${slug}`,
      {
        method: "GET",
        next: { revalidate: 3600 },
      }
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getFooter = async () => {
  try {
    const res = await fetch(`${process.env.SERVER_API_URL}/footer-section`, {
      method: "GET",
      next: { revalidate: 3600 },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getAgent = async (page, limit) => {
  try {
    const params = new URLSearchParams();
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);
    const res = await fetch(
      `${process.env.SERVER_API_URL}/agent${
        params.toString() ? `?${params}` : ""
      }`,
      {
        method: "GET",
        next: { revalidate: 300 },
      }
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getSingleAgent = async (slug, page) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_API_URL}/agent/${slug}?page=${page}`,
      {
        method: "GET",
        next: { revalidate: 300 },
      }
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getBlogs = async (page, limit) => {
  try {
    const params = new URLSearchParams();
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);

    const res = await fetch(
      `${process.env.SERVER_API_URL}/blogs${
        params.toString() ? `?${params}` : ""
      }`,
      {
        method: "GET",
        next: { revalidate: 300 },
      }
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getSingleBlog = async (slug) => {
  try {
    const res = await fetch(`${process.env.SERVER_API_URL}/blogs/${slug}`, {
      method: "GET",
      next: { revalidate: 300 },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getBlogCategory = async () => {
  try {
    const res = await fetch(`${process.env.SERVER_API_URL}/blog-categories`, {
      method: "GET",
      next: { revalidate: 300 },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = async (limit) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_API_URL}/get_all_categories${
        limit ? `?limit=${limit}` : ""
      }`,
      {
        method: "GET",
        next: { revalidate: 300 },
      }
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getAboutUs = async () => {
  try {
    const res = await fetch(`${process.env.SERVER_API_URL}/about-section`, {
      method: "GET",
      next: { revalidate: 3600 },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getRecentlyAdded = async (page, limit) => {
  try {
    const params = new URLSearchParams();
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);

    const res = await fetch(
      `${process.env.SERVER_API_URL}/recently_added_listing${
        params.toString() ? `?${params}` : ""
      }`,
      {
        method: "GET",
        next: { revalidate: 300 },
      }
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getPopularCities = async (limit) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_API_URL}/popular_cities${
        limit ? `?limit=${limit}` : ""
      }`,
      {
        method: "GET",
        next: { revalidate: 300 },
      }
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getFeatured = async (page, limit) => {
  try {
    const params = new URLSearchParams();
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);

    const res = await fetch(
      `${process.env.SERVER_API_URL}/featured_listing${
        params.toString() ? `?${params}` : ""
      }`,
      {
        method: "GET",
        next: { revalidate: 300 },
      }
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getPopular = async (page, limit) => {
  try {
    const params = new URLSearchParams();
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);

    const res = await fetch(
      `${process.env.SERVER_API_URL}/popular_listing${
        params.toString() ? `?${params}` : ""
      }`,
      {
        method: "GET",
        next: { revalidate: 300 },
      }
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getFavorite = async (page, limit) => {
  try {
    const params = new URLSearchParams();
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);

    const res = await fetch(
      `${process.env.SERVER_API_URL}/favorite_listing${
        params.toString() ? `?${params}` : ""
      }`,
      {
        method: "GET",
        next: { revalidate: 300 },
      }
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getSingleProperty = async (slug) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_API_URL}/properties/${slug}`,
      { method: "GET", next: { revalidate: 300 } }
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getFAQ = async () => {
  try {
    const res = await fetch(`${process.env.SERVER_API_URL}/faqs`, {
      method: "GET",
      next: { revalidate: 3600 },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getCountries = async () => {
  try {
    const res = await fetch(`${process.env.SERVER_API_URL}/countries`, {
      method: "GET",
      next: { revalidate: 3600 },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getCities = async () => {
  try {
    const res = await fetch(`${process.env.SERVER_API_URL}/cities`, {
      method: "GET",
      next: { revalidate: 3600 },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getPackage = async () => {
  try {
    const res = await fetch(`${process.env.SERVER_API_URL}/packages`, {
      method: "GET",
      next: { revalidate: 3600 },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getFacilities = async () => {
  try {
    const res = await fetch(`${process.env.SERVER_API_URL}/facilities`, {
      method: "GET",
      next: { revalidate: 300 },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getOutdoorFacilities = async () => {
  try {
    const res = await fetch(
      `${process.env.SERVER_API_URL}/outdoor-facilities`,
      {
        method: "GET",
        next: { revalidate: 300 },
      }
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getHeroSection = async () => {
  try {
    const res = await fetch(`${process.env.SERVER_API_URL}/hero-section`, {
      method: "GET",
      next: { revalidate: 3600 },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getOurAdvantage = async () => {
  try {
    const res = await fetch(`${process.env.SERVER_API_URL}/our-advantages`, {
      method: "GET",
      next: { revalidate: 3600 },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getTestimonials = async () => {
  try {
    const res = await fetch(`${process.env.SERVER_API_URL}/testimonials`, {
      method: "GET",
      next: { revalidate: 3600 },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getWallet = async () => {
  try {
    const token = await getToken();
    if (token) {
      const res = await fetch(
        `${process.env.SERVER_API_URL}/customer/get-wallet`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
          next: { revalidate: 0 },
        }
      );
      return await res.json();
    } else {
      return { data: {} };
    }
  } catch (error) {
    console.log(error);
  }
};

export const addToFeatured = async (body) => {
  try {
    const res = await fetch(`${process.env.SERVER_API_URL}/customer/feature`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.status === success) {
      revalidateTag("property");
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getFilterData = async (page, body) => {
  try {
    const fres = await fetch(
      `${process.env.SERVER_API_URL}/featured-properties${
        page > 1 ? `?page=${page}` : ""
      }`,
      { method: "POST", body: body }
    );
    const fData = await fres.json();
    const ares = await fetch(
      `${process.env.SERVER_API_URL}/filter${page > 1 ? `?page=${page}` : ""}`,
      { method: "POST", body: body }
    );
    const aData = await ares.json();
    return { fData, aData };
  } catch (error) {
    console.log(error);
  }
};

export const getAdUnitIds = async () => {
  try {
    const res = await fetch(`${process.env.SERVER_API_URL}/google-ads`, {
      method: "GET",
      next: { revalidate: 3600 },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getGateways = async () => {
  try {
    const res = await fetch(`${baseUrl}/customer/get-all-from-frontend`, {
      method: "GET",
      headers: { Authorization: `Bearer ${await getToken()}` },
      next: { revalidate: 0 },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const paymentStripe = async (data) => {
  try {
    const res = await fetch(`${baseUrl}/customer/store-transactions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    revalidateTag("user");
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const paymentPaypal = async (data) => {
  try {
    const res = await fetch(`${baseUrl}/customer/paypal/success`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    revalidateTag("user");
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const paymentRazorpay = async (data) => {
  try {
    const res = await fetch(`${baseUrl}/customer/razorpay/pay`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    revalidateTag("user");
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getTransaction = async () => {
  try {
    const res = await fetch(`${baseUrl}/customer/get-transactions`, {
      method: "GET",
      headers: { Authorization: `Bearer ${await getToken()}` },
      next: { revalidate: 0, tags: ["transaction"] },
    });
    revalidateTag("user");
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};