"use client";

import { authKey } from "@/constant";
import myAxios from "@/utils/myAxios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const PostComment = ({ id, setRefetch }) => {
  const token = Cookies.get(authKey);
  const [comment, setComment] = useState("");
  const { push } = useRouter();

  const handleComment = () => {
    if (!token) {
      push("/login");
    } else {
      const toastId = toast.loading("loading...");
      const formData = new FormData();
      formData.append("blog_id", id);
      formData.append("comment", comment);
      myAxios
        .post("/customer/create-blog-comment", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data.status === "success") {
            toast.dismiss(toastId);
            toast.success("your comment has been posted");
            setComment("");
            setRefetch((p) => !p);
          }
        })
        .catch((err) => {
          toast.dismiss(toastId);
          console.log(err.message);
        });
    }
  };

  return (
    <div className="mt-12">
      <p className="text-xl font-medium">Comment</p>
      <textarea
        className="form-textarea w-full px-4 py-2 mt-6 text-sm border-border rounded-sm focus:ring-0 focus:border-skyBlue"
        rows="6"
        placeholder="What’s your thought about this blog..."
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      />
      <button
        onClick={handleComment}
        className="mt-6 bg-skyBlue text-white text-sm px-6 py-3 rounded-sm"
      >
        SUBMIT
      </button>
    </div>
  );
};

export default PostComment;
