import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Page } from "@/types";
import { Card, CardContent, ImageBG } from "./global";
import Icon from "./global/icons/Icon";

export default function BlogCard({ page }: { page: Page.Options }) {
    return (
        <Card className='!h-full'>
            {page.image ? (
                <Image
                    className="card-top-img"
                    src={`${process.env.SERVER_URL}${page.image.path}`}
                    height={140}
                    width={300}
                    style={{ height: 150, width: "100%", objectFit: 'cover' }}
                    alt={page.title}
                />
            ) : (
                <ImageBG>
                    <Icon name="Picture" />
                </ImageBG>
            )}
            <CardContent className="!mt-0 no-titles">
                <div className='mb-4 primary font-semibold'>
                    {page.category.name}
                </div>
                <div className='text-xl leading-6 font-semibold line-clamp-2'>
                    {page.title}
                </div>
                <div
                    className="line-clamp-3 mt-3"
                    dangerouslySetInnerHTML={{ __html: page.content }}
                />
            </CardContent>
            <Link href={`/blog/article/${page.link}`} className="block absolute left-0 top-0 w-full h-full"></Link>
        </Card>
    )
}