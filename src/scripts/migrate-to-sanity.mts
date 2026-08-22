import fs from "node:fs";

const awards = [
  {
    prize: "1st Prize",
    title: "Can Tho City Young Informatics Contest 2014",
    date: "2014-05",
    grade: "Grade 8",
    description:
      "- Field: Creative Software\n- Project: Website Hành Trình Khám Phá Miền Tây",
    referenceLink:
      "https://drive.google.com/file/d/16bia3XoeVbSlfvg4FzVapQf3LVI8wUA-/view?usp=sharing",
  },
  {
    prize: "Consolation Prize",
    title: "National Young Informatics Contest 2014",
    date: "2014-09",
    grade: "Grade 8",
    description:
      "- Organized in Hanoi\n- Field: Creative Software\n- Project: Website Hành Trình Khám Phá Miền Tây",
    referenceLink:
      "https://drive.google.com/file/d/16OOVuKBxFAnROU-pmhkDFkbljkmeO-kc/view?usp=sharing",
  },
  {
    prize: "3rd Prize",
    title: "Can Tho City Young Informatics Contest 2015",
    date: "2015-05",
    grade: "Grade 9",
    description:
      "- Field: Creative Software\n- Project: VietnamStudy Learning Application",
    referenceLink:
      "https://drive.google.com/file/d/16MmjvxdJpAiLc2sC7kU8aT76mDhIETFx/view?usp=sharing",
  },
  {
    prize: "3rd Prize",
    title: "Can Tho City Young Informatics Contest 2015",
    date: "2015-05",
    grade: "Grade 9",
    description:
      "- Field: Informatics Knowledge and Skills\n- Programming Language: Pascal",
    referenceLink:
      "https://drive.google.com/file/d/1lCikjG4LHAN2Y1n12Zn_3Xw2hTTiwY8z/view?usp=sharing",
  },
  {
    prize: "Consolation Prize",
    title: "National Young Informatics Contest 2015",
    date: "2015-08",
    grade: "Grade 9",
    description:
      "- Organized in Binh Duong\n- Field: Informatics Knowledge and Skills\n- Programming Language: Pascal",
    referenceLink:
      "https://drive.google.com/file/d/1FfV9ju5612DE272nQdlgjzJ67zbVknQ6/view?usp=sharing",
  },
  {
    prize: "Outstanding Student",
    title: "Most Outstanding Student of the District",
    date: "2015-09",
    grade: "Grade 9",
    description:
      "Recognized by the District for exceptional academic and personal achievements as the Outstanding Student of the locality.",
    referenceLink:
      "https://drive.google.com/file/d/1htqmjP6Cssd6RNKCQlvEP-_sDge3e_6V/view?usp=sharing",
  },
  {
    prize: "2nd Prize",
    title: "Can Tho City Youth and Children's Creativity Contest 2015",
    date: "2015-12",
    grade: "Grade 9",
    description:
      "- Field: Software\n- Project: VietnamStudy Learning Application",
    referenceLink:
      "https://drive.google.com/file/d/1_NVmghi0LLc6mBHepefNoDznIVHM4ibC/view?usp=sharing",
  },
  {
    prize: "3rd Prize",
    title: "Can Tho City Science and Engineering Fair 2015",
    date: "2015-12",
    grade: "Grade 9",
    description:
      "- Field: Computer Science\n- Project: Distance Calculation System for Provinces, Cities, and Districts in the Mekong Delta",
    referenceLink:
      "https://drive.google.com/file/d/16Xc2ZR_A7a5XmP1hcqZC4ZpVLPNvXch6/view?usp=sharing",
  },
  {
    prize: "Consolation Prize",
    title: "Can Tho City Young Informatics Contest 2016",
    date: "2016-05",
    grade: "Grade 10",
    description: "- Field: Creative Software\n- Project: Study English",
    referenceLink:
      "https://drive.google.com/file/d/1EHpJU787IWduq6eeJT-0EiCMNmev1rbY/view?usp=sharing",
  },
  {
    prize: "1st Prize",
    title: "Can Tho City Youth and Children's Creativity Contest 2016",
    date: "2016-07",
    grade: "Grade 10",
    description: "- Field: Software\n- Project: Study English",
    referenceLink:
      "https://drive.google.com/file/d/1M4HJNeugtrUji3F8M8qAxOeWiTNNT9MX/view?usp=sharing",
  },
  {
    prize: "3rd Prize",
    title: "National Young Informatics Contest 2016",
    date: "2016-08",
    grade: "Grade 10",
    description:
      "- Organized in Quang Binh\n- Field: Hardware Programming\n- Project: IoT Technology Application for Smart Home Control",
    referenceLink:
      "https://drive.google.com/file/d/1kf3AR8StAEb3he67pTD1QE53b9_nzklS/view?usp=sharing",
  },
  {
    prize: "Consolation Prize",
    title: "National Youth and Children's Creativity Contest 2016",
    date: "2016-10",
    grade: "Grade 10",
    description:
      "- Organized in Hanoi\n- Field: Software\n- Project: Study English",
    referenceLink:
      "https://drive.google.com/file/d/1FZXB2CeW0rrZmKnL4bHJjzXt0r_WeU2q/view?usp=sharing",
  },
  {
    prize: "2nd Prize",
    title: "Can Tho City Outstanding Student Selection Exam 2016-2017",
    date: "2017-02",
    grade: "Grade 11",
    description:
      "- Subject: Informatics (Programming)\n- Programming Language: C++",
    referenceLink:
      "https://drive.google.com/file/d/1LxIL0H-Tj7A6AVpAetf4BzdhkvJl00vg/view?usp=sharing",
  },
  {
    prize: "Consolation Prize",
    title: "Can Tho City Young Informatics Contest 2017",
    date: "2017-05",
    grade: "Grade 11",
    description:
      "- Field: Creative Software\n- Project: Formula - Social network for sharing solutions and problem-solving methods",
    referenceLink:
      "https://drive.google.com/file/d/10CytCmLT6EWtCYEbivcK-9cB70SdznMD/view?usp=sharing",
  },
  {
    prize: "3rd Prize",
    title: "Can Tho City Young Informatics Contest 2017",
    date: "2017-05",
    grade: "Grade 11",
    description:
      "- Field: Informatics Knowledge and Skills\n- Programming Language: C++",
    referenceLink:
      "https://drive.google.com/file/d/1wkyMLztbBdziIYn328NsUIHFBdU8LS90/view?usp=sharing",
  },
  {
    prize: "2nd Prize",
    title: "Can Tho City Youth and Children's Creativity Contest 2017",
    date: "2017-10",
    grade: "Grade 11",
    description:
      "- Field: Software\n- Project: We Study All — Multi-Platform Learning Support Tool",
    referenceLink:
      "https://drive.google.com/file/d/1VLzOpISa2D6J7trxfb4bLzy8Dg8rzm3i/view?usp=sharing",
  },
  {
    prize: "Creative Award",
    title: "Binh Duong Hackathon 2017",
    date: "2017-11",
    grade: "Grade 12",
    description:
      "- Completed the Binh Duong Smart Map product within 24 hours\n- Youngest competing team to win an award",
    referenceLink:
      "https://drive.google.com/file/d/1g_Oeoe7qWsYPPtBpBxMSp8p-gLlIC0FV/view?usp=sharing",
  },
  {
    prize: "1st Prize",
    title: "Can Tho City Science and Engineering Fair 2018",
    date: "2018-01",
    grade: "Grade 12",
    description: "- Field: System Software\n- Project: UnlimitedStudy",
    referenceLink:
      "https://drive.google.com/file/d/15PNdCA56653ZzvmZXqURR7eFLaU7pC8T/view?usp=sharing",
  },
  {
    prize: "3rd Prize",
    title: "Can Tho City Outstanding Student Selection Exam 2017-2018",
    date: "2018-02",
    grade: "Grade 12",
    description:
      "- Subject: Informatics (Programming)\n- Programming Language: C++",
    referenceLink:
      "https://drive.google.com/file/d/1UQ-UX-YNtnkLylahYkgEObmIB-dcKCPH/view?usp=sharing",
  },
  {
    prize: "3rd Prize",
    title: "National Science and Engineering Fair 2018 (ViSEF)",
    date: "2018-03",
    grade: "Grade 12",
    description:
      "- Organized in Lam Dong\n- Field: System Software\n- Project: UnlimitedStudy",
    referenceLink:
      "https://drive.google.com/file/d/1oOLM_ivrQ_IFHst66AC9qy3CoATT3z8B/view?usp=sharing",
  },
  {
    prize: "3rd Prize",
    title: "Can Tho City Young Informatics Contest 2018",
    date: "2018-04",
    grade: "Grade 12",
    description: "- Field: Creative Software\n- Project: UnlimitedStudy",
    referenceLink:
      "https://drive.google.com/file/d/1rh02NpKpPr7AQnXldQk8FGgbc837EPeQ/view?usp=sharing",
  },
  {
    prize: "2nd Prize",
    title: "Can Tho City Youth and Children's Creativity Contest 2018",
    date: "2018-08",
    grade: "Grade 12",
    description: "- Field: Software\n- Project: UnlimitedStudy",
    referenceLink:
      "https://drive.google.com/file/d/1gWK5V29q6RMwZ8Qgsx6ZkRI7EzAd4n5e/view?usp=sharing",
  },
  {
    prize: "3rd Prize",
    title: "National Young Informatics Contest 2018",
    date: "2018-08",
    grade: "Grade 12",
    description:
      "- Organized in Ba Ria - Vung Tau\n- Field: Creative Products\n- Project: UnlimitedStudy",
    referenceLink:
      "https://drive.google.com/file/d/1Te5Ygi89H3j4pH5Yvm9ipDKEcghQXYy_/view?usp=sharing",
  },
  {
    prize: "2nd Prize",
    title: "Business Startup Competition 2019",
    date: "2019-05",
    grade: "University",
    description:
      "- Organized by University of Economics and Law — VNUHCM\n- Project: Penphy — Self Development Social Network",
    referenceLink:
      "https://drive.google.com/file/d/1A_bwayALMZIfd12wL85SVGwAHD8lJjgh/view?usp=sharing",
  },
  {
    prize: "Bronze Medal",
    title: "10th Design, Manufacturing, and Application Award 2022",
    date: "2022-11",
    grade: "University",
    description:
      "- Organized by Ho Chi Minh City Youth Union\n- Field: Software\n- Project: ZaDark",
    referenceLink:
      "https://drive.google.com/file/d/1gmOG9_FTNAwdeR_eraYMCBBqaYuZOgoJ/view?usp=sharing",
  },
];

