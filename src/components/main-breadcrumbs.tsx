import { Breadcrumb } from "antd";

const MainBreadcrumbs: React.FC = () => {
  return (
    <Breadcrumb
      separator=">"
      items={[
        {
          title: 'Application Center',
          href: '',
        },
        {
          title: 'Application List',
          href: '',
        },
      ]}
      style={{marginBottom: '16px'}}
    />
  )
}

export { MainBreadcrumbs };