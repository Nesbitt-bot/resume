import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import type { MDXComponents } from 'mdx/types';
import { resume, site } from '@/lib/content';
import { HomeHeroClient, InquiryTabsClient, FeaturedProjectsClient } from '@/components/home-widgets';
import { PortfolioExplorerClient } from '@/components/portfolio-explorer';
import { ResumeViewClient } from '@/components/resume-view';
import { CourseArchiveClient, SkillAtlasClient } from '@/components/skill-atlas';
import { PathwaysClient, QAListClient, SitemapGridClient, TalksArchiveClient } from '@/components/content-widgets';
import { TermNote } from '@/components/term-note';
import { MediaEmbed } from '@/components/media-embed';

function SmartLink({ href = '', children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = /^(https?:)?\/\//.test(href);
  if (external) {
    return <a href={href} target="_blank" rel="noreferrer" {...props}>{children}<ExternalLink className="external-icon" size={12} /></a>;
  }
  return <Link href={href} {...props}>{children}</Link>;
}

function HomeHero() {
  return <HomeHeroClient site={site} latestProject={resume.portfolio[0]} />;
}

function InquiryTabs() {
  return <InquiryTabsClient inquiries={site.inquiries} />;
}

function RecentProjectTopics() {
  const selected: Array<{ topic: string; slug: string }> = [];
  const seen = new Set<string>();

  for (const project of resume.portfolio) {
    const candidates = [
      ...(project.skills ?? []),
      ...(project.topicCategory ?? []),
      project.category,
    ].filter((candidate): candidate is string => Boolean(candidate?.trim()));
    const topic = candidates.find((candidate) => !seen.has(candidate.trim().toLowerCase()));

    if (topic) {
      const key = topic.trim().toLowerCase();
      seen.add(key);
      selected.push({ topic: topic.trim(), slug: project.slug });
    }

    if (selected.length === 3) break;
  }

  return (
    <>
      {selected.map(({ topic, slug }, index) => (
        <span key={`${slug}-${topic}`}>
          {index > 0 && (index === selected.length - 1 ? ', and ' : ', ')}
          <strong><Link href={`/projects/${slug}/`}>{topic}</Link></strong>
        </span>
      ))}
    </>
  );
}

function FeaturedProjects() {
  return <FeaturedProjectsClient projects={resume.portfolio} />;
}

function ResumeView() {
  return <ResumeViewClient resume={resume} />;
}

function PortfolioExplorer() {
  return <PortfolioExplorerClient projects={resume.portfolio} />;
}

function SkillAtlas() {
  return <SkillAtlasClient resume={resume} />;
}

function CourseArchive() {
  return <CourseArchiveClient semesters={resume.skills} />;
}

function TalksArchive() {
  return <TalksArchiveClient talks={resume.presentations} />;
}

function Pathways() {
  return <PathwaysClient pathways={site.pathways} projects={resume.portfolio} semesters={resume.skills} />;
}

function QAList() {
  return <QAListClient items={resume.qa.items} updated={resume.qa.last_updated} />;
}

function SitemapGrid() {
  return <SitemapGridClient navigation={site.navigation} />;
}

const components: MDXComponents = {
  a: SmartLink,
  HomeHero,
  InquiryTabs,
  RecentProjectTopics,
  FeaturedProjects,
  ResumeView,
  PortfolioExplorer,
  SkillAtlas,
  CourseArchive,
  TalksArchive,
  Pathways,
  QAList,
  SitemapGrid,
  TermNote,
  MediaEmbed,
};

export function getMDXComponents(overrides?: MDXComponents): MDXComponents {
  return { ...components, ...overrides };
}
