export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-20 flex justify-center">
      <div className="max-w-[800px] w-full">
        <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>

        <p className="text-gray-400 mb-6">
          Effective Date: April 13, 2026
        </p>

        <p className="mb-8 text-gray-300 leading-relaxed">
          Welcome to RareLens. These Terms & Conditions (“Terms”) govern your
          access to and use of the RareLens website, mobile application, and any
          related services provided by RareLens (“RareLens”, “we”, “our”, or “us”).
          By accessing or using RareLens, you agree to these Terms. If you do not
          agree, do not use the service.
        </p>

        <Section title="1. Eligibility">
          <p className="text-gray-300 leading-relaxed">
            You may use RareLens only if you are legally permitted to do so under
            applicable law. By using RareLens, you represent that the information
            you provide is accurate and that you are authorized to create and use
            your account.
          </p>
        </Section>

        <Section title="2. Your Account">
          <p className="text-gray-300 leading-relaxed">
            You are responsible for maintaining the confidentiality of your account
            credentials and for all activity that occurs under your account. You
            agree to provide accurate, current, and complete information and to
            keep it updated.
          </p>
        </Section>

        <Section title="3. Use of the Service">
          <p className="text-gray-300 leading-relaxed">
            RareLens is intended for personal, non-commercial use unless expressly
            approved by us in writing. You agree not to misuse the service,
            interfere with its operation, attempt unauthorized access, scrape data,
            reverse engineer the product, or use RareLens in violation of any law.
          </p>
        </Section>

        <Section title="4. User Content">
          <p className="text-gray-300 leading-relaxed">
            You retain ownership of content you submit to RareLens, including text,
            photos, profile information, and responses. By submitting content, you
            grant RareLens a non-exclusive, worldwide, royalty-free license to
            host, store, display, reproduce, and use that content solely for the
            purpose of operating, improving, and providing the service.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            You are solely responsible for the content you submit and represent
            that you have the rights necessary to submit it.
          </p>
        </Section>

        <Section title="5. Communications Consent">
          <p className="text-gray-300 leading-relaxed">
            By providing your phone number and using RareLens, you consent to
            receive transactional communications from us, including One-Time
            Passwords (OTP), account verification messages, account-related alerts,
            and service notifications. These messages may be sent by SMS,
            including via toll-free numbers, or by email.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            RareLens does not send unsolicited promotional or marketing SMS
            messages without your explicit consent. Standard message and data rates
            may apply depending on your carrier plan.
          </p>
        </Section>

        <Section title="6. Privacy">
          <p className="text-gray-300 leading-relaxed">
            Your use of RareLens is also governed by our Privacy Policy, which
            explains how we collect, use, and protect your information.
          </p>
        </Section>

        <Section title="7. Suspension and Termination">
          <p className="text-gray-300 leading-relaxed">
            We may suspend or terminate your access to RareLens at any time if we
            believe you have violated these Terms, created risk for other users,
            or exposed RareLens to legal or security issues.
          </p>
        </Section>

        <Section title="8. Disclaimers">
          <p className="text-gray-300 leading-relaxed">
            RareLens is provided on an “as is” and “as available” basis. We make
            no warranties, express or implied, regarding availability,
            reliability, accuracy, or fitness for a particular purpose.
          </p>
        </Section>

        <Section title="9. Limitation of Liability">
          <p className="text-gray-300 leading-relaxed">
            To the fullest extent permitted by law, RareLens will not be liable
            for any indirect, incidental, consequential, special, or punitive
            damages arising from or related to your use of the service.
          </p>
        </Section>

        <Section title="10. Changes to These Terms">
          <p className="text-gray-300 leading-relaxed">
            We may update these Terms from time to time. If we do, we will post
            the updated version on this page and update the effective date above.
            Continued use of RareLens after changes become effective constitutes
            acceptance of the revised Terms.
          </p>
        </Section>

        <Section title="11. Contact Us">
          <p className="text-gray-300 leading-relaxed">
            If you have questions about these Terms, contact us at:
          </p>
          <p className="mt-2 text-white font-semibold">hello@rarelens.ai</p>
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}