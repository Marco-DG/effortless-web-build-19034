import { UniversalFooter } from './Footer';
import { FooterSchema } from './schema';
import { registerComponent } from '../../builder/registry';

export { UniversalFooter, FooterSchema };

export function registerFooter() {
    registerComponent(FooterSchema.id, UniversalFooter, FooterSchema);
}
