import { SiteLayout } from "../_components/site-shell";
import { teamGroups, teamVacancies } from "../_data/site-data";

export default function TeamPage() {
  return (
    <SiteLayout>
      <div className="page-width subpage-wrap">
        <section className="subpage-header reveal">
          <div>
            <p className="section-kicker">КОМАНДА</p>
            <h1>Команда проекта</h1>
          </div>
        </section>

        <section className="team-grid reveal">
          <div className="team-card vacancies-card">
            <h2>Набор</h2>

            <div className="vacancy-list">
              {teamVacancies.map((vacancy) => (
                <article key={vacancy.title} className="vacancy-item">
                  <div className="vacancy-icon">{vacancy.icon}</div>

                  <div>
                    <h3>{vacancy.title}</h3>
                    <p>{vacancy.summary}</p>

                    <ul>
                      {vacancy.requirements.map((requirement) => (
                        <li key={requirement}>{requirement}</li>
                      ))}
                    </ul>
                  </div>

                  <button type="button" className="solid-button">
                    Подать заявку
                  </button>
                </article>
              ))}
            </div>
          </div>

          <div className="team-card">
            <h2>Состав</h2>

            <div className="team-groups">
              {teamGroups.map((group) => (
                <div key={group.label} className="team-group">
                  <h3>{group.label}</h3>

                  <div className="member-grid">
                    {group.members.map((member, index) => (
                      <article key={`${group.label}-${index}`} className="member-card">
                        <img src="/images/kkkk.png" alt="" />
                        <strong>{member.name}</strong>
                        <span>{member.role}</span>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