const certifications = [
  {
    title: "Certificate of Trademark Registration No. 543682",
    issuer: "Intellectual Property Office of Viet Nam",
    issuerLogoUrl:
      "https://assets.chanhdai.com/images/companies/ipvietnam.webp",
    issueDate: "2025-05-08",
    credentialID: "543682",
    credentialURL:
      "https://drive.google.com/file/d/1x7YzlK1kyz16h28ux9k3KAwnZFAabsvq/view?usp=sharing",
  },
  {
    title: "Next.js SEO Fundamentals",
    issuer: "Vercel",
    issuerIconName: "vercel",
    issueDate: "2025-04-26",
    credentialID: "seo-47463-1745634751873",
    credentialURL:
      "https://nextjs.org/learn/certificate?course=seo&user=47463&certId=seo-47463-1745634751873",
  },
  {
    title: "Next.js App Router Fundamentals",
    issuer: "Vercel",
    issuerIconName: "vercel",
    issueDate: "2025-04-26",
    credentialID: "dashboard-app-47463-1745633258744",
    credentialURL:
      "https://nextjs.org/learn/certificate?course=dashboard-app&user=47463&certId=dashboard-app-47463-1745633258744",
  },
  {
    title: "React Foundations for Next.js",
    issuer: "Vercel",
    issuerIconName: "vercel",
    issueDate: "2025-04-26",
    credentialID: "react-foundations-47463-1745634245158",
    credentialURL:
      "https://nextjs.org/learn/certificate?course=react-foundations&user=47463&certId=react-foundations-47463-1745634245158",
  },
  {
    title: "Certificate of Copyright Registration No. 0040/2025/QTG",
    issuer: "Copyright Office of Viet Nam",
    issuerLogoUrl: "https://assets.chanhdai.com/images/companies/cov.webp",
    issueDate: "2025-01-02",
    credentialID: "0040/2025/QTG",
    credentialURL:
      "https://drive.google.com/file/d/1kVBByVLlYPyyUJvxKga670wvVPNmZ2nV/view?usp=sharing",
  },
  {
    title: "Vietnamese Standardized Test of English Proficiency (CEFR B1)",
    issuer: "USSH-VNUHCM",
    issuerLogoUrl:
      "https://assets.chanhdai.com/images/companies/ussh-vnuhcm.webp",
    issueDate: "2024-12-17",
    credentialID: "QH58202305187",
    credentialURL:
      "https://vbcc.hcmussh.edu.vn/?type=11&certificateType=7&no=QH58202305187&fullName=Nguy%E1%BB%85n+Ch%C3%A1nh+%C4%90%E1%BA%A1i&dob=2000-08-14",
  },
  {
    title: "Certificate of Copyright Registration No. 7994/2024/QTG",
    issuer: "Copyright Office of Viet Nam",
    issuerLogoUrl: "https://assets.chanhdai.com/images/companies/cov.webp",
    issueDate: "2024-09-18",
    credentialID: "7994/2024/QTG",
    credentialURL:
      "https://drive.google.com/file/d/1otjV4GNOLFj4JD2tHWLuZpUIVyITYNUy/view?usp=sharing",
  },
  {
    title: "Engaging in Persuasive and Credible Communication",
    issuer: "National University of Singapore",
    issuerIconName: "coursera",
    issueDate: "2022-09-13",
    credentialID: "C6DHB9A5XQHV",
    credentialURL: "https://coursera.org/verify/C6DHB9A5XQHV",
  },
  {
    title: "Introduction to Databases",
    issuer: "Meta",
    issuerIconName: "meta",
    issueDate: "2022-08-28",
    credentialID: "YV5VQ5MXZ5YH",
    credentialURL: "https://coursera.org/verify/YV5VQ5MXZ5YH",
  },
  {
    title: "Solving Problems with Creative and Critical Thinking",
    issuer: "IBM Skills Network",
    issuerIconName: "coursera",
    issueDate: "2022-08-27",
    credentialID: "4UKZQJGM2932",
    credentialURL: "https://coursera.org/verify/4UKZQJGM2932",
  },
  {
    title: "Digital Skills: Social Media",
    issuer: "Accenture",
    issuerIconName: "accenture",
    issueDate: "2022-08-27",
    credentialID: "pc4345i",
    credentialURL: "https://www.futurelearn.com/certificates/pc4345i",
  },
  {
    title: "The Fundamentals of Digital Marketing",
    issuer: "Google Digital Garage",
    issuerIconName: "google",
    issueDate: "2022-08-22",
    credentialID: "3T8-F9N-LKQ",
    credentialURL:
      "https://drive.google.com/file/d/14laAMWmVKhCfgKwVEgJyWse7o0sZDD4N/view?usp=sharing",
  },
  {
    title: "Microsoft Office Specialist: Microsoft Office PowerPoint 2013",
    issuer: "Microsoft",
    issuerIconName: "microsoft",
    issueDate: "2017-04-16",
    credentialID: "wXTm3-4SHG",
    credentialURL:
      "https://drive.google.com/file/d/117DE6bMkHvRqXbED2tmSMNkbx9s7OahM/view?usp=sharing",
  },
  {
    title: "Google Code-in 2016",
    issuer: "Google",
    issuerIconName: "google",
    issueDate: "2017-01-16",
    credentialID: "",
    credentialURL:
      "https://drive.google.com/file/d/162RXtAVIZEvfx6LvP3xeBj-cSI9ZpPUX/view?usp=sharing",
  },
  {
    title: "HSGS Olympiad 2016",
    issuer: "HUS High School for Gifted Students",
    issueDate: "2016-05-08",
    credentialID: "",
    credentialURL:
      "https://drive.google.com/file/d/1eKv-2ldfw8-hF27sKfKWXL8MmwcSkzPq/view?usp=sharing",
  },
  {
    title: "Microsoft Office Specialist: Microsoft Office Word 2013",
    issuer: "Microsoft",
    issuerIconName: "microsoft",
    issueDate: "2016-04-24",
    credentialID: "w9YXr-FMR8",
    credentialURL:
      "https://drive.google.com/file/d/1-NHhjKlQbhlcO7bpRue1XzDgDaudOf2N/view?usp=sharing",
  },
];

