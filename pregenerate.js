import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

// Chemins des dossiers
const graphqlDir = path.join(process.cwd(), 'graphql');
const contentDir = path.join(process.cwd(), 'content');

// Fonction pour lire tous les fichiers GraphQL et exécuter les requêtes
export default async function pregenerate() {
    // Lire tous les fichiers dans le dossier /graphql/
    const files = fs.readdirSync(graphqlDir);

    // Parcourir chaque fichier GraphQL
    for (const file of files) {
        if (path.extname(file) === '.graphql') {
            const filePath = path.join(graphqlDir, file);
            const query = fs.readFileSync(filePath, 'utf-8');
            const response = await fetchGraphQL(query);

            // Nom du fichier de sortie en JSON
            const outputFilename = file.replace('.graphql', '.json');
            const outputPath = path.join(contentDir, outputFilename);

            // Sauvegarder la réponse en JSON
            fs.writeFileSync(outputPath, JSON.stringify(response, null, 2));
            console.log(`Saved ${outputFilename}`);
        }
    }
}

// Fonction pour envoyer la requête GraphQL
async function fetchGraphQL(query) {
    const response = await fetch('https://wp.leodesigaux.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Ajoutez ici vos headers supplémentaires si besoin, par exemple le token d'authentification
        },
        body: JSON.stringify({ query }),
    });

    const json = await response.json();
    if (json.errors) {
        console.error('Errors:', json.errors);
        throw new Error('Failed to fetch GraphQL data');
    }

    return json.data;
}

// Exécution du script
pregenerate().catch(err => {
    console.error('Error during pregenerate:', err);
    process.exit(1);
});