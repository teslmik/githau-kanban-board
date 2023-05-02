import { StarFilled } from "@ant-design/icons";
import { Breadcrumb } from "antd";

const MainBreadcrumbs: React.FC<{ repoName: string, projectName: string, stars?: number }> = ({ repoName, projectName, stars }) => {
  return (
    <div className="bread-crumbs-container">
      <Breadcrumb
        separator=">"
        items={[
          {
            title: repoName,
            href: `https://github.com/${repoName}`,
          },
          {
            title: projectName,
            href: `https://github.com/${repoName}/${projectName}`,
          },
        ]}
      />
      <div>
        <StarFilled style={{ color: "yellow", marginRight: 5 }} />
        <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
          {stars && `${Math.round(stars / 1000).toString()}K`}
        </span>
      </div>
    </div>
  )
}

export { MainBreadcrumbs };