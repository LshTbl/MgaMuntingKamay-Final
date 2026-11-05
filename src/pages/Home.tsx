import { Link } from "react-router-dom";
import schoolBag from "../assets/school-bag.svg";

// What each Donate amount buys (estimates from typical school supply store prices)
const gifts = [
  { amount: 100, title: "Notebooks and pens", text: "3 notebooks (₱25 each) and 2 ballpens (₱12 each) for one student." },
  { amount: 250, title: "Everything inside the bag", text: "4 notebooks, a mini verse notebook, pens, pencils, a ruler, crayons, an eraser and a sharpener." },
  { amount: 500, title: "One full Bag Ready kit", text: "All the supplies above plus a sturdy school bag (about ₱250), ready on the first day of class." },
  { amount: 1000, title: "One month of Aral Fund", text: "About ₱520 for daily jeepney fare to school, plus ₱480 for printing and project materials." },
];

// Goal for the next school year, split by program
const goals = [
  { label: "Bag Ready: 50 kits", amount: 25000, color: "var(--leaf)" },
  { label: "Aral Fund: 5 scholars for 10 months", amount: 50000, color: "var(--pencil)" },
  { label: "Spiritual Study Corner: 2 shelves", amount: 10000, color: "#e58a8a" },
];
const goalTotal = goals.reduce((sum, g) => sum + g.amount, 0);

// Barangays in Angeles City where we focus our work
const places = ["Pulung Maragul", "Sapangbato", "Cutcut", "Malabanias", "Anunas"];

const faqs = [
  {
    q: "Can I donate used books?",
    a: "Yes, as long as they are clean and complete. Storybooks, Bibles and Christian books go to the Spiritual Study Corner. Notebooks and supplies should be new.",
  },
  {
    q: "Do I need to be Christian to volunteer?",
    a: "No. Anyone who wants to help pack bags or tutor is welcome. The Bible study sessions are optional for both volunteers and students.",
  },
  {
    q: "Will I know where my donation went?",
    a: "Yes. Every donor gets a photo update once the bags or scholarships are handed over, and you can ask for an official receipt.",
  },
  {
    q: "When are bags given out?",
    a: "Before each school year opens, around the time of Brigada Eskwela, so students have everything on the first day of class.",
  },
];

