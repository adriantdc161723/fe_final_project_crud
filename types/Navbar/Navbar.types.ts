import React from "react";
import { Url } from "url";

export interface Navbar{
    isMenuExpand?: boolean;
}

export interface MENU_ITEMS {
    icon?: React.FC;
    linkName?: string & "linkName";
    href: string;
}

export interface NavbarMenu {
    menuRef?: any,
    menuItems?: MENU_ITEMS[]
}