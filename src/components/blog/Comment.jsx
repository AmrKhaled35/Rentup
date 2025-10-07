"use client";

import myAxios from "@/utils/myAxios";
import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import PostComment from "./PostComment";

const Comment = ({ id }) => {
  const [comments, setComments] = useState([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    if (id) {
      myAxios(`/blog-comments/${id}`)
        .then((res) => setComments(res.data.data))
        .catch((err) => console.log(err?.message));
    }
  }, [id, refetch]);

  return (
    <>
      <PostComment id={id} setRefetch={setRefetch} />
      <div className="mt-12">
        <p className="text-xl font-medium">Comments</p>
        <div className="divide-y">
          {comments?.map((item) => (
            <div key={item.id} className="flex gap-3 py-6">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMG_URL}${item?.user?.user_img}`}
                alt="#"
                width={40}
                height={40}
                className="h-max rounded-full"
              />
              <div>
                <p className="text-sm">
                  <span>{item?.user?.name}</span>
                  <span className="mx-[6px] text-tGray">•</span>
                  <span className="text-tGray">
                    {dayjs(item.created_at).format("DD MMM, YYYY")}
                  </span>
                </p>
                <p className="text-sm mt-[6px]">{item.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Comment;
