"use client";

import { useEffect, useState } from "react";
import ChattingList from "../ChattingList";
import myAxios from "@/utils/myAxios";
import Link from "next/link";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import Image from "next/image";
import Pusher from "pusher-js";
import Container from "@/components/shared/Container";
import Cookies from "js-cookie";
import { authKey } from "@/constant";

dayjs.extend(relativeTime);

const IndividualChat = ({ id, conversations, config, user }) => {
  const [inputFocused, setInputFocused] = useState(false);
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const token = Cookies.get(authKey);

  const conversation = conversations?.find((item) => item.id == id) || {};
  const { property } = conversation || {};
  const {
    id: property_id,
    property_title,
    price,
    created_at,
    is_featured,
    get_title_image,
    get_property_user,
  } = property || {};

  useEffect(() => {
    if (token) {
      myAxios(`/customer/get-message/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          setMessages(res.data.data);
          fetch = true;
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (config && id) {
      const pusher = new Pusher(config?.pusher_app_key, {
        cluster: config?.pusher_app_cluster,
      });
      const channel = pusher.subscribe(`conversation.${id}`);
      channel.bind("message.sent", (data) => {
        setMessages((prev) => [data.message, ...prev]);
      });

      return () => {
        pusher.unsubscribe(`conversation.${id}`);
      };
    }
  }, [id, config]);

  const handleMessage = (e) => {
    e.preventDefault();
    myAxios
      .post(
        "/customer/message",
        {
          conversation_id: id,
          message: text,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.data.status == "success") {
          setText("");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (token && image) {
      const formData = new FormData();
      formData.append("conversation_id", id);
      formData.append("url", image);
      myAxios
        .post("/customer/send-attachment", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setText("");
          setImage(null);
        })
        .catch((err) => {
          setImage(null);
          console.log(err);
        });
    }
  }, [image]);

  return (
    <div className="bg-whiteF5 py-5 pt-0 lg:pt-5">
      <Container>
        <div className="bg-white lg:rounded-3xl lg:shadow-[0_11px_15px_0px_rgba(0,79,38,0.10)] p-4 pt-0 lg:pt-4 h-[calc(100vh-80px)] lg:h-[calc(100vh-140px)] overflow-hidden -mx-[13px] lg:mx-0">
          <div className="grid lg:grid-cols-[1fr_2fr_1fr] gap-4 w-full h-full">
            <div
              data-lenis-prevent
              className={`space-y-2 lg:overflow-auto custom-scrollbar hidden lg:block`}
            >
              {conversations?.map((item) => (
                <ChattingList key={item.id} data={item} id={id} />
              ))}
            </div>
            <div
              className={`lg:border border-skyBlue lg:rounded-2xl flex flex-col overflow-hidden h-full`}
            >
              <div className="lg:hidden">
                <div className="flex items-center justify-between py-1">
                  <Link href="/chats">
                    <Image
                      src={"/icon/arrow-down.svg"}
                      alt=""
                      width={16}
                      height={16}
                      className="rotate-90"
                    />
                  </Link>
                  <span className="text-lg font-bold text-dark">Chat</span>
                  <div></div>
                </div>
                <hr className="-mx-4" />
                {!inputFocused && (
                  <div className="py-2 shadow-[0_2px_2px_0px_rgba(0,0,0,0.10)] -mx-4 px-4">
                    <div className="grid grid-cols-[75px_1fr] gap-6">
                      <div className="relative">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMG_URL}/${get_title_image?.title_img}`}
                          alt=""
                          width={75}
                          height={75}
                          className="rounded-xl"
                        />
                        <Image
                          src={
                            get_property_user?.user_img
                              ? `${process.env.NEXT_PUBLIC_IMG_URL}/${get_property_user?.user_img}`
                              : "/avatar.png"
                          }
                          alt="image"
                          width={27}
                          height={27}
                          className="absolute -right-2 -bottom-1 rounded-full"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-2">
                          <p className="text-sm !text-[#444] font-bold">
                            {get_property_user?.name}
                          </p>
                        </div>
                        <p className="!text-[#444] font-bold truncate">
                          {property_title}
                        </p>
                        <p className="!text-skyBlue text-lg font-bold">
                          $ {price}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <Link
                        href={`/properties/${property_id}`}
                        className="w-full py-2 text-center bg-skyBlue/10 border border-skyBlue rounded-full text-skyBlue text-sm font-bold"
                      >
                        View Advert
                      </Link>
                      <button className="w-full py-2 text-center text-sm bg-skyBlue text-white font-bold rounded-full">
                        Request to Purchase
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-skyBlue/10 py-3 px-5 lg:flex items-center space-x-1.5 rounded-t-2xl hidden">
                <Image
                  src={
                    get_property_user?.user_img
                      ? `${process.env.NEXT_PUBLIC_IMG_URL}/${get_property_user?.user_img}`
                      : "/avatar.png"
                  }
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <p className="text-dark font-semibold pl-2">
                  {get_property_user?.name}
                </p>
                <div className="bg-skyBlue text-white text-sm rounded-md py-1 px-3">
                  Individial
                </div>
              </div>
              <div
                className={`lg:px-5 py-3 ${
                  inputFocused
                    ? "max-h-[calc(100%-90px)]"
                    : "max-h-[calc(100%-235px)]"
                } lg:max-h-[calc(100%-120px)] overflow-y-auto`}
              >
                <ul
                  className="h-full flex flex-col-reverse lg:overflow-y-auto custom-scrollbar overflow-y-auto"
                  data-lenis-prevent
                >
                  {messages.map((item, i) => (
                    <li
                      key={i}
                      className={`flex ${
                        item?.user_id == user?.id
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div>
                        {item?.message ? (
                          <p
                            className={`mt-[6px] max-w-lg px-3 py-2 text-sm rounded-3xl ${
                              item?.user_id == user?.id
                                ? "bg-skyBlue text-white"
                                : "bg-skyBlue/10 text-dark"
                            }`}
                          >
                            {item?.message}
                          </p>
                        ) : item?.url ? (
                          <Image
                            src={`${process.env.NEXT_PUBLIC_IMG_URL}/${item?.url}`}
                            alt="#"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="h-36 w-auto mt-[6px]"
                          />
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <form
                onSubmit={handleMessage}
                className="bg-[#F8F6F1] lg:rounded-b-2xl h-14 -mx-4 lg:mx-0 px-5 flex items-center justify-between mt-auto"
              >
                <input
                  type="text"
                  placeholder="Write your message"
                  className="bg-inherit h-full outline-none w-5/6"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                />
                <div className="flex items-center">
                  <label htmlFor="attach">
                    <input
                      onChange={(e) => setImage(e.target.files[0])}
                      type="file"
                      name="file"
                      id="attach"
                      className="hidden"
                    />
                    <Image
                      src="/icon/attachment.svg"
                      alt=""
                      width={25}
                      height={25}
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={!text}
                    className="disabled:opacity-60"
                  >
                    <Image
                      src="/icon/send.svg"
                      alt=""
                      width={25}
                      height={25}
                      className="ml-2"
                    />
                  </button>
                </div>
              </form>
            </div>
            <div className="lg:flex flex-col justify-between hidden">
              <div className="space-y-3.5">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMG_URL}/${get_title_image?.title_img}`}
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-44 w-full object-cover rounded-2xl"
                />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-[6px]">
                    <Image
                      src="/icon/time-circle.svg"
                      alt=""
                      width={11}
                      height={11}
                    />
                    <p className="text-xs !text-[#444]">
                      {dayjs(created_at).fromNow()}
                    </p>
                  </div>
                  {is_featured && (
                    <div className="flex items-center gap-2 bg-[#FFE58A] rounded-md px-2 py-1">
                      <Image
                        src={"/icon/boost-dark.svg"}
                        alt=""
                        width={7}
                        height={9}
                      />
                      <p className="text-xs text-dark font-medium">FEATURED</p>
                    </div>
                  )}
                </div>
                <p className="!text-[#444] font-bold">{property_title}</p>
                <p className="text-skyBlue font-extrabold">$ {price}</p>
                <div className="flex gap-[6px] items-start">
                  <Image
                    src="/icon/location2.svg"
                    alt=""
                    width={10}
                    height={14}
                  />
                  <p className="text-sm text-[#444]">
                    {get_property_user?.address}
                  </p>
                </div>
              </div>
              <div>
                <Link href={`/properties/${property_id}`}>
                  <button className="w-full py-2 px-5 text-center bg-skyBlue/10 border border-skyBlue rounded-full text-skyBlue font-bold">
                    View Property
                  </button>
                </Link>
                <button className="mt-4 w-full py-2 px-5 text-center bg-skyBlue text-white font-bold rounded-full">
                  Request to Purchase
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default IndividualChat;
