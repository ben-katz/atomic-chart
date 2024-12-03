import * as cheerio from 'cheerio';

export default async function getWikipediaApplications(title: string): Promise<string | null> {
    try {
        // Format the title for Wikipedia API (replace spaces with underscores)
        const formattedTitle = title.split('/').pop() || title;
        
        // Use the Wikipedia REST API to get the parsed content
        const response = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/html/${encodeURIComponent(formattedTitle)}`,
            {
                headers: {
                    'Accept': 'text/html'
                }
            }
        );

        if (!response.ok) {
            return null;
        }

        const html = await response.text();
        
        // Use cheerio to parse the HTML
        const $ = cheerio.load(html);
        
        // Find the Applications section with prioritized titles
        const sectionTitles = ['applications', 'other applications', 'uses'];
        let applicationsSection = $('null');
        
        // Try each title in order of priority
        for (const title of sectionTitles) {
            const section = $('h2, h3').filter((_, element) => {
                const text = $(element).text().toLowerCase();
    
                
                // Skip if it contains any exclusion words
                if (text.includes('early') || text.includes('historical')) {
        
                    return false;
                }
                
                // For 'applications', require exact match or 'applications of'
                if (title === 'applications') {
                    return text === 'applications' || text === 'applications of' || text.startsWith('applications of');
                }
                
                // For other titles, use includes
                return text.includes(title);
            }).first();
            
            if (section.length > 0) {
                applicationsSection = section;
    
                break;
            }
        }
        
        if (applicationsSection.length === 0) {

            return null;
        }

        // Get the section containing all applications
        const applicationsContainer = applicationsSection.parent();
        
        // First try to find a direct paragraph under Applications
        let mainParagraphElement = applicationsContainer.find('p').first();

        if (mainParagraphElement.length > 0) {
            // Use the main paragraph if it exists
            mainParagraphElement.find('sup').remove();
            const mainParagraph = mainParagraphElement.text().trim();

            return mainParagraph;
        }

        // Get all paragraphs before the first subsection
        let introText = '';
        let currentElement = applicationsContainer.children().first();
        
        while (currentElement.length && !currentElement.is('h3, h4')) {
            if (currentElement.is('p')) {
                currentElement.find('sup').remove();
                introText += ' ' + currentElement.text().trim();
            }
            currentElement = currentElement.next();
        }

        if (introText.trim()) {

            return introText.trim();
        }

        // Only reach this code if no main paragraph or intro text was found
        const firstSubHeading = applicationsContainer.find('h3, h4').first().text().trim();
        const firstParagraphElement = applicationsContainer.find('section').first().find('p').first();
        firstParagraphElement.find('sup').remove();
        const firstParagraph = firstParagraphElement.text().trim();

        
        if (!firstParagraph) {

            return null;
        }

        const applicationText = `${firstSubHeading}: ${firstParagraph}`;
        
        return applicationText;
    } catch (error) {
        console.error('16. Error fetching Wikipedia data:', error);
        return null;
    }
}