import React from "react";
import { INavigation } from "@/interfaces/index";
import Link from "next/link";
interface NavigationListProps {
  navigationList: INavigation[];
}
const Navigation = ({ navigationList }: NavigationListProps) => {
  return (
    <div className="bg-gray-100 py-3">
      <div className="mx-auto max-w-[95%]">
        <ul className="flex items-center">
          {navigationList.map((item, idx) => (
            <Link key={idx} href={`${item.url}`} passHref>
              <li className="capitalize">
                <span>{item.title}</span>
                {idx < navigationList.length - 1 ? (
                  <span className="mx-4">/</span>
                ) : null}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
