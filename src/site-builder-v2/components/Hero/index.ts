import { UniversalHero } from './Hero';
import { HeroSchema } from './schema';
import { registerComponent } from '../../builder/registry';

export { UniversalHero, HeroSchema };

export function registerHero() {
    registerComponent(HeroSchema.id, UniversalHero, HeroSchema);
}
