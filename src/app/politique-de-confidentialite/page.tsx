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
        title: 'Politique de confidentialité',
    };
};

export default async function PolitiqueDeConfidentialite({ params, searchParams }: Props) {
    const datas = {
        denomination: 'Le Jardin des Agrumes',
        domain_name: 'www.lejardindesagrumes.fr',
        raison_social: 'SAS LE JARDIN DES AGRUMES',
        ville_RCS: 'Tierce',
        adresse_siege: 'Chemin des Landes 49125 TIERCE',
        SIRET: '235601452658',
        phone: '03 84 48 22 55',
        publisher: 'John Doe',
        adresse_contact: 'service-client@lejardindesagrumes.fr',
    }

    return (
        <div className='container-xl mentions py-8'>
            <Breadcrumb />
            <div className='flex flex-col relative text-center w-full mx-auto py-6 px-4 rounded-xl bordered bg-slate-100 mb-10'>
                <h1 className='pt-6 mb-5'>Politique de confidentialité</h1>
                <p className='text-xl !text-center'>{datas.denomination} s'engage pour le bien-être de vos données personnelles</p>
            </div>
            <p>
                Soucieux de protéger au mieux vos données personnelles, {datas.denomination} vous informe par la présente politique de confidentialité
                (Ci-après la « Politique de confidentialité ») de la manière dont vos données personnelles sont collectées et traitées.
            </p>
            <p>
                Notre Politique de confidentialité s’adresse à chacun de vous que vous soyez clients ou non, adhérents ou non de notre programme de fidélité ainsi
                qu’aux visiteurs de notre site internet {datas.domain_name} (Ci-après le « Site »). Elle vient également compléter les conditions générales de vente
                du Site et s’applique à toutes les données à caractère personnel et de navigation collectées et traitées à l’occasion de votre visite sur notre Site.
            </p>
            <p>
                L’ensemble des informations que vous avez pu communiquer à {datas.denomination} est strictement confidentiel et a été mis en œuvre conformément aux dispositions
                législatives en vigueur en France notamment le Règlement Afin de veiller à la bonne application de ces règles, {datas.denomination} a par ailleurs désigné
                un Délégué à la protection des données (DPD) qui est le relai privilégié de la Commission Nationale de l’Informatique et des Libertés (CNIL).
            </p>
            <p>
                En nous communiquant vos données à caractère personnel, vous déclarez accepter sans réserve les termes de la Politique de confidentialité ; {datas.denomination} étant
                susceptible d’y apporter des modifications. Dans ce cas, une nouvelle version mise à jour sera disponible en magasin et publiée sur le site {datas.domain_name}.
                Toute modification prendra effet immédiatement. Vous êtes donc vivement invités à en prendre connaissance régulièrement.
            </p>

            <div id="donnees-collectees">
                <h2>1 – Quelles sont les données que nous collectons auprès de vous ?</h2>

                <p>
                    Lors de vos visites sur notre Site et/ou lors de votre inscription à notre programme de fidélité y compris en magasins, nous collectons des informations
                    vous concernant de manière volontaire. Ces informations sont soient transmises directement par vous au moment de la création de votre compte client sur
                    le site internet ou lors de votre inscription au programme de fidélité (civilité, nom, prénom, adresse email, numéro de votre carte de fidélité) et/ou
                    lors du passage de votre commande (adresse postale, adresse de facturation si différente).
                </p>
                <p>
                    Vous êtes également invités à nous communiquer d’autres informations nous permettant de mieux vous connaître telles que le nom de votre animal ou encore
                    le type de logement que vous habitez. Les informations sont obligatoires ou facultatives tel qu’indiqué dans le formulaire de collecte. L’ensemble des
                    informations obligatoires étant identifié par un astérisque.
                </p>
            </div>

            <div id="donnees-collectees-automatiquement">
                <h2>2 – Quelles sont les données collectées automatiquement ?</h2>

                <p>
                    Lors de votre navigation sur notre Site, certaines données sont automatiquement collectées par {datas.denomination} comme le type de terminal utilisé, l’adresse IP
                    de celui-ci, l’identification de connexion, l’adresse URL de vos connexions ainsi que son contenu. L’ensemble de ces éléments ne nous permet pas en revanche
                    de vous identifier personnellement mais peuvent nous servir dans le cadre notamment de votre commande sur le Site, pour permettre de vous géolocaliser
                    afin de trouver le magasin le plus proche de vous ou encore d’analyses statistiques anonymisées de l’utilisation de notre site (mesure du taux de conversion
                    ou du taux de rebond). Le but étant d’améliorer votre expérience de navigation sur le Site.
                </p>
            </div>

            <div id="donnees-personnelles">
                <h2>3 – A quoi servent vos données personnelles / A quelles fins sont-elles collectées ?</h2>

                <p>
                    Les données personnelles que vous nous communiquez sont principalement utilisées à des fins :
                </p>
                <ul>
                    <li>de gestion des comptes clients (création, modification, rattachement d’un client à un magasin, réponses aux questions des clients)</li>
                    <li>d’exécution, de livraison et de suivi des commandes</li>
                    <li>d’émission des factures et de la gestion des impayés</li>
                    <li>gestion de la relation client incluant les réclamations, les retours produits, le service après-vente</li>
                    <li>l’adhésion au programme de fidélité</li>
                    <li>la prospection commerciale notamment par le biais d’envoi de newsletters, de SMS sous réserve de votre accord préalable</li>
                    <li>la réalisation d’enquêtes de satisfaction postérieurement à un achat en magasin ou sur notre site ou encore après un échange avec notre service client</li>
                    <li>la réalisation d’études statistiques et d’études de marché</li>
                    <li>la prévention et la lutte contre la fraude lors du paiement de la commande</li>
                </ul>
            </div>

            <div id="conservation-donnees-personnelles">
                <h2>4 – Combien de temps sont-elles conservées ?</h2>

                <p>
                    Vos données à caractère personnel sont conservées pendant une durée n’excédant pas la durée nécessaire aux finalités pour lesquelles elles ont été collectées.
                    Elles peuvent être toutefois utilisées ultérieurement à des fins statistiques : dans ce cas, elles seront anonymisées c’est-à-dire que les informations conservées
                    ne permettront pas de vous identifier. Par exemple, nous pouvons uniquement conserver le nombre d’achats réalisés dans l’année ou encore le nombre de fois où
                    vous avez visité notre site internet. Elles pourront également être conservées dans nos archives et ce pour la durée nécessaire à satisfaire à nos obligations
                    légales, comptables et fiscales et notamment afin de prévenir d’éventuels comportements illicites après la suppression de votre compte
                </p>
            </div>

            <div id="transfert-donnees-personnelles">
                <h2>5 – A qui peuvent-être transférés vos données personnelles ?</h2>

                <p>
                    Vos données personnelles sont communiquées aux entités juridiques du groupe InVivo dont les systèmes informatiques sont localisés au sein de l’Union Européenne.
                    Elles peuvent également être transmises à nos prestataires, sous-traitants et fournisseurs pour les besoins de la réalisation de certaines prestations comme
                    notamment l’envoi de vos commandes, la mise en œuvre du service après-vente ou la réalisation d’enquêtes de satisfaction. Vos données sont susceptibles d’être
                    transmises à des prestataires situés en dehors de l’Union Européenne. En tout état de cause, {datas.denomination} s’assure que chacun de ses prestataires assure un niveau
                    de sécurité adéquate et conforme aux réglementations françaises et européennes en vigueur.
                </p>
                <p>
                    Enfin, {datas.denomination} peut être amenés à transférer vos données personnelles aux autorités publiques françaises ou étrangères habilitées notamment
                    afin de répondre à une injonction.
                </p>
            </div>

            <div id="acces-donnees-personnelles">
                <h2>6 – Comment pouvez-vous y accéder, vous y opposer, y renoncer ?</h2>

                <p>
                    Vous être maîtres de vos données à caractère personnel et disposez donc de multiples droits dans leurs gestions.
                    Vous pouvez donc nous solliciter pour :
                </p>

                <h3>Droit d’accès</h3>
                <p>
                    Nous demander d’obtenir confirmation que nous traitons des données à caractère personnel vous appartenant et nous demander une copie de celles-ci.
                </p>

                <h3>Droit de rectification</h3>
                <p>
                    Nous demander de rectifier, modifier vos données à caractère personnel qui ne seraient plus à jour ou inexactes.
                </p>

                <h3>Droit à l’effacement</h3>
                <p>
                    Nous demander de supprimer vos données personnelles de nos bases de données.
                </p>

                <h3>Droit d’opposition</h3>
                <p>
                    Retirer à tout moment votre consentement afin de ne plus recevoir de communications de notre part.
                </p>

                <h3>Droit à la portabilité</h3>
                <p>
                    Vous pouvez nous demander de vous communiquer, dans un format structuré et lisible par machine, vos données personnelles ou demander à un autre responsable
                    du traitement de nous communiquer vos données.
                </p>

                <h3>Droit de définir des directives relatives au sort de ses données après son décès</h3>
                <p>
                    Vous pouvez définir, de votre vivant, des directives relatives à la conservation, à l’effacement et à la communication de vos données personnelles après votre décès.
                    Ces directives peuvent être modifiées ou révoquées à tout moment. Si vous n’aviez pas procédé à la communication de ces directives, sachez que vos données seront
                    supprimées dans les délais légaux. Vos héritiers pourront par ailleurs exercer les droits sur vos données et notamment en demander la suppression.
                </p>
                <p>
                    Pour vous permettre d’exercer vos droits ci-dessus, nous vous invitons à formuler votre demande directement auprès de notre Service Client en lui indiquant
                    vos nom-prénom, adresse e-mail et postale, votre numéro de fidélité le cas échéant afin de permettre le traitement de votre demande.
                </p>
                <p>
                    Vous pouvez faire votre demande :
                </p>
                <ul>
                    <li>soit sur le site {datas.domain_name} rubrique « Contact »</li>
                    <li>soit par voie postale à l’adresse suivante : {datas.raison_social} – {datas.adresse_siege} </li>
                    <li>soit par e-mail à l’adresse suivante : {datas.adresse_contact}</li>
                </ul>
                <p>
                    En cas de demande de suppression de vos données, nous pouvons être amenés d’une part à vous demander un justificatif tel qu’une copie de votre pièce d’identité
                    et ceux afin de limiter les risques de fraude et d’autre part à conserver dans nos archives et ce pour la durée nécessaire à satisfaire à nos obligations légales,
                    comptables et fiscales et notamment afin de prévenir d’éventuels comportements illicites après la suppression de votre compte.
                </p>
                <p>
                    Vous pouvez également gérer vous-mêmes vos différents abonnements comme suit :
                </p>
                <p>
                    Pour ne plus recevoir de newsletters nous vous invitons :
                </p>
                <ul>
                    <li>Cliquer sur le lien de désabonnement se trouvant en bas de chaque newsletter</li>
                </ul>
            </div>

            <div id="recours">
                <h2>7 – Vos recours</h2>

                <p>
                    Si vous constatiez un non-respect ou une violation de vos données personnelles, sans préjudice de tout autre recours administratif ou juridictionnel,
                    vous pouvez introduire une réclamation auprès de l’autorité de contrôle de l’Etat membre dans lequel vous résidez à titre principal, de votre lieu de travail
                    ou là où le non-respect, la violation de vos données personnelles a été commis. Nous vous invitons à consulter le site de Commission Nationale de l’Informatique
                    et des Libertés pour obtenir des informations supplémentaires sur vos droits à recours et la procédure requise.
                </p>
            </div>

            <div id="securite-donnees-personnelles">
                <h2>8 – Sécurité de vos données personnelles</h2>

                <p>
                    {datas.denomination} met tout en œuvre via notamment des mesures de sécurité techniques et organisationnelles pour sécuriser vos données à caractère personnel.
                </p>
            </div>

            <div id="securite-navigation">
                <h2>9 – Sécurité de navigation sur le site {datas.domain_name}</h2>

                <p>
                    Soyez assurer que {datas.denomination} met tout en œuvre pour vous assurer une navigation sécurisée en mettant notamment en place des mesures de contrôle et de sécurité.
                    Toutefois, la sécurité et la confidentialité des données personnelles reposent sur les bonnes pratiques de chacun. Ainsi, nous vous invitons à ne pas communiquer
                    à des tiers vos mots de passe et de manière générale de ne communiquer aucune information susceptible de vous identifier. Déconnectez systématiquement votre compte
                    client et votre compte social en cas de compte lié et fermez les fenêtres de votre navigateur notamment si vous utilisez un terminal partagé avec d’autres personnes.
                    Si vous étiez amenés à le faire et/ou ne pas suivre les recommandations ci-dessus, notre responsabilité ne serait être engagée.
                </p>
                <p>
                    Lorsque vous utilisez nos espaces communautaires (espace d’entraide clients, réseaux sociaux …) soyez prudents et faites preuve de discernement.
                </p>
                <p>
                    Pour toute information sur la protection de vos données personnelles lors de la navigation sur ces sites internet, nous vous invitons à consulter
                    les politiques de confidentialité de chacun d’eux.
                </p>
            </div>

            <div id="securisation-moyens-paiment">
                <h2>10 – Sécurisation de vos moyens de paiement</h2>

                <p>
                    Pour la sécurité des transactions, {datas.denomination} via son prestataire de service Dalenys situé 110 avenue de France, 75013 Paris - France, vous propose un système
                    de paiement en ligne sécurisé. Lors du paiement de vos commandes, vos coordonnées bancaires sont chiffrées et transmises sous forme inintelligibles conformément
                    au système HTTPS. De même, afin de renforcer la sécurité de vos paiements et lutter contre la fraude, {datas.denomination} a opté pour le système 3D Secure.
                </p>
                <p>
                    Enfin, notre Site vous offre la possibilité de conserver les coordonnées de votre carte bancaire afin de faciliter vos prochains achats : si vous choisissez
                    cette option, vos informations sont enregistrées et sécurisées conformément au système PCI DSS de notre prestataire de service.
                </p>
            </div>

            <h2>11 – A quoi servent les cookies ?</h2>

            <div id="cookie-description">
                <h2>Qu'est-ce qu'un cookie ?</h2>

                <p>
                    Un cookie est un petit fichier texte et recouvre tout type de traceurs « déposés et lus par exemple lors de la consultation
                    d'un site internet, de la lecture d'un courrier électronique, de l'installation ou de l'utilisation d'un logiciel ou d'une
                    application mobile et ce, quel que soit le type de terminal utilisé ». Il peut être déposé par le serveur du Site visité ou
                    par un serveur tiers (régie publicitaire, service de web analytique, etc.). Les cookies ne compromettent pas la sécurité du site.
                </p>
            </div>

            <div id="cookies">
                <h2>Les cookies déposés par {datas.denomination}</h2>

                <p>
                    Lorsque vous vous connectez sur notre Site, nous sommes susceptibles d’installer divers cookies sur votre terminal.<br />
                    Les cookies que nous émettons nous permettent :
                </p>

                <ul className='list-styled pl-7'>
                    <li>De maintenir le bon fonctionnement du Site</li>
                    <li>D’enregistrer et adapter les fonctionnalités du Site en fonction de vos préférences de navigation (identification, s’adapter aux types d’appareils utilisés)</li>
                    <li>De gérer l’acceptation et la durée de conservation des cookies</li>
                </ul>

                <p>Conformément à la réglementation, les cookies ont une durée de vie maximum de 13 mois.</p>
            </div>

            <div id="cookies-tiers">
                <h2>Les cookies émis par l’intermédiaire de tiers</h2>

                <ul>
                    <li><strong>Les cookies analytics :</strong></li>
                </ul>

                <p>
                    Ils nous permettent de suivre les audiences de notre Site et de connaître votre navigation sur notre Site (cookies Google Analytics) et
                    de générer des données statistiques quant aux utilisations du Site. Cela nous permet d’améliorer la performance du Site.
                </p>

                <ul>
                    <li><strong>Les cookies des réseaux sociaux :</strong></li>
                </ul>

                <p>
                    En naviguant sur notre Site, vous avez la possibilité de cliquer sur les boutons « réseaux sociaux » afin de consulter nos profils
                    Facebook, Twitter. Ces applications tierces sont susceptibles de déposer des cookies pour vous proposer de la publicité ciblée.
                    En cliquant sur l’icône correspondante au réseau social, ce dernier est susceptible de vous identifier. Si vous êtes connectés
                    au réseau social lors de votre navigation sur notre Site, les boutons de partage permettent de relier les contenus consultés
                    à votre compte utilisateur.
                </p>

                <p>
                    Nous ne pouvons contrôler le processus employé par les réseaux sociaux pour collecter les informations relatives à votre navigation
                    sur notre Site. Nous vous invitons donc à consulter leur politique de protection des données à caractère personnel afin de
                    connaître leur finalité d’utilisation ainsi que les informations de navigation qu’ils peuvent recueillir.
                </p>
            </div>

            <div id="gestion-cookies">
                <h2>La gestion des cookies</h2>

                <p>
                    Lorsque vous visitez notre Site pour la première fois, une bandeau cookies s’affiche vous proposant de consentir ou refuser
                    à la pose de ces cookies.
                </p>

                <p>
                    Vous pouvez à tout moment modifier votre choix en cliquant sur le lien Gestion des cookies en bas de chaque page ou en cliquant
                    directement sur le lien suivant : <a href='#footer'>« <strong>Gérer mes cookies</strong> »</a>.
                </p>
            </div>

            <div id="blocage-cookies">
                <h2>Blocage des Cookies</h2>

                <p>
                    Dans tous les cas, l’Internaute a le contrôle de ces cookies, puisqu’ils sont stockés sur son ordinateur, et a la possibilité
                    de les lire, de les filtrer, de les refuser et de les détruire.
                </p>

                <p><strong>Comment détruire les fichiers « cookies » déjà installés sur votre ordinateur ?</strong></p>

                <ul>
                    <li>Allez sur votre poste de travail</li>
                    <li>Sélectionnez dans C:\ le dossier Windows</li>
                    <li>Ouvrez le dossier « Temporary Internet Files »</li>
                    <li>Sélectionnez tous les fichiers (CTRL A)</li>
                    <li>Choisissez l’option « supprimer »</li>
                </ul>

                <p className='mt-4'><strong>Comment refuser ou être averti de l’installation de tous les fichiers « cookies » ?</strong></p>

                <p>Navigation avec Internet Explorer 5 :</p>

                <ul>
                    <li>Choisir « Outils »</li>
                    <li>« Options Internet »</li>
                    <li>« Sécurité »</li>
                    <li>« Personnaliser le niveau »</li>
                    <li>Dans le menu déroulant allez à « cookies »</li>
                    <li>Rubrique « autoriser les cookies sur votre ordinateur »</li>
                    <li>Choisir « demander » pour être avertis ou « désactiver » pour refuser tous les « cookies »</li>
                </ul>

                <p className='mt-4'>Navigation avec Internet Explorer 6, 7 ou 8 :</p>

                <ul>
                    <li>Choisir « Outils »</li>
                    <li>« Options Internet »</li>
                    <li>« Confidentialité »</li>
                    <li>Puis le niveau que vous souhaitez appliquer</li>
                </ul>

                <p className='mt-4'>Navigation avec Firefox :</p>

                <ul>
                    <li>Choisir « Outils »</li>
                    <li>« Options »</li>
                    <li>Dans « Vie privée » décocher « Accepter les cookies »</li>
                </ul>

                <p className='mt-4'>Navigation avec Google Chrome :</p>

                <ul>
                    <li>Cliquer sur « Personnaliser et contrôler Google Chrome »</li>
                    <li>Choisir « Paramètres »</li>
                    <li>Dans « Confidentialité » cliquer sur « Paramètres de contenu » et cocher « Bloquer les cookies et les données de site tiers »</li>
                </ul>
            </div>
        </div>
    )
}
<p>

</p>