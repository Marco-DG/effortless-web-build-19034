import { registerComponent } from '../../builder/registry';
import { UniversalTestimonials } from './Testimonials';
import { TestimonialsSchema } from './schema';

export const registerTestimonials = () => {
    registerComponent('testimonials', UniversalTestimonials, TestimonialsSchema);
};

export { UniversalTestimonials, TestimonialsSchema };