const experiences = [
  {
    companyName: "Simplamo Enterprise JSC",
    companyLogoUrl:
      "https://assets.chanhdai.com/images/companies/simplamo.webp",
    isCurrentEmployer: true,
    order: 1,
    positions: [
      {
        title: "Senior Frontend Developer",
        employmentPeriodStart: "10.2022",
        employmentType: "Full-time",
        icon: "code",
        description: `- Develop AI Chat and AI Assistant features.
- Develop Whiteboards with real-time collaboration.
- Build and maintain the Zalo Mini App for Simplamo.
- Develop interactive chart and analytics widgets for the Dashboard.
- Develop and maintain core features to enhance functionality and user experience.
- Ensure UI/UX consistency and adherence to standards.
- Implement robust frontend solutions for web and mobile platforms.
- Analyze technical capabilities and provide optimal solutions.`,
        skills: [
          "TypeScript",
          "Next.js",
          "React Native",
          "MobX",
          "MobX-State-Tree",
          "Tailwind CSS",
          "Dify",
          "Zalo Mini App",
          "Agile",
          "Teamwork",
          "Research",
          "Problem-solving",
        ],
        isExpanded: true,
      },
      {
        title: "UI Design Lead",
        employmentPeriodStart: "10.2022",
        employmentType: "Full-time",
        icon: "design",
        description: `- Ensure UI/UX consistency and high-quality standards.
- Design intuitive, user-focused interfaces aligned with business goals.
- Define and establish a cohesive UI style for Simplamo.`,
        skills: ["Creativity", "UI/UX Design", "Figma"],
      },
    ],
  },
  {
    companyName: "Quaric Co., Ltd.",
    companyLogoUrl: "https://assets.chanhdai.com/images/companies/quaric.svg",
    isCurrentEmployer: true,
    order: 2,
    positions: [
      {
        title: "Software Engineer",
        employmentPeriodStart: "03.2024",
        employmentType: "Part-time",
        icon: "code",
        description: `In-house Project: Quaric Website
- Integrated VNPAY-QR for secure transactions.
- Registered the e-commerce site with online.gov.vn for compliance.
- Developed online ordering to streamline purchases.

In-house Project: ZaDark
- Build and maintain ZaDark.com with Docusaurus, integrating AdSense.
- Develop and maintain the ZaDark extension for Zalo Web on Chrome, Safari, Edge, and Firefox — with 15,000+ active users via Chrome Web Store.`,
        skills: [
          "Next.js",
          "Strapi",
          "Auth0",
          "VNPAY-QR",
          "Docker",
          "NGINX",
          "Google Cloud",
          "Docusaurus",
          "Extension",
          "Research",
          "Project Management",
        ],
        isExpanded: true,
      },
      {
        title: "Product Designer",
        employmentPeriodStart: "03.2024",
        employmentType: "Part-time",
        icon: "design",
        description: `- Design UI/UX for Quaric Website with a seamless experience.
- Develop a Design System for consistency and efficiency.
- Create Quaric's brand identity, including logo and guidelines.`,
        skills: [
          "UI/UX Design",
          "UX Writing",
          "Design System",
          "Brand Design",
          "Figma",
        ],
      },
      {
        title: "Founder & Director",
        employmentPeriodStart: "03.2024",
        employmentType: "Part-time",
        icon: "idea",
        description: `- Lead and manage the company's strategy.
- Oversee technical teams and product development.
- Manage relationships with customers and partners.`,
        skills: ["Business Ownership", "Business Law", "Business Tax"],
      },
    ],
  },
  {
    companyName: "Tung Tung JSC",
    companyLogoUrl:
      "https://assets.chanhdai.com/images/companies/tungtung.webp",
    isCurrentEmployer: false,
    order: 3,
    positions: [
      {
        title: "Web Developer",
        employmentPeriodStart: "2020",
        employmentPeriodEnd: "2022",
        employmentType: "Full-time",
        description: `- Built a scalable design system for consistency and efficiency.
- Built a complex rich-text editor based on ProseMirror and Slate for customizable content creation.
- Integrated APIs with the Backend Team to enhance functionality.`,
        icon: "code",
        skills: [
          "React",
          "Redux",
          "Storybook",
          "Lerna",
          "Agile",
          "Teamwork",
          "Research",
        ],
        isExpanded: true,
      },
      {
        title: "Mobile Developer",
        employmentPeriodStart: "2019",
        employmentPeriodEnd: "2020",
        employmentType: "Full-time",
        description: `- Rebuilt the app with React Native for better UX and performance.
- Integrated MoMo and in-app purchases for seamless payments.
- Optimized deployment for staging and production.
- Published on App Store and Google Play, ensuring compliance.`,
        icon: "code",
        skills: [
          "React Native",
          "Redux",
          "MoMo Payment API",
          "App Store",
          "Google Play Store",
          "App Center",
          "Agile",
          "Teamwork",
          "Research",
        ],
        isExpanded: true,
      },
      {
        title: "UI/UX Designer",
        employmentPeriodStart: "2018",
        employmentPeriodEnd: "2019",
        employmentType: "Full-time",
        description: `- Designed a Landing Page for enterprise clients.
- Redesigned the Online Quiz Platform for a modern look on web and mobile.
- Redesigned the Pricing interface for individual customers.
- Enhanced UX by improving usability, navigation, and user flow.`,
        icon: "design",
        skills: ["UI/UX Design", "Sketch"],
        isExpanded: true,
      },
    ],
  },
  {
    companyName: "Freelance",
    isCurrentEmployer: false,
    order: 4,
    positions: [
      {
        title: "Full-stack Developer",
        employmentPeriodStart: "2018",
        employmentPeriodEnd: "2020",
        employmentType: "Part-time",
        description: `- Built an order management website with real-time delivery tracking.
- Developed an e-commerce site for bird's nest products.
- Created a map to display monitoring station data.
- Designed a customizable WordPress landing page.`,
        icon: "code",
        skills: [
          "Laravel",
          "React",
          "Express.js",
          "Socket.IO",
          "MongoDB",
          "Firebase",
          "WordPress",
          "Docker",
          "NGINX",
        ],
      },
      {
        title: "Graphic & UI/UX Designer",
        employmentPeriodStart: "2018",
        employmentPeriodEnd: "2019",
        employmentType: "Part-time",
        description: "Designed logos, posters, ads, and UI.",
        icon: "design",
        skills: [
          "Creativity",
          "UI/UX Design",
          "Graphic Design",
          "Sketch",
          "Adobe Photoshop",
          "Adobe Illustrator",
        ],
      },
    ],
  },
  {
    companyName: "Education",
    isCurrentEmployer: false,
    order: 5,
    positions: [
      {
        title: "University of Science — VNUHCM",
        employmentPeriodStart: "08.2018",
        employmentPeriodEnd: "2026",
        icon: "education",
        description: `- Currently studying for a Bachelor's degree in Information Systems.
- Language Proficiency: B1 English Level.
- Achieved several awards, including:
  - Bronze Medal — 10th Design, Manufacturing, and Application Award 2022
  - 2nd Prize — Business Startup Competition 2019`,
        skills: [
          "C++",
          "Java",
          "Python",
          "Data Structures",
          "Algorithms",
          "Advanced Databases",
          "Systems Design",
          "Distributed Systems",
          "Software Engineering",
          "Self-learning",
          "Teamwork",
          "Presentation",
        ],
      },
      {
        title: "Ly Tu Trong High School for the Gifted — Can Tho City",
        employmentPeriodStart: "08.2015",
        employmentPeriodEnd: "06.2018",
        icon: "education",
        description: `- Student of the Specialized Computer Science Program.
- Granted direct admission to university due to achieving 3rd Prize at the national level.
- Achieved numerous awards at city and national levels.
- Achieved the title of Outstanding Student from Grade 10-12.
- Selected for the National Excellent Student Contest in Informatics for two consecutive years during high school.
- Honored on the school's "Hall of Fame" for academic achievements.
- Developed a feature using Node.js and Pandoc to recognize multiple-choice questions from .docx files.
- Developed websites based on Laravel framework.
- Built websites with PHP and MySQL, following the MVC architecture.`,
        skills: [
          "Algorithms",
          "C++",
          "PHP",
          "MySQL",
          "Laravel",
          "Node.js",
          "Pandoc",
          "Self-learning",
        ],
      },
      {
        title: "Thuan Hung Secondary School",
        employmentPeriodStart: "08.2011",
        employmentPeriodEnd: "06.2015",
        icon: "education",
        description: `- Recognized as the most outstanding student of the district.
- Achieved numerous awards at city and national levels.
- Achieved the title of Outstanding Student from Grade 6-9.
- Developed websites using the open-source NukeViet CMS.`,
        skills: [
          "Pascal",
          "NukeViet",
          "HTML",
          "CSS",
          "JavaScript",
          "Self-learning",
        ],
      },
    ],
  },
];

