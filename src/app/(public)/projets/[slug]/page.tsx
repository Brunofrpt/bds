import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedProjectBySlug } from "@/features/projets/queries/get-published-project-by-slug.query";
import Link from "next/link";
import ProjectCarousel from "@/features/projets/components/project-carousel";
import PublicCta from "@/components/UI/public-cta";
import { seoConfig } from "@/config/seo.config";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getAbsoluteUrl(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${seoConfig.siteUrl}${url.startsWith("/") ? url : `/${url}`}`;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const canonicalUrl =
    project.canonicalUrl || `${seoConfig.siteUrl}/projets/${project.slug}`;
  const projectUrl = `${seoConfig.siteUrl}/projets/${project.slug}`;
  const socialImageUrl = getAbsoluteUrl(
    project.ogImageUrl || project.heroImageUrl,
  );

  return {
    title: project.seoTitle,
    description: project.seoDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: project.seoTitle,
      description: project.seoDescription,
      url: projectUrl,
      type: "article",
      locale: seoConfig.locale,
      images: [
        {
          url: socialImageUrl,
          alt: project.heroImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.seoTitle,
      description: project.seoDescription,
      images: [socialImageUrl],
    },
  };
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const objectives = isStringArray(project.objectives)
    ? project.objectives
    : [];
  const developedSkills = isStringArray(project.developedSkills)
    ? project.developedSkills
    : [];
  const results = isStringArray(project.results) ? project.results : [];
  const improvements = isStringArray(project.improvements)
    ? project.improvements
    : [];

  return (
    <section className="projet">
      <Link className="projet__return link-description" href="/projets">
        TOUS LES PROJETS
      </Link>

      <article className="projet__article">
        {/* ----- HEADER ----- */}
        <header className="projet__header">
          <h1 className="projet__title title-public">{project.title}</h1>
          <span className="projet__year">{project.year}</span>
          <p className="projet__description paragraphe">
            {project.shortDescription}
          </p>
        </header>

        {/* ----- INTRO ----- */}
        <section className="projet__intro">
          <ProjectCarousel
            heroImageUrl={project.heroImageUrl}
            heroImageAlt={project.heroImageAlt}
            images={project.images}
          />

          <ul className="projet__technologies">
            {project.technologies.map((projectTechnologys) => (
              <li
                key={projectTechnologys.technology.id}
                className="projet__technology-button link-description button button--secondary"
              >
                {projectTechnologys.technology.name}
              </li>
            ))}
          </ul>
        </section>

        {/* ----- CONTENT ----- */}
        <section className="projet__content">
          <div className="projet__content-block">
            <h2 className="projet__content-title subsubtitle">
              Stack technique
            </h2>
            <p className="projet__technical-stack-description paragraphe">
              {project.technicalStackDescription}
            </p>
          </div>

          <div className="projet__content-block">
            <h2 className="projet__content-title subsubtitle">Contexte</h2>
            <p className="projet__context paragraphe">{project.context}</p>
          </div>

          <div className="projet__content-block">
            <h2 className="projet__content-title subsubtitle">Objectifs</h2>
            <ul className="projet__objectives">
              {objectives.map((objective, index) => (
                <li
                  key={`${objective}-${index}`}
                  className="projet__objectives-item paragraphe"
                >
                  <span className="projet__objective-icon">+</span> {objective}
                </li>
              ))}
            </ul>
          </div>

          <div className="projet__content-block">
            <h2 className="projet__content-title subsubtitle">
              Compétences développées
            </h2>
            <ul className="projet__developed-skills">
              {developedSkills.map((skill, index) => (
                <li
                  key={`${skill}-${index}`}
                  className="projet__developed-skills-item paragraphe"
                >
                  <span className="projet__skill-icon">→</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className="projet__content-block">
            <h2 className="projet__content-title subsubtitle">Résultats</h2>
            <ul className="projet__results">
              {results.map((result, index) => (
                <li
                  key={`${result}-${index}`}
                  className="projet__results-item paragraphe"
                >
                  <span className="projet__results-icon">✓</span>
                  {result}
                </li>
              ))}
            </ul>
          </div>

          {improvements.length > 0 && (
            <div className="projet__content-block">
              <h2 className="projet__content-title subsubtitle">
                Améliorations possibles
              </h2>
              <ul className="projet__improvements">
                {improvements.map((improvement, index) => (
                  <li
                    key={`${improvement}-${index}`}
                    className="projet__improvements-item paragraphe"
                  >
                    <span className="projet__improvement-icon">~</span>
                    {improvement}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* ----- LINKS ----- */}
        {(project.githubUrl || project.demoUrl || project.videoUrl) && (
          <section className="projet__links">
            <h2 className="projet__content-title subsubtitle">
              Liens du projet
            </h2>
            <div className="projet__links-list">
              {project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  className="projet__link button button--secondary"
                >
                  Voir le GitHub
                </Link>
              )}
              {project.demoUrl && (
                <Link
                  href={project.demoUrl}
                  className="projet__link button button--primary"
                >
                  URL du site
                </Link>
              )}
              {project.videoUrl && (
                <Link
                  href={project.videoUrl}
                  className="projet__link button button--secondary"
                >
                  Voir la vidéo
                </Link>
              )}
            </div>
          </section>
        )}
      </article>
      <PublicCta />
    </section>
  );
}
