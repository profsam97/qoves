export type FaqItem = {
  q: string;
  a: string;
};

export type FaqCategory = {
  id: string;
  title: string;
  items: FaqItem[];
};

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "general",
    title: "General Questions",
    items: [
      {
        q: "What is Qoves?",
        a: "Qoves is the world's best platform to improve your looks and achieve a real facial transformation without surgery. We provide you, from the comfort of your home, with a personalized facial analysis and transformation plan based on over 2,000 academic studies.",
      },
      {
        q: "Who is this for?",
        a: "Qoves is for anyone who wants to improve their looks with science-based methods, without surgery.",
      },
      {
        q: "What exactly will I receive?",
        a: "Upon joining, you'll receive a comprehensive facial analysis, a personalized glow-up protocol, your biometric scores, before-and-after visualizations of your potential improvements, an aesthetic letter from our team, and constant messaging access to our care team. You'll receive an updated version of all the above once a year to make sure you maintain your results and stay the best-looking version of yourself for years to come.",
      },
      {
        q: "How does it work?",
        a: "Tell us about yourself through demographics, lifestyle, and goals. Upload your photos — six specific angles of your face and head. Within 28 days, you'll receive your full protocol and visuals of your best-looking self.",
      },
      {
        q: "How long will it take for me to receive my results?",
        a: "It takes up to 28 days from the moment you upload your photos for our team to prepare your analysis and protocol.",
      },
      {
        q: "Is this a one-time report or a continuous service?",
        a: "This is an ongoing service that you can cancel at any time. After your initial plan, you'll receive updated protocols, analyses, and visualizations every year. You'll also have unlimited access to message our aesthetic team support whenever you need.",
      },
      {
        q: "How often do I need to submit photos?",
        a: "Once a year to update your analysis, review your protocol, and track your progress.",
      },
      {
        q: "What makes Qoves different from beauty apps or filters?",
        a: "We don't rely on filters or gimmicks. We've trained our models to achieve best-in-class precision in measurements (accurate to the nearest millimeter), visualizations (designed to show a realistic preview of the best your face would look with non-surgical interventions), and recommendations (using the latest research to ensure efficacy).",
      },
      {
        q: "Can I really get results without surgery?",
        a: "Yes. The many small changes we recommend, combined together, compound to produce dramatic results. Every transformation you see on this page can be achieved without surgery — indeed, for most people, surgery is unnecessary and often counterproductive. Everyone can maximize their attractiveness and get impressive results without surgical intervention.",
      },
    ],
  },
  {
    id: "analysis",
    title: "About the Analysis",
    items: [
      {
        q: "What does the facial analysis cover?",
        a: "Our facial analysis evaluates over 40 biometric markers across proportion, symmetry, and feature harmony, mapped against peer-reviewed aesthetic research.",
      },
      {
        q: "How accurate are the measurements?",
        a: "Measurements are accurate to the nearest millimeter, surpassing the precision used in most aesthetic clinics.",
      },
      {
        q: "Is the analysis performed by a human or AI?",
        a: "Our models perform the initial analysis, which is then reviewed and refined by our in-house aesthetic team before being delivered to you.",
      },
    ],
  },
  {
    id: "protocol",
    title: "About the Protocol",
    items: [
      {
        q: "What's in the personalized protocol?",
        a: "A sequenced plan of non-surgical interventions — skincare, grooming, posture, training, and lifestyle — ordered by impact for your specific face.",
      },
      {
        q: "How long does a full protocol take to complete?",
        a: "Most protocols span 6 to 12 months of consistent application, with visible changes starting within the first 4 to 8 weeks.",
      },
      {
        q: "Can I follow the protocol without any products?",
        a: "Yes. The core of every protocol is habit-based. Product recommendations are optional accelerators, not requirements.",
      },
    ],
  },
  {
    id: "experience",
    title: "Experience & Use",
    items: [
      {
        q: "Do I need any special equipment?",
        a: "Just a smartphone camera. All photo captures are guided step-by-step inside the app.",
      },
      {
        q: "How much time per week does this take?",
        a: "Most members spend 10 to 20 minutes a day on protocol steps, with deeper reviews once a month.",
      },
      {
        q: "Can I message the team if I have questions?",
        a: "Yes. Every member has unlimited messaging access to our aesthetic care team for the duration of their subscription.",
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing & Subscription",
    items: [
      {
        q: "How much does Qoves cost?",
        a: "Qoves costs $150 per year.",
      },
      {
        q: "Can I cancel at any time?",
        a: "Yes. You can cancel at any point and retain access until the end of your billing period.",
      },
      {
        q: "Do you offer refunds?",
        a: "Try it risk-free. If you’re not satisfied, request a refund within 14 days of receiving your order — no hassle."
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy & Data",
    items: [
      {
        q: "Who can see my photos?",
        a: "Only the aesthetic team members assigned to your case. Photos are encrypted at rest and in transit.",
      },
      {
        q: "Can I delete my data?",
        a: "Yes. You can request full deletion of your account and all associated media at any time from your account settings.",
      },
      {
        q: "Is my data used to train models?",
        a: "Never without explicit opt-in consent, given separately from the standard terms of service.",
      },
    ],
  },
  {
    id: "mindset",
    title: "Mindset & Philosophy",
    items: [
      {
        q: "Is this about chasing an ideal?",
        a: "No. Qoves is about becoming the best-looking version of yourself — not an impossible standard or someone else's face.",
      },
      {
        q: "Why non-surgical first?",
        a: "For most people, non-surgical interventions deliver the majority of achievable improvement with none of the risk, downtime, or irreversibility.",
      },
      {
        q: "What if I still want surgery later?",
        a: "Our protocol is designed to optimize your natural baseline first, which gives any future procedure a stronger starting point.",
      },
    ],
  },
  {
    id: "practical",
    title: "Practical Concerns",
    items: [
      {
        q: "What if my lighting or camera is bad?",
        a: "The capture flow checks your photos in real time and will prompt you to retake any image that doesn't meet our quality threshold.",
      },
      {
        q: "Can I upload old photos?",
        a: "We require fresh captures taken in-app to ensure accuracy. Older photos cannot be used for analysis.",
      },
      {
        q: "Does this work across skin tones and ethnicities?",
        a: "Yes. Our models are trained on a globally balanced dataset and our recommendations are calibrated per individual.",
      },
    ],
  },
  {
    id: "support",
    title: "About Support",
    items: [
      {
        q: "How do I reach support?",
        a: "Use the chat box in the bottom right of any page, or email hello@qoves.com.",
      },
      {
        q: "What are support hours?",
        a: "Our care team responds within 24 hours, 7 days a week.",
      },
      {
        q: "Can I talk to someone on a call?",
        a: "Yes. Members can book a 1-on-1 review call with our aesthetic team once per protocol cycle.",
      },
    ],
  },
];
