import expJSON from '../../data/min/experience.json' with { type: 'json' }
import skillsJSON from '../../data/min/skills.json' with { type: 'json' }
import projectsJSON from '../../data/min/projects.json' with { type: 'json' }

function injectRichSchema() {
  try {
    const experiences = expJSON ? expJSON : []
    const skills = skillsJSON ? skillsJSON.items : ["Web Development", "JavaScript", "Vue.js", "Nuxt.js"] // default fallback
    const projects = projectsJSON ? projectsJSON : []

    // 2. Map experiences to Occupation structures
    const occupationGraph = experiences.items.map(exp => {
      const isFreelance = exp.role.toLowerCase().includes('freelance')
      return {
        "@type": "Occupation",
        "name": exp.role,
        "description": `${exp.description} (${exp.date} at ${exp.company})`,
        "estimatedSalary": [],
        "hasEmploymentType": isFreelance ? "Freelance" : "FULL_TIME"
      }
    })

    // 3. Map projects to CreativeWork structures
    const projectGraph = projects.items.map(proj => {
      return {
        "@type": "CreativeWork",
        "name": proj.title || proj.name,
        "url": proj.url || proj.githubLink,
        "description": proj.description || "Portfolio project built by Goran Radmanovic",
        "genre": "Software Development"
      }
    })

    // 4. Construct the master graph object
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://goranradmanovic.github.io",
          "name": "Goran Radmanovic - Web Developer",
          "url": "https://goranradmanovic.github.io",
          "datePublished": "2024-12-26T12:00:00+00:00",
          "dateModified": "2026-05-26T12:00:00+00:00",
          "publisher": {
            "@type": "Organization",
            "@id": "https://github.io#organization",
            "name": "Goran Radmanovic Freelance Web Developer",
            "legalName": "Goran Radmanovic",
            "url": "https://github.com/goranradmanovic",
            "logo": "https://goranradmanovic.github.io/assets/images/icons/addition/logo.svg",
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "email": "goranradmanovic@gmail.com",
                "contactType": "professional"
              }
            ]
          }
        },
        {
          "@type": "ProfilePage",
          "@id": "https://goranradmanovic.github.io#profile",
          "url": "https://goranradmanovic.github.io",
          "mainEntity": {
            "@id": "https://github.io#person"
          }
        },
        {
          "@type": "Person",
          "@id": "https://github.io#person",
          "name": "Goran Radmanovic",
          "jobTitle": "Senior Web Developer",
          "email": "goranradmanovic@gmail.com",
          "image": "https://goranradmanovic.github.io/assets/images/profile/goran.avif",
          "url": "https://github.com/goranradmanovic",
          "sameAs": [
            "https://github.com/goranradmanovic/",
            "https://www.linkedin.com/in/goran-radmanovic-70814a9b/"
          ],
          "knowsAbout": skills,
          "hasOccupation": occupationGraph,
          "workExample": projectGraph
        }
      ]
    }

    // 5. Create and append script tag
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schemaData, null, 2)
    document.head.appendChild(script)

  } catch (error) {
    console.error('Error generating schema markup:', error)
  }
}
  
export default injectRichSchema