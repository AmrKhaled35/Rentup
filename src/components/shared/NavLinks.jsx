import Link from "next/link";
import { usePathname } from "next/navigation";

const itemLink = [
  {
    label: "Properties",
    path: "/properties",
  },
  {
    label: "Blog",
    path: "/blogs",
  },
  {
    label: "Pages",
    path: "/pages",
  },
  {
    label: "Agents",
    path: "/agents",
  },
];

const NavLinks = () => {
  const path = usePathname();

  return (
    <ul className="flex items-center gap-10">
      {itemLink.map((item) => (
        <li key={item.label}>
          <Link
            href={item.path}
            className={`inline-block leading-[94px] border-dark ${item.path === path && "border-b-[3px] mt-1"}`}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
