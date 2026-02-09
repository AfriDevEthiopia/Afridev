export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  type: string;
  description: string;
  features: string[];
  image?: string;
  link?: string;
}

export interface Testimonial {
  id: string;
  project: string;
  rating: number;
  period: string;
  quote: string;
  client?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

