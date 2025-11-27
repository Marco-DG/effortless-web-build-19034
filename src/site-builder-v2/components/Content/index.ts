import { registerComponent } from '../../builder/registry';
import { UniversalContent } from './Content';
import { ContentSchema } from './schema';

export const registerContent = () => {
    registerComponent('content', UniversalContent, ContentSchema);
};

export { UniversalContent, ContentSchema };
