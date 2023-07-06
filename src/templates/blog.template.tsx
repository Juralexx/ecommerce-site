"use client"

import React from "react";
import { Page } from "@/types";
import { Breadcrumb, Button, CircleLoader } from "../components/global";
import BlogCard from "../components/BlogCard";

interface Props {
    blog: {
        category: {
            name: string;
            url: string;
        }
        pages: Page.Options[];
    }[];
}

const BlogTemplate = (props: Props) => {
    const { blog } = props;

    return (
        <div>
            <Breadcrumb />
            <h1 className="mt-5 mb-6">
                Conseils, guides et curiosités sur les agrumes
            </h1>
            <p className="mb-8">
                Découvrez les secrets des plantes : des arbres du jardin à la plante verte dans la maison.
                Vous connaitrez leurs origines, les différentes variétés qui existent, leurs conditions de culture idéales et leur entretien au quotidien...
                Découvrez également leurs bienfaits sur notre bien-être !
            </p>
            <div className="flex flex-col gap-y-8 xl:pb-12 xl:pt-0">
                {blog && blog.length > 0 ? (
                    blog.map(({ category, pages }, i) => {
                        return (
                            <div className="py-5" key={i}>
                                <h2>{category.name}</h2>
                                <div className="grid grid-cols-4 gap-4 sm:grid-cols-2 xs:grid-cols-1">
                                    {pages.slice(0, 4).map((page, j) => {
                                        return (
                                            <BlogCard page={page} key={j} />
                                        )
                                    })}
                                </div>
                                <div className="flex justify-center mt-11" >
                                    <Button href={`/blog/category/${category.url}`} className="v-primary is-link">
                                        Nos conseils : {category.name}
                                    </Button>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <CircleLoader />
                )}
            </div>
        </div>
    )
}

export default BlogTemplate;