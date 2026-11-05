import profilePhoto from "../assets/Elisha.png";
// All About page text lives in this JSON file. Edit the JSON, not this component.
import about from "../data/about.json";

function About() {
  return (
    <main>
      <section>
        <div className="wrap profile">
          <img className="avatar" src={profilePhoto} alt={about.fullName} />
          <div>
            <h1>Hi, I'm {about.firstName}.</h1>
            <p>
              I'm {about.fullName}, a {about.yearLevel} {about.course} student at{" "}
              {about.school} (section {about.section}) and I specialize in{" "}
              {about.specialization}.
            </p>
            <p>
              I am {about.age} years old who was born on {about.birthday} here in{" "}
              {about.hometown}. {about.family}
            </p>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <h2>{about.interestsTitle}</h2>
          <p>{about.interests}</p>
          <ul className="tags">
            {/* One tag per item in the "tags" array */}
            {about.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>{about.educationTitle}</h2>
          <ol className="steps">
            {/* One step per school in the "education" array */}
            {about.education.map((item) => (
              <li key={item.school}>
                <strong>{item.school}</strong>
                {item.level}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}

export default About;
