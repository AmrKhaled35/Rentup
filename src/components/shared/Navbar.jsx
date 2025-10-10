"use client";
import Image from "next/image";
import Container from "./Container";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";
import { useTranslations } from "next-intl";
import { logoutUser } from "@/actions/actions";
import { authKey, success } from "@/constant";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import Logo from "../../../public/logo/Logo.png";

const translations = {
  "Terms & Condition": "الأحكام والشروط",
  "About Us": "معلومات عنا",
  "Privacy Policy": "سياسة الخصوصية",
  "Affiliate Program Privacy": "برنامج Affiliate",
};

const Navbar = ({ links, logo, user }) => {
  const t3 = (text) => translations[text] || text;
  const path = usePathname();
  const menuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const token = Cookies.get(authKey);

  const t = useTranslations("navmenu");
  const s = useTranslations("sideNavmenu");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuRef]);

  useEffect(() => {
    setShowLinks(false);
  }, [path]);

  const handleLogout = async () => {
    const data = await logoutUser(user);
    if (data.status === success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "تم تسجيل الخروج بنجاح!",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <div className={`${path.length > 1 ? "bg-whiteFc" : "bg-whiteF5"} `}>
      <Container>
        <nav className="flex justify-between items-center border-b border-dark h-[80px] lg:h-[100px]">
          <Link href="/">
            <Image
              src={Logo}
              alt="RealEstate"
              width="150"
              height="45"
              className="ml-6"
            />
            {path === "/" && <h1 className="hidden">RealEstate</h1>}
          </Link>
          <ul
            className={`${
              showLinks === false
                ? styles.navmenu
                : `${styles.navmenu} ${styles.active}`
            } grow !py-2 lg:!py-0 lg:h-[98px] flex flex-col lg:flex-row items-center justify-center gap-4`}
          >
            <div className="lg:ml-10 flex flex-col lg:flex-row space-y-3 lg:space-y-0 justify-between items-center gap-3 lg:gap-8 lg:h-full">
              <li
                className={`${
                  path.includes("filter") && "border-b-2"
                } border-dark lg:h-full flex justify-center items-center`}
              >
                <Link href="/filter/buy/all-city/all-category">العقارات</Link>
              </li>
              <li
                className={`${
                  path.includes("agent") && "border-b-2"
                } border-dark lg:h-full flex justify-center items-center`}
              >
                <Link href="/agents">الوكلاء</Link>
              </li>
              <li
                className={`${
                  path.includes("contact") && "border-b-2"
                } border-dark lg:h-full flex justify-center items-center`}
              >
                <Link href="/contact">تواصل معنا</Link>
              </li>
              <li className="lg:h-full flex justify-center items-center cursor-pointer group relative">
                الصفحات
                <span>
                  <svg
                    className="w-4 h-4 ml-1 transform rotate-90"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </span>
                <div className="hidden group-hover:block absolute top-3/4 left-0 bg-white shadow-sm py-2 px-6 z-10 space-y-2 min-w-max">
                  {links?.map((item) => (
                    <Link
                      key={item?.id}
                      href={`/more/${item?.slug ? item?.slug : "about-us"}`}
                      className="block hover:text-[#00B140] whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {t3(item?.title)}
                    </Link>
                  ))}
                </div>
              </li>
            </div>

            <form
              onSubmit={handleSearch}
              className="hidden lg:flex  items-center bg-gray-100 border border-gray-400   rounded-lg px-4 py-2 w-[230px] sm:w-[250px] md:w-[300px] lg:w-[360px] xl:w-[400px] shadow-sm"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في عقارات"
                className="bg-transparent outline-none w-full text-sm text-black placeholder-gray-400 text-right"
              />
              <button type="submit">
                <Image src="/icon/search.svg" alt="search" width={20} height={20} />
              </button>
            </form>

            {token ? (
              <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 justify-between items-center gap-3 lg:h-full">
                <li className="relative">
                  <div className="text-left flex flex-col lg:flex-row items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href="/wallet"
                        className="px-5 py-2 border border-dark rounded-lg"
                      >
                        الرصيد: {user?.wallet?.balance ?? 0}
                      </Link>
                    </div>
                    <button
                      type="button"
                      className="flex items-center gap-3"
                      onClick={() => setIsOpen((p) => !p)}
                      ref={menuRef}
                    >
                      {user?.user_img ? (
                        <div className="relative">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_IMG_URL}/${user?.user_img}`}
                            alt="Profile"
                            width={44}
                            height={44}
                            className="rounded-full size-11 object-cover"
                          />
                        </div>
                      ) : (
                        <div className="relative">
                          <Image
                            src="/icon/user-circle-dark.svg"
                            alt="Profile"
                            width={44}
                            height={44}
                          />
                        </div>
                      )}
                      <Image
                        src="/icon/arrow-down.svg"
                        alt="#"
                        width={16}
                        height={8}
                      />
                    </button>
                    {isOpen && (
                      <div
                        className="absolute -right-20 lg:-right-20 top-[86px] lg:top-[43px] mt-[9px] min-w-[260px] rounded-[10px] bg-white shadow-[0_14px_19px_0px_rgba(0,83,40,0.16)] max-h-64 overflow-y-auto custom-scrollbar"
                        data-lenis-prevent
                      >
                        <div
                          className="pt-[15px]"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          <Link
                            href="/dashboard"
                            className="px-[30px] py-[14px] hover:text-[#00B140] block"
                          >
                            لوحة التحكم
                          </Link>
                          <Link
                            href="/add-property"
                            className="px-[30px] py-[14px] hover:text-[#00B140] block"
                          >
                            إضافة عقار
                          </Link>
                          <Link
                            href="/my-properties"
                            className="px-[30px] py-[14px] hover:text-[#00B140] block"
                          >
                            عقاراتي
                          </Link>
                          <Link
                            href="/profile-settings"
                            className="px-[30px] py-[14px] hover:text-[#00B140] block"
                          >
                            إعدادات الحساب
                          </Link>
                          <p
                            className="px-[30px] py-[15px] hover:text-[#00B140] cursor-pointer"
                            onClick={handleLogout}
                          >
                            تسجيل الخروج
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              </div>
            ) : (
              <div className="lg:ms-auto flex flex-col lg:flex-row items-center gap-3 lg:gap-6">
                <li>
                  <Link href="/login" className="flex items-center">
                    <span>تسجيل الدخول</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="flex items-center gap-2 px-6 py-3 bg-[#00B140] text-white rounded-[10px]"
                  >
                    <span>انشاء حساب</span>
                  </Link>
                </li>
              </div>
            )}
          </ul>
          <button
            className={
              showLinks === false
                ? styles.navBtn
                : styles.navBtn + " " + styles.active
            }
            onClick={() => setShowLinks((p) => !p)}
          >
            <span className={`${styles.bar} bg-black`}></span>
            <span className={`${styles.bar} bg-black`}></span>
            <span className={`${styles.bar} bg-black`}></span>
          </button>
        </nav>

        <form
          onSubmit={handleSearch}
          className="flex lg:hidden items-center justify-center bg-gray-200  rounded-lg px-3 py-2 mx-4 mt-2"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في عقارات"
            className="bg-transparent outline-none w-full text-sm text-black placeholder-gray-400 text-right"
          />
          <button type="submit">
            <Image src="/icon/search.svg" alt="search" width={20} height={20} />
          </button>
        </form>
      </Container>
    </div>
  );
};

export default Navbar;