function Home() {
  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <div>
            <h1>Every learner deserves a full school bag.</h1>
            <p>
              Mga Munting Kamay is a non-profit that gives school supplies and small
              scholarships to public school students in Central Luzon, so no
              child has to skip class over a missing notebook or a lack of fare. It also
              helps children be guided in their spiritual journey through the study of
              the Bible and other Christian books.
            </p>
            <Link className="btn" to="/donate">Donate now</Link>
            <a className="btn alt" href="#programs">See our programs</a>
          </div>
          <svg
            viewBox="0 0 200 200"
            role="img"
            aria-label="A pencil resting on an open notebook"
          >
            <rect x="20" y="70" width="160" height="100" rx="8" fill="#fff" stroke="#14304a" strokeWidth="5" />
            <line x1="100" y1="70" x2="100" y2="170" stroke="#14304a" strokeWidth="4" />
            <g stroke="#2f8f6b" strokeWidth="3" strokeLinecap="round">
              <line x1="35" y1="95" x2="85" y2="95" />
              <line x1="35" y1="115" x2="85" y2="115" />
              <line x1="35" y1="135" x2="85" y2="135" />
              <line x1="115" y1="95" x2="165" y2="95" />
              <line x1="115" y1="115" x2="165" y2="115" />
              <line x1="115" y1="135" x2="150" y2="135" />
            </g>
            <g transform="rotate(-35 100 60)">
              <rect x="40" y="48" width="110" height="22" fill="#f2c230" stroke="#14304a" strokeWidth="4" />
              <polygon points="150,48 178,59 150,70" fill="#f5deb3" stroke="#14304a" strokeWidth="4" />
              <rect x="40" y="48" width="16" height="22" fill="#e58a8a" stroke="#14304a" strokeWidth="4" />
            </g>
          </svg>
        </div>
      </section>

      <section>
        <div className="wrap name-story">
          <div>
            <h2>Why "Mga Munting Kamay"?</h2>
            <p>
              In Filipino, <em>mga munting kamay</em> means "little hands." It is the
              name we gave to the children we serve: the small hands that hold a pencil
              for the first time, raise a hand to answer in class, and fold together
              in prayer.
            </p>
            <p>
              We believe those little hands deserve to be filled, with a notebook,
              a full school bag, and the Word of God.
            </p>
          </div>
          <blockquote className="verse">
            "Suffer the little children to come unto me, and forbid them not:
            for of such is the kingdom of God."
            <cite>Mark 10:14 (KJV)</cite>
          </blockquote>
        </div>
      </section>

      <section id="programs">
        <div className="wrap">
          <h2>What we give</h2>
          <p>Three simple programs, each aimed at a real reason students fall behind.</p>
          <div className="grid">
            <div className="card">
              <h3>Bag Ready</h3>
              <p>
                A bag with notebooks, mini notebooks with daily verses, pens, pencils, a ruler and crayons,
                handed out before every school year opens.
              </p>
            </div>
            <div className="card">
              <h3>Aral Fund</h3>
              <p>
                A small yearly scholarship that covers projects, printing fees
                and daily transportation for students in need.
              </p>
            </div>
            <div className="card">
              <h3>Spiritual Study Corner</h3>
              <p>
                A shelf of donated books, along with Bibles and a quiet table for homework inside
                partner barangay halls and churches.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="gifts">
        <div className="wrap">
          <div className="gifts-head">
            <img src={schoolBag} alt="A green Bag Ready school bag filled with a notebook and a pencil" />
            <div>
              <h2>What your gift buys</h2>
              <p>
                These are the same amounts you can choose on our Donate page. Prices are
                estimates based on typical school supply stores in Angeles City.
              </p>
            </div>
          </div>
          <div className="grid gifts-grid">
            {gifts.map((g) => (
              <div className="card gift" key={g.amount}>
                <span className="gift-amount">₱{g.amount.toLocaleString()}</span>
                <h3>{g.title}</h3>
                <p>{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <h2>How your donation reaches a student</h2>
          <ol className="steps">
            <li>
              <strong>You give</strong>
              Donate money, spiritual books, and school supplies through any channel below.
            </li>
            <li>
              <strong>We pack and match</strong>
              Volunteers sort supplies and match them to students nominated by
              their teachers.
            </li>
            <li>
              <strong>We hand it over</strong>
              Bags and scholarships are given in person at school, and every
              donor gets a photo update.
            </li>
          </ol>
        </div>
      </section>

      <section id="goal">
        <div className="wrap">
          <h2>Our goal for School Year 2027–2028</h2>
          <p>
            Before the next school year opens, we aim to raise{" "}
            <strong>₱{goalTotal.toLocaleString()}</strong>. Here is how it will be used.
          </p>
          {/* Each colored part of the bar is sized by its share of the total goal */}
          <div className="goal-bar" role="img" aria-label="Goal split across the three programs">
            {goals.map((g) => (
              <span key={g.label} style={{ width: `${(g.amount / goalTotal) * 100}%`, background: g.color }} />
            ))}
          </div>
          <ul className="goal-legend">
            {goals.map((g) => (
              <li key={g.label}>
                <i style={{ background: g.color }} />
                {g.label} <strong>₱{g.amount.toLocaleString()}</strong>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <h2>Where we serve</h2>
          <p>
            We start close to home in Angeles City, Pampanga, working with public school
            teachers and our church's children outreach ministry. These are our focus barangays:
          </p>
          <ul className="tags">
            {places.map((place) => (
              <li key={place}>{place}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="give">
        <div className="wrap">
          <h2>Ways to give</h2>
          <div className="grid">
            <div className="card">
              <h3>Give money</h3>
              <p>
                Any amount helps. Message us to receive our donation details
                and an official receipt.
              </p>
            </div>
            <div className="card">
              <h3>Give supplies</h3>
              <p>
                Bring new notebooks, pens and bags to our drop-off point, or
                ask us to pick up bulk donations.
              </p>
            </div>
            <div className="card">
              <h3>Give time</h3>
              <p>
                Join our weekend packing sessions and help get bags ready for
                distribution day.
              </p>
            </div>
            <div className="card">
              <h3>Give testimony</h3>
              <p>
                Share your story of how our God has impacted your life or the lives of others.
              </p>
            </div>
          </div>
          <p style={{ marginTop: "1.5rem" }}>
            Questions? Email <a href="mailto:hello@muntingkamay.org">hello@muntingkamay.org</a>.
          </p>
        </div>
      </section>

      <section id="faq">
        <div className="wrap">
          <h2>Frequently asked questions</h2>
          <div className="faq">
            {faqs.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <h2>Fill a pair of little hands today.</h2>
          <p>₱100 buys notebooks and pens. ₱500 sends a student to school with a full bag.</p>
          <Link className="btn" to="/donate">Donate now</Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
