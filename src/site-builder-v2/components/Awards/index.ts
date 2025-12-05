import { registerComponent } from '../../builder/registry';
import { UniversalAwards } from './Awards';
import { AwardsSchema } from './schema';

export const registerAwards = () => {
    registerComponent('awards', UniversalAwards, AwardsSchema);
};

export { UniversalAwards, AwardsSchema };
