import React from 'react';

const LegalContainer: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-gray-800 dark:text-gray-200">
        <h1 className="text-3xl font-bold mb-8 font-serif text-center">{title}</h1>
        <div className="space-y-6 text-justify leading-relaxed">
            {children}
        </div>
    </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section>
        <h2 className="text-xl font-semibold mb-3 mt-6 text-gray-900 dark:text-gray-100">{title}</h2>
        <div className="space-y-3">
            {children}
        </div>
    </section>
);

export const MentionsLegales: React.FC = () => {
    return (
        <LegalContainer title="MENTIONS LÉGALES">
            <Section title="1. Éditeur du site">
                <p>
                    Le site internet <strong>appianoo</strong> est édité par Monsieur Alan Paul, agissant en qualité d'entrepreneur individuel.
                </p>
                <p>
                    <strong>Siège social :</strong> Clermont-Ferrand, 63000.
                </p>
                <p>
                    <strong>Contact :</strong> ap.pianoo@outlook.fr
                </p>
                <p>
                    <strong>Numéro SIRET :</strong> [En cours d'immatriculation].
                </p>
                <p>
                    <strong>Directeur de la publication :</strong> Monsieur Alan Paul.
                </p>
            </Section>

            <Section title="2. Hébergement">
                <p>
                    Le Site est hébergé de manière sécurisée par les prestataires suivants, assurant le stockage des données et l'accessibilité technique :
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>
                        <strong>Hébergement Front-end :</strong> Netlify, Inc., 510 Townsend St, San Francisco, CA 94103, USA.
                    </li>
                    <li>
                        <strong>Hébergement Back-end & Base de données :</strong> Render, 525 Brannan St, Suite 300, San Francisco, CA 94107, USA.
                    </li>
                </ul>
            </Section>

            <Section title="3. Propriété Intellectuelle">
                <p>
                    L'intégralité du contenu présent sur le site appianoo, incluant, de façon non limitative, les graphismes, images, textes, vidéos, animations, sons, logos, gifs et icônes ainsi que leur mise en forme sont la propriété exclusive d'Alan Paul, à l'exception des marques, logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs.
                </p>
                <p>
                    Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces différents éléments est strictement interdite sans l'accord exprès par écrit d'Alan Paul. Cette représentation ou reproduction, par quelque procédé que ce soit, constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.
                </p>
            </Section>

            {/* <Section title="4. Médiation de la consommation">
                <p className="italic text-sm mb-2">(Section applicable uniquement lors de l'ouverture des ventes)</p>
                <p>
                    Conformément aux articles L.616-1 et R.616-1 du Code de la consommation, nous proposons un dispositif de médiation de la consommation. L'entité de médiation retenue est : [NOM DE L'ORGANISME MÉDIATEUR À SOUSCRIRE AU LANCEMENT].
                </p>
                <p>
                    En cas de litige, vous pouvez déposer votre réclamation sur son site : <a href="https://www.assas-universite.fr/fr/formations/offre-de-formation/diplome-duniversite-mediation" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.assas-universite.fr/fr/formations/offre-de-formation/diplome-duniversite-mediation</a> ou par voie postale en écrivant à : [ADRESSE DU MÉDIATEUR].
                </p>
            </Section> */}
        </LegalContainer>
    );
};

export const PolitiqueConfidentialite: React.FC = () => {
    return (
        <LegalContainer title="POLITIQUE DE CONFIDENTIALITÉ">
            <Section title="1. Préambule">
                <p>
                    Alan Paul s'engage à ce que la collecte et le traitement de vos données, effectués à partir du site appianoo, soient conformes au règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés.
                </p>
            </Section>

            <Section title="2. Données collectées">
                <p>
                    Dans le cadre de l'utilisation du Site et de la vente de partitions, nous pouvons être amenés à collecter les catégories de données suivantes :
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Données d'identité (Nom, Prénom) ;</li>
                    <li>Données de contact (Adresse email) ;</li>
                    <li>Données de connexion (Adresse IP, logs techniques, type de navigateur).</li>
                </ul>
                <p className="mt-2">
                    Aucune donnée bancaire ne transite en clair sur le serveur du Site ; elles sont gérées exclusivement par le prestataire de paiement certifié PCI-DSS (ex: Stripe/PayPal).
                </p>
            </Section>

            <Section title="3. Finalités et Base Légale du traitement">
                <p>Les données sont traitées pour les besoins suivants :</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li><strong>Exécution du contrat :</strong> Gestion des commandes, envoi des liens de téléchargement, facturation.</li>
                    <li><strong>Intérêt légitime :</strong> Amélioration de l'expérience utilisateur, sécurité du site, prévention de la fraude.</li>
                    <li><strong>Consentement :</strong> Réponse aux demandes de contact.</li>
                </ul>
            </Section>

            <Section title="4. Transfert de données hors Union Européenne">
                <p>
                    Certaines de vos données techniques ou fichiers peuvent être traités sur des serveurs situés aux États-Unis via nos prestataires d'hébergement (Netlify, Render). Ces transferts sont encadrés par des mécanismes de protection reconnus : adhésion au cadre de protection des données (Data Privacy Framework) ou utilisation des Clauses Contractuelles Types (CCT) de la Commission Européenne, garantissant un niveau de protection adéquat.
                </p>
            </Section>

            <Section title="5. Durée de conservation">
                <p>Vos données personnelles sont conservées le temps nécessaire à l'accomplissement de l'objectif poursuivi.</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li><strong>Données clients :</strong> conservées pendant la relation commerciale et archivées 5 ans à des fins de preuve.</li>
                    <li><strong>Factures :</strong> conservées 10 ans (obligation légale comptable).</li>
                </ul>
            </Section>

            <Section title="6. Sécurité des données">
                <p>
                    Le site met en œuvre toutes les mesures techniques et organisationnelles pour assurer la sécurité de vos données personnelles (protocole HTTPS, cryptage TLS) contre l'altération, la perte ou l'accès non autorisé.
                </p>
            </Section>

            <Section title="7. Cookies et Stockage Local">
                <p>
                    <strong>Absence de traceurs publicitaires :</strong> Soucieux du respect de votre vie privée, le site appianoo n'utilise aucun cookie publicitaire, aucun traceur marketing (type Google Analytics ou Facebook Pixel) et ne revend aucune donnée à des tiers. Vous n'avez donc pas de bandeau de consentement à valider lors de votre arrivée sur le site.
                </p>
                <p className="mt-2">
                    <strong>Cookies techniques et LocalStorage :</strong> Pour le bon fonctionnement du site, notamment pour mémoriser le contenu de votre panier d'achat durant votre navigation, nous pouvons utiliser des technologies de stockage local (LocalStorage, SessionStorage ou cookies de session). Ces données sont strictement techniques, ne quittent pas votre navigateur et sont effacées automatiquement ou lorsque vous videz votre cache.
                </p>
            </Section>

            <Section title="8. Vos droits">
                <p>
                    Vous disposez d’un droit d’accès, de rectification, d'effacement de vos données ou d'une limitation du traitement. Vous pouvez exercer ces droits en nous contactant à : <a href="mailto:ap.pianoo@outlook.fr" className="text-blue-600 hover:underline">ap.pianoo@outlook.fr</a>.
                </p>
            </Section>
        </LegalContainer>
    );
};

export const CGU: React.FC = () => {
    return (
        <LegalContainer title="CONDITIONS GÉNÉRALES D'UTILISATION (CGU)">
            <Section title="Article 1 : Objet et Acceptation">
                <p>
                    Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les règles d'utilisation du site appianoo. L'accès au Site implique l'acceptation sans réserve des présentes CGU par l'utilisateur.
                </p>
            </Section>

            <Section title="Article 2 : Accès et Disponibilité">
                <p>
                    L'éditeur met en œuvre tous les moyens raisonnables à sa disposition pour assurer un accès de qualité au Site. Toutefois, l'éditeur n'est tenu à aucune obligation de résultat d'y parvenir. L'éditeur se réserve la possibilité d'interrompre, de suspendre momentanément ou de modifier sans préavis l'accès à tout ou partie du Site pour maintenance ou toute autre raison, sans indemnisation.
                </p>
            </Section>

            <Section title="Article 3 : Règles d'usage des Partitions et Contenus">
                <p>
                    Les partitions proposées (gratuites ou payantes) sont des œuvres de l'esprit protégées. L'utilisateur s'engage expressément à :
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Ne pas utiliser les partitions à des fins commerciales sans accord préalable.</li>
                    <li>Ne pas rediffuser les fichiers PDF sur des plateformes de partage, réseaux sociaux, ou sites tiers.</li>
                    <li>Respecter l'intégrité des œuvres.</li>
                </ul>
                <p className="mt-2">
                    <strong>Interdiction fouille de textes et de données (IA) :</strong> Conformément à l'article L. 122-5-3 du Code de la propriété intellectuelle, l'éditeur s'oppose expressément à toute utilisation du contenu du site (partitions, textes, images, audio) pour la fouille de textes et de données (Text and Data Mining) aux fins d'entraînement de systèmes d'intelligence artificielle, sans autorisation écrite préalable.
                </p>
            </Section>

            <Section title="Article 4 : Liens hypertextes">
                <p>
                    Le Site peut contenir des liens hypertextes vers d’autres sites. L'éditeur n'a pas de contrôle sur ces sites tiers et décline toute responsabilité quant à leur contenu ou leur politique de confidentialité.
                </p>
            </Section>

            <Section title="Article 5 : Responsabilité limitée">
                <p>
                    L'éditeur ne saurait être tenu responsable des dommages résultant d'une utilisation frauduleuse du Site ou d'une intrusion extérieure (piratage) entraînant une modification des données.
                </p>
            </Section>
        </LegalContainer>
    );
};

export const CGV: React.FC = () => {
    return (
        <LegalContainer title="CONDITIONS GÉNÉRALES DE VENTE (CGV)">
            <Section title="Article 1 : Champ d'application">
                <p>
                    Les présentes Conditions Générales de Vente (CGV) s'appliquent, sans restriction ni réserve, à tout achat de partitions musicales numériques (PDF) effectué sur le site appianoo édité par Alan Paul (SIRET : [NUMÉRO À VENIR]). Le client déclare avoir pris connaissance des présentes CGV et les avoir acceptées en cochant la case prévue à cet effet avant la validation de la commande.
                </p>
            </Section>

            <Section title="Article 2 : Caractéristiques des produits">
                <p>
                    Les produits sont des fichiers numériques (PDF). Le client est tenu de prendre connaissance du descriptif avant commande. Le choix et l'achat d'un produit sont de la seule responsabilité du client.
                </p>
            </Section>

            <Section title="Article 3 : Tarifs">
                <p>
                    Les produits sont fournis aux tarifs en vigueur figurant sur le site. Les prix sont exprimés en Euros (€). Alan Paul se réserve le droit de modifier ses tarifs à tout moment.
                </p>
            </Section>

            <Section title="Article 4 : Paiement et Commande">
                <p>
                    Le paiement est exigible immédiatement à la commande par carte bancaire via une plateforme sécurisée utilisant le protocole SSL. La commande est définitive une fois le paiement validé.
                </p>
            </Section>

            <Section title="Article 5 : Livraison">
                <p>
                    La livraison consiste en la mise à disposition d'un lien de téléchargement unique envoyé par email ou accessible sur la page de confirmation.
                </p>
            </Section>

            <Section title="Article 6 : Renoncement au droit de rétractation">
                <p>
                    Compte tenu de la nature numérique des produits (fichiers téléchargeables instantanément), et conformément à l'article L221-28 13° du Code de la Consommation, le droit de rétractation ne peut être exercé. En validant sa commande, le client :
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Donne son accord préalable exprès pour l'exécution du contrat avant la fin du délai de rétractation ;</li>
                    <li>Reconnaît qu'il perdra son droit de rétractation une fois le téléchargement rendu accessible.</li>
                </ul>
            </Section>

            <Section title="Article 7 : Garanties Légales de Conformité">
                <p>
                    Conformément aux articles L.224-25-12 et suivants du Code de la consommation relatifs aux contenus numériques, le vendeur garantit que le contenu fourni est conforme au contrat. En cas de défaut de conformité (fichier corrompu, illisible) existant lors de la fourniture, le client a droit à la mise en conformité du contenu numérique (renvoi du fichier) sans frais. À défaut, il pourra demander le remboursement. Le client peut exercer ces garanties en contactant : <a href="mailto:ap.pianoo@outlook.fr" className="text-blue-600 hover:underline">ap.pianoo@outlook.fr</a>.
                </p>
            </Section>

            <Section title="Article 8 : Maintenance et Responsabilité technique">
                <p>
                    L'éditeur attire l'attention sur les risques liés aux maintenances techniques. En cas de tentative d'achat durant une instabilité technique visible ou maintenance serveur affichée, appianoo décline toute responsabilité en cas d'échec de la génération du lien. Aucun remboursement automatique ne sera dû sans preuve de débit bancaire.
                </p>
            </Section>

            <Section title="Article 9 : Archivage et Preuve">
                <p>
                    L'éditeur assure l'archivage des bons de commandes et factures sur un support fiable et durable constituant une copie fidèle (art. 1379 du Code Civil). Les registres informatisés seront considérés comme preuve des communications et transactions.
                </p>
            </Section>

            <Section title="Article 10 : Droit applicable">
                <p>
                    Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera recherchée avant toute action judiciaire.
                </p>
            </Section>
        </LegalContainer>
    );
};