const projects = [
  {
    title: "React Wheel Picker",
    slug: "react-wheel-picker",
    periodStart: "05.2025",
    link: "https://react-wheel-picker.chanhdai.com",
    skills: [
      "Open Source",
      "React",
      "TypeScript",
      "Monorepo",
      "Turborepo",
      "pnpm-workspace",
      "Package Publishing",
      "NPM Registry",
      "GitHub Actions",
    ],
    description: `iOS-like wheel picker for React with smooth inertia scrolling and infinite loop support.
- 📱 Natural touch scrolling with smooth inertia effect
- 🖱️ Mouse drag and scroll support for desktop
- 🔄 Infinite loop scrolling
- 🎨 Unstyled components for complete style customization
- ⚡️ Easy installation via shadcn CLI`,
    logoUrl:
      "https://assets.chanhdai.com/images/project-logos/react-wheel-picker.svg",
    isExpanded: true,
    order: 1,
  },
  {
    title: "chanhdai.com",
    slug: "chanhdai.com",
    periodStart: "01.2025",
    link: "https://github.com/ncdai/chanhdai.com",
    skills: [
      "Open Source",
      "Next.js 15",
      "Tailwind CSS v4",
      "Radix UI",
      "Motion",
      "shadcn/ui",
      "Component Registry",
      "Vercel",
    ],
    description: `chanhdai.com is my portfolio website, showcasing my work and experience as a Software Developer & UI/UX Designer.
- Elegant & Minimalistic UI: Clean and modern design
- Dark Mode: Supports light and dark themes
- vCard Integration: Digital business card with contact details
- SEO Optimization: JSON-LD schema, sitemap, robots
- AI-friendly /llms.txt
- Email Protection: Obfuscation to prevent spam
- Installable PWA`,
    logoUrl:
      "https://assets.chanhdai.com/images/project-logos/chanhdaidotcom.svg",
    isExpanded: true,
    order: 2,
  },
  {
    title: "quaric.com",
    slug: "quaric.com",
    periodStart: "03.2024",
    link: "https://quaric.com",
    skills: [
      "Company Project",
      "Next.js 15",
      "Tailwind CSS v3",
      "shadcn/ui",
      "Strapi 5",
      "VNPAY-QR",
      "Docker",
      "Docker Compose",
      "NGINX",
    ],
    logoUrl:
      "https://assets.chanhdai.com/images/project-logos/quaricdotcom.svg",
    order: 3,
  },
  {
    title: "ZaDark",
    slug: "zadark",
    periodStart: "01.2022",
    link: "https://zadark.com",
    skills: [
      "Pet Project",
      "Open Source",
      "Browser Extension",
      "CLI",
      "Docusaurus 3",
    ],
    description: `ZaDark adds Dark Mode, anti-peeking, customizable fonts, backgrounds, and more to Zalo Web and PC.
- 80,000+ downloads on SourceForge
- 15,000+ active users via Chrome Web Store
- Bronze Medal — 10th Design, Manufacturing, and Application Award 2022`,
    logoUrl: "https://assets.chanhdai.com/images/project-logos/zadark.svg",
    isExpanded: true,
    order: 4,
  },
  {
    title: "QABox",
    slug: "qabox",
    periodStart: "07.2023",
    periodEnd: "07.2023",
    link: "https://github.com/ncdai/qabox",
    skills: [
      "University Project",
      "PHP",
      "MySQL",
      "MVC",
      "Docker",
      "Docker Compose",
    ],
    description:
      "- Course: Distributed Applications — FIT@HCMUS\n- Project Score: 10/10",
  },
  {
    title: "TaskBox",
    slug: "taskbox",
    periodStart: "07.2023",
    periodEnd: "07.2023",
    link: "https://github.com/ncdai/taskbox",
    skills: [
      "University Project",
      "PHP",
      "MySQL",
      "MVC",
      "Docker",
      "Docker Compose",
    ],
    description:
      "- Course: Distributed Applications — FIT@HCMUS\n- Project Score: 10/10",
  },
  {
    title: "DaiChat App",
    slug: "daichat-app",
    periodStart: "07.2020",
    periodEnd: "07.2020",
    link: "https://www.youtube.com/watch?v=H5U3J_W1low",
    skills: ["University Project", "Java", "Java Swing", "Java Networking"],
    description: `- Course: Java Application Programming — FIT@HCMUS
- Requirement: Developed a real-time chat application using Java technologies
- Project Score: 10/10`,
  },
  {
    title: "QLSV App",
    slug: "qlsv-app",
    periodStart: "06.2020",
    periodEnd: "06.2020",
    link: "https://www.youtube.com/watch?v=tG9SZEBrwog",
    skills: ["University Project", "Java", "Java Swing", "Hibernate", "MySQL"],
    description: `- Course: Java Application Programming — FIT@HCMUS
- Requirement: Built a student management system with role-based functionalities
- Project Score: 10/10`,
  },
  {
    title: "Penphy",
    slug: "penphy",
    periodStart: "01.2019",
    periodEnd: "08.2019",
    link: "https://www.youtube.com/watch?v=EdU7rUO-UA4",
    skills: ["Startup Project", "JavaScript", "React Native"],
    description: "2nd Prize — Business Startup Competition 2019",
  },
  {
    title: "UnlimitedStudy",
    slug: "unlimitedstudy",
    periodStart: "01.2017",
    periodEnd: "08.2018",
    link: "https://muctim.tuoitre.vn/cong-cu-ho-tro-viec-day-va-hoc-55107.htm",
    skills: [
      "National Competition",
      "Creative Software",
      "PHP",
      "Laravel 4",
      "MySQL",
      "jQuery",
      "Bootstrap 3",
    ],
    description: `UnlimitedStudy is a website that provides teaching and learning support tools for teachers and students.
- 3rd Prize — National Science and Engineering Fair 2018 (ViSEF)
- 1st Prize — Can Tho City Science and Engineering Fair 2018
- 3rd Prize — National Young Informatics Contest 2018
- 2nd Prize — Can Tho City Youth and Children's Creativity Contest 2018
- 3rd Prize — Can Tho City Young Informatics Contest 2018
- Reached 7,000+ users`,
    logoUrl:
      "https://assets.chanhdai.com/images/project-logos/unlimitedstudy.webp",
  },
  {
    title: "DMessage",
    slug: "dmessage",
    periodStart: "05.2017",
    periodEnd: "05.2017",
    link: "https://github.com/ncdai/DMessage",
    skills: [
      "Self-learning Project",
      "Pet Project",
      "Express.js",
      "Socket.io",
      "MongoDB",
      "Mongoose ODM",
    ],
    description:
      "A Messenger clone built to practice real-time communication using Socket.IO.",
  },
  {
    title: "Study English",
    slug: "study-english",
    periodStart: "11.2016",
    periodEnd: "12.2017",
    link: "https://www.youtube.com/watch?v=OYgugvjqU4A",
    skills: [
      "National Competition",
      "Creative Software",
      "PHP",
      "Laravel 4",
      "MySQL",
    ],
    description: `Study English is a free, mobile-friendly website for high school English learning.
- Consolation Prize — National Youth and Children's Creativity Contest 2016
- 1st Prize — Can Tho City Youth and Children's Creativity Contest 2016
- Consolation Prize — Can Tho City Young Informatics Contest 2016`,
  },
];

function generateNdjson() {
  console.log("Generating migration.ndjson...\n");

  let ndjson = "";

  console.log(`Adding ${awards.length} awards...`);
  for (const award of awards) {
    ndjson += JSON.stringify({ _type: "award", ...award }) + "\n";
  }

  console.log(`Adding ${certifications.length} certifications...`);
  for (const cert of certifications) {
    ndjson += JSON.stringify({ _type: "certification", ...cert }) + "\n";
  }

  console.log(`Adding ${experiences.length} experiences...`);
  for (const exp of experiences) {
    ndjson += JSON.stringify({ _type: "experience", ...exp }) + "\n";
  }

  console.log(`Adding ${projects.length} projects...`);
  for (const proj of projects) {
    ndjson += JSON.stringify({ _type: "project", ...proj }) + "\n";
  }

  fs.writeFileSync("migration.ndjson", ndjson);
  console.log("\nDone! Created migration.ndjson");
  console.log("\nTo import, run:");
  console.log("  bunx sanity import migration.ndjson production");
}

generateNdjson();
