"use client"

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getPages } from "@/api/pages";
import { Page } from "@/types";
import { Button, Card, CardContent, ImageBG } from "../components/global";
import Icon from "../components/global/icons/Icon";
import BlogCard from "../components/BlogCard";

export default function BlogCards() {
    const [blogPages, setBlogPages] = React.useState<Page.Options[]>([])

    React.useEffect(() => {
        //Fetch blog pages
        async function fetchPages() {
            const { pages } = await getPages({ sort: 'updatedAt.desc', limit: 5 });
            if (pages)
                setBlogPages(pages)
        }
        fetchPages()
    }, [])

    return (
        blogPages.length > 0 ? (
            <div style={{ backgroundImage: 'linear-gradient(0deg, transparent, #FFF), url("/img/page-bottom-bg.webp")' }}>
                <div className='container-xxl min-xl:px-0 min-xl:pb-16 xl:pb-12'>
                    <h2>Conseils jardin et guides d'achats</h2>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
                        <Card className='!h-full'>
                            {blogPages[0].image ? (
                                <Image
                                    className="card-top-img"
                                    src={`${process.env.SERVER_URL}${blogPages[0].image.path}`}
                                    height={300}
                                    width={300}
                                    style={{ height: "auto", maxHeight: "450px", width: "100%", objectFit: 'cover' }}
                                    alt={blogPages[0].title}
                                />
                            ) : (
                                <ImageBG>
                                    <Icon name="Picture" />
                                </ImageBG>
                            )}
                            <CardContent className="mt-0 no-titles">
                                <div className='mb-4 primary font-semibold'>
                                    {blogPages[0].category.name}
                                </div>
                                <div className='text-xl leading-6 font-semibold line-clamp-2'>
                                    {blogPages[0].title}
                                </div>
                                <div
                                    className="line-clamp-5 mt-3"
                                    dangerouslySetInnerHTML={{ __html: blogPages[0].content }}
                                />
                            </CardContent>
                            <Link href={`/blog/article/${blogPages[0].link}`} className="block absolute left-0 top-0 w-full h-full"></Link>
                        </Card>
                        <div className="grid grid-cols-2 gap-4 xs:grid-cols-1">
                            {blogPages.slice(1, 5).map((page, i) => {
                                return (
                                    <BlogCard page={page} key={i} />
                                )
                            })}
                        </div>
                    </div>
                    <div className="flex justify-center mt-11">
                        <Button className='v-primary is-link' href='/blog'>
                            Conseils jardin et guides d'achats
                        </Button>
                    </div>
                </div>
            </div>
        ) : (
            <></>
        )
    )
}