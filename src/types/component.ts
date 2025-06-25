
export interface Component {
  id: string;
  name: string;
  description: string;
  category: 'UI' | 'Hooks' | 'Providers' | 'Pages';
  tags: string[];
  version: string;
  filePath: string;
  code: string;
  previewComponent?: React.ComponentType;
  subPages?: {
    name: string;
    filePath: string;
    code: string;
    previewComponent?: React.ComponentType;
  }[];
}
