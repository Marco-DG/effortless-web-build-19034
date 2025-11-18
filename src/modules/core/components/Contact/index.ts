import { registerComponent } from '../../builder/registry';
import { UniversalContact } from './Contact';
import { ContactSchema } from './schema';

export const registerContact = () => {
    registerComponent('contact-section', UniversalContact, ContactSchema);
};

export { UniversalContact, ContactSchema };
