"use client"

import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import { Breadcrumb } from '@/components/global';

interface Props {
    params: { category: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    return {
        title: 'Mentions légales',
    };
}

export default function MentionsLegales() {
    const datas = {
        denomination: 'Le Jardin des Agrumes',
        domain_name: 'www.lejardindesagrumes.fr',
        raison_social: 'SAS LE JARDIN DES AGRUMES',
        ville_RCS: 'Tierce',
        adresse_siege: 'Chemin des Landes 49125 TIERCE',
        SIRET: '235601452658',
        phone: '03 84 48 22 55',
        publisher: 'John Doe',
    }

    return (
        <div className='container-xl mentions py-8'>
            <Breadcrumb />
            <h1 className='pt-6'>Mentions légales</h1>
            <p>
                Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l’économie numérique, dite L.C.E.N.,
                il est porté à la connaissance des utilisateurs et visiteurs du site {datas?.denomination} les présentes mentions légales et conditions générales d’utilisation.
            </p>
            <p>
                Le site {datas?.denomination} est accessible à l’adresse suivante : {datas?.domain_name} (ci-après « le Site »). L’accès et l’utilisation du Site sont soumis aux présentes
                « Mentions légales et conditions générales d’utilisation » détaillées ci-après ainsi qu’aux lois et/ou règlements applicables.
            </p>
            <p>
                La connexion, l’utilisation et l’accès à ce Site impliquent l’acceptation intégrale et sans réserve de l’internaute de toutes les dispositions des présentes
                Mentions Légales et Conditions Générales d’Utilisations.
            </p>

            <div id="informations-légales">
                <h2>1 – Informations Légales.</h2>

                <p>
                    En vertu de l’Article 6 de la Loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique, il est précisé dans cet article l’identité
                    des différents intervenants dans le cadre de sa réalisation et de son suivi.
                </p>

                <h3>Editeur du site :</h3>
                <p>
                    <strong><a href="https://www.alexandrevurbier.com" target="_blank" rel="noreferrer">Alexandre Vurbier</a> </strong>- 39190 Cousance<br />
                    Site : <a href="https://www.alexandrevurbier.com" target="_blank" rel="noreferrer">www.alexandrevurbier.com</a><br />
                    <u><i>Ci-après l'éditeur</i></u>
                </p>

                <h3>Organisme représenté :</h3>
                <p>
                    <b>Organisme représenté</b>&nbsp;: {datas?.raison_social}<br />
                    <b>Siège social</b>&nbsp;: {datas?.adresse_siege}<br />
                    <b>Immatriculée au RCS</b> de {datas?.ville_RCS}<br />
                    <b>N° de SIRET</b>&nbsp;: {datas?.SIRET}<br />
                    <b>Téléphone</b>&nbsp;: {datas?.phone}<br />
                    <u><i>Ci-après l'Organisme représenté</i></u>
                </p>

                <h3>Responsable de publication :</h3>
                <p>
                    <strong>Responsable publication</strong> : {datas?.publisher}<br />
                    <u><i>Ci-après le Responsable publication</i></u>
                </p>

                <h3>Hébergeur du site :</h3>
                <p>
                    HOSTINGER, UAB Jonavos str. 60C, Kaunas 44192 Lithuania<br />
                    Tél&nbsp;: +370 64 50 33 78<br />
                    Email&nbsp;: domains@hostinger.com<br />
                    <u><i>Ci-après l'Hébergeur</i></u>
                </p>

                <h3>Utilisateurs :</h3>
                <p>
                    Sont considérés comme utilisateurs tous les internautes qui naviguent, lisent, visionnent et utilisent le site {datas?.denomination}.<br />
                    <u><i>Ci-après les Utilisateurs</i></u>
                </p>
            </div>

            <div id="CGU">
                <h2>2 – Conditions générales d’utilisation du site.</h2>

                <p>
                    La connexion, l’utilisation et l’accès à ce site impliquent l’acceptation pleine et entière des conditions générales d’utilisation ci-après décrites.
                    Ces conditions d’utilisation sont susceptibles d’être modifiées ou complétées à tout moment, les utilisateurs du site sont donc invités à les consulter de manière régulière.
                </p>
                <p>
                    Le site est mis à jour régulièrement par le responsable de publication pour l'éditeur. De la même façon, les mentions légales peuvent être modifiées à tout moment :
                    elles s’imposent néanmoins à l’utilisateur qui est invité à s’y référer le plus souvent possible afin d’en prendre connaissance.
                </p>

            </div>

            <div id="description-services">
                <h2>3 – Description des services fournis.</h2>

                <p>
                    Le site a pour objet de fournir une information concernant l’ensemble des activités de l'organisme représenté, ainsi que la vente de marchandises
                    et produits physiques.
                </p>
                <p>
                    Le responsable publication s’efforce de fournir sur le site des informations aussi précises que possible. Toutefois, il ne pourra être tenu responsable des omissions,
                    des inexactitudes et des carences dans la mise à jour, qu’elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
                </p>
                <p>
                    Toutes les informations indiquées sur le site sont données à titre indicatif, et sont susceptibles d’évoluer. Par ailleurs, les renseignements figurant sur le site
                    ne sont pas exhaustifs. Ils sont donnés sous réserve de modifications ayant été apportées depuis leur mise en ligne.
                </p>
            </div>

            <div id="loi-applicable-juridiction">
                <h2>4 – Loi applicable et juridiction</h2>

                <p>
                    Les présentes Mentions Légales et Conditions Générales d’Utilisation sont régies par la loi française. En cas de différend et à défaut d’accord amiable,
                    le litige sera porté devant les tribunaux français conformément aux règles de compétence en vigueur.
                </p>
            </div>

            <div id="acceptation-conditions-utilisation">
                <h2>5 – Acceptation des conditions d'utilisation</h2>

                <p>L’accès et l’utilisation du site sont soumis à l’acceptation et au respect des présentes Conditions Générales d’Utilisation.</p>

                <p>
                    L’éditeur se réserve le droit de modifier, à tout moment et sans préavis, le site et des services ainsi que les présentes CGU, notamment pour s’adapter aux évolutions
                    du site par la mise à disposition de nouvelles fonctionnalités ou la suppression ou la modification de fonctionnalités existantes.
                </p>

                <p>Il est donc conseillé à l’utilisateur de se référer avant toute navigation à la dernière version des CGU, accessible à tout moment sur le site.</p>

                <p>En cas de désaccord avec les CGU, aucun usage du site ne saurait être effectué par l’utilisateur.</p>
            </div>

            <div id="acces-navigation">
                <h2>6 – Accès et navigation</h2>

                <p>
                    L’éditeur met en œuvre les solutions techniques à sa disposition pour permettre l’accès au site 24 heures sur 24, 7 jours sur 7. Il pourra néanmoins à tout moment suspendre,
                    limiter ou interrompre l’accès au site ou à certaines pages de celui-ci afin de procéder à des mises à jours, des modifications de son contenu ou tout autre action jugée
                    nécessaire au bon fonctionnement du site.
                </p>

                <p>
                    La connexion et la navigation sur le site {datas?.denomination} valent acceptation sans réserve des présentes Conditions Générales d’Utilisation,
                    quelques soient les moyens techniques d’accès et les terminaux utilisés.
                </p>

                <p>Les présentes CGU s’appliquent, en tant que de besoin, à toute déclinaison ou extension du site sur les réseaux sociaux et/ou communautaires existants ou à venir.</p>
            </div>

            <div id="gestion-site">
                <h2>7 – Gestion du site</h2>

                <p>Pour la bonne gestion du site, l’éditeur pourra à tout moment :</p>

                <ul>
                    <li>Suspendre, interrompre ou limiter l’accès à tout ou partie du site, réserver l’accès au site, ou à certaines parties du site, à une catégorie déterminée d’internaute ;</li>
                    <li>Supprimer toute information pouvant en perturber le fonctionnement ou entrant en contravention avec les lois nationales ou internationales, ou avec les règles de la Nétiquette ;</li>
                    <li>Suspendre le site afin de procéder à des mises à jour.</li>
                </ul>
            </div>

            <div id="responsabilites">
                <h2>8 – Responsabilités</h2>

                <p>L’éditeur n’est responsable que du contenu qu’il a lui-même édité.</p>

                <p>L’éditeur n’est pas responsable :</p>

                <ul>
                    <li>En cas de problématiques ou défaillances techniques, informatiques ou de compatibilité du site avec un matériel ou logiciel quel qu’il soit ;</li>
                    <li>
                        Des dommages directs ou indirects, matériels ou immatériels, prévisibles ou imprévisibles résultant de l’utilisation ou des difficultés
                        d’utilisation du site ou de ses services ;
                    </li>
                    <li>Des caractéristiques intrinsèques de l’Internet, notamment celles relatives au manque de fiabilité et au défaut de sécurisation des informations y circulant ;</li>
                    <li>
                        Des contenus ou activités illicites utilisant son site et ce, sans qu’il en ait pris dûment connaissance au sens de la Loi n°204-575 du 21 juin 2004
                        pour la confiance dans l’économique numérique et la loi n°2004-801 du 6 août 2004 relative à la protection des personnes physiques à l’égard de
                        traitement de données à caractère personnel.
                    </li>
                </ul>

                <p>Par ailleurs, le site ne saurait garantir l’exactitude, la complétude, et l’actualité des informations qui y sont diffusées.</p>

                <p>L’utilisateur est responsable :</p>

                <ul>
                    <li>De la protection de son matériel et de ses données ;</li>
                    <li>De l’utilisation qu’il fait du site ou de ses services ;</li>
                    <li>S’il ne respecte ni la lettre, ni l’esprit des présentes CGU.</li>
                </ul>
            </div>

            <div id="liens-hypertextes">
                <h2>9 – Liens hypertextes</h2>

                <p>
                    Le site peut contenir des liens hypertextes pointant vers d’autres sites internet sur lesquels {datas?.denomination} n’exerce pas de contrôle.
                    Malgré les vérifications préalables et régulières réalisés par l’éditeur, celui-ci décline toute responsabilité quant aux contenus qu’il est possible de trouver sur ces sites.
                </p>

                <p>
                    L’éditeur autorise la mise en place de liens hypertextes vers toute page ou document de son site sous réserve que la mise en place de ces liens
                    ne soit pas réalisée à des fins commerciales ou publicitaires.
                </p>

                <p>En outre, l’information préalable de l’éditeur du site est nécessaire avant toute mise en place de lien hypertexte.</p>

                <p>
                    Sont exclus de cette autorisation les sites diffusant des informations à caractère illicite, violent, polémique, pornographique,
                    xénophobe ou pouvant porter atteinte à la sensibilité du plus grand nombre.
                </p>

                <p>
                    Enfin, {datas?.denomination} se réserve le droit de faire supprimer à tout moment un lien hypertexte pointant vers son site, si le site l’estime non conforme
                    à sa politique éditoriale.
                </p>
            </div>

            <div id="confidentialite">
                <h2>10 – Confidentialité</h2>

                <p>
                    En plus des présentes Conditions Générales, le site dispose d’une politique de confidentialité qui décrit la manière dont les données à caractère personnel sont traitées
                    lorsque l’utilisateur se rend sur le site, ainsi que la manière dont les cookies sont utilisés.
                </p>

                <p>En naviguant sur le site, l’utilisateur déclare avoir également pris connaissance de la politique de confidentialité susmentionnée.</p>
            </div>

            <div id="propriete-intellectuelle">
                <h2>11 – Propriété intellectuelle</h2>

                <p>
                    La structuration du site mais aussi les textes, graphiques, images, photographies, sons, vidéos et applications informatiques qui le composent sont la propriété
                    de l’éditeur et sont protégés comme tels par les lois en vigueur au titre de la propriété intellectuelle.
                </p>

                <p>
                    Toute représentation, reproduction, adaptation ou exploitation partielle ou totale des contenus, marques déposées et services proposés par le site,
                    par quelque procédé que ce soit, sans l’autorisation préalable, expresse et écrite de l’éditeur, est strictement interdite et serait susceptible de
                    constituer une contrefaçon au sens des articles L. 335-2 et suivants du Code de la propriété intellectuelle. Et ce, à l’exception des éléments expressément
                    désignés comme libres de droits sur le site.
                </p>

                <p>
                    L’accès au site ne vaut pas reconnaissance d’un droit et, de manière générale, ne confère aucun droit de propriété intellectuelle relatif à un élément du site,
                    lesquels restent la propriété exclusive de l’éditeur.
                </p>

                <p>Il est interdit à l’utilisateur d’introduire des données sur le site qui modifieraient ou qui seraient susceptibles d’en modifier le contenu ou l’apparence.</p>

                <p>© {new Date().getFullYear()} {datas?.denomination} ® · Tous droits réservés.</p>
            </div>
        </div>
    )
}