"use client"

import React from "react";
import { Page } from "@/types";
import { Breadcrumb } from "../components/global";
import BlogCard from "../components/BlogCard";

interface Props {
    category: {
        name: string;
        url: string;
    }
    pages: Page.Options[];
}

const BlogCategoryTemplate = (props: Props) => {
    const { category, pages } = props;

    return (
        <div>
            <Breadcrumb />
            <h1 className="mt-5">
                {category.name}
            </h1>
            <div className="grid grid-cols-4 gap-4 sm:grid-cols-2 xs:grid-cols-1">
                {pages.map((page, i) => {
                    return (
                        <BlogCard page={page} key={i} />
                    )
                })}
            </div>
        </div>
    )
}

export default BlogCategoryTemplate;