"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import Container from "./Container";

const NextBreadcrumb = ({ listClasses, capitalizeLinks }) => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  if (pathNames.length <= 0) return null;

  return (
    <section className="w-full h-16 bg-lightGray">
      <Container>
        <ul className="h-full flex items-center gap-2 text-tGray text-sm">
          <li>
            <Link href={"/"} className="flex items-center gap-2">
              <Image src="/icon/house.svg" alt="#" width={20} height={20} />
              Home
            </Link>
          </li>
          {pathNames.length > 0 && (
            <Image src="/icon/caret-right.svg" alt="#" width={12} height={12} />
          )}
          {pathNames.map((link, index) => {
            let href = `/${pathNames.slice(0, index + 1).join("/")}`;
            let itemClasses = paths === href ? "text-skyBlue" : listClasses;
            let itemLink = capitalizeLinks
              ? link[0].toUpperCase() + link.slice(1, link.length)
              : link;
            return (
              <React.Fragment key={index}>
                <li className={itemClasses}>
                  <Link href={href}>{itemLink}</Link>
                </li>
                {pathNames.length !== index + 1 && (
                  <Image
                    src="/icon/caret-right.svg"
                    alt="#"
                    width={12}
                    height={12}
                  />
                )}
              </React.Fragment>
            );
          })}
        </ul>
      </Container>
    </section>
  );
};

export default NextBreadcrumb;
