export interface DataSource {
  title: string;
  subtitle: string;
  content?: string;
  icon: string;
  link: string;
}

export const dataSources: DataSource[] = [
  {
    title: 'Single data',
    subtitle: 'REST Api with multiple roundtrips',
    icon: 'call_split',
    link: '/single'
  },
  {
    title: 'Multiple data',
    subtitle: 'REST Api with over-fetched data',
    icon: 'call_merge',
    link: '/multiple'
  },
  {
    title: 'GraphQL',
    subtitle: 'Without any of that',
    icon: 'timeline',
    link: '/graphql'
  },
];
