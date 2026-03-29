import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';

const C = {
  navy: '#0f172a',
  blue: '#0a66c2',
  mid: '#334155',
  muted: '#64748b',
  border: '#d1d5db',
};

const s = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 9.5,
    color: C.navy,
    paddingTop: 62,
    paddingBottom: 42,
    paddingHorizontal: 46,
    lineHeight: 1.45,
    backgroundColor: '#ffffff',
  },

  /* ── HEADER ── */
  header: { marginBottom: 14 },
  name: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 22,
    color: C.navy,
    marginBottom: 16,
  },
  headline: {
    fontSize: 11,
    color: C.blue,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contactItem: {
    fontSize: 8.5,
    color: C.muted,
    marginRight: 18,
  },
  contactLink: {
    fontSize: 8.5,
    color: C.blue,
    marginRight: 18,
    textDecoration: 'none',
  },

  /* ── DIVIDER ── */
  divider: {
    borderBottomWidth: 0.75,
    borderBottomColor: C.border,
    marginVertical: 10,
  },

  /* ── SECTION ── */
  section: { marginBottom: 13 },
  sectionTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 8.5,
    color: C.blue,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 7,
    borderBottomWidth: 0.75,
    borderBottomColor: C.border,
    paddingBottom: 3,
  },

  /* ── SUMMARY ── */
  summaryText: {
    fontSize: 9,
    color: C.mid,
    lineHeight: 1.6,
  },

  /* ── EXPERIENCE ── */
  expItem: { marginBottom: 9 },
  expTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  expRole: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10.5,
    color: C.navy,
  },
  expPeriod: {
    fontSize: 8.5,
    color: C.muted,
    marginTop: 1.5,
  },
  expCompany: {
    fontSize: 9.5,
    color: C.blue,
    marginBottom: 3,
    marginTop: 1,
  },
  expSummary: {
    fontSize: 9,
    color: C.mid,
    lineHeight: 1.5,
    marginBottom: 4,
  },
  bullet: {
    flexDirection: 'row',
    marginBottom: 2.5,
  },
  bulletDot: {
    fontSize: 9,
    color: C.blue,
    width: 13,
    marginTop: 0.5,
  },
  bulletText: {
    fontSize: 9,
    color: C.mid,
    flex: 1,
    lineHeight: 1.45,
  },

  /* ── SKILLS ── */
  skillRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  skillCategory: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    color: C.navy,
    width: 135,
    paddingTop: 1,
  },
  skillItems: {
    flex: 1,
    fontSize: 9,
    color: C.mid,
    lineHeight: 1.5,
  },

  /* ── EDUCATION ── */
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  eduDegree: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    color: C.navy,
  },
  eduInstitution: {
    fontSize: 9,
    color: C.blue,
    marginTop: 1,
  },
  eduPeriod: {
    fontSize: 8.5,
    color: C.muted,
    marginTop: 2,
  },

  /* ── CERTIFICATIONS ── */
  certItem: {
    marginBottom: 5,
  },
  certNameRow: {
    flexDirection: 'row',
  },
  certBullet: {
    fontSize: 9,
    color: C.blue,
    width: 13,
    marginTop: 0.5,
  },
  certName: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: C.navy,
    flex: 1,
  },
  certIssuer: {
    fontSize: 8.5,
    color: C.muted,
    marginLeft: 13,
    marginTop: 1.5,
  },
});

const MAX_BULLETS = 4;

function ResumePDF({ portfolio, labels }) {
  const { profile, contact, experience, skillGroups, education, certifications } = portfolio;

  return (
    <Document title={`${profile.name} – Resume`} author={profile.name} subject={profile.headline}>
      <Page size="A4" style={s.page}>

        {/* HEADER */}
        <View style={s.header}>
          <Text style={s.name}>{profile.name}</Text>
          <Text style={s.headline}>{profile.headline}</Text>
          <View style={s.contactRow}>
            <Text style={s.contactItem}>{profile.location}</Text>
            <Link style={s.contactLink} src={`mailto:${contact.email}`}>{contact.email}</Link>
            {contact.phones.map((p) => (
              <Text key={p} style={s.contactItem}>{p}</Text>
            ))}
            <Link style={s.contactLink} src={contact.github}>{contact.githubLabel}</Link>
          </View>
        </View>

        <View style={s.divider} />

        {/* PROFESSIONAL SUMMARY */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>{labels.summary}</Text>
          <Text style={s.summaryText}>{profile.summary}</Text>
        </View>

        {/* EXPERIENCE */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>{labels.experience}</Text>
          {experience.map((exp) => (
            <View key={exp.id} style={s.expItem} wrap={false}>
              <View style={s.expTopRow}>
                <Text style={s.expRole}>{exp.role}</Text>
                <Text style={s.expPeriod}>{exp.period}</Text>
              </View>
              <Text style={s.expCompany}>{exp.company}</Text>
              <Text style={s.expSummary}>{exp.summary}</Text>
              {(exp.highlights || []).slice(0, MAX_BULLETS).map((h, i) => (
                <View key={i} style={s.bullet}>
                  <Text style={s.bulletDot}>•</Text>
                  <Text style={s.bulletText}>{h}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* SKILLS */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>{labels.skills}</Text>
          {skillGroups.map((group) => (
            <View key={group.category} style={s.skillRow}>
              <Text style={s.skillCategory}>{group.category}</Text>
              <Text style={s.skillItems}>{group.items.join('  ·  ')}</Text>
            </View>
          ))}
        </View>

        {/* EDUCATION */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>{labels.education}</Text>
          {education.map((edu) => (
            <View key={edu.id} style={s.eduRow}>
              <View>
                <Text style={s.eduDegree}>{edu.degree}</Text>
                <Text style={s.eduInstitution}>{edu.institution}</Text>
              </View>
              <Text style={s.eduPeriod}>{edu.period}</Text>
            </View>
          ))}
        </View>

        {/* CERTIFICATIONS */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>{labels.certifications}</Text>
          {certifications.map((cert) => (
            <View key={cert.id} style={s.certItem}>
              <View style={s.certNameRow}>
                <Text style={s.certBullet}>▸</Text>
                <Text style={s.certName}>{cert.name}</Text>
              </View>
              <Text style={s.certIssuer}>{cert.issuer}</Text>
            </View>
          ))}
        </View>

      </Page>
    </Document>
  );
}

export default ResumePDF;
