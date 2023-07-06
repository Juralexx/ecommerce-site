"use client"

import React from "react"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Page } from "@/types"
import { addActive, convertStringToURL, dateParser } from "@/functions/utils";
import useMediaQuery from "../components/global/hooks/useMediaQuery";
import { Button, CircleLoader } from "../components/global";
import Icon from "../components/global/icons/Icon";
import BlogCard from "../components/BlogCard";

interface Props {
    page: Page.Options;
    relatedPages?: Page.Options[];
    lastPages?: Page.Options[];
}

function getReadingTime(text: string) {
    if (text) {
        const wpm = 225;
        const words = text.trim().split(/\s+/).length;
        const time = Math.ceil(words / wpm);
        return time;
    } else {
        return 5;
    }
}

const PageTemplate = (props: Props) => {
    const { page, relatedPages, lastPages } = props;
    //Get the current pathname
    const pathname = usePathname();
    const md = useMediaQuery('(max-width: 992px');

    //Variable containing the WYWIWYG HTML, we store the html in a variable to be able
    //to retrieve all the titles and add an ID to each one
    const [html, setHtml] = React.useState<string | TrustedHTML | null>(null);
    //Variable containing all the titles
    const [summary, setSummary] = React.useState<Element[]>([]);
    //Variable summary card open state
    const [open, setOpen] = React.useState<boolean>(md ? false : true);

    /**
     * Hook to retrieve all the wysiwyg titles and store titles
     */

    React.useEffect(() => {
        //Create a DOMParser to get the HTML from the 'page.content'
        const parser = new DOMParser();
        //Get the 'page.content' HTML
        const virtualDoc = parser.parseFromString(page.content, 'text/html');
        //Get the 'page.content' titles
        const titles = Array.from(virtualDoc.querySelectorAll<HTMLElement>("h1, h2, h3"));
        //If there's titles
        if (titles.length > 0) {
            //We add a unique ID the each title
            titles.forEach(title => {
                title.setAttribute('id', convertStringToURL(title.innerText));
            })
            //Pass the titles to the 'summary' variable
            setSummary(titles);
        }
        //If there's no title
        else {
            //Get the main title
            const h1 = document.querySelector('h1');
            if (h1) {
                //We add a unique ID to the main title
                h1.setAttribute('id', convertStringToURL(h1.innerText));
                //Pass the main title to the 'summary' variable
                setSummary([h1]);
            }
        }
        //Pass the WYSIWYG HTML to the 'html' variable
        setHtml(virtualDoc.body.outerHTML);
    }, [])

    /**
     * Hook to scroll to the anchor link if the URL contains one
     * As the IDs are added to the titles on the first render (hook above), they do not exists directly on page load
     * So we wait the HTML to be rendered with the IDs on the title and then scroll to the required hash link.
     */

    React.useEffect(() => {
        //If the HTML is rendered
        if (html) {
            setTimeout(() => {
                //Get the required hash link
                const hash = window.location.hash;
                //If the hash exists in the URL
                if (hash) {
                    //Find the element to scroll to
                    const elementToScrollTo = document.querySelector(hash);
                    //If it exists
                    if (elementToScrollTo !== null) {
                        //Scroll to the hash
                        elementToScrollTo.scrollIntoView();
                    } else {
                        //Else scroll to top of the page
                        window.scrollTo({ top: 0 });
                    }
                }
            }, 0);
        }
    }, [html])

    /**
     * Hook to get the current summary link active on document scroll
     */

    React.useEffect(() => {
        if (summary.length > 0) {
            //Function the add 'active' class to the summary link related to the current window section
            const getActiveSection = () => {
                //Retrieve all the title ids
                const ids = summary.map(title => `#${title.id}`);
                if (ids) {
                    //Retrieve all the titles elements
                    const titles = document.querySelectorAll(ids.toString());
                    //Retrieve all the summary links
                    const summaryLinks = document.querySelectorAll(".summary-list a");
                    //Variable handling the current section ID
                    //Assign the first element ID to add it active on page top or pag reload
                    let currentSectionID: string | null = ids[0];
                    //For each summary titles
                    (titles as any).forEach((section: HTMLElement, i: number) => {
                        //Get the title position from top of the document
                        const sectionTop = section.getBoundingClientRect().top;
                        //If the title position below the current scroll position
                        if (sectionTop < 300) {
                            //Push the title ID to the 'currentSectionID' variable
                            currentSectionID = ids[i];
                        }
                    });
                    //For each summary link
                    summaryLinks.forEach(li => {
                        //Remove the 'active' class
                        li.classList.remove("active");
                        //If the link classlist contains the the current section ID
                        if (li.classList.contains(currentSectionID as string)) {
                            //Add the 'active' class
                            li.classList.add("active");
                        }
                    });
                }
            }
            //Onscroll window event listener
            window.addEventListener('scroll', getActiveSection);
            return () => window.removeEventListener('scroll', getActiveSection)
        }
    }, [summary])

    return (
        <React.Fragment>
            <div className="relative w-full h-60">
                {page?.image ? (
                    <Image
                        src={`${process.env.SERVER_URL}${page.image!.path}`}
                        sizes="100vw"
                        fill
                        style={{ objectFit: 'cover' }}
                        alt={page.title}
                    />
                ) : (
                    <div className="w-full h-full bg-primary" />
                )}
            </div>
            <div className="av-title-card">
                <div className='mb-6 primary font-semibold'>
                    {page.category.name}
                </div>
                <h1>
                    {page.title}
                </h1>
            </div>
            <div className='container-xxl pb-10 pt-5'>
                <div className="relative flex flex-row md:flex-col gap-x-8 md:gap-y-8">
                    <div className="sticky flex flex-col top-0 flex-[1 0 0] md:relative">
                        <div className={`av-summary-card ${addActive(open)}`}>
                            <div className='summary-title' onClick={() => setOpen(!open)}>
                                Sommaire <Icon name="CaretDown" />
                            </div>
                            <div className="summary-list">
                                {summary.length > 0 ? (
                                    summary.map((title, i) => {
                                        return (
                                            <Link
                                                className={`#${title.id} ${i === 0 ? 'active' : 'unactive'}`}
                                                href={`${pathname}#${title.id}`}
                                                key={i}
                                                scroll={true}
                                            >
                                                {title.innerHTML}
                                            </Link>
                                        )
                                    })
                                ) : (
                                    <CircleLoader />
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="mb-5 font-semibold flex items-center">
                            <Icon name="Clock" className="inline mr-1" />
                            <span className="mt-1">{getReadingTime(page.content)} min de lecture • Modifié le {dateParser(page.updatedAt)}</span>
                        </div>
                        {html ? (
                            <div
                                id="page-content"
                                className="page-content ck-content"
                                dangerouslySetInnerHTML={{ __html: html ? html as TrustedHTML : page.content }}
                            />
                        ) : (
                            <CircleLoader />
                        )}
                        {relatedPages && relatedPages.length > 0 &&
                            <div className="mt-16">
                                <h2>Autres articles de cette catégorie</h2>
                                <div className="grid grid-cols-3 gap-4 sm:grid-cols-2 xs:grid-cols-1">
                                    {relatedPages.slice(0, 4).map((page, j) => {
                                        return (
                                            <BlogCard page={page} key={j} />
                                        )
                                    })}
                                </div>
                                <div className="flex justify-center mt-11" >
                                    <Button href={`/blog/category/${page.category.url}`} className='v-primary is-link'>
                                        Nos conseils : {page.category.name}
                                    </Button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                {lastPages && lastPages.length > 0 &&
                    <div className="mt-32">
                        <h2>Nos derniers articles à découvrir en ce moment</h2>
                        <div className="grid grid-cols-4 gap-4 sm:grid-cols-2 xs:grid-cols-1">
                            {lastPages.slice(0, 4).map((page, j) => {
                                return (
                                    <BlogCard page={page} key={j} />
                                )
                            })}
                        </div>
                        <div className="flex justify-center mt-11" >
                            <Button href={`/blog`} className='v-primary'>
                                Voir tous
                            </Button>
                        </div>
                    </div>
                }
            </div>
        </React.Fragment >
    )
}

export default PageTemplate;