"use client"

import React from "react";
import Link from "next/link";
import Icon from '@/components/global/icons/Icon';

const Footer = ({ datas }: { datas: Record<string, any> }) => {
    return (
        <footer className="av-footer" id="footer">
            <div className="container-lg py-14 px-6">
                <div className="av-footer-top">
                    <img src="/logo.png" alt={datas.denomination} />
                    <div className="flex items-center">
                        <a href={'https://www.facebook.com/'} target="_blank" rel="noreferrer" className="footer-social">
                            <Icon name="FacebookCircle" />
                        </a>
                        <a href={'https://www.instagram.com/'} target="_blank" rel="noreferrer" className="footer-social">
                            <Icon name="Instagram" />
                        </a>
                    </div>
                </div>
                <div className="min-xs:columns-2 min-sm:columns-3 min-md:columns-4">
                    <div className="break-inside-avoid mb-7">
                        <h4>Informations</h4>
                        <div className="av-footer-infos">
                            <div className="av-info">
                                <h5>Notre site de production</h5>
                                <a href={datas.googlemap} target="_blank" rel="noreferrer">
                                    Chemin des Landes 49125 TIERCE
                                </a>
                            </div>
                            <div className="av-info">
                                <h5>Notre jardinerie urbaine</h5>
                                <a href={"tel:" + datas.phone}>
                                    2 ter Quai de la Mégisserie <br />
                                    75001 PARIS
                                </a>
                            </div>
                        </div>
                    </div>
                    {datas?.navigation &&
                        datas.navigation.map((tab: Record<string, any>, key: number) => {
                            return (
                                <div className="av-footer-links break-inside-avoid" key={key}>
                                    <h4>{tab.name}</h4>
                                    {!tab.links || tab.links.length === 0 ? (
                                        <Link href={tab?.link} target={tab?.target}>
                                            {tab?.name}
                                        </Link>
                                    ) : (
                                        tab.links.map((subtab: { link: string, name: string }, i: number) => {
                                            return (
                                                <Link href={subtab?.link} target={tab?.target} key={i}>
                                                    {subtab?.name}
                                                </Link>
                                            )
                                        })
                                    )}
                                </div>
                            )
                        })}
                    <div className="av-footer-links">
                        <h4>Informations légales</h4>
                        <Link href="/mentions-legales">Mentions légales</Link>
                        <Link href="/politique-de-confidentialite">Politique de confidentialité</Link>
                        <a href="#cookies-manager" rel='noreferrer'>Gérer mes cookies</a>
                    </div>
                </div>
            </div>
            <div className="av-footer-bottom">
                <div className="container-lg">
                    <div className="flex justify-between items-center">
                        <div className="inline-flex items-center gap-3">
                            <p className="leading-4 mt-1">Paiment sécurisé</p>
                            <Icon name="Mastercard" className="w-16 h-11 border-2 border-slate-200 bg-white rounded-md" />
                            <Icon name="CB" className="w-16 h-11 p-1 border-2 border-slate-200 bg-[#146c9c] rounded-md" />
                            <Icon name="Visa" className="w-16 h-11 border-2 border-slate-200 bg-white rounded-md" />
                        </div>
                        <a href="https://www.alexandrevurbier.com/" target="_blank" rel="noreferrer">
                            © {new Date().getFullYear()} Alexandre Vurbier. Tout droits réservés.
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;